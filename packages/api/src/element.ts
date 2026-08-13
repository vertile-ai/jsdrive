import { writeFile } from "node:fs/promises";
import type { Protocol } from "@nodriver/protocol";
import type { Tab } from "./tab.js";

export interface Position {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly center: readonly [number, number];
}

export class Element {
  #node: Protocol.DOM.Node;
  #objectId: Protocol.Runtime.RemoteObjectId | undefined;
  public readonly backendNodeId: Protocol.DOM.BackendNodeId;

  public constructor(
    public readonly tab: Tab,
    backendNodeId: Protocol.DOM.BackendNodeId,
    node: Protocol.DOM.Node,
  ) {
    this.backendNodeId = backendNodeId;
    this.#node = node;
  }

  public get nodeId(): Protocol.DOM.NodeId { return this.#node.nodeId; }
  public get parentNodeId(): Protocol.DOM.NodeId | undefined { return this.#node.parentId; }
  public get objectId(): Protocol.Runtime.RemoteObjectId | undefined { return this.#objectId; }
  public get nodeType(): number { return this.#node.nodeType; }
  public get tag(): string { return this.#node.nodeName.toLowerCase(); }
  public get attributes(): Readonly<Record<string, string>> { return attributesFrom(this.#node.attributes); }
  public get text(): string { return this.#node.nodeValue; }
  public get value(): string | undefined { return this.attributes.value; }
  public get html(): string | undefined { return this.#node.nodeValue || undefined; }

  public async refresh(): Promise<this> {
    const { node } = await this.tab.send("DOM.describeNode", {
      backendNodeId: this.backendNodeId,
      depth: 0,
      pierce: true,
    });
    if (this.#objectId !== undefined) {
      await this.tab.send("Runtime.releaseObject", { objectId: this.#objectId });
    }
    this.#node = node;
    this.#objectId = undefined;
    return this;
  }

  public update(): Promise<this> { return this.refresh(); }

  public async getText(): Promise<string> {
    return this.apply<string>("function () { return this.textContent || ''; }");
  }

  public async getValue(): Promise<string> {
    return this.apply<string>("function () { return 'value' in this ? String(this.value) : ''; }");
  }

  public async getHtml(): Promise<string> {
    return (await this.tab.send("DOM.getOuterHTML", { backendNodeId: this.backendNodeId, includeShadowDOM: true })).outerHTML;
  }

  public async getPosition(): Promise<Position> {
    const { model } = await this.tab.send("DOM.getBoxModel", { backendNodeId: this.backendNodeId });
    const xs = model.border.filter((_value, index) => index % 2 === 0);
    const ys = model.border.filter((_value, index) => index % 2 === 1);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const width = Math.max(...xs) - x;
    const height = Math.max(...ys) - y;
    return { x, y, width, height, center: [x + width / 2, y + height / 2] };
  }

  public async querySelector(selector: string): Promise<Element | null> {
    await this.refresh();
    const { nodeId } = await this.tab.send("DOM.querySelector", { nodeId: this.nodeId, selector: selector.trim() });
    return nodeId === 0 ? null : this.tab.elementFromNodeId(nodeId);
  }

  public async querySelectorAll(selector: string): Promise<readonly Element[]> {
    await this.refresh();
    const { nodeIds } = await this.tab.send("DOM.querySelectorAll", { nodeId: this.nodeId, selector: selector.trim() });
    return Promise.all(nodeIds.map((nodeId) => this.tab.elementFromNodeId(nodeId)));
  }

  public async apply<T = unknown>(functionDeclaration: string, ...arguments_: readonly unknown[]): Promise<T> {
    const objectId = await this.#resolve();
    const { result, exceptionDetails } = await this.tab.send("Runtime.callFunctionOn", {
      functionDeclaration,
      objectId,
      arguments: arguments_.map((value) => ({ value })),
      returnByValue: true,
      awaitPromise: true,
      userGesture: true,
    });
    if (exceptionDetails !== undefined) throw new Error(exceptionDetails.text);
    return result.value as T;
  }

  public async domClick(): Promise<void> {
    await this.apply("function () { this.click(); }");
  }

  public click(): Promise<void> { return this.domClick(); }

  public async mouseClick(button: Protocol.Input.MouseButton = "left"): Promise<void> {
    await this.scrollIntoView();
    const [x, y] = (await this.getPosition()).center;
    await this.tab.mouseClick(x, y, button);
  }

  public async focus(): Promise<void> {
    await this.tab.send("DOM.focus", { backendNodeId: this.backendNodeId });
  }

  public async scrollIntoView(): Promise<void> {
    await this.tab.send("DOM.scrollIntoViewIfNeeded", { backendNodeId: this.backendNodeId });
  }

  public async setValue(value: string): Promise<void> {
    await this.apply("function (value) { const proto = this instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set; setter ? setter.call(this, value) : (this.value = value); this.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value })); this.dispatchEvent(new Event('change', { bubbles: true })); }", value);
  }

  public async setText(value: string): Promise<void> {
    await this.apply("function (value) { this.textContent = value; this.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value })); }", value);
  }

  public clearInput(): Promise<void> { return this.setValue(""); }

  public async clearInputByDeleting(): Promise<void> {
    await this.focus();
    const value = await this.getValue();
    await this.apply("function () { this.setSelectionRange?.(this.value.length, this.value.length); }");
    for (const _segment of graphemes(value)) {
      await this.tab.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
      await this.tab.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 });
    }
  }

  public async sendKeys(text: string): Promise<void> {
    await this.focus();
    for (const segment of graphemes(text)) await this.tab.send("Input.insertText", { text: segment });
  }

  public async uploadFiles(files: readonly string[]): Promise<void> {
    await this.tab.send("DOM.setFileInputFiles", { files, backendNodeId: this.backendNodeId });
  }

  public sendFile(...files: readonly string[]): Promise<void> { return this.uploadFiles(files); }

  public async selectOption(value?: string): Promise<void> {
    await this.apply("function (value) { const option = this instanceof HTMLOptionElement ? this : Array.from(this.options || []).find((item) => item.value === value || item.text === value); if (!option) throw new Error('Option not found'); option.selected = true; const select = option.parentElement; select?.dispatchEvent(new Event('input', { bubbles: true })); select?.dispatchEvent(new Event('change', { bubbles: true })); }", value);
  }

  public async mouseMove(): Promise<void> {
    await this.scrollIntoView();
    const [x, y] = (await this.getPosition()).center;
    await this.tab.mouseMove(x, y);
  }

  public async mouseDrag(destination: Element | Position): Promise<void> {
    await this.scrollIntoView();
    const [fromX, fromY] = (await this.getPosition()).center;
    const to = destination instanceof Element ? await destination.getPosition() : destination;
    const [toX, toY] = to.center;
    await this.tab.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: fromX, y: fromY });
    await this.tab.send("Input.dispatchMouseEvent", { type: "mousePressed", x: fromX, y: fromY, button: "left", buttons: 1, clickCount: 1 });
    await this.tab.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: toX, y: toY, button: "left", buttons: 1 });
    await this.tab.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: toX, y: toY, button: "left", buttons: 0, clickCount: 1 });
  }

  public async screenshotB64(format: "jpeg" | "png" | "webp" = "png"): Promise<string> {
    await this.scrollIntoView();
    const position = await this.getPosition();
    return (await this.tab.send("Page.captureScreenshot", {
      format,
      clip: { x: position.x, y: position.y, width: position.width, height: position.height, scale: 1 },
      captureBeyondViewport: true,
    })).data;
  }

  public async saveScreenshot(path: string, format: "jpeg" | "png" | "webp" = "png"): Promise<string> {
    await writeFile(path, Buffer.from(await this.screenshotB64(format), "base64"));
    return path;
  }

  public async removeFromDom(): Promise<void> {
    await this.refresh();
    await this.tab.send("DOM.removeNode", { nodeId: this.nodeId });
  }

  async #resolve(): Promise<Protocol.Runtime.RemoteObjectId> {
    if (this.#objectId !== undefined) return this.#objectId;
    const { object } = await this.tab.send("DOM.resolveNode", { backendNodeId: this.backendNodeId });
    if (object.objectId === undefined) throw new Error(`DOM node ${this.backendNodeId} has no Runtime object`);
    this.#objectId = object.objectId;
    return object.objectId;
  }
}

function attributesFrom(values: readonly string[] | undefined): Readonly<Record<string, string>> {
  const attributes: Record<string, string> = {};
  for (let index = 0; index < (values?.length ?? 0); index += 2) {
    const name = values?.[index];
    const value = values?.[index + 1];
    if (name !== undefined && value !== undefined) attributes[name] = value;
  }
  return attributes;
}

function graphemes(value: string): readonly string[] {
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value)].map(({ segment }) => segment);
}

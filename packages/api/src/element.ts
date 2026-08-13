import { writeFile } from "node:fs/promises";
import type { Protocol } from "@nodriver/protocol";
import { dispatchKey, KeyEvents, type KeyInput } from "./input.js";
import type { ScreencastSession, Tab } from "./tab.js";

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
  #highlighted = false;
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
  public get node(): Protocol.DOM.Node { return this.#node; }
  public get parentNodeId(): Protocol.DOM.NodeId | undefined { return this.#node.parentId; }
  public get parentId(): Protocol.DOM.NodeId | undefined { return this.#node.parentId; }
  public get objectId(): Protocol.Runtime.RemoteObjectId | undefined { return this.#objectId; }
  public get nodeType(): number { return this.#node.nodeType; }
  public get tag(): string { return this.#node.nodeName.toLowerCase(); }
  public get tagName(): string { return this.tag; }
  public get nodeName(): string { return this.#node.nodeName; }
  public get localName(): string { return this.#node.localName; }
  public get nodeValue(): string { return this.#node.nodeValue; }
  public get textAll(): string { return flattenNodes(this.#node).map((node) => node.nodeValue).join(""); }
  public get documentURL(): string | undefined { return this.#node.documentURL; }
  public get baseURL(): string | undefined { return this.#node.baseURL; }
  public get publicId(): string | undefined { return this.#node.publicId; }
  public get systemId(): string | undefined { return this.#node.systemId; }
  public get internalSubset(): string | undefined { return this.#node.internalSubset; }
  public get xmlVersion(): string | undefined { return this.#node.xmlVersion; }
  public get pseudoType(): Protocol.DOM.PseudoType | undefined { return this.#node.pseudoType; }
  public get pseudoIdentifier(): string | undefined { return this.#node.pseudoIdentifier; }
  public get shadowRootType(): Protocol.DOM.ShadowRootType | undefined { return this.#node.shadowRootType; }
  public get frameId(): Protocol.Page.FrameId | undefined { return this.#node.frameId; }
  public get childNodeCount(): number | undefined { return this.#node.childNodeCount; }
  public get compatibilityMode(): Protocol.DOM.CompatibilityMode | undefined { return this.#node.compatibilityMode; }
  public get isSvg(): boolean { return this.#node.isSVG ?? false; }
  public get isScrollable(): boolean | undefined { return this.#node.isScrollable; }
  public get assignedSlot(): Protocol.DOM.BackendNode | undefined { return this.#node.assignedSlot; }
  public get distributedNodes(): readonly Protocol.DOM.BackendNode[] { return this.#node.distributedNodes ?? []; }
  public get adoptedStyleSheets(): readonly Protocol.DOM.StyleSheetId[] { return this.#node.adoptedStyleSheets ?? []; }
  public get attributes(): Readonly<Record<string, string>> { return attributesFrom(this.#node.attributes); }
  public get attrs(): Readonly<Record<string, string>> { return this.attributes; }
  public get children(): readonly Element[] { return (this.#node.children ?? []).map((node) => new Element(this.tab, node.backendNodeId, node)); }
  public get tree(): readonly Element[] { return flattenNodes(this.#node).map((node) => new Element(this.tab, node.backendNodeId, node)); }
  public get shadowRoots(): readonly Element[] { return (this.#node.shadowRoots ?? []).map((node) => new Element(this.tab, node.backendNodeId, node)); }
  public get pseudoElements(): readonly Element[] { return (this.#node.pseudoElements ?? []).map((node) => new Element(this.tab, node.backendNodeId, node)); }
  public get contentDocument(): Element | undefined {
    const node = this.#node.contentDocument;
    return node === undefined ? undefined : new Element(this.tab, node.backendNodeId, node);
  }
  public get templateContent(): Element | undefined {
    const node = this.#node.templateContent;
    return node === undefined ? undefined : new Element(this.tab, node.backendNodeId, node);
  }
  public get importedDocument(): Element | undefined {
    const node = this.#node.importedDocument;
    return node === undefined ? undefined : new Element(this.tab, node.backendNodeId, node);
  }
  public get text(): string { return this.#node.nodeValue; }
  public get value(): string | undefined { return this.attributes.value; }
  public get html(): string | undefined { return this.#node.nodeValue || undefined; }
  public get(name: string): string | undefined { return this.attributes[name]; }

  public async parent(): Promise<Element | null> {
    await this.refresh();
    return this.parentNodeId === undefined ? null : this.tab.elementFromNodeId(this.parentNodeId);
  }

  public async refresh(): Promise<this> {
    const { node } = await this.tab.send("DOM.describeNode", {
      backendNodeId: this.backendNodeId,
      depth: -1,
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

  public async getRemoteObject(): Promise<Protocol.Runtime.RemoteObject> {
    if (this.#objectId !== undefined) await this.tab.send("Runtime.releaseObject", { objectId: this.#objectId });
    const { object } = await this.tab.send("DOM.resolveNode", { backendNodeId: this.backendNodeId });
    this.#objectId = object.objectId;
    return object;
  }

  public getJsAttributes(): Promise<Readonly<Record<string, unknown>>> {
    return this.apply("function () { const result = {}; for (const key in this) { const value = this[key]; if (value === null || ['string','number','boolean'].includes(typeof value)) result[key] = value; } return result; }");
  }

  public async saveToDom(outerHtml?: string): Promise<void> {
    await this.refresh();
    await this.tab.send("DOM.setOuterHTML", { nodeId: this.nodeId, outerHTML: outerHtml ?? await this.getHtml() });
    await this.refresh();
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
    return Promise.all(nodeIds.map((nodeId) => {
      const cached = findNode(this.#node, nodeId);
      return cached === undefined ? this.tab.elementFromNodeId(nodeId) : Promise.resolve(new Element(this.tab, cached.backendNodeId, cached));
    }));
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

  public async mouseClick(button: Protocol.Input.MouseButton = "left", modifiers = 0): Promise<void> {
    await this.scrollIntoView();
    const [x, y] = (await this.getPosition()).center;
    await this.tab.mouseClick(x, y, button, modifiers);
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

  public async sendKeys(input: KeyInput | KeyEvents | readonly KeyInput[]): Promise<void> {
    await this.focus();
    const inputs = input instanceof KeyEvents ? input.events : Array.isArray(input) ? input : [input as KeyInput];
    for (const item of inputs) {
      if (typeof item === "string") {
        for (const segment of graphemes(item)) await this.tab.send("Input.insertText", { text: segment });
      } else {
        await dispatchKey(this.tab, item);
      }
    }
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

  public async flash(durationMs = 500): Promise<void> {
    const [x, y] = (await this.getPosition()).center;
    await this.tab.flashPoint(x, y, durationMs);
  }

  public async highlightOverlay(): Promise<void> {
    if (this.#highlighted) {
      await this.tab.send("Overlay.hideHighlight");
      await this.tab.send("Overlay.disable");
      this.#highlighted = false;
      return;
    }
    await this.tab.send("DOM.enable", {});
    await this.tab.send("Overlay.enable");
    await this.tab.send("Overlay.highlightNode", {
      backendNodeId: this.backendNodeId,
      highlightConfig: { showInfo: true, contentColor: { r: 255, g: 0, b: 0, a: 0.15 }, borderColor: { r: 255, g: 0, b: 0, a: 1 } },
    });
    this.#highlighted = true;
  }

  public recordVideo(directory: string): Promise<ScreencastSession> { return this.tab.recordScreencast(directory); }

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

function flattenNodes(node: Protocol.DOM.Node): Protocol.DOM.Node[] {
  return [node, ...(node.children ?? []).flatMap(flattenNodes), ...(node.shadowRoots ?? []).flatMap(flattenNodes), ...(node.contentDocument === undefined ? [] : flattenNodes(node.contentDocument))];
}

function findNode(root: Protocol.DOM.Node, nodeId: Protocol.DOM.NodeId): Protocol.DOM.Node | undefined {
  return flattenNodes(root).find((node) => node.nodeId === nodeId);
}

import { writeFile } from "node:fs/promises";
import type { Protocol } from "@vertile-ai/jsdriver-protocol";
import {
  dispatchKey,
  keyInputList,
  KeyEvents,
  KeyModifiers,
  KeyPressEvent,
  SpecialKeys,
  type KeyEventPayload,
  type KeyInput,
} from "./input.js";
import type { ScreencastSession, Tab } from "./tab.js";

/** JavaScript equivalent of Zendriver's list-like DOM Quad helper. */
export class Position extends Array<number> {
  public static override get [Symbol.species](): ArrayConstructor { return Array; }

  public constructor(points: readonly number[]) {
    if (points.length !== 8) throw new RangeError(`Position requires exactly 8 quad coordinates; received ${points.length}`);
    super(...points);
  }

  public get x(): number { return this[6] as number; }
  public get y(): number { return this[3] as number; }
  public get width(): number { return (this[4] as number) - this.x; }
  public get height(): number { return (this[7] as number) - this.y; }
  public get center(): readonly [number, number] { return [this.x + this.width / 2, this.y + this.height / 2]; }
  public append(value: number): void { this.push(value); }
  public clear(): void { this.splice(0); }
  public copy(): number[] { return [...this]; }
  public count(value: number): number { return this.reduce((total, item) => total + Number(Object.is(item, value)), 0); }
  public extend(values: Iterable<number>): void { this.push(...values); }
  public index(value: number, start = 0, stop = this.length): number {
    const from = normalizeListIndex(start, this.length);
    const until = normalizeListIndex(stop, this.length);
    for (let index = from; index < until; index += 1) if (Object.is(this[index], value)) return index;
    throw new RangeError(`${String(value)} is not in Position`);
  }
  public insert(index: number, value: number): void {
    const normalized = index < 0 ? Math.max(0, this.length + index) : Math.min(index, this.length);
    this.splice(normalized, 0, value);
  }
  public override pop(index = -1): number {
    if (this.length === 0) throw new RangeError("pop from empty Position");
    const normalized = index < 0 ? this.length + index : index;
    if (normalized < 0 || normalized >= this.length) throw new RangeError("pop index out of range");
    return this.splice(normalized, 1)[0] as number;
  }
  public remove(value: number): void { this.splice(this.index(value), 1); }
  public override reverse(): this { super.reverse(); return this; }
  public override sort(compareFn?: (a: number, b: number) => number): this { super.sort(compareFn); return this; }
  public toJSON(): number[] { return [...this]; }
  public toJson(): number[] { return this.toJSON(); }
  public static fromJson(points: readonly number[]): Position { return new Position(points); }
  public toViewport(scale = 1): Protocol.Page.Viewport {
    return { x: this.x, y: this.y, width: this.width, height: this.height, scale };
  }
}

function normalizeListIndex(index: number, length: number): number {
  if (index < 0) return Math.max(0, length + index);
  return Math.min(index, length);
}

export interface ApplyOptions {
  readonly awaitPromise?: boolean;
}

export class Element {
  #node: Protocol.DOM.Node;
  #tree: Protocol.DOM.Node | undefined;
  #objectId: Protocol.Runtime.RemoteObjectId | undefined;
  #remoteObject: Protocol.Runtime.RemoteObject | undefined;
  #highlighted = false;
  public readonly backendNodeId: Protocol.DOM.BackendNodeId;

  public constructor(tab: Tab, backendNodeId: Protocol.DOM.BackendNodeId, node: Protocol.DOM.Node);
  public constructor(node: Protocol.DOM.Node, tab: Tab, tree?: Protocol.DOM.Node);
  public constructor(
    tabOrNode: Tab | Protocol.DOM.Node,
    backendNodeIdOrTab: Protocol.DOM.BackendNodeId | Tab,
    nodeOrTree?: Protocol.DOM.Node,
  ) {
    if (isDomNode(tabOrNode)) {
      this.#node = tabOrNode;
      this.tab = backendNodeIdOrTab as Tab;
      this.backendNodeId = tabOrNode.backendNodeId;
      this.#tree = nodeOrTree;
      return;
    }
    this.tab = tabOrNode;
    this.backendNodeId = backendNodeIdOrTab as Protocol.DOM.BackendNodeId;
    if (nodeOrTree === undefined) throw new TypeError("Element requires a DOM node");
    this.#node = nodeOrTree;
  }

  public readonly tab: Tab;

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
  public get textAll(): string { return textNodes(this.#node).map((node) => node.nodeValue).join(" "); }
  public get documentURL(): string | undefined { return this.#node.documentURL; }
  public get documentUrl(): string | undefined { return this.documentURL; }
  public get baseURL(): string | undefined { return this.#node.baseURL; }
  public get baseUrl(): string | undefined { return this.baseURL; }
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
  public get tree(): Protocol.DOM.Node | undefined { return this.#tree; }
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
  public get text(): string { return (this.#node.children ?? []).find((node) => node.nodeType === 3)?.nodeValue ?? ""; }
  public get value(): string | undefined { return this.attributes.value; }
  public get html(): string | undefined { return this.#node.nodeValue || undefined; }
  public get(name: string): string | undefined { return this.attributes[name]; }
  public get remoteObject(): Protocol.Runtime.RemoteObject | undefined { return this.#remoteObject; }
  public get parent(): Element | undefined {
    if (this.#tree === undefined || this.parentId === undefined) return undefined;
    const parent = findNode(this.#tree, this.parentId);
    return parent === undefined ? undefined : new Element(parent, this.tab, this.#tree);
  }

  public async getParent(): Promise<Element | null> {
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
    this.#tree = undefined;
    this.#objectId = undefined;
    this.#remoteObject = undefined;
    return this;
  }

  public async update(node?: Protocol.DOM.Node): Promise<this> {
    if (node !== undefined) {
      this.#node = node;
      return this;
    }
    return this.refresh();
  }

  public async getText(): Promise<string> {
    return this.#call<string>("function () { return this.textContent || ''; }");
  }

  public async getValue(): Promise<string> {
    return this.#call<string>("function () { return 'value' in this ? String(this.value) : ''; }");
  }

  public async getHtml(): Promise<string> {
    return (await this.tab.send("DOM.getOuterHTML", { backendNodeId: this.backendNodeId, includeShadowDOM: true })).outerHTML;
  }

  public async getRemoteObject(): Promise<Protocol.Runtime.RemoteObject> {
    if (this.#objectId !== undefined) await this.tab.send("Runtime.releaseObject", { objectId: this.#objectId });
    const { object } = await this.tab.send("DOM.resolveNode", { backendNodeId: this.backendNodeId });
    this.#objectId = object.objectId;
    this.#remoteObject = object;
    return object;
  }

  public getJsAttributes(): Promise<Readonly<Record<string, unknown>> | undefined> {
    return this.#call<Readonly<Record<string, unknown>> | undefined>("function () { const result = {}; for (const key in this) { const value = this[key]; if (value === null || ['string','number','boolean'].includes(typeof value)) result[key] = value; } return result; }");
  }

  public async saveToDom(outerHtml?: string): Promise<void> {
    await this.refresh();
    await this.tab.send("DOM.setOuterHTML", { nodeId: this.nodeId, outerHTML: outerHtml ?? await this.getHtml() });
    await this.refresh();
  }

  public async getPosition(absolute = false): Promise<Position | undefined> {
    try {
      const { model } = await this.tab.send("DOM.getBoxModel", { backendNodeId: this.backendNodeId });
      const position = new Position(model.border);
      if (!absolute) return position;
      const scroll = await this.tab.evaluate<{ readonly x: number; readonly y: number }>("({ x: window.scrollX, y: window.scrollY })");
      return new Position([...position].map((value, index) => value + (index % 2 === 0 ? scroll.x : scroll.y)));
    } catch {
      return undefined;
    }
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

  public apply<T = unknown>(jsFunction: string, ...arguments_: readonly unknown[]): Promise<T> {
    // Existing JavaScript callers pass a normal function declaration and its
    // arguments. Zendriver callers pass an arrow function plus its two
    // control values. Both forms invoke against this DOM object.
    if (jsFunction.trimStart().startsWith("function")) return this.#call<T>(jsFunction, arguments_);
    const returnByValue = typeof arguments_[0] === "boolean" ? arguments_[0] : true;
    const options = isApplyOptions(arguments_[1]) ? arguments_[1] : {};
    return this.#call<T>(`function () { return (${jsFunction})(this); }`, [], returnByValue, options.awaitPromise ?? false);
  }

  public async domClick(): Promise<void> {
    await this.#call("function () { this.click(); }");
  }

  public click(): Promise<void> { return this.domClick(); }

  public async mouseClick(button: Protocol.Input.MouseButton = "left", buttons = 1, modifiers = 0, hold = false): Promise<void> {
    await this.scrollIntoView();
    const [x, y] = (await this.#requiredPosition()).center;
    await this.tab.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button, buttons, modifiers, clickCount: 1 });
    if (!hold) await this.tab.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button, buttons: 0, modifiers, clickCount: 1 });
  }

  public async focus(): Promise<void> {
    await this.tab.send("DOM.focus", { backendNodeId: this.backendNodeId });
  }

  public async scrollIntoView(): Promise<void> {
    await this.tab.send("DOM.scrollIntoViewIfNeeded", { backendNodeId: this.backendNodeId });
  }

  public async setValue(value: string): Promise<void> {
    await this.#setTextControlValue(value, "insertText", value);
  }

  public async setText(value: string): Promise<void> {
    await this.#call("function (value) { this.textContent = value; this.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value })); }", [value]);
  }

  public clearInput(): Promise<void> {
    return this.#setTextControlValue("", "deleteContentBackward", null);
  }

  public async clearInputByDeleting(): Promise<void> {
    await this.focus();
    const value = await this.getValue();
    await this.#call("function () { this.setSelectionRange?.(this.value.length, this.value.length); }");
    for (const _segment of graphemes(value)) {
      for (const event of KeyEvents.fromMixedInput([SpecialKeys.Backspace]).toCdpEvents()) {
        await dispatchKey(this.tab, event);
      }
    }
  }

  public async sendKeys(input: KeyInput | KeyEvents | readonly KeyInput[]): Promise<void> {
    await this.focus();
    const events = input instanceof KeyEvents
      ? input.toCdpEvents()
      : KeyEvents.fromMixedInput(keyInputList(input)).toCdpEvents();
    for (const event of events) {
      await dispatchElementKey(this.tab, event);
    }
  }

  public async uploadFiles(files: readonly string[]): Promise<void> {
    await this.tab.send("DOM.setFileInputFiles", { files, backendNodeId: this.backendNodeId });
  }

  public sendFile(...files: readonly string[]): Promise<void> { return this.uploadFiles(files); }

  public async selectOption(value?: string): Promise<void> {
    await this.#call("function (value) { const option = this instanceof HTMLOptionElement ? this : Array.from(this.options || []).find((item) => item.value === value || item.text === value); if (!option) throw new Error('Option not found'); option.selected = true; const select = option.parentElement; select?.dispatchEvent(new Event('input', { bubbles: true })); select?.dispatchEvent(new Event('change', { bubbles: true })); }", [value]);
  }

  public async mouseMove(): Promise<void> {
    await this.scrollIntoView();
    const [x, y] = (await this.#requiredPosition()).center;
    await this.tab.mouseMove(x, y);
  }

  public async flash(duration = 0.5): Promise<void> {
    const [x, y] = (await this.#requiredPosition()).center;
    await this.tab.flashPoint(x, y, duration * 1_000);
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
  public async isRecording(): Promise<boolean | undefined> {
    return this.#call<boolean>("function () { return this instanceof HTMLVideoElement ? !this.paused : undefined; }") as Promise<boolean | undefined>;
  }

  public async mouseDrag(destination: Element | Position | readonly [number, number], relative = false, steps = 1): Promise<void> {
    await this.scrollIntoView();
    const [fromX, fromY] = (await this.#requiredPosition()).center;
    const [rawX, rawY] = destination instanceof Element
      ? (await destination.#requiredPosition()).center
      : destination instanceof Position ? destination.center : destination;
    const toX = relative ? fromX + rawX : rawX;
    const toY = relative ? fromY + rawY : rawY;
    await this.tab.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: fromX, y: fromY });
    await this.tab.send("Input.dispatchMouseEvent", { type: "mousePressed", x: fromX, y: fromY, button: "left", buttons: 1, clickCount: 1 });
    for (let step = 1; step <= Math.max(1, steps); step += 1) {
      const progress = step / Math.max(1, steps);
      await this.tab.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: fromX + (toX - fromX) * progress, y: fromY + (toY - fromY) * progress, button: "left", buttons: 1 });
    }
    await this.tab.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: toX, y: toY, button: "left", buttons: 0, clickCount: 1 });
  }

  public async screenshotB64(format: "jpeg" | "png" | "webp" = "jpeg", scale = 1): Promise<string> {
    await this.scrollIntoView();
    const position = await this.#requiredPosition();
    return (await this.tab.send("Page.captureScreenshot", {
      format,
      clip: { x: position.x, y: position.y, width: position.width, height: position.height, scale },
      captureBeyondViewport: true,
    })).data;
  }

  public async saveScreenshot(path: string, format?: "jpeg" | "png" | "webp", scale?: number): Promise<string>;
  public async saveScreenshot(path?: "auto", format?: "jpeg" | "png" | "webp", scale?: number): Promise<string>;
  public async saveScreenshot(path: string | "auto" = "auto", format: "jpeg" | "png" | "webp" = "jpeg", scale = 1): Promise<string> {
    const filename = path === "auto" ? `element-${Date.now()}.${format}` : path;
    await writeFile(filename, Buffer.from(await this.screenshotB64(format, scale), "base64"));
    return filename;
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
    this.#remoteObject = object;
    return object.objectId;
  }

  async #requiredPosition(): Promise<Position> {
    const position = await this.getPosition();
    if (position === undefined) throw new Error(`Could not find position for ${this.tag}`);
    return position;
  }

  async #call<T = unknown>(
    functionDeclaration: string,
    arguments_: readonly unknown[] = [],
    returnByValue = true,
    awaitPromise = true,
  ): Promise<T> {
    const objectId = await this.#resolve();
    const { result, exceptionDetails } = await this.tab.send("Runtime.callFunctionOn", {
      functionDeclaration,
      objectId,
      arguments: arguments_.map((value) => ({ value })),
      returnByValue,
      awaitPromise,
      userGesture: true,
    });
    if (exceptionDetails !== undefined) return undefined as T;
    return (returnByValue ? result.value : result) as T;
  }

  async #setTextControlValue(
    value: string,
    inputType: "deleteContentBackward" | "insertText",
    data: string | null,
  ): Promise<void> {
    await this.#call(
      "function (value, inputType, data) { const proto = this instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set; setter ? setter.call(this, value) : (this.value = value); this.dispatchEvent(new InputEvent('input', { bubbles: true, inputType, data })); this.dispatchEvent(new Event('change', { bubbles: true })); }",
      [value, inputType, data],
    );
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

async function dispatchElementKey(tab: Tab, event: KeyEventPayload): Promise<void> {
  const command = blinkEditingCommand(event);
  if (command === undefined) return dispatchKey(tab, event);
  await tab.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    ...(event.key === undefined ? {} : { key: event.key }),
    ...(event.code === undefined ? {} : { code: event.code }),
    ...(event.text === undefined ? {} : { text: event.text }),
    ...(event.windowsVirtualKeyCode === undefined ? {} : { windowsVirtualKeyCode: event.windowsVirtualKeyCode }),
    ...(event.nativeVirtualKeyCode === undefined ? {} : { nativeVirtualKeyCode: event.nativeVirtualKeyCode }),
    ...(event.modifiers === undefined ? {} : { modifiers: event.modifiers }),
    commands: [command],
  });
}

function blinkEditingCommand(event: KeyEventPayload): "SelectAll" | "Copy" | "Paste" | undefined {
  if (event.type !== KeyPressEvent.KeyDown || event.modifiers !== KeyModifiers.Control) return undefined;
  switch (event.key) {
    case "a": return "SelectAll";
    case "c": return "Copy";
    case "v": return "Paste";
    default: return undefined;
  }
}

function flattenNodes(node: Protocol.DOM.Node): Protocol.DOM.Node[] {
  return [node, ...(node.children ?? []).flatMap(flattenNodes), ...(node.shadowRoots ?? []).flatMap(flattenNodes), ...(node.contentDocument === undefined ? [] : flattenNodes(node.contentDocument))];
}

function textNodes(node: Protocol.DOM.Node): Protocol.DOM.Node[] {
  return nodesAndShadowRoots(node).filter((candidate) => candidate.nodeType === 3 && candidate.nodeValue !== "");
}

function nodesAndShadowRoots(node: Protocol.DOM.Node): Protocol.DOM.Node[] {
  return [node, ...(node.children ?? []).flatMap(nodesAndShadowRoots), ...(node.shadowRoots ?? []).flatMap(nodesAndShadowRoots)];
}

function findNode(root: Protocol.DOM.Node, nodeId: Protocol.DOM.NodeId): Protocol.DOM.Node | undefined {
  return flattenNodes(root).find((node) => node.nodeId === nodeId);
}

function isDomNode(value: Tab | Protocol.DOM.Node): value is Protocol.DOM.Node {
  return typeof (value as Protocol.DOM.Node).nodeId === "number";
}

function isApplyOptions(value: unknown): value is ApplyOptions {
  return typeof value === "object" && value !== null && !(value instanceof Array);
}

/** Create an Element from a CDP node, preserving an optional full DOM tree for synchronous parent lookup. */
export function create(node: Protocol.DOM.Node, tab: Tab, tree?: Protocol.DOM.Node): Element {
  return new Element(node, tab, tree);
}

/** Resolve a CDP node by frontend node id. */
export async function resolveNode(tab: Tab, nodeId: Protocol.DOM.NodeId): Promise<Protocol.DOM.Node> {
  return (await tab.send("DOM.describeNode", { nodeId, depth: -1, pierce: true })).node;
}

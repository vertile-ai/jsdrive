import type { Protocol } from "@nodriver/protocol";
import type { Tab } from "./tab.js";

export enum KeyModifiers {
  Default = 0,
  None = 0,
  Alt = 1,
  Ctrl = 2,
  Control = 2,
  Meta = 4,
  Shift = 8,
}

export enum KeyPressEvent {
  Char = "char",
  DownAndUp = "downAndUp",
  KeyDown = "keyDown",
  KeyUp = "keyUp",
  RawKeyDown = "rawKeyDown",
}

const specialKeys = {
  Backspace: { key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8, nativeVirtualKeyCode: 8 },
  Tab: { key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 },
  Enter: { key: "\r", code: "Enter", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: "\r" },
  Escape: { key: "Escape", code: "Escape", windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 },
  ArrowLeft: { key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37, nativeVirtualKeyCode: 37 },
  ArrowUp: { key: "ArrowUp", code: "ArrowUp", windowsVirtualKeyCode: 38, nativeVirtualKeyCode: 38 },
  ArrowRight: { key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 },
  ArrowDown: { key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40, nativeVirtualKeyCode: 40 },
  Delete: { key: "Delete", code: "Delete", windowsVirtualKeyCode: 46, nativeVirtualKeyCode: 46 },
  Home: { key: "Home", code: "Home", windowsVirtualKeyCode: 36, nativeVirtualKeyCode: 36 },
  End: { key: "End", code: "End", windowsVirtualKeyCode: 35, nativeVirtualKeyCode: 35 },
  Space: { key: " ", code: " ", windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32, text: " " },
  Alt: { key: "Alt", code: "AltLeft", windowsVirtualKeyCode: 18, nativeVirtualKeyCode: 18, modifiers: KeyModifiers.Alt },
  Ctrl: { key: "Control", code: "ControlLeft", windowsVirtualKeyCode: 17, nativeVirtualKeyCode: 17, modifiers: KeyModifiers.Control },
  Meta: { key: "Meta", code: "MetaLeft", windowsVirtualKeyCode: 91, nativeVirtualKeyCode: 91, modifiers: KeyModifiers.Meta },
  Shift: { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16, modifiers: KeyModifiers.Shift },
} as const satisfies Readonly<Record<string, KeyEventPayload>>;

export const SpecialKeys = {
  ...specialKeys,
  BACKSPACE: specialKeys.Backspace,
  TAB: specialKeys.Tab,
  ENTER: specialKeys.Enter,
  ESCAPE: specialKeys.Escape,
  ARROW_LEFT: specialKeys.ArrowLeft,
  ARROW_UP: specialKeys.ArrowUp,
  ARROW_RIGHT: specialKeys.ArrowRight,
  ARROW_DOWN: specialKeys.ArrowDown,
  DELETE: specialKeys.Delete,
  SPACE: specialKeys.Space,
  ALT: specialKeys.Alt,
  CTRL: specialKeys.Ctrl,
  META: specialKeys.Meta,
  SHIFT: specialKeys.Shift,
} as const;

export interface KeyEventPayload {
  readonly type?: KeyPressEvent;
  readonly key?: string;
  readonly code?: string;
  readonly text?: string;
  readonly windowsVirtualKeyCode?: number;
  readonly nativeVirtualKeyCode?: number;
  readonly modifiers?: KeyModifiers;
}

export type KeyChord = readonly [key: string | KeyEventPayload, modifiers: KeyModifiers];
export type KeyInput = string | KeyEventPayload | KeyChord;

export class KeyEvents {
  public constructor(public readonly events: readonly KeyInput[]) {}

  public static chord(modifiers: KeyModifiers, key: string | KeyEventPayload): KeyEvents {
    return KeyEvents.fromMixedInput([[key, modifiers]]);
  }

  public static fromText(text: string): KeyEvents { return KeyEvents.fromMixedInput([text]); }

  public static fromMixedInput(input: readonly KeyInput[]): KeyEvents {
    return new KeyEvents(normalizeInputs(input));
  }

  public toCdpEvents(): readonly KeyEventPayload[] {
    return normalizeInputs(this.events);
  }

  public toDownUpSequence(): readonly KeyEventPayload[] {
    return this.toCdpEvents();
  }
}

export async function dispatchKey(tab: Tab, event: KeyEventPayload): Promise<void> {
  if (event.type === KeyPressEvent.Char && event.text !== undefined && Array.from(event.text).length > 1) {
    await tab.send("Input.insertText", { text: event.text });
    return;
  }
  const params: Omit<Protocol.Input.Commands.DispatchKeyEventParams, "type"> = {
    ...(event.key === undefined ? {} : { key: event.key }),
    ...(event.code === undefined ? {} : { code: event.code }),
    ...(event.text === undefined ? {} : { text: event.text }),
    ...(event.windowsVirtualKeyCode === undefined ? {} : { windowsVirtualKeyCode: event.windowsVirtualKeyCode }),
    ...(event.nativeVirtualKeyCode === undefined ? {} : { nativeVirtualKeyCode: event.nativeVirtualKeyCode }),
    ...(event.modifiers === undefined ? {} : { modifiers: event.modifiers }),
  };
  if (event.type === KeyPressEvent.Char) {
    await tab.send("Input.dispatchKeyEvent", { type: "char", ...params });
    return;
  }
  if (event.type === KeyPressEvent.KeyDown || event.type === KeyPressEvent.RawKeyDown) {
    await tab.send("Input.dispatchKeyEvent", { type: event.type, ...params });
    return;
  }
  if (event.type === KeyPressEvent.KeyUp) {
    await tab.send("Input.dispatchKeyEvent", { type: "keyUp", ...params });
    return;
  }
  await tab.send("Input.dispatchKeyEvent", { type: "keyDown", ...params });
  await tab.send("Input.dispatchKeyEvent", { type: "keyUp", ...params });
}

function normalizeInputs(inputs: readonly KeyInput[]): KeyEventPayload[] {
  return inputs.flatMap((input) => {
    if (isKeyChord(input)) return typeChordInput(input);
    if (typeof input === "string") return typeText(input);
    if (input.type !== undefined) return [input];
    if ((input.modifiers ?? KeyModifiers.None) !== KeyModifiers.None && !isModifierKey(input.key)) {
      return typeChord(input);
    }
    return typeKey(input);
  });
}

export function keyInputList(input: KeyInput | readonly KeyInput[]): readonly KeyInput[] {
  if (isKeyChord(input)) return [input];
  if (Array.isArray(input)) return input as readonly KeyInput[];
  return [input as KeyInput];
}

function isKeyChord(input: KeyInput | readonly KeyInput[]): input is KeyChord {
  return Array.isArray(input) && input.length === 2 && typeof input[1] === "number";
}

function typeChordInput([key, modifiers]: KeyChord): KeyEventPayload[] {
  if (typeof key !== "string") return typeChord({ ...key, modifiers });
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(key)].flatMap(({ segment }) => {
    const descriptor = asciiDescriptor(segment);
    return descriptor === undefined ? [{ ...charEvent(segment), modifiers }] : typeChord({ ...descriptor.event, modifiers });
  });
}

function typeText(text: string): KeyEventPayload[] {
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].flatMap(({ segment }) => {
    const codePoint = segment.codePointAt(0);
    if (segment.length !== 1 || codePoint === undefined || codePoint > 0x7f) {
      return [charEvent(segment)];
    }
    return typeAscii(segment);
  });
}

function typeAscii(character: string): KeyEventPayload[] {
  const descriptor = asciiDescriptor(character);
  if (descriptor === undefined) return [charEvent(character)];
  if (!descriptor.shift) return typeKey(descriptor.event);
  const keyUp = { ...descriptor.event, key: descriptor.unshifted, text: descriptor.unshifted };
  return [
    { ...specialKeys.Shift, type: KeyPressEvent.KeyDown, modifiers: KeyModifiers.Shift },
    { ...descriptor.event, type: KeyPressEvent.KeyDown, modifiers: KeyModifiers.Shift },
    { ...specialKeys.Shift, type: KeyPressEvent.KeyUp, modifiers: KeyModifiers.None },
    { ...keyUp, type: KeyPressEvent.KeyUp, modifiers: KeyModifiers.None },
  ];
}

function typeChord(event: KeyEventPayload): KeyEventPayload[] {
  const modifiers = event.modifiers ?? KeyModifiers.None;
  const modifierEvents = modifierPayloads(modifiers);
  const key = withoutModifier(event);
  const down = { ...key, type: KeyPressEvent.KeyDown, modifiers };
  const up = { ...key, type: KeyPressEvent.KeyUp, modifiers: KeyModifiers.None };
  return [
    ...modifierEvents.map((modifier) => ({ ...modifier, type: KeyPressEvent.KeyDown, modifiers })),
    down,
    ...modifierEvents.map((modifier) => ({ ...modifier, type: KeyPressEvent.KeyUp, modifiers: KeyModifiers.None })),
    up,
  ];
}

function typeKey(event: KeyEventPayload): KeyEventPayload[] {
  const modifiers = event.modifiers ?? KeyModifiers.None;
  return [
    { ...event, type: KeyPressEvent.KeyDown, modifiers },
    { ...event, type: KeyPressEvent.KeyUp, modifiers: KeyModifiers.None },
  ];
}

function withoutModifier(event: KeyEventPayload): Omit<KeyEventPayload, "modifiers"> {
  const { modifiers: _modifiers, ...without } = event;
  return without;
}

function modifierPayloads(modifiers: KeyModifiers): KeyEventPayload[] {
  const result: KeyEventPayload[] = [];
  if ((modifiers & KeyModifiers.Alt) !== 0) result.push(specialKeys.Alt);
  if ((modifiers & KeyModifiers.Control) !== 0) result.push(specialKeys.Ctrl);
  if ((modifiers & KeyModifiers.Meta) !== 0) result.push(specialKeys.Meta);
  if ((modifiers & KeyModifiers.Shift) !== 0) result.push(specialKeys.Shift);
  return result;
}

function isModifierKey(key: string | undefined): boolean {
  return key === "Alt" || key === "Control" || key === "Meta" || key === "Shift";
}

function asciiDescriptor(character: string): { readonly event: KeyEventPayload; readonly shift: boolean; readonly unshifted: string } | undefined {
  const codePoint = character.codePointAt(0);
  if (codePoint === undefined) return undefined;
  if (character >= "a" && character <= "z") {
    const keyCode = codePoint - 32;
    return { event: { key: character, code: `Key${character.toUpperCase()}`, text: character, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode }, shift: false, unshifted: character };
  }
  if (character >= "A" && character <= "Z") {
    return { event: { key: character, code: `Key${character}`, text: character, windowsVirtualKeyCode: codePoint, nativeVirtualKeyCode: codePoint }, shift: true, unshifted: character.toLowerCase() };
  }
  if (character >= "0" && character <= "9") {
    return { event: { key: character, code: `Digit${character}`, text: character, windowsVirtualKeyCode: codePoint, nativeVirtualKeyCode: codePoint }, shift: false, unshifted: character };
  }
  const punctuation = ASCII_PUNCTUATION[character];
  return punctuation === undefined ? undefined : { event: { key: character, code: punctuation.code, text: character, windowsVirtualKeyCode: punctuation.keyCode, nativeVirtualKeyCode: punctuation.keyCode }, shift: punctuation.shift, unshifted: punctuation.unshifted };
}

function charEvent(text: string): KeyEventPayload {
  return { type: KeyPressEvent.Char, text, modifiers: KeyModifiers.None };
}

const ASCII_PUNCTUATION: Readonly<Record<string, { readonly code: string; readonly keyCode: number; readonly shift: boolean; readonly unshifted: string }>> = {
  " ": { code: " ", keyCode: 32, shift: false, unshifted: " " },
  "!": { code: "Digit1", keyCode: 49, shift: true, unshifted: "1" },
  '"': { code: "Quote", keyCode: 222, shift: true, unshifted: "'" },
  "#": { code: "Digit3", keyCode: 51, shift: true, unshifted: "3" },
  "$": { code: "Digit4", keyCode: 52, shift: true, unshifted: "4" },
  "%": { code: "Digit5", keyCode: 53, shift: true, unshifted: "5" },
  "&": { code: "Digit7", keyCode: 55, shift: true, unshifted: "7" },
  "'": { code: "Quote", keyCode: 222, shift: false, unshifted: "'" },
  "(": { code: "Digit9", keyCode: 57, shift: true, unshifted: "9" },
  ")": { code: "Digit0", keyCode: 48, shift: true, unshifted: "0" },
  "*": { code: "Digit8", keyCode: 56, shift: true, unshifted: "8" },
  "+": { code: "Equal", keyCode: 187, shift: true, unshifted: "=" },
  ",": { code: "Comma", keyCode: 188, shift: false, unshifted: "," },
  "-": { code: "Minus", keyCode: 189, shift: false, unshifted: "-" },
  ".": { code: "Period", keyCode: 190, shift: false, unshifted: "." },
  "/": { code: "Slash", keyCode: 191, shift: false, unshifted: "/" },
  ":": { code: "Semicolon", keyCode: 186, shift: true, unshifted: ";" },
  ";": { code: "Semicolon", keyCode: 186, shift: false, unshifted: ";" },
  "<": { code: "Comma", keyCode: 188, shift: true, unshifted: "," },
  "=": { code: "Equal", keyCode: 187, shift: false, unshifted: "=" },
  ">": { code: "Period", keyCode: 190, shift: true, unshifted: "." },
  "?": { code: "Slash", keyCode: 191, shift: true, unshifted: "/" },
  "@": { code: "Digit2", keyCode: 50, shift: true, unshifted: "2" },
  "[": { code: "BracketLeft", keyCode: 219, shift: false, unshifted: "[" },
  "\\": { code: "Backslash", keyCode: 220, shift: false, unshifted: "\\" },
  "]": { code: "BracketRight", keyCode: 221, shift: false, unshifted: "]" },
  "^": { code: "Digit6", keyCode: 54, shift: true, unshifted: "6" },
  "_": { code: "Minus", keyCode: 189, shift: true, unshifted: "-" },
  "`": { code: "Backquote", keyCode: 192, shift: false, unshifted: "`" },
  "{": { code: "BracketLeft", keyCode: 219, shift: true, unshifted: "[" },
  "|": { code: "Backslash", keyCode: 220, shift: true, unshifted: "\\" },
  "}": { code: "BracketRight", keyCode: 221, shift: true, unshifted: "]" },
  "~": { code: "Backquote", keyCode: 192, shift: true, unshifted: "`" },
};

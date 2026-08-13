import type { CommandParams, CommandResult, Protocol, ProtocolCommand } from "@vertile-ai/jsdriver-protocol";

interface InputTab {
  send<M extends ProtocolCommand>(
    method: M,
    ...args: CommandParams<M> extends undefined
      ? [params?: undefined, options?: { readonly timeoutMs?: number }]
      : [params: CommandParams<M>, options?: { readonly timeoutMs?: number }]
  ): Promise<CommandResult<M>>;
}

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
  KEY_DOWN = "keyDown",
  KEY_UP = "keyUp",
  RAW_KEY_DOWN = "rawKeyDown",
  CHAR = "char",
  DOWN_AND_UP = "downAndUp",
  Char = "char",
  DownAndUp = "downAndUp",
  KeyDown = "keyDown",
  KeyUp = "keyUp",
  RawKeyDown = "rawKeyDown",
}

export interface SpecialKeyDescriptor extends KeyEventPayload {
  /** Python `Enum.name`, exposed as a non-enumerable metadata property. */
  readonly name: string;
  /** Python `Enum.value`, represented as a readonly tuple. */
  readonly value: readonly [name: string, keyCode: number];
}

function specialKey(
  name: string,
  key: string,
  code: string,
  keyCode: number,
  extras: { readonly text?: string; readonly modifiers?: KeyModifiers } = {},
): SpecialKeyDescriptor {
  const descriptor = { key, code, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode, ...extras } as KeyEventPayload & { name?: string; value?: readonly [string, number] };
  Object.defineProperties(descriptor, {
    name: { value: name, enumerable: false },
    value: { value: Object.freeze([name === "SPACE" ? " " : key === "\r" ? "Enter" : key, keyCode]), enumerable: false },
  });
  return descriptor as SpecialKeyDescriptor;
}

const specialKeys = {
  Backspace: specialKey("BACKSPACE", "Backspace", "Backspace", 8),
  Tab: specialKey("TAB", "Tab", "Tab", 9),
  Enter: specialKey("ENTER", "\r", "Enter", 13, { text: "\r" }),
  Escape: specialKey("ESCAPE", "Escape", "Escape", 27),
  ArrowLeft: specialKey("ARROW_LEFT", "ArrowLeft", "ArrowLeft", 37),
  ArrowUp: specialKey("ARROW_UP", "ArrowUp", "ArrowUp", 38),
  ArrowRight: specialKey("ARROW_RIGHT", "ArrowRight", "ArrowRight", 39),
  ArrowDown: specialKey("ARROW_DOWN", "ArrowDown", "ArrowDown", 40),
  Delete: specialKey("DELETE", "Delete", "Delete", 46),
  Home: specialKey("HOME", "Home", "Home", 36),
  End: specialKey("END", "End", "End", 35),
  Space: specialKey("SPACE", " ", " ", 32, { text: " " }),
  Alt: specialKey("ALT", "Alt", "AltLeft", 18, { modifiers: KeyModifiers.Alt }),
  Ctrl: specialKey("CTRL", "Control", "ControlLeft", 17, { modifiers: KeyModifiers.Control }),
  Meta: specialKey("META", "Meta", "MetaLeft", 91, { modifiers: KeyModifiers.Meta }),
  Shift: specialKey("SHIFT", "Shift", "ShiftLeft", 16, { modifiers: KeyModifiers.Shift }),
} as const satisfies Readonly<Record<string, SpecialKeyDescriptor>>;

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

export type KeyEventKey = string | SpecialKeyDescriptor;
export type KeyChord = readonly [key: string | KeyEventPayload | SpecialKeyDescriptor, modifiers: KeyModifiers | number];
export type KeyInput = string | KeyEventPayload | SpecialKeyDescriptor | KeyChord;
export type KeyEventsPayload = KeyEventPayload;

const NUM_SHIFT = ")!@#$%^&*(";
const SPECIAL_CHAR_MAP: Readonly<Record<string, readonly [code: string, keyCode: number]>> = {
  ";": ["Semicolon", 186], "=": ["Equal", 187], ",": ["Comma", 188], "-": ["Minus", 189],
  ".": ["Period", 190], "/": ["Slash", 191], "`": ["Backquote", 192], "[": ["BracketLeft", 219],
  "\\": ["Backslash", 220], "]": ["BracketRight", 221], "'": ["Quote", 222],
};
const SPECIAL_CHAR_SHIFT_MAP: Readonly<Record<string, string>> = {
  ":": ";", "+": "=", "<": ",", "_": "-", ">": ".", "?": "/", "~": "`", "{": "[", "|": "\\", "}": "]", '"': "'",
};
const SPECIAL_CHAR_REVERSE_MAP: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(SPECIAL_CHAR_SHIFT_MAP).map(([shifted, unshifted]) => [unshifted, shifted]),
);
const SPECIAL_KEY_CHAR_MAP = new Map<SpecialKeyDescriptor, string>([
  [specialKeys.Space, " "],
  [specialKeys.Enter, "\r"],
  [specialKeys.Tab, "\t"],
]);
const MODIFIER_KEYS: readonly SpecialKeyDescriptor[] = [specialKeys.Shift, specialKeys.Alt, specialKeys.Ctrl, specialKeys.Meta];

export class KeyEvents {
  public static readonly NUM_SHIFT = NUM_SHIFT;
  public static readonly SPECIAL_CHAR_MAP = SPECIAL_CHAR_MAP;
  public static readonly SPECIAL_CHAR_SHIFT_MAP = SPECIAL_CHAR_SHIFT_MAP;
  public static readonly SPECIAL_CHAR_REVERSE_MAP = SPECIAL_CHAR_REVERSE_MAP;
  public static readonly SPECIAL_KEY_CHAR_MAP = SPECIAL_KEY_CHAR_MAP;
  public static readonly MODIFIER_KEYS = MODIFIER_KEYS;

  public readonly events: readonly KeyInput[];
  public key: KeyEventKey | undefined;
  public modifiers: KeyModifiers | number;
  public readonly code: string | undefined;
  public readonly keyCode: number | undefined;

  public constructor(key: KeyEventKey, modifiers?: KeyModifiers | number);
  public constructor(events: readonly KeyInput[]);
  public constructor(key: KeyEventKey | readonly KeyInput[], modifiers: KeyModifiers | number = KeyModifiers.Default) {
    if (isKeyInputArray(key)) {
      this.events = key;
      this.key = undefined;
      this.modifiers = KeyModifiers.Default;
      this.code = undefined;
      this.keyCode = undefined;
      return;
    }
    this.events = [];
    this.key = key;
    this.modifiers = modifiers;
    const lookup: readonly [string | undefined, number | undefined] = typeof key === "string"
      ? stringKeyLookup(key)
      : [key.code, key.windowsVirtualKeyCode];
    this.code = lookup[0];
    this.keyCode = lookup[1];
  }

  public static chord(modifiers: KeyModifiers, key: string | KeyEventPayload): KeyEvents {
    return KeyEvents.fromMixedInput([[key, modifiers]]);
  }

  public static fromText(text: string): KeyEvents;
  public static fromText(text: string, asciiKeypress: KeyPressEvent): readonly KeyEventPayload[];
  public static fromText(text: string, asciiKeypress?: KeyPressEvent): KeyEvents | readonly KeyEventPayload[] {
    if (asciiKeypress === undefined) return KeyEvents.fromMixedInput([text]);
    return referenceFromText(text, asciiKeypress);
  }

  public static fromMixedInput(input: readonly KeyInput[]): KeyEvents;
  public static fromMixedInput(input: readonly KeyInput[], asciiKeypress: KeyPressEvent): readonly KeyEventPayload[];
  public static fromMixedInput(input: readonly KeyInput[], asciiKeypress?: KeyPressEvent): KeyEvents | readonly KeyEventPayload[] {
    if (asciiKeypress === undefined) return new KeyEvents(normalizeInputs(input));
    return referenceFromMixedInput(input, asciiKeypress);
  }

  public static from_text(text: string, asciiKeypress: KeyPressEvent): readonly KeyEventPayload[] {
    return referenceFromText(text, asciiKeypress);
  }

  public static from_mixed_input(input: readonly KeyInput[], asciiKeypress: KeyPressEvent = KeyPressEvent.DOWN_AND_UP): readonly KeyEventPayload[] {
    return referenceFromMixedInput(input, asciiKeypress);
  }

  public static isEnglishAlphabet(char: string): boolean {
    if (!/^[A-Za-z]+$/.test(char)) return false;
    if (char.length !== 1) {
      throw new Error("Key must be a single ASCII character. If you want to send multiple characters, try using `KeyEvents.from_text` or `KeyEvents.from_mixed_input`.");
    }
    return true;
  }

  public static is_english_alphabet(char: string): boolean {
    return KeyEvents.isEnglishAlphabet(char);
  }

  public convToStr(specialKeyKey: SpecialKeyDescriptor): string {
    if (specialKeyKey === specialKeys.Space) return " ";
    if (specialKeyKey === specialKeys.Enter) return "\n";
    if (specialKeyKey === specialKeys.Tab) return "\t";
    throw new Error(`Cannot convert ${specialKeyKey.name ? `SpecialKeys.${specialKeyKey.name}` : String(specialKeyKey)} to string, only SPACE, ENTER and TAB are supported.`);
  }

  public conv_to_str(specialKeyKey: SpecialKeyDescriptor): string {
    return this.convToStr(specialKeyKey);
  }

  public toCdpEvents(): readonly KeyEventPayload[];
  public toCdpEvents(keyPressEvent: KeyPressEvent, overrideModifiers?: KeyModifiers | number): readonly KeyEventPayload[];
  public toCdpEvents(keyPressEvent?: KeyPressEvent, overrideModifiers?: KeyModifiers | number): readonly KeyEventPayload[] {
    if (keyPressEvent === undefined) {
      if (this.key !== undefined) return this.to_cdp_events(KeyPressEvent.DOWN_AND_UP);
      return normalizeInputs(this.events);
    }
    return this.to_cdp_events(keyPressEvent, overrideModifiers);
  }

  public to_cdp_events(keyPressEvent: KeyPressEvent, overrideModifiers?: KeyModifiers | number): readonly KeyEventPayload[] {
    if (this.key === undefined) throw new Error("KeyEvents.to_cdp_events requires a KeyEvents key");
    const key = typeof this.key === "string" ? this.key : this.key;
    if (typeof key === "string" && (key.codePointAt(0) ?? 0) > 0x7f) keyPressEvent = KeyPressEvent.CHAR;
    if (typeof key === "string" && stringKeyLookup(key)[0] === undefined) keyPressEvent = KeyPressEvent.CHAR;
    if (keyPressEvent === KeyPressEvent.KEY_DOWN || keyPressEvent === KeyPressEvent.KEY_UP || keyPressEvent === KeyPressEvent.RAW_KEY_DOWN) {
      throw new Error("Not supported by itself, use CHAR or DOWN_AND_UP instead.");
    }
    if (keyPressEvent === KeyPressEvent.CHAR) return [this.toBasicEvent(KeyPressEvent.CHAR, this.modifiers)];
    if (keyPressEvent !== KeyPressEvent.DOWN_AND_UP) throw new Error(`Unsupported key press event type: ${String(keyPressEvent)}`);
    const currentModifiers = overrideModifiers === undefined ? this.modifiers : overrideModifiers;
    const normalised = normaliseKey(key, currentModifiers);
    this.key = normalised[0];
    return this.to_down_up_sequence(normalised[1]);
  }

  public toDownUpSequence(): readonly KeyEventPayload[];
  public toDownUpSequence(modifiers: KeyModifiers | number): readonly KeyEventPayload[];
  public toDownUpSequence(modifiers?: KeyModifiers | number): readonly KeyEventPayload[] {
    if (modifiers === undefined) {
      if (this.key !== undefined) return this.to_down_up_sequence(this.modifiers);
      return this.toCdpEvents();
    }
    return this.to_down_up_sequence(modifiers);
  }

  public to_down_up_sequence(modifiers: KeyModifiers | number): readonly KeyEventPayload[] {
    if (this.key === undefined) return normalizeInputs(this.events);
    const modifierEvents = decomposeModifiers(modifiers);
    const events: KeyEventPayload[] = [];
    let currentModifiers = KeyModifiers.Default;
    for (const [modifierKey, modifier] of modifierEvents) {
      currentModifiers |= modifier;
      events.push(this.basicEventFor(modifierKey, KeyPressEvent.KEY_DOWN, currentModifiers));
    }
    const isModifierKey = modifierEvents.some(([modifierKey]) => modifierKey === this.key);
    if (!isModifierKey) events.push(this.toBasicEvent(KeyPressEvent.KEY_DOWN, currentModifiers));
    for (const [modifierKey, modifier] of modifierEvents) {
      currentModifiers &= ~modifier;
      events.push(this.basicEventFor(modifierKey, KeyPressEvent.KEY_UP, currentModifiers));
    }
    if (!isModifierKey) events.push(this.toBasicEvent(KeyPressEvent.KEY_UP, currentModifiers));
    return events;
  }

  private basicEventFor(key: SpecialKeyDescriptor, type: KeyPressEvent, modifiers: KeyModifiers | number): KeyEventPayload {
    return new KeyEvents(key).toBasicEvent(type, modifiers);
  }

  private toBasicEvent(type: KeyPressEvent, modifiers: KeyModifiers | number): KeyEventPayload {
    if (this.key === undefined) throw new Error("KeyEvents has no key");
    if (type === KeyPressEvent.CHAR) {
      const text = typeof this.key === "string" ? this.key : this.convToStr(this.key);
      // Zendriver normalizes SPACE/ENTER/TAB to their text representation as
      // part of CHAR conversion; retain that observable instance state.
      if (typeof this.key !== "string") this.key = text;
      return { type, modifiers, text };
    }
    const [key, text] = actionData(this.key, modifiers, this.convToStr.bind(this));
    return {
      type,
      modifiers,
      ...(text === undefined ? {} : { text }),
      key,
      ...(this.code === undefined ? {} : { code: this.code }),
      ...(this.keyCode === undefined ? {} : { windowsVirtualKeyCode: this.keyCode, nativeVirtualKeyCode: this.keyCode }),
    };
  }
}

export namespace KeyEvents {
  export type Payload = KeyEventPayload;
}

function isSpecialKey(value: unknown): value is SpecialKeyDescriptor {
  return typeof value === "object" && value !== null && "name" in value && "value" in value;
}

function isKeyInputArray(value: KeyEventKey | readonly KeyInput[]): value is readonly KeyInput[] {
  return Array.isArray(value);
}

function decomposeModifiers(modifiers: KeyModifiers | number): readonly (readonly [SpecialKeyDescriptor, KeyModifiers])[] {
  const result: Array<readonly [SpecialKeyDescriptor, KeyModifiers]> = [];
  if ((modifiers & KeyModifiers.Alt) !== 0) result.push([specialKeys.Alt, KeyModifiers.Alt]);
  if ((modifiers & KeyModifiers.Ctrl) !== 0) result.push([specialKeys.Ctrl, KeyModifiers.Ctrl]);
  if ((modifiers & KeyModifiers.Meta) !== 0) result.push([specialKeys.Meta, KeyModifiers.Meta]);
  if ((modifiers & KeyModifiers.Shift) !== 0) result.push([specialKeys.Shift, KeyModifiers.Shift]);
  if (result.length === 0 && modifiers !== KeyModifiers.Default) throw new Error("No valid modifier keys found.");
  return result;
}

function referenceFromText(text: string, asciiKeypress: KeyPressEvent): readonly KeyEventPayload[] {
  return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].flatMap(({ segment }) => {
    let key: KeyEventKey = segment;
    if (segment === "\n" || segment === "\r") key = specialKeys.Enter;
    else if (segment === "\t") key = specialKeys.Tab;
    else if (segment === " ") key = specialKeys.Space;
    const event = (segment.codePointAt(0) ?? 0) > 0x7f ? KeyPressEvent.CHAR : asciiKeypress;
    return new KeyEvents(key).to_cdp_events(event);
  });
}

function referenceFromMixedInput(input: readonly KeyInput[], asciiKeypress: KeyPressEvent): readonly KeyEventPayload[] {
  const result: KeyEventPayload[] = [];
  for (const item of input) {
    if (typeof item === "string") {
      result.push(...referenceFromText(item, asciiKeypress));
      continue;
    }
    if (isSpecialKey(item)) {
      result.push(...new KeyEvents(item).to_cdp_events(KeyPressEvent.DOWN_AND_UP));
      continue;
    }
    if (Array.isArray(item) && item.length === 2 && typeof item[1] === "number") {
      const key = item[0];
      if (typeof key !== "string" && !isSpecialKey(key)) throw new Error(`Unsupported input type: ${Object.prototype.toString.call(key)}`);
      result.push(...new KeyEvents(key, item[1]).to_cdp_events(KeyPressEvent.DOWN_AND_UP));
      continue;
    }
    throw new Error(`Unsupported input type: ${Object.prototype.toString.call(item)}`);
  }
  return result;
}

function stringKeyLookup(key: string): readonly [code: string | undefined, keyCode: number | undefined] {
  if (KeyEvents.isEnglishAlphabet(key)) return [`Key${key.toUpperCase()}`, key.toUpperCase().charCodeAt(0)];
  if (/^\d$/.test(key) || NUM_SHIFT.includes(key)) {
    const digit = NUM_SHIFT.includes(key) ? String(NUM_SHIFT.indexOf(key)) : key;
    return [`Digit${digit}`, digit.charCodeAt(0)];
  }
  if (key === "\n" || key === "\r") return ["Enter", 13];
  if (key === "\t") return ["Tab", 9];
  if (key === " ") return [" ", 32];
  const direct = SPECIAL_CHAR_MAP[key];
  if (direct !== undefined) return direct;
  const unshifted = SPECIAL_CHAR_SHIFT_MAP[key];
  if (unshifted !== undefined) return SPECIAL_CHAR_MAP[unshifted] ?? [undefined, undefined];
  return [undefined, undefined];
}

function normaliseKey(key: KeyEventKey, modifiers: KeyModifiers | number): readonly [KeyEventKey, KeyModifiers | number] {
  if (isSpecialKey(key)) return [key, modifiers];
  let lowercaseKey: string | undefined;
  if (NUM_SHIFT.includes(key)) {
    modifiers |= KeyModifiers.Shift;
    lowercaseKey = String(NUM_SHIFT.indexOf(key));
  } else if (SPECIAL_CHAR_SHIFT_MAP[key] !== undefined) {
    modifiers |= KeyModifiers.Shift;
    lowercaseKey = SPECIAL_CHAR_SHIFT_MAP[key];
  } else if (KeyEvents.isEnglishAlphabet(key) && key.toUpperCase() === key) {
    modifiers |= KeyModifiers.Shift;
    lowercaseKey = key.toLowerCase();
  } else if (key === "\n" || key === "\r") {
    return [specialKeys.Enter, modifiers];
  } else if (key === "\t") {
    return [specialKeys.Tab, modifiers];
  } else if (key === " ") {
    return [specialKeys.Space, modifiers];
  }
  if (lowercaseKey !== undefined && modifiers !== KeyModifiers.Shift) {
    throw new Error(`Key '${key}' is not supported with modifiers ${modifiers}.`);
  }
  return [lowercaseKey === undefined ? key : lowercaseKey, lowercaseKey === undefined ? modifiers : modifiers | KeyModifiers.Shift];
}

function actionData(
  key: KeyEventKey,
  modifiers: KeyModifiers | number,
  convToStr: (key: SpecialKeyDescriptor) => string,
): readonly [key: string, text: string | undefined] {
  if (typeof key === "string") {
    if (modifiers !== KeyModifiers.Shift) return [key, key];
    if (KeyEvents.isEnglishAlphabet(key)) return [key.toUpperCase(), key.toUpperCase()];
    if (/^\d$/.test(key)) return [NUM_SHIFT[Number(key)] ?? key, NUM_SHIFT[Number(key)] ?? key];
    const shifted = SPECIAL_CHAR_REVERSE_MAP[key];
    if (shifted === undefined) throw new Error(`Key '${key}' is not supported with modifiers ${modifiers}.`);
    return [shifted, shifted];
  }
  const mapped = SPECIAL_KEY_CHAR_MAP.get(key);
  if (mapped !== undefined) return [mapped, mapped];
  if (key === specialKeys.Space || key === specialKeys.Enter || key === specialKeys.Tab) return [convToStr(key), convToStr(key)];
  return [key.value[0], undefined];
}

export async function dispatchKey(tab: InputTab, event: KeyEventPayload): Promise<void> {
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

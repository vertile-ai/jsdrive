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
  Backspace: { key: "Backspace", code: "Backspace", windowsVirtualKeyCode: 8 },
  Tab: { key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 },
  Enter: { key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" },
  Escape: { key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 },
  ArrowLeft: { key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 },
  ArrowUp: { key: "ArrowUp", code: "ArrowUp", windowsVirtualKeyCode: 38 },
  ArrowRight: { key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 },
  ArrowDown: { key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 },
  Delete: { key: "Delete", code: "Delete", windowsVirtualKeyCode: 46 },
  Home: { key: "Home", code: "Home", windowsVirtualKeyCode: 36 },
  End: { key: "End", code: "End", windowsVirtualKeyCode: 35 },
  Space: { key: " ", code: "Space", windowsVirtualKeyCode: 32, text: " " },
  Alt: { key: "Alt", code: "AltLeft", windowsVirtualKeyCode: 18, modifiers: KeyModifiers.Alt },
  Ctrl: { key: "Control", code: "ControlLeft", windowsVirtualKeyCode: 17, modifiers: KeyModifiers.Control },
  Meta: { key: "Meta", code: "MetaLeft", windowsVirtualKeyCode: 91, modifiers: KeyModifiers.Meta },
  Shift: { key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, modifiers: KeyModifiers.Shift },
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
  readonly key: string;
  readonly code?: string;
  readonly text?: string;
  readonly windowsVirtualKeyCode?: number;
  readonly nativeVirtualKeyCode?: number;
  readonly modifiers?: KeyModifiers;
}

export type KeyInput = string | KeyEventPayload;

export class KeyEvents {
  public constructor(public readonly events: readonly KeyInput[]) {}
  public static chord(modifiers: KeyModifiers, key: string | KeyEventPayload): KeyEvents {
    return new KeyEvents([typeof key === "string" ? { key, modifiers } : { ...key, modifiers }]);
  }
  public static fromText(text: string): KeyEvents { return new KeyEvents([text]); }
  public static fromMixedInput(input: readonly KeyInput[]): KeyEvents { return new KeyEvents(input); }
  public toCdpEvents(): readonly KeyEventPayload[] {
    const result: KeyEventPayload[] = [];
    for (const event of this.events) {
      if (typeof event === "string") result.push(...[...event].map((key) => ({ key, text: key, type: KeyPressEvent.DownAndUp })));
      else result.push(event);
    }
    return result;
  }
  public toDownUpSequence(): readonly KeyEventPayload[] {
    return this.toCdpEvents().flatMap((event) => event.type === KeyPressEvent.DownAndUp || event.type === undefined
      ? [{ ...event, type: KeyPressEvent.RawKeyDown }, { ...event, type: KeyPressEvent.KeyUp }]
      : [event]);
  }
}

export async function dispatchKey(tab: Tab, event: KeyEventPayload): Promise<void> {
  const params: Omit<Protocol.Input.Commands.DispatchKeyEventParams, "type"> = {
    key: event.key,
    ...(event.code === undefined ? {} : { code: event.code }),
    ...(event.text === undefined ? {} : { text: event.text }),
    ...(event.windowsVirtualKeyCode === undefined ? {} : { windowsVirtualKeyCode: event.windowsVirtualKeyCode }),
    ...(event.nativeVirtualKeyCode === undefined ? {} : { nativeVirtualKeyCode: event.nativeVirtualKeyCode }),
    ...(event.modifiers === undefined ? {} : { modifiers: event.modifiers }),
  };
  if (event.type === KeyPressEvent.Char) { await tab.send("Input.dispatchKeyEvent", { type: "char", ...params }); return; }
  if (event.type === KeyPressEvent.KeyDown || event.type === KeyPressEvent.RawKeyDown) { await tab.send("Input.dispatchKeyEvent", { type: event.type, ...params }); return; }
  const { text: _text, ...keyUp } = params;
  if (event.type === KeyPressEvent.KeyUp) { await tab.send("Input.dispatchKeyEvent", { type: "keyUp", ...keyUp }); return; }
  await tab.send("Input.dispatchKeyEvent", { type: "rawKeyDown", ...params });
  await tab.send("Input.dispatchKeyEvent", { type: "keyUp", ...keyUp });
}

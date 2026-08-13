import assert from "node:assert/strict";
import test from "node:test";
import {
  KeyEvents,
  KeyModifiers,
  KeyPressEvent,
  SpecialKeys,
  type KeyEventPayload,
} from "../src/index.js";

const descriptorNames = [
  ["SPACE", [" ", 32]],
  ["ENTER", ["Enter", 13]],
  ["TAB", ["Tab", 9]],
  ["BACKSPACE", ["Backspace", 8]],
  ["ESCAPE", ["Escape", 27]],
  ["DELETE", ["Delete", 46]],
  ["ARROW_LEFT", ["ArrowLeft", 37]],
  ["ARROW_UP", ["ArrowUp", 38]],
  ["ARROW_RIGHT", ["ArrowRight", 39]],
  ["ARROW_DOWN", ["ArrowDown", 40]],
  ["SHIFT", ["Shift", 16]],
  ["ALT", ["Alt", 18]],
  ["CTRL", ["Control", 17]],
  ["META", ["Meta", 91]],
] as const;

test("ZDAPI-KEYS-001 enums and special descriptors preserve the pinned public values", () => {
  assert.deepEqual(
    [KeyModifiers.Default, KeyModifiers.Alt, KeyModifiers.Ctrl, KeyModifiers.Meta, KeyModifiers.Shift],
    [0, 1, 2, 4, 8],
  );
  assert.equal(KeyModifiers.None, KeyModifiers.Default);
  assert.equal(KeyModifiers.Control, KeyModifiers.Ctrl);
  // Python IntEnum's useful inherited behavior is represented by JavaScript's
  // primitive numeric enum values (conversion, equality, and bitwise OR).
  assert.equal(Number(KeyModifiers.Alt), 1);
  assert.equal(String(KeyModifiers.Alt), "1");
  assert.equal(KeyModifiers.Alt == 1, true);
  assert.equal(KeyModifiers.Ctrl | KeyModifiers.Shift, 10);
  assert.deepEqual(
    [KeyPressEvent.KEY_DOWN, KeyPressEvent.KEY_UP, KeyPressEvent.RAW_KEY_DOWN, KeyPressEvent.CHAR, KeyPressEvent.DOWN_AND_UP],
    ["keyDown", "keyUp", "rawKeyDown", "char", "downAndUp"],
  );
  // Python's str Enum compares equal to its underlying value; JS string enum
  // members are already primitive strings and therefore preserve that contract.
  assert.equal(String(KeyPressEvent.CHAR), "char");
  assert.equal(KeyPressEvent.CHAR === "char", true);

  for (const [name, value] of descriptorNames) {
    const descriptor = SpecialKeys[name];
    assert.equal(descriptor.name, name);
    assert.deepEqual(descriptor.value, value);
    assert.equal(SpecialKeys[name.toLowerCase() as keyof typeof SpecialKeys] ?? descriptor, descriptor);
  }
  assert.equal(SpecialKeys.Enter, SpecialKeys.ENTER);
  assert.equal(SpecialKeys.Backspace, SpecialKeys.BACKSPACE);
  assert.deepEqual(SpecialKeys.Enter, {
    key: "\r",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
    text: "\r",
  });
});

test("ZDAPI-KEYS-002 KeyEvents exposes constants, constructor state, and helper semantics", () => {
  assert.equal(KeyEvents.NUM_SHIFT, ")!@#$%^&*(");
  assert.deepEqual(KeyEvents.SPECIAL_CHAR_MAP[";"], ["Semicolon", 186]);
  assert.equal(KeyEvents.SPECIAL_CHAR_SHIFT_MAP[":"], ";");
  assert.equal(KeyEvents.SPECIAL_CHAR_REVERSE_MAP[";"], ":");
  assert.equal(KeyEvents.SPECIAL_KEY_CHAR_MAP.get(SpecialKeys.SPACE), " ");
  assert.deepEqual(KeyEvents.MODIFIER_KEYS.map((key) => key.name), ["SHIFT", "ALT", "CTRL", "META"]);

  assert.equal(KeyEvents.isEnglishAlphabet("A"), true);
  assert.equal(KeyEvents.is_english_alphabet("z"), true);
  assert.equal(KeyEvents.isEnglishAlphabet("é"), false);
  assert.throws(() => KeyEvents.isEnglishAlphabet("ab"), /single ASCII character/);

  const key = new KeyEvents("a", KeyModifiers.Ctrl);
  assert.equal(key.key, "a");
  assert.equal(key.modifiers, KeyModifiers.Ctrl);
  assert.equal(key.code, "KeyA");
  assert.equal(key.keyCode, 65);
  assert.equal(new KeyEvents(["a"]).events.length, 1);
  assert.equal(key.conv_to_str(SpecialKeys.SPACE), " ");
  assert.equal(key.convToStr(SpecialKeys.ENTER), "\n");
  assert.throws(() => key.conv_to_str(SpecialKeys.ESCAPE), /only SPACE, ENTER and TAB/);
});

test("ZDAPI-KEYS-003 KeyEvents emits pinned payloads and rejects unsupported standalone events", () => {
  const payload = (value: Partial<KeyEventPayload>): KeyEventPayload => value;
  assert.deepEqual(new KeyEvents("a").to_cdp_events(KeyPressEvent.CHAR), [payload({ type: KeyPressEvent.CHAR, modifiers: 0, text: "a" })]);
  assert.deepEqual(new KeyEvents("a").to_cdp_events(KeyPressEvent.DOWN_AND_UP), [
    payload({ type: KeyPressEvent.KEY_DOWN, modifiers: 0, text: "a", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65 }),
    payload({ type: KeyPressEvent.KEY_UP, modifiers: 0, text: "a", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65 }),
  ]);
  assert.deepEqual(new KeyEvents("A").to_cdp_events(KeyPressEvent.DOWN_AND_UP), [
    payload({ type: KeyPressEvent.KEY_DOWN, modifiers: 8, key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16 }),
    payload({ type: KeyPressEvent.KEY_DOWN, modifiers: 8, text: "A", key: "A", code: "KeyA", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65 }),
    payload({ type: KeyPressEvent.KEY_UP, modifiers: 0, key: "Shift", code: "ShiftLeft", windowsVirtualKeyCode: 16, nativeVirtualKeyCode: 16 }),
    payload({ type: KeyPressEvent.KEY_UP, modifiers: 0, text: "a", key: "a", code: "KeyA", windowsVirtualKeyCode: 65, nativeVirtualKeyCode: 65 }),
  ]);
  assert.deepEqual(new KeyEvents("a", KeyModifiers.Ctrl | KeyModifiers.Shift).to_down_up_sequence(10).map(({ type, key, modifiers }) => ({ type, key, modifiers })), [
    { type: "keyDown", key: "Control", modifiers: 2 },
    { type: "keyDown", key: "Shift", modifiers: 10 },
    { type: "keyDown", key: "a", modifiers: 10 },
    { type: "keyUp", key: "Control", modifiers: 8 },
    { type: "keyUp", key: "Shift", modifiers: 0 },
    { type: "keyUp", key: "a", modifiers: 0 },
  ]);
  assert.deepEqual(new KeyEvents("é").to_cdp_events(KeyPressEvent.DOWN_AND_UP), [payload({ type: KeyPressEvent.CHAR, modifiers: 0, text: "é" })]);
  assert.deepEqual(new KeyEvents(SpecialKeys.ENTER).to_cdp_events(KeyPressEvent.CHAR), [payload({ type: KeyPressEvent.CHAR, modifiers: 0, text: "\n" })]);
  assert.throws(() => new KeyEvents("a").to_cdp_events(KeyPressEvent.KEY_DOWN), /Not supported by itself/);
  assert.throws(() => new KeyEvents(SpecialKeys.BACKSPACE).to_cdp_events(KeyPressEvent.CHAR), /only SPACE, ENTER and TAB/);
  assert.deepEqual(KeyEvents.chord(KeyModifiers.Ctrl, "a").toCdpEvents().map(({ type, key, modifiers }) => ({ type, key, modifiers })), [
    { type: "keyDown", key: "Control", modifiers: 2 },
    { type: "keyDown", key: "a", modifiers: 2 },
    { type: "keyUp", key: "Control", modifiers: 0 },
    { type: "keyUp", key: "a", modifiers: 0 },
  ]);
});

test("ZDAPI-KEYS-004 KeyEvents.from_text/from_mixed_input retain grapheme, special-key, and error semantics", () => {
  assert.deepEqual(KeyEvents.from_text("aB!", KeyPressEvent.CHAR).map(({ type, text }) => ({ type, text })), [
    { type: "char", text: "a" }, { type: "char", text: "B" }, { type: "char", text: "!" },
  ]);
  assert.deepEqual(KeyEvents.from_text("\n\t ", KeyPressEvent.DOWN_AND_UP).map(({ type, key, text }) => ({ type, key, text })), [
    { type: "keyDown", key: "\r", text: "\r" }, { type: "keyUp", key: "\r", text: "\r" },
    { type: "keyDown", key: "\t", text: "\t" }, { type: "keyUp", key: "\t", text: "\t" },
    { type: "keyDown", key: " ", text: " " }, { type: "keyUp", key: " ", text: " " },
  ]);
  assert.deepEqual(KeyEvents.from_mixed_input(["a", SpecialKeys.ENTER, ["c", KeyModifiers.Ctrl]], KeyPressEvent.DOWN_AND_UP).map(({ type, key, modifiers }) => ({ type, key, modifiers })), [
    { type: "keyDown", key: "a", modifiers: 0 }, { type: "keyUp", key: "a", modifiers: 0 },
    { type: "keyDown", key: "\r", modifiers: 0 }, { type: "keyUp", key: "\r", modifiers: 0 },
    { type: "keyDown", key: "Control", modifiers: 2 }, { type: "keyDown", key: "c", modifiers: 2 },
    { type: "keyUp", key: "Control", modifiers: 0 }, { type: "keyUp", key: "c", modifiers: 0 },
  ]);
  assert.deepEqual(KeyEvents.fromMixedInput(["abc"]).toCdpEvents().length, 6);
  assert.throws(() => KeyEvents.from_mixed_input([1 as never], KeyPressEvent.DOWN_AND_UP), /Unsupported input type/);
});

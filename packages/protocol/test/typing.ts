import {
  commandDescriptors,
  type CommandParams,
  type CommandResult,
  type EventPayload,
  type Protocol,
} from "../src/index.js";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type IsAny<T> = 0 extends (1 & T) ? true : false;

type NavigateParamsAreInferred = Expect<Equal<
  CommandParams<"Page.navigate">,
  Protocol.Page.Commands.NavigateParams
>>;
type NavigateResultIsInferred = Expect<Equal<
  CommandResult<"Page.navigate">,
  Protocol.Page.Commands.NavigateResult
>>;
type RequestEventIsInferred = Expect<Equal<
  EventPayload<"Network.requestWillBeSent">,
  Protocol.Network.Events.RequestWillBeSentEvent
>>;
type ResultIsNotAny = Expect<Equal<IsAny<CommandResult<"Runtime.evaluate">>, false>>;
type NoParamsAreUndefined = Expect<Equal<CommandParams<"Runtime.enable">, undefined>>;

const navigate: CommandParams<"Page.navigate"> = { url: "https://example.test" };
const navigateMethod: "Page.navigate" = commandDescriptors["Page.navigate"].method;
// @ts-expect-error Page.navigate requires a URL.
const missingNavigateUrl: CommandParams<"Page.navigate"> = {};

void navigate;
void navigateMethod;
void missingNavigateUrl;
void (null as unknown as NavigateParamsAreInferred);
void (null as unknown as NavigateResultIsInferred);
void (null as unknown as RequestEventIsInferred);
void (null as unknown as ResultIsNotAny);
void (null as unknown as NoParamsAreUndefined);

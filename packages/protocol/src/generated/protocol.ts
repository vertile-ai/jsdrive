// Generated from devtools-protocol@0.0.1677763. Do not edit.

export namespace Protocol {
  export namespace Accessibility {
    export type AXNodeId = string;
    export type AXValueType = "boolean" | "tristate" | "booleanOrUndefined" | "idref" | "idrefList" | "integer" | "node" | "nodeList" | "number" | "string" | "computedString" | "token" | "tokenList" | "domRelation" | "role" | "internalRole" | "valueUndefined";
    export type AXValueSourceType = "attribute" | "implicit" | "style" | "contents" | "placeholder" | "relatedElement";
    export type AXValueNativeSourceType = "description" | "figcaption" | "label" | "labelfor" | "labelwrapped" | "legend" | "rubyannotation" | "tablecaption" | "title" | "other";
    export interface AXValueSource {
      readonly "type": AXValueSourceType;
      readonly "value"?: AXValue;
      readonly "attribute"?: string;
      readonly "attributeValue"?: AXValue;
      readonly "superseded"?: boolean;
      readonly "nativeSource"?: AXValueNativeSourceType;
      readonly "nativeSourceValue"?: AXValue;
      readonly "invalid"?: boolean;
      readonly "invalidReason"?: string;
    }
    export interface AXRelatedNode {
      readonly "backendDOMNodeId": Protocol.DOM.BackendNodeId;
      readonly "idref"?: string;
      readonly "text"?: string;
    }
    export interface AXProperty {
      readonly "name": AXPropertyName;
      readonly "value": AXValue;
    }
    export interface AXValue {
      readonly "type": AXValueType;
      readonly "value"?: unknown;
      readonly "relatedNodes"?: ReadonlyArray<AXRelatedNode>;
      readonly "sources"?: ReadonlyArray<AXValueSource>;
    }
    export type AXPropertyName = "actions" | "busy" | "disabled" | "editable" | "focusable" | "focused" | "hidden" | "hiddenRoot" | "invalid" | "keyshortcuts" | "settable" | "roledescription" | "live" | "atomic" | "relevant" | "root" | "autocomplete" | "hasPopup" | "level" | "multiselectable" | "orientation" | "multiline" | "readonly" | "required" | "valuemin" | "valuemax" | "valuetext" | "checked" | "expanded" | "modal" | "pressed" | "selected" | "activedescendant" | "controls" | "describedby" | "details" | "errormessage" | "flowto" | "labelledby" | "owns" | "url" | "activeFullscreenElement" | "activeModalDialog" | "activeAriaModalDialog" | "ariaHiddenElement" | "ariaHiddenSubtree" | "emptyAlt" | "emptyText" | "inertElement" | "inertSubtree" | "labelContainer" | "labelFor" | "notRendered" | "notVisible" | "presentationalRole" | "probablyPresentational" | "inactiveCarouselTabContent" | "uninteresting";
    export interface AXNode {
      readonly "nodeId": AXNodeId;
      readonly "ignored": boolean;
      readonly "ignoredReasons"?: ReadonlyArray<AXProperty>;
      readonly "role"?: AXValue;
      readonly "chromeRole"?: AXValue;
      readonly "name"?: AXValue;
      readonly "description"?: AXValue;
      readonly "value"?: AXValue;
      readonly "properties"?: ReadonlyArray<AXProperty>;
      readonly "parentId"?: AXNodeId;
      readonly "childIds"?: ReadonlyArray<AXNodeId>;
      readonly "backendDOMNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "frameId"?: Protocol.Page.FrameId;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetPartialAXTreeParams {
        readonly "nodeId"?: Protocol.DOM.NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "fetchRelatives"?: boolean;
      }
      export interface GetPartialAXTreeResult {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
      export interface GetFullAXTreeParams {
        readonly "depth"?: number;
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface GetFullAXTreeResult {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
      export interface GetRootAXNodeParams {
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface GetRootAXNodeResult {
        readonly "node": AXNode;
      }
      export interface GetAXNodeAndAncestorsParams {
        readonly "nodeId"?: Protocol.DOM.NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export interface GetAXNodeAndAncestorsResult {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
      export interface GetChildAXNodesParams {
        readonly "id": AXNodeId;
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface GetChildAXNodesResult {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
      export interface QueryAXTreeParams {
        readonly "nodeId"?: Protocol.DOM.NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "accessibleName"?: string;
        readonly "role"?: string;
      }
      export interface QueryAXTreeResult {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
    }
    export namespace Events {
      export interface LoadCompleteEvent {
        readonly "root": AXNode;
      }
      export interface NodesUpdatedEvent {
        readonly "nodes": ReadonlyArray<AXNode>;
      }
    }
  }
  export namespace Ads {
    export interface AdFrameData {
      readonly "frameId": Protocol.Page.FrameId;
      readonly "initialOrigin"?: string;
      readonly "networkBytes": number;
      readonly "cpuTime": number;
    }
    export interface AdMetrics {
      readonly "viewportAdDensityByArea": number;
      readonly "averageViewportAdDensityByArea": number;
      readonly "viewportAdCount": number;
      readonly "averageViewportAdCount": number;
      readonly "totalAdCpuTime": number;
      readonly "totalAdNetworkBytes": number;
      readonly "updateAdFrames": ReadonlyArray<AdFrameData>;
      readonly "removeAdFrames": ReadonlyArray<Protocol.Page.FrameId>;
    }
    export namespace Commands {
      export type GetAdMetricsParams = undefined;
      export interface GetAdMetricsResult {
        readonly "metrics": AdMetrics;
      }
    }
    export namespace Events {
    }
  }
  export namespace Animation {
    export interface Animation {
      readonly "id": string;
      readonly "name": string;
      readonly "pausedState": boolean;
      readonly "playState": string;
      readonly "playbackRate": number;
      readonly "startTime": number;
      readonly "currentTime": number;
      readonly "type": "CSSTransition" | "CSSAnimation" | "WebAnimation";
      readonly "source"?: AnimationEffect;
      readonly "cssId"?: string;
      readonly "viewOrScrollTimeline"?: ViewOrScrollTimeline;
    }
    export interface ViewOrScrollTimeline {
      readonly "sourceNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "startOffset"?: number;
      readonly "endOffset"?: number;
      readonly "subjectNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "axis": Protocol.DOM.ScrollOrientation;
    }
    export interface AnimationEffect {
      readonly "delay": number;
      readonly "endDelay": number;
      readonly "iterationStart": number;
      readonly "iterations"?: number;
      readonly "duration": number;
      readonly "direction": string;
      readonly "fill": string;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "keyframesRule"?: KeyframesRule;
      readonly "easing": string;
    }
    export interface KeyframesRule {
      readonly "name"?: string;
      readonly "keyframes": ReadonlyArray<KeyframeStyle>;
    }
    export interface KeyframeStyle {
      readonly "offset": string;
      readonly "easing": string;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetCurrentTimeParams {
        readonly "id": string;
      }
      export interface GetCurrentTimeResult {
        readonly "currentTime": number;
      }
      export type GetPlaybackRateParams = undefined;
      export interface GetPlaybackRateResult {
        readonly "playbackRate": number;
      }
      export interface ReleaseAnimationsParams {
        readonly "animations": ReadonlyArray<string>;
      }
      export type ReleaseAnimationsResult = Readonly<Record<string, never>>;
      export interface ResolveAnimationParams {
        readonly "animationId": string;
      }
      export interface ResolveAnimationResult {
        readonly "remoteObject": Protocol.Runtime.RemoteObject;
      }
      export interface SeekAnimationsParams {
        readonly "animations": ReadonlyArray<string>;
        readonly "currentTime": number;
      }
      export type SeekAnimationsResult = Readonly<Record<string, never>>;
      export interface SetPausedParams {
        readonly "animations": ReadonlyArray<string>;
        readonly "paused": boolean;
      }
      export type SetPausedResult = Readonly<Record<string, never>>;
      export interface SetPlaybackRateParams {
        readonly "playbackRate": number;
      }
      export type SetPlaybackRateResult = Readonly<Record<string, never>>;
      export interface SetTimingParams {
        readonly "animationId": string;
        readonly "duration": number;
        readonly "delay": number;
      }
      export type SetTimingResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface AnimationCanceledEvent {
        readonly "id": string;
      }
      export interface AnimationCreatedEvent {
        readonly "id": string;
      }
      export interface AnimationStartedEvent {
        readonly "animation": Animation;
      }
      export interface AnimationUpdatedEvent {
        readonly "animation": Animation;
      }
    }
  }
  export namespace Audits {
    export interface AffectedCookie {
      readonly "name": string;
      readonly "path": string;
      readonly "domain": string;
    }
    export interface AffectedRequest {
      readonly "requestId"?: Protocol.Network.RequestId;
      readonly "url": string;
    }
    export interface AffectedFrame {
      readonly "frameId": Protocol.Page.FrameId;
    }
    export type CookieExclusionReason = "ExcludeSameSiteUnspecifiedTreatedAsLax" | "ExcludeSameSiteNoneInsecure" | "ExcludeSameSiteLax" | "ExcludeSameSiteStrict" | "ExcludeDomainNonASCII" | "ExcludeThirdPartyCookieBlockedInFirstPartySet" | "ExcludeThirdPartyPhaseout" | "ExcludePortMismatch" | "ExcludeSchemeMismatch";
    export type CookieWarningReason = "WarnSameSiteUnspecifiedCrossSiteContext" | "WarnSameSiteNoneInsecure" | "WarnSameSiteUnspecifiedLaxAllowUnsafe" | "WarnSameSiteStrictLaxDowngradeStrict" | "WarnSameSiteStrictCrossDowngradeStrict" | "WarnSameSiteStrictCrossDowngradeLax" | "WarnSameSiteLaxCrossDowngradeStrict" | "WarnSameSiteLaxCrossDowngradeLax" | "WarnAttributeValueExceedsMaxSize" | "WarnDomainNonASCII" | "WarnThirdPartyPhaseout" | "WarnCrossSiteRedirectDowngradeChangesInclusion" | "WarnDeprecationTrialMetadata" | "WarnThirdPartyCookieHeuristic";
    export type CookieOperation = "SetCookie" | "ReadCookie";
    export type InsightType = "GitHubResource" | "GracePeriod" | "Heuristics";
    export interface CookieIssueInsight {
      readonly "type": InsightType;
      readonly "tableEntryUrl"?: string;
    }
    export interface CookieIssueDetails {
      readonly "cookie"?: AffectedCookie;
      readonly "rawCookieLine"?: string;
      readonly "cookieWarningReasons": ReadonlyArray<CookieWarningReason>;
      readonly "cookieExclusionReasons": ReadonlyArray<CookieExclusionReason>;
      readonly "operation": CookieOperation;
      readonly "siteForCookies"?: string;
      readonly "cookieUrl"?: string;
      readonly "request"?: AffectedRequest;
      readonly "insight"?: CookieIssueInsight;
    }
    export type PerformanceIssueType = "DocumentCookie";
    export interface PerformanceIssueDetails {
      readonly "performanceIssueType": PerformanceIssueType;
      readonly "sourceCodeLocation"?: SourceCodeLocation;
    }
    export type MixedContentResolutionStatus = "MixedContentBlocked" | "MixedContentAutomaticallyUpgraded" | "MixedContentWarning";
    export type MixedContentResourceType = "Audio" | "Beacon" | "CSPReport" | "Download" | "EventSource" | "Favicon" | "Font" | "Form" | "Frame" | "Image" | "Import" | "JSON" | "Manifest" | "Ping" | "PluginData" | "PluginResource" | "Prefetch" | "Resource" | "Script" | "ServiceWorker" | "SharedWorker" | "SpeculationRules" | "Stylesheet" | "Track" | "Video" | "Worker" | "XMLHttpRequest" | "XSLT";
    export interface MixedContentIssueDetails {
      readonly "resourceType"?: MixedContentResourceType;
      readonly "resolutionStatus": MixedContentResolutionStatus;
      readonly "insecureURL": string;
      readonly "mainResourceURL": string;
      readonly "request"?: AffectedRequest;
      readonly "frame"?: AffectedFrame;
    }
    export type BlockedByResponseReason = "CoepFrameResourceNeedsCoepHeader" | "CoopSandboxedIFrameCannotNavigateToCoopPage" | "CorpNotSameOrigin" | "CorpNotSameOriginAfterDefaultedToSameOriginByCoep" | "CorpNotSameOriginAfterDefaultedToSameOriginByDip" | "CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip" | "CorpNotSameSite" | "SRIMessageSignatureMismatch";
    export interface BlockedByResponseIssueDetails {
      readonly "request": AffectedRequest;
      readonly "parentFrame"?: AffectedFrame;
      readonly "blockedFrame"?: AffectedFrame;
      readonly "reason": BlockedByResponseReason;
    }
    export type HeavyAdResolutionStatus = "HeavyAdBlocked" | "HeavyAdWarning";
    export type HeavyAdReason = "NetworkTotalLimit" | "CpuTotalLimit" | "CpuPeakLimit";
    export interface HeavyAdIssueDetails {
      readonly "resolution": HeavyAdResolutionStatus;
      readonly "reason": HeavyAdReason;
      readonly "frame": AffectedFrame;
    }
    export type ContentSecurityPolicyViolationType = "kInlineViolation" | "kEvalViolation" | "kURLViolation" | "kSRIViolation" | "kTrustedTypesSinkViolation" | "kTrustedTypesPolicyViolation" | "kWasmEvalViolation";
    export interface SourceCodeLocation {
      readonly "scriptId"?: Protocol.Runtime.ScriptId;
      readonly "url": string;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
    }
    export interface ContentSecurityPolicyIssueDetails {
      readonly "blockedURL"?: string;
      readonly "violatedDirective": string;
      readonly "isReportOnly": boolean;
      readonly "contentSecurityPolicyViolationType": ContentSecurityPolicyViolationType;
      readonly "frameAncestor"?: AffectedFrame;
      readonly "sourceCodeLocation"?: SourceCodeLocation;
      readonly "violatingNodeId"?: Protocol.DOM.BackendNodeId;
    }
    export type SharedArrayBufferIssueType = "TransferIssue" | "CreationIssue";
    export interface SharedArrayBufferIssueDetails {
      readonly "sourceCodeLocation": SourceCodeLocation;
      readonly "isWarning": boolean;
      readonly "type": SharedArrayBufferIssueType;
    }
    export interface CorsIssueDetails {
      readonly "corsErrorStatus": Protocol.Network.CorsErrorStatus;
      readonly "isWarning": boolean;
      readonly "request": AffectedRequest;
      readonly "location"?: SourceCodeLocation;
      readonly "initiatorOrigin"?: string;
      readonly "resourceIPAddressSpace"?: Protocol.Network.IPAddressSpace;
      readonly "clientSecurityState"?: Protocol.Network.ClientSecurityState;
    }
    export type SharedDictionaryError = "UseErrorCrossOriginNoCorsRequest" | "UseErrorDictionaryLoadFailure" | "UseErrorMatchingDictionaryNotUsed" | "UseErrorUnexpectedContentDictionaryHeader" | "WriteErrorCossOriginNoCorsRequest" | "WriteErrorDisallowedBySettings" | "WriteErrorExpiredResponse" | "WriteErrorFeatureDisabled" | "WriteErrorInsufficientResources" | "WriteErrorInvalidMatchField" | "WriteErrorInvalidStructuredHeader" | "WriteErrorInvalidTTLField" | "WriteErrorNavigationRequest" | "WriteErrorNoMatchField" | "WriteErrorNonIntegerTTLField" | "WriteErrorNonListMatchDestField" | "WriteErrorNonSecureContext" | "WriteErrorNonStringIdField" | "WriteErrorNonStringInMatchDestList" | "WriteErrorInvalidMatchDestList" | "WriteErrorNonStringMatchField" | "WriteErrorNonTokenTypeField" | "WriteErrorRequestAborted" | "WriteErrorShuttingDown" | "WriteErrorTooLongIdField" | "WriteErrorUnsupportedType";
    export type SRIMessageSignatureError = "MissingSignatureHeader" | "MissingSignatureInputHeader" | "InvalidSignatureHeader" | "InvalidSignatureInputHeader" | "SignatureHeaderValueIsNotByteSequence" | "SignatureHeaderValueIsParameterized" | "SignatureHeaderValueIsIncorrectLength" | "SignatureInputHeaderMissingLabel" | "SignatureInputHeaderValueNotInnerList" | "SignatureInputHeaderValueMissingComponents" | "SignatureInputHeaderInvalidComponentType" | "SignatureInputHeaderInvalidComponentName" | "SignatureInputHeaderInvalidHeaderComponentParameter" | "SignatureInputHeaderInvalidDerivedComponentParameter" | "SignatureInputHeaderKeyIdLength" | "SignatureInputHeaderInvalidParameter" | "SignatureInputHeaderMissingRequiredParameters" | "ValidationFailedSignatureExpired" | "ValidationFailedInvalidLength" | "ValidationFailedSignatureMismatch" | "ValidationFailedIntegrityMismatch" | "SignatureBaseUnknownDerivedComponent" | "SignatureBaseMissingHeader" | "SignatureBaseInvalidUnencodedDigest" | "SignatureBaseUnsupportedComponent";
    export type UnencodedDigestError = "MalformedDictionary" | "UnknownAlgorithm" | "IncorrectDigestType" | "IncorrectDigestLength";
    export type ConnectionAllowlistError = "InvalidHeader" | "MoreThanOneList" | "ItemNotInnerList" | "InvalidAllowlistItemType" | "ReportingEndpointNotToken" | "InvalidUrlPattern" | "IFrameAttributeLoosensEmbeddingRequirement" | "InvalidAllowConnectionAllowlistFrom" | "EmbeddingRequirementNotSatisfied";
    export interface QuirksModeIssueDetails {
      readonly "isLimitedQuirksMode": boolean;
      readonly "documentNodeId": Protocol.DOM.BackendNodeId;
      readonly "url": string;
      readonly "frameId": Protocol.Page.FrameId;
      readonly "loaderId": Protocol.Network.LoaderId;
    }
    export interface NavigatorUserAgentIssueDetails {
      readonly "url": string;
      readonly "location"?: SourceCodeLocation;
    }
    export interface SharedDictionaryIssueDetails {
      readonly "sharedDictionaryError": SharedDictionaryError;
      readonly "request": AffectedRequest;
    }
    export interface SRIMessageSignatureIssueDetails {
      readonly "error": SRIMessageSignatureError;
      readonly "signatureBase": string;
      readonly "integrityAssertions": ReadonlyArray<string>;
      readonly "request": AffectedRequest;
    }
    export interface UnencodedDigestIssueDetails {
      readonly "error": UnencodedDigestError;
      readonly "request": AffectedRequest;
    }
    export interface ConnectionAllowlistIssueDetails {
      readonly "error": ConnectionAllowlistError;
      readonly "request": AffectedRequest;
    }
    export type GenericIssueErrorType = "FormLabelForNameError" | "FormDuplicateIdForInputError" | "FormInputWithNoLabelError" | "FormAutocompleteAttributeEmptyError" | "FormEmptyIdAndNameAttributesForInputError" | "FormAriaLabelledByToNonExistingIdError" | "FormInputAssignedAutocompleteValueToIdOrNameAttributeError" | "FormLabelHasNeitherForNorNestedInputError" | "FormLabelForMatchesNonExistingIdError" | "FormInputHasWrongButWellIntendedAutocompleteValueError" | "ResponseWasBlockedByORB" | "NavigationEntryMarkedSkippable" | "BackUINavigationWouldSkipAd" | "AutofillAndManualTextPolicyControlledFeaturesInfo" | "AutofillPolicyControlledFeatureInfo" | "ManualTextPolicyControlledFeatureInfo" | "FormModelContextParameterMissingTitleAndDescription" | "FormModelContextMissingToolName" | "FormModelContextMissingToolDescription" | "FormModelContextRequiredParameterMissingName" | "FormModelContextParameterMissingName";
    export interface GenericIssueDetails {
      readonly "errorType": GenericIssueErrorType;
      readonly "frameId"?: Protocol.Page.FrameId;
      readonly "violatingNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "violatingNodeAttribute"?: string;
      readonly "request"?: AffectedRequest;
    }
    export interface DeprecationIssueDetails {
      readonly "affectedFrame"?: AffectedFrame;
      readonly "sourceCodeLocation": SourceCodeLocation;
      readonly "type": string;
    }
    export interface BounceTrackingIssueDetails {
      readonly "trackingSites": ReadonlyArray<string>;
    }
    export interface CookieDeprecationMetadataIssueDetails {
      readonly "allowedSites": ReadonlyArray<string>;
      readonly "optOutPercentage": number;
      readonly "isOptOutTopLevel": boolean;
      readonly "operation": CookieOperation;
    }
    export type ClientHintIssueReason = "MetaTagAllowListInvalidOrigin" | "MetaTagModifiedHTML";
    export interface FederatedAuthRequestIssueDetails {
      readonly "federatedAuthRequestIssueReason": FederatedAuthRequestIssueReason;
    }
    export type FederatedAuthRequestIssueReason = "ShouldEmbargo" | "TooManyRequests" | "WellKnownHttpNotFound" | "WellKnownNoResponse" | "WellKnownBlockedByConnectionAllowlist" | "WellKnownInvalidResponse" | "WellKnownListEmpty" | "WellKnownInvalidContentType" | "ConfigNotInWellKnown" | "WellKnownTooBig" | "ConfigHttpNotFound" | "ConfigNoResponse" | "ConfigBlockedByConnectionAllowlist" | "ConfigInvalidResponse" | "ConfigInvalidContentType" | "IdpNotPotentiallyTrustworthy" | "DisabledInSettings" | "DisabledInFlags" | "ErrorFetchingSignin" | "InvalidSigninResponse" | "AccountsHttpNotFound" | "AccountsNoResponse" | "AccountsBlockedByConnectionAllowlist" | "AccountsInvalidResponse" | "AccountsListEmpty" | "AccountsInvalidContentType" | "IdTokenHttpNotFound" | "IdTokenNoResponse" | "IdTokenBlockedByConnectionAllowlist" | "IdTokenInvalidResponse" | "IdTokenIdpErrorResponse" | "IdTokenCrossSiteIdpErrorResponse" | "IdTokenInvalidRequest" | "IdTokenInvalidContentType" | "ErrorIdToken" | "Canceled" | "RpPageNotVisible" | "SilentMediationFailure" | "NotSignedInWithIdp" | "MissingTransientUserActivation" | "ReplacedByActiveMode" | "RelyingPartyOriginIsOpaque" | "TypeNotMatching" | "UiDismissedNoEmbargo" | "CorsError" | "SuppressedBySegmentationPlatform";
    export interface FederatedAuthUserInfoRequestIssueDetails {
      readonly "federatedAuthUserInfoRequestIssueReason": FederatedAuthUserInfoRequestIssueReason;
    }
    export type FederatedAuthUserInfoRequestIssueReason = "NotSameOrigin" | "NotIframe" | "NotPotentiallyTrustworthy" | "NoApiPermission" | "NotSignedInWithIdp" | "NoAccountSharingPermission" | "InvalidConfigOrWellKnown" | "InvalidAccountsResponse" | "NoReturningUserFromFetchedAccounts";
    export interface EmailVerificationRequestIssueDetails {
      readonly "emailVerificationRequestIssueReason": EmailVerificationRequestIssueReason;
    }
    export type EmailVerificationRequestIssueReason = "InvalidEmail" | "DnsFetchFailed" | "DnsInvalidRecord" | "WellKnownHttpNotFound" | "WellKnownNoResponse" | "WellKnownInvalidResponse" | "WellKnownListEmpty" | "WellKnownInvalidContentType" | "WellKnownMissingIssuanceEndpoint" | "WellKnownIssuanceEndpointCrossOrigin" | "WellKnownUnsupportedSigningAlgorithm" | "TokenHttpNotFound" | "TokenNoResponse" | "TokenInvalidResponse" | "TokenInvalidContentType" | "TokenMalformedSdJwt" | "TokenInvalidSdJwt" | "KeyBindingSigningFailed" | "RpOriginIsOpaque" | "WellKnownMissingAccountsEndpoint" | "UserLoggedOut" | "WellKnownAccountsEndpointCrossOrigin" | "AccountsHttpNotFound" | "AccountsNoResponse" | "AccountsInvalidResponse" | "AccountsInvalidContentType" | "AccountsEmptyList" | "EmailVerificationWellKnownHttpNotFound" | "EmailVerificationWellKnownNoResponse" | "EmailVerificationWellKnownInvalidResponse" | "EmailVerificationWellKnownInvalidContentType" | "JwksHttpNotFound" | "JwksInvalidResponse" | "TokenVerificationSdJwtUnsupportedHeaderAlg" | "TokenVerificationSdJwtInvalidTyp" | "TokenVerificationSdJwtMissingIss" | "TokenVerificationSdJwtMissingIat" | "TokenVerificationSdJwtMissingCnf" | "TokenVerificationSdJwtMissingEmail" | "TokenVerificationSdJwtInvalidIssuedAt" | "TokenVerificationSdJwtInvalidIssuer" | "TokenVerificationSdJwtJwksMissingKeys" | "TokenVerificationSdJwtSignatureFailed" | "TokenVerificationSdJwtInvalidEmailVerified" | "TokenVerificationSdJwtInvalidEmail" | "TokenVerificationSdJwtInvalidHolderKey" | "TokenVerificationKbInvalidTyp" | "TokenVerificationKbMissingAud" | "TokenVerificationKbMissingNonce" | "TokenVerificationKbMissingIat" | "TokenVerificationKbMissingSdHash" | "TokenVerificationKbInvalidIssuedAt" | "TokenVerificationKbInvalidAudience" | "TokenVerificationKbInvalidNonce" | "TokenVerificationKbInvalidSdHash" | "TokenVerificationKbMissingCnf" | "TokenVerificationKbSignatureFailed";
    export interface ClientHintIssueDetails {
      readonly "sourceCodeLocation": SourceCodeLocation;
      readonly "clientHintIssueReason": ClientHintIssueReason;
    }
    export interface FailedRequestInfo {
      readonly "url": string;
      readonly "failureMessage": string;
      readonly "requestId"?: Protocol.Network.RequestId;
    }
    export type PartitioningBlobURLInfo = "BlockedCrossPartitionFetching" | "EnforceNoopenerForNavigation";
    export interface PartitioningBlobURLIssueDetails {
      readonly "url": string;
      readonly "partitioningBlobURLInfo": PartitioningBlobURLInfo;
    }
    export type ElementAccessibilityIssueReason = "DisallowedSelectChild" | "DisallowedOptGroupChild" | "NonPhrasingContentOptionChild" | "InteractiveContentOptionChild" | "InteractiveContentLegendChild" | "InteractiveContentSummaryDescendant";
    export interface ElementAccessibilityIssueDetails {
      readonly "nodeId": Protocol.DOM.BackendNodeId;
      readonly "elementAccessibilityIssueReason": ElementAccessibilityIssueReason;
      readonly "hasDisallowedAttributes": boolean;
    }
    export type StyleSheetLoadingIssueReason = "LateImportRule" | "RequestFailed";
    export interface StylesheetLoadingIssueDetails {
      readonly "sourceCodeLocation": SourceCodeLocation;
      readonly "styleSheetLoadingIssueReason": StyleSheetLoadingIssueReason;
      readonly "failedRequestInfo"?: FailedRequestInfo;
    }
    export type PropertyRuleIssueReason = "InvalidSyntax" | "InvalidInitialValue" | "InvalidInherits" | "InvalidName";
    export interface PropertyRuleIssueDetails {
      readonly "sourceCodeLocation": SourceCodeLocation;
      readonly "propertyRuleIssueReason": PropertyRuleIssueReason;
      readonly "propertyValue"?: string;
    }
    export type UserReidentificationIssueType = "BlockedFrameNavigation" | "BlockedSubresource" | "NoisedCanvasReadback";
    export interface UserReidentificationIssueDetails {
      readonly "type": UserReidentificationIssueType;
      readonly "request"?: AffectedRequest;
      readonly "sourceCodeLocation"?: SourceCodeLocation;
    }
    export type PermissionElementIssueType = "InvalidType" | "FencedFrameDisallowed" | "CspFrameAncestorsMissing" | "PermissionsPolicyBlocked" | "PaddingRightUnsupported" | "PaddingBottomUnsupported" | "InsetBoxShadowUnsupported" | "RequestInProgress" | "UntrustedEvent" | "RegistrationFailed" | "TypeNotSupported" | "InvalidTypeActivation" | "SecurityChecksFailed" | "ActivationDisabled" | "GeolocationDeprecated" | "InvalidDisplayStyle" | "NonOpaqueColor" | "LowContrast" | "FontSizeTooSmall" | "FontSizeTooLarge" | "InvalidSizeValue" | "NonSecureContext" | "MissingTransientUserActivation";
    export interface PermissionElementIssueDetails {
      readonly "issueType": PermissionElementIssueType;
      readonly "type"?: string;
      readonly "nodeId"?: Protocol.DOM.BackendNodeId;
      readonly "isWarning"?: boolean;
      readonly "permissionName"?: string;
      readonly "occluderNodeInfo"?: string;
      readonly "occluderParentNodeInfo"?: string;
      readonly "disableReason"?: string;
    }
    export interface SelectivePermissionsInterventionIssueDetails {
      readonly "apiName": string;
      readonly "adAncestry": Protocol.Network.AdAncestry;
      readonly "stackTrace"?: Protocol.Runtime.StackTrace;
    }
    export interface LazyLoadImageIssueDetails {
      readonly "nodeId": Protocol.DOM.BackendNodeId;
      readonly "url": string;
      readonly "frameId": Protocol.Page.FrameId;
    }
    export type InspectorIssueCode = "CookieIssue" | "MixedContentIssue" | "BlockedByResponseIssue" | "HeavyAdIssue" | "ContentSecurityPolicyIssue" | "SharedArrayBufferIssue" | "CorsIssue" | "QuirksModeIssue" | "PartitioningBlobURLIssue" | "NavigatorUserAgentIssue" | "GenericIssue" | "DeprecationIssue" | "ClientHintIssue" | "FederatedAuthRequestIssue" | "BounceTrackingIssue" | "CookieDeprecationMetadataIssue" | "StylesheetLoadingIssue" | "FederatedAuthUserInfoRequestIssue" | "PropertyRuleIssue" | "SharedDictionaryIssue" | "ElementAccessibilityIssue" | "SRIMessageSignatureIssue" | "UnencodedDigestIssue" | "ConnectionAllowlistIssue" | "UserReidentificationIssue" | "PermissionElementIssue" | "PerformanceIssue" | "SelectivePermissionsInterventionIssue" | "EmailVerificationRequestIssue" | "LazyLoadImageIssue";
    export interface InspectorIssueDetails {
      readonly "cookieIssueDetails"?: CookieIssueDetails;
      readonly "mixedContentIssueDetails"?: MixedContentIssueDetails;
      readonly "blockedByResponseIssueDetails"?: BlockedByResponseIssueDetails;
      readonly "heavyAdIssueDetails"?: HeavyAdIssueDetails;
      readonly "contentSecurityPolicyIssueDetails"?: ContentSecurityPolicyIssueDetails;
      readonly "sharedArrayBufferIssueDetails"?: SharedArrayBufferIssueDetails;
      readonly "corsIssueDetails"?: CorsIssueDetails;
      readonly "quirksModeIssueDetails"?: QuirksModeIssueDetails;
      readonly "partitioningBlobURLIssueDetails"?: PartitioningBlobURLIssueDetails;
      readonly "navigatorUserAgentIssueDetails"?: NavigatorUserAgentIssueDetails;
      readonly "genericIssueDetails"?: GenericIssueDetails;
      readonly "deprecationIssueDetails"?: DeprecationIssueDetails;
      readonly "clientHintIssueDetails"?: ClientHintIssueDetails;
      readonly "federatedAuthRequestIssueDetails"?: FederatedAuthRequestIssueDetails;
      readonly "bounceTrackingIssueDetails"?: BounceTrackingIssueDetails;
      readonly "cookieDeprecationMetadataIssueDetails"?: CookieDeprecationMetadataIssueDetails;
      readonly "stylesheetLoadingIssueDetails"?: StylesheetLoadingIssueDetails;
      readonly "propertyRuleIssueDetails"?: PropertyRuleIssueDetails;
      readonly "federatedAuthUserInfoRequestIssueDetails"?: FederatedAuthUserInfoRequestIssueDetails;
      readonly "sharedDictionaryIssueDetails"?: SharedDictionaryIssueDetails;
      readonly "elementAccessibilityIssueDetails"?: ElementAccessibilityIssueDetails;
      readonly "sriMessageSignatureIssueDetails"?: SRIMessageSignatureIssueDetails;
      readonly "unencodedDigestIssueDetails"?: UnencodedDigestIssueDetails;
      readonly "connectionAllowlistIssueDetails"?: ConnectionAllowlistIssueDetails;
      readonly "userReidentificationIssueDetails"?: UserReidentificationIssueDetails;
      readonly "permissionElementIssueDetails"?: PermissionElementIssueDetails;
      readonly "performanceIssueDetails"?: PerformanceIssueDetails;
      readonly "selectivePermissionsInterventionIssueDetails"?: SelectivePermissionsInterventionIssueDetails;
      readonly "emailVerificationRequestIssueDetails"?: EmailVerificationRequestIssueDetails;
      readonly "lazyLoadImageIssueDetails"?: LazyLoadImageIssueDetails;
    }
    export type IssueId = string;
    export interface InspectorIssue {
      readonly "code": InspectorIssueCode;
      readonly "details": InspectorIssueDetails;
      readonly "issueId"?: IssueId;
    }
    export namespace Commands {
      export interface GetEncodedResponseParams {
        readonly "requestId": Protocol.Network.RequestId;
        readonly "encoding": "webp" | "jpeg" | "png";
        readonly "quality"?: number;
        readonly "sizeOnly"?: boolean;
      }
      export interface GetEncodedResponseResult {
        readonly "body"?: string;
        readonly "originalSize": number;
        readonly "encodedSize": number;
      }
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type CheckFormsIssuesParams = undefined;
      export interface CheckFormsIssuesResult {
        readonly "formIssues": ReadonlyArray<GenericIssueDetails>;
      }
    }
    export namespace Events {
      export interface IssueAddedEvent {
        readonly "issue": InspectorIssue;
      }
    }
  }
  export namespace Autofill {
    export interface CreditCard {
      readonly "number": string;
      readonly "name": string;
      readonly "expiryMonth": string;
      readonly "expiryYear": string;
      readonly "cvc": string;
    }
    export interface AddressField {
      readonly "name": string;
      readonly "value": string;
    }
    export interface AddressFields {
      readonly "fields": ReadonlyArray<AddressField>;
    }
    export interface Address {
      readonly "fields": ReadonlyArray<AddressField>;
    }
    export interface AddressUI {
      readonly "addressFields": ReadonlyArray<AddressFields>;
    }
    export type FillingStrategy = "autocompleteAttribute" | "autofillInferred";
    export interface FilledField {
      readonly "htmlType": string;
      readonly "id": string;
      readonly "name": string;
      readonly "value": string;
      readonly "autofillType": string;
      readonly "fillingStrategy": FillingStrategy;
      readonly "frameId": Protocol.Page.FrameId;
      readonly "fieldId": Protocol.DOM.BackendNodeId;
    }
    export namespace Commands {
      export interface TriggerParams {
        readonly "fieldId": Protocol.DOM.BackendNodeId;
        readonly "frameId"?: Protocol.Page.FrameId;
        readonly "card"?: CreditCard;
        readonly "address"?: Address;
      }
      export type TriggerResult = Readonly<Record<string, never>>;
      export interface SetAddressesParams {
        readonly "addresses": ReadonlyArray<Address>;
      }
      export type SetAddressesResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface AddressFormFilledEvent {
        readonly "filledFields": ReadonlyArray<FilledField>;
        readonly "addressUi": AddressUI;
      }
    }
  }
  export namespace BackgroundService {
    export type ServiceName = "backgroundFetch" | "backgroundSync" | "pushMessaging" | "notifications" | "paymentHandler" | "periodicBackgroundSync";
    export interface EventMetadata {
      readonly "key": string;
      readonly "value": string;
    }
    export interface BackgroundServiceEvent {
      readonly "timestamp": Protocol.Network.TimeSinceEpoch;
      readonly "origin": string;
      readonly "serviceWorkerRegistrationId": Protocol.ServiceWorker.RegistrationID;
      readonly "service": ServiceName;
      readonly "eventName": string;
      readonly "instanceId": string;
      readonly "eventMetadata": ReadonlyArray<EventMetadata>;
      readonly "storageKey": string;
    }
    export namespace Commands {
      export interface StartObservingParams {
        readonly "service": ServiceName;
      }
      export type StartObservingResult = Readonly<Record<string, never>>;
      export interface StopObservingParams {
        readonly "service": ServiceName;
      }
      export type StopObservingResult = Readonly<Record<string, never>>;
      export interface SetRecordingParams {
        readonly "shouldRecord": boolean;
        readonly "service": ServiceName;
      }
      export type SetRecordingResult = Readonly<Record<string, never>>;
      export interface ClearEventsParams {
        readonly "service": ServiceName;
      }
      export type ClearEventsResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface RecordingStateChangedEvent {
        readonly "isRecording": boolean;
        readonly "service": ServiceName;
      }
      export interface BackgroundServiceEventReceivedEvent {
        readonly "backgroundServiceEvent": BackgroundServiceEvent;
      }
    }
  }
  export namespace BluetoothEmulation {
    export type CentralState = "absent" | "powered-off" | "powered-on";
    export type GATTOperationType = "connection" | "discovery";
    export type CharacteristicWriteType = "write-default-deprecated" | "write-with-response" | "write-without-response";
    export type CharacteristicOperationType = "read" | "write" | "subscribe-to-notifications" | "unsubscribe-from-notifications";
    export type DescriptorOperationType = "read" | "write";
    export interface ManufacturerData {
      readonly "key": number;
      readonly "data": string;
    }
    export interface ScanRecord {
      readonly "name"?: string;
      readonly "uuids"?: ReadonlyArray<string>;
      readonly "appearance"?: number;
      readonly "txPower"?: number;
      readonly "manufacturerData"?: ReadonlyArray<ManufacturerData>;
    }
    export interface ScanEntry {
      readonly "deviceAddress": string;
      readonly "rssi": number;
      readonly "scanRecord": ScanRecord;
    }
    export interface CharacteristicProperties {
      readonly "broadcast"?: boolean;
      readonly "read"?: boolean;
      readonly "writeWithoutResponse"?: boolean;
      readonly "write"?: boolean;
      readonly "notify"?: boolean;
      readonly "indicate"?: boolean;
      readonly "authenticatedSignedWrites"?: boolean;
      readonly "extendedProperties"?: boolean;
    }
    export namespace Commands {
      export interface EnableParams {
        readonly "state": CentralState;
        readonly "leSupported": boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface SetSimulatedCentralStateParams {
        readonly "state": CentralState;
      }
      export type SetSimulatedCentralStateResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface SimulatePreconnectedPeripheralParams {
        readonly "address": string;
        readonly "name": string;
        readonly "manufacturerData": ReadonlyArray<ManufacturerData>;
        readonly "knownServiceUuids": ReadonlyArray<string>;
      }
      export type SimulatePreconnectedPeripheralResult = Readonly<Record<string, never>>;
      export interface SimulateAdvertisementParams {
        readonly "entry": ScanEntry;
      }
      export type SimulateAdvertisementResult = Readonly<Record<string, never>>;
      export interface SimulateGATTOperationResponseParams {
        readonly "address": string;
        readonly "type": GATTOperationType;
        readonly "code": number;
      }
      export type SimulateGATTOperationResponseResult = Readonly<Record<string, never>>;
      export interface SimulateCharacteristicOperationResponseParams {
        readonly "characteristicId": string;
        readonly "type": CharacteristicOperationType;
        readonly "code": number;
        readonly "data"?: string;
      }
      export type SimulateCharacteristicOperationResponseResult = Readonly<Record<string, never>>;
      export interface SimulateDescriptorOperationResponseParams {
        readonly "descriptorId": string;
        readonly "type": DescriptorOperationType;
        readonly "code": number;
        readonly "data"?: string;
      }
      export type SimulateDescriptorOperationResponseResult = Readonly<Record<string, never>>;
      export interface AddServiceParams {
        readonly "address": string;
        readonly "serviceUuid": string;
      }
      export interface AddServiceResult {
        readonly "serviceId": string;
      }
      export interface RemoveServiceParams {
        readonly "serviceId": string;
      }
      export type RemoveServiceResult = Readonly<Record<string, never>>;
      export interface AddCharacteristicParams {
        readonly "serviceId": string;
        readonly "characteristicUuid": string;
        readonly "properties": CharacteristicProperties;
      }
      export interface AddCharacteristicResult {
        readonly "characteristicId": string;
      }
      export interface RemoveCharacteristicParams {
        readonly "characteristicId": string;
      }
      export type RemoveCharacteristicResult = Readonly<Record<string, never>>;
      export interface AddDescriptorParams {
        readonly "characteristicId": string;
        readonly "descriptorUuid": string;
      }
      export interface AddDescriptorResult {
        readonly "descriptorId": string;
      }
      export interface RemoveDescriptorParams {
        readonly "descriptorId": string;
      }
      export type RemoveDescriptorResult = Readonly<Record<string, never>>;
      export interface SimulateGATTDisconnectionParams {
        readonly "address": string;
      }
      export type SimulateGATTDisconnectionResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface GattOperationReceivedEvent {
        readonly "address": string;
        readonly "type": GATTOperationType;
      }
      export interface CharacteristicOperationReceivedEvent {
        readonly "characteristicId": string;
        readonly "type": CharacteristicOperationType;
        readonly "data"?: string;
        readonly "writeType"?: CharacteristicWriteType;
      }
      export interface DescriptorOperationReceivedEvent {
        readonly "descriptorId": string;
        readonly "type": DescriptorOperationType;
        readonly "data"?: string;
      }
    }
  }
  export namespace Browser {
    export type BrowserContextID = string;
    export type WindowID = number;
    export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen";
    export interface Bounds {
      readonly "left"?: number;
      readonly "top"?: number;
      readonly "width"?: number;
      readonly "height"?: number;
      readonly "windowState"?: WindowState;
    }
    export type PermissionType = "ar" | "audioCapture" | "automaticFullscreen" | "backgroundFetch" | "backgroundSync" | "cameraPanTiltZoom" | "capturedSurfaceControl" | "clipboardReadWrite" | "clipboardSanitizedWrite" | "displayCapture" | "durableStorage" | "geolocation" | "handTracking" | "idleDetection" | "keyboardLock" | "localFonts" | "localNetwork" | "localNetworkAccess" | "loopbackNetwork" | "midi" | "midiSysex" | "nfc" | "notifications" | "paymentHandler" | "periodicBackgroundSync" | "pointerLock" | "protectedMediaIdentifier" | "sensors" | "smartCard" | "speakerSelection" | "storageAccess" | "topLevelStorageAccess" | "videoCapture" | "vr" | "wakeLockScreen" | "wakeLockSystem" | "webAppInstallation" | "webPrinting" | "windowManagement";
    export type PermissionSetting = "granted" | "denied" | "prompt";
    export interface PermissionDescriptor {
      readonly "name": string;
      readonly "sysex"?: boolean;
      readonly "userVisibleOnly"?: boolean;
      readonly "allowWithoutSanitization"?: boolean;
      readonly "allowWithoutGesture"?: boolean;
      readonly "panTiltZoom"?: boolean;
    }
    export type BrowserCommandId = "openTabSearch" | "closeTabSearch" | "openGlic";
    export interface Bucket {
      readonly "low": number;
      readonly "high": number;
      readonly "count": number;
    }
    export interface Histogram {
      readonly "name": string;
      readonly "sum": number;
      readonly "count": number;
      readonly "buckets": ReadonlyArray<Bucket>;
    }
    export namespace Commands {
      export interface SetPermissionParams {
        readonly "permission": PermissionDescriptor;
        readonly "setting": PermissionSetting;
        readonly "origin"?: string;
        readonly "embeddedOrigin"?: string;
        readonly "browserContextId"?: BrowserContextID;
      }
      export type SetPermissionResult = Readonly<Record<string, never>>;
      export interface GrantPermissionsParams {
        readonly "permissions": ReadonlyArray<PermissionType>;
        readonly "origin"?: string;
        readonly "browserContextId"?: BrowserContextID;
      }
      export type GrantPermissionsResult = Readonly<Record<string, never>>;
      export interface ResetPermissionsParams {
        readonly "browserContextId"?: BrowserContextID;
      }
      export type ResetPermissionsResult = Readonly<Record<string, never>>;
      export interface SetDownloadBehaviorParams {
        readonly "behavior": "deny" | "allow" | "allowAndName" | "default";
        readonly "browserContextId"?: BrowserContextID;
        readonly "downloadPath"?: string;
        readonly "eventsEnabled"?: boolean;
      }
      export type SetDownloadBehaviorResult = Readonly<Record<string, never>>;
      export interface CancelDownloadParams {
        readonly "guid": string;
        readonly "browserContextId"?: BrowserContextID;
      }
      export type CancelDownloadResult = Readonly<Record<string, never>>;
      export type CloseParams = undefined;
      export type CloseResult = Readonly<Record<string, never>>;
      export type CrashParams = undefined;
      export type CrashResult = Readonly<Record<string, never>>;
      export type CrashGpuProcessParams = undefined;
      export type CrashGpuProcessResult = Readonly<Record<string, never>>;
      export type GetVersionParams = undefined;
      export interface GetVersionResult {
        readonly "protocolVersion": string;
        readonly "product": string;
        readonly "revision": string;
        readonly "userAgent": string;
        readonly "jsVersion": string;
      }
      export type GetBrowserCommandLineParams = undefined;
      export interface GetBrowserCommandLineResult {
        readonly "arguments": ReadonlyArray<string>;
      }
      export interface GetHistogramsParams {
        readonly "query"?: string;
        readonly "delta"?: boolean;
      }
      export interface GetHistogramsResult {
        readonly "histograms": ReadonlyArray<Histogram>;
      }
      export interface GetHistogramParams {
        readonly "name": string;
        readonly "delta"?: boolean;
      }
      export interface GetHistogramResult {
        readonly "histogram": Histogram;
      }
      export interface GetWindowBoundsParams {
        readonly "windowId": WindowID;
      }
      export interface GetWindowBoundsResult {
        readonly "bounds": Bounds;
      }
      export interface GetWindowForTargetParams {
        readonly "targetId"?: Protocol.Target.TargetID;
      }
      export interface GetWindowForTargetResult {
        readonly "windowId": WindowID;
        readonly "bounds": Bounds;
      }
      export interface SetWindowBoundsParams {
        readonly "windowId": WindowID;
        readonly "bounds": Bounds;
      }
      export type SetWindowBoundsResult = Readonly<Record<string, never>>;
      export interface SetContentsSizeParams {
        readonly "windowId": WindowID;
        readonly "width"?: number;
        readonly "height"?: number;
      }
      export type SetContentsSizeResult = Readonly<Record<string, never>>;
      export interface SetDockTileParams {
        readonly "badgeLabel"?: string;
        readonly "image"?: string;
      }
      export type SetDockTileResult = Readonly<Record<string, never>>;
      export interface ExecuteBrowserCommandParams {
        readonly "commandId": BrowserCommandId;
      }
      export type ExecuteBrowserCommandResult = Readonly<Record<string, never>>;
      export interface AddPrivacySandboxEnrollmentOverrideParams {
        readonly "url": string;
      }
      export type AddPrivacySandboxEnrollmentOverrideResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DownloadWillBeginEvent {
        readonly "frameId": Protocol.Page.FrameId;
        readonly "guid": string;
        readonly "url": string;
        readonly "suggestedFilename": string;
      }
      export interface DownloadProgressEvent {
        readonly "guid": string;
        readonly "totalBytes": number;
        readonly "receivedBytes": number;
        readonly "state": "inProgress" | "completed" | "canceled";
        readonly "filePath"?: string;
      }
    }
  }
  export namespace CSS {
    export type StyleSheetOrigin = "injected" | "user-agent" | "inspector" | "regular";
    export interface PseudoElementMatches {
      readonly "pseudoType": Protocol.DOM.PseudoType;
      readonly "pseudoIdentifier"?: string;
      readonly "matches": ReadonlyArray<RuleMatch>;
    }
    export interface CSSAnimationStyle {
      readonly "name"?: string;
      readonly "style": CSSStyle;
    }
    export interface InheritedStyleEntry {
      readonly "inlineStyle"?: CSSStyle;
      readonly "matchedCSSRules": ReadonlyArray<RuleMatch>;
    }
    export interface InheritedAnimatedStyleEntry {
      readonly "animationStyles"?: ReadonlyArray<CSSAnimationStyle>;
      readonly "transitionsStyle"?: CSSStyle;
    }
    export interface InheritedPseudoElementMatches {
      readonly "pseudoElements": ReadonlyArray<PseudoElementMatches>;
    }
    export interface RuleMatch {
      readonly "rule": CSSRule;
      readonly "matchingSelectors": ReadonlyArray<number>;
    }
    export interface Value {
      readonly "text": string;
      readonly "range"?: SourceRange;
      readonly "specificity"?: Specificity;
    }
    export interface SpecificityComponent {
      readonly "text": string;
      readonly "a": number;
      readonly "b": number;
      readonly "c": number;
    }
    export interface Specificity {
      readonly "a": number;
      readonly "b": number;
      readonly "c": number;
      readonly "components"?: ReadonlyArray<SpecificityComponent>;
    }
    export interface SelectorList {
      readonly "selectors": ReadonlyArray<Value>;
      readonly "text": string;
    }
    export interface CSSStyleSheetHeader {
      readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      readonly "frameId": Protocol.Page.FrameId;
      readonly "sourceURL": string;
      readonly "sourceMapURL"?: string;
      readonly "origin": StyleSheetOrigin;
      readonly "title": string;
      readonly "ownerNode"?: Protocol.DOM.BackendNodeId;
      readonly "disabled": boolean;
      readonly "hasSourceURL"?: boolean;
      readonly "isInline": boolean;
      readonly "isMutable": boolean;
      readonly "isConstructed": boolean;
      readonly "startLine": number;
      readonly "startColumn": number;
      readonly "length": number;
      readonly "endLine": number;
      readonly "endColumn": number;
      readonly "loadingFailed"?: boolean;
    }
    export interface CSSRule {
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "selectorList": SelectorList;
      readonly "nestingSelectors"?: ReadonlyArray<string>;
      readonly "origin": StyleSheetOrigin;
      readonly "style": CSSStyle;
      readonly "originTreeScopeNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "media"?: ReadonlyArray<CSSMedia>;
      readonly "containerQueries"?: ReadonlyArray<CSSContainerQuery>;
      readonly "supports"?: ReadonlyArray<CSSSupports>;
      readonly "layers"?: ReadonlyArray<CSSLayer>;
      readonly "scopes"?: ReadonlyArray<CSSScope>;
      readonly "ruleTypes"?: ReadonlyArray<CSSRuleType>;
      readonly "startingStyles"?: ReadonlyArray<CSSStartingStyle>;
      readonly "navigations"?: ReadonlyArray<CSSNavigation>;
    }
    export type CSSRuleType = "MediaRule" | "SupportsRule" | "ContainerRule" | "LayerRule" | "ScopeRule" | "StyleRule" | "StartingStyleRule" | "NavigationRule";
    export interface RuleUsage {
      readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      readonly "startOffset": number;
      readonly "endOffset": number;
      readonly "used": boolean;
    }
    export interface SourceRange {
      readonly "startLine": number;
      readonly "startColumn": number;
      readonly "endLine": number;
      readonly "endColumn": number;
    }
    export interface ShorthandEntry {
      readonly "name": string;
      readonly "value": string;
      readonly "important"?: boolean;
    }
    export interface CSSComputedStyleProperty {
      readonly "name": string;
      readonly "value": string;
    }
    export interface ComputedStyleExtraFields {
      readonly "isAppearanceBase": boolean;
    }
    export interface CSSStyle {
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "cssProperties": ReadonlyArray<CSSProperty>;
      readonly "shorthandEntries": ReadonlyArray<ShorthandEntry>;
      readonly "cssText"?: string;
      readonly "range"?: SourceRange;
    }
    export interface CSSProperty {
      readonly "name": string;
      readonly "value": string;
      readonly "important"?: boolean;
      readonly "implicit"?: boolean;
      readonly "text"?: string;
      readonly "parsedOk"?: boolean;
      readonly "disabled"?: boolean;
      readonly "range"?: SourceRange;
      readonly "longhandProperties"?: ReadonlyArray<CSSProperty>;
    }
    export interface CSSMedia {
      readonly "text": string;
      readonly "source": "mediaRule" | "importRule" | "linkedSheet" | "inlineSheet";
      readonly "sourceURL"?: string;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "mediaList"?: ReadonlyArray<MediaQuery>;
    }
    export interface MediaQuery {
      readonly "expressions": ReadonlyArray<MediaQueryExpression>;
      readonly "active": boolean;
    }
    export interface MediaQueryExpression {
      readonly "value": number;
      readonly "unit": string;
      readonly "feature": string;
      readonly "valueRange"?: SourceRange;
      readonly "computedLength"?: number;
    }
    export interface CSSContainerQuery {
      readonly "text": string;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "name"?: string;
      readonly "physicalAxes"?: Protocol.DOM.PhysicalAxes;
      readonly "logicalAxes"?: Protocol.DOM.LogicalAxes;
      readonly "queriesScrollState"?: boolean;
      readonly "queriesAnchored"?: boolean;
      readonly "conditionText": string;
    }
    export interface CSSSupports {
      readonly "text": string;
      readonly "active": boolean;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
    }
    export interface CSSNavigation {
      readonly "text": string;
      readonly "active"?: boolean;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
    }
    export interface CSSScope {
      readonly "text": string;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
    }
    export interface CSSLayer {
      readonly "text": string;
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
    }
    export interface CSSStartingStyle {
      readonly "range"?: SourceRange;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
    }
    export interface CSSLayerData {
      readonly "name": string;
      readonly "subLayers"?: ReadonlyArray<CSSLayerData>;
      readonly "order": number;
    }
    export interface PlatformFontUsage {
      readonly "familyName": string;
      readonly "postScriptName": string;
      readonly "isCustomFont": boolean;
      readonly "glyphCount": number;
    }
    export interface FontVariationAxis {
      readonly "tag": string;
      readonly "name": string;
      readonly "minValue": number;
      readonly "maxValue": number;
      readonly "defaultValue": number;
    }
    export interface FontFace {
      readonly "fontFamily": string;
      readonly "fontStyle": string;
      readonly "fontVariant": string;
      readonly "fontWeight": string;
      readonly "fontStretch": string;
      readonly "fontDisplay": string;
      readonly "unicodeRange": string;
      readonly "src": string;
      readonly "platformFontFamily": string;
      readonly "fontVariationAxes"?: ReadonlyArray<FontVariationAxis>;
    }
    export interface CSSTryRule {
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "style": CSSStyle;
    }
    export interface CSSPositionTryRule {
      readonly "name": Value;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "style": CSSStyle;
      readonly "active": boolean;
    }
    export interface CSSKeyframesRule {
      readonly "animationName": Value;
      readonly "keyframes": ReadonlyArray<CSSKeyframeRule>;
    }
    export interface CSSPropertyRegistration {
      readonly "propertyName": string;
      readonly "initialValue"?: Value;
      readonly "inherits": boolean;
      readonly "syntax": string;
    }
    export interface CSSAtRule {
      readonly "type": "font-face" | "font-feature-values" | "font-palette-values" | "counter-style";
      readonly "subsection"?: "swash" | "annotation" | "ornaments" | "stylistic" | "styleset" | "character-variant";
      readonly "name"?: Value;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "style": CSSStyle;
    }
    export interface CSSPropertyRule {
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "propertyName": Value;
      readonly "style": CSSStyle;
    }
    export interface CSSFunctionParameter {
      readonly "name": string;
      readonly "type": string;
    }
    export interface CSSFunctionConditionNode {
      readonly "media"?: CSSMedia;
      readonly "containerQueries"?: CSSContainerQuery;
      readonly "supports"?: CSSSupports;
      readonly "navigation"?: CSSNavigation;
      readonly "children": ReadonlyArray<CSSFunctionNode>;
      readonly "conditionText": string;
    }
    export interface CSSFunctionNode {
      readonly "condition"?: CSSFunctionConditionNode;
      readonly "style"?: CSSStyle;
    }
    export interface CSSFunctionRule {
      readonly "name": Value;
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "parameters": ReadonlyArray<CSSFunctionParameter>;
      readonly "children": ReadonlyArray<CSSFunctionNode>;
      readonly "originTreeScopeNodeId"?: Protocol.DOM.BackendNodeId;
    }
    export interface CSSKeyframeRule {
      readonly "styleSheetId"?: Protocol.DOM.StyleSheetId;
      readonly "origin": StyleSheetOrigin;
      readonly "keyText": Value;
      readonly "style": CSSStyle;
    }
    export interface StyleDeclarationEdit {
      readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      readonly "range": SourceRange;
      readonly "text": string;
    }
    export namespace Commands {
      export interface AddRuleParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "ruleText": string;
        readonly "location": SourceRange;
        readonly "nodeForPropertySyntaxValidation"?: Protocol.DOM.NodeId;
      }
      export interface AddRuleResult {
        readonly "rule": CSSRule;
      }
      export interface CollectClassNamesParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      }
      export interface CollectClassNamesResult {
        readonly "classNames": ReadonlyArray<string>;
      }
      export interface CreateStyleSheetParams {
        readonly "frameId": Protocol.Page.FrameId;
        readonly "force"?: boolean;
      }
      export interface CreateStyleSheetResult {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      }
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface ForcePseudoStateParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "forcedPseudoClasses": ReadonlyArray<string>;
      }
      export type ForcePseudoStateResult = Readonly<Record<string, never>>;
      export interface ForceStartingStyleParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "forced": boolean;
      }
      export type ForceStartingStyleResult = Readonly<Record<string, never>>;
      export interface GetBackgroundColorsParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetBackgroundColorsResult {
        readonly "backgroundColors"?: ReadonlyArray<string>;
        readonly "computedFontSize"?: string;
        readonly "computedFontWeight"?: string;
      }
      export interface GetComputedStyleForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetComputedStyleForNodeResult {
        readonly "computedStyle": ReadonlyArray<CSSComputedStyleProperty>;
        readonly "extraFields": ComputedStyleExtraFields;
      }
      export interface ResolveValuesParams {
        readonly "values": ReadonlyArray<string>;
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "propertyName"?: string;
        readonly "pseudoType"?: Protocol.DOM.PseudoType;
        readonly "pseudoIdentifier"?: string;
      }
      export interface ResolveValuesResult {
        readonly "results": ReadonlyArray<string>;
      }
      export interface GetLonghandPropertiesParams {
        readonly "shorthandName": string;
        readonly "value": string;
      }
      export interface GetLonghandPropertiesResult {
        readonly "longhandProperties": ReadonlyArray<CSSProperty>;
      }
      export interface GetInlineStylesForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetInlineStylesForNodeResult {
        readonly "inlineStyle"?: CSSStyle;
        readonly "attributesStyle"?: CSSStyle;
      }
      export interface GetAnimatedStylesForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetAnimatedStylesForNodeResult {
        readonly "animationStyles"?: ReadonlyArray<CSSAnimationStyle>;
        readonly "transitionsStyle"?: CSSStyle;
        readonly "inherited"?: ReadonlyArray<InheritedAnimatedStyleEntry>;
      }
      export interface GetMatchedStylesForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetMatchedStylesForNodeResult {
        readonly "inlineStyle"?: CSSStyle;
        readonly "attributesStyle"?: CSSStyle;
        readonly "matchedCSSRules"?: ReadonlyArray<RuleMatch>;
        readonly "pseudoElements"?: ReadonlyArray<PseudoElementMatches>;
        readonly "inherited"?: ReadonlyArray<InheritedStyleEntry>;
        readonly "inheritedPseudoElements"?: ReadonlyArray<InheritedPseudoElementMatches>;
        readonly "cssKeyframesRules"?: ReadonlyArray<CSSKeyframesRule>;
        readonly "cssPositionTryRules"?: ReadonlyArray<CSSPositionTryRule>;
        readonly "activePositionFallbackIndex"?: number;
        readonly "cssPropertyRules"?: ReadonlyArray<CSSPropertyRule>;
        readonly "cssPropertyRegistrations"?: ReadonlyArray<CSSPropertyRegistration>;
        readonly "cssAtRules"?: ReadonlyArray<CSSAtRule>;
        readonly "parentLayoutNodeId"?: Protocol.DOM.NodeId;
        readonly "cssFunctionRules"?: ReadonlyArray<CSSFunctionRule>;
      }
      export type GetEnvironmentVariablesParams = undefined;
      export interface GetEnvironmentVariablesResult {
        readonly "environmentVariables": Readonly<Record<string, unknown>>;
      }
      export type GetMediaQueriesParams = undefined;
      export interface GetMediaQueriesResult {
        readonly "medias": ReadonlyArray<CSSMedia>;
      }
      export interface GetPlatformFontsForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetPlatformFontsForNodeResult {
        readonly "fonts": ReadonlyArray<PlatformFontUsage>;
      }
      export interface GetStyleSheetTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      }
      export interface GetStyleSheetTextResult {
        readonly "text": string;
      }
      export interface GetLayersForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetLayersForNodeResult {
        readonly "rootLayer": CSSLayerData;
      }
      export interface GetLocationForSelectorParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "selectorText": string;
      }
      export interface GetLocationForSelectorResult {
        readonly "ranges": ReadonlyArray<SourceRange>;
      }
      export interface TrackComputedStyleUpdatesForNodeParams {
        readonly "nodeId"?: Protocol.DOM.NodeId;
      }
      export type TrackComputedStyleUpdatesForNodeResult = Readonly<Record<string, never>>;
      export interface TrackComputedStyleUpdatesParams {
        readonly "propertiesToTrack": ReadonlyArray<CSSComputedStyleProperty>;
      }
      export type TrackComputedStyleUpdatesResult = Readonly<Record<string, never>>;
      export type TakeComputedStyleUpdatesParams = undefined;
      export interface TakeComputedStyleUpdatesResult {
        readonly "nodeIds": ReadonlyArray<Protocol.DOM.NodeId>;
      }
      export interface SetEffectivePropertyValueForNodeParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "propertyName": string;
        readonly "value": string;
      }
      export type SetEffectivePropertyValueForNodeResult = Readonly<Record<string, never>>;
      export interface SetPropertyRulePropertyNameParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "propertyName": string;
      }
      export interface SetPropertyRulePropertyNameResult {
        readonly "propertyName": Value;
      }
      export interface SetKeyframeKeyParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "keyText": string;
      }
      export interface SetKeyframeKeyResult {
        readonly "keyText": Value;
      }
      export interface SetMediaTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetMediaTextResult {
        readonly "media": CSSMedia;
      }
      export interface SetContainerQueryTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetContainerQueryTextResult {
        readonly "containerQuery": CSSContainerQuery;
      }
      export interface SetContainerQueryConditionTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetContainerQueryConditionTextResult {
        readonly "containerQuery": CSSContainerQuery;
      }
      export interface SetSupportsTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetSupportsTextResult {
        readonly "supports": CSSSupports;
      }
      export interface SetNavigationTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetNavigationTextResult {
        readonly "navigation": CSSNavigation;
      }
      export interface SetScopeTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "text": string;
      }
      export interface SetScopeTextResult {
        readonly "scope": CSSScope;
      }
      export interface SetRuleSelectorParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "range": SourceRange;
        readonly "selector": string;
      }
      export interface SetRuleSelectorResult {
        readonly "selectorList": SelectorList;
      }
      export interface SetStyleSheetTextParams {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
        readonly "text": string;
      }
      export interface SetStyleSheetTextResult {
        readonly "sourceMapURL"?: string;
      }
      export interface SetStyleTextsParams {
        readonly "edits": ReadonlyArray<StyleDeclarationEdit>;
        readonly "nodeForPropertySyntaxValidation"?: Protocol.DOM.NodeId;
      }
      export interface SetStyleTextsResult {
        readonly "styles": ReadonlyArray<CSSStyle>;
      }
      export type StartRuleUsageTrackingParams = undefined;
      export type StartRuleUsageTrackingResult = Readonly<Record<string, never>>;
      export type StopRuleUsageTrackingParams = undefined;
      export interface StopRuleUsageTrackingResult {
        readonly "ruleUsage": ReadonlyArray<RuleUsage>;
      }
      export type TakeCoverageDeltaParams = undefined;
      export interface TakeCoverageDeltaResult {
        readonly "coverage": ReadonlyArray<RuleUsage>;
        readonly "timestamp": number;
      }
      export interface SetLocalFontsEnabledParams {
        readonly "enabled": boolean;
      }
      export type SetLocalFontsEnabledResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface FontsUpdatedEvent {
        readonly "font"?: FontFace;
      }
      export type MediaQueryResultChangedEvent = Readonly<Record<string, never>>;
      export interface StyleSheetAddedEvent {
        readonly "header": CSSStyleSheetHeader;
      }
      export interface StyleSheetChangedEvent {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      }
      export interface StyleSheetRemovedEvent {
        readonly "styleSheetId": Protocol.DOM.StyleSheetId;
      }
      export interface ComputedStyleUpdatedEvent {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
    }
  }
  export namespace CacheStorage {
    export type CacheId = string;
    export type CachedResponseType = "basic" | "cors" | "default" | "error" | "opaqueResponse" | "opaqueRedirect";
    export interface DataEntry {
      readonly "requestURL": string;
      readonly "requestMethod": string;
      readonly "requestHeaders": ReadonlyArray<Header>;
      readonly "responseTime": number;
      readonly "responseStatus": number;
      readonly "responseStatusText": string;
      readonly "responseType": CachedResponseType;
      readonly "responseHeaders": ReadonlyArray<Header>;
    }
    export interface Cache {
      readonly "cacheId": CacheId;
      readonly "securityOrigin": string;
      readonly "storageKey": string;
      readonly "storageBucket"?: Protocol.Storage.StorageBucket;
      readonly "cacheName": string;
    }
    export interface Header {
      readonly "name": string;
      readonly "value": string;
    }
    export interface CachedResponse {
      readonly "body": string;
    }
    export namespace Commands {
      export interface DeleteCacheParams {
        readonly "cacheId": CacheId;
      }
      export type DeleteCacheResult = Readonly<Record<string, never>>;
      export interface DeleteEntryParams {
        readonly "cacheId": CacheId;
        readonly "request": string;
      }
      export type DeleteEntryResult = Readonly<Record<string, never>>;
      export interface RequestCacheNamesParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
      }
      export interface RequestCacheNamesResult {
        readonly "caches": ReadonlyArray<Cache>;
      }
      export interface RequestCachedResponseParams {
        readonly "cacheId": CacheId;
        readonly "requestURL": string;
        readonly "requestHeaders": ReadonlyArray<Header>;
      }
      export interface RequestCachedResponseResult {
        readonly "response": CachedResponse;
      }
      export interface RequestEntriesParams {
        readonly "cacheId": CacheId;
        readonly "skipCount"?: number;
        readonly "pageSize"?: number;
        readonly "pathFilter"?: string;
      }
      export interface RequestEntriesResult {
        readonly "cacheDataEntries": ReadonlyArray<DataEntry>;
        readonly "returnCount": number;
      }
    }
    export namespace Events {
    }
  }
  export namespace Cast {
    export interface Sink {
      readonly "name": string;
      readonly "id": string;
      readonly "session"?: string;
    }
    export namespace Commands {
      export interface EnableParams {
        readonly "presentationUrl"?: string;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface SetSinkToUseParams {
        readonly "sinkName": string;
      }
      export type SetSinkToUseResult = Readonly<Record<string, never>>;
      export interface StartDesktopMirroringParams {
        readonly "sinkName": string;
      }
      export type StartDesktopMirroringResult = Readonly<Record<string, never>>;
      export interface StartTabMirroringParams {
        readonly "sinkName": string;
      }
      export type StartTabMirroringResult = Readonly<Record<string, never>>;
      export interface StopCastingParams {
        readonly "sinkName": string;
      }
      export type StopCastingResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface SinksUpdatedEvent {
        readonly "sinks": ReadonlyArray<Sink>;
      }
      export interface IssueUpdatedEvent {
        readonly "issueMessage": string;
      }
    }
  }
  export namespace CrashReportContext {
    export interface CrashReportContextEntry {
      readonly "key": string;
      readonly "value": string;
      readonly "frameId": Protocol.Page.FrameId;
    }
    export namespace Commands {
      export type GetEntriesParams = undefined;
      export interface GetEntriesResult {
        readonly "entries": ReadonlyArray<CrashReportContextEntry>;
      }
    }
    export namespace Events {
    }
  }
  export namespace DOM {
    export type NodeId = number;
    export type BackendNodeId = number;
    export type StyleSheetId = string;
    export interface BackendNode {
      readonly "nodeType": number;
      readonly "nodeName": string;
      readonly "backendNodeId": BackendNodeId;
    }
    export type PseudoType = "first-line" | "first-letter" | "checkmark" | "before" | "after" | "expand-icon" | "picker-icon" | "interest-button" | "marker" | "backdrop" | "column" | "selection" | "search-text" | "target-text" | "spelling-error" | "grammar-error" | "highlight" | "first-line-inherited" | "scroll-marker" | "scroll-marker-group" | "scroll-button" | "scrollbar" | "scrollbar-thumb" | "scrollbar-button" | "scrollbar-track" | "scrollbar-track-piece" | "scrollbar-corner" | "resizer" | "input-list-button" | "view-transition" | "view-transition-group" | "view-transition-image-pair" | "view-transition-group-children" | "view-transition-old" | "view-transition-new" | "placeholder" | "file-selector-button" | "details-content" | "picker" | "select-listbox" | "permission-icon" | "overscroll-area-parent" | "overscroll-backdrop" | "skeleton";
    export type ShadowRootType = "user-agent" | "open" | "closed";
    export type CompatibilityMode = "QuirksMode" | "LimitedQuirksMode" | "NoQuirksMode";
    export type PhysicalAxes = "Horizontal" | "Vertical" | "Both";
    export type LogicalAxes = "Inline" | "Block" | "Both";
    export type ScrollOrientation = "horizontal" | "vertical";
    export interface Node {
      readonly "nodeId": NodeId;
      readonly "parentId"?: NodeId;
      readonly "backendNodeId": BackendNodeId;
      readonly "nodeType": number;
      readonly "nodeName": string;
      readonly "localName": string;
      readonly "nodeValue": string;
      readonly "childNodeCount"?: number;
      readonly "children"?: ReadonlyArray<Node>;
      readonly "attributes"?: ReadonlyArray<string>;
      readonly "documentURL"?: string;
      readonly "baseURL"?: string;
      readonly "publicId"?: string;
      readonly "systemId"?: string;
      readonly "internalSubset"?: string;
      readonly "xmlVersion"?: string;
      readonly "name"?: string;
      readonly "value"?: string;
      readonly "pseudoType"?: PseudoType;
      readonly "pseudoIdentifier"?: string;
      readonly "shadowRootType"?: ShadowRootType;
      readonly "frameId"?: Protocol.Page.FrameId;
      readonly "contentDocument"?: Node;
      readonly "shadowRoots"?: ReadonlyArray<Node>;
      readonly "templateContent"?: Node;
      readonly "pseudoElements"?: ReadonlyArray<Node>;
      readonly "importedDocument"?: Node;
      readonly "distributedNodes"?: ReadonlyArray<BackendNode>;
      readonly "isSVG"?: boolean;
      readonly "compatibilityMode"?: CompatibilityMode;
      readonly "assignedSlot"?: BackendNode;
      readonly "isScrollable"?: boolean;
      readonly "affectedByStartingStyles"?: boolean;
      readonly "adoptedStyleSheets"?: ReadonlyArray<StyleSheetId>;
      readonly "adProvenance"?: Protocol.Network.AdProvenance;
    }
    export interface DetachedElementInfo {
      readonly "treeNode": Node;
      readonly "retainedNodeIds": ReadonlyArray<NodeId>;
    }
    export interface RGBA {
      readonly "r": number;
      readonly "g": number;
      readonly "b": number;
      readonly "a"?: number;
    }
    export type Quad = ReadonlyArray<number>;
    export interface BoxModel {
      readonly "content": Quad;
      readonly "padding": Quad;
      readonly "border": Quad;
      readonly "margin": Quad;
      readonly "width": number;
      readonly "height": number;
      readonly "shapeOutside"?: ShapeOutsideInfo;
    }
    export interface ShapeOutsideInfo {
      readonly "bounds": Quad;
      readonly "shape": ReadonlyArray<unknown>;
      readonly "marginShape": ReadonlyArray<unknown>;
    }
    export interface Rect {
      readonly "x": number;
      readonly "y": number;
      readonly "width": number;
      readonly "height": number;
    }
    export interface CSSComputedStyleProperty {
      readonly "name": string;
      readonly "value": string;
    }
    export namespace Commands {
      export interface CollectClassNamesFromSubtreeParams {
        readonly "nodeId": NodeId;
      }
      export interface CollectClassNamesFromSubtreeResult {
        readonly "classNames": ReadonlyArray<string>;
      }
      export interface CopyToParams {
        readonly "nodeId": NodeId;
        readonly "targetNodeId": NodeId;
        readonly "insertBeforeNodeId"?: NodeId;
      }
      export interface CopyToResult {
        readonly "nodeId": NodeId;
      }
      export interface DescribeNodeParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "depth"?: number;
        readonly "pierce"?: boolean;
      }
      export interface DescribeNodeResult {
        readonly "node": Node;
      }
      export interface ScrollIntoViewIfNeededParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "rect"?: Rect;
      }
      export type ScrollIntoViewIfNeededResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface DiscardSearchResultsParams {
        readonly "searchId": string;
      }
      export type DiscardSearchResultsResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "includeWhitespace"?: "none" | "all";
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface FocusParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export type FocusResult = Readonly<Record<string, never>>;
      export interface GetAttributesParams {
        readonly "nodeId": NodeId;
      }
      export interface GetAttributesResult {
        readonly "attributes": ReadonlyArray<string>;
      }
      export interface GetBoxModelParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export interface GetBoxModelResult {
        readonly "model": BoxModel;
      }
      export interface GetContentQuadsParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export interface GetContentQuadsResult {
        readonly "quads": ReadonlyArray<Quad>;
      }
      export interface GetDocumentParams {
        readonly "depth"?: number;
        readonly "pierce"?: boolean;
      }
      export interface GetDocumentResult {
        readonly "root": Node;
      }
      export interface GetFlattenedDocumentParams {
        readonly "depth"?: number;
        readonly "pierce"?: boolean;
      }
      export interface GetFlattenedDocumentResult {
        readonly "nodes": ReadonlyArray<Node>;
      }
      export interface GetNodesForSubtreeByStyleParams {
        readonly "nodeId": NodeId;
        readonly "computedStyles": ReadonlyArray<CSSComputedStyleProperty>;
        readonly "pierce"?: boolean;
      }
      export interface GetNodesForSubtreeByStyleResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface GetNodeForLocationParams {
        readonly "x": number;
        readonly "y": number;
        readonly "includeUserAgentShadowDOM"?: boolean;
        readonly "ignorePointerEventsNone"?: boolean;
      }
      export interface GetNodeForLocationResult {
        readonly "backendNodeId": BackendNodeId;
        readonly "frameId": Protocol.Page.FrameId;
        readonly "nodeId"?: NodeId;
      }
      export interface GetOuterHTMLParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "includeShadowDOM"?: boolean;
      }
      export interface GetOuterHTMLResult {
        readonly "outerHTML": string;
      }
      export interface GetRelayoutBoundaryParams {
        readonly "nodeId": NodeId;
      }
      export interface GetRelayoutBoundaryResult {
        readonly "nodeId": NodeId;
      }
      export interface GetSearchResultsParams {
        readonly "searchId": string;
        readonly "fromIndex": number;
        readonly "toIndex": number;
      }
      export interface GetSearchResultsResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export type HideHighlightParams = undefined;
      export type HideHighlightResult = Readonly<Record<string, never>>;
      export type HighlightNodeParams = undefined;
      export type HighlightNodeResult = Readonly<Record<string, never>>;
      export type HighlightRectParams = undefined;
      export type HighlightRectResult = Readonly<Record<string, never>>;
      export type MarkUndoableStateParams = undefined;
      export type MarkUndoableStateResult = Readonly<Record<string, never>>;
      export interface MoveToParams {
        readonly "nodeId": NodeId;
        readonly "targetNodeId": NodeId;
        readonly "insertBeforeNodeId"?: NodeId;
      }
      export interface MoveToResult {
        readonly "nodeId": NodeId;
      }
      export interface PerformSearchParams {
        readonly "query": string;
        readonly "includeUserAgentShadowDOM"?: boolean;
      }
      export interface PerformSearchResult {
        readonly "searchId": string;
        readonly "resultCount": number;
      }
      export interface PushNodeByPathToFrontendParams {
        readonly "path": string;
      }
      export interface PushNodeByPathToFrontendResult {
        readonly "nodeId": NodeId;
      }
      export interface PushNodesByBackendIdsToFrontendParams {
        readonly "backendNodeIds": ReadonlyArray<BackendNodeId>;
      }
      export interface PushNodesByBackendIdsToFrontendResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface QuerySelectorParams {
        readonly "nodeId": NodeId;
        readonly "selector": string;
      }
      export interface QuerySelectorResult {
        readonly "nodeId": NodeId;
      }
      export interface QuerySelectorAllParams {
        readonly "nodeId": NodeId;
        readonly "selector": string;
      }
      export interface QuerySelectorAllResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export type GetTopLayerElementsParams = undefined;
      export interface GetTopLayerElementsResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface GetElementByRelationParams {
        readonly "nodeId": NodeId;
        readonly "relation": "PopoverTarget" | "InterestTarget" | "CommandFor";
      }
      export interface GetElementByRelationResult {
        readonly "nodeId": NodeId;
      }
      export type RedoParams = undefined;
      export type RedoResult = Readonly<Record<string, never>>;
      export interface RemoveAttributeParams {
        readonly "nodeId": NodeId;
        readonly "name": string;
      }
      export type RemoveAttributeResult = Readonly<Record<string, never>>;
      export interface RemoveNodeParams {
        readonly "nodeId": NodeId;
      }
      export type RemoveNodeResult = Readonly<Record<string, never>>;
      export interface RequestChildNodesParams {
        readonly "nodeId": NodeId;
        readonly "depth"?: number;
        readonly "pierce"?: boolean;
      }
      export type RequestChildNodesResult = Readonly<Record<string, never>>;
      export interface RequestNodeParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
      }
      export interface RequestNodeResult {
        readonly "nodeId": NodeId;
      }
      export interface ResolveNodeParams {
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectGroup"?: string;
        readonly "executionContextId"?: Protocol.Runtime.ExecutionContextId;
      }
      export interface ResolveNodeResult {
        readonly "object": Protocol.Runtime.RemoteObject;
      }
      export interface SetAttributeValueParams {
        readonly "nodeId": NodeId;
        readonly "name": string;
        readonly "value": string;
      }
      export type SetAttributeValueResult = Readonly<Record<string, never>>;
      export interface SetAttributesAsTextParams {
        readonly "nodeId": NodeId;
        readonly "text": string;
        readonly "name"?: string;
      }
      export type SetAttributesAsTextResult = Readonly<Record<string, never>>;
      export interface SetFileInputFilesParams {
        readonly "files": ReadonlyArray<string>;
        readonly "nodeId"?: NodeId;
        readonly "backendNodeId"?: BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export type SetFileInputFilesResult = Readonly<Record<string, never>>;
      export interface SetNodeStackTracesEnabledParams {
        readonly "enable": boolean;
      }
      export type SetNodeStackTracesEnabledResult = Readonly<Record<string, never>>;
      export interface GetNodeStackTracesParams {
        readonly "nodeId": NodeId;
      }
      export interface GetNodeStackTracesResult {
        readonly "creation"?: Protocol.Runtime.StackTrace;
      }
      export interface GetFileInfoParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
      }
      export interface GetFileInfoResult {
        readonly "path": string;
      }
      export type GetDetachedDomNodesParams = undefined;
      export interface GetDetachedDomNodesResult {
        readonly "detachedNodes": ReadonlyArray<DetachedElementInfo>;
      }
      export interface SetInspectedNodeParams {
        readonly "nodeId": NodeId;
      }
      export type SetInspectedNodeResult = Readonly<Record<string, never>>;
      export interface SetNodeNameParams {
        readonly "nodeId": NodeId;
        readonly "name": string;
      }
      export interface SetNodeNameResult {
        readonly "nodeId": NodeId;
      }
      export interface SetNodeValueParams {
        readonly "nodeId": NodeId;
        readonly "value": string;
      }
      export type SetNodeValueResult = Readonly<Record<string, never>>;
      export interface SetOuterHTMLParams {
        readonly "nodeId": NodeId;
        readonly "outerHTML": string;
      }
      export type SetOuterHTMLResult = Readonly<Record<string, never>>;
      export type UndoParams = undefined;
      export type UndoResult = Readonly<Record<string, never>>;
      export interface GetFrameOwnerParams {
        readonly "frameId": Protocol.Page.FrameId;
      }
      export interface GetFrameOwnerResult {
        readonly "backendNodeId": BackendNodeId;
        readonly "nodeId"?: NodeId;
      }
      export interface GetContainerForNodeParams {
        readonly "nodeId": NodeId;
        readonly "containerName"?: string;
        readonly "physicalAxes"?: PhysicalAxes;
        readonly "logicalAxes"?: LogicalAxes;
        readonly "queriesScrollState"?: boolean;
        readonly "queriesAnchored"?: boolean;
      }
      export interface GetContainerForNodeResult {
        readonly "nodeId"?: NodeId;
      }
      export interface GetQueryingDescendantsForContainerParams {
        readonly "nodeId": NodeId;
      }
      export interface GetQueryingDescendantsForContainerResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface GetAnchorElementParams {
        readonly "nodeId": NodeId;
        readonly "anchorSpecifier"?: string;
      }
      export interface GetAnchorElementResult {
        readonly "nodeId": NodeId;
      }
      export interface ForceShowPopoverParams {
        readonly "nodeId": NodeId;
        readonly "enable": boolean;
        readonly "invokerNodeId"?: BackendNodeId;
      }
      export interface ForceShowPopoverResult {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface ForceShowInterestParams {
        readonly "nodeId": NodeId;
        readonly "enable": boolean;
      }
      export type ForceShowInterestResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface AttributeModifiedEvent {
        readonly "nodeId": NodeId;
        readonly "name": string;
        readonly "value": string;
      }
      export interface AdoptedStyleSheetsModifiedEvent {
        readonly "nodeId": NodeId;
        readonly "adoptedStyleSheets": ReadonlyArray<StyleSheetId>;
      }
      export interface AttributeRemovedEvent {
        readonly "nodeId": NodeId;
        readonly "name": string;
      }
      export interface CharacterDataModifiedEvent {
        readonly "nodeId": NodeId;
        readonly "characterData": string;
      }
      export interface ChildNodeCountUpdatedEvent {
        readonly "nodeId": NodeId;
        readonly "childNodeCount": number;
      }
      export interface ChildNodeInsertedEvent {
        readonly "parentNodeId": NodeId;
        readonly "previousNodeId": NodeId;
        readonly "node": Node;
      }
      export interface ChildNodeRemovedEvent {
        readonly "parentNodeId": NodeId;
        readonly "nodeId": NodeId;
      }
      export interface DistributedNodesUpdatedEvent {
        readonly "insertionPointId": NodeId;
        readonly "distributedNodes": ReadonlyArray<BackendNode>;
      }
      export type DocumentUpdatedEvent = Readonly<Record<string, never>>;
      export interface InlineStyleInvalidatedEvent {
        readonly "nodeIds": ReadonlyArray<NodeId>;
      }
      export interface PseudoElementAddedEvent {
        readonly "parentId": NodeId;
        readonly "pseudoElement": Node;
      }
      export type TopLayerElementsUpdatedEvent = Readonly<Record<string, never>>;
      export interface ScrollableFlagUpdatedEvent {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "isScrollable": boolean;
      }
      export interface AdRelatedStateUpdatedEvent {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "adProvenance"?: Protocol.Network.AdProvenance;
      }
      export interface AffectedByStartingStylesFlagUpdatedEvent {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "affectedByStartingStyles": boolean;
      }
      export interface PseudoElementRemovedEvent {
        readonly "parentId": NodeId;
        readonly "pseudoElementId": NodeId;
      }
      export interface SetChildNodesEvent {
        readonly "parentId": NodeId;
        readonly "nodes": ReadonlyArray<Node>;
      }
      export interface ShadowRootPoppedEvent {
        readonly "hostId": NodeId;
        readonly "rootId": NodeId;
      }
      export interface ShadowRootPushedEvent {
        readonly "hostId": NodeId;
        readonly "root": Node;
      }
    }
  }
  export namespace DOMDebugger {
    export type DOMBreakpointType = "subtree-modified" | "attribute-modified" | "node-removed";
    export type CSPViolationType = "trustedtype-sink-violation" | "trustedtype-policy-violation";
    export interface EventListener {
      readonly "type": string;
      readonly "useCapture": boolean;
      readonly "passive": boolean;
      readonly "once": boolean;
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
      readonly "handler"?: Protocol.Runtime.RemoteObject;
      readonly "originalHandler"?: Protocol.Runtime.RemoteObject;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
    }
    export namespace Commands {
      export interface GetEventListenersParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
        readonly "depth"?: number;
        readonly "pierce"?: boolean;
      }
      export interface GetEventListenersResult {
        readonly "listeners": ReadonlyArray<EventListener>;
      }
      export interface RemoveDOMBreakpointParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "type": DOMBreakpointType;
      }
      export type RemoveDOMBreakpointResult = Readonly<Record<string, never>>;
      export interface RemoveEventListenerBreakpointParams {
        readonly "eventName": string;
        readonly "targetName"?: string;
      }
      export type RemoveEventListenerBreakpointResult = Readonly<Record<string, never>>;
      export interface RemoveInstrumentationBreakpointParams {
        readonly "eventName": string;
      }
      export type RemoveInstrumentationBreakpointResult = Readonly<Record<string, never>>;
      export interface RemoveXHRBreakpointParams {
        readonly "url": string;
      }
      export type RemoveXHRBreakpointResult = Readonly<Record<string, never>>;
      export interface SetBreakOnCSPViolationParams {
        readonly "violationTypes": ReadonlyArray<CSPViolationType>;
      }
      export type SetBreakOnCSPViolationResult = Readonly<Record<string, never>>;
      export interface SetDOMBreakpointParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "type": DOMBreakpointType;
      }
      export type SetDOMBreakpointResult = Readonly<Record<string, never>>;
      export interface SetEventListenerBreakpointParams {
        readonly "eventName": string;
        readonly "targetName"?: string;
      }
      export type SetEventListenerBreakpointResult = Readonly<Record<string, never>>;
      export interface SetInstrumentationBreakpointParams {
        readonly "eventName": string;
      }
      export type SetInstrumentationBreakpointResult = Readonly<Record<string, never>>;
      export interface SetXHRBreakpointParams {
        readonly "url": string;
      }
      export type SetXHRBreakpointResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace DOMSnapshot {
    export interface DOMNode {
      readonly "nodeType": number;
      readonly "nodeName": string;
      readonly "nodeValue": string;
      readonly "textValue"?: string;
      readonly "inputValue"?: string;
      readonly "inputChecked"?: boolean;
      readonly "optionSelected"?: boolean;
      readonly "backendNodeId": Protocol.DOM.BackendNodeId;
      readonly "childNodeIndexes"?: ReadonlyArray<number>;
      readonly "attributes"?: ReadonlyArray<NameValue>;
      readonly "pseudoElementIndexes"?: ReadonlyArray<number>;
      readonly "layoutNodeIndex"?: number;
      readonly "documentURL"?: string;
      readonly "baseURL"?: string;
      readonly "contentLanguage"?: string;
      readonly "documentEncoding"?: string;
      readonly "publicId"?: string;
      readonly "systemId"?: string;
      readonly "frameId"?: Protocol.Page.FrameId;
      readonly "contentDocumentIndex"?: number;
      readonly "pseudoType"?: Protocol.DOM.PseudoType;
      readonly "shadowRootType"?: Protocol.DOM.ShadowRootType;
      readonly "isClickable"?: boolean;
      readonly "eventListeners"?: ReadonlyArray<Protocol.DOMDebugger.EventListener>;
      readonly "currentSourceURL"?: string;
      readonly "originURL"?: string;
      readonly "scrollOffsetX"?: number;
      readonly "scrollOffsetY"?: number;
    }
    export interface InlineTextBox {
      readonly "boundingBox": Protocol.DOM.Rect;
      readonly "startCharacterIndex": number;
      readonly "numCharacters": number;
    }
    export interface LayoutTreeNode {
      readonly "domNodeIndex": number;
      readonly "boundingBox": Protocol.DOM.Rect;
      readonly "layoutText"?: string;
      readonly "inlineTextNodes"?: ReadonlyArray<InlineTextBox>;
      readonly "styleIndex"?: number;
      readonly "paintOrder"?: number;
      readonly "isStackingContext"?: boolean;
    }
    export interface ComputedStyle {
      readonly "properties": ReadonlyArray<NameValue>;
    }
    export interface NameValue {
      readonly "name": string;
      readonly "value": string;
    }
    export type StringIndex = number;
    export type ArrayOfStrings = ReadonlyArray<StringIndex>;
    export interface RareStringData {
      readonly "index": ReadonlyArray<number>;
      readonly "value": ReadonlyArray<StringIndex>;
    }
    export interface RareBooleanData {
      readonly "index": ReadonlyArray<number>;
    }
    export interface RareIntegerData {
      readonly "index": ReadonlyArray<number>;
      readonly "value": ReadonlyArray<number>;
    }
    export type Rectangle = ReadonlyArray<number>;
    export interface DocumentSnapshot {
      readonly "documentURL": StringIndex;
      readonly "title": StringIndex;
      readonly "baseURL": StringIndex;
      readonly "contentLanguage": StringIndex;
      readonly "encodingName": StringIndex;
      readonly "publicId": StringIndex;
      readonly "systemId": StringIndex;
      readonly "frameId": StringIndex;
      readonly "nodes": NodeTreeSnapshot;
      readonly "layout": LayoutTreeSnapshot;
      readonly "textBoxes": TextBoxSnapshot;
      readonly "scrollOffsetX"?: number;
      readonly "scrollOffsetY"?: number;
      readonly "contentWidth"?: number;
      readonly "contentHeight"?: number;
    }
    export interface NodeTreeSnapshot {
      readonly "parentIndex"?: ReadonlyArray<number>;
      readonly "nodeType"?: ReadonlyArray<number>;
      readonly "shadowRootType"?: RareStringData;
      readonly "nodeName"?: ReadonlyArray<StringIndex>;
      readonly "nodeValue"?: ReadonlyArray<StringIndex>;
      readonly "backendNodeId"?: ReadonlyArray<Protocol.DOM.BackendNodeId>;
      readonly "attributes"?: ReadonlyArray<ArrayOfStrings>;
      readonly "textValue"?: RareStringData;
      readonly "inputValue"?: RareStringData;
      readonly "inputChecked"?: RareBooleanData;
      readonly "optionSelected"?: RareBooleanData;
      readonly "contentDocumentIndex"?: RareIntegerData;
      readonly "pseudoType"?: RareStringData;
      readonly "pseudoIdentifier"?: RareStringData;
      readonly "isClickable"?: RareBooleanData;
      readonly "currentSourceURL"?: RareStringData;
      readonly "originURL"?: RareStringData;
    }
    export interface LayoutTreeSnapshot {
      readonly "nodeIndex": ReadonlyArray<number>;
      readonly "styles": ReadonlyArray<ArrayOfStrings>;
      readonly "bounds": ReadonlyArray<Rectangle>;
      readonly "text": ReadonlyArray<StringIndex>;
      readonly "stackingContexts": RareBooleanData;
      readonly "paintOrders"?: ReadonlyArray<number>;
      readonly "offsetRects"?: ReadonlyArray<Rectangle>;
      readonly "scrollRects"?: ReadonlyArray<Rectangle>;
      readonly "clientRects"?: ReadonlyArray<Rectangle>;
      readonly "blendedBackgroundColors"?: ReadonlyArray<StringIndex>;
      readonly "textColorOpacities"?: ReadonlyArray<number>;
    }
    export interface TextBoxSnapshot {
      readonly "layoutIndex": ReadonlyArray<number>;
      readonly "bounds": ReadonlyArray<Rectangle>;
      readonly "start": ReadonlyArray<number>;
      readonly "length": ReadonlyArray<number>;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetSnapshotParams {
        readonly "computedStyleWhitelist": ReadonlyArray<string>;
        readonly "includeEventListeners"?: boolean;
        readonly "includePaintOrder"?: boolean;
        readonly "includeUserAgentShadowTree"?: boolean;
      }
      export interface GetSnapshotResult {
        readonly "domNodes": ReadonlyArray<DOMNode>;
        readonly "layoutTreeNodes": ReadonlyArray<LayoutTreeNode>;
        readonly "computedStyles": ReadonlyArray<ComputedStyle>;
      }
      export interface CaptureSnapshotParams {
        readonly "computedStyles": ReadonlyArray<string>;
        readonly "includePaintOrder"?: boolean;
        readonly "includeDOMRects"?: boolean;
        readonly "includeBlendedBackgroundColors"?: boolean;
        readonly "includeTextColorOpacities"?: boolean;
      }
      export interface CaptureSnapshotResult {
        readonly "documents": ReadonlyArray<DocumentSnapshot>;
        readonly "strings": ReadonlyArray<string>;
      }
    }
    export namespace Events {
    }
  }
  export namespace DOMStorage {
    export type SerializedStorageKey = string;
    export interface StorageId {
      readonly "securityOrigin"?: string;
      readonly "storageKey"?: SerializedStorageKey;
      readonly "isLocalStorage": boolean;
    }
    export type Item = ReadonlyArray<string>;
    export namespace Commands {
      export interface ClearParams {
        readonly "storageId": StorageId;
      }
      export type ClearResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetDOMStorageItemsParams {
        readonly "storageId": StorageId;
      }
      export interface GetDOMStorageItemsResult {
        readonly "entries": ReadonlyArray<Item>;
      }
      export interface RemoveDOMStorageItemParams {
        readonly "storageId": StorageId;
        readonly "key": string;
      }
      export type RemoveDOMStorageItemResult = Readonly<Record<string, never>>;
      export interface SetDOMStorageItemParams {
        readonly "storageId": StorageId;
        readonly "key": string;
        readonly "value": string;
      }
      export type SetDOMStorageItemResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DomStorageItemAddedEvent {
        readonly "storageId": StorageId;
        readonly "key": string;
        readonly "newValue": string;
      }
      export interface DomStorageItemRemovedEvent {
        readonly "storageId": StorageId;
        readonly "key": string;
      }
      export interface DomStorageItemUpdatedEvent {
        readonly "storageId": StorageId;
        readonly "key": string;
        readonly "oldValue": string;
        readonly "newValue": string;
      }
      export interface DomStorageItemsClearedEvent {
        readonly "storageId": StorageId;
      }
    }
  }
  export namespace DeviceAccess {
    export type RequestId = string;
    export type DeviceId = string;
    export interface PromptDevice {
      readonly "id": DeviceId;
      readonly "name": string;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface SelectPromptParams {
        readonly "id": RequestId;
        readonly "deviceId": DeviceId;
      }
      export type SelectPromptResult = Readonly<Record<string, never>>;
      export interface CancelPromptParams {
        readonly "id": RequestId;
      }
      export type CancelPromptResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DeviceRequestPromptedEvent {
        readonly "id": RequestId;
        readonly "devices": ReadonlyArray<PromptDevice>;
      }
    }
  }
  export namespace DeviceOrientation {
    export namespace Commands {
      export type ClearDeviceOrientationOverrideParams = undefined;
      export type ClearDeviceOrientationOverrideResult = Readonly<Record<string, never>>;
      export interface SetDeviceOrientationOverrideParams {
        readonly "alpha": number;
        readonly "beta": number;
        readonly "gamma": number;
      }
      export type SetDeviceOrientationOverrideResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace DigitalCredentials {
    export type VirtualWalletAction = "respond" | "decline" | "wait" | "clear";
    export namespace Commands {
      export interface SetVirtualWalletBehaviorParams {
        readonly "action": VirtualWalletAction;
        readonly "protocol"?: string;
        readonly "response"?: Readonly<Record<string, unknown>>;
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export type SetVirtualWalletBehaviorResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace Emulation {
    export interface SafeAreaInsets {
      readonly "top"?: number;
      readonly "topMax"?: number;
      readonly "left"?: number;
      readonly "leftMax"?: number;
      readonly "bottom"?: number;
      readonly "bottomMax"?: number;
      readonly "right"?: number;
      readonly "rightMax"?: number;
    }
    export interface ScreenOrientation {
      readonly "type": "portraitPrimary" | "portraitSecondary" | "landscapePrimary" | "landscapeSecondary";
      readonly "angle": number;
    }
    export interface DisplayFeature {
      readonly "orientation": "vertical" | "horizontal";
      readonly "offset": number;
      readonly "maskLength": number;
    }
    export interface DevicePosture {
      readonly "type": "continuous" | "folded";
    }
    export interface MediaFeature {
      readonly "name": string;
      readonly "value": string;
    }
    export type VirtualTimePolicy = "advance" | "pause" | "pauseIfNetworkFetchesPending";
    export interface UserAgentBrandVersion {
      readonly "brand": string;
      readonly "version": string;
    }
    export interface UserAgentMetadata {
      readonly "brands"?: ReadonlyArray<UserAgentBrandVersion>;
      readonly "fullVersionList"?: ReadonlyArray<UserAgentBrandVersion>;
      readonly "fullVersion"?: string;
      readonly "platform": string;
      readonly "platformVersion": string;
      readonly "architecture": string;
      readonly "model": string;
      readonly "mobile": boolean;
      readonly "bitness"?: string;
      readonly "wow64"?: boolean;
      readonly "formFactors"?: ReadonlyArray<string>;
    }
    export type SensorType = "absolute-orientation" | "accelerometer" | "ambient-light" | "gravity" | "gyroscope" | "linear-acceleration" | "magnetometer" | "relative-orientation";
    export interface SensorMetadata {
      readonly "available"?: boolean;
      readonly "minimumFrequency"?: number;
      readonly "maximumFrequency"?: number;
    }
    export interface SensorReadingSingle {
      readonly "value": number;
    }
    export interface SensorReadingXYZ {
      readonly "x": number;
      readonly "y": number;
      readonly "z": number;
    }
    export interface SensorReadingQuaternion {
      readonly "x": number;
      readonly "y": number;
      readonly "z": number;
      readonly "w": number;
    }
    export interface SensorReading {
      readonly "single"?: SensorReadingSingle;
      readonly "xyz"?: SensorReadingXYZ;
      readonly "quaternion"?: SensorReadingQuaternion;
    }
    export type PressureSource = "cpu";
    export type PressureState = "nominal" | "fair" | "serious" | "critical";
    export interface PressureMetadata {
      readonly "available"?: boolean;
    }
    export interface WorkAreaInsets {
      readonly "top"?: number;
      readonly "left"?: number;
      readonly "bottom"?: number;
      readonly "right"?: number;
    }
    export type ScreenId = string;
    export interface ScreenInfo {
      readonly "left": number;
      readonly "top": number;
      readonly "width": number;
      readonly "height": number;
      readonly "availLeft": number;
      readonly "availTop": number;
      readonly "availWidth": number;
      readonly "availHeight": number;
      readonly "devicePixelRatio": number;
      readonly "orientation": ScreenOrientation;
      readonly "colorDepth": number;
      readonly "isExtended": boolean;
      readonly "isInternal": boolean;
      readonly "isPrimary": boolean;
      readonly "label": string;
      readonly "id": ScreenId;
    }
    export type DisabledImageType = "avif" | "jxl" | "webp";
    export namespace Commands {
      export type CanEmulateParams = undefined;
      export interface CanEmulateResult {
        readonly "result": boolean;
      }
      export type ClearDeviceMetricsOverrideParams = undefined;
      export type ClearDeviceMetricsOverrideResult = Readonly<Record<string, never>>;
      export type ClearGeolocationOverrideParams = undefined;
      export type ClearGeolocationOverrideResult = Readonly<Record<string, never>>;
      export type ResetPageScaleFactorParams = undefined;
      export type ResetPageScaleFactorResult = Readonly<Record<string, never>>;
      export interface SetFocusEmulationEnabledParams {
        readonly "enabled": boolean;
      }
      export type SetFocusEmulationEnabledResult = Readonly<Record<string, never>>;
      export interface SetAutoDarkModeOverrideParams {
        readonly "enabled"?: boolean;
      }
      export type SetAutoDarkModeOverrideResult = Readonly<Record<string, never>>;
      export interface SetCPUThrottlingRateParams {
        readonly "rate": number;
      }
      export type SetCPUThrottlingRateResult = Readonly<Record<string, never>>;
      export interface SetDefaultBackgroundColorOverrideParams {
        readonly "color"?: Protocol.DOM.RGBA;
      }
      export type SetDefaultBackgroundColorOverrideResult = Readonly<Record<string, never>>;
      export interface SetSafeAreaInsetsOverrideParams {
        readonly "insets": SafeAreaInsets;
      }
      export type SetSafeAreaInsetsOverrideResult = Readonly<Record<string, never>>;
      export interface SetVirtualKeyboardGeometryOverrideParams {
        readonly "keyboardRect"?: Protocol.DOM.Rect;
      }
      export type SetVirtualKeyboardGeometryOverrideResult = Readonly<Record<string, never>>;
      export interface SetDeviceMetricsOverrideParams {
        readonly "width": number;
        readonly "height": number;
        readonly "deviceScaleFactor": number;
        readonly "mobile": boolean;
        readonly "scale"?: number;
        readonly "screenWidth"?: number;
        readonly "screenHeight"?: number;
        readonly "positionX"?: number;
        readonly "positionY"?: number;
        readonly "dontSetVisibleSize"?: boolean;
        readonly "screenOrientation"?: ScreenOrientation;
        readonly "viewport"?: Protocol.Page.Viewport;
        readonly "displayFeature"?: DisplayFeature;
        readonly "devicePosture"?: DevicePosture;
        readonly "scrollbarType"?: "overlay" | "default";
        readonly "screenOrientationLockEmulation"?: boolean;
      }
      export type SetDeviceMetricsOverrideResult = Readonly<Record<string, never>>;
      export interface SetDevicePostureOverrideParams {
        readonly "posture": DevicePosture;
      }
      export type SetDevicePostureOverrideResult = Readonly<Record<string, never>>;
      export type ClearDevicePostureOverrideParams = undefined;
      export type ClearDevicePostureOverrideResult = Readonly<Record<string, never>>;
      export interface SetDisplayFeaturesOverrideParams {
        readonly "features": ReadonlyArray<DisplayFeature>;
      }
      export type SetDisplayFeaturesOverrideResult = Readonly<Record<string, never>>;
      export type ClearDisplayFeaturesOverrideParams = undefined;
      export type ClearDisplayFeaturesOverrideResult = Readonly<Record<string, never>>;
      export interface SetScrollbarsHiddenParams {
        readonly "hidden": boolean;
      }
      export type SetScrollbarsHiddenResult = Readonly<Record<string, never>>;
      export interface SetDocumentCookieDisabledParams {
        readonly "disabled": boolean;
      }
      export type SetDocumentCookieDisabledResult = Readonly<Record<string, never>>;
      export interface SetEmitTouchEventsForMouseParams {
        readonly "enabled": boolean;
        readonly "configuration"?: "mobile" | "desktop";
      }
      export type SetEmitTouchEventsForMouseResult = Readonly<Record<string, never>>;
      export interface SetEmulatedMediaParams {
        readonly "media"?: string;
        readonly "features"?: ReadonlyArray<MediaFeature>;
      }
      export type SetEmulatedMediaResult = Readonly<Record<string, never>>;
      export interface SetEmulatedVisionDeficiencyParams {
        readonly "type": "none" | "blurredVision" | "reducedContrast" | "achromatopsia" | "deuteranopia" | "protanopia" | "tritanopia";
      }
      export type SetEmulatedVisionDeficiencyResult = Readonly<Record<string, never>>;
      export interface SetEmulatedOSTextScaleParams {
        readonly "scale"?: number;
      }
      export type SetEmulatedOSTextScaleResult = Readonly<Record<string, never>>;
      export interface SetGeolocationOverrideParams {
        readonly "latitude"?: number;
        readonly "longitude"?: number;
        readonly "accuracy"?: number;
        readonly "altitude"?: number;
        readonly "altitudeAccuracy"?: number;
        readonly "heading"?: number;
        readonly "speed"?: number;
      }
      export type SetGeolocationOverrideResult = Readonly<Record<string, never>>;
      export interface GetOverriddenSensorInformationParams {
        readonly "type": SensorType;
      }
      export interface GetOverriddenSensorInformationResult {
        readonly "requestedSamplingFrequency": number;
      }
      export interface SetSensorOverrideEnabledParams {
        readonly "enabled": boolean;
        readonly "type": SensorType;
        readonly "metadata"?: SensorMetadata;
      }
      export type SetSensorOverrideEnabledResult = Readonly<Record<string, never>>;
      export interface SetSensorOverrideReadingsParams {
        readonly "type": SensorType;
        readonly "reading": SensorReading;
      }
      export type SetSensorOverrideReadingsResult = Readonly<Record<string, never>>;
      export interface SetPressureSourceOverrideEnabledParams {
        readonly "enabled": boolean;
        readonly "source": PressureSource;
        readonly "metadata"?: PressureMetadata;
      }
      export type SetPressureSourceOverrideEnabledResult = Readonly<Record<string, never>>;
      export interface SetPressureStateOverrideParams {
        readonly "source": PressureSource;
        readonly "state": PressureState;
      }
      export type SetPressureStateOverrideResult = Readonly<Record<string, never>>;
      export interface SetIdleOverrideParams {
        readonly "isUserActive": boolean;
        readonly "isScreenUnlocked": boolean;
      }
      export type SetIdleOverrideResult = Readonly<Record<string, never>>;
      export type ClearIdleOverrideParams = undefined;
      export type ClearIdleOverrideResult = Readonly<Record<string, never>>;
      export interface SetNavigatorOverridesParams {
        readonly "platform": string;
      }
      export type SetNavigatorOverridesResult = Readonly<Record<string, never>>;
      export interface SetPageScaleFactorParams {
        readonly "pageScaleFactor": number;
      }
      export type SetPageScaleFactorResult = Readonly<Record<string, never>>;
      export interface SetScriptExecutionDisabledParams {
        readonly "value": boolean;
      }
      export type SetScriptExecutionDisabledResult = Readonly<Record<string, never>>;
      export interface SetTouchEmulationEnabledParams {
        readonly "enabled": boolean;
        readonly "maxTouchPoints"?: number;
      }
      export type SetTouchEmulationEnabledResult = Readonly<Record<string, never>>;
      export interface SetVirtualTimePolicyParams {
        readonly "policy": VirtualTimePolicy;
        readonly "budget"?: number;
        readonly "maxVirtualTimeTaskStarvationCount"?: number;
        readonly "initialVirtualTime"?: Protocol.Network.TimeSinceEpoch;
      }
      export interface SetVirtualTimePolicyResult {
        readonly "virtualTimeTicksBase": number;
      }
      export interface SetLocaleOverrideParams {
        readonly "locale"?: string;
      }
      export type SetLocaleOverrideResult = Readonly<Record<string, never>>;
      export interface SetTimezoneOverrideParams {
        readonly "timezoneId": string;
      }
      export type SetTimezoneOverrideResult = Readonly<Record<string, never>>;
      export interface SetVisibleSizeParams {
        readonly "width": number;
        readonly "height": number;
      }
      export type SetVisibleSizeResult = Readonly<Record<string, never>>;
      export interface SetDisabledImageTypesParams {
        readonly "imageTypes": ReadonlyArray<DisabledImageType>;
      }
      export type SetDisabledImageTypesResult = Readonly<Record<string, never>>;
      export interface SetDataSaverOverrideParams {
        readonly "dataSaverEnabled"?: boolean;
      }
      export type SetDataSaverOverrideResult = Readonly<Record<string, never>>;
      export interface SetHardwareConcurrencyOverrideParams {
        readonly "hardwareConcurrency": number;
      }
      export type SetHardwareConcurrencyOverrideResult = Readonly<Record<string, never>>;
      export interface SetUserAgentOverrideParams {
        readonly "userAgent": string;
        readonly "acceptLanguage"?: string;
        readonly "platform"?: string;
        readonly "userAgentMetadata"?: UserAgentMetadata;
      }
      export type SetUserAgentOverrideResult = Readonly<Record<string, never>>;
      export interface SetAutomationOverrideParams {
        readonly "enabled": boolean;
      }
      export type SetAutomationOverrideResult = Readonly<Record<string, never>>;
      export interface SetSmallViewportHeightDifferenceOverrideParams {
        readonly "difference": number;
      }
      export type SetSmallViewportHeightDifferenceOverrideResult = Readonly<Record<string, never>>;
      export type GetScreenInfosParams = undefined;
      export interface GetScreenInfosResult {
        readonly "screenInfos": ReadonlyArray<ScreenInfo>;
      }
      export interface AddScreenParams {
        readonly "left": number;
        readonly "top": number;
        readonly "width": number;
        readonly "height": number;
        readonly "workAreaInsets"?: WorkAreaInsets;
        readonly "devicePixelRatio"?: number;
        readonly "rotation"?: number;
        readonly "colorDepth"?: number;
        readonly "label"?: string;
        readonly "isInternal"?: boolean;
      }
      export interface AddScreenResult {
        readonly "screenInfo": ScreenInfo;
      }
      export interface UpdateScreenParams {
        readonly "screenId": ScreenId;
        readonly "left"?: number;
        readonly "top"?: number;
        readonly "width"?: number;
        readonly "height"?: number;
        readonly "workAreaInsets"?: WorkAreaInsets;
        readonly "devicePixelRatio"?: number;
        readonly "rotation"?: number;
        readonly "colorDepth"?: number;
        readonly "label"?: string;
        readonly "isInternal"?: boolean;
      }
      export interface UpdateScreenResult {
        readonly "screenInfo": ScreenInfo;
      }
      export interface RemoveScreenParams {
        readonly "screenId": ScreenId;
      }
      export type RemoveScreenResult = Readonly<Record<string, never>>;
      export interface SetPrimaryScreenParams {
        readonly "screenId": ScreenId;
      }
      export type SetPrimaryScreenResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export type VirtualTimeBudgetExpiredEvent = Readonly<Record<string, never>>;
      export interface ScreenOrientationLockChangedEvent {
        readonly "locked": boolean;
        readonly "orientation"?: ScreenOrientation;
      }
    }
  }
  export namespace EventBreakpoints {
    export namespace Commands {
      export interface SetInstrumentationBreakpointParams {
        readonly "eventName": string;
      }
      export type SetInstrumentationBreakpointResult = Readonly<Record<string, never>>;
      export interface RemoveInstrumentationBreakpointParams {
        readonly "eventName": string;
      }
      export type RemoveInstrumentationBreakpointResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace Extensions {
    export type StorageArea = "session" | "local" | "sync" | "managed";
    export interface ExtensionInfo {
      readonly "id": string;
      readonly "name": string;
      readonly "version": string;
      readonly "path": string;
      readonly "enabled": boolean;
    }
    export namespace Commands {
      export interface TriggerActionParams {
        readonly "id": string;
        readonly "targetId": string;
      }
      export type TriggerActionResult = Readonly<Record<string, never>>;
      export interface LoadUnpackedParams {
        readonly "path": string;
        readonly "enableInIncognito"?: boolean;
      }
      export interface LoadUnpackedResult {
        readonly "id": string;
      }
      export type GetExtensionsParams = undefined;
      export interface GetExtensionsResult {
        readonly "extensions": ReadonlyArray<ExtensionInfo>;
      }
      export interface UninstallParams {
        readonly "id": string;
      }
      export type UninstallResult = Readonly<Record<string, never>>;
      export interface GetStorageItemsParams {
        readonly "id": string;
        readonly "storageArea": StorageArea;
        readonly "keys"?: ReadonlyArray<string>;
      }
      export interface GetStorageItemsResult {
        readonly "data": Readonly<Record<string, unknown>>;
      }
      export interface RemoveStorageItemsParams {
        readonly "id": string;
        readonly "storageArea": StorageArea;
        readonly "keys": ReadonlyArray<string>;
      }
      export type RemoveStorageItemsResult = Readonly<Record<string, never>>;
      export interface ClearStorageItemsParams {
        readonly "id": string;
        readonly "storageArea": StorageArea;
      }
      export type ClearStorageItemsResult = Readonly<Record<string, never>>;
      export interface SetStorageItemsParams {
        readonly "id": string;
        readonly "storageArea": StorageArea;
        readonly "values": Readonly<Record<string, unknown>>;
      }
      export type SetStorageItemsResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace FedCm {
    export type LoginState = "SignIn" | "SignUp";
    export type DialogType = "AccountChooser" | "AutoReauthn" | "ConfirmIdpLogin" | "Error";
    export type DialogButton = "ConfirmIdpLoginContinue" | "ErrorGotIt" | "ErrorMoreDetails";
    export type AccountUrlType = "TermsOfService" | "PrivacyPolicy";
    export interface Account {
      readonly "accountId": string;
      readonly "email": string;
      readonly "name": string;
      readonly "givenName": string;
      readonly "pictureUrl": string;
      readonly "idpConfigUrl": string;
      readonly "idpLoginUrl": string;
      readonly "loginState": LoginState;
      readonly "termsOfServiceUrl"?: string;
      readonly "privacyPolicyUrl"?: string;
    }
    export namespace Commands {
      export interface EnableParams {
        readonly "disableRejectionDelay"?: boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface SelectAccountParams {
        readonly "dialogId": string;
        readonly "accountIndex": number;
      }
      export type SelectAccountResult = Readonly<Record<string, never>>;
      export interface ClickDialogButtonParams {
        readonly "dialogId": string;
        readonly "dialogButton": DialogButton;
      }
      export type ClickDialogButtonResult = Readonly<Record<string, never>>;
      export interface OpenUrlParams {
        readonly "dialogId": string;
        readonly "accountIndex": number;
        readonly "accountUrlType": AccountUrlType;
      }
      export type OpenUrlResult = Readonly<Record<string, never>>;
      export interface DismissDialogParams {
        readonly "dialogId": string;
        readonly "triggerCooldown"?: boolean;
      }
      export type DismissDialogResult = Readonly<Record<string, never>>;
      export type ResetCooldownParams = undefined;
      export type ResetCooldownResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DialogShownEvent {
        readonly "dialogId": string;
        readonly "dialogType": DialogType;
        readonly "accounts": ReadonlyArray<Account>;
        readonly "title": string;
        readonly "subtitle"?: string;
      }
      export interface DialogClosedEvent {
        readonly "dialogId": string;
      }
    }
  }
  export namespace Fetch {
    export type RequestId = string;
    export type RequestStage = "Request" | "Response";
    export interface RequestPattern {
      readonly "urlPattern"?: string;
      readonly "resourceType"?: Protocol.Network.ResourceType;
      readonly "requestStage"?: RequestStage;
    }
    export interface HeaderEntry {
      readonly "name": string;
      readonly "value": string;
    }
    export interface AuthChallenge {
      readonly "source"?: "Server" | "Proxy";
      readonly "origin": string;
      readonly "scheme": string;
      readonly "realm": string;
    }
    export interface AuthChallengeResponse {
      readonly "response": "Default" | "CancelAuth" | "ProvideCredentials";
      readonly "username"?: string;
      readonly "password"?: string;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "patterns"?: ReadonlyArray<RequestPattern>;
        readonly "handleAuthRequests"?: boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface FailRequestParams {
        readonly "requestId": RequestId;
        readonly "errorReason": Protocol.Network.ErrorReason;
      }
      export type FailRequestResult = Readonly<Record<string, never>>;
      export interface FulfillRequestParams {
        readonly "requestId": RequestId;
        readonly "responseCode": number;
        readonly "responseHeaders"?: ReadonlyArray<HeaderEntry>;
        readonly "binaryResponseHeaders"?: string;
        readonly "body"?: string;
        readonly "responsePhrase"?: string;
      }
      export type FulfillRequestResult = Readonly<Record<string, never>>;
      export interface ContinueRequestParams {
        readonly "requestId": RequestId;
        readonly "url"?: string;
        readonly "method"?: string;
        readonly "postData"?: string;
        readonly "headers"?: ReadonlyArray<HeaderEntry>;
        readonly "interceptResponse"?: boolean;
      }
      export type ContinueRequestResult = Readonly<Record<string, never>>;
      export interface ContinueWithAuthParams {
        readonly "requestId": RequestId;
        readonly "authChallengeResponse": AuthChallengeResponse;
      }
      export type ContinueWithAuthResult = Readonly<Record<string, never>>;
      export interface ContinueResponseParams {
        readonly "requestId": RequestId;
        readonly "responseCode"?: number;
        readonly "responsePhrase"?: string;
        readonly "responseHeaders"?: ReadonlyArray<HeaderEntry>;
        readonly "binaryResponseHeaders"?: string;
      }
      export type ContinueResponseResult = Readonly<Record<string, never>>;
      export interface GetResponseBodyParams {
        readonly "requestId": RequestId;
      }
      export interface GetResponseBodyResult {
        readonly "body": string;
        readonly "base64Encoded": boolean;
      }
      export interface TakeResponseBodyAsStreamParams {
        readonly "requestId": RequestId;
      }
      export interface TakeResponseBodyAsStreamResult {
        readonly "stream": Protocol.IO.StreamHandle;
      }
    }
    export namespace Events {
      export interface RequestPausedEvent {
        readonly "requestId": RequestId;
        readonly "request": Protocol.Network.Request;
        readonly "frameId": Protocol.Page.FrameId;
        readonly "resourceType": Protocol.Network.ResourceType;
        readonly "responseErrorReason"?: Protocol.Network.ErrorReason;
        readonly "responseStatusCode"?: number;
        readonly "responseStatusText"?: string;
        readonly "responseHeaders"?: ReadonlyArray<HeaderEntry>;
        readonly "networkId"?: Protocol.Network.RequestId;
        readonly "redirectedRequestId"?: RequestId;
      }
      export interface AuthRequiredEvent {
        readonly "requestId": RequestId;
        readonly "request": Protocol.Network.Request;
        readonly "frameId": Protocol.Page.FrameId;
        readonly "resourceType": Protocol.Network.ResourceType;
        readonly "authChallenge": AuthChallenge;
      }
    }
  }
  export namespace FileSystem {
    export interface File {
      readonly "name": string;
      readonly "lastModified": Protocol.Network.TimeSinceEpoch;
      readonly "size": number;
      readonly "type": string;
    }
    export interface Directory {
      readonly "name": string;
      readonly "nestedDirectories": ReadonlyArray<string>;
      readonly "nestedFiles": ReadonlyArray<File>;
    }
    export interface BucketFileSystemLocator {
      readonly "storageKey": Protocol.Storage.SerializedStorageKey;
      readonly "bucketName"?: string;
      readonly "pathComponents": ReadonlyArray<string>;
    }
    export namespace Commands {
      export interface GetDirectoryParams {
        readonly "bucketFileSystemLocator": BucketFileSystemLocator;
      }
      export interface GetDirectoryResult {
        readonly "directory": Directory;
      }
    }
    export namespace Events {
    }
  }
  export namespace HeadlessExperimental {
    export interface ScreenshotParams {
      readonly "format"?: "jpeg" | "png" | "webp";
      readonly "quality"?: number;
      readonly "optimizeForSpeed"?: boolean;
    }
    export namespace Commands {
      export interface BeginFrameParams {
        readonly "frameTimeTicks"?: number;
        readonly "interval"?: number;
        readonly "noDisplayUpdates"?: boolean;
        readonly "screenshot"?: ScreenshotParams;
      }
      export interface BeginFrameResult {
        readonly "hasDamage": boolean;
        readonly "screenshotData"?: string;
      }
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace IO {
    export type StreamHandle = string;
    export namespace Commands {
      export interface CloseParams {
        readonly "handle": StreamHandle;
      }
      export type CloseResult = Readonly<Record<string, never>>;
      export interface ReadParams {
        readonly "handle": StreamHandle;
        readonly "offset"?: number;
        readonly "size"?: number;
      }
      export interface ReadResult {
        readonly "base64Encoded"?: boolean;
        readonly "data": string;
        readonly "eof": boolean;
      }
      export interface ResolveBlobParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
      }
      export interface ResolveBlobResult {
        readonly "uuid": string;
      }
    }
    export namespace Events {
    }
  }
  export namespace IndexedDB {
    export interface DatabaseWithObjectStores {
      readonly "name": string;
      readonly "version": number;
      readonly "objectStores": ReadonlyArray<ObjectStore>;
    }
    export interface ObjectStore {
      readonly "name": string;
      readonly "keyPath": KeyPath;
      readonly "autoIncrement": boolean;
      readonly "indexes": ReadonlyArray<ObjectStoreIndex>;
    }
    export interface ObjectStoreIndex {
      readonly "name": string;
      readonly "keyPath": KeyPath;
      readonly "unique": boolean;
      readonly "multiEntry": boolean;
    }
    export interface Key {
      readonly "type": "number" | "string" | "date" | "array";
      readonly "number"?: number;
      readonly "string"?: string;
      readonly "date"?: number;
      readonly "array"?: ReadonlyArray<Key>;
    }
    export interface KeyRange {
      readonly "lower"?: Key;
      readonly "upper"?: Key;
      readonly "lowerOpen": boolean;
      readonly "upperOpen": boolean;
    }
    export interface DataEntry {
      readonly "key": Protocol.Runtime.RemoteObject;
      readonly "primaryKey": Protocol.Runtime.RemoteObject;
      readonly "value": Protocol.Runtime.RemoteObject;
    }
    export interface KeyPath {
      readonly "type": "null" | "string" | "array";
      readonly "string"?: string;
      readonly "array"?: ReadonlyArray<string>;
    }
    export namespace Commands {
      export interface ClearObjectStoreParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
        readonly "objectStoreName": string;
      }
      export type ClearObjectStoreResult = Readonly<Record<string, never>>;
      export interface DeleteDatabaseParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
      }
      export type DeleteDatabaseResult = Readonly<Record<string, never>>;
      export interface DeleteObjectStoreEntriesParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
        readonly "objectStoreName": string;
        readonly "keyRange": KeyRange;
      }
      export type DeleteObjectStoreEntriesResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface RequestDataParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
        readonly "objectStoreName": string;
        readonly "indexName"?: string;
        readonly "skipCount": number;
        readonly "pageSize": number;
        readonly "keyRange"?: KeyRange;
      }
      export interface RequestDataResult {
        readonly "objectStoreDataEntries": ReadonlyArray<DataEntry>;
        readonly "hasMore": boolean;
      }
      export interface GetMetadataParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
        readonly "objectStoreName": string;
      }
      export interface GetMetadataResult {
        readonly "entriesCount": number;
        readonly "keyGeneratorValue": number;
      }
      export interface RequestDatabaseParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
        readonly "databaseName": string;
      }
      export interface RequestDatabaseResult {
        readonly "databaseWithObjectStores": DatabaseWithObjectStores;
      }
      export interface RequestDatabaseNamesParams {
        readonly "securityOrigin"?: string;
        readonly "storageKey"?: string;
        readonly "storageBucket"?: Protocol.Storage.StorageBucket;
      }
      export interface RequestDatabaseNamesResult {
        readonly "databaseNames": ReadonlyArray<string>;
      }
    }
    export namespace Events {
    }
  }
  export namespace Input {
    export interface TouchPoint {
      readonly "x": number;
      readonly "y": number;
      readonly "radiusX"?: number;
      readonly "radiusY"?: number;
      readonly "rotationAngle"?: number;
      readonly "force"?: number;
      readonly "tangentialPressure"?: number;
      readonly "tiltX"?: number;
      readonly "tiltY"?: number;
      readonly "twist"?: number;
      readonly "id"?: number;
    }
    export type GestureSourceType = "default" | "touch" | "mouse";
    export type MouseButton = "none" | "left" | "middle" | "right" | "back" | "forward";
    export type TimeSinceEpoch = number;
    export interface DragDataItem {
      readonly "mimeType": string;
      readonly "data": string;
      readonly "title"?: string;
      readonly "baseURL"?: string;
    }
    export interface DragData {
      readonly "items": ReadonlyArray<DragDataItem>;
      readonly "files"?: ReadonlyArray<string>;
      readonly "dragOperationsMask": number;
    }
    export namespace Commands {
      export interface DispatchDragEventParams {
        readonly "type": "dragEnter" | "dragOver" | "drop" | "dragCancel";
        readonly "x": number;
        readonly "y": number;
        readonly "data": DragData;
        readonly "modifiers"?: number;
      }
      export type DispatchDragEventResult = Readonly<Record<string, never>>;
      export interface DispatchKeyEventParams {
        readonly "type": "keyDown" | "keyUp" | "rawKeyDown" | "char";
        readonly "modifiers"?: number;
        readonly "timestamp"?: TimeSinceEpoch;
        readonly "text"?: string;
        readonly "unmodifiedText"?: string;
        readonly "keyIdentifier"?: string;
        readonly "code"?: string;
        readonly "key"?: string;
        readonly "windowsVirtualKeyCode"?: number;
        readonly "nativeVirtualKeyCode"?: number;
        readonly "autoRepeat"?: boolean;
        readonly "isKeypad"?: boolean;
        readonly "isSystemKey"?: boolean;
        readonly "location"?: number;
        readonly "commands"?: ReadonlyArray<string>;
      }
      export type DispatchKeyEventResult = Readonly<Record<string, never>>;
      export interface InsertTextParams {
        readonly "text": string;
      }
      export type InsertTextResult = Readonly<Record<string, never>>;
      export interface ImeSetCompositionParams {
        readonly "text": string;
        readonly "selectionStart": number;
        readonly "selectionEnd": number;
        readonly "replacementStart"?: number;
        readonly "replacementEnd"?: number;
      }
      export type ImeSetCompositionResult = Readonly<Record<string, never>>;
      export interface DispatchMouseEventParams {
        readonly "type": "mousePressed" | "mouseReleased" | "mouseMoved" | "mouseWheel";
        readonly "x": number;
        readonly "y": number;
        readonly "modifiers"?: number;
        readonly "timestamp"?: TimeSinceEpoch;
        readonly "button"?: MouseButton;
        readonly "buttons"?: number;
        readonly "clickCount"?: number;
        readonly "force"?: number;
        readonly "tangentialPressure"?: number;
        readonly "tiltX"?: number;
        readonly "tiltY"?: number;
        readonly "twist"?: number;
        readonly "deltaX"?: number;
        readonly "deltaY"?: number;
        readonly "pointerType"?: "mouse" | "pen";
      }
      export type DispatchMouseEventResult = Readonly<Record<string, never>>;
      export interface DispatchTouchEventParams {
        readonly "type": "touchStart" | "touchEnd" | "touchMove" | "touchCancel";
        readonly "touchPoints": ReadonlyArray<TouchPoint>;
        readonly "modifiers"?: number;
        readonly "timestamp"?: TimeSinceEpoch;
      }
      export type DispatchTouchEventResult = Readonly<Record<string, never>>;
      export type CancelDraggingParams = undefined;
      export type CancelDraggingResult = Readonly<Record<string, never>>;
      export interface EmulateTouchFromMouseEventParams {
        readonly "type": "mousePressed" | "mouseReleased" | "mouseMoved" | "mouseWheel";
        readonly "x": number;
        readonly "y": number;
        readonly "button": MouseButton;
        readonly "timestamp"?: TimeSinceEpoch;
        readonly "deltaX"?: number;
        readonly "deltaY"?: number;
        readonly "modifiers"?: number;
        readonly "clickCount"?: number;
      }
      export type EmulateTouchFromMouseEventResult = Readonly<Record<string, never>>;
      export interface SetIgnoreInputEventsParams {
        readonly "ignore": boolean;
      }
      export type SetIgnoreInputEventsResult = Readonly<Record<string, never>>;
      export interface SetInterceptDragsParams {
        readonly "enabled": boolean;
      }
      export type SetInterceptDragsResult = Readonly<Record<string, never>>;
      export interface SynthesizePinchGestureParams {
        readonly "x": number;
        readonly "y": number;
        readonly "scaleFactor": number;
        readonly "relativeSpeed"?: number;
        readonly "gestureSourceType"?: GestureSourceType;
      }
      export type SynthesizePinchGestureResult = Readonly<Record<string, never>>;
      export interface SynthesizeScrollGestureParams {
        readonly "x": number;
        readonly "y": number;
        readonly "xDistance"?: number;
        readonly "yDistance"?: number;
        readonly "xOverscroll"?: number;
        readonly "yOverscroll"?: number;
        readonly "preventFling"?: boolean;
        readonly "speed"?: number;
        readonly "gestureSourceType"?: GestureSourceType;
        readonly "repeatCount"?: number;
        readonly "repeatDelayMs"?: number;
        readonly "interactionMarkerName"?: string;
      }
      export type SynthesizeScrollGestureResult = Readonly<Record<string, never>>;
      export interface SynthesizeTapGestureParams {
        readonly "x": number;
        readonly "y": number;
        readonly "duration"?: number;
        readonly "tapCount"?: number;
        readonly "gestureSourceType"?: GestureSourceType;
      }
      export type SynthesizeTapGestureResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DragInterceptedEvent {
        readonly "data": DragData;
      }
    }
  }
  export namespace Inspector {
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DetachedEvent {
        readonly "reason": string;
      }
      export type TargetCrashedEvent = Readonly<Record<string, never>>;
      export type TargetReloadedAfterCrashEvent = Readonly<Record<string, never>>;
      export type WorkerScriptLoadedEvent = Readonly<Record<string, never>>;
    }
  }
  export namespace LayerTree {
    export type LayerId = string;
    export type SnapshotId = string;
    export interface ScrollRect {
      readonly "rect": Protocol.DOM.Rect;
      readonly "type": "RepaintsOnScroll" | "TouchEventHandler" | "WheelEventHandler";
    }
    export interface StickyPositionConstraint {
      readonly "stickyBoxRect": Protocol.DOM.Rect;
      readonly "containingBlockRect": Protocol.DOM.Rect;
      readonly "nearestLayerShiftingStickyBox"?: LayerId;
      readonly "nearestLayerShiftingContainingBlock"?: LayerId;
    }
    export interface PictureTile {
      readonly "x": number;
      readonly "y": number;
      readonly "picture": string;
    }
    export interface Layer {
      readonly "layerId": LayerId;
      readonly "parentLayerId"?: LayerId;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "offsetX": number;
      readonly "offsetY": number;
      readonly "width": number;
      readonly "height": number;
      readonly "transform"?: ReadonlyArray<number>;
      readonly "anchorX"?: number;
      readonly "anchorY"?: number;
      readonly "anchorZ"?: number;
      readonly "paintCount": number;
      readonly "drawsContent": boolean;
      readonly "invisible"?: boolean;
      readonly "scrollRects"?: ReadonlyArray<ScrollRect>;
      readonly "stickyPositionConstraint"?: StickyPositionConstraint;
    }
    export type PaintProfile = ReadonlyArray<number>;
    export namespace Commands {
      export interface CompositingReasonsParams {
        readonly "layerId": LayerId;
      }
      export interface CompositingReasonsResult {
        readonly "compositingReasons": ReadonlyArray<string>;
        readonly "compositingReasonIds": ReadonlyArray<string>;
      }
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface LoadSnapshotParams {
        readonly "tiles": ReadonlyArray<PictureTile>;
      }
      export interface LoadSnapshotResult {
        readonly "snapshotId": SnapshotId;
      }
      export interface MakeSnapshotParams {
        readonly "layerId": LayerId;
      }
      export interface MakeSnapshotResult {
        readonly "snapshotId": SnapshotId;
      }
      export interface ProfileSnapshotParams {
        readonly "snapshotId": SnapshotId;
        readonly "minRepeatCount"?: number;
        readonly "minDuration"?: number;
        readonly "clipRect"?: Protocol.DOM.Rect;
      }
      export interface ProfileSnapshotResult {
        readonly "timings": ReadonlyArray<PaintProfile>;
      }
      export interface ReleaseSnapshotParams {
        readonly "snapshotId": SnapshotId;
      }
      export type ReleaseSnapshotResult = Readonly<Record<string, never>>;
      export interface ReplaySnapshotParams {
        readonly "snapshotId": SnapshotId;
        readonly "fromStep"?: number;
        readonly "toStep"?: number;
        readonly "scale"?: number;
      }
      export interface ReplaySnapshotResult {
        readonly "dataURL": string;
      }
      export interface SnapshotCommandLogParams {
        readonly "snapshotId": SnapshotId;
      }
      export interface SnapshotCommandLogResult {
        readonly "commandLog": ReadonlyArray<Readonly<Record<string, unknown>>>;
      }
    }
    export namespace Events {
      export interface LayerPaintedEvent {
        readonly "layerId": LayerId;
        readonly "clip": Protocol.DOM.Rect;
      }
      export interface LayerTreeDidChangeEvent {
        readonly "layers"?: ReadonlyArray<Layer>;
      }
    }
  }
  export namespace Log {
    export interface LogEntry {
      readonly "source": "xml" | "javascript" | "network" | "storage" | "appcache" | "rendering" | "security" | "deprecation" | "worker" | "violation" | "intervention" | "recommendation" | "other";
      readonly "level": "verbose" | "info" | "warning" | "error";
      readonly "text": string;
      readonly "category"?: "cors";
      readonly "timestamp": Protocol.Runtime.Timestamp;
      readonly "url"?: string;
      readonly "lineNumber"?: number;
      readonly "stackTrace"?: Protocol.Runtime.StackTrace;
      readonly "networkRequestId"?: Protocol.Network.RequestId;
      readonly "workerId"?: string;
      readonly "args"?: ReadonlyArray<Protocol.Runtime.RemoteObject>;
    }
    export interface ViolationSetting {
      readonly "name": "longTask" | "longLayout" | "blockedEvent" | "blockedParser" | "discouragedAPIUse" | "handler" | "recurringHandler";
      readonly "threshold": number;
    }
    export namespace Commands {
      export type ClearParams = undefined;
      export type ClearResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface StartViolationsReportParams {
        readonly "config": ReadonlyArray<ViolationSetting>;
      }
      export type StartViolationsReportResult = Readonly<Record<string, never>>;
      export type StopViolationsReportParams = undefined;
      export type StopViolationsReportResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface EntryAddedEvent {
        readonly "entry": LogEntry;
      }
    }
  }
  export namespace Media {
    export type PlayerId = string;
    export type Timestamp = number;
    export interface PlayerMessage {
      readonly "level": "error" | "warning" | "info" | "debug";
      readonly "message": string;
    }
    export interface PlayerProperty {
      readonly "name": string;
      readonly "value": string;
    }
    export interface PlayerEvent {
      readonly "timestamp": Timestamp;
      readonly "value": string;
    }
    export interface PlayerErrorSourceLocation {
      readonly "file": string;
      readonly "line": number;
    }
    export interface PlayerError {
      readonly "errorType": string;
      readonly "code": number;
      readonly "stack": ReadonlyArray<PlayerErrorSourceLocation>;
      readonly "cause": ReadonlyArray<PlayerError>;
      readonly "data": Readonly<Record<string, unknown>>;
    }
    export interface Player {
      readonly "playerId": PlayerId;
      readonly "domNodeId"?: Protocol.DOM.BackendNodeId;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface PlayerPropertiesChangedEvent {
        readonly "playerId": PlayerId;
        readonly "properties": ReadonlyArray<PlayerProperty>;
      }
      export interface PlayerEventsAddedEvent {
        readonly "playerId": PlayerId;
        readonly "events": ReadonlyArray<PlayerEvent>;
      }
      export interface PlayerMessagesLoggedEvent {
        readonly "playerId": PlayerId;
        readonly "messages": ReadonlyArray<PlayerMessage>;
      }
      export interface PlayerErrorsRaisedEvent {
        readonly "playerId": PlayerId;
        readonly "errors": ReadonlyArray<PlayerError>;
      }
      export interface PlayerCreatedEvent {
        readonly "player": Player;
      }
    }
  }
  export namespace Memory {
    export type PressureLevel = "moderate" | "critical";
    export interface SamplingProfileNode {
      readonly "size": number;
      readonly "total": number;
      readonly "stack": ReadonlyArray<string>;
    }
    export interface SamplingProfile {
      readonly "samples": ReadonlyArray<SamplingProfileNode>;
      readonly "modules": ReadonlyArray<Module>;
    }
    export interface Module {
      readonly "name": string;
      readonly "uuid": string;
      readonly "baseAddress": string;
      readonly "size": number;
    }
    export interface DOMCounter {
      readonly "name": string;
      readonly "count": number;
    }
    export namespace Commands {
      export type GetDOMCountersParams = undefined;
      export interface GetDOMCountersResult {
        readonly "documents": number;
        readonly "nodes": number;
        readonly "jsEventListeners": number;
      }
      export type GetDOMCountersForLeakDetectionParams = undefined;
      export interface GetDOMCountersForLeakDetectionResult {
        readonly "counters": ReadonlyArray<DOMCounter>;
      }
      export type PrepareForLeakDetectionParams = undefined;
      export type PrepareForLeakDetectionResult = Readonly<Record<string, never>>;
      export type ForciblyPurgeJavaScriptMemoryParams = undefined;
      export type ForciblyPurgeJavaScriptMemoryResult = Readonly<Record<string, never>>;
      export interface SetPressureNotificationsSuppressedParams {
        readonly "suppressed": boolean;
      }
      export type SetPressureNotificationsSuppressedResult = Readonly<Record<string, never>>;
      export interface SimulatePressureNotificationParams {
        readonly "level": PressureLevel;
      }
      export type SimulatePressureNotificationResult = Readonly<Record<string, never>>;
      export interface StartSamplingParams {
        readonly "samplingInterval"?: number;
        readonly "suppressRandomness"?: boolean;
      }
      export type StartSamplingResult = Readonly<Record<string, never>>;
      export type StopSamplingParams = undefined;
      export type StopSamplingResult = Readonly<Record<string, never>>;
      export type GetAllTimeSamplingProfileParams = undefined;
      export interface GetAllTimeSamplingProfileResult {
        readonly "profile": SamplingProfile;
      }
      export type GetBrowserSamplingProfileParams = undefined;
      export interface GetBrowserSamplingProfileResult {
        readonly "profile": SamplingProfile;
      }
      export type GetSamplingProfileParams = undefined;
      export interface GetSamplingProfileResult {
        readonly "profile": SamplingProfile;
      }
    }
    export namespace Events {
    }
  }
  export namespace Network {
    export type ResourceType = "Document" | "Stylesheet" | "Image" | "Media" | "Font" | "Script" | "TextTrack" | "XHR" | "Fetch" | "Prefetch" | "EventSource" | "WebSocket" | "Manifest" | "SignedExchange" | "Ping" | "CSPViolationReport" | "Preflight" | "FedCM" | "Other";
    export type LoaderId = string;
    export type RequestId = string;
    export type ErrorReason = "Failed" | "Aborted" | "TimedOut" | "AccessDenied" | "ConnectionClosed" | "ConnectionReset" | "ConnectionRefused" | "ConnectionAborted" | "ConnectionFailed" | "NameNotResolved" | "InternetDisconnected" | "AddressUnreachable" | "BlockedByClient" | "BlockedByResponse";
    export type TimeSinceEpoch = number;
    export type MonotonicTime = number;
    export type Headers = Readonly<Record<string, unknown>>;
    export type ConnectionType = "none" | "cellular2g" | "cellular3g" | "cellular4g" | "bluetooth" | "ethernet" | "wifi" | "wimax" | "other";
    export type CookieSameSite = "Strict" | "Lax" | "None";
    export type CookiePriority = "Low" | "Medium" | "High";
    export type CookieSourceScheme = "Unset" | "NonSecure" | "Secure";
    export interface ResourceTiming {
      readonly "requestTime": number;
      readonly "proxyStart": number;
      readonly "proxyEnd": number;
      readonly "dnsStart": number;
      readonly "dnsEnd": number;
      readonly "connectStart": number;
      readonly "connectEnd": number;
      readonly "sslStart": number;
      readonly "sslEnd": number;
      readonly "workerStart": number;
      readonly "workerReady": number;
      readonly "workerFetchStart": number;
      readonly "workerRespondWithSettled": number;
      readonly "workerRouterEvaluationStart"?: number;
      readonly "workerCacheLookupStart"?: number;
      readonly "sendStart": number;
      readonly "sendEnd": number;
      readonly "pushStart": number;
      readonly "pushEnd": number;
      readonly "receiveHeadersStart": number;
      readonly "receiveHeadersEnd": number;
    }
    export type ResourcePriority = "VeryLow" | "Low" | "Medium" | "High" | "VeryHigh";
    export type RenderBlockingBehavior = "Blocking" | "InBodyParserBlocking" | "NonBlocking" | "NonBlockingDynamic" | "PotentiallyBlocking";
    export interface PostDataEntry {
      readonly "bytes"?: string;
    }
    export interface Request {
      readonly "url": string;
      readonly "urlFragment"?: string;
      readonly "method": string;
      readonly "headers": Headers;
      readonly "postData"?: string;
      readonly "hasPostData"?: boolean;
      readonly "postDataEntries"?: ReadonlyArray<PostDataEntry>;
      readonly "mixedContentType"?: Protocol.Security.MixedContentType;
      readonly "initialPriority": ResourcePriority;
      readonly "referrerPolicy": "unsafe-url" | "no-referrer-when-downgrade" | "no-referrer" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin";
      readonly "isLinkPreload"?: boolean;
      readonly "trustTokenParams"?: TrustTokenParams;
      readonly "isSameSite"?: boolean;
      readonly "isAdRelated"?: boolean;
    }
    export interface SignedCertificateTimestamp {
      readonly "status": string;
      readonly "origin": string;
      readonly "logDescription": string;
      readonly "logId": string;
      readonly "timestamp": number;
      readonly "hashAlgorithm": string;
      readonly "signatureAlgorithm": string;
      readonly "signatureData": string;
    }
    export interface SecurityDetails {
      readonly "protocol": string;
      readonly "keyExchange": string;
      readonly "keyExchangeGroup"?: string;
      readonly "cipher": string;
      readonly "mac"?: string;
      readonly "certificateId": Protocol.Security.CertificateId;
      readonly "subjectName": string;
      readonly "sanList": ReadonlyArray<string>;
      readonly "issuer": string;
      readonly "validFrom": TimeSinceEpoch;
      readonly "validTo": TimeSinceEpoch;
      readonly "signedCertificateTimestampList": ReadonlyArray<SignedCertificateTimestamp>;
      readonly "certificateTransparencyCompliance": CertificateTransparencyCompliance;
      readonly "serverSignatureAlgorithm"?: number;
      readonly "encryptedClientHello": boolean;
    }
    export type CertificateTransparencyCompliance = "unknown" | "not-compliant" | "compliant";
    export type BlockedReason = "other" | "csp" | "mixed-content" | "origin" | "inspector" | "integrity" | "subresource-filter" | "content-type" | "coep-frame-resource-needs-coep-header" | "coop-sandboxed-iframe-cannot-navigate-to-coop-page" | "corp-not-same-origin" | "corp-not-same-origin-after-defaulted-to-same-origin-by-coep" | "corp-not-same-origin-after-defaulted-to-same-origin-by-dip" | "corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip" | "corp-not-same-site" | "sri-message-signature-mismatch";
    export type CorsError = "DisallowedByMode" | "InvalidResponse" | "WildcardOriginNotAllowed" | "MissingAllowOriginHeader" | "MultipleAllowOriginValues" | "InvalidAllowOriginValue" | "AllowOriginMismatch" | "InvalidAllowCredentials" | "CorsDisabledScheme" | "PreflightInvalidStatus" | "PreflightDisallowedRedirect" | "PreflightWildcardOriginNotAllowed" | "PreflightMissingAllowOriginHeader" | "PreflightMultipleAllowOriginValues" | "PreflightInvalidAllowOriginValue" | "PreflightAllowOriginMismatch" | "PreflightInvalidAllowCredentials" | "PreflightMissingAllowExternal" | "PreflightInvalidAllowExternal" | "InvalidAllowMethodsPreflightResponse" | "InvalidAllowHeadersPreflightResponse" | "MethodDisallowedByPreflightResponse" | "HeaderDisallowedByPreflightResponse" | "RedirectContainsCredentials" | "InsecureLocalNetwork" | "InvalidLocalNetworkAccess" | "NoCorsRedirectModeNotFollow" | "LocalNetworkAccessPermissionDenied";
    export interface CorsErrorStatus {
      readonly "corsError": CorsError;
      readonly "failedParameter": string;
    }
    export type ServiceWorkerResponseSource = "cache-storage" | "http-cache" | "fallback-code" | "network";
    export interface TrustTokenParams {
      readonly "operation": TrustTokenOperationType;
      readonly "refreshPolicy": "UseCached" | "Refresh";
      readonly "issuers"?: ReadonlyArray<string>;
    }
    export type TrustTokenOperationType = "Issuance" | "Redemption" | "Signing";
    export type AlternateProtocolUsage = "alternativeJobWonWithoutRace" | "alternativeJobWonRace" | "mainJobWonRace" | "mappingMissing" | "broken" | "dnsAlpnH3JobWonWithoutRace" | "dnsAlpnH3JobWonRace" | "unspecifiedReason";
    export type ServiceWorkerRouterSource = "network" | "cache" | "fetch-event" | "race-network-and-fetch-handler" | "race-network-and-cache";
    export interface ServiceWorkerRouterInfo {
      readonly "ruleIdMatched"?: number;
      readonly "matchedSourceType"?: ServiceWorkerRouterSource;
      readonly "actualSourceType"?: ServiceWorkerRouterSource;
    }
    export interface Response {
      readonly "url": string;
      readonly "status": number;
      readonly "statusText": string;
      readonly "headers": Headers;
      readonly "headersText"?: string;
      readonly "mimeType": string;
      readonly "charset": string;
      readonly "requestHeaders"?: Headers;
      readonly "requestHeadersText"?: string;
      readonly "connectionReused": boolean;
      readonly "connectionId": number;
      readonly "remoteIPAddress"?: string;
      readonly "remotePort"?: number;
      readonly "fromDiskCache"?: boolean;
      readonly "fromServiceWorker"?: boolean;
      readonly "fromPrefetchCache"?: boolean;
      readonly "fromEarlyHints"?: boolean;
      readonly "serviceWorkerRouterInfo"?: ServiceWorkerRouterInfo;
      readonly "encodedDataLength": number;
      readonly "timing"?: ResourceTiming;
      readonly "serviceWorkerResponseSource"?: ServiceWorkerResponseSource;
      readonly "responseTime"?: TimeSinceEpoch;
      readonly "cacheStorageCacheName"?: string;
      readonly "protocol"?: string;
      readonly "alternateProtocolUsage"?: AlternateProtocolUsage;
      readonly "securityState": Protocol.Security.SecurityState;
      readonly "securityDetails"?: SecurityDetails;
    }
    export interface WebSocketRequest {
      readonly "headers": Headers;
    }
    export interface WebSocketResponse {
      readonly "status": number;
      readonly "statusText": string;
      readonly "headers": Headers;
      readonly "headersText"?: string;
      readonly "requestHeaders"?: Headers;
      readonly "requestHeadersText"?: string;
    }
    export interface WebSocketFrame {
      readonly "opcode": number;
      readonly "mask": boolean;
      readonly "payloadData": string;
    }
    export interface CachedResource {
      readonly "url": string;
      readonly "type": ResourceType;
      readonly "response"?: Response;
      readonly "bodySize": number;
    }
    export interface Initiator {
      readonly "type": "parser" | "script" | "preload" | "SignedExchange" | "preflight" | "FedCM" | "other";
      readonly "stack"?: Protocol.Runtime.StackTrace;
      readonly "url"?: string;
      readonly "lineNumber"?: number;
      readonly "columnNumber"?: number;
      readonly "requestId"?: RequestId;
    }
    export interface CookiePartitionKey {
      readonly "topLevelSite": string;
      readonly "hasCrossSiteAncestor": boolean;
    }
    export interface Cookie {
      readonly "name": string;
      readonly "value": string;
      readonly "domain": string;
      readonly "path": string;
      readonly "expires": number;
      readonly "size": number;
      readonly "httpOnly": boolean;
      readonly "secure": boolean;
      readonly "session": boolean;
      readonly "sameSite"?: CookieSameSite;
      readonly "priority": CookiePriority;
      readonly "sourceScheme": CookieSourceScheme;
      readonly "sourcePort": number;
      readonly "partitionKey"?: CookiePartitionKey;
      readonly "partitionKeyOpaque"?: boolean;
    }
    export type SetCookieBlockedReason = "SecureOnly" | "SameSiteStrict" | "SameSiteLax" | "SameSiteUnspecifiedTreatedAsLax" | "SameSiteNoneInsecure" | "UserPreferences" | "ThirdPartyPhaseout" | "ThirdPartyBlockedInFirstPartySet" | "SyntaxError" | "SchemeNotSupported" | "OverwriteSecure" | "InvalidDomain" | "InvalidPrefix" | "UnknownError" | "SchemefulSameSiteStrict" | "SchemefulSameSiteLax" | "SchemefulSameSiteUnspecifiedTreatedAsLax" | "NameValuePairExceedsMaxSize" | "DisallowedCharacter" | "NoCookieContent";
    export type CookieBlockedReason = "SecureOnly" | "NotOnPath" | "DomainMismatch" | "SameSiteStrict" | "SameSiteLax" | "SameSiteUnspecifiedTreatedAsLax" | "SameSiteNoneInsecure" | "UserPreferences" | "ThirdPartyPhaseout" | "ThirdPartyBlockedInFirstPartySet" | "UnknownError" | "SchemefulSameSiteStrict" | "SchemefulSameSiteLax" | "SchemefulSameSiteUnspecifiedTreatedAsLax" | "NameValuePairExceedsMaxSize" | "PortMismatch" | "SchemeMismatch" | "AnonymousContext";
    export type CookieExemptionReason = "None" | "UserSetting" | "EnterprisePolicy" | "StorageAccess" | "TopLevelStorageAccess" | "Scheme" | "SameSiteNoneCookiesInSandbox";
    export interface BlockedSetCookieWithReason {
      readonly "blockedReasons": ReadonlyArray<SetCookieBlockedReason>;
      readonly "cookieLine": string;
      readonly "cookie"?: Cookie;
    }
    export interface ExemptedSetCookieWithReason {
      readonly "exemptionReason": CookieExemptionReason;
      readonly "cookieLine": string;
      readonly "cookie": Cookie;
    }
    export interface AssociatedCookie {
      readonly "cookie": Cookie;
      readonly "blockedReasons": ReadonlyArray<CookieBlockedReason>;
      readonly "exemptionReason"?: CookieExemptionReason;
    }
    export interface CookieParam {
      readonly "name": string;
      readonly "value": string;
      readonly "url"?: string;
      readonly "domain"?: string;
      readonly "path"?: string;
      readonly "secure"?: boolean;
      readonly "httpOnly"?: boolean;
      readonly "sameSite"?: CookieSameSite;
      readonly "expires"?: TimeSinceEpoch;
      readonly "priority"?: CookiePriority;
      readonly "sourceScheme"?: CookieSourceScheme;
      readonly "sourcePort"?: number;
      readonly "partitionKey"?: CookiePartitionKey;
    }
    export interface AuthChallenge {
      readonly "source"?: "Server" | "Proxy";
      readonly "origin": string;
      readonly "scheme": string;
      readonly "realm": string;
    }
    export interface AuthChallengeResponse {
      readonly "response": "Default" | "CancelAuth" | "ProvideCredentials";
      readonly "username"?: string;
      readonly "password"?: string;
    }
    export interface SignedExchangeSignature {
      readonly "label": string;
      readonly "signature": string;
      readonly "integrity": string;
      readonly "certUrl"?: string;
      readonly "certSha256"?: string;
      readonly "validityUrl": string;
      readonly "date": number;
      readonly "expires": number;
      readonly "certificates"?: ReadonlyArray<string>;
    }
    export interface SignedExchangeHeader {
      readonly "requestUrl": string;
      readonly "responseCode": number;
      readonly "responseHeaders": Headers;
      readonly "signatures": ReadonlyArray<SignedExchangeSignature>;
      readonly "headerIntegrity": string;
    }
    export type SignedExchangeErrorField = "signatureSig" | "signatureIntegrity" | "signatureCertUrl" | "signatureCertSha256" | "signatureValidityUrl" | "signatureTimestamps";
    export interface SignedExchangeError {
      readonly "message": string;
      readonly "signatureIndex"?: number;
      readonly "errorField"?: SignedExchangeErrorField;
    }
    export interface SignedExchangeInfo {
      readonly "outerResponse": Response;
      readonly "hasExtraInfo": boolean;
      readonly "header"?: SignedExchangeHeader;
      readonly "securityDetails"?: SecurityDetails;
      readonly "errors"?: ReadonlyArray<SignedExchangeError>;
    }
    export interface NetworkConditions {
      readonly "urlPattern": string;
      readonly "latency": number;
      readonly "downloadThroughput": number;
      readonly "uploadThroughput": number;
      readonly "connectionType"?: ConnectionType;
      readonly "packetLoss"?: number;
      readonly "packetQueueLength"?: number;
      readonly "packetReordering"?: boolean;
      readonly "offline"?: boolean;
    }
    export interface BlockPattern {
      readonly "urlPattern": string;
      readonly "block": boolean;
    }
    export type DirectSocketDnsQueryType = "ipv4" | "ipv6";
    export interface DirectTCPSocketOptions {
      readonly "noDelay": boolean;
      readonly "keepAliveDelay"?: number;
      readonly "sendBufferSize"?: number;
      readonly "receiveBufferSize"?: number;
      readonly "dnsQueryType"?: DirectSocketDnsQueryType;
    }
    export interface DirectUDPSocketOptions {
      readonly "remoteAddr"?: string;
      readonly "remotePort"?: number;
      readonly "localAddr"?: string;
      readonly "localPort"?: number;
      readonly "dnsQueryType"?: DirectSocketDnsQueryType;
      readonly "sendBufferSize"?: number;
      readonly "receiveBufferSize"?: number;
      readonly "multicastLoopback"?: boolean;
      readonly "multicastTimeToLive"?: number;
      readonly "multicastAllowAddressSharing"?: boolean;
    }
    export interface DirectUDPMessage {
      readonly "data": string;
      readonly "remoteAddr"?: string;
      readonly "remotePort"?: number;
    }
    export type LocalNetworkAccessRequestPolicy = "Allow" | "BlockFromInsecureToMorePrivate" | "WarnFromInsecureToMorePrivate" | "PermissionBlock" | "PermissionWarn";
    export type IPAddressSpace = "Loopback" | "Local" | "Public" | "Unknown";
    export interface ConnectTiming {
      readonly "requestTime": number;
    }
    export interface ClientSecurityState {
      readonly "initiatorIsSecureContext": boolean;
      readonly "initiatorIPAddressSpace": IPAddressSpace;
      readonly "localNetworkAccessRequestPolicy": LocalNetworkAccessRequestPolicy;
    }
    export interface AdScriptIdentifier {
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "debuggerId": Protocol.Runtime.UniqueDebuggerId;
      readonly "name": string;
    }
    export interface AdAncestry {
      readonly "ancestryChain": ReadonlyArray<AdScriptIdentifier>;
      readonly "rootScriptFilterlistRule"?: string;
    }
    export interface AdProvenance {
      readonly "filterlistRule"?: string;
      readonly "adScriptAncestry"?: AdAncestry;
    }
    export type CrossOriginOpenerPolicyValue = "SameOrigin" | "SameOriginAllowPopups" | "RestrictProperties" | "UnsafeNone" | "SameOriginPlusCoep" | "RestrictPropertiesPlusCoep" | "NoopenerAllowPopups";
    export interface CrossOriginOpenerPolicyStatus {
      readonly "value": CrossOriginOpenerPolicyValue;
      readonly "reportOnlyValue": CrossOriginOpenerPolicyValue;
      readonly "reportingEndpoint"?: string;
      readonly "reportOnlyReportingEndpoint"?: string;
    }
    export type CrossOriginEmbedderPolicyValue = "None" | "Credentialless" | "RequireCorp";
    export interface CrossOriginEmbedderPolicyStatus {
      readonly "value": CrossOriginEmbedderPolicyValue;
      readonly "reportOnlyValue": CrossOriginEmbedderPolicyValue;
      readonly "reportingEndpoint"?: string;
      readonly "reportOnlyReportingEndpoint"?: string;
    }
    export type ContentSecurityPolicySource = "HTTP" | "Meta";
    export interface ContentSecurityPolicyStatus {
      readonly "effectiveDirectives": string;
      readonly "isEnforced": boolean;
      readonly "source": ContentSecurityPolicySource;
    }
    export interface SecurityIsolationStatus {
      readonly "coop"?: CrossOriginOpenerPolicyStatus;
      readonly "coep"?: CrossOriginEmbedderPolicyStatus;
      readonly "csp"?: ReadonlyArray<ContentSecurityPolicyStatus>;
    }
    export type ReportStatus = "Queued" | "Pending" | "MarkedForRemoval" | "Success";
    export type ReportId = string;
    export interface ReportingApiReport {
      readonly "id": ReportId;
      readonly "initiatorUrl": string;
      readonly "destination": string;
      readonly "type": string;
      readonly "timestamp": Protocol.Network.TimeSinceEpoch;
      readonly "depth": number;
      readonly "completedAttempts": number;
      readonly "body": Readonly<Record<string, unknown>>;
      readonly "status": ReportStatus;
    }
    export interface ReportingApiEndpoint {
      readonly "url": string;
      readonly "groupName": string;
    }
    export interface DeviceBoundSessionKey {
      readonly "site": string;
      readonly "id": string;
    }
    export interface DeviceBoundSessionWithUsage {
      readonly "sessionKey": DeviceBoundSessionKey;
      readonly "usage": "NotInScope" | "InScopeRefreshNotYetNeeded" | "InScopeRefreshNotAllowed" | "ProactiveRefreshNotPossible" | "ProactiveRefreshAttempted" | "Deferred";
    }
    export interface DeviceBoundSessionCookieCraving {
      readonly "name": string;
      readonly "domain": string;
      readonly "path": string;
      readonly "secure": boolean;
      readonly "httpOnly": boolean;
      readonly "sameSite"?: CookieSameSite;
    }
    export interface DeviceBoundSessionUrlRule {
      readonly "ruleType": "Exclude" | "Include";
      readonly "hostPattern": string;
      readonly "pathPrefix": string;
    }
    export interface DeviceBoundSessionInclusionRules {
      readonly "origin": string;
      readonly "includeSite": boolean;
      readonly "urlRules": ReadonlyArray<DeviceBoundSessionUrlRule>;
    }
    export interface DeviceBoundSession {
      readonly "key": DeviceBoundSessionKey;
      readonly "refreshUrl": string;
      readonly "inclusionRules": DeviceBoundSessionInclusionRules;
      readonly "cookieCravings": ReadonlyArray<DeviceBoundSessionCookieCraving>;
      readonly "expiryDate": Protocol.Network.TimeSinceEpoch;
      readonly "cachedChallenge"?: string;
      readonly "allowedRefreshInitiators": ReadonlyArray<string>;
    }
    export type DeviceBoundSessionEventId = string;
    export type DeviceBoundSessionFetchResult = "Success" | "SigningKeyGenerationError" | "AttestationKeyGenerationError" | "SigningError" | "TransientSigningError" | "ServerRequestedTermination" | "InvalidSessionId" | "InvalidChallenge" | "TooManyChallenges" | "InvalidFetcherUrl" | "InvalidRefreshUrl" | "TransientHttpError" | "ScopeOriginSameSiteMismatch" | "RefreshUrlSameSiteMismatch" | "MismatchedSessionId" | "MissingScope" | "NoCredentials" | "SubdomainRegistrationWellKnownUnavailable" | "SubdomainRegistrationUnauthorized" | "SubdomainRegistrationWellKnownMalformed" | "SessionProviderWellKnownUnavailable" | "RelyingPartyWellKnownUnavailable" | "FederatedKeyThumbprintMismatch" | "InvalidFederatedSessionUrl" | "InvalidFederatedKey" | "TooManyRelyingOriginLabels" | "BoundCookieSetForbidden" | "NetError" | "ProxyError" | "EmptySessionConfig" | "InvalidCredentialsConfig" | "InvalidCredentialsType" | "InvalidCredentialsEmptyName" | "InvalidCredentialsCookie" | "PersistentHttpError" | "RegistrationAttemptedChallenge" | "InvalidScopeOrigin" | "ScopeOriginContainsPath" | "RefreshInitiatorNotString" | "RefreshInitiatorInvalidHostPattern" | "InvalidScopeSpecification" | "MissingScopeSpecificationType" | "EmptyScopeSpecificationDomain" | "EmptyScopeSpecificationPath" | "InvalidScopeSpecificationType" | "InvalidScopeIncludeSite" | "MissingScopeIncludeSite" | "FederatedNotAuthorizedByProvider" | "FederatedNotAuthorizedByRelyingParty" | "SessionProviderWellKnownMalformed" | "SessionProviderWellKnownHasProviderOrigin" | "RelyingPartyWellKnownMalformed" | "RelyingPartyWellKnownHasRelyingOrigins" | "InvalidFederatedSessionProviderSessionMissing" | "InvalidFederatedSessionWrongProviderOrigin" | "InvalidCredentialsCookieCreationTime" | "InvalidCredentialsCookieName" | "InvalidCredentialsCookieParsing" | "InvalidCredentialsCookieUnpermittedAttribute" | "InvalidCredentialsCookieInvalidDomain" | "InvalidCredentialsCookiePrefix" | "InvalidScopeRulePath" | "InvalidScopeRuleHostPattern" | "ScopeRuleOriginScopedHostPatternMismatch" | "ScopeRuleSiteScopedHostPatternMismatch" | "SigningQuotaExceeded" | "InvalidConfigJson" | "InvalidFederatedSessionProviderFailedToRestoreKey" | "FailedToUnwrapKey" | "SessionDeletedDuringRefresh" | "CrossOriginRegistrationSiteNotIncluded" | "InvalidPreProvisionedKeyInitiatorMissing" | "PreProvisionedKeyAccessNotGranted" | "PreProvisionedKeyNotFound";
    export interface DeviceBoundSessionFailedRequest {
      readonly "requestUrl": string;
      readonly "netError"?: string;
      readonly "responseError"?: number;
      readonly "responseErrorBody"?: string;
    }
    export interface CreationEventDetails {
      readonly "fetchResult": DeviceBoundSessionFetchResult;
      readonly "newSession"?: DeviceBoundSession;
      readonly "failedRequest"?: DeviceBoundSessionFailedRequest;
    }
    export interface RefreshEventDetails {
      readonly "refreshResult": "Refreshed" | "InitializedService" | "Unreachable" | "ServerError" | "FatalError" | "SigningQuotaExceeded" | "RefreshedAsWaiter" | "TransientSigningError" | "InScopeRefreshNotYetNeeded";
      readonly "fetchResult"?: DeviceBoundSessionFetchResult;
      readonly "newSession"?: DeviceBoundSession;
      readonly "wasFullyProactiveRefresh": boolean;
      readonly "failedRequest"?: DeviceBoundSessionFailedRequest;
    }
    export interface TerminationEventDetails {
      readonly "deletionReason": "Expired" | "FailedToRestoreKey" | "FailedToUnwrapKey" | "StoragePartitionCleared" | "ClearBrowsingData" | "ServerRequested" | "InvalidSessionParams" | "RefreshFatalError" | "DevTools";
    }
    export interface ChallengeEventDetails {
      readonly "challengeResult": "Success" | "NoSessionId" | "NoSessionMatch" | "CantSetBoundCookie";
      readonly "challenge": string;
    }
    export interface LoadNetworkResourcePageResult {
      readonly "success": boolean;
      readonly "netError"?: number;
      readonly "netErrorName"?: string;
      readonly "httpStatusCode"?: number;
      readonly "stream"?: Protocol.IO.StreamHandle;
      readonly "headers"?: Protocol.Network.Headers;
    }
    export interface LoadNetworkResourceOptions {
      readonly "disableCache": boolean;
      readonly "includeCredentials": boolean;
    }
    export namespace Commands {
      export type CanClearBrowserCacheParams = undefined;
      export interface CanClearBrowserCacheResult {
        readonly "result": boolean;
      }
      export type CanClearBrowserCookiesParams = undefined;
      export interface CanClearBrowserCookiesResult {
        readonly "result": boolean;
      }
      export type CanEmulateNetworkConditionsParams = undefined;
      export interface CanEmulateNetworkConditionsResult {
        readonly "result": boolean;
      }
      export type ClearBrowserCacheParams = undefined;
      export type ClearBrowserCacheResult = Readonly<Record<string, never>>;
      export type ClearBrowserCookiesParams = undefined;
      export type ClearBrowserCookiesResult = Readonly<Record<string, never>>;
      export interface DeleteCookiesParams {
        readonly "name": string;
        readonly "url"?: string;
        readonly "domain"?: string;
        readonly "path"?: string;
        readonly "partitionKey"?: CookiePartitionKey;
      }
      export type DeleteCookiesResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface EmulateNetworkConditionsParams {
        readonly "offline": boolean;
        readonly "latency": number;
        readonly "downloadThroughput": number;
        readonly "uploadThroughput": number;
        readonly "connectionType"?: ConnectionType;
        readonly "packetLoss"?: number;
        readonly "packetQueueLength"?: number;
        readonly "packetReordering"?: boolean;
      }
      export type EmulateNetworkConditionsResult = Readonly<Record<string, never>>;
      export interface EmulateNetworkConditionsByRuleParams {
        readonly "offline"?: boolean;
        readonly "emulateOfflineServiceWorker"?: boolean;
        readonly "matchedNetworkConditions": ReadonlyArray<NetworkConditions>;
      }
      export interface EmulateNetworkConditionsByRuleResult {
        readonly "ruleIds": ReadonlyArray<string>;
      }
      export interface OverrideNetworkStateParams {
        readonly "offline": boolean;
        readonly "latency": number;
        readonly "downloadThroughput": number;
        readonly "uploadThroughput": number;
        readonly "connectionType"?: ConnectionType;
      }
      export type OverrideNetworkStateResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "maxTotalBufferSize"?: number;
        readonly "maxResourceBufferSize"?: number;
        readonly "maxPostDataSize"?: number;
        readonly "reportDirectSocketTraffic"?: boolean;
        readonly "enableDurableMessages"?: boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface ConfigureDurableMessagesParams {
        readonly "maxTotalBufferSize"?: number;
        readonly "maxResourceBufferSize"?: number;
      }
      export type ConfigureDurableMessagesResult = Readonly<Record<string, never>>;
      export type GetAllCookiesParams = undefined;
      export interface GetAllCookiesResult {
        readonly "cookies": ReadonlyArray<Cookie>;
      }
      export interface GetCertificateParams {
        readonly "origin": string;
      }
      export interface GetCertificateResult {
        readonly "tableNames": ReadonlyArray<string>;
      }
      export interface GetCookiesParams {
        readonly "urls"?: ReadonlyArray<string>;
      }
      export interface GetCookiesResult {
        readonly "cookies": ReadonlyArray<Cookie>;
      }
      export interface GetResponseBodyParams {
        readonly "requestId": RequestId;
      }
      export interface GetResponseBodyResult {
        readonly "body": string;
        readonly "base64Encoded": boolean;
      }
      export interface GetRequestPostDataParams {
        readonly "requestId": RequestId;
      }
      export interface GetRequestPostDataResult {
        readonly "postData": string;
        readonly "base64Encoded": boolean;
      }
      export interface ReplayXHRParams {
        readonly "requestId": RequestId;
      }
      export type ReplayXHRResult = Readonly<Record<string, never>>;
      export interface SearchInResponseBodyParams {
        readonly "requestId": RequestId;
        readonly "query": string;
        readonly "caseSensitive"?: boolean;
        readonly "isRegex"?: boolean;
      }
      export interface SearchInResponseBodyResult {
        readonly "result": ReadonlyArray<Protocol.Debugger.SearchMatch>;
      }
      export interface SetBlockedURLsParams {
        readonly "urlPatterns"?: ReadonlyArray<BlockPattern>;
        readonly "urls"?: ReadonlyArray<string>;
      }
      export type SetBlockedURLsResult = Readonly<Record<string, never>>;
      export interface SetBypassServiceWorkerParams {
        readonly "bypass": boolean;
      }
      export type SetBypassServiceWorkerResult = Readonly<Record<string, never>>;
      export interface SetCacheDisabledParams {
        readonly "cacheDisabled": boolean;
      }
      export type SetCacheDisabledResult = Readonly<Record<string, never>>;
      export interface SetCookieParams {
        readonly "name": string;
        readonly "value": string;
        readonly "url"?: string;
        readonly "domain"?: string;
        readonly "path"?: string;
        readonly "secure"?: boolean;
        readonly "httpOnly"?: boolean;
        readonly "sameSite"?: CookieSameSite;
        readonly "expires"?: TimeSinceEpoch;
        readonly "priority"?: CookiePriority;
        readonly "sourceScheme"?: CookieSourceScheme;
        readonly "sourcePort"?: number;
        readonly "partitionKey"?: CookiePartitionKey;
      }
      export interface SetCookieResult {
        readonly "success": boolean;
      }
      export interface SetCookiesParams {
        readonly "cookies": ReadonlyArray<CookieParam>;
      }
      export type SetCookiesResult = Readonly<Record<string, never>>;
      export interface SetExtraHTTPHeadersParams {
        readonly "headers": Headers;
      }
      export type SetExtraHTTPHeadersResult = Readonly<Record<string, never>>;
      export interface SetAttachDebugStackParams {
        readonly "enabled": boolean;
      }
      export type SetAttachDebugStackResult = Readonly<Record<string, never>>;
      export interface SetUserAgentOverrideParams {
        readonly "userAgent": string;
        readonly "acceptLanguage"?: string;
        readonly "platform"?: string;
        readonly "userAgentMetadata"?: Protocol.Emulation.UserAgentMetadata;
      }
      export type SetUserAgentOverrideResult = Readonly<Record<string, never>>;
      export interface StreamResourceContentParams {
        readonly "requestId": RequestId;
      }
      export interface StreamResourceContentResult {
        readonly "bufferedData": string;
      }
      export interface GetSecurityIsolationStatusParams {
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface GetSecurityIsolationStatusResult {
        readonly "status": SecurityIsolationStatus;
      }
      export interface EnableReportingApiParams {
        readonly "enable": boolean;
      }
      export type EnableReportingApiResult = Readonly<Record<string, never>>;
      export interface EnableDeviceBoundSessionsParams {
        readonly "enable": boolean;
      }
      export type EnableDeviceBoundSessionsResult = Readonly<Record<string, never>>;
      export interface DeleteDeviceBoundSessionParams {
        readonly "key": DeviceBoundSessionKey;
      }
      export type DeleteDeviceBoundSessionResult = Readonly<Record<string, never>>;
      export interface FetchSchemefulSiteParams {
        readonly "origin": string;
      }
      export interface FetchSchemefulSiteResult {
        readonly "schemefulSite": string;
      }
      export interface LoadNetworkResourceParams {
        readonly "frameId"?: Protocol.Page.FrameId;
        readonly "url": string;
        readonly "options": LoadNetworkResourceOptions;
      }
      export interface LoadNetworkResourceResult {
        readonly "resource": LoadNetworkResourcePageResult;
      }
      export interface SetCookieControlsParams {
        readonly "enableThirdPartyCookieRestriction": boolean;
      }
      export type SetCookieControlsResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface DataReceivedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "dataLength": number;
        readonly "encodedDataLength": number;
        readonly "data"?: string;
      }
      export interface EventSourceMessageReceivedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "eventName": string;
        readonly "eventId": string;
        readonly "data": string;
      }
      export interface LoadingFailedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "type": ResourceType;
        readonly "errorText": string;
        readonly "canceled"?: boolean;
        readonly "blockedReason"?: BlockedReason;
        readonly "corsErrorStatus"?: CorsErrorStatus;
      }
      export interface LoadingFinishedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "encodedDataLength": number;
      }
      export interface RequestServedFromCacheEvent {
        readonly "requestId": RequestId;
      }
      export interface RequestWillBeSentEvent {
        readonly "requestId": RequestId;
        readonly "loaderId": LoaderId;
        readonly "documentURL": string;
        readonly "request": Request;
        readonly "timestamp": MonotonicTime;
        readonly "wallTime": TimeSinceEpoch;
        readonly "initiator": Initiator;
        readonly "redirectHasExtraInfo": boolean;
        readonly "redirectResponse"?: Response;
        readonly "type"?: ResourceType;
        readonly "frameId"?: Protocol.Page.FrameId;
        readonly "hasUserGesture"?: boolean;
        readonly "renderBlockingBehavior"?: RenderBlockingBehavior;
      }
      export interface ResourceChangedPriorityEvent {
        readonly "requestId": RequestId;
        readonly "newPriority": ResourcePriority;
        readonly "timestamp": MonotonicTime;
      }
      export interface SignedExchangeReceivedEvent {
        readonly "requestId": RequestId;
        readonly "info": SignedExchangeInfo;
      }
      export interface ResponseReceivedEvent {
        readonly "requestId": RequestId;
        readonly "loaderId": LoaderId;
        readonly "timestamp": MonotonicTime;
        readonly "type": ResourceType;
        readonly "response": Response;
        readonly "hasExtraInfo": boolean;
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface WebSocketClosedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
      }
      export interface WebSocketCreatedEvent {
        readonly "requestId": RequestId;
        readonly "url": string;
        readonly "initiator"?: Initiator;
      }
      export interface WebSocketFrameErrorEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "errorMessage": string;
      }
      export interface WebSocketFrameReceivedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "response": WebSocketFrame;
      }
      export interface WebSocketFrameSentEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "response": WebSocketFrame;
      }
      export interface WebSocketHandshakeResponseReceivedEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "response": WebSocketResponse;
      }
      export interface WebSocketWillSendHandshakeRequestEvent {
        readonly "requestId": RequestId;
        readonly "timestamp": MonotonicTime;
        readonly "wallTime": TimeSinceEpoch;
        readonly "request": WebSocketRequest;
      }
      export interface WebTransportCreatedEvent {
        readonly "transportId": RequestId;
        readonly "url": string;
        readonly "timestamp": MonotonicTime;
        readonly "initiator"?: Initiator;
      }
      export interface WebTransportConnectionEstablishedEvent {
        readonly "transportId": RequestId;
        readonly "timestamp": MonotonicTime;
      }
      export interface WebTransportClosedEvent {
        readonly "transportId": RequestId;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectTCPSocketCreatedEvent {
        readonly "identifier": RequestId;
        readonly "remoteAddr": string;
        readonly "remotePort": number;
        readonly "options": DirectTCPSocketOptions;
        readonly "timestamp": MonotonicTime;
        readonly "initiator"?: Initiator;
      }
      export interface DirectTCPSocketOpenedEvent {
        readonly "identifier": RequestId;
        readonly "remoteAddr": string;
        readonly "remotePort": number;
        readonly "timestamp": MonotonicTime;
        readonly "localAddr"?: string;
        readonly "localPort"?: number;
      }
      export interface DirectTCPSocketAbortedEvent {
        readonly "identifier": RequestId;
        readonly "errorMessage": ErrorReason;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectTCPSocketClosedEvent {
        readonly "identifier": RequestId;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectTCPSocketChunkSentEvent {
        readonly "identifier": RequestId;
        readonly "data": string;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectTCPSocketChunkReceivedEvent {
        readonly "identifier": RequestId;
        readonly "data": string;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectUDPSocketJoinedMulticastGroupEvent {
        readonly "identifier": RequestId;
        readonly "IPAddress": string;
      }
      export interface DirectUDPSocketLeftMulticastGroupEvent {
        readonly "identifier": RequestId;
        readonly "IPAddress": string;
      }
      export interface DirectUDPSocketCreatedEvent {
        readonly "identifier": RequestId;
        readonly "options": DirectUDPSocketOptions;
        readonly "timestamp": MonotonicTime;
        readonly "initiator"?: Initiator;
      }
      export interface DirectUDPSocketOpenedEvent {
        readonly "identifier": RequestId;
        readonly "localAddr": string;
        readonly "localPort": number;
        readonly "timestamp": MonotonicTime;
        readonly "remoteAddr"?: string;
        readonly "remotePort"?: number;
      }
      export interface DirectUDPSocketAbortedEvent {
        readonly "identifier": RequestId;
        readonly "errorMessage": ErrorReason;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectUDPSocketClosedEvent {
        readonly "identifier": RequestId;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectUDPSocketChunkSentEvent {
        readonly "identifier": RequestId;
        readonly "message": DirectUDPMessage;
        readonly "timestamp": MonotonicTime;
      }
      export interface DirectUDPSocketChunkReceivedEvent {
        readonly "identifier": RequestId;
        readonly "message": DirectUDPMessage;
        readonly "timestamp": MonotonicTime;
      }
      export interface RequestWillBeSentExtraInfoEvent {
        readonly "requestId": RequestId;
        readonly "associatedCookies": ReadonlyArray<AssociatedCookie>;
        readonly "headers": Headers;
        readonly "connectTiming": ConnectTiming;
        readonly "deviceBoundSessionUsages"?: ReadonlyArray<DeviceBoundSessionWithUsage>;
        readonly "clientSecurityState"?: ClientSecurityState;
        readonly "siteHasCookieInOtherPartition"?: boolean;
        readonly "appliedNetworkConditionsId"?: string;
      }
      export interface ResponseReceivedExtraInfoEvent {
        readonly "requestId": RequestId;
        readonly "blockedCookies": ReadonlyArray<BlockedSetCookieWithReason>;
        readonly "headers": Headers;
        readonly "resourceIPAddressSpace": IPAddressSpace;
        readonly "statusCode": number;
        readonly "headersText"?: string;
        readonly "cookiePartitionKey"?: CookiePartitionKey;
        readonly "cookiePartitionKeyOpaque"?: boolean;
        readonly "exemptedCookies"?: ReadonlyArray<ExemptedSetCookieWithReason>;
      }
      export interface ResponseReceivedEarlyHintsEvent {
        readonly "requestId": RequestId;
        readonly "headers": Headers;
      }
      export interface TrustTokenOperationDoneEvent {
        readonly "status": "Ok" | "InvalidArgument" | "MissingIssuerKeys" | "FailedPrecondition" | "ResourceExhausted" | "AlreadyExists" | "ResourceLimited" | "Unauthorized" | "BadResponse" | "InternalError" | "UnknownError" | "FulfilledLocally" | "SiteIssuerLimit";
        readonly "type": TrustTokenOperationType;
        readonly "requestId": RequestId;
        readonly "topLevelOrigin"?: string;
        readonly "issuerOrigin"?: string;
        readonly "issuedTokenCount"?: number;
      }
      export type PolicyUpdatedEvent = Readonly<Record<string, never>>;
      export interface ReportingApiReportAddedEvent {
        readonly "report": ReportingApiReport;
      }
      export interface ReportingApiReportUpdatedEvent {
        readonly "report": ReportingApiReport;
      }
      export interface ReportingApiEndpointsChangedForOriginEvent {
        readonly "origin": string;
        readonly "endpoints": ReadonlyArray<ReportingApiEndpoint>;
      }
      export interface DeviceBoundSessionsAddedEvent {
        readonly "sessions": ReadonlyArray<DeviceBoundSession>;
      }
      export interface DeviceBoundSessionEventOccurredEvent {
        readonly "eventId": DeviceBoundSessionEventId;
        readonly "site": string;
        readonly "succeeded": boolean;
        readonly "sessionId"?: string;
        readonly "creationEventDetails"?: CreationEventDetails;
        readonly "refreshEventDetails"?: RefreshEventDetails;
        readonly "terminationEventDetails"?: TerminationEventDetails;
        readonly "challengeEventDetails"?: ChallengeEventDetails;
      }
    }
  }
  export namespace Overlay {
    export interface SourceOrderConfig {
      readonly "parentOutlineColor": Protocol.DOM.RGBA;
      readonly "childOutlineColor": Protocol.DOM.RGBA;
    }
    export interface GridHighlightConfig {
      readonly "showGridExtensionLines"?: boolean;
      readonly "showPositiveLineNumbers"?: boolean;
      readonly "showNegativeLineNumbers"?: boolean;
      readonly "showAreaNames"?: boolean;
      readonly "showLineNames"?: boolean;
      readonly "showTrackSizes"?: boolean;
      readonly "gridBorderColor"?: Protocol.DOM.RGBA;
      readonly "cellBorderColor"?: Protocol.DOM.RGBA;
      readonly "rowLineColor"?: Protocol.DOM.RGBA;
      readonly "columnLineColor"?: Protocol.DOM.RGBA;
      readonly "gridBorderDash"?: boolean;
      readonly "cellBorderDash"?: boolean;
      readonly "rowLineDash"?: boolean;
      readonly "columnLineDash"?: boolean;
      readonly "rowGapColor"?: Protocol.DOM.RGBA;
      readonly "rowHatchColor"?: Protocol.DOM.RGBA;
      readonly "columnGapColor"?: Protocol.DOM.RGBA;
      readonly "columnHatchColor"?: Protocol.DOM.RGBA;
      readonly "areaBorderColor"?: Protocol.DOM.RGBA;
      readonly "gridBackgroundColor"?: Protocol.DOM.RGBA;
    }
    export interface FlexContainerHighlightConfig {
      readonly "containerBorder"?: LineStyle;
      readonly "lineSeparator"?: LineStyle;
      readonly "itemSeparator"?: LineStyle;
      readonly "mainDistributedSpace"?: BoxStyle;
      readonly "crossDistributedSpace"?: BoxStyle;
      readonly "rowGapSpace"?: BoxStyle;
      readonly "columnGapSpace"?: BoxStyle;
      readonly "crossAlignment"?: LineStyle;
    }
    export interface FlexItemHighlightConfig {
      readonly "baseSizeBox"?: BoxStyle;
      readonly "baseSizeBorder"?: LineStyle;
      readonly "flexibilityArrow"?: LineStyle;
    }
    export interface LineStyle {
      readonly "color"?: Protocol.DOM.RGBA;
      readonly "pattern"?: "dashed" | "dotted";
    }
    export interface BoxStyle {
      readonly "fillColor"?: Protocol.DOM.RGBA;
      readonly "hatchColor"?: Protocol.DOM.RGBA;
    }
    export type ContrastAlgorithm = "aa" | "aaa" | "apca";
    export interface HighlightConfig {
      readonly "showInfo"?: boolean;
      readonly "showStyles"?: boolean;
      readonly "showRulers"?: boolean;
      readonly "showAccessibilityInfo"?: boolean;
      readonly "showExtensionLines"?: boolean;
      readonly "contentColor"?: Protocol.DOM.RGBA;
      readonly "paddingColor"?: Protocol.DOM.RGBA;
      readonly "borderColor"?: Protocol.DOM.RGBA;
      readonly "marginColor"?: Protocol.DOM.RGBA;
      readonly "eventTargetColor"?: Protocol.DOM.RGBA;
      readonly "shapeColor"?: Protocol.DOM.RGBA;
      readonly "shapeMarginColor"?: Protocol.DOM.RGBA;
      readonly "cssGridColor"?: Protocol.DOM.RGBA;
      readonly "colorFormat"?: ColorFormat;
      readonly "gridHighlightConfig"?: GridHighlightConfig;
      readonly "flexContainerHighlightConfig"?: FlexContainerHighlightConfig;
      readonly "flexItemHighlightConfig"?: FlexItemHighlightConfig;
      readonly "contrastAlgorithm"?: ContrastAlgorithm;
      readonly "containerQueryContainerHighlightConfig"?: ContainerQueryContainerHighlightConfig;
    }
    export type ColorFormat = "rgb" | "hsl" | "hwb" | "hex";
    export interface GridNodeHighlightConfig {
      readonly "gridHighlightConfig": GridHighlightConfig;
      readonly "nodeId": Protocol.DOM.NodeId;
    }
    export interface FlexNodeHighlightConfig {
      readonly "flexContainerHighlightConfig": FlexContainerHighlightConfig;
      readonly "nodeId": Protocol.DOM.NodeId;
    }
    export interface ScrollSnapContainerHighlightConfig {
      readonly "snapportBorder"?: LineStyle;
      readonly "snapAreaBorder"?: LineStyle;
      readonly "scrollMarginColor"?: Protocol.DOM.RGBA;
      readonly "scrollPaddingColor"?: Protocol.DOM.RGBA;
    }
    export interface ScrollSnapHighlightConfig {
      readonly "scrollSnapContainerHighlightConfig": ScrollSnapContainerHighlightConfig;
      readonly "nodeId": Protocol.DOM.NodeId;
    }
    export interface HingeConfig {
      readonly "rect": Protocol.DOM.Rect;
      readonly "contentColor"?: Protocol.DOM.RGBA;
      readonly "outlineColor"?: Protocol.DOM.RGBA;
    }
    export type DisplayCutoutShape = "pill" | "notch" | "circle" | "rectangle";
    export interface DisplayCutoutConfig {
      readonly "rect": Protocol.DOM.Rect;
      readonly "shape": DisplayCutoutShape;
      readonly "borderRadius"?: number;
      readonly "upperRadius"?: number;
      readonly "lowerRadius"?: number;
      readonly "cx"?: number;
      readonly "cy"?: number;
      readonly "radius"?: number;
      readonly "contentColor"?: Protocol.DOM.RGBA;
    }
    export interface WindowControlsOverlayConfig {
      readonly "showCSS": boolean;
      readonly "selectedPlatform": string;
      readonly "themeColor": string;
    }
    export interface ContainerQueryHighlightConfig {
      readonly "containerQueryContainerHighlightConfig": ContainerQueryContainerHighlightConfig;
      readonly "nodeId": Protocol.DOM.NodeId;
    }
    export interface ContainerQueryContainerHighlightConfig {
      readonly "containerBorder"?: LineStyle;
      readonly "descendantBorder"?: LineStyle;
    }
    export interface IsolatedElementHighlightConfig {
      readonly "isolationModeHighlightConfig": IsolationModeHighlightConfig;
      readonly "nodeId": Protocol.DOM.NodeId;
    }
    export interface IsolationModeHighlightConfig {
      readonly "resizerColor"?: Protocol.DOM.RGBA;
      readonly "resizerHandleColor"?: Protocol.DOM.RGBA;
      readonly "maskColor"?: Protocol.DOM.RGBA;
    }
    export type InspectMode = "searchForNode" | "searchForUAShadowDOM" | "captureAreaScreenshot" | "none";
    export interface InspectedElementAnchorConfig {
      readonly "nodeId"?: Protocol.DOM.NodeId;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetHighlightObjectForTestParams {
        readonly "nodeId": Protocol.DOM.NodeId;
        readonly "includeDistance"?: boolean;
        readonly "includeStyle"?: boolean;
        readonly "colorFormat"?: ColorFormat;
        readonly "showAccessibilityInfo"?: boolean;
      }
      export interface GetHighlightObjectForTestResult {
        readonly "highlight": Readonly<Record<string, unknown>>;
      }
      export interface GetGridHighlightObjectsForTestParams {
        readonly "nodeIds": ReadonlyArray<Protocol.DOM.NodeId>;
      }
      export interface GetGridHighlightObjectsForTestResult {
        readonly "highlights": Readonly<Record<string, unknown>>;
      }
      export interface GetSourceOrderHighlightObjectForTestParams {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface GetSourceOrderHighlightObjectForTestResult {
        readonly "highlight": Readonly<Record<string, unknown>>;
      }
      export type HideHighlightParams = undefined;
      export type HideHighlightResult = Readonly<Record<string, never>>;
      export interface HighlightFrameParams {
        readonly "frameId": Protocol.Page.FrameId;
        readonly "contentColor"?: Protocol.DOM.RGBA;
        readonly "contentOutlineColor"?: Protocol.DOM.RGBA;
      }
      export type HighlightFrameResult = Readonly<Record<string, never>>;
      export interface HighlightNodeParams {
        readonly "highlightConfig": HighlightConfig;
        readonly "nodeId"?: Protocol.DOM.NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
        readonly "selector"?: string;
      }
      export type HighlightNodeResult = Readonly<Record<string, never>>;
      export interface HighlightQuadParams {
        readonly "quad": Protocol.DOM.Quad;
        readonly "color"?: Protocol.DOM.RGBA;
        readonly "outlineColor"?: Protocol.DOM.RGBA;
      }
      export type HighlightQuadResult = Readonly<Record<string, never>>;
      export interface HighlightRectParams {
        readonly "x": number;
        readonly "y": number;
        readonly "width": number;
        readonly "height": number;
        readonly "color"?: Protocol.DOM.RGBA;
        readonly "outlineColor"?: Protocol.DOM.RGBA;
      }
      export type HighlightRectResult = Readonly<Record<string, never>>;
      export interface HighlightSourceOrderParams {
        readonly "sourceOrderConfig": SourceOrderConfig;
        readonly "nodeId"?: Protocol.DOM.NodeId;
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
        readonly "objectId"?: Protocol.Runtime.RemoteObjectId;
      }
      export type HighlightSourceOrderResult = Readonly<Record<string, never>>;
      export interface SetInspectModeParams {
        readonly "mode": InspectMode;
        readonly "highlightConfig"?: HighlightConfig;
      }
      export type SetInspectModeResult = Readonly<Record<string, never>>;
      export interface SetShowAdHighlightsParams {
        readonly "show": boolean;
      }
      export type SetShowAdHighlightsResult = Readonly<Record<string, never>>;
      export interface SetPausedInDebuggerMessageParams {
        readonly "message"?: string;
      }
      export type SetPausedInDebuggerMessageResult = Readonly<Record<string, never>>;
      export interface SetShowDebugBordersParams {
        readonly "show": boolean;
      }
      export type SetShowDebugBordersResult = Readonly<Record<string, never>>;
      export interface SetShowFPSCounterParams {
        readonly "show": boolean;
      }
      export type SetShowFPSCounterResult = Readonly<Record<string, never>>;
      export interface SetShowGridOverlaysParams {
        readonly "gridNodeHighlightConfigs": ReadonlyArray<GridNodeHighlightConfig>;
      }
      export type SetShowGridOverlaysResult = Readonly<Record<string, never>>;
      export interface SetShowFlexOverlaysParams {
        readonly "flexNodeHighlightConfigs": ReadonlyArray<FlexNodeHighlightConfig>;
      }
      export type SetShowFlexOverlaysResult = Readonly<Record<string, never>>;
      export interface SetShowScrollSnapOverlaysParams {
        readonly "scrollSnapHighlightConfigs": ReadonlyArray<ScrollSnapHighlightConfig>;
      }
      export type SetShowScrollSnapOverlaysResult = Readonly<Record<string, never>>;
      export interface SetShowContainerQueryOverlaysParams {
        readonly "containerQueryHighlightConfigs": ReadonlyArray<ContainerQueryHighlightConfig>;
      }
      export type SetShowContainerQueryOverlaysResult = Readonly<Record<string, never>>;
      export interface SetShowInspectedElementAnchorParams {
        readonly "inspectedElementAnchorConfig": InspectedElementAnchorConfig;
      }
      export type SetShowInspectedElementAnchorResult = Readonly<Record<string, never>>;
      export interface SetShowPaintRectsParams {
        readonly "result": boolean;
      }
      export type SetShowPaintRectsResult = Readonly<Record<string, never>>;
      export interface SetShowLayoutShiftRegionsParams {
        readonly "result": boolean;
      }
      export type SetShowLayoutShiftRegionsResult = Readonly<Record<string, never>>;
      export interface SetShowScrollBottleneckRectsParams {
        readonly "show": boolean;
      }
      export type SetShowScrollBottleneckRectsResult = Readonly<Record<string, never>>;
      export interface SetShowHitTestBordersParams {
        readonly "show": boolean;
      }
      export type SetShowHitTestBordersResult = Readonly<Record<string, never>>;
      export interface SetShowWebVitalsParams {
        readonly "show": boolean;
      }
      export type SetShowWebVitalsResult = Readonly<Record<string, never>>;
      export interface SetShowViewportSizeOnResizeParams {
        readonly "show": boolean;
      }
      export type SetShowViewportSizeOnResizeResult = Readonly<Record<string, never>>;
      export interface SetShowHingeParams {
        readonly "hingeConfig"?: HingeConfig;
      }
      export type SetShowHingeResult = Readonly<Record<string, never>>;
      export interface SetShowDisplayCutoutParams {
        readonly "displayCutoutConfig"?: DisplayCutoutConfig;
      }
      export type SetShowDisplayCutoutResult = Readonly<Record<string, never>>;
      export interface SetShowIsolatedElementsParams {
        readonly "isolatedElementHighlightConfigs": ReadonlyArray<IsolatedElementHighlightConfig>;
      }
      export type SetShowIsolatedElementsResult = Readonly<Record<string, never>>;
      export interface SetShowWindowControlsOverlayParams {
        readonly "windowControlsOverlayConfig"?: WindowControlsOverlayConfig;
      }
      export type SetShowWindowControlsOverlayResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface InspectNodeRequestedEvent {
        readonly "backendNodeId": Protocol.DOM.BackendNodeId;
      }
      export interface NodeHighlightRequestedEvent {
        readonly "nodeId": Protocol.DOM.NodeId;
      }
      export interface ScreenshotRequestedEvent {
        readonly "viewport": Protocol.Page.Viewport;
      }
      export interface InspectPanelShowRequestedEvent {
        readonly "backendNodeId": Protocol.DOM.BackendNodeId;
      }
      export interface InspectedElementWindowRestoredEvent {
        readonly "backendNodeId": Protocol.DOM.BackendNodeId;
      }
      export type InspectModeCanceledEvent = Readonly<Record<string, never>>;
    }
  }
  export namespace PWA {
    export interface FileHandlerAccept {
      readonly "mediaType": string;
      readonly "fileExtensions": ReadonlyArray<string>;
    }
    export interface FileHandler {
      readonly "action": string;
      readonly "accepts": ReadonlyArray<FileHandlerAccept>;
      readonly "displayName": string;
    }
    export type DisplayMode = "standalone" | "browser";
    export namespace Commands {
      export interface GetOsAppStateParams {
        readonly "manifestId": string;
      }
      export interface GetOsAppStateResult {
        readonly "badgeCount": number;
        readonly "fileHandlers": ReadonlyArray<FileHandler>;
      }
      export interface InstallParams {
        readonly "manifestId": string;
        readonly "installUrlOrBundleUrl"?: string;
      }
      export type InstallResult = Readonly<Record<string, never>>;
      export interface UninstallParams {
        readonly "manifestId": string;
      }
      export type UninstallResult = Readonly<Record<string, never>>;
      export interface LaunchParams {
        readonly "manifestId": string;
        readonly "url"?: string;
      }
      export interface LaunchResult {
        readonly "targetId": Protocol.Target.TargetID;
      }
      export interface LaunchFilesInAppParams {
        readonly "manifestId": string;
        readonly "files": ReadonlyArray<string>;
      }
      export interface LaunchFilesInAppResult {
        readonly "targetIds": ReadonlyArray<Protocol.Target.TargetID>;
      }
      export interface OpenCurrentPageInAppParams {
        readonly "manifestId": string;
      }
      export type OpenCurrentPageInAppResult = Readonly<Record<string, never>>;
      export interface ChangeAppUserSettingsParams {
        readonly "manifestId": string;
        readonly "linkCapturing"?: boolean;
        readonly "displayMode"?: DisplayMode;
      }
      export type ChangeAppUserSettingsResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
    }
  }
  export namespace Page {
    export type FrameId = string;
    export type AdFrameType = "none" | "child" | "root";
    export type AdFrameExplanation = "ParentIsAd" | "CreatedByAdScript" | "MatchedBlockingRule";
    export interface AdFrameStatus {
      readonly "adFrameType": AdFrameType;
      readonly "explanations"?: ReadonlyArray<AdFrameExplanation>;
    }
    export type SecureContextType = "Secure" | "SecureLocalhost" | "InsecureScheme" | "InsecureAncestor";
    export type CrossOriginIsolatedContextType = "Isolated" | "NotIsolated" | "NotIsolatedFeatureDisabled";
    export type GatedAPIFeatures = "SharedArrayBuffers" | "SharedArrayBuffersTransferAllowed" | "PerformanceMeasureMemory" | "PerformanceProfile";
    export type PermissionsPolicyFeature = "accelerometer" | "all-screens-capture" | "ambient-light-sensor" | "aria-notify" | "autofill" | "autoplay" | "bluetooth" | "browsing-topics" | "camera" | "captured-surface-control" | "ch-dpr" | "ch-device-memory" | "ch-downlink" | "ch-ect" | "ch-prefers-color-scheme" | "ch-prefers-reduced-motion" | "ch-prefers-reduced-transparency" | "ch-rtt" | "ch-save-data" | "ch-ua" | "ch-ua-arch" | "ch-ua-bitness" | "ch-ua-high-entropy-values" | "ch-ua-platform" | "ch-ua-model" | "ch-ua-mobile" | "ch-ua-form-factors" | "ch-ua-full-version" | "ch-ua-full-version-list" | "ch-ua-platform-version" | "ch-ua-wow64" | "ch-viewport-height" | "ch-viewport-width" | "ch-width" | "clipboard-read" | "clipboard-write" | "compute-pressure" | "controlled-frame" | "cross-origin-isolated" | "deferred-fetch" | "deferred-fetch-minimal" | "device-attributes" | "digital-credentials-create" | "digital-credentials-get" | "direct-sockets" | "direct-sockets-multicast" | "display-capture" | "document-domain" | "encrypted-media" | "execution-while-out-of-viewport" | "execution-while-not-rendered" | "focus-without-user-activation" | "fullscreen" | "frobulate" | "gamepad" | "geolocation" | "gyroscope" | "hid" | "identity-credentials-get" | "idle-detection" | "interest-cohort" | "join-ad-interest-group" | "keyboard-map" | "language-detector" | "language-model" | "local-fonts" | "local-network" | "local-network-access" | "loopback-network" | "magnetometer" | "manual-text" | "media-playback-while-not-visible" | "microphone" | "midi" | "on-device-speech-recognition" | "otp-credentials" | "payment" | "picture-in-picture" | "private-aggregation" | "private-state-token-issuance" | "private-state-token-redemption" | "publickey-credentials-create" | "publickey-credentials-get" | "record-ad-auction-events" | "rewriter" | "run-ad-auction" | "screen-wake-lock" | "serial" | "shared-storage" | "shared-storage-select-url" | "smart-card" | "speaker-selection" | "storage-access" | "sub-apps" | "summarizer" | "sync-xhr" | "tools" | "translator" | "unload" | "usb" | "usb-unrestricted" | "vertical-scroll" | "web-app-installation" | "webnn" | "web-printing" | "web-share" | "window-management" | "writer" | "xr-spatial-tracking";
    export type PermissionsPolicyBlockReason = "Header" | "IframeAttribute" | "InFencedFrameTree" | "InIsolatedApp";
    export interface PermissionsPolicyBlockLocator {
      readonly "frameId": FrameId;
      readonly "blockReason": PermissionsPolicyBlockReason;
    }
    export interface PermissionsPolicyFeatureState {
      readonly "feature": PermissionsPolicyFeature;
      readonly "allowed": boolean;
      readonly "locator"?: PermissionsPolicyBlockLocator;
    }
    export type OriginTrialTokenStatus = "Success" | "NotSupported" | "Insecure" | "Expired" | "WrongOrigin" | "InvalidSignature" | "Malformed" | "WrongVersion" | "FeatureDisabled" | "TokenDisabled" | "FeatureDisabledForUser" | "UnknownTrial";
    export type OriginTrialStatus = "Enabled" | "ValidTokenNotProvided" | "OSNotSupported" | "TrialNotAllowed";
    export type OriginTrialUsageRestriction = "None" | "Subset";
    export interface OriginTrialToken {
      readonly "origin": string;
      readonly "matchSubDomains": boolean;
      readonly "trialName": string;
      readonly "expiryTime": Protocol.Network.TimeSinceEpoch;
      readonly "isThirdParty": boolean;
      readonly "usageRestriction": OriginTrialUsageRestriction;
    }
    export interface OriginTrialTokenWithStatus {
      readonly "rawTokenText": string;
      readonly "parsedToken"?: OriginTrialToken;
      readonly "status": OriginTrialTokenStatus;
    }
    export interface OriginTrial {
      readonly "trialName": string;
      readonly "status": OriginTrialStatus;
      readonly "tokensWithStatus": ReadonlyArray<OriginTrialTokenWithStatus>;
    }
    export interface SecurityOriginDetails {
      readonly "isLocalhost": boolean;
    }
    export interface Frame {
      readonly "id": FrameId;
      readonly "parentId"?: FrameId;
      readonly "loaderId": Protocol.Network.LoaderId;
      readonly "name"?: string;
      readonly "url": string;
      readonly "urlFragment"?: string;
      readonly "domainAndRegistry": string;
      readonly "securityOrigin": string;
      readonly "securityOriginDetails"?: SecurityOriginDetails;
      readonly "mimeType": string;
      readonly "unreachableUrl"?: string;
      readonly "adFrameStatus"?: AdFrameStatus;
      readonly "secureContextType": SecureContextType;
      readonly "crossOriginIsolatedContextType": CrossOriginIsolatedContextType;
      readonly "gatedAPIFeatures": ReadonlyArray<GatedAPIFeatures>;
    }
    export interface FrameResource {
      readonly "url": string;
      readonly "type": Protocol.Network.ResourceType;
      readonly "mimeType": string;
      readonly "lastModified"?: Protocol.Network.TimeSinceEpoch;
      readonly "contentSize"?: number;
      readonly "failed"?: boolean;
      readonly "canceled"?: boolean;
    }
    export interface FrameResourceTree {
      readonly "frame": Frame;
      readonly "childFrames"?: ReadonlyArray<FrameResourceTree>;
      readonly "resources": ReadonlyArray<FrameResource>;
    }
    export interface FrameTree {
      readonly "frame": Frame;
      readonly "childFrames"?: ReadonlyArray<FrameTree>;
    }
    export type ScriptIdentifier = string;
    export type TransitionType = "link" | "typed" | "address_bar" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated" | "other";
    export interface NavigationEntry {
      readonly "id": number;
      readonly "url": string;
      readonly "userTypedURL": string;
      readonly "title": string;
      readonly "transitionType": TransitionType;
    }
    export interface ScreencastFrameMetadata {
      readonly "offsetTop": number;
      readonly "pageScaleFactor": number;
      readonly "deviceWidth": number;
      readonly "deviceHeight": number;
      readonly "scrollOffsetX": number;
      readonly "scrollOffsetY": number;
      readonly "timestamp"?: Protocol.Network.TimeSinceEpoch;
    }
    export type DialogType = "alert" | "confirm" | "prompt" | "beforeunload";
    export interface AppManifestError {
      readonly "message": string;
      readonly "critical": number;
      readonly "line": number;
      readonly "column": number;
    }
    export interface AppManifestParsedProperties {
      readonly "scope": string;
    }
    export interface LayoutViewport {
      readonly "pageX": number;
      readonly "pageY": number;
      readonly "clientWidth": number;
      readonly "clientHeight": number;
    }
    export interface VisualViewport {
      readonly "offsetX": number;
      readonly "offsetY": number;
      readonly "pageX": number;
      readonly "pageY": number;
      readonly "clientWidth": number;
      readonly "clientHeight": number;
      readonly "scale": number;
      readonly "zoom"?: number;
    }
    export interface Viewport {
      readonly "x": number;
      readonly "y": number;
      readonly "width": number;
      readonly "height": number;
      readonly "scale": number;
    }
    export interface FontFamilies {
      readonly "standard"?: string;
      readonly "fixed"?: string;
      readonly "serif"?: string;
      readonly "sansSerif"?: string;
      readonly "cursive"?: string;
      readonly "fantasy"?: string;
      readonly "math"?: string;
    }
    export interface ScriptFontFamilies {
      readonly "script": string;
      readonly "fontFamilies": FontFamilies;
    }
    export interface FontSizes {
      readonly "standard"?: number;
      readonly "fixed"?: number;
    }
    export type ClientNavigationReason = "anchorClick" | "formSubmissionGet" | "formSubmissionPost" | "httpHeaderRefresh" | "initialFrameNavigation" | "metaTagRefresh" | "other" | "pageBlockInterstitial" | "reload" | "scriptInitiated";
    export type ClientNavigationDisposition = "currentTab" | "newTab" | "newWindow" | "download";
    export interface InstallabilityErrorArgument {
      readonly "name": string;
      readonly "value": string;
    }
    export interface InstallabilityError {
      readonly "errorId": string;
      readonly "errorArguments": ReadonlyArray<InstallabilityErrorArgument>;
    }
    export type ReferrerPolicy = "noReferrer" | "noReferrerWhenDowngrade" | "origin" | "originWhenCrossOrigin" | "sameOrigin" | "strictOrigin" | "strictOriginWhenCrossOrigin" | "unsafeUrl";
    export interface CompilationCacheParams {
      readonly "url": string;
      readonly "eager"?: boolean;
    }
    export interface FileFilter {
      readonly "name"?: string;
      readonly "accepts"?: ReadonlyArray<string>;
    }
    export interface FileHandler {
      readonly "action": string;
      readonly "name": string;
      readonly "accepts"?: ReadonlyArray<FileFilter>;
      readonly "launchType": string;
    }
    export interface ImageResource {
      readonly "url": string;
      readonly "sizes"?: string;
      readonly "type"?: string;
    }
    export interface LaunchHandler {
      readonly "clientMode": string;
    }
    export interface ProtocolHandler {
      readonly "protocol": string;
      readonly "url": string;
    }
    export interface RelatedApplication {
      readonly "id"?: string;
      readonly "url": string;
    }
    export interface ScopeExtension {
      readonly "origin": string;
      readonly "hasOriginWildcard": boolean;
    }
    export interface Screenshot {
      readonly "image": ImageResource;
      readonly "formFactor": string;
      readonly "label"?: string;
    }
    export interface ShareTarget {
      readonly "action": string;
      readonly "method": string;
      readonly "enctype": string;
      readonly "title"?: string;
      readonly "text"?: string;
      readonly "url"?: string;
      readonly "files"?: ReadonlyArray<FileFilter>;
    }
    export interface Shortcut {
      readonly "name": string;
      readonly "url": string;
    }
    export interface WebAppManifest {
      readonly "backgroundColor"?: string;
      readonly "description"?: string;
      readonly "dir"?: string;
      readonly "display"?: string;
      readonly "displayOverrides"?: ReadonlyArray<string>;
      readonly "fileHandlers"?: ReadonlyArray<FileHandler>;
      readonly "icons"?: ReadonlyArray<ImageResource>;
      readonly "id"?: string;
      readonly "lang"?: string;
      readonly "launchHandler"?: LaunchHandler;
      readonly "name"?: string;
      readonly "orientation"?: string;
      readonly "preferRelatedApplications"?: boolean;
      readonly "protocolHandlers"?: ReadonlyArray<ProtocolHandler>;
      readonly "relatedApplications"?: ReadonlyArray<RelatedApplication>;
      readonly "scope"?: string;
      readonly "scopeExtensions"?: ReadonlyArray<ScopeExtension>;
      readonly "screenshots"?: ReadonlyArray<Screenshot>;
      readonly "shareTarget"?: ShareTarget;
      readonly "shortName"?: string;
      readonly "shortcuts"?: ReadonlyArray<Shortcut>;
      readonly "startUrl"?: string;
      readonly "themeColor"?: string;
    }
    export type NavigationType = "Navigation" | "BackForwardCacheRestore";
    export type BackForwardCacheNotRestoredReason = "NotPrimaryMainFrame" | "BackForwardCacheDisabled" | "RelatedActiveContentsExist" | "HTTPStatusNotOK" | "SchemeNotHTTPOrHTTPS" | "Loading" | "WasGrantedMediaAccess" | "DisableForRenderFrameHostCalled" | "DomainNotAllowed" | "HTTPMethodNotGET" | "SubframeIsNavigating" | "Timeout" | "CacheLimit" | "JavaScriptExecution" | "RendererProcessKilled" | "RendererProcessCrashed" | "SchedulerTrackedFeatureUsed" | "ConflictingBrowsingInstance" | "CacheFlushed" | "ServiceWorkerVersionActivation" | "SessionRestored" | "ServiceWorkerPostMessage" | "EnteredBackForwardCacheBeforeServiceWorkerHostAdded" | "RenderFrameHostReused_SameSite" | "RenderFrameHostReused_CrossSite" | "ServiceWorkerClaim" | "IgnoreEventAndEvict" | "HaveInnerContents" | "TimeoutPuttingInCache" | "BackForwardCacheDisabledByLowMemory" | "BackForwardCacheDisabledByCommandLine" | "NetworkRequestDatapipeDrainedAsBytesConsumer" | "NetworkRequestRedirected" | "NetworkRequestTimeout" | "NetworkExceedsBufferLimit" | "NavigationCancelledWhileRestoring" | "NotMostRecentNavigationEntry" | "BackForwardCacheDisabledForPrerender" | "UserAgentOverrideDiffers" | "ForegroundCacheLimit" | "ForwardCacheDisabled" | "BrowsingInstanceNotSwapped" | "BackForwardCacheDisabledForDelegate" | "UnloadHandlerExistsInMainFrame" | "UnloadHandlerExistsInSubFrame" | "ServiceWorkerUnregistration" | "CacheControlNoStore" | "CacheControlNoStoreCookieModified" | "CacheControlNoStoreHTTPOnlyCookieModified" | "NoResponseHead" | "Unknown" | "ActivationNavigationsDisallowedForBug1234857" | "ErrorDocument" | "FencedFramesEmbedder" | "CookieDisabled" | "HTTPAuthRequired" | "CookieFlushed" | "BroadcastChannelOnMessage" | "WebViewSettingsChanged" | "WebViewJavaScriptObjectChanged" | "WebViewMessageListenerInjected" | "WebViewSafeBrowsingAllowlistChanged" | "WebViewDocumentStartJavascriptChanged" | "WebSocket" | "WebTransport" | "WebRTC" | "MainResourceHasCacheControlNoStore" | "MainResourceHasCacheControlNoCache" | "SubresourceHasCacheControlNoStore" | "SubresourceHasCacheControlNoCache" | "ContainsPlugins" | "DocumentLoaded" | "OutstandingNetworkRequestOthers" | "RequestedMIDIPermission" | "RequestedAudioCapturePermission" | "RequestedVideoCapturePermission" | "RequestedBackForwardCacheBlockedSensors" | "RequestedBackgroundWorkPermission" | "BroadcastChannel" | "WebXR" | "SharedWorker" | "SharedWorkerMessage" | "SharedWorkerWithNoActiveClient" | "WebLocks" | "WebLocksContention" | "WebHID" | "WebBluetooth" | "WebShare" | "RequestedStorageAccessGrant" | "WebNfc" | "OutstandingNetworkRequestFetch" | "OutstandingNetworkRequestXHR" | "AppBanner" | "Printing" | "WebDatabase" | "PictureInPicture" | "SpeechRecognizer" | "IdleManager" | "PaymentManager" | "SpeechSynthesis" | "KeyboardLock" | "WebOTPService" | "OutstandingNetworkRequestDirectSocket" | "InjectedJavascript" | "InjectedStyleSheet" | "KeepaliveRequest" | "IndexedDBEvent" | "Dummy" | "JsNetworkRequestReceivedCacheControlNoStoreResource" | "WebRTCUsedWithCCNS" | "WebTransportUsedWithCCNS" | "WebSocketUsedWithCCNS" | "SmartCard" | "LiveMediaStreamTrack" | "UnloadHandler" | "ParserAborted" | "ContentSecurityHandler" | "ContentWebAuthenticationAPI" | "ContentFileChooser" | "ContentSerial" | "ContentFileSystemAccess" | "ContentMediaDevicesDispatcherHost" | "ContentWebBluetooth" | "ContentWebUSB" | "ContentMediaSessionService" | "ContentScreenReader" | "ContentDiscarded" | "EmbedderPopupBlockerTabHelper" | "EmbedderSafeBrowsingTriggeredPopupBlocker" | "EmbedderSafeBrowsingThreatDetails" | "EmbedderAppBannerManager" | "EmbedderDomDistillerViewerSource" | "EmbedderDomDistillerSelfDeletingRequestDelegate" | "EmbedderOomInterventionTabHelper" | "EmbedderOfflinePage" | "EmbedderChromePasswordManagerClientBindCredentialManager" | "EmbedderPermissionRequestManager" | "EmbedderModalDialog" | "EmbedderExtensions" | "EmbedderExtensionMessaging" | "EmbedderExtensionMessagingForOpenPort" | "EmbedderExtensionSentMessageToCachedFrame" | "EmbedderExtensionFrame" | "EmbedderPrivilegedWebContents" | "RequestedByWebViewClient" | "PostMessageByWebViewClient" | "CacheControlNoStoreDeviceBoundSessionTerminated" | "CacheLimitPrunedOnModerateMemoryPressure" | "CacheLimitPrunedOnCriticalMemoryPressure";
    export type BackForwardCacheNotRestoredReasonType = "SupportPending" | "PageSupportNeeded" | "Circumstantial";
    export interface BackForwardCacheBlockingDetails {
      readonly "url"?: string;
      readonly "function"?: string;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
    }
    export interface BackForwardCacheNotRestoredExplanation {
      readonly "type": BackForwardCacheNotRestoredReasonType;
      readonly "reason": BackForwardCacheNotRestoredReason;
      readonly "context"?: string;
      readonly "details"?: ReadonlyArray<BackForwardCacheBlockingDetails>;
    }
    export interface BackForwardCacheNotRestoredExplanationTree {
      readonly "url": string;
      readonly "explanations": ReadonlyArray<BackForwardCacheNotRestoredExplanation>;
      readonly "children": ReadonlyArray<BackForwardCacheNotRestoredExplanationTree>;
    }
    export namespace Commands {
      export interface AddScriptToEvaluateOnLoadParams {
        readonly "scriptSource": string;
      }
      export interface AddScriptToEvaluateOnLoadResult {
        readonly "identifier": ScriptIdentifier;
      }
      export interface AddScriptToEvaluateOnNewDocumentParams {
        readonly "source": string;
        readonly "worldName"?: string;
        readonly "includeCommandLineAPI"?: boolean;
        readonly "runImmediately"?: boolean;
      }
      export interface AddScriptToEvaluateOnNewDocumentResult {
        readonly "identifier": ScriptIdentifier;
      }
      export type BringToFrontParams = undefined;
      export type BringToFrontResult = Readonly<Record<string, never>>;
      export interface CaptureScreenshotParams {
        readonly "format"?: "jpeg" | "png" | "webp";
        readonly "quality"?: number;
        readonly "clip"?: Viewport;
        readonly "fromSurface"?: boolean;
        readonly "captureBeyondViewport"?: boolean;
        readonly "optimizeForSpeed"?: boolean;
      }
      export interface CaptureScreenshotResult {
        readonly "data": string;
      }
      export interface CaptureSnapshotParams {
        readonly "format"?: "mhtml";
      }
      export interface CaptureSnapshotResult {
        readonly "data": string;
      }
      export type ClearDeviceMetricsOverrideParams = undefined;
      export type ClearDeviceMetricsOverrideResult = Readonly<Record<string, never>>;
      export type ClearDeviceOrientationOverrideParams = undefined;
      export type ClearDeviceOrientationOverrideResult = Readonly<Record<string, never>>;
      export type ClearGeolocationOverrideParams = undefined;
      export type ClearGeolocationOverrideResult = Readonly<Record<string, never>>;
      export interface CreateIsolatedWorldParams {
        readonly "frameId": FrameId;
        readonly "worldName"?: string;
        readonly "grantUniveralAccess"?: boolean;
        readonly "contentSecurityPolicy"?: string;
      }
      export interface CreateIsolatedWorldResult {
        readonly "executionContextId": Protocol.Runtime.ExecutionContextId;
      }
      export interface DeleteCookieParams {
        readonly "cookieName": string;
        readonly "url": string;
      }
      export type DeleteCookieResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "enableFileChooserOpenedEvent"?: boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetAppManifestParams {
        readonly "manifestId"?: string;
      }
      export interface GetAppManifestResult {
        readonly "url": string;
        readonly "errors": ReadonlyArray<AppManifestError>;
        readonly "data"?: string;
        readonly "parsed"?: AppManifestParsedProperties;
        readonly "manifest": WebAppManifest;
      }
      export type GetInstallabilityErrorsParams = undefined;
      export interface GetInstallabilityErrorsResult {
        readonly "installabilityErrors": ReadonlyArray<InstallabilityError>;
      }
      export type GetManifestIconsParams = undefined;
      export interface GetManifestIconsResult {
        readonly "primaryIcon"?: string;
      }
      export type GetAppIdParams = undefined;
      export interface GetAppIdResult {
        readonly "appId"?: string;
        readonly "recommendedId"?: string;
      }
      export interface GetAdScriptAncestryParams {
        readonly "frameId": FrameId;
      }
      export interface GetAdScriptAncestryResult {
        readonly "adScriptAncestry"?: Protocol.Network.AdAncestry;
      }
      export type GetFrameTreeParams = undefined;
      export interface GetFrameTreeResult {
        readonly "frameTree": FrameTree;
      }
      export type GetLayoutMetricsParams = undefined;
      export interface GetLayoutMetricsResult {
        readonly "layoutViewport": LayoutViewport;
        readonly "visualViewport": VisualViewport;
        readonly "contentSize": Protocol.DOM.Rect;
        readonly "cssLayoutViewport": LayoutViewport;
        readonly "cssVisualViewport": VisualViewport;
        readonly "cssContentSize": Protocol.DOM.Rect;
      }
      export type GetNavigationHistoryParams = undefined;
      export interface GetNavigationHistoryResult {
        readonly "currentIndex": number;
        readonly "entries": ReadonlyArray<NavigationEntry>;
      }
      export type ResetNavigationHistoryParams = undefined;
      export type ResetNavigationHistoryResult = Readonly<Record<string, never>>;
      export interface GetResourceContentParams {
        readonly "frameId": FrameId;
        readonly "url": string;
      }
      export interface GetResourceContentResult {
        readonly "content": string;
        readonly "base64Encoded": boolean;
      }
      export type GetResourceTreeParams = undefined;
      export interface GetResourceTreeResult {
        readonly "frameTree": FrameResourceTree;
      }
      export interface HandleJavaScriptDialogParams {
        readonly "accept": boolean;
        readonly "promptText"?: string;
      }
      export type HandleJavaScriptDialogResult = Readonly<Record<string, never>>;
      export interface NavigateParams {
        readonly "url": string;
        readonly "referrer"?: string;
        readonly "transitionType"?: TransitionType;
        readonly "frameId"?: FrameId;
        readonly "referrerPolicy"?: ReferrerPolicy;
      }
      export interface NavigateResult {
        readonly "frameId": FrameId;
        readonly "loaderId"?: Protocol.Network.LoaderId;
        readonly "errorText"?: string;
        readonly "isDownload"?: boolean;
      }
      export interface NavigateToHistoryEntryParams {
        readonly "entryId": number;
      }
      export type NavigateToHistoryEntryResult = Readonly<Record<string, never>>;
      export interface PrintToPDFParams {
        readonly "landscape"?: boolean;
        readonly "displayHeaderFooter"?: boolean;
        readonly "printBackground"?: boolean;
        readonly "scale"?: number;
        readonly "paperWidth"?: number;
        readonly "paperHeight"?: number;
        readonly "marginTop"?: number;
        readonly "marginBottom"?: number;
        readonly "marginLeft"?: number;
        readonly "marginRight"?: number;
        readonly "pageRanges"?: string;
        readonly "headerTemplate"?: string;
        readonly "footerTemplate"?: string;
        readonly "preferCSSPageSize"?: boolean;
        readonly "transferMode"?: "ReturnAsBase64" | "ReturnAsStream";
        readonly "generateTaggedPDF"?: boolean;
        readonly "generateDocumentOutline"?: boolean;
      }
      export interface PrintToPDFResult {
        readonly "data": string;
        readonly "stream"?: Protocol.IO.StreamHandle;
      }
      export interface ReloadParams {
        readonly "ignoreCache"?: boolean;
        readonly "scriptToEvaluateOnLoad"?: string;
        readonly "loaderId"?: Protocol.Network.LoaderId;
      }
      export type ReloadResult = Readonly<Record<string, never>>;
      export interface RemoveScriptToEvaluateOnLoadParams {
        readonly "identifier": ScriptIdentifier;
      }
      export type RemoveScriptToEvaluateOnLoadResult = Readonly<Record<string, never>>;
      export interface RemoveScriptToEvaluateOnNewDocumentParams {
        readonly "identifier": ScriptIdentifier;
      }
      export type RemoveScriptToEvaluateOnNewDocumentResult = Readonly<Record<string, never>>;
      export interface ScreencastFrameAckParams {
        readonly "sessionId": number;
      }
      export type ScreencastFrameAckResult = Readonly<Record<string, never>>;
      export interface SearchInResourceParams {
        readonly "frameId": FrameId;
        readonly "url": string;
        readonly "query": string;
        readonly "caseSensitive"?: boolean;
        readonly "isRegex"?: boolean;
      }
      export interface SearchInResourceResult {
        readonly "result": ReadonlyArray<Protocol.Debugger.SearchMatch>;
      }
      export interface SetAdBlockingEnabledParams {
        readonly "enabled": boolean;
      }
      export type SetAdBlockingEnabledResult = Readonly<Record<string, never>>;
      export interface SetBypassCSPParams {
        readonly "enabled": boolean;
      }
      export type SetBypassCSPResult = Readonly<Record<string, never>>;
      export interface GetPermissionsPolicyStateParams {
        readonly "frameId": FrameId;
      }
      export interface GetPermissionsPolicyStateResult {
        readonly "states": ReadonlyArray<PermissionsPolicyFeatureState>;
      }
      export interface GetOriginTrialsParams {
        readonly "frameId": FrameId;
      }
      export interface GetOriginTrialsResult {
        readonly "originTrials": ReadonlyArray<OriginTrial>;
      }
      export interface SetDeviceMetricsOverrideParams {
        readonly "width": number;
        readonly "height": number;
        readonly "deviceScaleFactor": number;
        readonly "mobile": boolean;
        readonly "scale"?: number;
        readonly "screenWidth"?: number;
        readonly "screenHeight"?: number;
        readonly "positionX"?: number;
        readonly "positionY"?: number;
        readonly "dontSetVisibleSize"?: boolean;
        readonly "screenOrientation"?: Protocol.Emulation.ScreenOrientation;
        readonly "viewport"?: Viewport;
      }
      export type SetDeviceMetricsOverrideResult = Readonly<Record<string, never>>;
      export interface SetDeviceOrientationOverrideParams {
        readonly "alpha": number;
        readonly "beta": number;
        readonly "gamma": number;
      }
      export type SetDeviceOrientationOverrideResult = Readonly<Record<string, never>>;
      export interface SetFontFamiliesParams {
        readonly "fontFamilies": FontFamilies;
        readonly "forScripts"?: ReadonlyArray<ScriptFontFamilies>;
      }
      export type SetFontFamiliesResult = Readonly<Record<string, never>>;
      export interface SetFontSizesParams {
        readonly "fontSizes": FontSizes;
      }
      export type SetFontSizesResult = Readonly<Record<string, never>>;
      export interface SetDocumentContentParams {
        readonly "frameId": FrameId;
        readonly "html": string;
      }
      export type SetDocumentContentResult = Readonly<Record<string, never>>;
      export interface SetDownloadBehaviorParams {
        readonly "behavior": "deny" | "allow" | "default";
        readonly "downloadPath"?: string;
      }
      export type SetDownloadBehaviorResult = Readonly<Record<string, never>>;
      export interface SetGeolocationOverrideParams {
        readonly "latitude"?: number;
        readonly "longitude"?: number;
        readonly "accuracy"?: number;
      }
      export type SetGeolocationOverrideResult = Readonly<Record<string, never>>;
      export interface SetLifecycleEventsEnabledParams {
        readonly "enabled": boolean;
      }
      export type SetLifecycleEventsEnabledResult = Readonly<Record<string, never>>;
      export interface SetTouchEmulationEnabledParams {
        readonly "enabled": boolean;
        readonly "configuration"?: "mobile" | "desktop";
      }
      export type SetTouchEmulationEnabledResult = Readonly<Record<string, never>>;
      export interface StartScreencastParams {
        readonly "format"?: "jpeg" | "png";
        readonly "quality"?: number;
        readonly "maxWidth"?: number;
        readonly "maxHeight"?: number;
        readonly "everyNthFrame"?: number;
      }
      export type StartScreencastResult = Readonly<Record<string, never>>;
      export interface StartScreenRecordingParams {
        readonly "audio"?: boolean;
        readonly "maxWidth"?: number;
        readonly "maxHeight"?: number;
        readonly "frameRate"?: number;
      }
      export interface StartScreenRecordingResult {
        readonly "stream": Protocol.IO.StreamHandle;
      }
      export type StopScreenRecordingParams = undefined;
      export interface StopScreenRecordingResult {
        readonly "stream": Protocol.IO.StreamHandle;
      }
      export type StopLoadingParams = undefined;
      export type StopLoadingResult = Readonly<Record<string, never>>;
      export type CrashParams = undefined;
      export type CrashResult = Readonly<Record<string, never>>;
      export type CloseParams = undefined;
      export type CloseResult = Readonly<Record<string, never>>;
      export interface SetWebLifecycleStateParams {
        readonly "state": "frozen" | "active";
      }
      export type SetWebLifecycleStateResult = Readonly<Record<string, never>>;
      export type StopScreencastParams = undefined;
      export type StopScreencastResult = Readonly<Record<string, never>>;
      export interface ProduceCompilationCacheParams {
        readonly "scripts": ReadonlyArray<CompilationCacheParams>;
      }
      export type ProduceCompilationCacheResult = Readonly<Record<string, never>>;
      export interface AddCompilationCacheParams {
        readonly "url": string;
        readonly "data": string;
      }
      export type AddCompilationCacheResult = Readonly<Record<string, never>>;
      export type ClearCompilationCacheParams = undefined;
      export type ClearCompilationCacheResult = Readonly<Record<string, never>>;
      export interface SetSPCTransactionModeParams {
        readonly "mode": "none" | "autoAccept" | "autoChooseToAuthAnotherWay" | "autoReject" | "autoOptOut";
      }
      export type SetSPCTransactionModeResult = Readonly<Record<string, never>>;
      export interface SetRPHRegistrationModeParams {
        readonly "mode": "none" | "autoAccept" | "autoReject";
      }
      export type SetRPHRegistrationModeResult = Readonly<Record<string, never>>;
      export interface GenerateTestReportParams {
        readonly "message": string;
        readonly "group"?: string;
      }
      export type GenerateTestReportResult = Readonly<Record<string, never>>;
      export type WaitForDebuggerParams = undefined;
      export type WaitForDebuggerResult = Readonly<Record<string, never>>;
      export interface SetInterceptFileChooserDialogParams {
        readonly "enabled": boolean;
        readonly "cancel"?: boolean;
      }
      export type SetInterceptFileChooserDialogResult = Readonly<Record<string, never>>;
      export interface SetPrerenderingAllowedParams {
        readonly "isAllowed": boolean;
      }
      export type SetPrerenderingAllowedResult = Readonly<Record<string, never>>;
      export interface GetAnnotatedPageContentParams {
        readonly "includeActionableInformation"?: boolean;
      }
      export interface GetAnnotatedPageContentResult {
        readonly "content": string;
      }
    }
    export namespace Events {
      export interface DomContentEventFiredEvent {
        readonly "timestamp": Protocol.Network.MonotonicTime;
      }
      export interface FileChooserOpenedEvent {
        readonly "frameId": FrameId;
        readonly "mode": "selectSingle" | "selectMultiple";
        readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
      }
      export interface FrameAttachedEvent {
        readonly "frameId": FrameId;
        readonly "parentFrameId": FrameId;
        readonly "stack"?: Protocol.Runtime.StackTrace;
      }
      export interface FrameClearedScheduledNavigationEvent {
        readonly "frameId": FrameId;
      }
      export interface FrameDetachedEvent {
        readonly "frameId": FrameId;
        readonly "reason": "remove" | "swap";
      }
      export interface FrameSubtreeWillBeDetachedEvent {
        readonly "frameId": FrameId;
      }
      export interface FrameNavigatedEvent {
        readonly "frame": Frame;
        readonly "type": NavigationType;
      }
      export interface DocumentOpenedEvent {
        readonly "frame": Frame;
      }
      export type FrameResizedEvent = Readonly<Record<string, never>>;
      export interface FrameStartedNavigatingEvent {
        readonly "frameId": FrameId;
        readonly "url": string;
        readonly "loaderId": Protocol.Network.LoaderId;
        readonly "navigationType": "reload" | "reloadBypassingCache" | "restore" | "restoreWithPost" | "historySameDocument" | "historyDifferentDocument" | "sameDocument" | "differentDocument";
      }
      export interface FrameRequestedNavigationEvent {
        readonly "frameId": FrameId;
        readonly "reason": ClientNavigationReason;
        readonly "url": string;
        readonly "disposition": ClientNavigationDisposition;
      }
      export interface FrameScheduledNavigationEvent {
        readonly "frameId": FrameId;
        readonly "delay": number;
        readonly "reason": ClientNavigationReason;
        readonly "url": string;
      }
      export interface FrameStartedLoadingEvent {
        readonly "frameId": FrameId;
      }
      export interface FrameStoppedLoadingEvent {
        readonly "frameId": FrameId;
      }
      export interface DownloadWillBeginEvent {
        readonly "frameId": FrameId;
        readonly "guid": string;
        readonly "url": string;
        readonly "suggestedFilename": string;
      }
      export interface DownloadProgressEvent {
        readonly "guid": string;
        readonly "totalBytes": number;
        readonly "receivedBytes": number;
        readonly "state": "inProgress" | "completed" | "canceled";
      }
      export type InterstitialHiddenEvent = Readonly<Record<string, never>>;
      export type InterstitialShownEvent = Readonly<Record<string, never>>;
      export interface JavascriptDialogClosedEvent {
        readonly "frameId": FrameId;
        readonly "result": boolean;
        readonly "userInput": string;
      }
      export interface JavascriptDialogOpeningEvent {
        readonly "url": string;
        readonly "frameId": FrameId;
        readonly "message": string;
        readonly "type": DialogType;
        readonly "hasBrowserHandler": boolean;
        readonly "defaultPrompt"?: string;
      }
      export interface LifecycleEventEvent {
        readonly "frameId": FrameId;
        readonly "loaderId": Protocol.Network.LoaderId;
        readonly "name": string;
        readonly "timestamp": Protocol.Network.MonotonicTime;
      }
      export interface BackForwardCacheNotUsedEvent {
        readonly "loaderId": Protocol.Network.LoaderId;
        readonly "frameId": FrameId;
        readonly "notRestoredExplanations": ReadonlyArray<BackForwardCacheNotRestoredExplanation>;
        readonly "notRestoredExplanationsTree"?: BackForwardCacheNotRestoredExplanationTree;
      }
      export interface LoadEventFiredEvent {
        readonly "timestamp": Protocol.Network.MonotonicTime;
      }
      export interface NavigatedWithinDocumentEvent {
        readonly "frameId": FrameId;
        readonly "url": string;
        readonly "navigationType": "fragment" | "historyApi" | "other";
      }
      export interface ScreencastFrameEvent {
        readonly "data": string;
        readonly "metadata": ScreencastFrameMetadata;
        readonly "sessionId": number;
      }
      export interface ScreencastVisibilityChangedEvent {
        readonly "visible": boolean;
      }
      export interface WindowOpenEvent {
        readonly "url": string;
        readonly "windowName": string;
        readonly "windowFeatures": ReadonlyArray<string>;
        readonly "userGesture": boolean;
      }
      export interface CompilationCacheProducedEvent {
        readonly "url": string;
        readonly "data": string;
      }
    }
  }
  export namespace Performance {
    export interface Metric {
      readonly "name": string;
      readonly "value": number;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "timeDomain"?: "timeTicks" | "threadTicks";
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export interface SetTimeDomainParams {
        readonly "timeDomain": "timeTicks" | "threadTicks";
      }
      export type SetTimeDomainResult = Readonly<Record<string, never>>;
      export type GetMetricsParams = undefined;
      export interface GetMetricsResult {
        readonly "metrics": ReadonlyArray<Metric>;
      }
    }
    export namespace Events {
      export interface MetricsEvent {
        readonly "metrics": ReadonlyArray<Metric>;
        readonly "title": string;
      }
    }
  }
  export namespace PerformanceTimeline {
    export interface LargestContentfulPaint {
      readonly "renderTime": Protocol.Network.TimeSinceEpoch;
      readonly "loadTime": Protocol.Network.TimeSinceEpoch;
      readonly "size": number;
      readonly "elementId"?: string;
      readonly "url"?: string;
      readonly "nodeId"?: Protocol.DOM.BackendNodeId;
    }
    export interface LayoutShiftAttribution {
      readonly "previousRect": Protocol.DOM.Rect;
      readonly "currentRect": Protocol.DOM.Rect;
      readonly "nodeId"?: Protocol.DOM.BackendNodeId;
    }
    export interface LayoutShift {
      readonly "value": number;
      readonly "hadRecentInput": boolean;
      readonly "lastInputTime": Protocol.Network.TimeSinceEpoch;
      readonly "sources": ReadonlyArray<LayoutShiftAttribution>;
    }
    export interface TimelineEvent {
      readonly "frameId": Protocol.Page.FrameId;
      readonly "type": string;
      readonly "name": string;
      readonly "time": Protocol.Network.TimeSinceEpoch;
      readonly "duration"?: number;
      readonly "lcpDetails"?: LargestContentfulPaint;
      readonly "layoutShiftDetails"?: LayoutShift;
    }
    export namespace Commands {
      export interface EnableParams {
        readonly "eventTypes": ReadonlyArray<string>;
      }
      export type EnableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface TimelineEventAddedEvent {
        readonly "event": TimelineEvent;
      }
    }
  }
  export namespace Preload {
    export type RuleSetId = string;
    export interface RuleSet {
      readonly "id": RuleSetId;
      readonly "loaderId": Protocol.Network.LoaderId;
      readonly "sourceText": string;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "url"?: string;
      readonly "requestId"?: Protocol.Network.RequestId;
      readonly "errorType"?: RuleSetErrorType;
      readonly "errorMessage"?: string;
      readonly "tag"?: string;
    }
    export type RuleSetErrorType = "SourceIsNotJsonObject" | "InvalidRulesSkipped" | "InvalidRulesetLevelTag";
    export type SpeculationAction = "Prefetch" | "Prerender" | "PrerenderUntilScript";
    export type SpeculationTargetHint = "Blank" | "Self";
    export interface PreloadingAttemptKey {
      readonly "loaderId": Protocol.Network.LoaderId;
      readonly "action": SpeculationAction;
      readonly "url": string;
      readonly "formSubmission"?: boolean;
      readonly "targetHint"?: SpeculationTargetHint;
    }
    export interface PreloadingAttemptSource {
      readonly "key": PreloadingAttemptKey;
      readonly "ruleSetIds": ReadonlyArray<RuleSetId>;
      readonly "nodeIds": ReadonlyArray<Protocol.DOM.BackendNodeId>;
    }
    export type PreloadPipelineId = string;
    export type PrerenderFinalStatus = "Activated" | "Destroyed" | "LowEndDevice" | "InvalidSchemeRedirect" | "InvalidSchemeNavigation" | "NavigationRequestBlockedByCsp" | "MojoBinderPolicy" | "RendererProcessCrashed" | "RendererProcessKilled" | "Download" | "TriggerDestroyed" | "NavigationNotCommitted" | "NavigationBadHttpStatus" | "ClientCertRequested" | "NavigationRequestNetworkError" | "CancelAllHostsForTesting" | "DidFailLoad" | "Stop" | "SslCertificateError" | "LoginAuthRequested" | "UaChangeRequiresReload" | "BlockedByClient" | "AudioOutputDeviceRequested" | "MixedContent" | "TriggerBackgrounded" | "MemoryLimitExceeded" | "DataSaverEnabled" | "TriggerUrlHasEffectiveUrl" | "ActivatedBeforeStarted" | "InactivePageRestriction" | "StartFailed" | "TimeoutBackgrounded" | "CrossSiteRedirectInInitialNavigation" | "CrossSiteNavigationInInitialNavigation" | "SameSiteCrossOriginRedirectNotOptInInInitialNavigation" | "SameSiteCrossOriginNavigationNotOptInInInitialNavigation" | "ActivationNavigationParameterMismatch" | "ActivatedInBackground" | "EmbedderHostDisallowed" | "ActivationNavigationDestroyedBeforeSuccess" | "TabClosedByUserGesture" | "TabClosedWithoutUserGesture" | "PrimaryMainFrameRendererProcessCrashed" | "PrimaryMainFrameRendererProcessKilled" | "ActivationFramePolicyNotCompatible" | "PreloadingDisabled" | "BatterySaverEnabled" | "ActivatedDuringMainFrameNavigation" | "PreloadingUnsupportedByWebContents" | "CrossSiteRedirectInMainFrameNavigation" | "CrossSiteNavigationInMainFrameNavigation" | "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation" | "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation" | "MemoryPressureOnTrigger" | "MemoryPressureAfterTriggered" | "PrerenderingDisabledByDevTools" | "SpeculationRuleRemoved" | "ActivatedWithAuxiliaryBrowsingContexts" | "MaxNumOfRunningEagerPrerendersExceeded" | "MaxNumOfRunningNonEagerPrerendersExceeded" | "MaxNumOfRunningEmbedderPrerendersExceeded" | "PrerenderingUrlHasEffectiveUrl" | "RedirectedPrerenderingUrlHasEffectiveUrl" | "ActivationUrlHasEffectiveUrl" | "JavaScriptInterfaceAdded" | "JavaScriptInterfaceRemoved" | "AllPrerenderingCanceled" | "WindowClosed" | "SlowNetwork" | "OtherPrerenderedPageActivated" | "V8OptimizerDisabled" | "PrerenderFailedDuringPrefetch" | "BrowsingDataRemoved" | "PrerenderHostReused" | "FormSubmitWhenPrerendering" | "CrossDocumentRestart";
    export type PreloadingStatus = "Pending" | "Running" | "Ready" | "Success" | "Failure" | "NotSupported";
    export type PrefetchStatus = "PrefetchAllowed" | "PrefetchFailedIneligibleRedirect" | "PrefetchFailedInvalidRedirect" | "PrefetchFailedMIMENotSupported" | "PrefetchFailedNetError" | "PrefetchFailedNon2XX" | "PrefetchEvictedAfterBrowsingDataRemoved" | "PrefetchEvictedAfterCandidateRemoved" | "PrefetchEvictedForNewerPrefetch" | "PrefetchHeldback" | "PrefetchIneligibleRetryAfter" | "PrefetchIsPrivacyDecoy" | "PrefetchIsStale" | "PrefetchNotEligibleBlockedByConnectionAllowlist" | "PrefetchNotEligibleBrowserContextOffTheRecord" | "PrefetchNotEligibleDataSaverEnabled" | "PrefetchNotEligibleExistingProxy" | "PrefetchNotEligibleHostIsNonUnique" | "PrefetchNotEligibleNonDefaultStoragePartition" | "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy" | "PrefetchNotEligibleSchemeIsNotHttps" | "PrefetchNotEligibleUserHasCookies" | "PrefetchNotEligibleUserHasServiceWorker" | "PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler" | "PrefetchNotEligibleRedirectFromServiceWorker" | "PrefetchNotEligibleRedirectToServiceWorker" | "PrefetchNotEligibleBatterySaverEnabled" | "PrefetchNotEligiblePreloadingDisabled" | "PrefetchNotFinishedInTime" | "PrefetchNotStarted" | "PrefetchNotUsedCookiesChanged" | "PrefetchProxyNotAvailable" | "PrefetchResponseUsed" | "PrefetchSuccessfulButNotUsed" | "PrefetchNotUsedProbeFailed" | "PrefetchCancelledOnUserNavigation";
    export interface PrerenderMismatchedHeaders {
      readonly "headerName": string;
      readonly "initialValue"?: string;
      readonly "activationValue"?: string;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface RuleSetUpdatedEvent {
        readonly "ruleSet": RuleSet;
      }
      export interface RuleSetRemovedEvent {
        readonly "id": RuleSetId;
      }
      export interface PreloadEnabledStateUpdatedEvent {
        readonly "disabledByPreference": boolean;
        readonly "disabledByDataSaver": boolean;
        readonly "disabledByBatterySaver": boolean;
        readonly "disabledByHoldbackPrefetchSpeculationRules": boolean;
        readonly "disabledByHoldbackPrerenderSpeculationRules": boolean;
      }
      export interface PrefetchStatusUpdatedEvent {
        readonly "key": PreloadingAttemptKey;
        readonly "pipelineId": PreloadPipelineId;
        readonly "initiatingFrameId": Protocol.Page.FrameId;
        readonly "prefetchUrl": string;
        readonly "status": PreloadingStatus;
        readonly "prefetchStatus": PrefetchStatus;
        readonly "requestId": Protocol.Network.RequestId;
      }
      export interface PrerenderStatusUpdatedEvent {
        readonly "key": PreloadingAttemptKey;
        readonly "pipelineId": PreloadPipelineId;
        readonly "status": PreloadingStatus;
        readonly "prerenderStatus"?: PrerenderFinalStatus;
        readonly "disallowedMojoInterface"?: string;
        readonly "mismatchedHeaders"?: ReadonlyArray<PrerenderMismatchedHeaders>;
      }
      export interface PreloadingAttemptSourcesUpdatedEvent {
        readonly "loaderId": Protocol.Network.LoaderId;
        readonly "preloadingAttemptSources": ReadonlyArray<PreloadingAttemptSource>;
      }
    }
  }
  export namespace Security {
    export type CertificateId = number;
    export type MixedContentType = "blockable" | "optionally-blockable" | "none";
    export type SecurityState = "unknown" | "neutral" | "insecure" | "secure" | "info" | "insecure-broken";
    export interface CertificateSecurityState {
      readonly "protocol": string;
      readonly "keyExchange": string;
      readonly "keyExchangeGroup"?: string;
      readonly "cipher": string;
      readonly "mac"?: string;
      readonly "certificate": ReadonlyArray<string>;
      readonly "subjectName": string;
      readonly "issuer": string;
      readonly "validFrom": Protocol.Network.TimeSinceEpoch;
      readonly "validTo": Protocol.Network.TimeSinceEpoch;
      readonly "certificateNetworkError"?: string;
      readonly "certificateHasWeakSignature": boolean;
      readonly "certificateHasSha1Signature": boolean;
      readonly "modernSSL": boolean;
      readonly "obsoleteSslProtocol": boolean;
      readonly "obsoleteSslKeyExchange": boolean;
      readonly "obsoleteSslCipher": boolean;
      readonly "obsoleteSslSignature": boolean;
    }
    export type SafetyTipStatus = "badReputation" | "lookalike";
    export interface SafetyTipInfo {
      readonly "safetyTipStatus": SafetyTipStatus;
      readonly "safeUrl"?: string;
    }
    export interface VisibleSecurityState {
      readonly "securityState": SecurityState;
      readonly "certificateSecurityState"?: CertificateSecurityState;
      readonly "safetyTipInfo"?: SafetyTipInfo;
      readonly "securityStateIssueIds": ReadonlyArray<string>;
    }
    export interface SecurityStateExplanation {
      readonly "securityState": SecurityState;
      readonly "title": string;
      readonly "summary": string;
      readonly "description": string;
      readonly "mixedContentType": MixedContentType;
      readonly "certificate": ReadonlyArray<string>;
      readonly "recommendations"?: ReadonlyArray<string>;
    }
    export interface InsecureContentStatus {
      readonly "ranMixedContent": boolean;
      readonly "displayedMixedContent": boolean;
      readonly "containedMixedForm": boolean;
      readonly "ranContentWithCertErrors": boolean;
      readonly "displayedContentWithCertErrors": boolean;
      readonly "ranInsecureContentStyle": SecurityState;
      readonly "displayedInsecureContentStyle": SecurityState;
    }
    export type CertificateErrorAction = "continue" | "cancel";
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface SetIgnoreCertificateErrorsParams {
        readonly "ignore": boolean;
      }
      export type SetIgnoreCertificateErrorsResult = Readonly<Record<string, never>>;
      export interface HandleCertificateErrorParams {
        readonly "eventId": number;
        readonly "action": CertificateErrorAction;
      }
      export type HandleCertificateErrorResult = Readonly<Record<string, never>>;
      export interface SetOverrideCertificateErrorsParams {
        readonly "override": boolean;
      }
      export type SetOverrideCertificateErrorsResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface CertificateErrorEvent {
        readonly "eventId": number;
        readonly "errorType": string;
        readonly "requestURL": string;
      }
      export interface VisibleSecurityStateChangedEvent {
        readonly "visibleSecurityState": VisibleSecurityState;
      }
      export interface SecurityStateChangedEvent {
        readonly "securityState": SecurityState;
        readonly "schemeIsCryptographic": boolean;
        readonly "explanations": ReadonlyArray<SecurityStateExplanation>;
        readonly "insecureContentStatus": InsecureContentStatus;
        readonly "summary"?: string;
      }
    }
  }
  export namespace ServiceWorker {
    export type RegistrationID = string;
    export interface ServiceWorkerRegistration {
      readonly "registrationId": RegistrationID;
      readonly "scopeURL": string;
      readonly "isDeleted": boolean;
    }
    export type ServiceWorkerVersionRunningStatus = "stopped" | "starting" | "running" | "stopping";
    export type ServiceWorkerVersionStatus = "new" | "installing" | "installed" | "activating" | "activated" | "redundant";
    export interface ServiceWorkerVersion {
      readonly "versionId": string;
      readonly "registrationId": RegistrationID;
      readonly "scriptURL": string;
      readonly "runningStatus": ServiceWorkerVersionRunningStatus;
      readonly "status": ServiceWorkerVersionStatus;
      readonly "scriptLastModified"?: number;
      readonly "scriptResponseTime"?: number;
      readonly "controlledClients"?: ReadonlyArray<Protocol.Target.TargetID>;
      readonly "targetId"?: Protocol.Target.TargetID;
      readonly "routerRules"?: string;
    }
    export interface ServiceWorkerErrorMessage {
      readonly "errorMessage": string;
      readonly "registrationId": RegistrationID;
      readonly "versionId": string;
      readonly "sourceURL": string;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
    }
    export namespace Commands {
      export interface DeliverPushMessageParams {
        readonly "origin": string;
        readonly "registrationId": RegistrationID;
        readonly "data": string;
      }
      export type DeliverPushMessageResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface DispatchSyncEventParams {
        readonly "origin": string;
        readonly "registrationId": RegistrationID;
        readonly "tag": string;
        readonly "lastChance": boolean;
      }
      export type DispatchSyncEventResult = Readonly<Record<string, never>>;
      export interface DispatchPeriodicSyncEventParams {
        readonly "origin": string;
        readonly "registrationId": RegistrationID;
        readonly "tag": string;
      }
      export type DispatchPeriodicSyncEventResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface SetForceUpdateOnPageLoadParams {
        readonly "forceUpdateOnPageLoad": boolean;
      }
      export type SetForceUpdateOnPageLoadResult = Readonly<Record<string, never>>;
      export interface SkipWaitingParams {
        readonly "scopeURL": string;
      }
      export type SkipWaitingResult = Readonly<Record<string, never>>;
      export interface StartWorkerParams {
        readonly "scopeURL": string;
      }
      export type StartWorkerResult = Readonly<Record<string, never>>;
      export type StopAllWorkersParams = undefined;
      export type StopAllWorkersResult = Readonly<Record<string, never>>;
      export interface StopWorkerParams {
        readonly "versionId": string;
      }
      export type StopWorkerResult = Readonly<Record<string, never>>;
      export interface UnregisterParams {
        readonly "scopeURL": string;
      }
      export type UnregisterResult = Readonly<Record<string, never>>;
      export interface UpdateRegistrationParams {
        readonly "scopeURL": string;
      }
      export type UpdateRegistrationResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface WorkerErrorReportedEvent {
        readonly "errorMessage": ServiceWorkerErrorMessage;
      }
      export interface WorkerRegistrationUpdatedEvent {
        readonly "registrations": ReadonlyArray<ServiceWorkerRegistration>;
      }
      export interface WorkerVersionUpdatedEvent {
        readonly "versions": ReadonlyArray<ServiceWorkerVersion>;
      }
    }
  }
  export namespace SmartCardEmulation {
    export type ResultCode = "success" | "removed-card" | "reset-card" | "unpowered-card" | "unresponsive-card" | "unsupported-card" | "reader-unavailable" | "sharing-violation" | "not-transacted" | "no-smartcard" | "proto-mismatch" | "system-cancelled" | "not-ready" | "cancelled" | "insufficient-buffer" | "invalid-handle" | "invalid-parameter" | "invalid-value" | "no-memory" | "timeout" | "unknown-reader" | "unsupported-feature" | "no-readers-available" | "service-stopped" | "no-service" | "comm-error" | "internal-error" | "server-too-busy" | "unexpected" | "shutdown" | "unknown-card" | "unknown";
    export type ShareMode = "shared" | "exclusive" | "direct";
    export type Disposition = "leave-card" | "reset-card" | "unpower-card" | "eject-card";
    export type ConnectionState = "absent" | "present" | "swallowed" | "powered" | "negotiable" | "specific";
    export interface ReaderStateFlags {
      readonly "unaware"?: boolean;
      readonly "ignore"?: boolean;
      readonly "changed"?: boolean;
      readonly "unknown"?: boolean;
      readonly "unavailable"?: boolean;
      readonly "empty"?: boolean;
      readonly "present"?: boolean;
      readonly "exclusive"?: boolean;
      readonly "inuse"?: boolean;
      readonly "mute"?: boolean;
      readonly "unpowered"?: boolean;
    }
    export interface ProtocolSet {
      readonly "t0"?: boolean;
      readonly "t1"?: boolean;
      readonly "raw"?: boolean;
    }
    export type Protocol = "t0" | "t1" | "raw";
    export interface ReaderStateIn {
      readonly "reader": string;
      readonly "currentState": ReaderStateFlags;
      readonly "currentInsertionCount": number;
    }
    export interface ReaderStateOut {
      readonly "reader": string;
      readonly "eventState": ReaderStateFlags;
      readonly "eventCount": number;
      readonly "atr": string;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface ReportEstablishContextResultParams {
        readonly "requestId": string;
        readonly "contextId": number;
      }
      export type ReportEstablishContextResultResult = Readonly<Record<string, never>>;
      export interface ReportReleaseContextResultParams {
        readonly "requestId": string;
      }
      export type ReportReleaseContextResultResult = Readonly<Record<string, never>>;
      export interface ReportListReadersResultParams {
        readonly "requestId": string;
        readonly "readers": ReadonlyArray<string>;
      }
      export type ReportListReadersResultResult = Readonly<Record<string, never>>;
      export interface ReportGetStatusChangeResultParams {
        readonly "requestId": string;
        readonly "readerStates": ReadonlyArray<ReaderStateOut>;
      }
      export type ReportGetStatusChangeResultResult = Readonly<Record<string, never>>;
      export interface ReportBeginTransactionResultParams {
        readonly "requestId": string;
        readonly "handle": number;
      }
      export type ReportBeginTransactionResultResult = Readonly<Record<string, never>>;
      export interface ReportPlainResultParams {
        readonly "requestId": string;
      }
      export type ReportPlainResultResult = Readonly<Record<string, never>>;
      export interface ReportConnectResultParams {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "activeProtocol"?: Protocol;
      }
      export type ReportConnectResultResult = Readonly<Record<string, never>>;
      export interface ReportDataResultParams {
        readonly "requestId": string;
        readonly "data": string;
      }
      export type ReportDataResultResult = Readonly<Record<string, never>>;
      export interface ReportStatusResultParams {
        readonly "requestId": string;
        readonly "readerName": string;
        readonly "state": ConnectionState;
        readonly "atr": string;
        readonly "protocol"?: Protocol;
      }
      export type ReportStatusResultResult = Readonly<Record<string, never>>;
      export interface ReportErrorParams {
        readonly "requestId": string;
        readonly "resultCode": ResultCode;
      }
      export type ReportErrorResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface EstablishContextRequestedEvent {
        readonly "requestId": string;
      }
      export interface ReleaseContextRequestedEvent {
        readonly "requestId": string;
        readonly "contextId": number;
      }
      export interface ListReadersRequestedEvent {
        readonly "requestId": string;
        readonly "contextId": number;
      }
      export interface GetStatusChangeRequestedEvent {
        readonly "requestId": string;
        readonly "contextId": number;
        readonly "readerStates": ReadonlyArray<ReaderStateIn>;
        readonly "timeout"?: number;
      }
      export interface CancelRequestedEvent {
        readonly "requestId": string;
        readonly "contextId": number;
      }
      export interface ConnectRequestedEvent {
        readonly "requestId": string;
        readonly "contextId": number;
        readonly "reader": string;
        readonly "shareMode": ShareMode;
        readonly "preferredProtocols": ProtocolSet;
      }
      export interface DisconnectRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "disposition": Disposition;
      }
      export interface TransmitRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "data": string;
        readonly "protocol"?: Protocol;
      }
      export interface ControlRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "controlCode": number;
        readonly "data": string;
      }
      export interface GetAttribRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "attribId": number;
      }
      export interface SetAttribRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "attribId": number;
        readonly "data": string;
      }
      export interface StatusRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
      }
      export interface BeginTransactionRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
      }
      export interface EndTransactionRequestedEvent {
        readonly "requestId": string;
        readonly "handle": number;
        readonly "disposition": Disposition;
      }
    }
  }
  export namespace Storage {
    export type SerializedStorageKey = string;
    export type StorageType = "cookies" | "file_systems" | "indexeddb" | "local_storage" | "shader_cache" | "websql" | "service_workers" | "cache_storage" | "shared_storage" | "storage_buckets" | "all" | "other";
    export interface UsageForType {
      readonly "storageType": StorageType;
      readonly "usage": number;
    }
    export interface TrustTokens {
      readonly "issuerOrigin": string;
      readonly "count": number;
    }
    export type SharedStorageAccessScope = "window" | "sharedStorageWorklet" | "header";
    export type SharedStorageAccessMethod = "addModule" | "createWorklet" | "selectURL" | "run" | "batchUpdate" | "set" | "append" | "delete" | "clear" | "get" | "keys" | "values" | "entries" | "length" | "remainingBudget";
    export interface SharedStorageEntry {
      readonly "key": string;
      readonly "value": string;
    }
    export interface SharedStorageMetadata {
      readonly "creationTime": Protocol.Network.TimeSinceEpoch;
      readonly "length": number;
      readonly "remainingBudget": number;
      readonly "bytesUsed": number;
    }
    export interface SharedStoragePrivateAggregationConfig {
      readonly "aggregationCoordinatorOrigin"?: string;
      readonly "contextId"?: string;
      readonly "filteringIdMaxBytes": number;
      readonly "maxContributions"?: number;
    }
    export interface SharedStorageReportingMetadata {
      readonly "eventType": string;
      readonly "reportingUrl": string;
    }
    export interface SharedStorageUrlWithMetadata {
      readonly "url": string;
      readonly "reportingMetadata": ReadonlyArray<SharedStorageReportingMetadata>;
    }
    export interface SharedStorageAccessParams {
      readonly "scriptSourceUrl"?: string;
      readonly "dataOrigin"?: string;
      readonly "operationName"?: string;
      readonly "operationId"?: string;
      readonly "keepAlive"?: boolean;
      readonly "privateAggregationConfig"?: SharedStoragePrivateAggregationConfig;
      readonly "serializedData"?: string;
      readonly "urlsWithMetadata"?: ReadonlyArray<SharedStorageUrlWithMetadata>;
      readonly "urnUuid"?: string;
      readonly "key"?: string;
      readonly "value"?: string;
      readonly "ignoreIfPresent"?: boolean;
      readonly "workletOrdinal"?: number;
      readonly "workletTargetId"?: Protocol.Target.TargetID;
      readonly "withLock"?: string;
      readonly "batchUpdateId"?: string;
      readonly "batchSize"?: number;
    }
    export type StorageBucketsDurability = "relaxed" | "strict";
    export interface StorageBucket {
      readonly "storageKey": SerializedStorageKey;
      readonly "name"?: string;
    }
    export interface StorageBucketInfo {
      readonly "bucket": StorageBucket;
      readonly "id": string;
      readonly "expiration": Protocol.Network.TimeSinceEpoch;
      readonly "quota": number;
      readonly "persistent": boolean;
      readonly "durability": StorageBucketsDurability;
    }
    export interface RelatedWebsiteSet {
      readonly "primarySites": ReadonlyArray<string>;
      readonly "associatedSites": ReadonlyArray<string>;
      readonly "serviceSites": ReadonlyArray<string>;
    }
    export namespace Commands {
      export interface GetStorageKeyForFrameParams {
        readonly "frameId": Protocol.Page.FrameId;
      }
      export interface GetStorageKeyForFrameResult {
        readonly "storageKey": SerializedStorageKey;
      }
      export interface GetStorageKeyParams {
        readonly "frameId"?: Protocol.Page.FrameId;
      }
      export interface GetStorageKeyResult {
        readonly "storageKey": SerializedStorageKey;
      }
      export interface ClearDataForOriginParams {
        readonly "origin": string;
        readonly "storageTypes": string;
      }
      export type ClearDataForOriginResult = Readonly<Record<string, never>>;
      export interface ClearDataForStorageKeyParams {
        readonly "storageKey": string;
        readonly "storageTypes": string;
      }
      export type ClearDataForStorageKeyResult = Readonly<Record<string, never>>;
      export interface GetCookiesParams {
        readonly "browserContextId"?: Protocol.Browser.BrowserContextID;
      }
      export interface GetCookiesResult {
        readonly "cookies": ReadonlyArray<Protocol.Network.Cookie>;
      }
      export interface SetCookiesParams {
        readonly "cookies": ReadonlyArray<Protocol.Network.CookieParam>;
        readonly "browserContextId"?: Protocol.Browser.BrowserContextID;
      }
      export type SetCookiesResult = Readonly<Record<string, never>>;
      export interface ClearCookiesParams {
        readonly "browserContextId"?: Protocol.Browser.BrowserContextID;
      }
      export type ClearCookiesResult = Readonly<Record<string, never>>;
      export interface GetUsageAndQuotaParams {
        readonly "origin": string;
      }
      export interface GetUsageAndQuotaResult {
        readonly "usage": number;
        readonly "quota": number;
        readonly "overrideActive": boolean;
        readonly "usageBreakdown": ReadonlyArray<UsageForType>;
      }
      export interface OverrideQuotaForOriginParams {
        readonly "origin": string;
        readonly "quotaSize"?: number;
      }
      export type OverrideQuotaForOriginResult = Readonly<Record<string, never>>;
      export interface TrackCacheStorageForOriginParams {
        readonly "origin": string;
      }
      export type TrackCacheStorageForOriginResult = Readonly<Record<string, never>>;
      export interface TrackCacheStorageForStorageKeyParams {
        readonly "storageKey": string;
      }
      export type TrackCacheStorageForStorageKeyResult = Readonly<Record<string, never>>;
      export interface TrackIndexedDBForOriginParams {
        readonly "origin": string;
      }
      export type TrackIndexedDBForOriginResult = Readonly<Record<string, never>>;
      export interface TrackIndexedDBForStorageKeyParams {
        readonly "storageKey": string;
      }
      export type TrackIndexedDBForStorageKeyResult = Readonly<Record<string, never>>;
      export interface UntrackCacheStorageForOriginParams {
        readonly "origin": string;
      }
      export type UntrackCacheStorageForOriginResult = Readonly<Record<string, never>>;
      export interface UntrackCacheStorageForStorageKeyParams {
        readonly "storageKey": string;
      }
      export type UntrackCacheStorageForStorageKeyResult = Readonly<Record<string, never>>;
      export interface UntrackIndexedDBForOriginParams {
        readonly "origin": string;
      }
      export type UntrackIndexedDBForOriginResult = Readonly<Record<string, never>>;
      export interface UntrackIndexedDBForStorageKeyParams {
        readonly "storageKey": string;
      }
      export type UntrackIndexedDBForStorageKeyResult = Readonly<Record<string, never>>;
      export type GetTrustTokensParams = undefined;
      export interface GetTrustTokensResult {
        readonly "tokens": ReadonlyArray<TrustTokens>;
      }
      export interface ClearTrustTokensParams {
        readonly "issuerOrigin": string;
      }
      export interface ClearTrustTokensResult {
        readonly "didDeleteTokens": boolean;
      }
      export interface GetSharedStorageMetadataParams {
        readonly "ownerOrigin": string;
      }
      export interface GetSharedStorageMetadataResult {
        readonly "metadata": SharedStorageMetadata;
      }
      export interface GetSharedStorageEntriesParams {
        readonly "ownerOrigin": string;
      }
      export interface GetSharedStorageEntriesResult {
        readonly "entries": ReadonlyArray<SharedStorageEntry>;
      }
      export interface SetSharedStorageEntryParams {
        readonly "ownerOrigin": string;
        readonly "key": string;
        readonly "value": string;
        readonly "ignoreIfPresent"?: boolean;
      }
      export type SetSharedStorageEntryResult = Readonly<Record<string, never>>;
      export interface DeleteSharedStorageEntryParams {
        readonly "ownerOrigin": string;
        readonly "key": string;
      }
      export type DeleteSharedStorageEntryResult = Readonly<Record<string, never>>;
      export interface ClearSharedStorageEntriesParams {
        readonly "ownerOrigin": string;
      }
      export type ClearSharedStorageEntriesResult = Readonly<Record<string, never>>;
      export interface ResetSharedStorageBudgetParams {
        readonly "ownerOrigin": string;
      }
      export type ResetSharedStorageBudgetResult = Readonly<Record<string, never>>;
      export interface SetSharedStorageTrackingParams {
        readonly "enable": boolean;
      }
      export type SetSharedStorageTrackingResult = Readonly<Record<string, never>>;
      export interface SetStorageBucketTrackingParams {
        readonly "storageKey": string;
        readonly "enable": boolean;
      }
      export type SetStorageBucketTrackingResult = Readonly<Record<string, never>>;
      export interface DeleteStorageBucketParams {
        readonly "bucket": StorageBucket;
      }
      export type DeleteStorageBucketResult = Readonly<Record<string, never>>;
      export type RunBounceTrackingMitigationsParams = undefined;
      export interface RunBounceTrackingMitigationsResult {
        readonly "deletedSites": ReadonlyArray<string>;
      }
      export type GetRelatedWebsiteSetsParams = undefined;
      export interface GetRelatedWebsiteSetsResult {
        readonly "sets": ReadonlyArray<RelatedWebsiteSet>;
      }
    }
    export namespace Events {
      export interface CacheStorageContentUpdatedEvent {
        readonly "origin": string;
        readonly "storageKey": string;
        readonly "bucketId": string;
        readonly "cacheName": string;
      }
      export interface CacheStorageListUpdatedEvent {
        readonly "origin": string;
        readonly "storageKey": string;
        readonly "bucketId": string;
      }
      export interface IndexedDBContentUpdatedEvent {
        readonly "origin": string;
        readonly "storageKey": string;
        readonly "bucketId": string;
        readonly "databaseName": string;
        readonly "objectStoreName": string;
      }
      export interface IndexedDBListUpdatedEvent {
        readonly "origin": string;
        readonly "storageKey": string;
        readonly "bucketId": string;
      }
      export interface SharedStorageAccessedEvent {
        readonly "accessTime": Protocol.Network.TimeSinceEpoch;
        readonly "scope": SharedStorageAccessScope;
        readonly "method": SharedStorageAccessMethod;
        readonly "mainFrameId": Protocol.Page.FrameId;
        readonly "ownerOrigin": string;
        readonly "ownerSite": string;
        readonly "params": SharedStorageAccessParams;
      }
      export interface SharedStorageWorkletOperationExecutionFinishedEvent {
        readonly "finishedTime": Protocol.Network.TimeSinceEpoch;
        readonly "executionTime": number;
        readonly "method": SharedStorageAccessMethod;
        readonly "operationId": string;
        readonly "workletTargetId": Protocol.Target.TargetID;
        readonly "mainFrameId": Protocol.Page.FrameId;
        readonly "ownerOrigin": string;
      }
      export interface StorageBucketCreatedOrUpdatedEvent {
        readonly "bucketInfo": StorageBucketInfo;
      }
      export interface StorageBucketDeletedEvent {
        readonly "bucketId": string;
      }
    }
  }
  export namespace SystemInfo {
    export interface GPUDevice {
      readonly "vendorId": number;
      readonly "deviceId": number;
      readonly "subSysId"?: number;
      readonly "revision"?: number;
      readonly "vendorString": string;
      readonly "deviceString": string;
      readonly "driverVendor": string;
      readonly "driverVersion": string;
    }
    export interface Size {
      readonly "width": number;
      readonly "height": number;
    }
    export interface VideoDecodeAcceleratorCapability {
      readonly "profile": string;
      readonly "maxResolution": Size;
      readonly "minResolution": Size;
    }
    export interface VideoEncodeAcceleratorCapability {
      readonly "profile": string;
      readonly "maxResolution": Size;
      readonly "maxFramerateNumerator": number;
      readonly "maxFramerateDenominator": number;
    }
    export type SubsamplingFormat = "yuv420" | "yuv422" | "yuv444";
    export type ImageType = "jpeg" | "webp" | "unknown";
    export interface GPUInfo {
      readonly "devices": ReadonlyArray<GPUDevice>;
      readonly "auxAttributes"?: Readonly<Record<string, unknown>>;
      readonly "featureStatus"?: Readonly<Record<string, unknown>>;
      readonly "driverBugWorkarounds": ReadonlyArray<string>;
      readonly "videoDecoding": ReadonlyArray<VideoDecodeAcceleratorCapability>;
      readonly "videoEncoding": ReadonlyArray<VideoEncodeAcceleratorCapability>;
    }
    export interface ProcessInfo {
      readonly "type": string;
      readonly "id": number;
      readonly "cpuTime": number;
    }
    export namespace Commands {
      export type GetInfoParams = undefined;
      export interface GetInfoResult {
        readonly "gpu": GPUInfo;
        readonly "modelName": string;
        readonly "modelVersion": string;
        readonly "commandLine": string;
      }
      export interface GetFeatureStateParams {
        readonly "featureState": string;
      }
      export interface GetFeatureStateResult {
        readonly "featureEnabled": boolean;
      }
      export type GetProcessInfoParams = undefined;
      export interface GetProcessInfoResult {
        readonly "processInfo": ReadonlyArray<ProcessInfo>;
      }
    }
    export namespace Events {
    }
  }
  export namespace Target {
    export type TargetID = string;
    export type SessionID = string;
    export interface TargetInfo {
      readonly "targetId": TargetID;
      readonly "type": string;
      readonly "title": string;
      readonly "url": string;
      readonly "attached": boolean;
      readonly "parentId"?: TargetID;
      readonly "openerId"?: TargetID;
      readonly "canAccessOpener": boolean;
      readonly "openerFrameId"?: Protocol.Page.FrameId;
      readonly "parentFrameId"?: Protocol.Page.FrameId;
      readonly "browserContextId"?: Protocol.Browser.BrowserContextID;
      readonly "subtype"?: string;
      readonly "embedderData"?: Readonly<Record<string, unknown>>;
    }
    export interface FilterEntry {
      readonly "exclude"?: boolean;
      readonly "type"?: string;
    }
    export type TargetFilter = ReadonlyArray<FilterEntry>;
    export interface RemoteLocation {
      readonly "host": string;
      readonly "port": number;
    }
    export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen";
    export namespace Commands {
      export interface ActivateTargetParams {
        readonly "targetId": TargetID;
      }
      export type ActivateTargetResult = Readonly<Record<string, never>>;
      export interface AttachToTargetParams {
        readonly "targetId": TargetID;
        readonly "flatten"?: boolean;
      }
      export interface AttachToTargetResult {
        readonly "sessionId": SessionID;
      }
      export type AttachToBrowserTargetParams = undefined;
      export interface AttachToBrowserTargetResult {
        readonly "sessionId": SessionID;
      }
      export interface CloseTargetParams {
        readonly "targetId": TargetID;
      }
      export interface CloseTargetResult {
        readonly "success": boolean;
      }
      export interface ExposeDevToolsProtocolParams {
        readonly "targetId": TargetID;
        readonly "bindingName"?: string;
        readonly "inheritPermissions"?: boolean;
      }
      export type ExposeDevToolsProtocolResult = Readonly<Record<string, never>>;
      export interface CreateBrowserContextParams {
        readonly "disposeOnDetach"?: boolean;
        readonly "proxyServer"?: string;
        readonly "proxyBypassList"?: string;
        readonly "originsWithUniversalNetworkAccess"?: ReadonlyArray<string>;
      }
      export interface CreateBrowserContextResult {
        readonly "browserContextId": Protocol.Browser.BrowserContextID;
      }
      export type GetBrowserContextsParams = undefined;
      export interface GetBrowserContextsResult {
        readonly "browserContextIds": ReadonlyArray<Protocol.Browser.BrowserContextID>;
        readonly "defaultBrowserContextId"?: Protocol.Browser.BrowserContextID;
      }
      export interface CreateTargetParams {
        readonly "url": string;
        readonly "left"?: number;
        readonly "top"?: number;
        readonly "width"?: number;
        readonly "height"?: number;
        readonly "windowState"?: WindowState;
        readonly "browserContextId"?: Protocol.Browser.BrowserContextID;
        readonly "enableBeginFrameControl"?: boolean;
        readonly "newWindow"?: boolean;
        readonly "background"?: boolean;
        readonly "forTab"?: boolean;
        readonly "hidden"?: boolean;
        readonly "focus"?: boolean;
      }
      export interface CreateTargetResult {
        readonly "targetId": TargetID;
      }
      export interface DetachFromTargetParams {
        readonly "sessionId"?: SessionID;
        readonly "targetId"?: TargetID;
      }
      export type DetachFromTargetResult = Readonly<Record<string, never>>;
      export interface DisposeBrowserContextParams {
        readonly "browserContextId": Protocol.Browser.BrowserContextID;
      }
      export type DisposeBrowserContextResult = Readonly<Record<string, never>>;
      export interface GetTargetInfoParams {
        readonly "targetId"?: TargetID;
      }
      export interface GetTargetInfoResult {
        readonly "targetInfo": TargetInfo;
      }
      export interface GetTargetsParams {
        readonly "filter"?: TargetFilter;
      }
      export interface GetTargetsResult {
        readonly "targetInfos": ReadonlyArray<TargetInfo>;
      }
      export interface SendMessageToTargetParams {
        readonly "message": string;
        readonly "sessionId"?: SessionID;
        readonly "targetId"?: TargetID;
      }
      export type SendMessageToTargetResult = Readonly<Record<string, never>>;
      export interface SetAutoAttachParams {
        readonly "autoAttach": boolean;
        readonly "waitForDebuggerOnStart": boolean;
        readonly "flatten"?: boolean;
        readonly "filter"?: TargetFilter;
      }
      export type SetAutoAttachResult = Readonly<Record<string, never>>;
      export interface AutoAttachRelatedParams {
        readonly "targetId": TargetID;
        readonly "waitForDebuggerOnStart": boolean;
        readonly "filter"?: TargetFilter;
      }
      export type AutoAttachRelatedResult = Readonly<Record<string, never>>;
      export interface SetDiscoverTargetsParams {
        readonly "discover": boolean;
        readonly "filter"?: TargetFilter;
      }
      export type SetDiscoverTargetsResult = Readonly<Record<string, never>>;
      export interface SetRemoteLocationsParams {
        readonly "locations": ReadonlyArray<RemoteLocation>;
      }
      export type SetRemoteLocationsResult = Readonly<Record<string, never>>;
      export interface GetDevToolsTargetParams {
        readonly "targetId": TargetID;
      }
      export interface GetDevToolsTargetResult {
        readonly "targetId"?: TargetID;
      }
      export interface OpenDevToolsParams {
        readonly "targetId": TargetID;
        readonly "panelId"?: string;
      }
      export interface OpenDevToolsResult {
        readonly "targetId": TargetID;
      }
    }
    export namespace Events {
      export interface AttachedToTargetEvent {
        readonly "sessionId": SessionID;
        readonly "targetInfo": TargetInfo;
        readonly "waitingForDebugger": boolean;
      }
      export interface DetachedFromTargetEvent {
        readonly "sessionId": SessionID;
        readonly "targetId"?: TargetID;
      }
      export interface ReceivedMessageFromTargetEvent {
        readonly "sessionId": SessionID;
        readonly "message": string;
        readonly "targetId"?: TargetID;
      }
      export interface TargetCreatedEvent {
        readonly "targetInfo": TargetInfo;
      }
      export interface TargetDestroyedEvent {
        readonly "targetId": TargetID;
      }
      export interface TargetCrashedEvent {
        readonly "targetId": TargetID;
        readonly "status": string;
        readonly "errorCode": number;
      }
      export interface TargetInfoChangedEvent {
        readonly "targetInfo": TargetInfo;
      }
    }
  }
  export namespace Tethering {
    export namespace Commands {
      export interface BindParams {
        readonly "port": number;
      }
      export type BindResult = Readonly<Record<string, never>>;
      export interface UnbindParams {
        readonly "port": number;
      }
      export type UnbindResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface AcceptedEvent {
        readonly "port": number;
        readonly "connectionId": string;
      }
    }
  }
  export namespace Tracing {
    export type MemoryDumpConfig = Readonly<Record<string, unknown>>;
    export interface TraceConfig {
      readonly "recordMode"?: "recordUntilFull" | "recordContinuously" | "recordAsMuchAsPossible" | "echoToConsole";
      readonly "traceBufferSizeInKb"?: number;
      readonly "enableSampling"?: boolean;
      readonly "enableSystrace"?: boolean;
      readonly "enableArgumentFilter"?: boolean;
      readonly "includedCategories"?: ReadonlyArray<string>;
      readonly "excludedCategories"?: ReadonlyArray<string>;
      readonly "syntheticDelays"?: ReadonlyArray<string>;
      readonly "memoryDumpConfig"?: MemoryDumpConfig;
    }
    export type StreamFormat = "json" | "proto";
    export type StreamCompression = "none" | "gzip";
    export type MemoryDumpLevelOfDetail = "background" | "light" | "detailed";
    export type TracingBackend = "auto" | "chrome" | "system";
    export namespace Commands {
      export type EndParams = undefined;
      export type EndResult = Readonly<Record<string, never>>;
      export type GetCategoriesParams = undefined;
      export interface GetCategoriesResult {
        readonly "categories": ReadonlyArray<string>;
      }
      export type GetTrackEventDescriptorParams = undefined;
      export interface GetTrackEventDescriptorResult {
        readonly "descriptor": string;
      }
      export interface RecordClockSyncMarkerParams {
        readonly "syncId": string;
      }
      export type RecordClockSyncMarkerResult = Readonly<Record<string, never>>;
      export interface RequestMemoryDumpParams {
        readonly "deterministic"?: boolean;
        readonly "levelOfDetail"?: MemoryDumpLevelOfDetail;
      }
      export interface RequestMemoryDumpResult {
        readonly "dumpGuid": string;
        readonly "success": boolean;
      }
      export interface StartParams {
        readonly "categories"?: string;
        readonly "options"?: string;
        readonly "bufferUsageReportingInterval"?: number;
        readonly "transferMode"?: "ReportEvents" | "ReturnAsStream";
        readonly "streamFormat"?: StreamFormat;
        readonly "streamCompression"?: StreamCompression;
        readonly "traceConfig"?: TraceConfig;
        readonly "perfettoConfig"?: string;
        readonly "tracingBackend"?: TracingBackend;
        readonly "screenshotMaxSize"?: number;
        readonly "screenshotMaxCount"?: number;
      }
      export type StartResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface BufferUsageEvent {
        readonly "percentFull"?: number;
        readonly "eventCount"?: number;
        readonly "value"?: number;
      }
      export interface DataCollectedEvent {
        readonly "value": ReadonlyArray<Readonly<Record<string, unknown>>>;
      }
      export interface TracingCompleteEvent {
        readonly "dataLossOccurred": boolean;
        readonly "stream"?: Protocol.IO.StreamHandle;
        readonly "traceFormat"?: StreamFormat;
        readonly "streamCompression"?: StreamCompression;
      }
    }
  }
  export namespace WebAudio {
    export type GraphObjectId = string;
    export type ContextType = "realtime" | "offline";
    export type ContextState = "suspended" | "running" | "closed" | "interrupted";
    export type NodeType = string;
    export type ChannelCountMode = "clamped-max" | "explicit" | "max";
    export type ChannelInterpretation = "discrete" | "speakers";
    export type ParamType = string;
    export type AutomationRate = "a-rate" | "k-rate";
    export interface ContextRealtimeData {
      readonly "currentTime": number;
      readonly "renderCapacity": number;
      readonly "callbackIntervalMean": number;
      readonly "callbackIntervalVariance": number;
    }
    export interface BaseAudioContext {
      readonly "contextId": GraphObjectId;
      readonly "contextType": ContextType;
      readonly "contextState": ContextState;
      readonly "realtimeData"?: ContextRealtimeData;
      readonly "callbackBufferSize": number;
      readonly "maxOutputChannelCount": number;
      readonly "sampleRate": number;
    }
    export interface AudioListener {
      readonly "listenerId": GraphObjectId;
      readonly "contextId": GraphObjectId;
    }
    export interface AudioNode {
      readonly "nodeId": GraphObjectId;
      readonly "contextId": GraphObjectId;
      readonly "nodeType": NodeType;
      readonly "numberOfInputs": number;
      readonly "numberOfOutputs": number;
      readonly "channelCount": number;
      readonly "channelCountMode": ChannelCountMode;
      readonly "channelInterpretation": ChannelInterpretation;
    }
    export interface AudioParam {
      readonly "paramId": GraphObjectId;
      readonly "nodeId": GraphObjectId;
      readonly "contextId": GraphObjectId;
      readonly "paramType": ParamType;
      readonly "rate": AutomationRate;
      readonly "defaultValue": number;
      readonly "minValue": number;
      readonly "maxValue": number;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface GetRealtimeDataParams {
        readonly "contextId": GraphObjectId;
      }
      export interface GetRealtimeDataResult {
        readonly "realtimeData": ContextRealtimeData;
      }
    }
    export namespace Events {
      export interface ContextCreatedEvent {
        readonly "context": BaseAudioContext;
      }
      export interface ContextWillBeDestroyedEvent {
        readonly "contextId": GraphObjectId;
      }
      export interface ContextChangedEvent {
        readonly "context": BaseAudioContext;
      }
      export interface AudioListenerCreatedEvent {
        readonly "listener": AudioListener;
      }
      export interface AudioListenerWillBeDestroyedEvent {
        readonly "contextId": GraphObjectId;
        readonly "listenerId": GraphObjectId;
      }
      export interface AudioNodeCreatedEvent {
        readonly "node": AudioNode;
      }
      export interface AudioNodeWillBeDestroyedEvent {
        readonly "contextId": GraphObjectId;
        readonly "nodeId": GraphObjectId;
      }
      export interface AudioParamCreatedEvent {
        readonly "param": AudioParam;
      }
      export interface AudioParamWillBeDestroyedEvent {
        readonly "contextId": GraphObjectId;
        readonly "nodeId": GraphObjectId;
        readonly "paramId": GraphObjectId;
      }
      export interface NodesConnectedEvent {
        readonly "contextId": GraphObjectId;
        readonly "sourceId": GraphObjectId;
        readonly "destinationId": GraphObjectId;
        readonly "sourceOutputIndex"?: number;
        readonly "destinationInputIndex"?: number;
      }
      export interface NodesDisconnectedEvent {
        readonly "contextId": GraphObjectId;
        readonly "sourceId": GraphObjectId;
        readonly "destinationId": GraphObjectId;
        readonly "sourceOutputIndex"?: number;
        readonly "destinationInputIndex"?: number;
      }
      export interface NodeParamConnectedEvent {
        readonly "contextId": GraphObjectId;
        readonly "sourceId": GraphObjectId;
        readonly "destinationId": GraphObjectId;
        readonly "sourceOutputIndex"?: number;
      }
      export interface NodeParamDisconnectedEvent {
        readonly "contextId": GraphObjectId;
        readonly "sourceId": GraphObjectId;
        readonly "destinationId": GraphObjectId;
        readonly "sourceOutputIndex"?: number;
      }
    }
  }
  export namespace WebAuthn {
    export type AuthenticatorId = string;
    export type AuthenticatorProtocol = "u2f" | "ctap2";
    export type Ctap2Version = "ctap2_0" | "ctap2_1" | "ctap2_2";
    export type AuthenticatorTransport = "usb" | "nfc" | "ble" | "cable" | "hybrid" | "smart-card" | "internal";
    export interface VirtualAuthenticatorOptions {
      readonly "protocol": AuthenticatorProtocol;
      readonly "ctap2Version"?: Ctap2Version;
      readonly "transport": AuthenticatorTransport;
      readonly "hasResidentKey"?: boolean;
      readonly "hasUserVerification"?: boolean;
      readonly "hasLargeBlob"?: boolean;
      readonly "hasCredBlob"?: boolean;
      readonly "hasMinPinLength"?: boolean;
      readonly "hasPrf"?: boolean;
      readonly "hasHmacSecret"?: boolean;
      readonly "hasHmacSecretMc"?: boolean;
      readonly "hasCmtgKey"?: boolean;
      readonly "automaticPresenceSimulation"?: boolean;
      readonly "isUserVerified"?: boolean;
      readonly "defaultBackupEligibility"?: boolean;
      readonly "defaultBackupState"?: boolean;
    }
    export interface Credential {
      readonly "credentialId": string;
      readonly "isResidentCredential": boolean;
      readonly "rpId"?: string;
      readonly "privateKey": string;
      readonly "userHandle"?: string;
      readonly "signCount": number;
      readonly "largeBlob"?: string;
      readonly "backupEligibility"?: boolean;
      readonly "backupState"?: boolean;
      readonly "userName"?: string;
      readonly "userDisplayName"?: string;
      readonly "cmtgKeys"?: ReadonlyArray<string>;
      readonly "activeCmtgKeyIndex"?: number;
      readonly "generateCmtgKeyOnNextOperation"?: boolean;
    }
    export namespace Commands {
      export interface EnableParams {
        readonly "enableUI"?: boolean;
      }
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface AddVirtualAuthenticatorParams {
        readonly "options": VirtualAuthenticatorOptions;
      }
      export interface AddVirtualAuthenticatorResult {
        readonly "authenticatorId": AuthenticatorId;
      }
      export interface SetResponseOverrideBitsParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "isBogusSignature"?: boolean;
        readonly "isBadUV"?: boolean;
        readonly "isBadUP"?: boolean;
      }
      export type SetResponseOverrideBitsResult = Readonly<Record<string, never>>;
      export interface RemoveVirtualAuthenticatorParams {
        readonly "authenticatorId": AuthenticatorId;
      }
      export type RemoveVirtualAuthenticatorResult = Readonly<Record<string, never>>;
      export interface AddCredentialParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credential": Credential;
      }
      export type AddCredentialResult = Readonly<Record<string, never>>;
      export interface GetCredentialParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credentialId": string;
      }
      export interface GetCredentialResult {
        readonly "credential": Credential;
      }
      export interface GetCredentialsParams {
        readonly "authenticatorId": AuthenticatorId;
      }
      export interface GetCredentialsResult {
        readonly "credentials": ReadonlyArray<Credential>;
      }
      export interface RemoveCredentialParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credentialId": string;
      }
      export type RemoveCredentialResult = Readonly<Record<string, never>>;
      export interface ClearCredentialsParams {
        readonly "authenticatorId": AuthenticatorId;
      }
      export type ClearCredentialsResult = Readonly<Record<string, never>>;
      export interface SetUserVerifiedParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "isUserVerified": boolean;
      }
      export type SetUserVerifiedResult = Readonly<Record<string, never>>;
      export interface SetAutomaticPresenceSimulationParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "enabled": boolean;
      }
      export type SetAutomaticPresenceSimulationResult = Readonly<Record<string, never>>;
      export interface SetCredentialPropertiesParams {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credentialId": string;
        readonly "backupEligibility"?: boolean;
        readonly "backupState"?: boolean;
        readonly "activeCmtgKeyIndex"?: number;
        readonly "generateCmtgKeyOnNextOperation"?: boolean;
        readonly "signCount"?: number;
      }
      export type SetCredentialPropertiesResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface CredentialAddedEvent {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credential": Credential;
      }
      export interface CredentialDeletedEvent {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credentialId": string;
      }
      export interface CredentialUpdatedEvent {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credential": Credential;
      }
      export interface CredentialAssertedEvent {
        readonly "authenticatorId": AuthenticatorId;
        readonly "credential": Credential;
      }
    }
  }
  export namespace WebMCP {
    export interface Annotation {
      readonly "readOnly"?: boolean;
      readonly "untrustedContent"?: boolean;
      readonly "autosubmit"?: boolean;
    }
    export type InvocationStatus = "Completed" | "Canceled" | "Error";
    export interface Tool {
      readonly "name": string;
      readonly "description": string;
      readonly "inputSchema"?: Readonly<Record<string, unknown>>;
      readonly "annotations"?: Annotation;
      readonly "frameId": Protocol.Page.FrameId;
      readonly "backendNodeId"?: Protocol.DOM.BackendNodeId;
      readonly "stackTrace"?: Protocol.Runtime.StackTrace;
    }
    export interface RemovedTool {
      readonly "name": string;
      readonly "frameId": Protocol.Page.FrameId;
    }
    export namespace Commands {
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface InvokeToolParams {
        readonly "frameId": Protocol.Page.FrameId;
        readonly "toolName": string;
        readonly "input": Readonly<Record<string, unknown>>;
      }
      export interface InvokeToolResult {
        readonly "invocationId": string;
      }
      export interface CancelInvocationParams {
        readonly "invocationId": string;
      }
      export type CancelInvocationResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface ToolsAddedEvent {
        readonly "tools": ReadonlyArray<Tool>;
      }
      export interface ToolsRemovedEvent {
        readonly "tools": ReadonlyArray<RemovedTool>;
      }
      export interface ToolInvokedEvent {
        readonly "toolName": string;
        readonly "frameId": Protocol.Page.FrameId;
        readonly "invocationId": string;
        readonly "input": string;
      }
      export interface ToolRespondedEvent {
        readonly "invocationId": string;
        readonly "status": InvocationStatus;
        readonly "output"?: unknown;
        readonly "errorText"?: string;
        readonly "exception"?: Protocol.Runtime.RemoteObject;
      }
    }
  }
  export namespace Console {
    export interface ConsoleMessage {
      readonly "source": "xml" | "javascript" | "network" | "console-api" | "storage" | "appcache" | "rendering" | "security" | "other" | "deprecation" | "worker";
      readonly "level": "log" | "warning" | "error" | "debug" | "info";
      readonly "text": string;
      readonly "url"?: string;
      readonly "line"?: number;
      readonly "column"?: number;
    }
    export namespace Commands {
      export type ClearMessagesParams = undefined;
      export type ClearMessagesResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface MessageAddedEvent {
        readonly "message": ConsoleMessage;
      }
    }
  }
  export namespace Debugger {
    export type BreakpointId = string;
    export type CallFrameId = string;
    export interface Location {
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "lineNumber": number;
      readonly "columnNumber"?: number;
    }
    export interface ScriptPosition {
      readonly "lineNumber": number;
      readonly "columnNumber": number;
    }
    export interface LocationRange {
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "start": ScriptPosition;
      readonly "end": ScriptPosition;
    }
    export interface CallFrame {
      readonly "callFrameId": CallFrameId;
      readonly "functionName": string;
      readonly "functionLocation"?: Location;
      readonly "location": Location;
      readonly "url": string;
      readonly "scopeChain": ReadonlyArray<Scope>;
      readonly "this": Protocol.Runtime.RemoteObject;
      readonly "returnValue"?: Protocol.Runtime.RemoteObject;
      readonly "canBeRestarted"?: boolean;
    }
    export interface Scope {
      readonly "type": "global" | "local" | "with" | "closure" | "catch" | "block" | "script" | "eval" | "module" | "wasm-expression-stack";
      readonly "object": Protocol.Runtime.RemoteObject;
      readonly "name"?: string;
      readonly "startLocation"?: Location;
      readonly "endLocation"?: Location;
    }
    export interface SearchMatch {
      readonly "lineNumber": number;
      readonly "lineContent": string;
    }
    export interface BreakLocation {
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "lineNumber": number;
      readonly "columnNumber"?: number;
      readonly "type"?: "debuggerStatement" | "call" | "return";
    }
    export interface WasmDisassemblyChunk {
      readonly "lines": ReadonlyArray<string>;
      readonly "bytecodeOffsets": ReadonlyArray<number>;
    }
    export type ScriptLanguage = "JavaScript" | "WebAssembly";
    export interface DebugSymbols {
      readonly "type": "SourceMap" | "EmbeddedDWARF" | "ExternalDWARF";
      readonly "externalURL"?: string;
    }
    export interface ResolvedBreakpoint {
      readonly "breakpointId": BreakpointId;
      readonly "location": Location;
    }
    export namespace Commands {
      export interface ContinueToLocationParams {
        readonly "location": Location;
        readonly "targetCallFrames"?: "any" | "current";
      }
      export type ContinueToLocationResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export interface EnableParams {
        readonly "maxScriptsCacheSize"?: number;
      }
      export interface EnableResult {
        readonly "debuggerId": Protocol.Runtime.UniqueDebuggerId;
      }
      export interface EvaluateOnCallFrameParams {
        readonly "callFrameId": CallFrameId;
        readonly "expression": string;
        readonly "objectGroup"?: string;
        readonly "includeCommandLineAPI"?: boolean;
        readonly "silent"?: boolean;
        readonly "returnByValue"?: boolean;
        readonly "generatePreview"?: boolean;
        readonly "throwOnSideEffect"?: boolean;
        readonly "timeout"?: Protocol.Runtime.TimeDelta;
        readonly "scopeNumber"?: number;
      }
      export interface EvaluateOnCallFrameResult {
        readonly "result": Protocol.Runtime.RemoteObject;
        readonly "exceptionDetails"?: Protocol.Runtime.ExceptionDetails;
      }
      export interface GetPossibleBreakpointsParams {
        readonly "start": Location;
        readonly "end"?: Location;
        readonly "restrictToFunction"?: boolean;
      }
      export interface GetPossibleBreakpointsResult {
        readonly "locations": ReadonlyArray<BreakLocation>;
      }
      export interface GetScriptSourceParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
      }
      export interface GetScriptSourceResult {
        readonly "scriptSource": string;
        readonly "bytecode"?: string;
      }
      export interface DisassembleWasmModuleParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
      }
      export interface DisassembleWasmModuleResult {
        readonly "streamId"?: string;
        readonly "totalNumberOfLines": number;
        readonly "functionBodyOffsets": ReadonlyArray<number>;
        readonly "chunk": WasmDisassemblyChunk;
      }
      export interface NextWasmDisassemblyChunkParams {
        readonly "streamId": string;
      }
      export interface NextWasmDisassemblyChunkResult {
        readonly "chunk": WasmDisassemblyChunk;
      }
      export interface GetWasmBytecodeParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
      }
      export interface GetWasmBytecodeResult {
        readonly "bytecode": string;
      }
      export interface GetStackTraceParams {
        readonly "stackTraceId": Protocol.Runtime.StackTraceId;
      }
      export interface GetStackTraceResult {
        readonly "stackTrace": Protocol.Runtime.StackTrace;
      }
      export type PauseParams = undefined;
      export type PauseResult = Readonly<Record<string, never>>;
      export interface PauseOnAsyncCallParams {
        readonly "parentStackTraceId": Protocol.Runtime.StackTraceId;
      }
      export type PauseOnAsyncCallResult = Readonly<Record<string, never>>;
      export interface RemoveBreakpointParams {
        readonly "breakpointId": BreakpointId;
      }
      export type RemoveBreakpointResult = Readonly<Record<string, never>>;
      export interface RestartFrameParams {
        readonly "callFrameId": CallFrameId;
        readonly "mode"?: "StepInto";
      }
      export interface RestartFrameResult {
        readonly "callFrames": ReadonlyArray<CallFrame>;
        readonly "asyncStackTrace"?: Protocol.Runtime.StackTrace;
        readonly "asyncStackTraceId"?: Protocol.Runtime.StackTraceId;
      }
      export interface ResumeParams {
        readonly "terminateOnResume"?: boolean;
      }
      export type ResumeResult = Readonly<Record<string, never>>;
      export interface SearchInContentParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
        readonly "query": string;
        readonly "caseSensitive"?: boolean;
        readonly "isRegex"?: boolean;
      }
      export interface SearchInContentResult {
        readonly "result": ReadonlyArray<SearchMatch>;
      }
      export interface SetAsyncCallStackDepthParams {
        readonly "maxDepth": number;
      }
      export type SetAsyncCallStackDepthResult = Readonly<Record<string, never>>;
      export interface SetBlackboxExecutionContextsParams {
        readonly "uniqueIds": ReadonlyArray<string>;
      }
      export type SetBlackboxExecutionContextsResult = Readonly<Record<string, never>>;
      export interface SetBlackboxPatternsParams {
        readonly "patterns": ReadonlyArray<string>;
        readonly "skipAnonymous"?: boolean;
      }
      export type SetBlackboxPatternsResult = Readonly<Record<string, never>>;
      export interface SetBlackboxedRangesParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
        readonly "positions": ReadonlyArray<ScriptPosition>;
      }
      export type SetBlackboxedRangesResult = Readonly<Record<string, never>>;
      export interface SetBreakpointParams {
        readonly "location": Location;
        readonly "condition"?: string;
      }
      export interface SetBreakpointResult {
        readonly "breakpointId": BreakpointId;
        readonly "actualLocation": Location;
      }
      export interface SetInstrumentationBreakpointParams {
        readonly "instrumentation": "beforeScriptExecution" | "beforeScriptWithSourceMapExecution";
      }
      export interface SetInstrumentationBreakpointResult {
        readonly "breakpointId": BreakpointId;
      }
      export interface SetBreakpointByUrlParams {
        readonly "lineNumber": number;
        readonly "url"?: string;
        readonly "urlRegex"?: string;
        readonly "scriptHash"?: string;
        readonly "columnNumber"?: number;
        readonly "condition"?: string;
      }
      export interface SetBreakpointByUrlResult {
        readonly "breakpointId": BreakpointId;
        readonly "locations": ReadonlyArray<Location>;
      }
      export interface SetBreakpointOnFunctionCallParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
        readonly "condition"?: string;
      }
      export interface SetBreakpointOnFunctionCallResult {
        readonly "breakpointId": BreakpointId;
      }
      export interface SetBreakpointsActiveParams {
        readonly "active": boolean;
      }
      export type SetBreakpointsActiveResult = Readonly<Record<string, never>>;
      export interface SetPauseOnExceptionsParams {
        readonly "state": "none" | "caught" | "uncaught" | "all";
      }
      export type SetPauseOnExceptionsResult = Readonly<Record<string, never>>;
      export interface SetReturnValueParams {
        readonly "newValue": Protocol.Runtime.CallArgument;
      }
      export type SetReturnValueResult = Readonly<Record<string, never>>;
      export interface SetScriptSourceParams {
        readonly "scriptId": Protocol.Runtime.ScriptId;
        readonly "scriptSource": string;
        readonly "dryRun"?: boolean;
        readonly "allowTopFrameEditing"?: boolean;
      }
      export interface SetScriptSourceResult {
        readonly "callFrames"?: ReadonlyArray<CallFrame>;
        readonly "stackChanged"?: boolean;
        readonly "asyncStackTrace"?: Protocol.Runtime.StackTrace;
        readonly "asyncStackTraceId"?: Protocol.Runtime.StackTraceId;
        readonly "status": "Ok" | "CompileError" | "BlockedByActiveGenerator" | "BlockedByActiveFunction" | "BlockedByTopLevelEsModuleChange";
        readonly "exceptionDetails"?: Protocol.Runtime.ExceptionDetails;
      }
      export interface SetSkipAllPausesParams {
        readonly "skip": boolean;
      }
      export type SetSkipAllPausesResult = Readonly<Record<string, never>>;
      export interface SetVariableValueParams {
        readonly "scopeNumber": number;
        readonly "variableName": string;
        readonly "newValue": Protocol.Runtime.CallArgument;
        readonly "callFrameId": CallFrameId;
      }
      export type SetVariableValueResult = Readonly<Record<string, never>>;
      export interface StepIntoParams {
        readonly "breakOnAsyncCall"?: boolean;
        readonly "skipList"?: ReadonlyArray<LocationRange>;
      }
      export type StepIntoResult = Readonly<Record<string, never>>;
      export type StepOutParams = undefined;
      export type StepOutResult = Readonly<Record<string, never>>;
      export interface StepOverParams {
        readonly "skipList"?: ReadonlyArray<LocationRange>;
      }
      export type StepOverResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface BreakpointResolvedEvent {
        readonly "breakpointId": BreakpointId;
        readonly "location": Location;
      }
      export interface PausedEvent {
        readonly "callFrames": ReadonlyArray<CallFrame>;
        readonly "reason": "ambiguous" | "assert" | "CSPViolation" | "debugCommand" | "DOM" | "EventListener" | "exception" | "instrumentation" | "OOM" | "other" | "promiseRejection" | "XHR" | "step";
        readonly "data"?: Readonly<Record<string, unknown>>;
        readonly "hitBreakpoints"?: ReadonlyArray<string>;
        readonly "asyncStackTrace"?: Protocol.Runtime.StackTrace;
        readonly "asyncStackTraceId"?: Protocol.Runtime.StackTraceId;
        readonly "asyncCallStackTraceId"?: Protocol.Runtime.StackTraceId;
      }
      export type ResumedEvent = Readonly<Record<string, never>>;
      export interface ScriptFailedToParseEvent {
        readonly "scriptId": Protocol.Runtime.ScriptId;
        readonly "url": string;
        readonly "startLine": number;
        readonly "startColumn": number;
        readonly "endLine": number;
        readonly "endColumn": number;
        readonly "executionContextId": Protocol.Runtime.ExecutionContextId;
        readonly "hash": string;
        readonly "buildId": string;
        readonly "executionContextAuxData"?: Readonly<Record<string, unknown>>;
        readonly "sourceMapURL"?: string;
        readonly "hasSourceURL"?: boolean;
        readonly "isModule"?: boolean;
        readonly "length"?: number;
        readonly "stackTrace"?: Protocol.Runtime.StackTrace;
        readonly "codeOffset"?: number;
        readonly "scriptLanguage"?: Protocol.Debugger.ScriptLanguage;
        readonly "embedderName"?: string;
      }
      export interface ScriptParsedEvent {
        readonly "scriptId": Protocol.Runtime.ScriptId;
        readonly "url": string;
        readonly "startLine": number;
        readonly "startColumn": number;
        readonly "endLine": number;
        readonly "endColumn": number;
        readonly "executionContextId": Protocol.Runtime.ExecutionContextId;
        readonly "hash": string;
        readonly "buildId": string;
        readonly "executionContextAuxData"?: Readonly<Record<string, unknown>>;
        readonly "isLiveEdit"?: boolean;
        readonly "sourceMapURL"?: string;
        readonly "hasSourceURL"?: boolean;
        readonly "isModule"?: boolean;
        readonly "length"?: number;
        readonly "stackTrace"?: Protocol.Runtime.StackTrace;
        readonly "codeOffset"?: number;
        readonly "scriptLanguage"?: Protocol.Debugger.ScriptLanguage;
        readonly "debugSymbols"?: ReadonlyArray<Protocol.Debugger.DebugSymbols>;
        readonly "embedderName"?: string;
        readonly "resolvedBreakpoints"?: ReadonlyArray<ResolvedBreakpoint>;
      }
    }
  }
  export namespace HeapProfiler {
    export type HeapSnapshotObjectId = string;
    export interface SamplingHeapProfileNode {
      readonly "callFrame": Protocol.Runtime.CallFrame;
      readonly "selfSize": number;
      readonly "id": number;
      readonly "children": ReadonlyArray<SamplingHeapProfileNode>;
    }
    export interface SamplingHeapProfileSample {
      readonly "size": number;
      readonly "nodeId": number;
      readonly "ordinal": number;
    }
    export interface SamplingHeapProfile {
      readonly "head": SamplingHeapProfileNode;
      readonly "samples": ReadonlyArray<SamplingHeapProfileSample>;
    }
    export namespace Commands {
      export interface AddInspectedHeapObjectParams {
        readonly "heapObjectId": HeapSnapshotObjectId;
      }
      export type AddInspectedHeapObjectResult = Readonly<Record<string, never>>;
      export type CollectGarbageParams = undefined;
      export type CollectGarbageResult = Readonly<Record<string, never>>;
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface GetHeapObjectIdParams {
        readonly "objectId": Protocol.Runtime.RemoteObjectId;
      }
      export interface GetHeapObjectIdResult {
        readonly "heapSnapshotObjectId": HeapSnapshotObjectId;
      }
      export interface GetObjectByHeapObjectIdParams {
        readonly "objectId": HeapSnapshotObjectId;
        readonly "objectGroup"?: string;
      }
      export interface GetObjectByHeapObjectIdResult {
        readonly "result": Protocol.Runtime.RemoteObject;
      }
      export type GetSamplingProfileParams = undefined;
      export interface GetSamplingProfileResult {
        readonly "profile": SamplingHeapProfile;
      }
      export interface StartSamplingParams {
        readonly "samplingInterval"?: number;
        readonly "stackDepth"?: number;
        readonly "includeObjectsCollectedByMajorGC"?: boolean;
        readonly "includeObjectsCollectedByMinorGC"?: boolean;
      }
      export type StartSamplingResult = Readonly<Record<string, never>>;
      export interface StartTrackingHeapObjectsParams {
        readonly "trackAllocations"?: boolean;
      }
      export type StartTrackingHeapObjectsResult = Readonly<Record<string, never>>;
      export type StopSamplingParams = undefined;
      export interface StopSamplingResult {
        readonly "profile": SamplingHeapProfile;
      }
      export interface StopTrackingHeapObjectsParams {
        readonly "reportProgress"?: boolean;
        readonly "treatGlobalObjectsAsRoots"?: boolean;
        readonly "captureNumericValue"?: boolean;
        readonly "exposeInternals"?: boolean;
      }
      export type StopTrackingHeapObjectsResult = Readonly<Record<string, never>>;
      export interface TakeHeapSnapshotParams {
        readonly "reportProgress"?: boolean;
        readonly "treatGlobalObjectsAsRoots"?: boolean;
        readonly "captureNumericValue"?: boolean;
        readonly "exposeInternals"?: boolean;
      }
      export type TakeHeapSnapshotResult = Readonly<Record<string, never>>;
    }
    export namespace Events {
      export interface AddHeapSnapshotChunkEvent {
        readonly "chunk": string;
      }
      export interface HeapStatsUpdateEvent {
        readonly "statsUpdate": ReadonlyArray<number>;
      }
      export interface LastSeenObjectIdEvent {
        readonly "lastSeenObjectId": number;
        readonly "timestamp": number;
      }
      export interface ReportHeapSnapshotProgressEvent {
        readonly "done": number;
        readonly "total": number;
        readonly "finished"?: boolean;
      }
      export type ResetProfilesEvent = Readonly<Record<string, never>>;
    }
  }
  export namespace Profiler {
    export interface ProfileNode {
      readonly "id": number;
      readonly "callFrame": Protocol.Runtime.CallFrame;
      readonly "hitCount"?: number;
      readonly "children"?: ReadonlyArray<number>;
      readonly "deoptReason"?: string;
      readonly "positionTicks"?: ReadonlyArray<PositionTickInfo>;
    }
    export interface Profile {
      readonly "nodes": ReadonlyArray<ProfileNode>;
      readonly "startTime": number;
      readonly "endTime": number;
      readonly "samples"?: ReadonlyArray<number>;
      readonly "timeDeltas"?: ReadonlyArray<number>;
    }
    export interface PositionTickInfo {
      readonly "line": number;
      readonly "ticks": number;
    }
    export interface CoverageRange {
      readonly "startOffset": number;
      readonly "endOffset": number;
      readonly "count": number;
    }
    export interface FunctionCoverage {
      readonly "functionName": string;
      readonly "ranges": ReadonlyArray<CoverageRange>;
      readonly "isBlockCoverage": boolean;
    }
    export interface ScriptCoverage {
      readonly "scriptId": Protocol.Runtime.ScriptId;
      readonly "url": string;
      readonly "functions": ReadonlyArray<FunctionCoverage>;
    }
    export namespace Commands {
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export type GetBestEffortCoverageParams = undefined;
      export interface GetBestEffortCoverageResult {
        readonly "result": ReadonlyArray<ScriptCoverage>;
      }
      export interface SetSamplingIntervalParams {
        readonly "interval": number;
      }
      export type SetSamplingIntervalResult = Readonly<Record<string, never>>;
      export type StartParams = undefined;
      export type StartResult = Readonly<Record<string, never>>;
      export interface StartPreciseCoverageParams {
        readonly "callCount"?: boolean;
        readonly "detailed"?: boolean;
        readonly "allowTriggeredUpdates"?: boolean;
      }
      export interface StartPreciseCoverageResult {
        readonly "timestamp": number;
      }
      export type StopParams = undefined;
      export interface StopResult {
        readonly "profile": Profile;
      }
      export type StopPreciseCoverageParams = undefined;
      export type StopPreciseCoverageResult = Readonly<Record<string, never>>;
      export type TakePreciseCoverageParams = undefined;
      export interface TakePreciseCoverageResult {
        readonly "result": ReadonlyArray<ScriptCoverage>;
        readonly "timestamp": number;
      }
    }
    export namespace Events {
      export interface ConsoleProfileFinishedEvent {
        readonly "id": string;
        readonly "location": Protocol.Debugger.Location;
        readonly "profile": Profile;
        readonly "title"?: string;
      }
      export interface ConsoleProfileStartedEvent {
        readonly "id": string;
        readonly "location": Protocol.Debugger.Location;
        readonly "title"?: string;
      }
      export interface PreciseCoverageDeltaUpdateEvent {
        readonly "timestamp": number;
        readonly "occasion": string;
        readonly "result": ReadonlyArray<ScriptCoverage>;
      }
    }
  }
  export namespace Runtime {
    export type ScriptId = string;
    export interface SerializationOptions {
      readonly "serialization": "deep" | "json" | "idOnly";
      readonly "maxDepth"?: number;
      readonly "additionalParameters"?: Readonly<Record<string, unknown>>;
    }
    export interface DeepSerializedValue {
      readonly "type": "undefined" | "null" | "string" | "number" | "boolean" | "bigint" | "regexp" | "date" | "symbol" | "array" | "object" | "function" | "map" | "set" | "weakmap" | "weakset" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "node" | "window" | "generator";
      readonly "value"?: unknown;
      readonly "objectId"?: string;
      readonly "weakLocalObjectReference"?: number;
    }
    export type RemoteObjectId = string;
    export type UnserializableValue = string;
    export interface RemoteObject {
      readonly "type": "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "bigint";
      readonly "subtype"?: "array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue" | "trustedtype";
      readonly "className"?: string;
      readonly "value"?: unknown;
      readonly "unserializableValue"?: UnserializableValue;
      readonly "description"?: string;
      readonly "deepSerializedValue"?: DeepSerializedValue;
      readonly "objectId"?: RemoteObjectId;
      readonly "preview"?: ObjectPreview;
      readonly "customPreview"?: CustomPreview;
    }
    export interface CustomPreview {
      readonly "header": string;
      readonly "bodyGetterId"?: RemoteObjectId;
    }
    export interface ObjectPreview {
      readonly "type": "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "bigint";
      readonly "subtype"?: "array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue" | "trustedtype";
      readonly "description"?: string;
      readonly "overflow": boolean;
      readonly "properties": ReadonlyArray<PropertyPreview>;
      readonly "entries"?: ReadonlyArray<EntryPreview>;
    }
    export interface PropertyPreview {
      readonly "name": string;
      readonly "type": "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "accessor" | "bigint";
      readonly "value"?: string;
      readonly "valuePreview"?: ObjectPreview;
      readonly "subtype"?: "array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray" | "arraybuffer" | "dataview" | "webassemblymemory" | "wasmvalue" | "trustedtype";
    }
    export interface EntryPreview {
      readonly "key"?: ObjectPreview;
      readonly "value": ObjectPreview;
    }
    export interface PropertyDescriptor {
      readonly "name": string;
      readonly "value"?: RemoteObject;
      readonly "writable"?: boolean;
      readonly "get"?: RemoteObject;
      readonly "set"?: RemoteObject;
      readonly "configurable": boolean;
      readonly "enumerable": boolean;
      readonly "wasThrown"?: boolean;
      readonly "isOwn"?: boolean;
      readonly "symbol"?: RemoteObject;
    }
    export interface InternalPropertyDescriptor {
      readonly "name": string;
      readonly "value"?: RemoteObject;
    }
    export interface PrivatePropertyDescriptor {
      readonly "name": string;
      readonly "value"?: RemoteObject;
      readonly "get"?: RemoteObject;
      readonly "set"?: RemoteObject;
    }
    export interface CallArgument {
      readonly "value"?: unknown;
      readonly "unserializableValue"?: UnserializableValue;
      readonly "objectId"?: RemoteObjectId;
    }
    export type ExecutionContextId = number;
    export interface ExecutionContextDescription {
      readonly "id": ExecutionContextId;
      readonly "origin": string;
      readonly "name": string;
      readonly "uniqueId": string;
      readonly "auxData"?: Readonly<Record<string, unknown>>;
    }
    export interface ExceptionDetails {
      readonly "exceptionId": number;
      readonly "text": string;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
      readonly "scriptId"?: ScriptId;
      readonly "url"?: string;
      readonly "stackTrace"?: StackTrace;
      readonly "exception"?: RemoteObject;
      readonly "executionContextId"?: ExecutionContextId;
      readonly "exceptionMetaData"?: Readonly<Record<string, unknown>>;
    }
    export type Timestamp = number;
    export type TimeDelta = number;
    export interface CallFrame {
      readonly "functionName": string;
      readonly "scriptId": ScriptId;
      readonly "url": string;
      readonly "lineNumber": number;
      readonly "columnNumber": number;
    }
    export interface StackTrace {
      readonly "description"?: string;
      readonly "callFrames": ReadonlyArray<CallFrame>;
      readonly "parent"?: StackTrace;
      readonly "parentId"?: StackTraceId;
    }
    export type UniqueDebuggerId = string;
    export interface StackTraceId {
      readonly "id": string;
      readonly "debuggerId"?: UniqueDebuggerId;
    }
    export namespace Commands {
      export interface AwaitPromiseParams {
        readonly "promiseObjectId": RemoteObjectId;
        readonly "returnByValue"?: boolean;
        readonly "generatePreview"?: boolean;
      }
      export interface AwaitPromiseResult {
        readonly "result": RemoteObject;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export interface CallFunctionOnParams {
        readonly "functionDeclaration": string;
        readonly "objectId"?: RemoteObjectId;
        readonly "arguments"?: ReadonlyArray<CallArgument>;
        readonly "silent"?: boolean;
        readonly "returnByValue"?: boolean;
        readonly "generatePreview"?: boolean;
        readonly "userGesture"?: boolean;
        readonly "awaitPromise"?: boolean;
        readonly "executionContextId"?: ExecutionContextId;
        readonly "objectGroup"?: string;
        readonly "throwOnSideEffect"?: boolean;
        readonly "uniqueContextId"?: string;
        readonly "serializationOptions"?: SerializationOptions;
      }
      export interface CallFunctionOnResult {
        readonly "result": RemoteObject;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export interface CompileScriptParams {
        readonly "expression": string;
        readonly "sourceURL": string;
        readonly "persistScript": boolean;
        readonly "executionContextId"?: ExecutionContextId;
      }
      export interface CompileScriptResult {
        readonly "scriptId"?: ScriptId;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export type DisableParams = undefined;
      export type DisableResult = Readonly<Record<string, never>>;
      export type DiscardConsoleEntriesParams = undefined;
      export type DiscardConsoleEntriesResult = Readonly<Record<string, never>>;
      export type EnableParams = undefined;
      export type EnableResult = Readonly<Record<string, never>>;
      export interface EvaluateParams {
        readonly "expression": string;
        readonly "objectGroup"?: string;
        readonly "includeCommandLineAPI"?: boolean;
        readonly "silent"?: boolean;
        readonly "contextId"?: ExecutionContextId;
        readonly "returnByValue"?: boolean;
        readonly "generatePreview"?: boolean;
        readonly "userGesture"?: boolean;
        readonly "awaitPromise"?: boolean;
        readonly "throwOnSideEffect"?: boolean;
        readonly "timeout"?: TimeDelta;
        readonly "disableBreaks"?: boolean;
        readonly "replMode"?: boolean;
        readonly "allowUnsafeEvalBlockedByCSP"?: boolean;
        readonly "uniqueContextId"?: string;
        readonly "serializationOptions"?: SerializationOptions;
      }
      export interface EvaluateResult {
        readonly "result": RemoteObject;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export type GetIsolateIdParams = undefined;
      export interface GetIsolateIdResult {
        readonly "id": string;
      }
      export type GetHeapUsageParams = undefined;
      export interface GetHeapUsageResult {
        readonly "usedSize": number;
        readonly "totalSize": number;
        readonly "embedderHeapUsedSize": number;
        readonly "backingStorageSize": number;
      }
      export interface GetPropertiesParams {
        readonly "objectId": RemoteObjectId;
        readonly "ownProperties"?: boolean;
        readonly "accessorPropertiesOnly"?: boolean;
        readonly "generatePreview"?: boolean;
        readonly "nonIndexedPropertiesOnly"?: boolean;
      }
      export interface GetPropertiesResult {
        readonly "result": ReadonlyArray<PropertyDescriptor>;
        readonly "internalProperties"?: ReadonlyArray<InternalPropertyDescriptor>;
        readonly "privateProperties"?: ReadonlyArray<PrivatePropertyDescriptor>;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export interface GlobalLexicalScopeNamesParams {
        readonly "executionContextId"?: ExecutionContextId;
      }
      export interface GlobalLexicalScopeNamesResult {
        readonly "names": ReadonlyArray<string>;
      }
      export interface QueryObjectsParams {
        readonly "prototypeObjectId": RemoteObjectId;
        readonly "objectGroup"?: string;
      }
      export interface QueryObjectsResult {
        readonly "objects": RemoteObject;
      }
      export interface ReleaseObjectParams {
        readonly "objectId": RemoteObjectId;
      }
      export type ReleaseObjectResult = Readonly<Record<string, never>>;
      export interface ReleaseObjectGroupParams {
        readonly "objectGroup": string;
      }
      export type ReleaseObjectGroupResult = Readonly<Record<string, never>>;
      export type RunIfWaitingForDebuggerParams = undefined;
      export type RunIfWaitingForDebuggerResult = Readonly<Record<string, never>>;
      export interface RunScriptParams {
        readonly "scriptId": ScriptId;
        readonly "executionContextId"?: ExecutionContextId;
        readonly "objectGroup"?: string;
        readonly "silent"?: boolean;
        readonly "includeCommandLineAPI"?: boolean;
        readonly "returnByValue"?: boolean;
        readonly "generatePreview"?: boolean;
        readonly "awaitPromise"?: boolean;
      }
      export interface RunScriptResult {
        readonly "result": RemoteObject;
        readonly "exceptionDetails"?: ExceptionDetails;
      }
      export interface SetAsyncCallStackDepthParams {
        readonly "maxDepth": number;
      }
      export type SetAsyncCallStackDepthResult = Readonly<Record<string, never>>;
      export interface SetCustomObjectFormatterEnabledParams {
        readonly "enabled": boolean;
      }
      export type SetCustomObjectFormatterEnabledResult = Readonly<Record<string, never>>;
      export interface SetMaxCallStackSizeToCaptureParams {
        readonly "size": number;
      }
      export type SetMaxCallStackSizeToCaptureResult = Readonly<Record<string, never>>;
      export type TerminateExecutionParams = undefined;
      export type TerminateExecutionResult = Readonly<Record<string, never>>;
      export interface AddBindingParams {
        readonly "name": string;
        readonly "executionContextId"?: ExecutionContextId;
        readonly "executionContextName"?: string;
      }
      export type AddBindingResult = Readonly<Record<string, never>>;
      export interface RemoveBindingParams {
        readonly "name": string;
      }
      export type RemoveBindingResult = Readonly<Record<string, never>>;
      export interface GetExceptionDetailsParams {
        readonly "errorObjectId": RemoteObjectId;
      }
      export interface GetExceptionDetailsResult {
        readonly "exceptionDetails"?: ExceptionDetails;
      }
    }
    export namespace Events {
      export interface BindingCalledEvent {
        readonly "name": string;
        readonly "payload": string;
        readonly "executionContextId": ExecutionContextId;
      }
      export interface ConsoleAPICalledEvent {
        readonly "type": "log" | "debug" | "info" | "error" | "warning" | "dir" | "dirxml" | "table" | "trace" | "clear" | "startGroup" | "startGroupCollapsed" | "endGroup" | "assert" | "profile" | "profileEnd" | "count" | "timeEnd";
        readonly "args": ReadonlyArray<RemoteObject>;
        readonly "executionContextId": ExecutionContextId;
        readonly "timestamp": Timestamp;
        readonly "stackTrace"?: StackTrace;
        readonly "context"?: string;
      }
      export interface ExceptionRevokedEvent {
        readonly "reason": string;
        readonly "exceptionId": number;
      }
      export interface ExceptionThrownEvent {
        readonly "timestamp": Timestamp;
        readonly "exceptionDetails": ExceptionDetails;
      }
      export interface ExecutionContextCreatedEvent {
        readonly "context": ExecutionContextDescription;
      }
      export interface ExecutionContextDestroyedEvent {
        readonly "executionContextId": ExecutionContextId;
        readonly "executionContextUniqueId": string;
      }
      export type ExecutionContextsClearedEvent = Readonly<Record<string, never>>;
      export interface InspectRequestedEvent {
        readonly "object": RemoteObject;
        readonly "hints": Readonly<Record<string, unknown>>;
        readonly "executionContextId"?: ExecutionContextId;
      }
    }
  }
  export namespace Schema {
    export interface Domain {
      readonly "name": string;
      readonly "version": string;
    }
    export namespace Commands {
      export type GetDomainsParams = undefined;
      export interface GetDomainsResult {
        readonly "domains": ReadonlyArray<Domain>;
      }
    }
    export namespace Events {
    }
  }
}

export interface ProtocolCommandMap {
  readonly "Accessibility.disable": {
    readonly params: Protocol.Accessibility.Commands.DisableParams;
    readonly result: Protocol.Accessibility.Commands.DisableResult;
  };
  readonly "Accessibility.enable": {
    readonly params: Protocol.Accessibility.Commands.EnableParams;
    readonly result: Protocol.Accessibility.Commands.EnableResult;
  };
  readonly "Accessibility.getPartialAXTree": {
    readonly params: Protocol.Accessibility.Commands.GetPartialAXTreeParams;
    readonly result: Protocol.Accessibility.Commands.GetPartialAXTreeResult;
  };
  readonly "Accessibility.getFullAXTree": {
    readonly params: Protocol.Accessibility.Commands.GetFullAXTreeParams;
    readonly result: Protocol.Accessibility.Commands.GetFullAXTreeResult;
  };
  readonly "Accessibility.getRootAXNode": {
    readonly params: Protocol.Accessibility.Commands.GetRootAXNodeParams;
    readonly result: Protocol.Accessibility.Commands.GetRootAXNodeResult;
  };
  readonly "Accessibility.getAXNodeAndAncestors": {
    readonly params: Protocol.Accessibility.Commands.GetAXNodeAndAncestorsParams;
    readonly result: Protocol.Accessibility.Commands.GetAXNodeAndAncestorsResult;
  };
  readonly "Accessibility.getChildAXNodes": {
    readonly params: Protocol.Accessibility.Commands.GetChildAXNodesParams;
    readonly result: Protocol.Accessibility.Commands.GetChildAXNodesResult;
  };
  readonly "Accessibility.queryAXTree": {
    readonly params: Protocol.Accessibility.Commands.QueryAXTreeParams;
    readonly result: Protocol.Accessibility.Commands.QueryAXTreeResult;
  };
  readonly "Ads.getAdMetrics": {
    readonly params: Protocol.Ads.Commands.GetAdMetricsParams;
    readonly result: Protocol.Ads.Commands.GetAdMetricsResult;
  };
  readonly "Animation.disable": {
    readonly params: Protocol.Animation.Commands.DisableParams;
    readonly result: Protocol.Animation.Commands.DisableResult;
  };
  readonly "Animation.enable": {
    readonly params: Protocol.Animation.Commands.EnableParams;
    readonly result: Protocol.Animation.Commands.EnableResult;
  };
  readonly "Animation.getCurrentTime": {
    readonly params: Protocol.Animation.Commands.GetCurrentTimeParams;
    readonly result: Protocol.Animation.Commands.GetCurrentTimeResult;
  };
  readonly "Animation.getPlaybackRate": {
    readonly params: Protocol.Animation.Commands.GetPlaybackRateParams;
    readonly result: Protocol.Animation.Commands.GetPlaybackRateResult;
  };
  readonly "Animation.releaseAnimations": {
    readonly params: Protocol.Animation.Commands.ReleaseAnimationsParams;
    readonly result: Protocol.Animation.Commands.ReleaseAnimationsResult;
  };
  readonly "Animation.resolveAnimation": {
    readonly params: Protocol.Animation.Commands.ResolveAnimationParams;
    readonly result: Protocol.Animation.Commands.ResolveAnimationResult;
  };
  readonly "Animation.seekAnimations": {
    readonly params: Protocol.Animation.Commands.SeekAnimationsParams;
    readonly result: Protocol.Animation.Commands.SeekAnimationsResult;
  };
  readonly "Animation.setPaused": {
    readonly params: Protocol.Animation.Commands.SetPausedParams;
    readonly result: Protocol.Animation.Commands.SetPausedResult;
  };
  readonly "Animation.setPlaybackRate": {
    readonly params: Protocol.Animation.Commands.SetPlaybackRateParams;
    readonly result: Protocol.Animation.Commands.SetPlaybackRateResult;
  };
  readonly "Animation.setTiming": {
    readonly params: Protocol.Animation.Commands.SetTimingParams;
    readonly result: Protocol.Animation.Commands.SetTimingResult;
  };
  readonly "Audits.getEncodedResponse": {
    readonly params: Protocol.Audits.Commands.GetEncodedResponseParams;
    readonly result: Protocol.Audits.Commands.GetEncodedResponseResult;
  };
  readonly "Audits.disable": {
    readonly params: Protocol.Audits.Commands.DisableParams;
    readonly result: Protocol.Audits.Commands.DisableResult;
  };
  readonly "Audits.enable": {
    readonly params: Protocol.Audits.Commands.EnableParams;
    readonly result: Protocol.Audits.Commands.EnableResult;
  };
  readonly "Audits.checkFormsIssues": {
    readonly params: Protocol.Audits.Commands.CheckFormsIssuesParams;
    readonly result: Protocol.Audits.Commands.CheckFormsIssuesResult;
  };
  readonly "Autofill.trigger": {
    readonly params: Protocol.Autofill.Commands.TriggerParams;
    readonly result: Protocol.Autofill.Commands.TriggerResult;
  };
  readonly "Autofill.setAddresses": {
    readonly params: Protocol.Autofill.Commands.SetAddressesParams;
    readonly result: Protocol.Autofill.Commands.SetAddressesResult;
  };
  readonly "Autofill.disable": {
    readonly params: Protocol.Autofill.Commands.DisableParams;
    readonly result: Protocol.Autofill.Commands.DisableResult;
  };
  readonly "Autofill.enable": {
    readonly params: Protocol.Autofill.Commands.EnableParams;
    readonly result: Protocol.Autofill.Commands.EnableResult;
  };
  readonly "BackgroundService.startObserving": {
    readonly params: Protocol.BackgroundService.Commands.StartObservingParams;
    readonly result: Protocol.BackgroundService.Commands.StartObservingResult;
  };
  readonly "BackgroundService.stopObserving": {
    readonly params: Protocol.BackgroundService.Commands.StopObservingParams;
    readonly result: Protocol.BackgroundService.Commands.StopObservingResult;
  };
  readonly "BackgroundService.setRecording": {
    readonly params: Protocol.BackgroundService.Commands.SetRecordingParams;
    readonly result: Protocol.BackgroundService.Commands.SetRecordingResult;
  };
  readonly "BackgroundService.clearEvents": {
    readonly params: Protocol.BackgroundService.Commands.ClearEventsParams;
    readonly result: Protocol.BackgroundService.Commands.ClearEventsResult;
  };
  readonly "BluetoothEmulation.enable": {
    readonly params: Protocol.BluetoothEmulation.Commands.EnableParams;
    readonly result: Protocol.BluetoothEmulation.Commands.EnableResult;
  };
  readonly "BluetoothEmulation.setSimulatedCentralState": {
    readonly params: Protocol.BluetoothEmulation.Commands.SetSimulatedCentralStateParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SetSimulatedCentralStateResult;
  };
  readonly "BluetoothEmulation.disable": {
    readonly params: Protocol.BluetoothEmulation.Commands.DisableParams;
    readonly result: Protocol.BluetoothEmulation.Commands.DisableResult;
  };
  readonly "BluetoothEmulation.simulatePreconnectedPeripheral": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulatePreconnectedPeripheralParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulatePreconnectedPeripheralResult;
  };
  readonly "BluetoothEmulation.simulateAdvertisement": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulateAdvertisementParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulateAdvertisementResult;
  };
  readonly "BluetoothEmulation.simulateGATTOperationResponse": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulateGATTOperationResponseParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulateGATTOperationResponseResult;
  };
  readonly "BluetoothEmulation.simulateCharacteristicOperationResponse": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulateCharacteristicOperationResponseParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulateCharacteristicOperationResponseResult;
  };
  readonly "BluetoothEmulation.simulateDescriptorOperationResponse": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulateDescriptorOperationResponseParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulateDescriptorOperationResponseResult;
  };
  readonly "BluetoothEmulation.addService": {
    readonly params: Protocol.BluetoothEmulation.Commands.AddServiceParams;
    readonly result: Protocol.BluetoothEmulation.Commands.AddServiceResult;
  };
  readonly "BluetoothEmulation.removeService": {
    readonly params: Protocol.BluetoothEmulation.Commands.RemoveServiceParams;
    readonly result: Protocol.BluetoothEmulation.Commands.RemoveServiceResult;
  };
  readonly "BluetoothEmulation.addCharacteristic": {
    readonly params: Protocol.BluetoothEmulation.Commands.AddCharacteristicParams;
    readonly result: Protocol.BluetoothEmulation.Commands.AddCharacteristicResult;
  };
  readonly "BluetoothEmulation.removeCharacteristic": {
    readonly params: Protocol.BluetoothEmulation.Commands.RemoveCharacteristicParams;
    readonly result: Protocol.BluetoothEmulation.Commands.RemoveCharacteristicResult;
  };
  readonly "BluetoothEmulation.addDescriptor": {
    readonly params: Protocol.BluetoothEmulation.Commands.AddDescriptorParams;
    readonly result: Protocol.BluetoothEmulation.Commands.AddDescriptorResult;
  };
  readonly "BluetoothEmulation.removeDescriptor": {
    readonly params: Protocol.BluetoothEmulation.Commands.RemoveDescriptorParams;
    readonly result: Protocol.BluetoothEmulation.Commands.RemoveDescriptorResult;
  };
  readonly "BluetoothEmulation.simulateGATTDisconnection": {
    readonly params: Protocol.BluetoothEmulation.Commands.SimulateGATTDisconnectionParams;
    readonly result: Protocol.BluetoothEmulation.Commands.SimulateGATTDisconnectionResult;
  };
  readonly "Browser.setPermission": {
    readonly params: Protocol.Browser.Commands.SetPermissionParams;
    readonly result: Protocol.Browser.Commands.SetPermissionResult;
  };
  readonly "Browser.grantPermissions": {
    readonly params: Protocol.Browser.Commands.GrantPermissionsParams;
    readonly result: Protocol.Browser.Commands.GrantPermissionsResult;
  };
  readonly "Browser.resetPermissions": {
    readonly params: Protocol.Browser.Commands.ResetPermissionsParams;
    readonly result: Protocol.Browser.Commands.ResetPermissionsResult;
  };
  readonly "Browser.setDownloadBehavior": {
    readonly params: Protocol.Browser.Commands.SetDownloadBehaviorParams;
    readonly result: Protocol.Browser.Commands.SetDownloadBehaviorResult;
  };
  readonly "Browser.cancelDownload": {
    readonly params: Protocol.Browser.Commands.CancelDownloadParams;
    readonly result: Protocol.Browser.Commands.CancelDownloadResult;
  };
  readonly "Browser.close": {
    readonly params: Protocol.Browser.Commands.CloseParams;
    readonly result: Protocol.Browser.Commands.CloseResult;
  };
  readonly "Browser.crash": {
    readonly params: Protocol.Browser.Commands.CrashParams;
    readonly result: Protocol.Browser.Commands.CrashResult;
  };
  readonly "Browser.crashGpuProcess": {
    readonly params: Protocol.Browser.Commands.CrashGpuProcessParams;
    readonly result: Protocol.Browser.Commands.CrashGpuProcessResult;
  };
  readonly "Browser.getVersion": {
    readonly params: Protocol.Browser.Commands.GetVersionParams;
    readonly result: Protocol.Browser.Commands.GetVersionResult;
  };
  readonly "Browser.getBrowserCommandLine": {
    readonly params: Protocol.Browser.Commands.GetBrowserCommandLineParams;
    readonly result: Protocol.Browser.Commands.GetBrowserCommandLineResult;
  };
  readonly "Browser.getHistograms": {
    readonly params: Protocol.Browser.Commands.GetHistogramsParams;
    readonly result: Protocol.Browser.Commands.GetHistogramsResult;
  };
  readonly "Browser.getHistogram": {
    readonly params: Protocol.Browser.Commands.GetHistogramParams;
    readonly result: Protocol.Browser.Commands.GetHistogramResult;
  };
  readonly "Browser.getWindowBounds": {
    readonly params: Protocol.Browser.Commands.GetWindowBoundsParams;
    readonly result: Protocol.Browser.Commands.GetWindowBoundsResult;
  };
  readonly "Browser.getWindowForTarget": {
    readonly params: Protocol.Browser.Commands.GetWindowForTargetParams;
    readonly result: Protocol.Browser.Commands.GetWindowForTargetResult;
  };
  readonly "Browser.setWindowBounds": {
    readonly params: Protocol.Browser.Commands.SetWindowBoundsParams;
    readonly result: Protocol.Browser.Commands.SetWindowBoundsResult;
  };
  readonly "Browser.setContentsSize": {
    readonly params: Protocol.Browser.Commands.SetContentsSizeParams;
    readonly result: Protocol.Browser.Commands.SetContentsSizeResult;
  };
  readonly "Browser.setDockTile": {
    readonly params: Protocol.Browser.Commands.SetDockTileParams;
    readonly result: Protocol.Browser.Commands.SetDockTileResult;
  };
  readonly "Browser.executeBrowserCommand": {
    readonly params: Protocol.Browser.Commands.ExecuteBrowserCommandParams;
    readonly result: Protocol.Browser.Commands.ExecuteBrowserCommandResult;
  };
  readonly "Browser.addPrivacySandboxEnrollmentOverride": {
    readonly params: Protocol.Browser.Commands.AddPrivacySandboxEnrollmentOverrideParams;
    readonly result: Protocol.Browser.Commands.AddPrivacySandboxEnrollmentOverrideResult;
  };
  readonly "CSS.addRule": {
    readonly params: Protocol.CSS.Commands.AddRuleParams;
    readonly result: Protocol.CSS.Commands.AddRuleResult;
  };
  readonly "CSS.collectClassNames": {
    readonly params: Protocol.CSS.Commands.CollectClassNamesParams;
    readonly result: Protocol.CSS.Commands.CollectClassNamesResult;
  };
  readonly "CSS.createStyleSheet": {
    readonly params: Protocol.CSS.Commands.CreateStyleSheetParams;
    readonly result: Protocol.CSS.Commands.CreateStyleSheetResult;
  };
  readonly "CSS.disable": {
    readonly params: Protocol.CSS.Commands.DisableParams;
    readonly result: Protocol.CSS.Commands.DisableResult;
  };
  readonly "CSS.enable": {
    readonly params: Protocol.CSS.Commands.EnableParams;
    readonly result: Protocol.CSS.Commands.EnableResult;
  };
  readonly "CSS.forcePseudoState": {
    readonly params: Protocol.CSS.Commands.ForcePseudoStateParams;
    readonly result: Protocol.CSS.Commands.ForcePseudoStateResult;
  };
  readonly "CSS.forceStartingStyle": {
    readonly params: Protocol.CSS.Commands.ForceStartingStyleParams;
    readonly result: Protocol.CSS.Commands.ForceStartingStyleResult;
  };
  readonly "CSS.getBackgroundColors": {
    readonly params: Protocol.CSS.Commands.GetBackgroundColorsParams;
    readonly result: Protocol.CSS.Commands.GetBackgroundColorsResult;
  };
  readonly "CSS.getComputedStyleForNode": {
    readonly params: Protocol.CSS.Commands.GetComputedStyleForNodeParams;
    readonly result: Protocol.CSS.Commands.GetComputedStyleForNodeResult;
  };
  readonly "CSS.resolveValues": {
    readonly params: Protocol.CSS.Commands.ResolveValuesParams;
    readonly result: Protocol.CSS.Commands.ResolveValuesResult;
  };
  readonly "CSS.getLonghandProperties": {
    readonly params: Protocol.CSS.Commands.GetLonghandPropertiesParams;
    readonly result: Protocol.CSS.Commands.GetLonghandPropertiesResult;
  };
  readonly "CSS.getInlineStylesForNode": {
    readonly params: Protocol.CSS.Commands.GetInlineStylesForNodeParams;
    readonly result: Protocol.CSS.Commands.GetInlineStylesForNodeResult;
  };
  readonly "CSS.getAnimatedStylesForNode": {
    readonly params: Protocol.CSS.Commands.GetAnimatedStylesForNodeParams;
    readonly result: Protocol.CSS.Commands.GetAnimatedStylesForNodeResult;
  };
  readonly "CSS.getMatchedStylesForNode": {
    readonly params: Protocol.CSS.Commands.GetMatchedStylesForNodeParams;
    readonly result: Protocol.CSS.Commands.GetMatchedStylesForNodeResult;
  };
  readonly "CSS.getEnvironmentVariables": {
    readonly params: Protocol.CSS.Commands.GetEnvironmentVariablesParams;
    readonly result: Protocol.CSS.Commands.GetEnvironmentVariablesResult;
  };
  readonly "CSS.getMediaQueries": {
    readonly params: Protocol.CSS.Commands.GetMediaQueriesParams;
    readonly result: Protocol.CSS.Commands.GetMediaQueriesResult;
  };
  readonly "CSS.getPlatformFontsForNode": {
    readonly params: Protocol.CSS.Commands.GetPlatformFontsForNodeParams;
    readonly result: Protocol.CSS.Commands.GetPlatformFontsForNodeResult;
  };
  readonly "CSS.getStyleSheetText": {
    readonly params: Protocol.CSS.Commands.GetStyleSheetTextParams;
    readonly result: Protocol.CSS.Commands.GetStyleSheetTextResult;
  };
  readonly "CSS.getLayersForNode": {
    readonly params: Protocol.CSS.Commands.GetLayersForNodeParams;
    readonly result: Protocol.CSS.Commands.GetLayersForNodeResult;
  };
  readonly "CSS.getLocationForSelector": {
    readonly params: Protocol.CSS.Commands.GetLocationForSelectorParams;
    readonly result: Protocol.CSS.Commands.GetLocationForSelectorResult;
  };
  readonly "CSS.trackComputedStyleUpdatesForNode": {
    readonly params: Protocol.CSS.Commands.TrackComputedStyleUpdatesForNodeParams;
    readonly result: Protocol.CSS.Commands.TrackComputedStyleUpdatesForNodeResult;
  };
  readonly "CSS.trackComputedStyleUpdates": {
    readonly params: Protocol.CSS.Commands.TrackComputedStyleUpdatesParams;
    readonly result: Protocol.CSS.Commands.TrackComputedStyleUpdatesResult;
  };
  readonly "CSS.takeComputedStyleUpdates": {
    readonly params: Protocol.CSS.Commands.TakeComputedStyleUpdatesParams;
    readonly result: Protocol.CSS.Commands.TakeComputedStyleUpdatesResult;
  };
  readonly "CSS.setEffectivePropertyValueForNode": {
    readonly params: Protocol.CSS.Commands.SetEffectivePropertyValueForNodeParams;
    readonly result: Protocol.CSS.Commands.SetEffectivePropertyValueForNodeResult;
  };
  readonly "CSS.setPropertyRulePropertyName": {
    readonly params: Protocol.CSS.Commands.SetPropertyRulePropertyNameParams;
    readonly result: Protocol.CSS.Commands.SetPropertyRulePropertyNameResult;
  };
  readonly "CSS.setKeyframeKey": {
    readonly params: Protocol.CSS.Commands.SetKeyframeKeyParams;
    readonly result: Protocol.CSS.Commands.SetKeyframeKeyResult;
  };
  readonly "CSS.setMediaText": {
    readonly params: Protocol.CSS.Commands.SetMediaTextParams;
    readonly result: Protocol.CSS.Commands.SetMediaTextResult;
  };
  readonly "CSS.setContainerQueryText": {
    readonly params: Protocol.CSS.Commands.SetContainerQueryTextParams;
    readonly result: Protocol.CSS.Commands.SetContainerQueryTextResult;
  };
  readonly "CSS.setContainerQueryConditionText": {
    readonly params: Protocol.CSS.Commands.SetContainerQueryConditionTextParams;
    readonly result: Protocol.CSS.Commands.SetContainerQueryConditionTextResult;
  };
  readonly "CSS.setSupportsText": {
    readonly params: Protocol.CSS.Commands.SetSupportsTextParams;
    readonly result: Protocol.CSS.Commands.SetSupportsTextResult;
  };
  readonly "CSS.setNavigationText": {
    readonly params: Protocol.CSS.Commands.SetNavigationTextParams;
    readonly result: Protocol.CSS.Commands.SetNavigationTextResult;
  };
  readonly "CSS.setScopeText": {
    readonly params: Protocol.CSS.Commands.SetScopeTextParams;
    readonly result: Protocol.CSS.Commands.SetScopeTextResult;
  };
  readonly "CSS.setRuleSelector": {
    readonly params: Protocol.CSS.Commands.SetRuleSelectorParams;
    readonly result: Protocol.CSS.Commands.SetRuleSelectorResult;
  };
  readonly "CSS.setStyleSheetText": {
    readonly params: Protocol.CSS.Commands.SetStyleSheetTextParams;
    readonly result: Protocol.CSS.Commands.SetStyleSheetTextResult;
  };
  readonly "CSS.setStyleTexts": {
    readonly params: Protocol.CSS.Commands.SetStyleTextsParams;
    readonly result: Protocol.CSS.Commands.SetStyleTextsResult;
  };
  readonly "CSS.startRuleUsageTracking": {
    readonly params: Protocol.CSS.Commands.StartRuleUsageTrackingParams;
    readonly result: Protocol.CSS.Commands.StartRuleUsageTrackingResult;
  };
  readonly "CSS.stopRuleUsageTracking": {
    readonly params: Protocol.CSS.Commands.StopRuleUsageTrackingParams;
    readonly result: Protocol.CSS.Commands.StopRuleUsageTrackingResult;
  };
  readonly "CSS.takeCoverageDelta": {
    readonly params: Protocol.CSS.Commands.TakeCoverageDeltaParams;
    readonly result: Protocol.CSS.Commands.TakeCoverageDeltaResult;
  };
  readonly "CSS.setLocalFontsEnabled": {
    readonly params: Protocol.CSS.Commands.SetLocalFontsEnabledParams;
    readonly result: Protocol.CSS.Commands.SetLocalFontsEnabledResult;
  };
  readonly "CacheStorage.deleteCache": {
    readonly params: Protocol.CacheStorage.Commands.DeleteCacheParams;
    readonly result: Protocol.CacheStorage.Commands.DeleteCacheResult;
  };
  readonly "CacheStorage.deleteEntry": {
    readonly params: Protocol.CacheStorage.Commands.DeleteEntryParams;
    readonly result: Protocol.CacheStorage.Commands.DeleteEntryResult;
  };
  readonly "CacheStorage.requestCacheNames": {
    readonly params: Protocol.CacheStorage.Commands.RequestCacheNamesParams;
    readonly result: Protocol.CacheStorage.Commands.RequestCacheNamesResult;
  };
  readonly "CacheStorage.requestCachedResponse": {
    readonly params: Protocol.CacheStorage.Commands.RequestCachedResponseParams;
    readonly result: Protocol.CacheStorage.Commands.RequestCachedResponseResult;
  };
  readonly "CacheStorage.requestEntries": {
    readonly params: Protocol.CacheStorage.Commands.RequestEntriesParams;
    readonly result: Protocol.CacheStorage.Commands.RequestEntriesResult;
  };
  readonly "Cast.enable": {
    readonly params: Protocol.Cast.Commands.EnableParams;
    readonly result: Protocol.Cast.Commands.EnableResult;
  };
  readonly "Cast.disable": {
    readonly params: Protocol.Cast.Commands.DisableParams;
    readonly result: Protocol.Cast.Commands.DisableResult;
  };
  readonly "Cast.setSinkToUse": {
    readonly params: Protocol.Cast.Commands.SetSinkToUseParams;
    readonly result: Protocol.Cast.Commands.SetSinkToUseResult;
  };
  readonly "Cast.startDesktopMirroring": {
    readonly params: Protocol.Cast.Commands.StartDesktopMirroringParams;
    readonly result: Protocol.Cast.Commands.StartDesktopMirroringResult;
  };
  readonly "Cast.startTabMirroring": {
    readonly params: Protocol.Cast.Commands.StartTabMirroringParams;
    readonly result: Protocol.Cast.Commands.StartTabMirroringResult;
  };
  readonly "Cast.stopCasting": {
    readonly params: Protocol.Cast.Commands.StopCastingParams;
    readonly result: Protocol.Cast.Commands.StopCastingResult;
  };
  readonly "CrashReportContext.getEntries": {
    readonly params: Protocol.CrashReportContext.Commands.GetEntriesParams;
    readonly result: Protocol.CrashReportContext.Commands.GetEntriesResult;
  };
  readonly "DOM.collectClassNamesFromSubtree": {
    readonly params: Protocol.DOM.Commands.CollectClassNamesFromSubtreeParams;
    readonly result: Protocol.DOM.Commands.CollectClassNamesFromSubtreeResult;
  };
  readonly "DOM.copyTo": {
    readonly params: Protocol.DOM.Commands.CopyToParams;
    readonly result: Protocol.DOM.Commands.CopyToResult;
  };
  readonly "DOM.describeNode": {
    readonly params: Protocol.DOM.Commands.DescribeNodeParams;
    readonly result: Protocol.DOM.Commands.DescribeNodeResult;
  };
  readonly "DOM.scrollIntoViewIfNeeded": {
    readonly params: Protocol.DOM.Commands.ScrollIntoViewIfNeededParams;
    readonly result: Protocol.DOM.Commands.ScrollIntoViewIfNeededResult;
  };
  readonly "DOM.disable": {
    readonly params: Protocol.DOM.Commands.DisableParams;
    readonly result: Protocol.DOM.Commands.DisableResult;
  };
  readonly "DOM.discardSearchResults": {
    readonly params: Protocol.DOM.Commands.DiscardSearchResultsParams;
    readonly result: Protocol.DOM.Commands.DiscardSearchResultsResult;
  };
  readonly "DOM.enable": {
    readonly params: Protocol.DOM.Commands.EnableParams;
    readonly result: Protocol.DOM.Commands.EnableResult;
  };
  readonly "DOM.focus": {
    readonly params: Protocol.DOM.Commands.FocusParams;
    readonly result: Protocol.DOM.Commands.FocusResult;
  };
  readonly "DOM.getAttributes": {
    readonly params: Protocol.DOM.Commands.GetAttributesParams;
    readonly result: Protocol.DOM.Commands.GetAttributesResult;
  };
  readonly "DOM.getBoxModel": {
    readonly params: Protocol.DOM.Commands.GetBoxModelParams;
    readonly result: Protocol.DOM.Commands.GetBoxModelResult;
  };
  readonly "DOM.getContentQuads": {
    readonly params: Protocol.DOM.Commands.GetContentQuadsParams;
    readonly result: Protocol.DOM.Commands.GetContentQuadsResult;
  };
  readonly "DOM.getDocument": {
    readonly params: Protocol.DOM.Commands.GetDocumentParams;
    readonly result: Protocol.DOM.Commands.GetDocumentResult;
  };
  readonly "DOM.getFlattenedDocument": {
    readonly params: Protocol.DOM.Commands.GetFlattenedDocumentParams;
    readonly result: Protocol.DOM.Commands.GetFlattenedDocumentResult;
  };
  readonly "DOM.getNodesForSubtreeByStyle": {
    readonly params: Protocol.DOM.Commands.GetNodesForSubtreeByStyleParams;
    readonly result: Protocol.DOM.Commands.GetNodesForSubtreeByStyleResult;
  };
  readonly "DOM.getNodeForLocation": {
    readonly params: Protocol.DOM.Commands.GetNodeForLocationParams;
    readonly result: Protocol.DOM.Commands.GetNodeForLocationResult;
  };
  readonly "DOM.getOuterHTML": {
    readonly params: Protocol.DOM.Commands.GetOuterHTMLParams;
    readonly result: Protocol.DOM.Commands.GetOuterHTMLResult;
  };
  readonly "DOM.getRelayoutBoundary": {
    readonly params: Protocol.DOM.Commands.GetRelayoutBoundaryParams;
    readonly result: Protocol.DOM.Commands.GetRelayoutBoundaryResult;
  };
  readonly "DOM.getSearchResults": {
    readonly params: Protocol.DOM.Commands.GetSearchResultsParams;
    readonly result: Protocol.DOM.Commands.GetSearchResultsResult;
  };
  readonly "DOM.hideHighlight": {
    readonly params: Protocol.DOM.Commands.HideHighlightParams;
    readonly result: Protocol.DOM.Commands.HideHighlightResult;
  };
  readonly "DOM.highlightNode": {
    readonly params: Protocol.DOM.Commands.HighlightNodeParams;
    readonly result: Protocol.DOM.Commands.HighlightNodeResult;
  };
  readonly "DOM.highlightRect": {
    readonly params: Protocol.DOM.Commands.HighlightRectParams;
    readonly result: Protocol.DOM.Commands.HighlightRectResult;
  };
  readonly "DOM.markUndoableState": {
    readonly params: Protocol.DOM.Commands.MarkUndoableStateParams;
    readonly result: Protocol.DOM.Commands.MarkUndoableStateResult;
  };
  readonly "DOM.moveTo": {
    readonly params: Protocol.DOM.Commands.MoveToParams;
    readonly result: Protocol.DOM.Commands.MoveToResult;
  };
  readonly "DOM.performSearch": {
    readonly params: Protocol.DOM.Commands.PerformSearchParams;
    readonly result: Protocol.DOM.Commands.PerformSearchResult;
  };
  readonly "DOM.pushNodeByPathToFrontend": {
    readonly params: Protocol.DOM.Commands.PushNodeByPathToFrontendParams;
    readonly result: Protocol.DOM.Commands.PushNodeByPathToFrontendResult;
  };
  readonly "DOM.pushNodesByBackendIdsToFrontend": {
    readonly params: Protocol.DOM.Commands.PushNodesByBackendIdsToFrontendParams;
    readonly result: Protocol.DOM.Commands.PushNodesByBackendIdsToFrontendResult;
  };
  readonly "DOM.querySelector": {
    readonly params: Protocol.DOM.Commands.QuerySelectorParams;
    readonly result: Protocol.DOM.Commands.QuerySelectorResult;
  };
  readonly "DOM.querySelectorAll": {
    readonly params: Protocol.DOM.Commands.QuerySelectorAllParams;
    readonly result: Protocol.DOM.Commands.QuerySelectorAllResult;
  };
  readonly "DOM.getTopLayerElements": {
    readonly params: Protocol.DOM.Commands.GetTopLayerElementsParams;
    readonly result: Protocol.DOM.Commands.GetTopLayerElementsResult;
  };
  readonly "DOM.getElementByRelation": {
    readonly params: Protocol.DOM.Commands.GetElementByRelationParams;
    readonly result: Protocol.DOM.Commands.GetElementByRelationResult;
  };
  readonly "DOM.redo": {
    readonly params: Protocol.DOM.Commands.RedoParams;
    readonly result: Protocol.DOM.Commands.RedoResult;
  };
  readonly "DOM.removeAttribute": {
    readonly params: Protocol.DOM.Commands.RemoveAttributeParams;
    readonly result: Protocol.DOM.Commands.RemoveAttributeResult;
  };
  readonly "DOM.removeNode": {
    readonly params: Protocol.DOM.Commands.RemoveNodeParams;
    readonly result: Protocol.DOM.Commands.RemoveNodeResult;
  };
  readonly "DOM.requestChildNodes": {
    readonly params: Protocol.DOM.Commands.RequestChildNodesParams;
    readonly result: Protocol.DOM.Commands.RequestChildNodesResult;
  };
  readonly "DOM.requestNode": {
    readonly params: Protocol.DOM.Commands.RequestNodeParams;
    readonly result: Protocol.DOM.Commands.RequestNodeResult;
  };
  readonly "DOM.resolveNode": {
    readonly params: Protocol.DOM.Commands.ResolveNodeParams;
    readonly result: Protocol.DOM.Commands.ResolveNodeResult;
  };
  readonly "DOM.setAttributeValue": {
    readonly params: Protocol.DOM.Commands.SetAttributeValueParams;
    readonly result: Protocol.DOM.Commands.SetAttributeValueResult;
  };
  readonly "DOM.setAttributesAsText": {
    readonly params: Protocol.DOM.Commands.SetAttributesAsTextParams;
    readonly result: Protocol.DOM.Commands.SetAttributesAsTextResult;
  };
  readonly "DOM.setFileInputFiles": {
    readonly params: Protocol.DOM.Commands.SetFileInputFilesParams;
    readonly result: Protocol.DOM.Commands.SetFileInputFilesResult;
  };
  readonly "DOM.setNodeStackTracesEnabled": {
    readonly params: Protocol.DOM.Commands.SetNodeStackTracesEnabledParams;
    readonly result: Protocol.DOM.Commands.SetNodeStackTracesEnabledResult;
  };
  readonly "DOM.getNodeStackTraces": {
    readonly params: Protocol.DOM.Commands.GetNodeStackTracesParams;
    readonly result: Protocol.DOM.Commands.GetNodeStackTracesResult;
  };
  readonly "DOM.getFileInfo": {
    readonly params: Protocol.DOM.Commands.GetFileInfoParams;
    readonly result: Protocol.DOM.Commands.GetFileInfoResult;
  };
  readonly "DOM.getDetachedDomNodes": {
    readonly params: Protocol.DOM.Commands.GetDetachedDomNodesParams;
    readonly result: Protocol.DOM.Commands.GetDetachedDomNodesResult;
  };
  readonly "DOM.setInspectedNode": {
    readonly params: Protocol.DOM.Commands.SetInspectedNodeParams;
    readonly result: Protocol.DOM.Commands.SetInspectedNodeResult;
  };
  readonly "DOM.setNodeName": {
    readonly params: Protocol.DOM.Commands.SetNodeNameParams;
    readonly result: Protocol.DOM.Commands.SetNodeNameResult;
  };
  readonly "DOM.setNodeValue": {
    readonly params: Protocol.DOM.Commands.SetNodeValueParams;
    readonly result: Protocol.DOM.Commands.SetNodeValueResult;
  };
  readonly "DOM.setOuterHTML": {
    readonly params: Protocol.DOM.Commands.SetOuterHTMLParams;
    readonly result: Protocol.DOM.Commands.SetOuterHTMLResult;
  };
  readonly "DOM.undo": {
    readonly params: Protocol.DOM.Commands.UndoParams;
    readonly result: Protocol.DOM.Commands.UndoResult;
  };
  readonly "DOM.getFrameOwner": {
    readonly params: Protocol.DOM.Commands.GetFrameOwnerParams;
    readonly result: Protocol.DOM.Commands.GetFrameOwnerResult;
  };
  readonly "DOM.getContainerForNode": {
    readonly params: Protocol.DOM.Commands.GetContainerForNodeParams;
    readonly result: Protocol.DOM.Commands.GetContainerForNodeResult;
  };
  readonly "DOM.getQueryingDescendantsForContainer": {
    readonly params: Protocol.DOM.Commands.GetQueryingDescendantsForContainerParams;
    readonly result: Protocol.DOM.Commands.GetQueryingDescendantsForContainerResult;
  };
  readonly "DOM.getAnchorElement": {
    readonly params: Protocol.DOM.Commands.GetAnchorElementParams;
    readonly result: Protocol.DOM.Commands.GetAnchorElementResult;
  };
  readonly "DOM.forceShowPopover": {
    readonly params: Protocol.DOM.Commands.ForceShowPopoverParams;
    readonly result: Protocol.DOM.Commands.ForceShowPopoverResult;
  };
  readonly "DOM.forceShowInterest": {
    readonly params: Protocol.DOM.Commands.ForceShowInterestParams;
    readonly result: Protocol.DOM.Commands.ForceShowInterestResult;
  };
  readonly "DOMDebugger.getEventListeners": {
    readonly params: Protocol.DOMDebugger.Commands.GetEventListenersParams;
    readonly result: Protocol.DOMDebugger.Commands.GetEventListenersResult;
  };
  readonly "DOMDebugger.removeDOMBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.RemoveDOMBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.RemoveDOMBreakpointResult;
  };
  readonly "DOMDebugger.removeEventListenerBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.RemoveEventListenerBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.RemoveEventListenerBreakpointResult;
  };
  readonly "DOMDebugger.removeInstrumentationBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.RemoveInstrumentationBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.RemoveInstrumentationBreakpointResult;
  };
  readonly "DOMDebugger.removeXHRBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.RemoveXHRBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.RemoveXHRBreakpointResult;
  };
  readonly "DOMDebugger.setBreakOnCSPViolation": {
    readonly params: Protocol.DOMDebugger.Commands.SetBreakOnCSPViolationParams;
    readonly result: Protocol.DOMDebugger.Commands.SetBreakOnCSPViolationResult;
  };
  readonly "DOMDebugger.setDOMBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.SetDOMBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.SetDOMBreakpointResult;
  };
  readonly "DOMDebugger.setEventListenerBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.SetEventListenerBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.SetEventListenerBreakpointResult;
  };
  readonly "DOMDebugger.setInstrumentationBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.SetInstrumentationBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.SetInstrumentationBreakpointResult;
  };
  readonly "DOMDebugger.setXHRBreakpoint": {
    readonly params: Protocol.DOMDebugger.Commands.SetXHRBreakpointParams;
    readonly result: Protocol.DOMDebugger.Commands.SetXHRBreakpointResult;
  };
  readonly "DOMSnapshot.disable": {
    readonly params: Protocol.DOMSnapshot.Commands.DisableParams;
    readonly result: Protocol.DOMSnapshot.Commands.DisableResult;
  };
  readonly "DOMSnapshot.enable": {
    readonly params: Protocol.DOMSnapshot.Commands.EnableParams;
    readonly result: Protocol.DOMSnapshot.Commands.EnableResult;
  };
  readonly "DOMSnapshot.getSnapshot": {
    readonly params: Protocol.DOMSnapshot.Commands.GetSnapshotParams;
    readonly result: Protocol.DOMSnapshot.Commands.GetSnapshotResult;
  };
  readonly "DOMSnapshot.captureSnapshot": {
    readonly params: Protocol.DOMSnapshot.Commands.CaptureSnapshotParams;
    readonly result: Protocol.DOMSnapshot.Commands.CaptureSnapshotResult;
  };
  readonly "DOMStorage.clear": {
    readonly params: Protocol.DOMStorage.Commands.ClearParams;
    readonly result: Protocol.DOMStorage.Commands.ClearResult;
  };
  readonly "DOMStorage.disable": {
    readonly params: Protocol.DOMStorage.Commands.DisableParams;
    readonly result: Protocol.DOMStorage.Commands.DisableResult;
  };
  readonly "DOMStorage.enable": {
    readonly params: Protocol.DOMStorage.Commands.EnableParams;
    readonly result: Protocol.DOMStorage.Commands.EnableResult;
  };
  readonly "DOMStorage.getDOMStorageItems": {
    readonly params: Protocol.DOMStorage.Commands.GetDOMStorageItemsParams;
    readonly result: Protocol.DOMStorage.Commands.GetDOMStorageItemsResult;
  };
  readonly "DOMStorage.removeDOMStorageItem": {
    readonly params: Protocol.DOMStorage.Commands.RemoveDOMStorageItemParams;
    readonly result: Protocol.DOMStorage.Commands.RemoveDOMStorageItemResult;
  };
  readonly "DOMStorage.setDOMStorageItem": {
    readonly params: Protocol.DOMStorage.Commands.SetDOMStorageItemParams;
    readonly result: Protocol.DOMStorage.Commands.SetDOMStorageItemResult;
  };
  readonly "DeviceAccess.enable": {
    readonly params: Protocol.DeviceAccess.Commands.EnableParams;
    readonly result: Protocol.DeviceAccess.Commands.EnableResult;
  };
  readonly "DeviceAccess.disable": {
    readonly params: Protocol.DeviceAccess.Commands.DisableParams;
    readonly result: Protocol.DeviceAccess.Commands.DisableResult;
  };
  readonly "DeviceAccess.selectPrompt": {
    readonly params: Protocol.DeviceAccess.Commands.SelectPromptParams;
    readonly result: Protocol.DeviceAccess.Commands.SelectPromptResult;
  };
  readonly "DeviceAccess.cancelPrompt": {
    readonly params: Protocol.DeviceAccess.Commands.CancelPromptParams;
    readonly result: Protocol.DeviceAccess.Commands.CancelPromptResult;
  };
  readonly "DeviceOrientation.clearDeviceOrientationOverride": {
    readonly params: Protocol.DeviceOrientation.Commands.ClearDeviceOrientationOverrideParams;
    readonly result: Protocol.DeviceOrientation.Commands.ClearDeviceOrientationOverrideResult;
  };
  readonly "DeviceOrientation.setDeviceOrientationOverride": {
    readonly params: Protocol.DeviceOrientation.Commands.SetDeviceOrientationOverrideParams;
    readonly result: Protocol.DeviceOrientation.Commands.SetDeviceOrientationOverrideResult;
  };
  readonly "DigitalCredentials.setVirtualWalletBehavior": {
    readonly params: Protocol.DigitalCredentials.Commands.SetVirtualWalletBehaviorParams;
    readonly result: Protocol.DigitalCredentials.Commands.SetVirtualWalletBehaviorResult;
  };
  readonly "Emulation.canEmulate": {
    readonly params: Protocol.Emulation.Commands.CanEmulateParams;
    readonly result: Protocol.Emulation.Commands.CanEmulateResult;
  };
  readonly "Emulation.clearDeviceMetricsOverride": {
    readonly params: Protocol.Emulation.Commands.ClearDeviceMetricsOverrideParams;
    readonly result: Protocol.Emulation.Commands.ClearDeviceMetricsOverrideResult;
  };
  readonly "Emulation.clearGeolocationOverride": {
    readonly params: Protocol.Emulation.Commands.ClearGeolocationOverrideParams;
    readonly result: Protocol.Emulation.Commands.ClearGeolocationOverrideResult;
  };
  readonly "Emulation.resetPageScaleFactor": {
    readonly params: Protocol.Emulation.Commands.ResetPageScaleFactorParams;
    readonly result: Protocol.Emulation.Commands.ResetPageScaleFactorResult;
  };
  readonly "Emulation.setFocusEmulationEnabled": {
    readonly params: Protocol.Emulation.Commands.SetFocusEmulationEnabledParams;
    readonly result: Protocol.Emulation.Commands.SetFocusEmulationEnabledResult;
  };
  readonly "Emulation.setAutoDarkModeOverride": {
    readonly params: Protocol.Emulation.Commands.SetAutoDarkModeOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetAutoDarkModeOverrideResult;
  };
  readonly "Emulation.setCPUThrottlingRate": {
    readonly params: Protocol.Emulation.Commands.SetCPUThrottlingRateParams;
    readonly result: Protocol.Emulation.Commands.SetCPUThrottlingRateResult;
  };
  readonly "Emulation.setDefaultBackgroundColorOverride": {
    readonly params: Protocol.Emulation.Commands.SetDefaultBackgroundColorOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetDefaultBackgroundColorOverrideResult;
  };
  readonly "Emulation.setSafeAreaInsetsOverride": {
    readonly params: Protocol.Emulation.Commands.SetSafeAreaInsetsOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetSafeAreaInsetsOverrideResult;
  };
  readonly "Emulation.setVirtualKeyboardGeometryOverride": {
    readonly params: Protocol.Emulation.Commands.SetVirtualKeyboardGeometryOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetVirtualKeyboardGeometryOverrideResult;
  };
  readonly "Emulation.setDeviceMetricsOverride": {
    readonly params: Protocol.Emulation.Commands.SetDeviceMetricsOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetDeviceMetricsOverrideResult;
  };
  readonly "Emulation.setDevicePostureOverride": {
    readonly params: Protocol.Emulation.Commands.SetDevicePostureOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetDevicePostureOverrideResult;
  };
  readonly "Emulation.clearDevicePostureOverride": {
    readonly params: Protocol.Emulation.Commands.ClearDevicePostureOverrideParams;
    readonly result: Protocol.Emulation.Commands.ClearDevicePostureOverrideResult;
  };
  readonly "Emulation.setDisplayFeaturesOverride": {
    readonly params: Protocol.Emulation.Commands.SetDisplayFeaturesOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetDisplayFeaturesOverrideResult;
  };
  readonly "Emulation.clearDisplayFeaturesOverride": {
    readonly params: Protocol.Emulation.Commands.ClearDisplayFeaturesOverrideParams;
    readonly result: Protocol.Emulation.Commands.ClearDisplayFeaturesOverrideResult;
  };
  readonly "Emulation.setScrollbarsHidden": {
    readonly params: Protocol.Emulation.Commands.SetScrollbarsHiddenParams;
    readonly result: Protocol.Emulation.Commands.SetScrollbarsHiddenResult;
  };
  readonly "Emulation.setDocumentCookieDisabled": {
    readonly params: Protocol.Emulation.Commands.SetDocumentCookieDisabledParams;
    readonly result: Protocol.Emulation.Commands.SetDocumentCookieDisabledResult;
  };
  readonly "Emulation.setEmitTouchEventsForMouse": {
    readonly params: Protocol.Emulation.Commands.SetEmitTouchEventsForMouseParams;
    readonly result: Protocol.Emulation.Commands.SetEmitTouchEventsForMouseResult;
  };
  readonly "Emulation.setEmulatedMedia": {
    readonly params: Protocol.Emulation.Commands.SetEmulatedMediaParams;
    readonly result: Protocol.Emulation.Commands.SetEmulatedMediaResult;
  };
  readonly "Emulation.setEmulatedVisionDeficiency": {
    readonly params: Protocol.Emulation.Commands.SetEmulatedVisionDeficiencyParams;
    readonly result: Protocol.Emulation.Commands.SetEmulatedVisionDeficiencyResult;
  };
  readonly "Emulation.setEmulatedOSTextScale": {
    readonly params: Protocol.Emulation.Commands.SetEmulatedOSTextScaleParams;
    readonly result: Protocol.Emulation.Commands.SetEmulatedOSTextScaleResult;
  };
  readonly "Emulation.setGeolocationOverride": {
    readonly params: Protocol.Emulation.Commands.SetGeolocationOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetGeolocationOverrideResult;
  };
  readonly "Emulation.getOverriddenSensorInformation": {
    readonly params: Protocol.Emulation.Commands.GetOverriddenSensorInformationParams;
    readonly result: Protocol.Emulation.Commands.GetOverriddenSensorInformationResult;
  };
  readonly "Emulation.setSensorOverrideEnabled": {
    readonly params: Protocol.Emulation.Commands.SetSensorOverrideEnabledParams;
    readonly result: Protocol.Emulation.Commands.SetSensorOverrideEnabledResult;
  };
  readonly "Emulation.setSensorOverrideReadings": {
    readonly params: Protocol.Emulation.Commands.SetSensorOverrideReadingsParams;
    readonly result: Protocol.Emulation.Commands.SetSensorOverrideReadingsResult;
  };
  readonly "Emulation.setPressureSourceOverrideEnabled": {
    readonly params: Protocol.Emulation.Commands.SetPressureSourceOverrideEnabledParams;
    readonly result: Protocol.Emulation.Commands.SetPressureSourceOverrideEnabledResult;
  };
  readonly "Emulation.setPressureStateOverride": {
    readonly params: Protocol.Emulation.Commands.SetPressureStateOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetPressureStateOverrideResult;
  };
  readonly "Emulation.setIdleOverride": {
    readonly params: Protocol.Emulation.Commands.SetIdleOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetIdleOverrideResult;
  };
  readonly "Emulation.clearIdleOverride": {
    readonly params: Protocol.Emulation.Commands.ClearIdleOverrideParams;
    readonly result: Protocol.Emulation.Commands.ClearIdleOverrideResult;
  };
  readonly "Emulation.setNavigatorOverrides": {
    readonly params: Protocol.Emulation.Commands.SetNavigatorOverridesParams;
    readonly result: Protocol.Emulation.Commands.SetNavigatorOverridesResult;
  };
  readonly "Emulation.setPageScaleFactor": {
    readonly params: Protocol.Emulation.Commands.SetPageScaleFactorParams;
    readonly result: Protocol.Emulation.Commands.SetPageScaleFactorResult;
  };
  readonly "Emulation.setScriptExecutionDisabled": {
    readonly params: Protocol.Emulation.Commands.SetScriptExecutionDisabledParams;
    readonly result: Protocol.Emulation.Commands.SetScriptExecutionDisabledResult;
  };
  readonly "Emulation.setTouchEmulationEnabled": {
    readonly params: Protocol.Emulation.Commands.SetTouchEmulationEnabledParams;
    readonly result: Protocol.Emulation.Commands.SetTouchEmulationEnabledResult;
  };
  readonly "Emulation.setVirtualTimePolicy": {
    readonly params: Protocol.Emulation.Commands.SetVirtualTimePolicyParams;
    readonly result: Protocol.Emulation.Commands.SetVirtualTimePolicyResult;
  };
  readonly "Emulation.setLocaleOverride": {
    readonly params: Protocol.Emulation.Commands.SetLocaleOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetLocaleOverrideResult;
  };
  readonly "Emulation.setTimezoneOverride": {
    readonly params: Protocol.Emulation.Commands.SetTimezoneOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetTimezoneOverrideResult;
  };
  readonly "Emulation.setVisibleSize": {
    readonly params: Protocol.Emulation.Commands.SetVisibleSizeParams;
    readonly result: Protocol.Emulation.Commands.SetVisibleSizeResult;
  };
  readonly "Emulation.setDisabledImageTypes": {
    readonly params: Protocol.Emulation.Commands.SetDisabledImageTypesParams;
    readonly result: Protocol.Emulation.Commands.SetDisabledImageTypesResult;
  };
  readonly "Emulation.setDataSaverOverride": {
    readonly params: Protocol.Emulation.Commands.SetDataSaverOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetDataSaverOverrideResult;
  };
  readonly "Emulation.setHardwareConcurrencyOverride": {
    readonly params: Protocol.Emulation.Commands.SetHardwareConcurrencyOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetHardwareConcurrencyOverrideResult;
  };
  readonly "Emulation.setUserAgentOverride": {
    readonly params: Protocol.Emulation.Commands.SetUserAgentOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetUserAgentOverrideResult;
  };
  readonly "Emulation.setAutomationOverride": {
    readonly params: Protocol.Emulation.Commands.SetAutomationOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetAutomationOverrideResult;
  };
  readonly "Emulation.setSmallViewportHeightDifferenceOverride": {
    readonly params: Protocol.Emulation.Commands.SetSmallViewportHeightDifferenceOverrideParams;
    readonly result: Protocol.Emulation.Commands.SetSmallViewportHeightDifferenceOverrideResult;
  };
  readonly "Emulation.getScreenInfos": {
    readonly params: Protocol.Emulation.Commands.GetScreenInfosParams;
    readonly result: Protocol.Emulation.Commands.GetScreenInfosResult;
  };
  readonly "Emulation.addScreen": {
    readonly params: Protocol.Emulation.Commands.AddScreenParams;
    readonly result: Protocol.Emulation.Commands.AddScreenResult;
  };
  readonly "Emulation.updateScreen": {
    readonly params: Protocol.Emulation.Commands.UpdateScreenParams;
    readonly result: Protocol.Emulation.Commands.UpdateScreenResult;
  };
  readonly "Emulation.removeScreen": {
    readonly params: Protocol.Emulation.Commands.RemoveScreenParams;
    readonly result: Protocol.Emulation.Commands.RemoveScreenResult;
  };
  readonly "Emulation.setPrimaryScreen": {
    readonly params: Protocol.Emulation.Commands.SetPrimaryScreenParams;
    readonly result: Protocol.Emulation.Commands.SetPrimaryScreenResult;
  };
  readonly "EventBreakpoints.setInstrumentationBreakpoint": {
    readonly params: Protocol.EventBreakpoints.Commands.SetInstrumentationBreakpointParams;
    readonly result: Protocol.EventBreakpoints.Commands.SetInstrumentationBreakpointResult;
  };
  readonly "EventBreakpoints.removeInstrumentationBreakpoint": {
    readonly params: Protocol.EventBreakpoints.Commands.RemoveInstrumentationBreakpointParams;
    readonly result: Protocol.EventBreakpoints.Commands.RemoveInstrumentationBreakpointResult;
  };
  readonly "EventBreakpoints.disable": {
    readonly params: Protocol.EventBreakpoints.Commands.DisableParams;
    readonly result: Protocol.EventBreakpoints.Commands.DisableResult;
  };
  readonly "Extensions.triggerAction": {
    readonly params: Protocol.Extensions.Commands.TriggerActionParams;
    readonly result: Protocol.Extensions.Commands.TriggerActionResult;
  };
  readonly "Extensions.loadUnpacked": {
    readonly params: Protocol.Extensions.Commands.LoadUnpackedParams;
    readonly result: Protocol.Extensions.Commands.LoadUnpackedResult;
  };
  readonly "Extensions.getExtensions": {
    readonly params: Protocol.Extensions.Commands.GetExtensionsParams;
    readonly result: Protocol.Extensions.Commands.GetExtensionsResult;
  };
  readonly "Extensions.uninstall": {
    readonly params: Protocol.Extensions.Commands.UninstallParams;
    readonly result: Protocol.Extensions.Commands.UninstallResult;
  };
  readonly "Extensions.getStorageItems": {
    readonly params: Protocol.Extensions.Commands.GetStorageItemsParams;
    readonly result: Protocol.Extensions.Commands.GetStorageItemsResult;
  };
  readonly "Extensions.removeStorageItems": {
    readonly params: Protocol.Extensions.Commands.RemoveStorageItemsParams;
    readonly result: Protocol.Extensions.Commands.RemoveStorageItemsResult;
  };
  readonly "Extensions.clearStorageItems": {
    readonly params: Protocol.Extensions.Commands.ClearStorageItemsParams;
    readonly result: Protocol.Extensions.Commands.ClearStorageItemsResult;
  };
  readonly "Extensions.setStorageItems": {
    readonly params: Protocol.Extensions.Commands.SetStorageItemsParams;
    readonly result: Protocol.Extensions.Commands.SetStorageItemsResult;
  };
  readonly "FedCm.enable": {
    readonly params: Protocol.FedCm.Commands.EnableParams;
    readonly result: Protocol.FedCm.Commands.EnableResult;
  };
  readonly "FedCm.disable": {
    readonly params: Protocol.FedCm.Commands.DisableParams;
    readonly result: Protocol.FedCm.Commands.DisableResult;
  };
  readonly "FedCm.selectAccount": {
    readonly params: Protocol.FedCm.Commands.SelectAccountParams;
    readonly result: Protocol.FedCm.Commands.SelectAccountResult;
  };
  readonly "FedCm.clickDialogButton": {
    readonly params: Protocol.FedCm.Commands.ClickDialogButtonParams;
    readonly result: Protocol.FedCm.Commands.ClickDialogButtonResult;
  };
  readonly "FedCm.openUrl": {
    readonly params: Protocol.FedCm.Commands.OpenUrlParams;
    readonly result: Protocol.FedCm.Commands.OpenUrlResult;
  };
  readonly "FedCm.dismissDialog": {
    readonly params: Protocol.FedCm.Commands.DismissDialogParams;
    readonly result: Protocol.FedCm.Commands.DismissDialogResult;
  };
  readonly "FedCm.resetCooldown": {
    readonly params: Protocol.FedCm.Commands.ResetCooldownParams;
    readonly result: Protocol.FedCm.Commands.ResetCooldownResult;
  };
  readonly "Fetch.disable": {
    readonly params: Protocol.Fetch.Commands.DisableParams;
    readonly result: Protocol.Fetch.Commands.DisableResult;
  };
  readonly "Fetch.enable": {
    readonly params: Protocol.Fetch.Commands.EnableParams;
    readonly result: Protocol.Fetch.Commands.EnableResult;
  };
  readonly "Fetch.failRequest": {
    readonly params: Protocol.Fetch.Commands.FailRequestParams;
    readonly result: Protocol.Fetch.Commands.FailRequestResult;
  };
  readonly "Fetch.fulfillRequest": {
    readonly params: Protocol.Fetch.Commands.FulfillRequestParams;
    readonly result: Protocol.Fetch.Commands.FulfillRequestResult;
  };
  readonly "Fetch.continueRequest": {
    readonly params: Protocol.Fetch.Commands.ContinueRequestParams;
    readonly result: Protocol.Fetch.Commands.ContinueRequestResult;
  };
  readonly "Fetch.continueWithAuth": {
    readonly params: Protocol.Fetch.Commands.ContinueWithAuthParams;
    readonly result: Protocol.Fetch.Commands.ContinueWithAuthResult;
  };
  readonly "Fetch.continueResponse": {
    readonly params: Protocol.Fetch.Commands.ContinueResponseParams;
    readonly result: Protocol.Fetch.Commands.ContinueResponseResult;
  };
  readonly "Fetch.getResponseBody": {
    readonly params: Protocol.Fetch.Commands.GetResponseBodyParams;
    readonly result: Protocol.Fetch.Commands.GetResponseBodyResult;
  };
  readonly "Fetch.takeResponseBodyAsStream": {
    readonly params: Protocol.Fetch.Commands.TakeResponseBodyAsStreamParams;
    readonly result: Protocol.Fetch.Commands.TakeResponseBodyAsStreamResult;
  };
  readonly "FileSystem.getDirectory": {
    readonly params: Protocol.FileSystem.Commands.GetDirectoryParams;
    readonly result: Protocol.FileSystem.Commands.GetDirectoryResult;
  };
  readonly "HeadlessExperimental.beginFrame": {
    readonly params: Protocol.HeadlessExperimental.Commands.BeginFrameParams;
    readonly result: Protocol.HeadlessExperimental.Commands.BeginFrameResult;
  };
  readonly "HeadlessExperimental.disable": {
    readonly params: Protocol.HeadlessExperimental.Commands.DisableParams;
    readonly result: Protocol.HeadlessExperimental.Commands.DisableResult;
  };
  readonly "HeadlessExperimental.enable": {
    readonly params: Protocol.HeadlessExperimental.Commands.EnableParams;
    readonly result: Protocol.HeadlessExperimental.Commands.EnableResult;
  };
  readonly "IO.close": {
    readonly params: Protocol.IO.Commands.CloseParams;
    readonly result: Protocol.IO.Commands.CloseResult;
  };
  readonly "IO.read": {
    readonly params: Protocol.IO.Commands.ReadParams;
    readonly result: Protocol.IO.Commands.ReadResult;
  };
  readonly "IO.resolveBlob": {
    readonly params: Protocol.IO.Commands.ResolveBlobParams;
    readonly result: Protocol.IO.Commands.ResolveBlobResult;
  };
  readonly "IndexedDB.clearObjectStore": {
    readonly params: Protocol.IndexedDB.Commands.ClearObjectStoreParams;
    readonly result: Protocol.IndexedDB.Commands.ClearObjectStoreResult;
  };
  readonly "IndexedDB.deleteDatabase": {
    readonly params: Protocol.IndexedDB.Commands.DeleteDatabaseParams;
    readonly result: Protocol.IndexedDB.Commands.DeleteDatabaseResult;
  };
  readonly "IndexedDB.deleteObjectStoreEntries": {
    readonly params: Protocol.IndexedDB.Commands.DeleteObjectStoreEntriesParams;
    readonly result: Protocol.IndexedDB.Commands.DeleteObjectStoreEntriesResult;
  };
  readonly "IndexedDB.disable": {
    readonly params: Protocol.IndexedDB.Commands.DisableParams;
    readonly result: Protocol.IndexedDB.Commands.DisableResult;
  };
  readonly "IndexedDB.enable": {
    readonly params: Protocol.IndexedDB.Commands.EnableParams;
    readonly result: Protocol.IndexedDB.Commands.EnableResult;
  };
  readonly "IndexedDB.requestData": {
    readonly params: Protocol.IndexedDB.Commands.RequestDataParams;
    readonly result: Protocol.IndexedDB.Commands.RequestDataResult;
  };
  readonly "IndexedDB.getMetadata": {
    readonly params: Protocol.IndexedDB.Commands.GetMetadataParams;
    readonly result: Protocol.IndexedDB.Commands.GetMetadataResult;
  };
  readonly "IndexedDB.requestDatabase": {
    readonly params: Protocol.IndexedDB.Commands.RequestDatabaseParams;
    readonly result: Protocol.IndexedDB.Commands.RequestDatabaseResult;
  };
  readonly "IndexedDB.requestDatabaseNames": {
    readonly params: Protocol.IndexedDB.Commands.RequestDatabaseNamesParams;
    readonly result: Protocol.IndexedDB.Commands.RequestDatabaseNamesResult;
  };
  readonly "Input.dispatchDragEvent": {
    readonly params: Protocol.Input.Commands.DispatchDragEventParams;
    readonly result: Protocol.Input.Commands.DispatchDragEventResult;
  };
  readonly "Input.dispatchKeyEvent": {
    readonly params: Protocol.Input.Commands.DispatchKeyEventParams;
    readonly result: Protocol.Input.Commands.DispatchKeyEventResult;
  };
  readonly "Input.insertText": {
    readonly params: Protocol.Input.Commands.InsertTextParams;
    readonly result: Protocol.Input.Commands.InsertTextResult;
  };
  readonly "Input.imeSetComposition": {
    readonly params: Protocol.Input.Commands.ImeSetCompositionParams;
    readonly result: Protocol.Input.Commands.ImeSetCompositionResult;
  };
  readonly "Input.dispatchMouseEvent": {
    readonly params: Protocol.Input.Commands.DispatchMouseEventParams;
    readonly result: Protocol.Input.Commands.DispatchMouseEventResult;
  };
  readonly "Input.dispatchTouchEvent": {
    readonly params: Protocol.Input.Commands.DispatchTouchEventParams;
    readonly result: Protocol.Input.Commands.DispatchTouchEventResult;
  };
  readonly "Input.cancelDragging": {
    readonly params: Protocol.Input.Commands.CancelDraggingParams;
    readonly result: Protocol.Input.Commands.CancelDraggingResult;
  };
  readonly "Input.emulateTouchFromMouseEvent": {
    readonly params: Protocol.Input.Commands.EmulateTouchFromMouseEventParams;
    readonly result: Protocol.Input.Commands.EmulateTouchFromMouseEventResult;
  };
  readonly "Input.setIgnoreInputEvents": {
    readonly params: Protocol.Input.Commands.SetIgnoreInputEventsParams;
    readonly result: Protocol.Input.Commands.SetIgnoreInputEventsResult;
  };
  readonly "Input.setInterceptDrags": {
    readonly params: Protocol.Input.Commands.SetInterceptDragsParams;
    readonly result: Protocol.Input.Commands.SetInterceptDragsResult;
  };
  readonly "Input.synthesizePinchGesture": {
    readonly params: Protocol.Input.Commands.SynthesizePinchGestureParams;
    readonly result: Protocol.Input.Commands.SynthesizePinchGestureResult;
  };
  readonly "Input.synthesizeScrollGesture": {
    readonly params: Protocol.Input.Commands.SynthesizeScrollGestureParams;
    readonly result: Protocol.Input.Commands.SynthesizeScrollGestureResult;
  };
  readonly "Input.synthesizeTapGesture": {
    readonly params: Protocol.Input.Commands.SynthesizeTapGestureParams;
    readonly result: Protocol.Input.Commands.SynthesizeTapGestureResult;
  };
  readonly "Inspector.disable": {
    readonly params: Protocol.Inspector.Commands.DisableParams;
    readonly result: Protocol.Inspector.Commands.DisableResult;
  };
  readonly "Inspector.enable": {
    readonly params: Protocol.Inspector.Commands.EnableParams;
    readonly result: Protocol.Inspector.Commands.EnableResult;
  };
  readonly "LayerTree.compositingReasons": {
    readonly params: Protocol.LayerTree.Commands.CompositingReasonsParams;
    readonly result: Protocol.LayerTree.Commands.CompositingReasonsResult;
  };
  readonly "LayerTree.disable": {
    readonly params: Protocol.LayerTree.Commands.DisableParams;
    readonly result: Protocol.LayerTree.Commands.DisableResult;
  };
  readonly "LayerTree.enable": {
    readonly params: Protocol.LayerTree.Commands.EnableParams;
    readonly result: Protocol.LayerTree.Commands.EnableResult;
  };
  readonly "LayerTree.loadSnapshot": {
    readonly params: Protocol.LayerTree.Commands.LoadSnapshotParams;
    readonly result: Protocol.LayerTree.Commands.LoadSnapshotResult;
  };
  readonly "LayerTree.makeSnapshot": {
    readonly params: Protocol.LayerTree.Commands.MakeSnapshotParams;
    readonly result: Protocol.LayerTree.Commands.MakeSnapshotResult;
  };
  readonly "LayerTree.profileSnapshot": {
    readonly params: Protocol.LayerTree.Commands.ProfileSnapshotParams;
    readonly result: Protocol.LayerTree.Commands.ProfileSnapshotResult;
  };
  readonly "LayerTree.releaseSnapshot": {
    readonly params: Protocol.LayerTree.Commands.ReleaseSnapshotParams;
    readonly result: Protocol.LayerTree.Commands.ReleaseSnapshotResult;
  };
  readonly "LayerTree.replaySnapshot": {
    readonly params: Protocol.LayerTree.Commands.ReplaySnapshotParams;
    readonly result: Protocol.LayerTree.Commands.ReplaySnapshotResult;
  };
  readonly "LayerTree.snapshotCommandLog": {
    readonly params: Protocol.LayerTree.Commands.SnapshotCommandLogParams;
    readonly result: Protocol.LayerTree.Commands.SnapshotCommandLogResult;
  };
  readonly "Log.clear": {
    readonly params: Protocol.Log.Commands.ClearParams;
    readonly result: Protocol.Log.Commands.ClearResult;
  };
  readonly "Log.disable": {
    readonly params: Protocol.Log.Commands.DisableParams;
    readonly result: Protocol.Log.Commands.DisableResult;
  };
  readonly "Log.enable": {
    readonly params: Protocol.Log.Commands.EnableParams;
    readonly result: Protocol.Log.Commands.EnableResult;
  };
  readonly "Log.startViolationsReport": {
    readonly params: Protocol.Log.Commands.StartViolationsReportParams;
    readonly result: Protocol.Log.Commands.StartViolationsReportResult;
  };
  readonly "Log.stopViolationsReport": {
    readonly params: Protocol.Log.Commands.StopViolationsReportParams;
    readonly result: Protocol.Log.Commands.StopViolationsReportResult;
  };
  readonly "Media.enable": {
    readonly params: Protocol.Media.Commands.EnableParams;
    readonly result: Protocol.Media.Commands.EnableResult;
  };
  readonly "Media.disable": {
    readonly params: Protocol.Media.Commands.DisableParams;
    readonly result: Protocol.Media.Commands.DisableResult;
  };
  readonly "Memory.getDOMCounters": {
    readonly params: Protocol.Memory.Commands.GetDOMCountersParams;
    readonly result: Protocol.Memory.Commands.GetDOMCountersResult;
  };
  readonly "Memory.getDOMCountersForLeakDetection": {
    readonly params: Protocol.Memory.Commands.GetDOMCountersForLeakDetectionParams;
    readonly result: Protocol.Memory.Commands.GetDOMCountersForLeakDetectionResult;
  };
  readonly "Memory.prepareForLeakDetection": {
    readonly params: Protocol.Memory.Commands.PrepareForLeakDetectionParams;
    readonly result: Protocol.Memory.Commands.PrepareForLeakDetectionResult;
  };
  readonly "Memory.forciblyPurgeJavaScriptMemory": {
    readonly params: Protocol.Memory.Commands.ForciblyPurgeJavaScriptMemoryParams;
    readonly result: Protocol.Memory.Commands.ForciblyPurgeJavaScriptMemoryResult;
  };
  readonly "Memory.setPressureNotificationsSuppressed": {
    readonly params: Protocol.Memory.Commands.SetPressureNotificationsSuppressedParams;
    readonly result: Protocol.Memory.Commands.SetPressureNotificationsSuppressedResult;
  };
  readonly "Memory.simulatePressureNotification": {
    readonly params: Protocol.Memory.Commands.SimulatePressureNotificationParams;
    readonly result: Protocol.Memory.Commands.SimulatePressureNotificationResult;
  };
  readonly "Memory.startSampling": {
    readonly params: Protocol.Memory.Commands.StartSamplingParams;
    readonly result: Protocol.Memory.Commands.StartSamplingResult;
  };
  readonly "Memory.stopSampling": {
    readonly params: Protocol.Memory.Commands.StopSamplingParams;
    readonly result: Protocol.Memory.Commands.StopSamplingResult;
  };
  readonly "Memory.getAllTimeSamplingProfile": {
    readonly params: Protocol.Memory.Commands.GetAllTimeSamplingProfileParams;
    readonly result: Protocol.Memory.Commands.GetAllTimeSamplingProfileResult;
  };
  readonly "Memory.getBrowserSamplingProfile": {
    readonly params: Protocol.Memory.Commands.GetBrowserSamplingProfileParams;
    readonly result: Protocol.Memory.Commands.GetBrowserSamplingProfileResult;
  };
  readonly "Memory.getSamplingProfile": {
    readonly params: Protocol.Memory.Commands.GetSamplingProfileParams;
    readonly result: Protocol.Memory.Commands.GetSamplingProfileResult;
  };
  readonly "Network.canClearBrowserCache": {
    readonly params: Protocol.Network.Commands.CanClearBrowserCacheParams;
    readonly result: Protocol.Network.Commands.CanClearBrowserCacheResult;
  };
  readonly "Network.canClearBrowserCookies": {
    readonly params: Protocol.Network.Commands.CanClearBrowserCookiesParams;
    readonly result: Protocol.Network.Commands.CanClearBrowserCookiesResult;
  };
  readonly "Network.canEmulateNetworkConditions": {
    readonly params: Protocol.Network.Commands.CanEmulateNetworkConditionsParams;
    readonly result: Protocol.Network.Commands.CanEmulateNetworkConditionsResult;
  };
  readonly "Network.clearBrowserCache": {
    readonly params: Protocol.Network.Commands.ClearBrowserCacheParams;
    readonly result: Protocol.Network.Commands.ClearBrowserCacheResult;
  };
  readonly "Network.clearBrowserCookies": {
    readonly params: Protocol.Network.Commands.ClearBrowserCookiesParams;
    readonly result: Protocol.Network.Commands.ClearBrowserCookiesResult;
  };
  readonly "Network.deleteCookies": {
    readonly params: Protocol.Network.Commands.DeleteCookiesParams;
    readonly result: Protocol.Network.Commands.DeleteCookiesResult;
  };
  readonly "Network.disable": {
    readonly params: Protocol.Network.Commands.DisableParams;
    readonly result: Protocol.Network.Commands.DisableResult;
  };
  readonly "Network.emulateNetworkConditions": {
    readonly params: Protocol.Network.Commands.EmulateNetworkConditionsParams;
    readonly result: Protocol.Network.Commands.EmulateNetworkConditionsResult;
  };
  readonly "Network.emulateNetworkConditionsByRule": {
    readonly params: Protocol.Network.Commands.EmulateNetworkConditionsByRuleParams;
    readonly result: Protocol.Network.Commands.EmulateNetworkConditionsByRuleResult;
  };
  readonly "Network.overrideNetworkState": {
    readonly params: Protocol.Network.Commands.OverrideNetworkStateParams;
    readonly result: Protocol.Network.Commands.OverrideNetworkStateResult;
  };
  readonly "Network.enable": {
    readonly params: Protocol.Network.Commands.EnableParams;
    readonly result: Protocol.Network.Commands.EnableResult;
  };
  readonly "Network.configureDurableMessages": {
    readonly params: Protocol.Network.Commands.ConfigureDurableMessagesParams;
    readonly result: Protocol.Network.Commands.ConfigureDurableMessagesResult;
  };
  readonly "Network.getAllCookies": {
    readonly params: Protocol.Network.Commands.GetAllCookiesParams;
    readonly result: Protocol.Network.Commands.GetAllCookiesResult;
  };
  readonly "Network.getCertificate": {
    readonly params: Protocol.Network.Commands.GetCertificateParams;
    readonly result: Protocol.Network.Commands.GetCertificateResult;
  };
  readonly "Network.getCookies": {
    readonly params: Protocol.Network.Commands.GetCookiesParams;
    readonly result: Protocol.Network.Commands.GetCookiesResult;
  };
  readonly "Network.getResponseBody": {
    readonly params: Protocol.Network.Commands.GetResponseBodyParams;
    readonly result: Protocol.Network.Commands.GetResponseBodyResult;
  };
  readonly "Network.getRequestPostData": {
    readonly params: Protocol.Network.Commands.GetRequestPostDataParams;
    readonly result: Protocol.Network.Commands.GetRequestPostDataResult;
  };
  readonly "Network.replayXHR": {
    readonly params: Protocol.Network.Commands.ReplayXHRParams;
    readonly result: Protocol.Network.Commands.ReplayXHRResult;
  };
  readonly "Network.searchInResponseBody": {
    readonly params: Protocol.Network.Commands.SearchInResponseBodyParams;
    readonly result: Protocol.Network.Commands.SearchInResponseBodyResult;
  };
  readonly "Network.setBlockedURLs": {
    readonly params: Protocol.Network.Commands.SetBlockedURLsParams;
    readonly result: Protocol.Network.Commands.SetBlockedURLsResult;
  };
  readonly "Network.setBypassServiceWorker": {
    readonly params: Protocol.Network.Commands.SetBypassServiceWorkerParams;
    readonly result: Protocol.Network.Commands.SetBypassServiceWorkerResult;
  };
  readonly "Network.setCacheDisabled": {
    readonly params: Protocol.Network.Commands.SetCacheDisabledParams;
    readonly result: Protocol.Network.Commands.SetCacheDisabledResult;
  };
  readonly "Network.setCookie": {
    readonly params: Protocol.Network.Commands.SetCookieParams;
    readonly result: Protocol.Network.Commands.SetCookieResult;
  };
  readonly "Network.setCookies": {
    readonly params: Protocol.Network.Commands.SetCookiesParams;
    readonly result: Protocol.Network.Commands.SetCookiesResult;
  };
  readonly "Network.setExtraHTTPHeaders": {
    readonly params: Protocol.Network.Commands.SetExtraHTTPHeadersParams;
    readonly result: Protocol.Network.Commands.SetExtraHTTPHeadersResult;
  };
  readonly "Network.setAttachDebugStack": {
    readonly params: Protocol.Network.Commands.SetAttachDebugStackParams;
    readonly result: Protocol.Network.Commands.SetAttachDebugStackResult;
  };
  readonly "Network.setUserAgentOverride": {
    readonly params: Protocol.Network.Commands.SetUserAgentOverrideParams;
    readonly result: Protocol.Network.Commands.SetUserAgentOverrideResult;
  };
  readonly "Network.streamResourceContent": {
    readonly params: Protocol.Network.Commands.StreamResourceContentParams;
    readonly result: Protocol.Network.Commands.StreamResourceContentResult;
  };
  readonly "Network.getSecurityIsolationStatus": {
    readonly params: Protocol.Network.Commands.GetSecurityIsolationStatusParams;
    readonly result: Protocol.Network.Commands.GetSecurityIsolationStatusResult;
  };
  readonly "Network.enableReportingApi": {
    readonly params: Protocol.Network.Commands.EnableReportingApiParams;
    readonly result: Protocol.Network.Commands.EnableReportingApiResult;
  };
  readonly "Network.enableDeviceBoundSessions": {
    readonly params: Protocol.Network.Commands.EnableDeviceBoundSessionsParams;
    readonly result: Protocol.Network.Commands.EnableDeviceBoundSessionsResult;
  };
  readonly "Network.deleteDeviceBoundSession": {
    readonly params: Protocol.Network.Commands.DeleteDeviceBoundSessionParams;
    readonly result: Protocol.Network.Commands.DeleteDeviceBoundSessionResult;
  };
  readonly "Network.fetchSchemefulSite": {
    readonly params: Protocol.Network.Commands.FetchSchemefulSiteParams;
    readonly result: Protocol.Network.Commands.FetchSchemefulSiteResult;
  };
  readonly "Network.loadNetworkResource": {
    readonly params: Protocol.Network.Commands.LoadNetworkResourceParams;
    readonly result: Protocol.Network.Commands.LoadNetworkResourceResult;
  };
  readonly "Network.setCookieControls": {
    readonly params: Protocol.Network.Commands.SetCookieControlsParams;
    readonly result: Protocol.Network.Commands.SetCookieControlsResult;
  };
  readonly "Overlay.disable": {
    readonly params: Protocol.Overlay.Commands.DisableParams;
    readonly result: Protocol.Overlay.Commands.DisableResult;
  };
  readonly "Overlay.enable": {
    readonly params: Protocol.Overlay.Commands.EnableParams;
    readonly result: Protocol.Overlay.Commands.EnableResult;
  };
  readonly "Overlay.getHighlightObjectForTest": {
    readonly params: Protocol.Overlay.Commands.GetHighlightObjectForTestParams;
    readonly result: Protocol.Overlay.Commands.GetHighlightObjectForTestResult;
  };
  readonly "Overlay.getGridHighlightObjectsForTest": {
    readonly params: Protocol.Overlay.Commands.GetGridHighlightObjectsForTestParams;
    readonly result: Protocol.Overlay.Commands.GetGridHighlightObjectsForTestResult;
  };
  readonly "Overlay.getSourceOrderHighlightObjectForTest": {
    readonly params: Protocol.Overlay.Commands.GetSourceOrderHighlightObjectForTestParams;
    readonly result: Protocol.Overlay.Commands.GetSourceOrderHighlightObjectForTestResult;
  };
  readonly "Overlay.hideHighlight": {
    readonly params: Protocol.Overlay.Commands.HideHighlightParams;
    readonly result: Protocol.Overlay.Commands.HideHighlightResult;
  };
  readonly "Overlay.highlightFrame": {
    readonly params: Protocol.Overlay.Commands.HighlightFrameParams;
    readonly result: Protocol.Overlay.Commands.HighlightFrameResult;
  };
  readonly "Overlay.highlightNode": {
    readonly params: Protocol.Overlay.Commands.HighlightNodeParams;
    readonly result: Protocol.Overlay.Commands.HighlightNodeResult;
  };
  readonly "Overlay.highlightQuad": {
    readonly params: Protocol.Overlay.Commands.HighlightQuadParams;
    readonly result: Protocol.Overlay.Commands.HighlightQuadResult;
  };
  readonly "Overlay.highlightRect": {
    readonly params: Protocol.Overlay.Commands.HighlightRectParams;
    readonly result: Protocol.Overlay.Commands.HighlightRectResult;
  };
  readonly "Overlay.highlightSourceOrder": {
    readonly params: Protocol.Overlay.Commands.HighlightSourceOrderParams;
    readonly result: Protocol.Overlay.Commands.HighlightSourceOrderResult;
  };
  readonly "Overlay.setInspectMode": {
    readonly params: Protocol.Overlay.Commands.SetInspectModeParams;
    readonly result: Protocol.Overlay.Commands.SetInspectModeResult;
  };
  readonly "Overlay.setShowAdHighlights": {
    readonly params: Protocol.Overlay.Commands.SetShowAdHighlightsParams;
    readonly result: Protocol.Overlay.Commands.SetShowAdHighlightsResult;
  };
  readonly "Overlay.setPausedInDebuggerMessage": {
    readonly params: Protocol.Overlay.Commands.SetPausedInDebuggerMessageParams;
    readonly result: Protocol.Overlay.Commands.SetPausedInDebuggerMessageResult;
  };
  readonly "Overlay.setShowDebugBorders": {
    readonly params: Protocol.Overlay.Commands.SetShowDebugBordersParams;
    readonly result: Protocol.Overlay.Commands.SetShowDebugBordersResult;
  };
  readonly "Overlay.setShowFPSCounter": {
    readonly params: Protocol.Overlay.Commands.SetShowFPSCounterParams;
    readonly result: Protocol.Overlay.Commands.SetShowFPSCounterResult;
  };
  readonly "Overlay.setShowGridOverlays": {
    readonly params: Protocol.Overlay.Commands.SetShowGridOverlaysParams;
    readonly result: Protocol.Overlay.Commands.SetShowGridOverlaysResult;
  };
  readonly "Overlay.setShowFlexOverlays": {
    readonly params: Protocol.Overlay.Commands.SetShowFlexOverlaysParams;
    readonly result: Protocol.Overlay.Commands.SetShowFlexOverlaysResult;
  };
  readonly "Overlay.setShowScrollSnapOverlays": {
    readonly params: Protocol.Overlay.Commands.SetShowScrollSnapOverlaysParams;
    readonly result: Protocol.Overlay.Commands.SetShowScrollSnapOverlaysResult;
  };
  readonly "Overlay.setShowContainerQueryOverlays": {
    readonly params: Protocol.Overlay.Commands.SetShowContainerQueryOverlaysParams;
    readonly result: Protocol.Overlay.Commands.SetShowContainerQueryOverlaysResult;
  };
  readonly "Overlay.setShowInspectedElementAnchor": {
    readonly params: Protocol.Overlay.Commands.SetShowInspectedElementAnchorParams;
    readonly result: Protocol.Overlay.Commands.SetShowInspectedElementAnchorResult;
  };
  readonly "Overlay.setShowPaintRects": {
    readonly params: Protocol.Overlay.Commands.SetShowPaintRectsParams;
    readonly result: Protocol.Overlay.Commands.SetShowPaintRectsResult;
  };
  readonly "Overlay.setShowLayoutShiftRegions": {
    readonly params: Protocol.Overlay.Commands.SetShowLayoutShiftRegionsParams;
    readonly result: Protocol.Overlay.Commands.SetShowLayoutShiftRegionsResult;
  };
  readonly "Overlay.setShowScrollBottleneckRects": {
    readonly params: Protocol.Overlay.Commands.SetShowScrollBottleneckRectsParams;
    readonly result: Protocol.Overlay.Commands.SetShowScrollBottleneckRectsResult;
  };
  readonly "Overlay.setShowHitTestBorders": {
    readonly params: Protocol.Overlay.Commands.SetShowHitTestBordersParams;
    readonly result: Protocol.Overlay.Commands.SetShowHitTestBordersResult;
  };
  readonly "Overlay.setShowWebVitals": {
    readonly params: Protocol.Overlay.Commands.SetShowWebVitalsParams;
    readonly result: Protocol.Overlay.Commands.SetShowWebVitalsResult;
  };
  readonly "Overlay.setShowViewportSizeOnResize": {
    readonly params: Protocol.Overlay.Commands.SetShowViewportSizeOnResizeParams;
    readonly result: Protocol.Overlay.Commands.SetShowViewportSizeOnResizeResult;
  };
  readonly "Overlay.setShowHinge": {
    readonly params: Protocol.Overlay.Commands.SetShowHingeParams;
    readonly result: Protocol.Overlay.Commands.SetShowHingeResult;
  };
  readonly "Overlay.setShowDisplayCutout": {
    readonly params: Protocol.Overlay.Commands.SetShowDisplayCutoutParams;
    readonly result: Protocol.Overlay.Commands.SetShowDisplayCutoutResult;
  };
  readonly "Overlay.setShowIsolatedElements": {
    readonly params: Protocol.Overlay.Commands.SetShowIsolatedElementsParams;
    readonly result: Protocol.Overlay.Commands.SetShowIsolatedElementsResult;
  };
  readonly "Overlay.setShowWindowControlsOverlay": {
    readonly params: Protocol.Overlay.Commands.SetShowWindowControlsOverlayParams;
    readonly result: Protocol.Overlay.Commands.SetShowWindowControlsOverlayResult;
  };
  readonly "PWA.getOsAppState": {
    readonly params: Protocol.PWA.Commands.GetOsAppStateParams;
    readonly result: Protocol.PWA.Commands.GetOsAppStateResult;
  };
  readonly "PWA.install": {
    readonly params: Protocol.PWA.Commands.InstallParams;
    readonly result: Protocol.PWA.Commands.InstallResult;
  };
  readonly "PWA.uninstall": {
    readonly params: Protocol.PWA.Commands.UninstallParams;
    readonly result: Protocol.PWA.Commands.UninstallResult;
  };
  readonly "PWA.launch": {
    readonly params: Protocol.PWA.Commands.LaunchParams;
    readonly result: Protocol.PWA.Commands.LaunchResult;
  };
  readonly "PWA.launchFilesInApp": {
    readonly params: Protocol.PWA.Commands.LaunchFilesInAppParams;
    readonly result: Protocol.PWA.Commands.LaunchFilesInAppResult;
  };
  readonly "PWA.openCurrentPageInApp": {
    readonly params: Protocol.PWA.Commands.OpenCurrentPageInAppParams;
    readonly result: Protocol.PWA.Commands.OpenCurrentPageInAppResult;
  };
  readonly "PWA.changeAppUserSettings": {
    readonly params: Protocol.PWA.Commands.ChangeAppUserSettingsParams;
    readonly result: Protocol.PWA.Commands.ChangeAppUserSettingsResult;
  };
  readonly "Page.addScriptToEvaluateOnLoad": {
    readonly params: Protocol.Page.Commands.AddScriptToEvaluateOnLoadParams;
    readonly result: Protocol.Page.Commands.AddScriptToEvaluateOnLoadResult;
  };
  readonly "Page.addScriptToEvaluateOnNewDocument": {
    readonly params: Protocol.Page.Commands.AddScriptToEvaluateOnNewDocumentParams;
    readonly result: Protocol.Page.Commands.AddScriptToEvaluateOnNewDocumentResult;
  };
  readonly "Page.bringToFront": {
    readonly params: Protocol.Page.Commands.BringToFrontParams;
    readonly result: Protocol.Page.Commands.BringToFrontResult;
  };
  readonly "Page.captureScreenshot": {
    readonly params: Protocol.Page.Commands.CaptureScreenshotParams;
    readonly result: Protocol.Page.Commands.CaptureScreenshotResult;
  };
  readonly "Page.captureSnapshot": {
    readonly params: Protocol.Page.Commands.CaptureSnapshotParams;
    readonly result: Protocol.Page.Commands.CaptureSnapshotResult;
  };
  readonly "Page.clearDeviceMetricsOverride": {
    readonly params: Protocol.Page.Commands.ClearDeviceMetricsOverrideParams;
    readonly result: Protocol.Page.Commands.ClearDeviceMetricsOverrideResult;
  };
  readonly "Page.clearDeviceOrientationOverride": {
    readonly params: Protocol.Page.Commands.ClearDeviceOrientationOverrideParams;
    readonly result: Protocol.Page.Commands.ClearDeviceOrientationOverrideResult;
  };
  readonly "Page.clearGeolocationOverride": {
    readonly params: Protocol.Page.Commands.ClearGeolocationOverrideParams;
    readonly result: Protocol.Page.Commands.ClearGeolocationOverrideResult;
  };
  readonly "Page.createIsolatedWorld": {
    readonly params: Protocol.Page.Commands.CreateIsolatedWorldParams;
    readonly result: Protocol.Page.Commands.CreateIsolatedWorldResult;
  };
  readonly "Page.deleteCookie": {
    readonly params: Protocol.Page.Commands.DeleteCookieParams;
    readonly result: Protocol.Page.Commands.DeleteCookieResult;
  };
  readonly "Page.disable": {
    readonly params: Protocol.Page.Commands.DisableParams;
    readonly result: Protocol.Page.Commands.DisableResult;
  };
  readonly "Page.enable": {
    readonly params: Protocol.Page.Commands.EnableParams;
    readonly result: Protocol.Page.Commands.EnableResult;
  };
  readonly "Page.getAppManifest": {
    readonly params: Protocol.Page.Commands.GetAppManifestParams;
    readonly result: Protocol.Page.Commands.GetAppManifestResult;
  };
  readonly "Page.getInstallabilityErrors": {
    readonly params: Protocol.Page.Commands.GetInstallabilityErrorsParams;
    readonly result: Protocol.Page.Commands.GetInstallabilityErrorsResult;
  };
  readonly "Page.getManifestIcons": {
    readonly params: Protocol.Page.Commands.GetManifestIconsParams;
    readonly result: Protocol.Page.Commands.GetManifestIconsResult;
  };
  readonly "Page.getAppId": {
    readonly params: Protocol.Page.Commands.GetAppIdParams;
    readonly result: Protocol.Page.Commands.GetAppIdResult;
  };
  readonly "Page.getAdScriptAncestry": {
    readonly params: Protocol.Page.Commands.GetAdScriptAncestryParams;
    readonly result: Protocol.Page.Commands.GetAdScriptAncestryResult;
  };
  readonly "Page.getFrameTree": {
    readonly params: Protocol.Page.Commands.GetFrameTreeParams;
    readonly result: Protocol.Page.Commands.GetFrameTreeResult;
  };
  readonly "Page.getLayoutMetrics": {
    readonly params: Protocol.Page.Commands.GetLayoutMetricsParams;
    readonly result: Protocol.Page.Commands.GetLayoutMetricsResult;
  };
  readonly "Page.getNavigationHistory": {
    readonly params: Protocol.Page.Commands.GetNavigationHistoryParams;
    readonly result: Protocol.Page.Commands.GetNavigationHistoryResult;
  };
  readonly "Page.resetNavigationHistory": {
    readonly params: Protocol.Page.Commands.ResetNavigationHistoryParams;
    readonly result: Protocol.Page.Commands.ResetNavigationHistoryResult;
  };
  readonly "Page.getResourceContent": {
    readonly params: Protocol.Page.Commands.GetResourceContentParams;
    readonly result: Protocol.Page.Commands.GetResourceContentResult;
  };
  readonly "Page.getResourceTree": {
    readonly params: Protocol.Page.Commands.GetResourceTreeParams;
    readonly result: Protocol.Page.Commands.GetResourceTreeResult;
  };
  readonly "Page.handleJavaScriptDialog": {
    readonly params: Protocol.Page.Commands.HandleJavaScriptDialogParams;
    readonly result: Protocol.Page.Commands.HandleJavaScriptDialogResult;
  };
  readonly "Page.navigate": {
    readonly params: Protocol.Page.Commands.NavigateParams;
    readonly result: Protocol.Page.Commands.NavigateResult;
  };
  readonly "Page.navigateToHistoryEntry": {
    readonly params: Protocol.Page.Commands.NavigateToHistoryEntryParams;
    readonly result: Protocol.Page.Commands.NavigateToHistoryEntryResult;
  };
  readonly "Page.printToPDF": {
    readonly params: Protocol.Page.Commands.PrintToPDFParams;
    readonly result: Protocol.Page.Commands.PrintToPDFResult;
  };
  readonly "Page.reload": {
    readonly params: Protocol.Page.Commands.ReloadParams;
    readonly result: Protocol.Page.Commands.ReloadResult;
  };
  readonly "Page.removeScriptToEvaluateOnLoad": {
    readonly params: Protocol.Page.Commands.RemoveScriptToEvaluateOnLoadParams;
    readonly result: Protocol.Page.Commands.RemoveScriptToEvaluateOnLoadResult;
  };
  readonly "Page.removeScriptToEvaluateOnNewDocument": {
    readonly params: Protocol.Page.Commands.RemoveScriptToEvaluateOnNewDocumentParams;
    readonly result: Protocol.Page.Commands.RemoveScriptToEvaluateOnNewDocumentResult;
  };
  readonly "Page.screencastFrameAck": {
    readonly params: Protocol.Page.Commands.ScreencastFrameAckParams;
    readonly result: Protocol.Page.Commands.ScreencastFrameAckResult;
  };
  readonly "Page.searchInResource": {
    readonly params: Protocol.Page.Commands.SearchInResourceParams;
    readonly result: Protocol.Page.Commands.SearchInResourceResult;
  };
  readonly "Page.setAdBlockingEnabled": {
    readonly params: Protocol.Page.Commands.SetAdBlockingEnabledParams;
    readonly result: Protocol.Page.Commands.SetAdBlockingEnabledResult;
  };
  readonly "Page.setBypassCSP": {
    readonly params: Protocol.Page.Commands.SetBypassCSPParams;
    readonly result: Protocol.Page.Commands.SetBypassCSPResult;
  };
  readonly "Page.getPermissionsPolicyState": {
    readonly params: Protocol.Page.Commands.GetPermissionsPolicyStateParams;
    readonly result: Protocol.Page.Commands.GetPermissionsPolicyStateResult;
  };
  readonly "Page.getOriginTrials": {
    readonly params: Protocol.Page.Commands.GetOriginTrialsParams;
    readonly result: Protocol.Page.Commands.GetOriginTrialsResult;
  };
  readonly "Page.setDeviceMetricsOverride": {
    readonly params: Protocol.Page.Commands.SetDeviceMetricsOverrideParams;
    readonly result: Protocol.Page.Commands.SetDeviceMetricsOverrideResult;
  };
  readonly "Page.setDeviceOrientationOverride": {
    readonly params: Protocol.Page.Commands.SetDeviceOrientationOverrideParams;
    readonly result: Protocol.Page.Commands.SetDeviceOrientationOverrideResult;
  };
  readonly "Page.setFontFamilies": {
    readonly params: Protocol.Page.Commands.SetFontFamiliesParams;
    readonly result: Protocol.Page.Commands.SetFontFamiliesResult;
  };
  readonly "Page.setFontSizes": {
    readonly params: Protocol.Page.Commands.SetFontSizesParams;
    readonly result: Protocol.Page.Commands.SetFontSizesResult;
  };
  readonly "Page.setDocumentContent": {
    readonly params: Protocol.Page.Commands.SetDocumentContentParams;
    readonly result: Protocol.Page.Commands.SetDocumentContentResult;
  };
  readonly "Page.setDownloadBehavior": {
    readonly params: Protocol.Page.Commands.SetDownloadBehaviorParams;
    readonly result: Protocol.Page.Commands.SetDownloadBehaviorResult;
  };
  readonly "Page.setGeolocationOverride": {
    readonly params: Protocol.Page.Commands.SetGeolocationOverrideParams;
    readonly result: Protocol.Page.Commands.SetGeolocationOverrideResult;
  };
  readonly "Page.setLifecycleEventsEnabled": {
    readonly params: Protocol.Page.Commands.SetLifecycleEventsEnabledParams;
    readonly result: Protocol.Page.Commands.SetLifecycleEventsEnabledResult;
  };
  readonly "Page.setTouchEmulationEnabled": {
    readonly params: Protocol.Page.Commands.SetTouchEmulationEnabledParams;
    readonly result: Protocol.Page.Commands.SetTouchEmulationEnabledResult;
  };
  readonly "Page.startScreencast": {
    readonly params: Protocol.Page.Commands.StartScreencastParams;
    readonly result: Protocol.Page.Commands.StartScreencastResult;
  };
  readonly "Page.startScreenRecording": {
    readonly params: Protocol.Page.Commands.StartScreenRecordingParams;
    readonly result: Protocol.Page.Commands.StartScreenRecordingResult;
  };
  readonly "Page.stopScreenRecording": {
    readonly params: Protocol.Page.Commands.StopScreenRecordingParams;
    readonly result: Protocol.Page.Commands.StopScreenRecordingResult;
  };
  readonly "Page.stopLoading": {
    readonly params: Protocol.Page.Commands.StopLoadingParams;
    readonly result: Protocol.Page.Commands.StopLoadingResult;
  };
  readonly "Page.crash": {
    readonly params: Protocol.Page.Commands.CrashParams;
    readonly result: Protocol.Page.Commands.CrashResult;
  };
  readonly "Page.close": {
    readonly params: Protocol.Page.Commands.CloseParams;
    readonly result: Protocol.Page.Commands.CloseResult;
  };
  readonly "Page.setWebLifecycleState": {
    readonly params: Protocol.Page.Commands.SetWebLifecycleStateParams;
    readonly result: Protocol.Page.Commands.SetWebLifecycleStateResult;
  };
  readonly "Page.stopScreencast": {
    readonly params: Protocol.Page.Commands.StopScreencastParams;
    readonly result: Protocol.Page.Commands.StopScreencastResult;
  };
  readonly "Page.produceCompilationCache": {
    readonly params: Protocol.Page.Commands.ProduceCompilationCacheParams;
    readonly result: Protocol.Page.Commands.ProduceCompilationCacheResult;
  };
  readonly "Page.addCompilationCache": {
    readonly params: Protocol.Page.Commands.AddCompilationCacheParams;
    readonly result: Protocol.Page.Commands.AddCompilationCacheResult;
  };
  readonly "Page.clearCompilationCache": {
    readonly params: Protocol.Page.Commands.ClearCompilationCacheParams;
    readonly result: Protocol.Page.Commands.ClearCompilationCacheResult;
  };
  readonly "Page.setSPCTransactionMode": {
    readonly params: Protocol.Page.Commands.SetSPCTransactionModeParams;
    readonly result: Protocol.Page.Commands.SetSPCTransactionModeResult;
  };
  readonly "Page.setRPHRegistrationMode": {
    readonly params: Protocol.Page.Commands.SetRPHRegistrationModeParams;
    readonly result: Protocol.Page.Commands.SetRPHRegistrationModeResult;
  };
  readonly "Page.generateTestReport": {
    readonly params: Protocol.Page.Commands.GenerateTestReportParams;
    readonly result: Protocol.Page.Commands.GenerateTestReportResult;
  };
  readonly "Page.waitForDebugger": {
    readonly params: Protocol.Page.Commands.WaitForDebuggerParams;
    readonly result: Protocol.Page.Commands.WaitForDebuggerResult;
  };
  readonly "Page.setInterceptFileChooserDialog": {
    readonly params: Protocol.Page.Commands.SetInterceptFileChooserDialogParams;
    readonly result: Protocol.Page.Commands.SetInterceptFileChooserDialogResult;
  };
  readonly "Page.setPrerenderingAllowed": {
    readonly params: Protocol.Page.Commands.SetPrerenderingAllowedParams;
    readonly result: Protocol.Page.Commands.SetPrerenderingAllowedResult;
  };
  readonly "Page.getAnnotatedPageContent": {
    readonly params: Protocol.Page.Commands.GetAnnotatedPageContentParams;
    readonly result: Protocol.Page.Commands.GetAnnotatedPageContentResult;
  };
  readonly "Performance.disable": {
    readonly params: Protocol.Performance.Commands.DisableParams;
    readonly result: Protocol.Performance.Commands.DisableResult;
  };
  readonly "Performance.enable": {
    readonly params: Protocol.Performance.Commands.EnableParams;
    readonly result: Protocol.Performance.Commands.EnableResult;
  };
  readonly "Performance.setTimeDomain": {
    readonly params: Protocol.Performance.Commands.SetTimeDomainParams;
    readonly result: Protocol.Performance.Commands.SetTimeDomainResult;
  };
  readonly "Performance.getMetrics": {
    readonly params: Protocol.Performance.Commands.GetMetricsParams;
    readonly result: Protocol.Performance.Commands.GetMetricsResult;
  };
  readonly "PerformanceTimeline.enable": {
    readonly params: Protocol.PerformanceTimeline.Commands.EnableParams;
    readonly result: Protocol.PerformanceTimeline.Commands.EnableResult;
  };
  readonly "Preload.enable": {
    readonly params: Protocol.Preload.Commands.EnableParams;
    readonly result: Protocol.Preload.Commands.EnableResult;
  };
  readonly "Preload.disable": {
    readonly params: Protocol.Preload.Commands.DisableParams;
    readonly result: Protocol.Preload.Commands.DisableResult;
  };
  readonly "Security.disable": {
    readonly params: Protocol.Security.Commands.DisableParams;
    readonly result: Protocol.Security.Commands.DisableResult;
  };
  readonly "Security.enable": {
    readonly params: Protocol.Security.Commands.EnableParams;
    readonly result: Protocol.Security.Commands.EnableResult;
  };
  readonly "Security.setIgnoreCertificateErrors": {
    readonly params: Protocol.Security.Commands.SetIgnoreCertificateErrorsParams;
    readonly result: Protocol.Security.Commands.SetIgnoreCertificateErrorsResult;
  };
  readonly "Security.handleCertificateError": {
    readonly params: Protocol.Security.Commands.HandleCertificateErrorParams;
    readonly result: Protocol.Security.Commands.HandleCertificateErrorResult;
  };
  readonly "Security.setOverrideCertificateErrors": {
    readonly params: Protocol.Security.Commands.SetOverrideCertificateErrorsParams;
    readonly result: Protocol.Security.Commands.SetOverrideCertificateErrorsResult;
  };
  readonly "ServiceWorker.deliverPushMessage": {
    readonly params: Protocol.ServiceWorker.Commands.DeliverPushMessageParams;
    readonly result: Protocol.ServiceWorker.Commands.DeliverPushMessageResult;
  };
  readonly "ServiceWorker.disable": {
    readonly params: Protocol.ServiceWorker.Commands.DisableParams;
    readonly result: Protocol.ServiceWorker.Commands.DisableResult;
  };
  readonly "ServiceWorker.dispatchSyncEvent": {
    readonly params: Protocol.ServiceWorker.Commands.DispatchSyncEventParams;
    readonly result: Protocol.ServiceWorker.Commands.DispatchSyncEventResult;
  };
  readonly "ServiceWorker.dispatchPeriodicSyncEvent": {
    readonly params: Protocol.ServiceWorker.Commands.DispatchPeriodicSyncEventParams;
    readonly result: Protocol.ServiceWorker.Commands.DispatchPeriodicSyncEventResult;
  };
  readonly "ServiceWorker.enable": {
    readonly params: Protocol.ServiceWorker.Commands.EnableParams;
    readonly result: Protocol.ServiceWorker.Commands.EnableResult;
  };
  readonly "ServiceWorker.setForceUpdateOnPageLoad": {
    readonly params: Protocol.ServiceWorker.Commands.SetForceUpdateOnPageLoadParams;
    readonly result: Protocol.ServiceWorker.Commands.SetForceUpdateOnPageLoadResult;
  };
  readonly "ServiceWorker.skipWaiting": {
    readonly params: Protocol.ServiceWorker.Commands.SkipWaitingParams;
    readonly result: Protocol.ServiceWorker.Commands.SkipWaitingResult;
  };
  readonly "ServiceWorker.startWorker": {
    readonly params: Protocol.ServiceWorker.Commands.StartWorkerParams;
    readonly result: Protocol.ServiceWorker.Commands.StartWorkerResult;
  };
  readonly "ServiceWorker.stopAllWorkers": {
    readonly params: Protocol.ServiceWorker.Commands.StopAllWorkersParams;
    readonly result: Protocol.ServiceWorker.Commands.StopAllWorkersResult;
  };
  readonly "ServiceWorker.stopWorker": {
    readonly params: Protocol.ServiceWorker.Commands.StopWorkerParams;
    readonly result: Protocol.ServiceWorker.Commands.StopWorkerResult;
  };
  readonly "ServiceWorker.unregister": {
    readonly params: Protocol.ServiceWorker.Commands.UnregisterParams;
    readonly result: Protocol.ServiceWorker.Commands.UnregisterResult;
  };
  readonly "ServiceWorker.updateRegistration": {
    readonly params: Protocol.ServiceWorker.Commands.UpdateRegistrationParams;
    readonly result: Protocol.ServiceWorker.Commands.UpdateRegistrationResult;
  };
  readonly "SmartCardEmulation.enable": {
    readonly params: Protocol.SmartCardEmulation.Commands.EnableParams;
    readonly result: Protocol.SmartCardEmulation.Commands.EnableResult;
  };
  readonly "SmartCardEmulation.disable": {
    readonly params: Protocol.SmartCardEmulation.Commands.DisableParams;
    readonly result: Protocol.SmartCardEmulation.Commands.DisableResult;
  };
  readonly "SmartCardEmulation.reportEstablishContextResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportEstablishContextResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportEstablishContextResultResult;
  };
  readonly "SmartCardEmulation.reportReleaseContextResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportReleaseContextResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportReleaseContextResultResult;
  };
  readonly "SmartCardEmulation.reportListReadersResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportListReadersResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportListReadersResultResult;
  };
  readonly "SmartCardEmulation.reportGetStatusChangeResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportGetStatusChangeResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportGetStatusChangeResultResult;
  };
  readonly "SmartCardEmulation.reportBeginTransactionResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportBeginTransactionResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportBeginTransactionResultResult;
  };
  readonly "SmartCardEmulation.reportPlainResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportPlainResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportPlainResultResult;
  };
  readonly "SmartCardEmulation.reportConnectResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportConnectResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportConnectResultResult;
  };
  readonly "SmartCardEmulation.reportDataResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportDataResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportDataResultResult;
  };
  readonly "SmartCardEmulation.reportStatusResult": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportStatusResultParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportStatusResultResult;
  };
  readonly "SmartCardEmulation.reportError": {
    readonly params: Protocol.SmartCardEmulation.Commands.ReportErrorParams;
    readonly result: Protocol.SmartCardEmulation.Commands.ReportErrorResult;
  };
  readonly "Storage.getStorageKeyForFrame": {
    readonly params: Protocol.Storage.Commands.GetStorageKeyForFrameParams;
    readonly result: Protocol.Storage.Commands.GetStorageKeyForFrameResult;
  };
  readonly "Storage.getStorageKey": {
    readonly params: Protocol.Storage.Commands.GetStorageKeyParams;
    readonly result: Protocol.Storage.Commands.GetStorageKeyResult;
  };
  readonly "Storage.clearDataForOrigin": {
    readonly params: Protocol.Storage.Commands.ClearDataForOriginParams;
    readonly result: Protocol.Storage.Commands.ClearDataForOriginResult;
  };
  readonly "Storage.clearDataForStorageKey": {
    readonly params: Protocol.Storage.Commands.ClearDataForStorageKeyParams;
    readonly result: Protocol.Storage.Commands.ClearDataForStorageKeyResult;
  };
  readonly "Storage.getCookies": {
    readonly params: Protocol.Storage.Commands.GetCookiesParams;
    readonly result: Protocol.Storage.Commands.GetCookiesResult;
  };
  readonly "Storage.setCookies": {
    readonly params: Protocol.Storage.Commands.SetCookiesParams;
    readonly result: Protocol.Storage.Commands.SetCookiesResult;
  };
  readonly "Storage.clearCookies": {
    readonly params: Protocol.Storage.Commands.ClearCookiesParams;
    readonly result: Protocol.Storage.Commands.ClearCookiesResult;
  };
  readonly "Storage.getUsageAndQuota": {
    readonly params: Protocol.Storage.Commands.GetUsageAndQuotaParams;
    readonly result: Protocol.Storage.Commands.GetUsageAndQuotaResult;
  };
  readonly "Storage.overrideQuotaForOrigin": {
    readonly params: Protocol.Storage.Commands.OverrideQuotaForOriginParams;
    readonly result: Protocol.Storage.Commands.OverrideQuotaForOriginResult;
  };
  readonly "Storage.trackCacheStorageForOrigin": {
    readonly params: Protocol.Storage.Commands.TrackCacheStorageForOriginParams;
    readonly result: Protocol.Storage.Commands.TrackCacheStorageForOriginResult;
  };
  readonly "Storage.trackCacheStorageForStorageKey": {
    readonly params: Protocol.Storage.Commands.TrackCacheStorageForStorageKeyParams;
    readonly result: Protocol.Storage.Commands.TrackCacheStorageForStorageKeyResult;
  };
  readonly "Storage.trackIndexedDBForOrigin": {
    readonly params: Protocol.Storage.Commands.TrackIndexedDBForOriginParams;
    readonly result: Protocol.Storage.Commands.TrackIndexedDBForOriginResult;
  };
  readonly "Storage.trackIndexedDBForStorageKey": {
    readonly params: Protocol.Storage.Commands.TrackIndexedDBForStorageKeyParams;
    readonly result: Protocol.Storage.Commands.TrackIndexedDBForStorageKeyResult;
  };
  readonly "Storage.untrackCacheStorageForOrigin": {
    readonly params: Protocol.Storage.Commands.UntrackCacheStorageForOriginParams;
    readonly result: Protocol.Storage.Commands.UntrackCacheStorageForOriginResult;
  };
  readonly "Storage.untrackCacheStorageForStorageKey": {
    readonly params: Protocol.Storage.Commands.UntrackCacheStorageForStorageKeyParams;
    readonly result: Protocol.Storage.Commands.UntrackCacheStorageForStorageKeyResult;
  };
  readonly "Storage.untrackIndexedDBForOrigin": {
    readonly params: Protocol.Storage.Commands.UntrackIndexedDBForOriginParams;
    readonly result: Protocol.Storage.Commands.UntrackIndexedDBForOriginResult;
  };
  readonly "Storage.untrackIndexedDBForStorageKey": {
    readonly params: Protocol.Storage.Commands.UntrackIndexedDBForStorageKeyParams;
    readonly result: Protocol.Storage.Commands.UntrackIndexedDBForStorageKeyResult;
  };
  readonly "Storage.getTrustTokens": {
    readonly params: Protocol.Storage.Commands.GetTrustTokensParams;
    readonly result: Protocol.Storage.Commands.GetTrustTokensResult;
  };
  readonly "Storage.clearTrustTokens": {
    readonly params: Protocol.Storage.Commands.ClearTrustTokensParams;
    readonly result: Protocol.Storage.Commands.ClearTrustTokensResult;
  };
  readonly "Storage.getSharedStorageMetadata": {
    readonly params: Protocol.Storage.Commands.GetSharedStorageMetadataParams;
    readonly result: Protocol.Storage.Commands.GetSharedStorageMetadataResult;
  };
  readonly "Storage.getSharedStorageEntries": {
    readonly params: Protocol.Storage.Commands.GetSharedStorageEntriesParams;
    readonly result: Protocol.Storage.Commands.GetSharedStorageEntriesResult;
  };
  readonly "Storage.setSharedStorageEntry": {
    readonly params: Protocol.Storage.Commands.SetSharedStorageEntryParams;
    readonly result: Protocol.Storage.Commands.SetSharedStorageEntryResult;
  };
  readonly "Storage.deleteSharedStorageEntry": {
    readonly params: Protocol.Storage.Commands.DeleteSharedStorageEntryParams;
    readonly result: Protocol.Storage.Commands.DeleteSharedStorageEntryResult;
  };
  readonly "Storage.clearSharedStorageEntries": {
    readonly params: Protocol.Storage.Commands.ClearSharedStorageEntriesParams;
    readonly result: Protocol.Storage.Commands.ClearSharedStorageEntriesResult;
  };
  readonly "Storage.resetSharedStorageBudget": {
    readonly params: Protocol.Storage.Commands.ResetSharedStorageBudgetParams;
    readonly result: Protocol.Storage.Commands.ResetSharedStorageBudgetResult;
  };
  readonly "Storage.setSharedStorageTracking": {
    readonly params: Protocol.Storage.Commands.SetSharedStorageTrackingParams;
    readonly result: Protocol.Storage.Commands.SetSharedStorageTrackingResult;
  };
  readonly "Storage.setStorageBucketTracking": {
    readonly params: Protocol.Storage.Commands.SetStorageBucketTrackingParams;
    readonly result: Protocol.Storage.Commands.SetStorageBucketTrackingResult;
  };
  readonly "Storage.deleteStorageBucket": {
    readonly params: Protocol.Storage.Commands.DeleteStorageBucketParams;
    readonly result: Protocol.Storage.Commands.DeleteStorageBucketResult;
  };
  readonly "Storage.runBounceTrackingMitigations": {
    readonly params: Protocol.Storage.Commands.RunBounceTrackingMitigationsParams;
    readonly result: Protocol.Storage.Commands.RunBounceTrackingMitigationsResult;
  };
  readonly "Storage.getRelatedWebsiteSets": {
    readonly params: Protocol.Storage.Commands.GetRelatedWebsiteSetsParams;
    readonly result: Protocol.Storage.Commands.GetRelatedWebsiteSetsResult;
  };
  readonly "SystemInfo.getInfo": {
    readonly params: Protocol.SystemInfo.Commands.GetInfoParams;
    readonly result: Protocol.SystemInfo.Commands.GetInfoResult;
  };
  readonly "SystemInfo.getFeatureState": {
    readonly params: Protocol.SystemInfo.Commands.GetFeatureStateParams;
    readonly result: Protocol.SystemInfo.Commands.GetFeatureStateResult;
  };
  readonly "SystemInfo.getProcessInfo": {
    readonly params: Protocol.SystemInfo.Commands.GetProcessInfoParams;
    readonly result: Protocol.SystemInfo.Commands.GetProcessInfoResult;
  };
  readonly "Target.activateTarget": {
    readonly params: Protocol.Target.Commands.ActivateTargetParams;
    readonly result: Protocol.Target.Commands.ActivateTargetResult;
  };
  readonly "Target.attachToTarget": {
    readonly params: Protocol.Target.Commands.AttachToTargetParams;
    readonly result: Protocol.Target.Commands.AttachToTargetResult;
  };
  readonly "Target.attachToBrowserTarget": {
    readonly params: Protocol.Target.Commands.AttachToBrowserTargetParams;
    readonly result: Protocol.Target.Commands.AttachToBrowserTargetResult;
  };
  readonly "Target.closeTarget": {
    readonly params: Protocol.Target.Commands.CloseTargetParams;
    readonly result: Protocol.Target.Commands.CloseTargetResult;
  };
  readonly "Target.exposeDevToolsProtocol": {
    readonly params: Protocol.Target.Commands.ExposeDevToolsProtocolParams;
    readonly result: Protocol.Target.Commands.ExposeDevToolsProtocolResult;
  };
  readonly "Target.createBrowserContext": {
    readonly params: Protocol.Target.Commands.CreateBrowserContextParams;
    readonly result: Protocol.Target.Commands.CreateBrowserContextResult;
  };
  readonly "Target.getBrowserContexts": {
    readonly params: Protocol.Target.Commands.GetBrowserContextsParams;
    readonly result: Protocol.Target.Commands.GetBrowserContextsResult;
  };
  readonly "Target.createTarget": {
    readonly params: Protocol.Target.Commands.CreateTargetParams;
    readonly result: Protocol.Target.Commands.CreateTargetResult;
  };
  readonly "Target.detachFromTarget": {
    readonly params: Protocol.Target.Commands.DetachFromTargetParams;
    readonly result: Protocol.Target.Commands.DetachFromTargetResult;
  };
  readonly "Target.disposeBrowserContext": {
    readonly params: Protocol.Target.Commands.DisposeBrowserContextParams;
    readonly result: Protocol.Target.Commands.DisposeBrowserContextResult;
  };
  readonly "Target.getTargetInfo": {
    readonly params: Protocol.Target.Commands.GetTargetInfoParams;
    readonly result: Protocol.Target.Commands.GetTargetInfoResult;
  };
  readonly "Target.getTargets": {
    readonly params: Protocol.Target.Commands.GetTargetsParams;
    readonly result: Protocol.Target.Commands.GetTargetsResult;
  };
  readonly "Target.sendMessageToTarget": {
    readonly params: Protocol.Target.Commands.SendMessageToTargetParams;
    readonly result: Protocol.Target.Commands.SendMessageToTargetResult;
  };
  readonly "Target.setAutoAttach": {
    readonly params: Protocol.Target.Commands.SetAutoAttachParams;
    readonly result: Protocol.Target.Commands.SetAutoAttachResult;
  };
  readonly "Target.autoAttachRelated": {
    readonly params: Protocol.Target.Commands.AutoAttachRelatedParams;
    readonly result: Protocol.Target.Commands.AutoAttachRelatedResult;
  };
  readonly "Target.setDiscoverTargets": {
    readonly params: Protocol.Target.Commands.SetDiscoverTargetsParams;
    readonly result: Protocol.Target.Commands.SetDiscoverTargetsResult;
  };
  readonly "Target.setRemoteLocations": {
    readonly params: Protocol.Target.Commands.SetRemoteLocationsParams;
    readonly result: Protocol.Target.Commands.SetRemoteLocationsResult;
  };
  readonly "Target.getDevToolsTarget": {
    readonly params: Protocol.Target.Commands.GetDevToolsTargetParams;
    readonly result: Protocol.Target.Commands.GetDevToolsTargetResult;
  };
  readonly "Target.openDevTools": {
    readonly params: Protocol.Target.Commands.OpenDevToolsParams;
    readonly result: Protocol.Target.Commands.OpenDevToolsResult;
  };
  readonly "Tethering.bind": {
    readonly params: Protocol.Tethering.Commands.BindParams;
    readonly result: Protocol.Tethering.Commands.BindResult;
  };
  readonly "Tethering.unbind": {
    readonly params: Protocol.Tethering.Commands.UnbindParams;
    readonly result: Protocol.Tethering.Commands.UnbindResult;
  };
  readonly "Tracing.end": {
    readonly params: Protocol.Tracing.Commands.EndParams;
    readonly result: Protocol.Tracing.Commands.EndResult;
  };
  readonly "Tracing.getCategories": {
    readonly params: Protocol.Tracing.Commands.GetCategoriesParams;
    readonly result: Protocol.Tracing.Commands.GetCategoriesResult;
  };
  readonly "Tracing.getTrackEventDescriptor": {
    readonly params: Protocol.Tracing.Commands.GetTrackEventDescriptorParams;
    readonly result: Protocol.Tracing.Commands.GetTrackEventDescriptorResult;
  };
  readonly "Tracing.recordClockSyncMarker": {
    readonly params: Protocol.Tracing.Commands.RecordClockSyncMarkerParams;
    readonly result: Protocol.Tracing.Commands.RecordClockSyncMarkerResult;
  };
  readonly "Tracing.requestMemoryDump": {
    readonly params: Protocol.Tracing.Commands.RequestMemoryDumpParams;
    readonly result: Protocol.Tracing.Commands.RequestMemoryDumpResult;
  };
  readonly "Tracing.start": {
    readonly params: Protocol.Tracing.Commands.StartParams;
    readonly result: Protocol.Tracing.Commands.StartResult;
  };
  readonly "WebAudio.enable": {
    readonly params: Protocol.WebAudio.Commands.EnableParams;
    readonly result: Protocol.WebAudio.Commands.EnableResult;
  };
  readonly "WebAudio.disable": {
    readonly params: Protocol.WebAudio.Commands.DisableParams;
    readonly result: Protocol.WebAudio.Commands.DisableResult;
  };
  readonly "WebAudio.getRealtimeData": {
    readonly params: Protocol.WebAudio.Commands.GetRealtimeDataParams;
    readonly result: Protocol.WebAudio.Commands.GetRealtimeDataResult;
  };
  readonly "WebAuthn.enable": {
    readonly params: Protocol.WebAuthn.Commands.EnableParams;
    readonly result: Protocol.WebAuthn.Commands.EnableResult;
  };
  readonly "WebAuthn.disable": {
    readonly params: Protocol.WebAuthn.Commands.DisableParams;
    readonly result: Protocol.WebAuthn.Commands.DisableResult;
  };
  readonly "WebAuthn.addVirtualAuthenticator": {
    readonly params: Protocol.WebAuthn.Commands.AddVirtualAuthenticatorParams;
    readonly result: Protocol.WebAuthn.Commands.AddVirtualAuthenticatorResult;
  };
  readonly "WebAuthn.setResponseOverrideBits": {
    readonly params: Protocol.WebAuthn.Commands.SetResponseOverrideBitsParams;
    readonly result: Protocol.WebAuthn.Commands.SetResponseOverrideBitsResult;
  };
  readonly "WebAuthn.removeVirtualAuthenticator": {
    readonly params: Protocol.WebAuthn.Commands.RemoveVirtualAuthenticatorParams;
    readonly result: Protocol.WebAuthn.Commands.RemoveVirtualAuthenticatorResult;
  };
  readonly "WebAuthn.addCredential": {
    readonly params: Protocol.WebAuthn.Commands.AddCredentialParams;
    readonly result: Protocol.WebAuthn.Commands.AddCredentialResult;
  };
  readonly "WebAuthn.getCredential": {
    readonly params: Protocol.WebAuthn.Commands.GetCredentialParams;
    readonly result: Protocol.WebAuthn.Commands.GetCredentialResult;
  };
  readonly "WebAuthn.getCredentials": {
    readonly params: Protocol.WebAuthn.Commands.GetCredentialsParams;
    readonly result: Protocol.WebAuthn.Commands.GetCredentialsResult;
  };
  readonly "WebAuthn.removeCredential": {
    readonly params: Protocol.WebAuthn.Commands.RemoveCredentialParams;
    readonly result: Protocol.WebAuthn.Commands.RemoveCredentialResult;
  };
  readonly "WebAuthn.clearCredentials": {
    readonly params: Protocol.WebAuthn.Commands.ClearCredentialsParams;
    readonly result: Protocol.WebAuthn.Commands.ClearCredentialsResult;
  };
  readonly "WebAuthn.setUserVerified": {
    readonly params: Protocol.WebAuthn.Commands.SetUserVerifiedParams;
    readonly result: Protocol.WebAuthn.Commands.SetUserVerifiedResult;
  };
  readonly "WebAuthn.setAutomaticPresenceSimulation": {
    readonly params: Protocol.WebAuthn.Commands.SetAutomaticPresenceSimulationParams;
    readonly result: Protocol.WebAuthn.Commands.SetAutomaticPresenceSimulationResult;
  };
  readonly "WebAuthn.setCredentialProperties": {
    readonly params: Protocol.WebAuthn.Commands.SetCredentialPropertiesParams;
    readonly result: Protocol.WebAuthn.Commands.SetCredentialPropertiesResult;
  };
  readonly "WebMCP.enable": {
    readonly params: Protocol.WebMCP.Commands.EnableParams;
    readonly result: Protocol.WebMCP.Commands.EnableResult;
  };
  readonly "WebMCP.disable": {
    readonly params: Protocol.WebMCP.Commands.DisableParams;
    readonly result: Protocol.WebMCP.Commands.DisableResult;
  };
  readonly "WebMCP.invokeTool": {
    readonly params: Protocol.WebMCP.Commands.InvokeToolParams;
    readonly result: Protocol.WebMCP.Commands.InvokeToolResult;
  };
  readonly "WebMCP.cancelInvocation": {
    readonly params: Protocol.WebMCP.Commands.CancelInvocationParams;
    readonly result: Protocol.WebMCP.Commands.CancelInvocationResult;
  };
  readonly "Console.clearMessages": {
    readonly params: Protocol.Console.Commands.ClearMessagesParams;
    readonly result: Protocol.Console.Commands.ClearMessagesResult;
  };
  readonly "Console.disable": {
    readonly params: Protocol.Console.Commands.DisableParams;
    readonly result: Protocol.Console.Commands.DisableResult;
  };
  readonly "Console.enable": {
    readonly params: Protocol.Console.Commands.EnableParams;
    readonly result: Protocol.Console.Commands.EnableResult;
  };
  readonly "Debugger.continueToLocation": {
    readonly params: Protocol.Debugger.Commands.ContinueToLocationParams;
    readonly result: Protocol.Debugger.Commands.ContinueToLocationResult;
  };
  readonly "Debugger.disable": {
    readonly params: Protocol.Debugger.Commands.DisableParams;
    readonly result: Protocol.Debugger.Commands.DisableResult;
  };
  readonly "Debugger.enable": {
    readonly params: Protocol.Debugger.Commands.EnableParams;
    readonly result: Protocol.Debugger.Commands.EnableResult;
  };
  readonly "Debugger.evaluateOnCallFrame": {
    readonly params: Protocol.Debugger.Commands.EvaluateOnCallFrameParams;
    readonly result: Protocol.Debugger.Commands.EvaluateOnCallFrameResult;
  };
  readonly "Debugger.getPossibleBreakpoints": {
    readonly params: Protocol.Debugger.Commands.GetPossibleBreakpointsParams;
    readonly result: Protocol.Debugger.Commands.GetPossibleBreakpointsResult;
  };
  readonly "Debugger.getScriptSource": {
    readonly params: Protocol.Debugger.Commands.GetScriptSourceParams;
    readonly result: Protocol.Debugger.Commands.GetScriptSourceResult;
  };
  readonly "Debugger.disassembleWasmModule": {
    readonly params: Protocol.Debugger.Commands.DisassembleWasmModuleParams;
    readonly result: Protocol.Debugger.Commands.DisassembleWasmModuleResult;
  };
  readonly "Debugger.nextWasmDisassemblyChunk": {
    readonly params: Protocol.Debugger.Commands.NextWasmDisassemblyChunkParams;
    readonly result: Protocol.Debugger.Commands.NextWasmDisassemblyChunkResult;
  };
  readonly "Debugger.getWasmBytecode": {
    readonly params: Protocol.Debugger.Commands.GetWasmBytecodeParams;
    readonly result: Protocol.Debugger.Commands.GetWasmBytecodeResult;
  };
  readonly "Debugger.getStackTrace": {
    readonly params: Protocol.Debugger.Commands.GetStackTraceParams;
    readonly result: Protocol.Debugger.Commands.GetStackTraceResult;
  };
  readonly "Debugger.pause": {
    readonly params: Protocol.Debugger.Commands.PauseParams;
    readonly result: Protocol.Debugger.Commands.PauseResult;
  };
  readonly "Debugger.pauseOnAsyncCall": {
    readonly params: Protocol.Debugger.Commands.PauseOnAsyncCallParams;
    readonly result: Protocol.Debugger.Commands.PauseOnAsyncCallResult;
  };
  readonly "Debugger.removeBreakpoint": {
    readonly params: Protocol.Debugger.Commands.RemoveBreakpointParams;
    readonly result: Protocol.Debugger.Commands.RemoveBreakpointResult;
  };
  readonly "Debugger.restartFrame": {
    readonly params: Protocol.Debugger.Commands.RestartFrameParams;
    readonly result: Protocol.Debugger.Commands.RestartFrameResult;
  };
  readonly "Debugger.resume": {
    readonly params: Protocol.Debugger.Commands.ResumeParams;
    readonly result: Protocol.Debugger.Commands.ResumeResult;
  };
  readonly "Debugger.searchInContent": {
    readonly params: Protocol.Debugger.Commands.SearchInContentParams;
    readonly result: Protocol.Debugger.Commands.SearchInContentResult;
  };
  readonly "Debugger.setAsyncCallStackDepth": {
    readonly params: Protocol.Debugger.Commands.SetAsyncCallStackDepthParams;
    readonly result: Protocol.Debugger.Commands.SetAsyncCallStackDepthResult;
  };
  readonly "Debugger.setBlackboxExecutionContexts": {
    readonly params: Protocol.Debugger.Commands.SetBlackboxExecutionContextsParams;
    readonly result: Protocol.Debugger.Commands.SetBlackboxExecutionContextsResult;
  };
  readonly "Debugger.setBlackboxPatterns": {
    readonly params: Protocol.Debugger.Commands.SetBlackboxPatternsParams;
    readonly result: Protocol.Debugger.Commands.SetBlackboxPatternsResult;
  };
  readonly "Debugger.setBlackboxedRanges": {
    readonly params: Protocol.Debugger.Commands.SetBlackboxedRangesParams;
    readonly result: Protocol.Debugger.Commands.SetBlackboxedRangesResult;
  };
  readonly "Debugger.setBreakpoint": {
    readonly params: Protocol.Debugger.Commands.SetBreakpointParams;
    readonly result: Protocol.Debugger.Commands.SetBreakpointResult;
  };
  readonly "Debugger.setInstrumentationBreakpoint": {
    readonly params: Protocol.Debugger.Commands.SetInstrumentationBreakpointParams;
    readonly result: Protocol.Debugger.Commands.SetInstrumentationBreakpointResult;
  };
  readonly "Debugger.setBreakpointByUrl": {
    readonly params: Protocol.Debugger.Commands.SetBreakpointByUrlParams;
    readonly result: Protocol.Debugger.Commands.SetBreakpointByUrlResult;
  };
  readonly "Debugger.setBreakpointOnFunctionCall": {
    readonly params: Protocol.Debugger.Commands.SetBreakpointOnFunctionCallParams;
    readonly result: Protocol.Debugger.Commands.SetBreakpointOnFunctionCallResult;
  };
  readonly "Debugger.setBreakpointsActive": {
    readonly params: Protocol.Debugger.Commands.SetBreakpointsActiveParams;
    readonly result: Protocol.Debugger.Commands.SetBreakpointsActiveResult;
  };
  readonly "Debugger.setPauseOnExceptions": {
    readonly params: Protocol.Debugger.Commands.SetPauseOnExceptionsParams;
    readonly result: Protocol.Debugger.Commands.SetPauseOnExceptionsResult;
  };
  readonly "Debugger.setReturnValue": {
    readonly params: Protocol.Debugger.Commands.SetReturnValueParams;
    readonly result: Protocol.Debugger.Commands.SetReturnValueResult;
  };
  readonly "Debugger.setScriptSource": {
    readonly params: Protocol.Debugger.Commands.SetScriptSourceParams;
    readonly result: Protocol.Debugger.Commands.SetScriptSourceResult;
  };
  readonly "Debugger.setSkipAllPauses": {
    readonly params: Protocol.Debugger.Commands.SetSkipAllPausesParams;
    readonly result: Protocol.Debugger.Commands.SetSkipAllPausesResult;
  };
  readonly "Debugger.setVariableValue": {
    readonly params: Protocol.Debugger.Commands.SetVariableValueParams;
    readonly result: Protocol.Debugger.Commands.SetVariableValueResult;
  };
  readonly "Debugger.stepInto": {
    readonly params: Protocol.Debugger.Commands.StepIntoParams;
    readonly result: Protocol.Debugger.Commands.StepIntoResult;
  };
  readonly "Debugger.stepOut": {
    readonly params: Protocol.Debugger.Commands.StepOutParams;
    readonly result: Protocol.Debugger.Commands.StepOutResult;
  };
  readonly "Debugger.stepOver": {
    readonly params: Protocol.Debugger.Commands.StepOverParams;
    readonly result: Protocol.Debugger.Commands.StepOverResult;
  };
  readonly "HeapProfiler.addInspectedHeapObject": {
    readonly params: Protocol.HeapProfiler.Commands.AddInspectedHeapObjectParams;
    readonly result: Protocol.HeapProfiler.Commands.AddInspectedHeapObjectResult;
  };
  readonly "HeapProfiler.collectGarbage": {
    readonly params: Protocol.HeapProfiler.Commands.CollectGarbageParams;
    readonly result: Protocol.HeapProfiler.Commands.CollectGarbageResult;
  };
  readonly "HeapProfiler.disable": {
    readonly params: Protocol.HeapProfiler.Commands.DisableParams;
    readonly result: Protocol.HeapProfiler.Commands.DisableResult;
  };
  readonly "HeapProfiler.enable": {
    readonly params: Protocol.HeapProfiler.Commands.EnableParams;
    readonly result: Protocol.HeapProfiler.Commands.EnableResult;
  };
  readonly "HeapProfiler.getHeapObjectId": {
    readonly params: Protocol.HeapProfiler.Commands.GetHeapObjectIdParams;
    readonly result: Protocol.HeapProfiler.Commands.GetHeapObjectIdResult;
  };
  readonly "HeapProfiler.getObjectByHeapObjectId": {
    readonly params: Protocol.HeapProfiler.Commands.GetObjectByHeapObjectIdParams;
    readonly result: Protocol.HeapProfiler.Commands.GetObjectByHeapObjectIdResult;
  };
  readonly "HeapProfiler.getSamplingProfile": {
    readonly params: Protocol.HeapProfiler.Commands.GetSamplingProfileParams;
    readonly result: Protocol.HeapProfiler.Commands.GetSamplingProfileResult;
  };
  readonly "HeapProfiler.startSampling": {
    readonly params: Protocol.HeapProfiler.Commands.StartSamplingParams;
    readonly result: Protocol.HeapProfiler.Commands.StartSamplingResult;
  };
  readonly "HeapProfiler.startTrackingHeapObjects": {
    readonly params: Protocol.HeapProfiler.Commands.StartTrackingHeapObjectsParams;
    readonly result: Protocol.HeapProfiler.Commands.StartTrackingHeapObjectsResult;
  };
  readonly "HeapProfiler.stopSampling": {
    readonly params: Protocol.HeapProfiler.Commands.StopSamplingParams;
    readonly result: Protocol.HeapProfiler.Commands.StopSamplingResult;
  };
  readonly "HeapProfiler.stopTrackingHeapObjects": {
    readonly params: Protocol.HeapProfiler.Commands.StopTrackingHeapObjectsParams;
    readonly result: Protocol.HeapProfiler.Commands.StopTrackingHeapObjectsResult;
  };
  readonly "HeapProfiler.takeHeapSnapshot": {
    readonly params: Protocol.HeapProfiler.Commands.TakeHeapSnapshotParams;
    readonly result: Protocol.HeapProfiler.Commands.TakeHeapSnapshotResult;
  };
  readonly "Profiler.disable": {
    readonly params: Protocol.Profiler.Commands.DisableParams;
    readonly result: Protocol.Profiler.Commands.DisableResult;
  };
  readonly "Profiler.enable": {
    readonly params: Protocol.Profiler.Commands.EnableParams;
    readonly result: Protocol.Profiler.Commands.EnableResult;
  };
  readonly "Profiler.getBestEffortCoverage": {
    readonly params: Protocol.Profiler.Commands.GetBestEffortCoverageParams;
    readonly result: Protocol.Profiler.Commands.GetBestEffortCoverageResult;
  };
  readonly "Profiler.setSamplingInterval": {
    readonly params: Protocol.Profiler.Commands.SetSamplingIntervalParams;
    readonly result: Protocol.Profiler.Commands.SetSamplingIntervalResult;
  };
  readonly "Profiler.start": {
    readonly params: Protocol.Profiler.Commands.StartParams;
    readonly result: Protocol.Profiler.Commands.StartResult;
  };
  readonly "Profiler.startPreciseCoverage": {
    readonly params: Protocol.Profiler.Commands.StartPreciseCoverageParams;
    readonly result: Protocol.Profiler.Commands.StartPreciseCoverageResult;
  };
  readonly "Profiler.stop": {
    readonly params: Protocol.Profiler.Commands.StopParams;
    readonly result: Protocol.Profiler.Commands.StopResult;
  };
  readonly "Profiler.stopPreciseCoverage": {
    readonly params: Protocol.Profiler.Commands.StopPreciseCoverageParams;
    readonly result: Protocol.Profiler.Commands.StopPreciseCoverageResult;
  };
  readonly "Profiler.takePreciseCoverage": {
    readonly params: Protocol.Profiler.Commands.TakePreciseCoverageParams;
    readonly result: Protocol.Profiler.Commands.TakePreciseCoverageResult;
  };
  readonly "Runtime.awaitPromise": {
    readonly params: Protocol.Runtime.Commands.AwaitPromiseParams;
    readonly result: Protocol.Runtime.Commands.AwaitPromiseResult;
  };
  readonly "Runtime.callFunctionOn": {
    readonly params: Protocol.Runtime.Commands.CallFunctionOnParams;
    readonly result: Protocol.Runtime.Commands.CallFunctionOnResult;
  };
  readonly "Runtime.compileScript": {
    readonly params: Protocol.Runtime.Commands.CompileScriptParams;
    readonly result: Protocol.Runtime.Commands.CompileScriptResult;
  };
  readonly "Runtime.disable": {
    readonly params: Protocol.Runtime.Commands.DisableParams;
    readonly result: Protocol.Runtime.Commands.DisableResult;
  };
  readonly "Runtime.discardConsoleEntries": {
    readonly params: Protocol.Runtime.Commands.DiscardConsoleEntriesParams;
    readonly result: Protocol.Runtime.Commands.DiscardConsoleEntriesResult;
  };
  readonly "Runtime.enable": {
    readonly params: Protocol.Runtime.Commands.EnableParams;
    readonly result: Protocol.Runtime.Commands.EnableResult;
  };
  readonly "Runtime.evaluate": {
    readonly params: Protocol.Runtime.Commands.EvaluateParams;
    readonly result: Protocol.Runtime.Commands.EvaluateResult;
  };
  readonly "Runtime.getIsolateId": {
    readonly params: Protocol.Runtime.Commands.GetIsolateIdParams;
    readonly result: Protocol.Runtime.Commands.GetIsolateIdResult;
  };
  readonly "Runtime.getHeapUsage": {
    readonly params: Protocol.Runtime.Commands.GetHeapUsageParams;
    readonly result: Protocol.Runtime.Commands.GetHeapUsageResult;
  };
  readonly "Runtime.getProperties": {
    readonly params: Protocol.Runtime.Commands.GetPropertiesParams;
    readonly result: Protocol.Runtime.Commands.GetPropertiesResult;
  };
  readonly "Runtime.globalLexicalScopeNames": {
    readonly params: Protocol.Runtime.Commands.GlobalLexicalScopeNamesParams;
    readonly result: Protocol.Runtime.Commands.GlobalLexicalScopeNamesResult;
  };
  readonly "Runtime.queryObjects": {
    readonly params: Protocol.Runtime.Commands.QueryObjectsParams;
    readonly result: Protocol.Runtime.Commands.QueryObjectsResult;
  };
  readonly "Runtime.releaseObject": {
    readonly params: Protocol.Runtime.Commands.ReleaseObjectParams;
    readonly result: Protocol.Runtime.Commands.ReleaseObjectResult;
  };
  readonly "Runtime.releaseObjectGroup": {
    readonly params: Protocol.Runtime.Commands.ReleaseObjectGroupParams;
    readonly result: Protocol.Runtime.Commands.ReleaseObjectGroupResult;
  };
  readonly "Runtime.runIfWaitingForDebugger": {
    readonly params: Protocol.Runtime.Commands.RunIfWaitingForDebuggerParams;
    readonly result: Protocol.Runtime.Commands.RunIfWaitingForDebuggerResult;
  };
  readonly "Runtime.runScript": {
    readonly params: Protocol.Runtime.Commands.RunScriptParams;
    readonly result: Protocol.Runtime.Commands.RunScriptResult;
  };
  readonly "Runtime.setAsyncCallStackDepth": {
    readonly params: Protocol.Runtime.Commands.SetAsyncCallStackDepthParams;
    readonly result: Protocol.Runtime.Commands.SetAsyncCallStackDepthResult;
  };
  readonly "Runtime.setCustomObjectFormatterEnabled": {
    readonly params: Protocol.Runtime.Commands.SetCustomObjectFormatterEnabledParams;
    readonly result: Protocol.Runtime.Commands.SetCustomObjectFormatterEnabledResult;
  };
  readonly "Runtime.setMaxCallStackSizeToCapture": {
    readonly params: Protocol.Runtime.Commands.SetMaxCallStackSizeToCaptureParams;
    readonly result: Protocol.Runtime.Commands.SetMaxCallStackSizeToCaptureResult;
  };
  readonly "Runtime.terminateExecution": {
    readonly params: Protocol.Runtime.Commands.TerminateExecutionParams;
    readonly result: Protocol.Runtime.Commands.TerminateExecutionResult;
  };
  readonly "Runtime.addBinding": {
    readonly params: Protocol.Runtime.Commands.AddBindingParams;
    readonly result: Protocol.Runtime.Commands.AddBindingResult;
  };
  readonly "Runtime.removeBinding": {
    readonly params: Protocol.Runtime.Commands.RemoveBindingParams;
    readonly result: Protocol.Runtime.Commands.RemoveBindingResult;
  };
  readonly "Runtime.getExceptionDetails": {
    readonly params: Protocol.Runtime.Commands.GetExceptionDetailsParams;
    readonly result: Protocol.Runtime.Commands.GetExceptionDetailsResult;
  };
  readonly "Schema.getDomains": {
    readonly params: Protocol.Schema.Commands.GetDomainsParams;
    readonly result: Protocol.Schema.Commands.GetDomainsResult;
  };
}

export interface ProtocolEventMap {
  readonly "Accessibility.loadComplete": Protocol.Accessibility.Events.LoadCompleteEvent;
  readonly "Accessibility.nodesUpdated": Protocol.Accessibility.Events.NodesUpdatedEvent;
  readonly "Animation.animationCanceled": Protocol.Animation.Events.AnimationCanceledEvent;
  readonly "Animation.animationCreated": Protocol.Animation.Events.AnimationCreatedEvent;
  readonly "Animation.animationStarted": Protocol.Animation.Events.AnimationStartedEvent;
  readonly "Animation.animationUpdated": Protocol.Animation.Events.AnimationUpdatedEvent;
  readonly "Audits.issueAdded": Protocol.Audits.Events.IssueAddedEvent;
  readonly "Autofill.addressFormFilled": Protocol.Autofill.Events.AddressFormFilledEvent;
  readonly "BackgroundService.recordingStateChanged": Protocol.BackgroundService.Events.RecordingStateChangedEvent;
  readonly "BackgroundService.backgroundServiceEventReceived": Protocol.BackgroundService.Events.BackgroundServiceEventReceivedEvent;
  readonly "BluetoothEmulation.gattOperationReceived": Protocol.BluetoothEmulation.Events.GattOperationReceivedEvent;
  readonly "BluetoothEmulation.characteristicOperationReceived": Protocol.BluetoothEmulation.Events.CharacteristicOperationReceivedEvent;
  readonly "BluetoothEmulation.descriptorOperationReceived": Protocol.BluetoothEmulation.Events.DescriptorOperationReceivedEvent;
  readonly "Browser.downloadWillBegin": Protocol.Browser.Events.DownloadWillBeginEvent;
  readonly "Browser.downloadProgress": Protocol.Browser.Events.DownloadProgressEvent;
  readonly "CSS.fontsUpdated": Protocol.CSS.Events.FontsUpdatedEvent;
  readonly "CSS.mediaQueryResultChanged": Protocol.CSS.Events.MediaQueryResultChangedEvent;
  readonly "CSS.styleSheetAdded": Protocol.CSS.Events.StyleSheetAddedEvent;
  readonly "CSS.styleSheetChanged": Protocol.CSS.Events.StyleSheetChangedEvent;
  readonly "CSS.styleSheetRemoved": Protocol.CSS.Events.StyleSheetRemovedEvent;
  readonly "CSS.computedStyleUpdated": Protocol.CSS.Events.ComputedStyleUpdatedEvent;
  readonly "Cast.sinksUpdated": Protocol.Cast.Events.SinksUpdatedEvent;
  readonly "Cast.issueUpdated": Protocol.Cast.Events.IssueUpdatedEvent;
  readonly "DOM.attributeModified": Protocol.DOM.Events.AttributeModifiedEvent;
  readonly "DOM.adoptedStyleSheetsModified": Protocol.DOM.Events.AdoptedStyleSheetsModifiedEvent;
  readonly "DOM.attributeRemoved": Protocol.DOM.Events.AttributeRemovedEvent;
  readonly "DOM.characterDataModified": Protocol.DOM.Events.CharacterDataModifiedEvent;
  readonly "DOM.childNodeCountUpdated": Protocol.DOM.Events.ChildNodeCountUpdatedEvent;
  readonly "DOM.childNodeInserted": Protocol.DOM.Events.ChildNodeInsertedEvent;
  readonly "DOM.childNodeRemoved": Protocol.DOM.Events.ChildNodeRemovedEvent;
  readonly "DOM.distributedNodesUpdated": Protocol.DOM.Events.DistributedNodesUpdatedEvent;
  readonly "DOM.documentUpdated": Protocol.DOM.Events.DocumentUpdatedEvent;
  readonly "DOM.inlineStyleInvalidated": Protocol.DOM.Events.InlineStyleInvalidatedEvent;
  readonly "DOM.pseudoElementAdded": Protocol.DOM.Events.PseudoElementAddedEvent;
  readonly "DOM.topLayerElementsUpdated": Protocol.DOM.Events.TopLayerElementsUpdatedEvent;
  readonly "DOM.scrollableFlagUpdated": Protocol.DOM.Events.ScrollableFlagUpdatedEvent;
  readonly "DOM.adRelatedStateUpdated": Protocol.DOM.Events.AdRelatedStateUpdatedEvent;
  readonly "DOM.affectedByStartingStylesFlagUpdated": Protocol.DOM.Events.AffectedByStartingStylesFlagUpdatedEvent;
  readonly "DOM.pseudoElementRemoved": Protocol.DOM.Events.PseudoElementRemovedEvent;
  readonly "DOM.setChildNodes": Protocol.DOM.Events.SetChildNodesEvent;
  readonly "DOM.shadowRootPopped": Protocol.DOM.Events.ShadowRootPoppedEvent;
  readonly "DOM.shadowRootPushed": Protocol.DOM.Events.ShadowRootPushedEvent;
  readonly "DOMStorage.domStorageItemAdded": Protocol.DOMStorage.Events.DomStorageItemAddedEvent;
  readonly "DOMStorage.domStorageItemRemoved": Protocol.DOMStorage.Events.DomStorageItemRemovedEvent;
  readonly "DOMStorage.domStorageItemUpdated": Protocol.DOMStorage.Events.DomStorageItemUpdatedEvent;
  readonly "DOMStorage.domStorageItemsCleared": Protocol.DOMStorage.Events.DomStorageItemsClearedEvent;
  readonly "DeviceAccess.deviceRequestPrompted": Protocol.DeviceAccess.Events.DeviceRequestPromptedEvent;
  readonly "Emulation.virtualTimeBudgetExpired": Protocol.Emulation.Events.VirtualTimeBudgetExpiredEvent;
  readonly "Emulation.screenOrientationLockChanged": Protocol.Emulation.Events.ScreenOrientationLockChangedEvent;
  readonly "FedCm.dialogShown": Protocol.FedCm.Events.DialogShownEvent;
  readonly "FedCm.dialogClosed": Protocol.FedCm.Events.DialogClosedEvent;
  readonly "Fetch.requestPaused": Protocol.Fetch.Events.RequestPausedEvent;
  readonly "Fetch.authRequired": Protocol.Fetch.Events.AuthRequiredEvent;
  readonly "Input.dragIntercepted": Protocol.Input.Events.DragInterceptedEvent;
  readonly "Inspector.detached": Protocol.Inspector.Events.DetachedEvent;
  readonly "Inspector.targetCrashed": Protocol.Inspector.Events.TargetCrashedEvent;
  readonly "Inspector.targetReloadedAfterCrash": Protocol.Inspector.Events.TargetReloadedAfterCrashEvent;
  readonly "Inspector.workerScriptLoaded": Protocol.Inspector.Events.WorkerScriptLoadedEvent;
  readonly "LayerTree.layerPainted": Protocol.LayerTree.Events.LayerPaintedEvent;
  readonly "LayerTree.layerTreeDidChange": Protocol.LayerTree.Events.LayerTreeDidChangeEvent;
  readonly "Log.entryAdded": Protocol.Log.Events.EntryAddedEvent;
  readonly "Media.playerPropertiesChanged": Protocol.Media.Events.PlayerPropertiesChangedEvent;
  readonly "Media.playerEventsAdded": Protocol.Media.Events.PlayerEventsAddedEvent;
  readonly "Media.playerMessagesLogged": Protocol.Media.Events.PlayerMessagesLoggedEvent;
  readonly "Media.playerErrorsRaised": Protocol.Media.Events.PlayerErrorsRaisedEvent;
  readonly "Media.playerCreated": Protocol.Media.Events.PlayerCreatedEvent;
  readonly "Network.dataReceived": Protocol.Network.Events.DataReceivedEvent;
  readonly "Network.eventSourceMessageReceived": Protocol.Network.Events.EventSourceMessageReceivedEvent;
  readonly "Network.loadingFailed": Protocol.Network.Events.LoadingFailedEvent;
  readonly "Network.loadingFinished": Protocol.Network.Events.LoadingFinishedEvent;
  readonly "Network.requestServedFromCache": Protocol.Network.Events.RequestServedFromCacheEvent;
  readonly "Network.requestWillBeSent": Protocol.Network.Events.RequestWillBeSentEvent;
  readonly "Network.resourceChangedPriority": Protocol.Network.Events.ResourceChangedPriorityEvent;
  readonly "Network.signedExchangeReceived": Protocol.Network.Events.SignedExchangeReceivedEvent;
  readonly "Network.responseReceived": Protocol.Network.Events.ResponseReceivedEvent;
  readonly "Network.webSocketClosed": Protocol.Network.Events.WebSocketClosedEvent;
  readonly "Network.webSocketCreated": Protocol.Network.Events.WebSocketCreatedEvent;
  readonly "Network.webSocketFrameError": Protocol.Network.Events.WebSocketFrameErrorEvent;
  readonly "Network.webSocketFrameReceived": Protocol.Network.Events.WebSocketFrameReceivedEvent;
  readonly "Network.webSocketFrameSent": Protocol.Network.Events.WebSocketFrameSentEvent;
  readonly "Network.webSocketHandshakeResponseReceived": Protocol.Network.Events.WebSocketHandshakeResponseReceivedEvent;
  readonly "Network.webSocketWillSendHandshakeRequest": Protocol.Network.Events.WebSocketWillSendHandshakeRequestEvent;
  readonly "Network.webTransportCreated": Protocol.Network.Events.WebTransportCreatedEvent;
  readonly "Network.webTransportConnectionEstablished": Protocol.Network.Events.WebTransportConnectionEstablishedEvent;
  readonly "Network.webTransportClosed": Protocol.Network.Events.WebTransportClosedEvent;
  readonly "Network.directTCPSocketCreated": Protocol.Network.Events.DirectTCPSocketCreatedEvent;
  readonly "Network.directTCPSocketOpened": Protocol.Network.Events.DirectTCPSocketOpenedEvent;
  readonly "Network.directTCPSocketAborted": Protocol.Network.Events.DirectTCPSocketAbortedEvent;
  readonly "Network.directTCPSocketClosed": Protocol.Network.Events.DirectTCPSocketClosedEvent;
  readonly "Network.directTCPSocketChunkSent": Protocol.Network.Events.DirectTCPSocketChunkSentEvent;
  readonly "Network.directTCPSocketChunkReceived": Protocol.Network.Events.DirectTCPSocketChunkReceivedEvent;
  readonly "Network.directUDPSocketJoinedMulticastGroup": Protocol.Network.Events.DirectUDPSocketJoinedMulticastGroupEvent;
  readonly "Network.directUDPSocketLeftMulticastGroup": Protocol.Network.Events.DirectUDPSocketLeftMulticastGroupEvent;
  readonly "Network.directUDPSocketCreated": Protocol.Network.Events.DirectUDPSocketCreatedEvent;
  readonly "Network.directUDPSocketOpened": Protocol.Network.Events.DirectUDPSocketOpenedEvent;
  readonly "Network.directUDPSocketAborted": Protocol.Network.Events.DirectUDPSocketAbortedEvent;
  readonly "Network.directUDPSocketClosed": Protocol.Network.Events.DirectUDPSocketClosedEvent;
  readonly "Network.directUDPSocketChunkSent": Protocol.Network.Events.DirectUDPSocketChunkSentEvent;
  readonly "Network.directUDPSocketChunkReceived": Protocol.Network.Events.DirectUDPSocketChunkReceivedEvent;
  readonly "Network.requestWillBeSentExtraInfo": Protocol.Network.Events.RequestWillBeSentExtraInfoEvent;
  readonly "Network.responseReceivedExtraInfo": Protocol.Network.Events.ResponseReceivedExtraInfoEvent;
  readonly "Network.responseReceivedEarlyHints": Protocol.Network.Events.ResponseReceivedEarlyHintsEvent;
  readonly "Network.trustTokenOperationDone": Protocol.Network.Events.TrustTokenOperationDoneEvent;
  readonly "Network.policyUpdated": Protocol.Network.Events.PolicyUpdatedEvent;
  readonly "Network.reportingApiReportAdded": Protocol.Network.Events.ReportingApiReportAddedEvent;
  readonly "Network.reportingApiReportUpdated": Protocol.Network.Events.ReportingApiReportUpdatedEvent;
  readonly "Network.reportingApiEndpointsChangedForOrigin": Protocol.Network.Events.ReportingApiEndpointsChangedForOriginEvent;
  readonly "Network.deviceBoundSessionsAdded": Protocol.Network.Events.DeviceBoundSessionsAddedEvent;
  readonly "Network.deviceBoundSessionEventOccurred": Protocol.Network.Events.DeviceBoundSessionEventOccurredEvent;
  readonly "Overlay.inspectNodeRequested": Protocol.Overlay.Events.InspectNodeRequestedEvent;
  readonly "Overlay.nodeHighlightRequested": Protocol.Overlay.Events.NodeHighlightRequestedEvent;
  readonly "Overlay.screenshotRequested": Protocol.Overlay.Events.ScreenshotRequestedEvent;
  readonly "Overlay.inspectPanelShowRequested": Protocol.Overlay.Events.InspectPanelShowRequestedEvent;
  readonly "Overlay.inspectedElementWindowRestored": Protocol.Overlay.Events.InspectedElementWindowRestoredEvent;
  readonly "Overlay.inspectModeCanceled": Protocol.Overlay.Events.InspectModeCanceledEvent;
  readonly "Page.domContentEventFired": Protocol.Page.Events.DomContentEventFiredEvent;
  readonly "Page.fileChooserOpened": Protocol.Page.Events.FileChooserOpenedEvent;
  readonly "Page.frameAttached": Protocol.Page.Events.FrameAttachedEvent;
  readonly "Page.frameClearedScheduledNavigation": Protocol.Page.Events.FrameClearedScheduledNavigationEvent;
  readonly "Page.frameDetached": Protocol.Page.Events.FrameDetachedEvent;
  readonly "Page.frameSubtreeWillBeDetached": Protocol.Page.Events.FrameSubtreeWillBeDetachedEvent;
  readonly "Page.frameNavigated": Protocol.Page.Events.FrameNavigatedEvent;
  readonly "Page.documentOpened": Protocol.Page.Events.DocumentOpenedEvent;
  readonly "Page.frameResized": Protocol.Page.Events.FrameResizedEvent;
  readonly "Page.frameStartedNavigating": Protocol.Page.Events.FrameStartedNavigatingEvent;
  readonly "Page.frameRequestedNavigation": Protocol.Page.Events.FrameRequestedNavigationEvent;
  readonly "Page.frameScheduledNavigation": Protocol.Page.Events.FrameScheduledNavigationEvent;
  readonly "Page.frameStartedLoading": Protocol.Page.Events.FrameStartedLoadingEvent;
  readonly "Page.frameStoppedLoading": Protocol.Page.Events.FrameStoppedLoadingEvent;
  readonly "Page.downloadWillBegin": Protocol.Page.Events.DownloadWillBeginEvent;
  readonly "Page.downloadProgress": Protocol.Page.Events.DownloadProgressEvent;
  readonly "Page.interstitialHidden": Protocol.Page.Events.InterstitialHiddenEvent;
  readonly "Page.interstitialShown": Protocol.Page.Events.InterstitialShownEvent;
  readonly "Page.javascriptDialogClosed": Protocol.Page.Events.JavascriptDialogClosedEvent;
  readonly "Page.javascriptDialogOpening": Protocol.Page.Events.JavascriptDialogOpeningEvent;
  readonly "Page.lifecycleEvent": Protocol.Page.Events.LifecycleEventEvent;
  readonly "Page.backForwardCacheNotUsed": Protocol.Page.Events.BackForwardCacheNotUsedEvent;
  readonly "Page.loadEventFired": Protocol.Page.Events.LoadEventFiredEvent;
  readonly "Page.navigatedWithinDocument": Protocol.Page.Events.NavigatedWithinDocumentEvent;
  readonly "Page.screencastFrame": Protocol.Page.Events.ScreencastFrameEvent;
  readonly "Page.screencastVisibilityChanged": Protocol.Page.Events.ScreencastVisibilityChangedEvent;
  readonly "Page.windowOpen": Protocol.Page.Events.WindowOpenEvent;
  readonly "Page.compilationCacheProduced": Protocol.Page.Events.CompilationCacheProducedEvent;
  readonly "Performance.metrics": Protocol.Performance.Events.MetricsEvent;
  readonly "PerformanceTimeline.timelineEventAdded": Protocol.PerformanceTimeline.Events.TimelineEventAddedEvent;
  readonly "Preload.ruleSetUpdated": Protocol.Preload.Events.RuleSetUpdatedEvent;
  readonly "Preload.ruleSetRemoved": Protocol.Preload.Events.RuleSetRemovedEvent;
  readonly "Preload.preloadEnabledStateUpdated": Protocol.Preload.Events.PreloadEnabledStateUpdatedEvent;
  readonly "Preload.prefetchStatusUpdated": Protocol.Preload.Events.PrefetchStatusUpdatedEvent;
  readonly "Preload.prerenderStatusUpdated": Protocol.Preload.Events.PrerenderStatusUpdatedEvent;
  readonly "Preload.preloadingAttemptSourcesUpdated": Protocol.Preload.Events.PreloadingAttemptSourcesUpdatedEvent;
  readonly "Security.certificateError": Protocol.Security.Events.CertificateErrorEvent;
  readonly "Security.visibleSecurityStateChanged": Protocol.Security.Events.VisibleSecurityStateChangedEvent;
  readonly "Security.securityStateChanged": Protocol.Security.Events.SecurityStateChangedEvent;
  readonly "ServiceWorker.workerErrorReported": Protocol.ServiceWorker.Events.WorkerErrorReportedEvent;
  readonly "ServiceWorker.workerRegistrationUpdated": Protocol.ServiceWorker.Events.WorkerRegistrationUpdatedEvent;
  readonly "ServiceWorker.workerVersionUpdated": Protocol.ServiceWorker.Events.WorkerVersionUpdatedEvent;
  readonly "SmartCardEmulation.establishContextRequested": Protocol.SmartCardEmulation.Events.EstablishContextRequestedEvent;
  readonly "SmartCardEmulation.releaseContextRequested": Protocol.SmartCardEmulation.Events.ReleaseContextRequestedEvent;
  readonly "SmartCardEmulation.listReadersRequested": Protocol.SmartCardEmulation.Events.ListReadersRequestedEvent;
  readonly "SmartCardEmulation.getStatusChangeRequested": Protocol.SmartCardEmulation.Events.GetStatusChangeRequestedEvent;
  readonly "SmartCardEmulation.cancelRequested": Protocol.SmartCardEmulation.Events.CancelRequestedEvent;
  readonly "SmartCardEmulation.connectRequested": Protocol.SmartCardEmulation.Events.ConnectRequestedEvent;
  readonly "SmartCardEmulation.disconnectRequested": Protocol.SmartCardEmulation.Events.DisconnectRequestedEvent;
  readonly "SmartCardEmulation.transmitRequested": Protocol.SmartCardEmulation.Events.TransmitRequestedEvent;
  readonly "SmartCardEmulation.controlRequested": Protocol.SmartCardEmulation.Events.ControlRequestedEvent;
  readonly "SmartCardEmulation.getAttribRequested": Protocol.SmartCardEmulation.Events.GetAttribRequestedEvent;
  readonly "SmartCardEmulation.setAttribRequested": Protocol.SmartCardEmulation.Events.SetAttribRequestedEvent;
  readonly "SmartCardEmulation.statusRequested": Protocol.SmartCardEmulation.Events.StatusRequestedEvent;
  readonly "SmartCardEmulation.beginTransactionRequested": Protocol.SmartCardEmulation.Events.BeginTransactionRequestedEvent;
  readonly "SmartCardEmulation.endTransactionRequested": Protocol.SmartCardEmulation.Events.EndTransactionRequestedEvent;
  readonly "Storage.cacheStorageContentUpdated": Protocol.Storage.Events.CacheStorageContentUpdatedEvent;
  readonly "Storage.cacheStorageListUpdated": Protocol.Storage.Events.CacheStorageListUpdatedEvent;
  readonly "Storage.indexedDBContentUpdated": Protocol.Storage.Events.IndexedDBContentUpdatedEvent;
  readonly "Storage.indexedDBListUpdated": Protocol.Storage.Events.IndexedDBListUpdatedEvent;
  readonly "Storage.sharedStorageAccessed": Protocol.Storage.Events.SharedStorageAccessedEvent;
  readonly "Storage.sharedStorageWorkletOperationExecutionFinished": Protocol.Storage.Events.SharedStorageWorkletOperationExecutionFinishedEvent;
  readonly "Storage.storageBucketCreatedOrUpdated": Protocol.Storage.Events.StorageBucketCreatedOrUpdatedEvent;
  readonly "Storage.storageBucketDeleted": Protocol.Storage.Events.StorageBucketDeletedEvent;
  readonly "Target.attachedToTarget": Protocol.Target.Events.AttachedToTargetEvent;
  readonly "Target.detachedFromTarget": Protocol.Target.Events.DetachedFromTargetEvent;
  readonly "Target.receivedMessageFromTarget": Protocol.Target.Events.ReceivedMessageFromTargetEvent;
  readonly "Target.targetCreated": Protocol.Target.Events.TargetCreatedEvent;
  readonly "Target.targetDestroyed": Protocol.Target.Events.TargetDestroyedEvent;
  readonly "Target.targetCrashed": Protocol.Target.Events.TargetCrashedEvent;
  readonly "Target.targetInfoChanged": Protocol.Target.Events.TargetInfoChangedEvent;
  readonly "Tethering.accepted": Protocol.Tethering.Events.AcceptedEvent;
  readonly "Tracing.bufferUsage": Protocol.Tracing.Events.BufferUsageEvent;
  readonly "Tracing.dataCollected": Protocol.Tracing.Events.DataCollectedEvent;
  readonly "Tracing.tracingComplete": Protocol.Tracing.Events.TracingCompleteEvent;
  readonly "WebAudio.contextCreated": Protocol.WebAudio.Events.ContextCreatedEvent;
  readonly "WebAudio.contextWillBeDestroyed": Protocol.WebAudio.Events.ContextWillBeDestroyedEvent;
  readonly "WebAudio.contextChanged": Protocol.WebAudio.Events.ContextChangedEvent;
  readonly "WebAudio.audioListenerCreated": Protocol.WebAudio.Events.AudioListenerCreatedEvent;
  readonly "WebAudio.audioListenerWillBeDestroyed": Protocol.WebAudio.Events.AudioListenerWillBeDestroyedEvent;
  readonly "WebAudio.audioNodeCreated": Protocol.WebAudio.Events.AudioNodeCreatedEvent;
  readonly "WebAudio.audioNodeWillBeDestroyed": Protocol.WebAudio.Events.AudioNodeWillBeDestroyedEvent;
  readonly "WebAudio.audioParamCreated": Protocol.WebAudio.Events.AudioParamCreatedEvent;
  readonly "WebAudio.audioParamWillBeDestroyed": Protocol.WebAudio.Events.AudioParamWillBeDestroyedEvent;
  readonly "WebAudio.nodesConnected": Protocol.WebAudio.Events.NodesConnectedEvent;
  readonly "WebAudio.nodesDisconnected": Protocol.WebAudio.Events.NodesDisconnectedEvent;
  readonly "WebAudio.nodeParamConnected": Protocol.WebAudio.Events.NodeParamConnectedEvent;
  readonly "WebAudio.nodeParamDisconnected": Protocol.WebAudio.Events.NodeParamDisconnectedEvent;
  readonly "WebAuthn.credentialAdded": Protocol.WebAuthn.Events.CredentialAddedEvent;
  readonly "WebAuthn.credentialDeleted": Protocol.WebAuthn.Events.CredentialDeletedEvent;
  readonly "WebAuthn.credentialUpdated": Protocol.WebAuthn.Events.CredentialUpdatedEvent;
  readonly "WebAuthn.credentialAsserted": Protocol.WebAuthn.Events.CredentialAssertedEvent;
  readonly "WebMCP.toolsAdded": Protocol.WebMCP.Events.ToolsAddedEvent;
  readonly "WebMCP.toolsRemoved": Protocol.WebMCP.Events.ToolsRemovedEvent;
  readonly "WebMCP.toolInvoked": Protocol.WebMCP.Events.ToolInvokedEvent;
  readonly "WebMCP.toolResponded": Protocol.WebMCP.Events.ToolRespondedEvent;
  readonly "Console.messageAdded": Protocol.Console.Events.MessageAddedEvent;
  readonly "Debugger.breakpointResolved": Protocol.Debugger.Events.BreakpointResolvedEvent;
  readonly "Debugger.paused": Protocol.Debugger.Events.PausedEvent;
  readonly "Debugger.resumed": Protocol.Debugger.Events.ResumedEvent;
  readonly "Debugger.scriptFailedToParse": Protocol.Debugger.Events.ScriptFailedToParseEvent;
  readonly "Debugger.scriptParsed": Protocol.Debugger.Events.ScriptParsedEvent;
  readonly "HeapProfiler.addHeapSnapshotChunk": Protocol.HeapProfiler.Events.AddHeapSnapshotChunkEvent;
  readonly "HeapProfiler.heapStatsUpdate": Protocol.HeapProfiler.Events.HeapStatsUpdateEvent;
  readonly "HeapProfiler.lastSeenObjectId": Protocol.HeapProfiler.Events.LastSeenObjectIdEvent;
  readonly "HeapProfiler.reportHeapSnapshotProgress": Protocol.HeapProfiler.Events.ReportHeapSnapshotProgressEvent;
  readonly "HeapProfiler.resetProfiles": Protocol.HeapProfiler.Events.ResetProfilesEvent;
  readonly "Profiler.consoleProfileFinished": Protocol.Profiler.Events.ConsoleProfileFinishedEvent;
  readonly "Profiler.consoleProfileStarted": Protocol.Profiler.Events.ConsoleProfileStartedEvent;
  readonly "Profiler.preciseCoverageDeltaUpdate": Protocol.Profiler.Events.PreciseCoverageDeltaUpdateEvent;
  readonly "Runtime.bindingCalled": Protocol.Runtime.Events.BindingCalledEvent;
  readonly "Runtime.consoleAPICalled": Protocol.Runtime.Events.ConsoleAPICalledEvent;
  readonly "Runtime.exceptionRevoked": Protocol.Runtime.Events.ExceptionRevokedEvent;
  readonly "Runtime.exceptionThrown": Protocol.Runtime.Events.ExceptionThrownEvent;
  readonly "Runtime.executionContextCreated": Protocol.Runtime.Events.ExecutionContextCreatedEvent;
  readonly "Runtime.executionContextDestroyed": Protocol.Runtime.Events.ExecutionContextDestroyedEvent;
  readonly "Runtime.executionContextsCleared": Protocol.Runtime.Events.ExecutionContextsClearedEvent;
  readonly "Runtime.inspectRequested": Protocol.Runtime.Events.InspectRequestedEvent;
}

export type ProtocolCommand = keyof ProtocolCommandMap;
export type ProtocolEvent = keyof ProtocolEventMap;
export type CommandParams<M extends ProtocolCommand> = ProtocolCommandMap[M]["params"];
export type CommandResult<M extends ProtocolCommand> = ProtocolCommandMap[M]["result"];
export type EventPayload<E extends ProtocolEvent> = ProtocolEventMap[E];

export interface ProtocolCommandDescriptor<M extends ProtocolCommand = ProtocolCommand> {
  readonly method: M;
  readonly hasParams: boolean;
  readonly hasResult: boolean;
  readonly experimental: boolean;
  readonly deprecated: boolean;
}

export const commandDescriptors = {
  "Accessibility.disable": { method: "Accessibility.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Accessibility.enable": { method: "Accessibility.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Accessibility.getPartialAXTree": { method: "Accessibility.getPartialAXTree", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Accessibility.getFullAXTree": { method: "Accessibility.getFullAXTree", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Accessibility.getRootAXNode": { method: "Accessibility.getRootAXNode", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Accessibility.getAXNodeAndAncestors": { method: "Accessibility.getAXNodeAndAncestors", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Accessibility.getChildAXNodes": { method: "Accessibility.getChildAXNodes", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Accessibility.queryAXTree": { method: "Accessibility.queryAXTree", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Ads.getAdMetrics": { method: "Ads.getAdMetrics", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Animation.disable": { method: "Animation.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Animation.enable": { method: "Animation.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Animation.getCurrentTime": { method: "Animation.getCurrentTime", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Animation.getPlaybackRate": { method: "Animation.getPlaybackRate", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Animation.releaseAnimations": { method: "Animation.releaseAnimations", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Animation.resolveAnimation": { method: "Animation.resolveAnimation", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Animation.seekAnimations": { method: "Animation.seekAnimations", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Animation.setPaused": { method: "Animation.setPaused", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Animation.setPlaybackRate": { method: "Animation.setPlaybackRate", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Animation.setTiming": { method: "Animation.setTiming", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Audits.getEncodedResponse": { method: "Audits.getEncodedResponse", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Audits.disable": { method: "Audits.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Audits.enable": { method: "Audits.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Audits.checkFormsIssues": { method: "Audits.checkFormsIssues", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Autofill.trigger": { method: "Autofill.trigger", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Autofill.setAddresses": { method: "Autofill.setAddresses", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Autofill.disable": { method: "Autofill.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Autofill.enable": { method: "Autofill.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "BackgroundService.startObserving": { method: "BackgroundService.startObserving", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BackgroundService.stopObserving": { method: "BackgroundService.stopObserving", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BackgroundService.setRecording": { method: "BackgroundService.setRecording", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BackgroundService.clearEvents": { method: "BackgroundService.clearEvents", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.enable": { method: "BluetoothEmulation.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.setSimulatedCentralState": { method: "BluetoothEmulation.setSimulatedCentralState", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.disable": { method: "BluetoothEmulation.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulatePreconnectedPeripheral": { method: "BluetoothEmulation.simulatePreconnectedPeripheral", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulateAdvertisement": { method: "BluetoothEmulation.simulateAdvertisement", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulateGATTOperationResponse": { method: "BluetoothEmulation.simulateGATTOperationResponse", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulateCharacteristicOperationResponse": { method: "BluetoothEmulation.simulateCharacteristicOperationResponse", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulateDescriptorOperationResponse": { method: "BluetoothEmulation.simulateDescriptorOperationResponse", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.addService": { method: "BluetoothEmulation.addService", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "BluetoothEmulation.removeService": { method: "BluetoothEmulation.removeService", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.addCharacteristic": { method: "BluetoothEmulation.addCharacteristic", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "BluetoothEmulation.removeCharacteristic": { method: "BluetoothEmulation.removeCharacteristic", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.addDescriptor": { method: "BluetoothEmulation.addDescriptor", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "BluetoothEmulation.removeDescriptor": { method: "BluetoothEmulation.removeDescriptor", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "BluetoothEmulation.simulateGATTDisconnection": { method: "BluetoothEmulation.simulateGATTDisconnection", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Browser.setPermission": { method: "Browser.setPermission", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.grantPermissions": { method: "Browser.grantPermissions", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Browser.resetPermissions": { method: "Browser.resetPermissions", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Browser.setDownloadBehavior": { method: "Browser.setDownloadBehavior", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.cancelDownload": { method: "Browser.cancelDownload", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.close": { method: "Browser.close", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Browser.crash": { method: "Browser.crash", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Browser.crashGpuProcess": { method: "Browser.crashGpuProcess", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Browser.getVersion": { method: "Browser.getVersion", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Browser.getBrowserCommandLine": { method: "Browser.getBrowserCommandLine", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Browser.getHistograms": { method: "Browser.getHistograms", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Browser.getHistogram": { method: "Browser.getHistogram", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Browser.getWindowBounds": { method: "Browser.getWindowBounds", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Browser.getWindowForTarget": { method: "Browser.getWindowForTarget", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Browser.setWindowBounds": { method: "Browser.setWindowBounds", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.setContentsSize": { method: "Browser.setContentsSize", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.setDockTile": { method: "Browser.setDockTile", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.executeBrowserCommand": { method: "Browser.executeBrowserCommand", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Browser.addPrivacySandboxEnrollmentOverride": { method: "Browser.addPrivacySandboxEnrollmentOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CSS.addRule": { method: "CSS.addRule", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.collectClassNames": { method: "CSS.collectClassNames", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.createStyleSheet": { method: "CSS.createStyleSheet", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.disable": { method: "CSS.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "CSS.enable": { method: "CSS.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "CSS.forcePseudoState": { method: "CSS.forcePseudoState", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CSS.forceStartingStyle": { method: "CSS.forceStartingStyle", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CSS.getBackgroundColors": { method: "CSS.getBackgroundColors", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.getComputedStyleForNode": { method: "CSS.getComputedStyleForNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.resolveValues": { method: "CSS.resolveValues", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.getLonghandProperties": { method: "CSS.getLonghandProperties", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.getInlineStylesForNode": { method: "CSS.getInlineStylesForNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.getAnimatedStylesForNode": { method: "CSS.getAnimatedStylesForNode", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.getMatchedStylesForNode": { method: "CSS.getMatchedStylesForNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.getEnvironmentVariables": { method: "CSS.getEnvironmentVariables", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "CSS.getMediaQueries": { method: "CSS.getMediaQueries", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "CSS.getPlatformFontsForNode": { method: "CSS.getPlatformFontsForNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.getStyleSheetText": { method: "CSS.getStyleSheetText", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.getLayersForNode": { method: "CSS.getLayersForNode", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.getLocationForSelector": { method: "CSS.getLocationForSelector", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.trackComputedStyleUpdatesForNode": { method: "CSS.trackComputedStyleUpdatesForNode", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "CSS.trackComputedStyleUpdates": { method: "CSS.trackComputedStyleUpdates", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "CSS.takeComputedStyleUpdates": { method: "CSS.takeComputedStyleUpdates", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "CSS.setEffectivePropertyValueForNode": { method: "CSS.setEffectivePropertyValueForNode", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CSS.setPropertyRulePropertyName": { method: "CSS.setPropertyRulePropertyName", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.setKeyframeKey": { method: "CSS.setKeyframeKey", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.setMediaText": { method: "CSS.setMediaText", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.setContainerQueryText": { method: "CSS.setContainerQueryText", hasParams: true, hasResult: true, experimental: true, deprecated: true },
  "CSS.setContainerQueryConditionText": { method: "CSS.setContainerQueryConditionText", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.setSupportsText": { method: "CSS.setSupportsText", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.setNavigationText": { method: "CSS.setNavigationText", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.setScopeText": { method: "CSS.setScopeText", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "CSS.setRuleSelector": { method: "CSS.setRuleSelector", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.setStyleSheetText": { method: "CSS.setStyleSheetText", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.setStyleTexts": { method: "CSS.setStyleTexts", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CSS.startRuleUsageTracking": { method: "CSS.startRuleUsageTracking", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "CSS.stopRuleUsageTracking": { method: "CSS.stopRuleUsageTracking", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "CSS.takeCoverageDelta": { method: "CSS.takeCoverageDelta", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "CSS.setLocalFontsEnabled": { method: "CSS.setLocalFontsEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "CacheStorage.deleteCache": { method: "CacheStorage.deleteCache", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CacheStorage.deleteEntry": { method: "CacheStorage.deleteEntry", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CacheStorage.requestCacheNames": { method: "CacheStorage.requestCacheNames", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CacheStorage.requestCachedResponse": { method: "CacheStorage.requestCachedResponse", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "CacheStorage.requestEntries": { method: "CacheStorage.requestEntries", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Cast.enable": { method: "Cast.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Cast.disable": { method: "Cast.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Cast.setSinkToUse": { method: "Cast.setSinkToUse", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Cast.startDesktopMirroring": { method: "Cast.startDesktopMirroring", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Cast.startTabMirroring": { method: "Cast.startTabMirroring", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Cast.stopCasting": { method: "Cast.stopCasting", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "CrashReportContext.getEntries": { method: "CrashReportContext.getEntries", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "DOM.collectClassNamesFromSubtree": { method: "DOM.collectClassNamesFromSubtree", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.copyTo": { method: "DOM.copyTo", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.describeNode": { method: "DOM.describeNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.scrollIntoViewIfNeeded": { method: "DOM.scrollIntoViewIfNeeded", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.disable": { method: "DOM.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOM.discardSearchResults": { method: "DOM.discardSearchResults", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "DOM.enable": { method: "DOM.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.focus": { method: "DOM.focus", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.getAttributes": { method: "DOM.getAttributes", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getBoxModel": { method: "DOM.getBoxModel", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getContentQuads": { method: "DOM.getContentQuads", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getDocument": { method: "DOM.getDocument", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getFlattenedDocument": { method: "DOM.getFlattenedDocument", hasParams: true, hasResult: true, experimental: false, deprecated: true },
  "DOM.getNodesForSubtreeByStyle": { method: "DOM.getNodesForSubtreeByStyle", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getNodeForLocation": { method: "DOM.getNodeForLocation", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getOuterHTML": { method: "DOM.getOuterHTML", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getRelayoutBoundary": { method: "DOM.getRelayoutBoundary", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getSearchResults": { method: "DOM.getSearchResults", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.hideHighlight": { method: "DOM.hideHighlight", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOM.highlightNode": { method: "DOM.highlightNode", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOM.highlightRect": { method: "DOM.highlightRect", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOM.markUndoableState": { method: "DOM.markUndoableState", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "DOM.moveTo": { method: "DOM.moveTo", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.performSearch": { method: "DOM.performSearch", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.pushNodeByPathToFrontend": { method: "DOM.pushNodeByPathToFrontend", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.pushNodesByBackendIdsToFrontend": { method: "DOM.pushNodesByBackendIdsToFrontend", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.querySelector": { method: "DOM.querySelector", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.querySelectorAll": { method: "DOM.querySelectorAll", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.getTopLayerElements": { method: "DOM.getTopLayerElements", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "DOM.getElementByRelation": { method: "DOM.getElementByRelation", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.redo": { method: "DOM.redo", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "DOM.removeAttribute": { method: "DOM.removeAttribute", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.removeNode": { method: "DOM.removeNode", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.requestChildNodes": { method: "DOM.requestChildNodes", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.requestNode": { method: "DOM.requestNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.resolveNode": { method: "DOM.resolveNode", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.setAttributeValue": { method: "DOM.setAttributeValue", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.setAttributesAsText": { method: "DOM.setAttributesAsText", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.setFileInputFiles": { method: "DOM.setFileInputFiles", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.setNodeStackTracesEnabled": { method: "DOM.setNodeStackTracesEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "DOM.getNodeStackTraces": { method: "DOM.getNodeStackTraces", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getFileInfo": { method: "DOM.getFileInfo", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getDetachedDomNodes": { method: "DOM.getDetachedDomNodes", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "DOM.setInspectedNode": { method: "DOM.setInspectedNode", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "DOM.setNodeName": { method: "DOM.setNodeName", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOM.setNodeValue": { method: "DOM.setNodeValue", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.setOuterHTML": { method: "DOM.setOuterHTML", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOM.undo": { method: "DOM.undo", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "DOM.getFrameOwner": { method: "DOM.getFrameOwner", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getContainerForNode": { method: "DOM.getContainerForNode", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getQueryingDescendantsForContainer": { method: "DOM.getQueryingDescendantsForContainer", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.getAnchorElement": { method: "DOM.getAnchorElement", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.forceShowPopover": { method: "DOM.forceShowPopover", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "DOM.forceShowInterest": { method: "DOM.forceShowInterest", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "DOMDebugger.getEventListeners": { method: "DOMDebugger.getEventListeners", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOMDebugger.removeDOMBreakpoint": { method: "DOMDebugger.removeDOMBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMDebugger.removeEventListenerBreakpoint": { method: "DOMDebugger.removeEventListenerBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMDebugger.removeInstrumentationBreakpoint": { method: "DOMDebugger.removeInstrumentationBreakpoint", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "DOMDebugger.removeXHRBreakpoint": { method: "DOMDebugger.removeXHRBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMDebugger.setBreakOnCSPViolation": { method: "DOMDebugger.setBreakOnCSPViolation", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "DOMDebugger.setDOMBreakpoint": { method: "DOMDebugger.setDOMBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMDebugger.setEventListenerBreakpoint": { method: "DOMDebugger.setEventListenerBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMDebugger.setInstrumentationBreakpoint": { method: "DOMDebugger.setInstrumentationBreakpoint", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "DOMDebugger.setXHRBreakpoint": { method: "DOMDebugger.setXHRBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMSnapshot.disable": { method: "DOMSnapshot.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOMSnapshot.enable": { method: "DOMSnapshot.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOMSnapshot.getSnapshot": { method: "DOMSnapshot.getSnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: true },
  "DOMSnapshot.captureSnapshot": { method: "DOMSnapshot.captureSnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOMStorage.clear": { method: "DOMStorage.clear", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMStorage.disable": { method: "DOMStorage.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOMStorage.enable": { method: "DOMStorage.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DOMStorage.getDOMStorageItems": { method: "DOMStorage.getDOMStorageItems", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "DOMStorage.removeDOMStorageItem": { method: "DOMStorage.removeDOMStorageItem", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DOMStorage.setDOMStorageItem": { method: "DOMStorage.setDOMStorageItem", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DeviceAccess.enable": { method: "DeviceAccess.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DeviceAccess.disable": { method: "DeviceAccess.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DeviceAccess.selectPrompt": { method: "DeviceAccess.selectPrompt", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DeviceAccess.cancelPrompt": { method: "DeviceAccess.cancelPrompt", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DeviceOrientation.clearDeviceOrientationOverride": { method: "DeviceOrientation.clearDeviceOrientationOverride", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "DeviceOrientation.setDeviceOrientationOverride": { method: "DeviceOrientation.setDeviceOrientationOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "DigitalCredentials.setVirtualWalletBehavior": { method: "DigitalCredentials.setVirtualWalletBehavior", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.canEmulate": { method: "Emulation.canEmulate", hasParams: false, hasResult: true, experimental: false, deprecated: true },
  "Emulation.clearDeviceMetricsOverride": { method: "Emulation.clearDeviceMetricsOverride", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Emulation.clearGeolocationOverride": { method: "Emulation.clearGeolocationOverride", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Emulation.resetPageScaleFactor": { method: "Emulation.resetPageScaleFactor", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setFocusEmulationEnabled": { method: "Emulation.setFocusEmulationEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setAutoDarkModeOverride": { method: "Emulation.setAutoDarkModeOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setCPUThrottlingRate": { method: "Emulation.setCPUThrottlingRate", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setDefaultBackgroundColorOverride": { method: "Emulation.setDefaultBackgroundColorOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setSafeAreaInsetsOverride": { method: "Emulation.setSafeAreaInsetsOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setVirtualKeyboardGeometryOverride": { method: "Emulation.setVirtualKeyboardGeometryOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setDeviceMetricsOverride": { method: "Emulation.setDeviceMetricsOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setDevicePostureOverride": { method: "Emulation.setDevicePostureOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.clearDevicePostureOverride": { method: "Emulation.clearDevicePostureOverride", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setDisplayFeaturesOverride": { method: "Emulation.setDisplayFeaturesOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.clearDisplayFeaturesOverride": { method: "Emulation.clearDisplayFeaturesOverride", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setScrollbarsHidden": { method: "Emulation.setScrollbarsHidden", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setDocumentCookieDisabled": { method: "Emulation.setDocumentCookieDisabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setEmitTouchEventsForMouse": { method: "Emulation.setEmitTouchEventsForMouse", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setEmulatedMedia": { method: "Emulation.setEmulatedMedia", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setEmulatedVisionDeficiency": { method: "Emulation.setEmulatedVisionDeficiency", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setEmulatedOSTextScale": { method: "Emulation.setEmulatedOSTextScale", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setGeolocationOverride": { method: "Emulation.setGeolocationOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.getOverriddenSensorInformation": { method: "Emulation.getOverriddenSensorInformation", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Emulation.setSensorOverrideEnabled": { method: "Emulation.setSensorOverrideEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setSensorOverrideReadings": { method: "Emulation.setSensorOverrideReadings", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setPressureSourceOverrideEnabled": { method: "Emulation.setPressureSourceOverrideEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setPressureStateOverride": { method: "Emulation.setPressureStateOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setIdleOverride": { method: "Emulation.setIdleOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.clearIdleOverride": { method: "Emulation.clearIdleOverride", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setNavigatorOverrides": { method: "Emulation.setNavigatorOverrides", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Emulation.setPageScaleFactor": { method: "Emulation.setPageScaleFactor", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setScriptExecutionDisabled": { method: "Emulation.setScriptExecutionDisabled", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setTouchEmulationEnabled": { method: "Emulation.setTouchEmulationEnabled", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setVirtualTimePolicy": { method: "Emulation.setVirtualTimePolicy", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Emulation.setLocaleOverride": { method: "Emulation.setLocaleOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setTimezoneOverride": { method: "Emulation.setTimezoneOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setVisibleSize": { method: "Emulation.setVisibleSize", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Emulation.setDisabledImageTypes": { method: "Emulation.setDisabledImageTypes", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setDataSaverOverride": { method: "Emulation.setDataSaverOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setHardwareConcurrencyOverride": { method: "Emulation.setHardwareConcurrencyOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setUserAgentOverride": { method: "Emulation.setUserAgentOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Emulation.setAutomationOverride": { method: "Emulation.setAutomationOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setSmallViewportHeightDifferenceOverride": { method: "Emulation.setSmallViewportHeightDifferenceOverride", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.getScreenInfos": { method: "Emulation.getScreenInfos", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Emulation.addScreen": { method: "Emulation.addScreen", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Emulation.updateScreen": { method: "Emulation.updateScreen", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Emulation.removeScreen": { method: "Emulation.removeScreen", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Emulation.setPrimaryScreen": { method: "Emulation.setPrimaryScreen", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "EventBreakpoints.setInstrumentationBreakpoint": { method: "EventBreakpoints.setInstrumentationBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "EventBreakpoints.removeInstrumentationBreakpoint": { method: "EventBreakpoints.removeInstrumentationBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "EventBreakpoints.disable": { method: "EventBreakpoints.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Extensions.triggerAction": { method: "Extensions.triggerAction", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Extensions.loadUnpacked": { method: "Extensions.loadUnpacked", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Extensions.getExtensions": { method: "Extensions.getExtensions", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Extensions.uninstall": { method: "Extensions.uninstall", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Extensions.getStorageItems": { method: "Extensions.getStorageItems", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Extensions.removeStorageItems": { method: "Extensions.removeStorageItems", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Extensions.clearStorageItems": { method: "Extensions.clearStorageItems", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Extensions.setStorageItems": { method: "Extensions.setStorageItems", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.enable": { method: "FedCm.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.disable": { method: "FedCm.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "FedCm.selectAccount": { method: "FedCm.selectAccount", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.clickDialogButton": { method: "FedCm.clickDialogButton", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.openUrl": { method: "FedCm.openUrl", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.dismissDialog": { method: "FedCm.dismissDialog", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "FedCm.resetCooldown": { method: "FedCm.resetCooldown", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Fetch.disable": { method: "Fetch.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Fetch.enable": { method: "Fetch.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Fetch.failRequest": { method: "Fetch.failRequest", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Fetch.fulfillRequest": { method: "Fetch.fulfillRequest", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Fetch.continueRequest": { method: "Fetch.continueRequest", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Fetch.continueWithAuth": { method: "Fetch.continueWithAuth", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Fetch.continueResponse": { method: "Fetch.continueResponse", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Fetch.getResponseBody": { method: "Fetch.getResponseBody", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Fetch.takeResponseBodyAsStream": { method: "Fetch.takeResponseBodyAsStream", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "FileSystem.getDirectory": { method: "FileSystem.getDirectory", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "HeadlessExperimental.beginFrame": { method: "HeadlessExperimental.beginFrame", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "HeadlessExperimental.disable": { method: "HeadlessExperimental.disable", hasParams: false, hasResult: false, experimental: false, deprecated: true },
  "HeadlessExperimental.enable": { method: "HeadlessExperimental.enable", hasParams: false, hasResult: false, experimental: false, deprecated: true },
  "IO.close": { method: "IO.close", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "IO.read": { method: "IO.read", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "IO.resolveBlob": { method: "IO.resolveBlob", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "IndexedDB.clearObjectStore": { method: "IndexedDB.clearObjectStore", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "IndexedDB.deleteDatabase": { method: "IndexedDB.deleteDatabase", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "IndexedDB.deleteObjectStoreEntries": { method: "IndexedDB.deleteObjectStoreEntries", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "IndexedDB.disable": { method: "IndexedDB.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "IndexedDB.enable": { method: "IndexedDB.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "IndexedDB.requestData": { method: "IndexedDB.requestData", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "IndexedDB.getMetadata": { method: "IndexedDB.getMetadata", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "IndexedDB.requestDatabase": { method: "IndexedDB.requestDatabase", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "IndexedDB.requestDatabaseNames": { method: "IndexedDB.requestDatabaseNames", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Input.dispatchDragEvent": { method: "Input.dispatchDragEvent", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.dispatchKeyEvent": { method: "Input.dispatchKeyEvent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Input.insertText": { method: "Input.insertText", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.imeSetComposition": { method: "Input.imeSetComposition", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.dispatchMouseEvent": { method: "Input.dispatchMouseEvent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Input.dispatchTouchEvent": { method: "Input.dispatchTouchEvent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Input.cancelDragging": { method: "Input.cancelDragging", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Input.emulateTouchFromMouseEvent": { method: "Input.emulateTouchFromMouseEvent", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.setIgnoreInputEvents": { method: "Input.setIgnoreInputEvents", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Input.setInterceptDrags": { method: "Input.setInterceptDrags", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.synthesizePinchGesture": { method: "Input.synthesizePinchGesture", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.synthesizeScrollGesture": { method: "Input.synthesizeScrollGesture", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Input.synthesizeTapGesture": { method: "Input.synthesizeTapGesture", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Inspector.disable": { method: "Inspector.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Inspector.enable": { method: "Inspector.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "LayerTree.compositingReasons": { method: "LayerTree.compositingReasons", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "LayerTree.disable": { method: "LayerTree.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "LayerTree.enable": { method: "LayerTree.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "LayerTree.loadSnapshot": { method: "LayerTree.loadSnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "LayerTree.makeSnapshot": { method: "LayerTree.makeSnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "LayerTree.profileSnapshot": { method: "LayerTree.profileSnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "LayerTree.releaseSnapshot": { method: "LayerTree.releaseSnapshot", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "LayerTree.replaySnapshot": { method: "LayerTree.replaySnapshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "LayerTree.snapshotCommandLog": { method: "LayerTree.snapshotCommandLog", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Log.clear": { method: "Log.clear", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Log.disable": { method: "Log.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Log.enable": { method: "Log.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Log.startViolationsReport": { method: "Log.startViolationsReport", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Log.stopViolationsReport": { method: "Log.stopViolationsReport", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Media.enable": { method: "Media.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Media.disable": { method: "Media.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Memory.getDOMCounters": { method: "Memory.getDOMCounters", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Memory.getDOMCountersForLeakDetection": { method: "Memory.getDOMCountersForLeakDetection", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Memory.prepareForLeakDetection": { method: "Memory.prepareForLeakDetection", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Memory.forciblyPurgeJavaScriptMemory": { method: "Memory.forciblyPurgeJavaScriptMemory", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Memory.setPressureNotificationsSuppressed": { method: "Memory.setPressureNotificationsSuppressed", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Memory.simulatePressureNotification": { method: "Memory.simulatePressureNotification", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Memory.startSampling": { method: "Memory.startSampling", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Memory.stopSampling": { method: "Memory.stopSampling", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Memory.getAllTimeSamplingProfile": { method: "Memory.getAllTimeSamplingProfile", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Memory.getBrowserSamplingProfile": { method: "Memory.getBrowserSamplingProfile", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Memory.getSamplingProfile": { method: "Memory.getSamplingProfile", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Network.canClearBrowserCache": { method: "Network.canClearBrowserCache", hasParams: false, hasResult: true, experimental: false, deprecated: true },
  "Network.canClearBrowserCookies": { method: "Network.canClearBrowserCookies", hasParams: false, hasResult: true, experimental: false, deprecated: true },
  "Network.canEmulateNetworkConditions": { method: "Network.canEmulateNetworkConditions", hasParams: false, hasResult: true, experimental: false, deprecated: true },
  "Network.clearBrowserCache": { method: "Network.clearBrowserCache", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Network.clearBrowserCookies": { method: "Network.clearBrowserCookies", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Network.deleteCookies": { method: "Network.deleteCookies", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.disable": { method: "Network.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Network.emulateNetworkConditions": { method: "Network.emulateNetworkConditions", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Network.emulateNetworkConditionsByRule": { method: "Network.emulateNetworkConditionsByRule", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.overrideNetworkState": { method: "Network.overrideNetworkState", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.enable": { method: "Network.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.configureDurableMessages": { method: "Network.configureDurableMessages", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.getAllCookies": { method: "Network.getAllCookies", hasParams: false, hasResult: true, experimental: false, deprecated: true },
  "Network.getCertificate": { method: "Network.getCertificate", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.getCookies": { method: "Network.getCookies", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Network.getResponseBody": { method: "Network.getResponseBody", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Network.getRequestPostData": { method: "Network.getRequestPostData", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Network.replayXHR": { method: "Network.replayXHR", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.searchInResponseBody": { method: "Network.searchInResponseBody", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.setBlockedURLs": { method: "Network.setBlockedURLs", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.setBypassServiceWorker": { method: "Network.setBypassServiceWorker", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.setCacheDisabled": { method: "Network.setCacheDisabled", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.setCookie": { method: "Network.setCookie", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Network.setCookies": { method: "Network.setCookies", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.setExtraHTTPHeaders": { method: "Network.setExtraHTTPHeaders", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.setAttachDebugStack": { method: "Network.setAttachDebugStack", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.setUserAgentOverride": { method: "Network.setUserAgentOverride", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Network.streamResourceContent": { method: "Network.streamResourceContent", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.getSecurityIsolationStatus": { method: "Network.getSecurityIsolationStatus", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.enableReportingApi": { method: "Network.enableReportingApi", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.enableDeviceBoundSessions": { method: "Network.enableDeviceBoundSessions", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.deleteDeviceBoundSession": { method: "Network.deleteDeviceBoundSession", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Network.fetchSchemefulSite": { method: "Network.fetchSchemefulSite", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.loadNetworkResource": { method: "Network.loadNetworkResource", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Network.setCookieControls": { method: "Network.setCookieControls", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Overlay.disable": { method: "Overlay.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Overlay.enable": { method: "Overlay.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Overlay.getHighlightObjectForTest": { method: "Overlay.getHighlightObjectForTest", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Overlay.getGridHighlightObjectsForTest": { method: "Overlay.getGridHighlightObjectsForTest", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Overlay.getSourceOrderHighlightObjectForTest": { method: "Overlay.getSourceOrderHighlightObjectForTest", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Overlay.hideHighlight": { method: "Overlay.hideHighlight", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Overlay.highlightFrame": { method: "Overlay.highlightFrame", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Overlay.highlightNode": { method: "Overlay.highlightNode", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.highlightQuad": { method: "Overlay.highlightQuad", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.highlightRect": { method: "Overlay.highlightRect", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.highlightSourceOrder": { method: "Overlay.highlightSourceOrder", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setInspectMode": { method: "Overlay.setInspectMode", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowAdHighlights": { method: "Overlay.setShowAdHighlights", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setPausedInDebuggerMessage": { method: "Overlay.setPausedInDebuggerMessage", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowDebugBorders": { method: "Overlay.setShowDebugBorders", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowFPSCounter": { method: "Overlay.setShowFPSCounter", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowGridOverlays": { method: "Overlay.setShowGridOverlays", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowFlexOverlays": { method: "Overlay.setShowFlexOverlays", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowScrollSnapOverlays": { method: "Overlay.setShowScrollSnapOverlays", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowContainerQueryOverlays": { method: "Overlay.setShowContainerQueryOverlays", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowInspectedElementAnchor": { method: "Overlay.setShowInspectedElementAnchor", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowPaintRects": { method: "Overlay.setShowPaintRects", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowLayoutShiftRegions": { method: "Overlay.setShowLayoutShiftRegions", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowScrollBottleneckRects": { method: "Overlay.setShowScrollBottleneckRects", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowHitTestBorders": { method: "Overlay.setShowHitTestBorders", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Overlay.setShowWebVitals": { method: "Overlay.setShowWebVitals", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Overlay.setShowViewportSizeOnResize": { method: "Overlay.setShowViewportSizeOnResize", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowHinge": { method: "Overlay.setShowHinge", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowDisplayCutout": { method: "Overlay.setShowDisplayCutout", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowIsolatedElements": { method: "Overlay.setShowIsolatedElements", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Overlay.setShowWindowControlsOverlay": { method: "Overlay.setShowWindowControlsOverlay", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "PWA.getOsAppState": { method: "PWA.getOsAppState", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "PWA.install": { method: "PWA.install", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "PWA.uninstall": { method: "PWA.uninstall", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "PWA.launch": { method: "PWA.launch", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "PWA.launchFilesInApp": { method: "PWA.launchFilesInApp", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "PWA.openCurrentPageInApp": { method: "PWA.openCurrentPageInApp", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "PWA.changeAppUserSettings": { method: "PWA.changeAppUserSettings", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.addScriptToEvaluateOnLoad": { method: "Page.addScriptToEvaluateOnLoad", hasParams: true, hasResult: true, experimental: true, deprecated: true },
  "Page.addScriptToEvaluateOnNewDocument": { method: "Page.addScriptToEvaluateOnNewDocument", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.bringToFront": { method: "Page.bringToFront", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Page.captureScreenshot": { method: "Page.captureScreenshot", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.captureSnapshot": { method: "Page.captureSnapshot", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.clearDeviceMetricsOverride": { method: "Page.clearDeviceMetricsOverride", hasParams: false, hasResult: false, experimental: true, deprecated: true },
  "Page.clearDeviceOrientationOverride": { method: "Page.clearDeviceOrientationOverride", hasParams: false, hasResult: false, experimental: true, deprecated: true },
  "Page.clearGeolocationOverride": { method: "Page.clearGeolocationOverride", hasParams: false, hasResult: false, experimental: false, deprecated: true },
  "Page.createIsolatedWorld": { method: "Page.createIsolatedWorld", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.deleteCookie": { method: "Page.deleteCookie", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.disable": { method: "Page.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Page.enable": { method: "Page.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.getAppManifest": { method: "Page.getAppManifest", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.getInstallabilityErrors": { method: "Page.getInstallabilityErrors", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Page.getManifestIcons": { method: "Page.getManifestIcons", hasParams: false, hasResult: true, experimental: true, deprecated: true },
  "Page.getAppId": { method: "Page.getAppId", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Page.getAdScriptAncestry": { method: "Page.getAdScriptAncestry", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.getFrameTree": { method: "Page.getFrameTree", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Page.getLayoutMetrics": { method: "Page.getLayoutMetrics", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Page.getNavigationHistory": { method: "Page.getNavigationHistory", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Page.resetNavigationHistory": { method: "Page.resetNavigationHistory", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Page.getResourceContent": { method: "Page.getResourceContent", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.getResourceTree": { method: "Page.getResourceTree", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Page.handleJavaScriptDialog": { method: "Page.handleJavaScriptDialog", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.navigate": { method: "Page.navigate", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.navigateToHistoryEntry": { method: "Page.navigateToHistoryEntry", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.printToPDF": { method: "Page.printToPDF", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Page.reload": { method: "Page.reload", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.removeScriptToEvaluateOnLoad": { method: "Page.removeScriptToEvaluateOnLoad", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.removeScriptToEvaluateOnNewDocument": { method: "Page.removeScriptToEvaluateOnNewDocument", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.screencastFrameAck": { method: "Page.screencastFrameAck", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.searchInResource": { method: "Page.searchInResource", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.setAdBlockingEnabled": { method: "Page.setAdBlockingEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.setBypassCSP": { method: "Page.setBypassCSP", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.getPermissionsPolicyState": { method: "Page.getPermissionsPolicyState", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.getOriginTrials": { method: "Page.getOriginTrials", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.setDeviceMetricsOverride": { method: "Page.setDeviceMetricsOverride", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.setDeviceOrientationOverride": { method: "Page.setDeviceOrientationOverride", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.setFontFamilies": { method: "Page.setFontFamilies", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.setFontSizes": { method: "Page.setFontSizes", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.setDocumentContent": { method: "Page.setDocumentContent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.setDownloadBehavior": { method: "Page.setDownloadBehavior", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.setGeolocationOverride": { method: "Page.setGeolocationOverride", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Page.setLifecycleEventsEnabled": { method: "Page.setLifecycleEventsEnabled", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.setTouchEmulationEnabled": { method: "Page.setTouchEmulationEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Page.startScreencast": { method: "Page.startScreencast", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.startScreenRecording": { method: "Page.startScreenRecording", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Page.stopScreenRecording": { method: "Page.stopScreenRecording", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Page.stopLoading": { method: "Page.stopLoading", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Page.crash": { method: "Page.crash", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Page.close": { method: "Page.close", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Page.setWebLifecycleState": { method: "Page.setWebLifecycleState", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.stopScreencast": { method: "Page.stopScreencast", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Page.produceCompilationCache": { method: "Page.produceCompilationCache", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.addCompilationCache": { method: "Page.addCompilationCache", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.clearCompilationCache": { method: "Page.clearCompilationCache", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Page.setSPCTransactionMode": { method: "Page.setSPCTransactionMode", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.setRPHRegistrationMode": { method: "Page.setRPHRegistrationMode", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.generateTestReport": { method: "Page.generateTestReport", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.waitForDebugger": { method: "Page.waitForDebugger", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Page.setInterceptFileChooserDialog": { method: "Page.setInterceptFileChooserDialog", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Page.setPrerenderingAllowed": { method: "Page.setPrerenderingAllowed", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Page.getAnnotatedPageContent": { method: "Page.getAnnotatedPageContent", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Performance.disable": { method: "Performance.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Performance.enable": { method: "Performance.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Performance.setTimeDomain": { method: "Performance.setTimeDomain", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Performance.getMetrics": { method: "Performance.getMetrics", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "PerformanceTimeline.enable": { method: "PerformanceTimeline.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Preload.enable": { method: "Preload.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Preload.disable": { method: "Preload.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Security.disable": { method: "Security.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Security.enable": { method: "Security.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Security.setIgnoreCertificateErrors": { method: "Security.setIgnoreCertificateErrors", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Security.handleCertificateError": { method: "Security.handleCertificateError", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Security.setOverrideCertificateErrors": { method: "Security.setOverrideCertificateErrors", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "ServiceWorker.deliverPushMessage": { method: "ServiceWorker.deliverPushMessage", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.disable": { method: "ServiceWorker.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.dispatchSyncEvent": { method: "ServiceWorker.dispatchSyncEvent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.dispatchPeriodicSyncEvent": { method: "ServiceWorker.dispatchPeriodicSyncEvent", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.enable": { method: "ServiceWorker.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.setForceUpdateOnPageLoad": { method: "ServiceWorker.setForceUpdateOnPageLoad", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.skipWaiting": { method: "ServiceWorker.skipWaiting", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.startWorker": { method: "ServiceWorker.startWorker", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.stopAllWorkers": { method: "ServiceWorker.stopAllWorkers", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.stopWorker": { method: "ServiceWorker.stopWorker", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.unregister": { method: "ServiceWorker.unregister", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "ServiceWorker.updateRegistration": { method: "ServiceWorker.updateRegistration", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.enable": { method: "SmartCardEmulation.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.disable": { method: "SmartCardEmulation.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportEstablishContextResult": { method: "SmartCardEmulation.reportEstablishContextResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportReleaseContextResult": { method: "SmartCardEmulation.reportReleaseContextResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportListReadersResult": { method: "SmartCardEmulation.reportListReadersResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportGetStatusChangeResult": { method: "SmartCardEmulation.reportGetStatusChangeResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportBeginTransactionResult": { method: "SmartCardEmulation.reportBeginTransactionResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportPlainResult": { method: "SmartCardEmulation.reportPlainResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportConnectResult": { method: "SmartCardEmulation.reportConnectResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportDataResult": { method: "SmartCardEmulation.reportDataResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportStatusResult": { method: "SmartCardEmulation.reportStatusResult", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "SmartCardEmulation.reportError": { method: "SmartCardEmulation.reportError", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.getStorageKeyForFrame": { method: "Storage.getStorageKeyForFrame", hasParams: true, hasResult: true, experimental: false, deprecated: true },
  "Storage.getStorageKey": { method: "Storage.getStorageKey", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Storage.clearDataForOrigin": { method: "Storage.clearDataForOrigin", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.clearDataForStorageKey": { method: "Storage.clearDataForStorageKey", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.getCookies": { method: "Storage.getCookies", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Storage.setCookies": { method: "Storage.setCookies", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.clearCookies": { method: "Storage.clearCookies", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.getUsageAndQuota": { method: "Storage.getUsageAndQuota", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Storage.overrideQuotaForOrigin": { method: "Storage.overrideQuotaForOrigin", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.trackCacheStorageForOrigin": { method: "Storage.trackCacheStorageForOrigin", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.trackCacheStorageForStorageKey": { method: "Storage.trackCacheStorageForStorageKey", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.trackIndexedDBForOrigin": { method: "Storage.trackIndexedDBForOrigin", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.trackIndexedDBForStorageKey": { method: "Storage.trackIndexedDBForStorageKey", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.untrackCacheStorageForOrigin": { method: "Storage.untrackCacheStorageForOrigin", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.untrackCacheStorageForStorageKey": { method: "Storage.untrackCacheStorageForStorageKey", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.untrackIndexedDBForOrigin": { method: "Storage.untrackIndexedDBForOrigin", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.untrackIndexedDBForStorageKey": { method: "Storage.untrackIndexedDBForStorageKey", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Storage.getTrustTokens": { method: "Storage.getTrustTokens", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Storage.clearTrustTokens": { method: "Storage.clearTrustTokens", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Storage.getSharedStorageMetadata": { method: "Storage.getSharedStorageMetadata", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Storage.getSharedStorageEntries": { method: "Storage.getSharedStorageEntries", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Storage.setSharedStorageEntry": { method: "Storage.setSharedStorageEntry", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.deleteSharedStorageEntry": { method: "Storage.deleteSharedStorageEntry", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.clearSharedStorageEntries": { method: "Storage.clearSharedStorageEntries", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.resetSharedStorageBudget": { method: "Storage.resetSharedStorageBudget", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.setSharedStorageTracking": { method: "Storage.setSharedStorageTracking", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.setStorageBucketTracking": { method: "Storage.setStorageBucketTracking", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.deleteStorageBucket": { method: "Storage.deleteStorageBucket", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Storage.runBounceTrackingMitigations": { method: "Storage.runBounceTrackingMitigations", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Storage.getRelatedWebsiteSets": { method: "Storage.getRelatedWebsiteSets", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "SystemInfo.getInfo": { method: "SystemInfo.getInfo", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "SystemInfo.getFeatureState": { method: "SystemInfo.getFeatureState", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "SystemInfo.getProcessInfo": { method: "SystemInfo.getProcessInfo", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Target.activateTarget": { method: "Target.activateTarget", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Target.attachToTarget": { method: "Target.attachToTarget", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Target.attachToBrowserTarget": { method: "Target.attachToBrowserTarget", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Target.closeTarget": { method: "Target.closeTarget", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Target.exposeDevToolsProtocol": { method: "Target.exposeDevToolsProtocol", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Target.createBrowserContext": { method: "Target.createBrowserContext", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Target.getBrowserContexts": { method: "Target.getBrowserContexts", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Target.createTarget": { method: "Target.createTarget", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Target.detachFromTarget": { method: "Target.detachFromTarget", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Target.disposeBrowserContext": { method: "Target.disposeBrowserContext", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Target.getTargetInfo": { method: "Target.getTargetInfo", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Target.getTargets": { method: "Target.getTargets", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Target.sendMessageToTarget": { method: "Target.sendMessageToTarget", hasParams: true, hasResult: false, experimental: false, deprecated: true },
  "Target.setAutoAttach": { method: "Target.setAutoAttach", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Target.autoAttachRelated": { method: "Target.autoAttachRelated", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Target.setDiscoverTargets": { method: "Target.setDiscoverTargets", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Target.setRemoteLocations": { method: "Target.setRemoteLocations", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Target.getDevToolsTarget": { method: "Target.getDevToolsTarget", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Target.openDevTools": { method: "Target.openDevTools", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Tethering.bind": { method: "Tethering.bind", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Tethering.unbind": { method: "Tethering.unbind", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Tracing.end": { method: "Tracing.end", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Tracing.getCategories": { method: "Tracing.getCategories", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Tracing.getTrackEventDescriptor": { method: "Tracing.getTrackEventDescriptor", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Tracing.recordClockSyncMarker": { method: "Tracing.recordClockSyncMarker", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Tracing.requestMemoryDump": { method: "Tracing.requestMemoryDump", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Tracing.start": { method: "Tracing.start", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAudio.enable": { method: "WebAudio.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "WebAudio.disable": { method: "WebAudio.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "WebAudio.getRealtimeData": { method: "WebAudio.getRealtimeData", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "WebAuthn.enable": { method: "WebAuthn.enable", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.disable": { method: "WebAuthn.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.addVirtualAuthenticator": { method: "WebAuthn.addVirtualAuthenticator", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "WebAuthn.setResponseOverrideBits": { method: "WebAuthn.setResponseOverrideBits", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.removeVirtualAuthenticator": { method: "WebAuthn.removeVirtualAuthenticator", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.addCredential": { method: "WebAuthn.addCredential", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.getCredential": { method: "WebAuthn.getCredential", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "WebAuthn.getCredentials": { method: "WebAuthn.getCredentials", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "WebAuthn.removeCredential": { method: "WebAuthn.removeCredential", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.clearCredentials": { method: "WebAuthn.clearCredentials", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.setUserVerified": { method: "WebAuthn.setUserVerified", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.setAutomaticPresenceSimulation": { method: "WebAuthn.setAutomaticPresenceSimulation", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebAuthn.setCredentialProperties": { method: "WebAuthn.setCredentialProperties", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "WebMCP.enable": { method: "WebMCP.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "WebMCP.disable": { method: "WebMCP.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "WebMCP.invokeTool": { method: "WebMCP.invokeTool", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "WebMCP.cancelInvocation": { method: "WebMCP.cancelInvocation", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Console.clearMessages": { method: "Console.clearMessages", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Console.disable": { method: "Console.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Console.enable": { method: "Console.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Debugger.continueToLocation": { method: "Debugger.continueToLocation", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.disable": { method: "Debugger.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Debugger.enable": { method: "Debugger.enable", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.evaluateOnCallFrame": { method: "Debugger.evaluateOnCallFrame", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.getPossibleBreakpoints": { method: "Debugger.getPossibleBreakpoints", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.getScriptSource": { method: "Debugger.getScriptSource", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.disassembleWasmModule": { method: "Debugger.disassembleWasmModule", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Debugger.nextWasmDisassemblyChunk": { method: "Debugger.nextWasmDisassemblyChunk", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Debugger.getWasmBytecode": { method: "Debugger.getWasmBytecode", hasParams: true, hasResult: true, experimental: false, deprecated: true },
  "Debugger.getStackTrace": { method: "Debugger.getStackTrace", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Debugger.pause": { method: "Debugger.pause", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Debugger.pauseOnAsyncCall": { method: "Debugger.pauseOnAsyncCall", hasParams: true, hasResult: false, experimental: true, deprecated: true },
  "Debugger.removeBreakpoint": { method: "Debugger.removeBreakpoint", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.restartFrame": { method: "Debugger.restartFrame", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.resume": { method: "Debugger.resume", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.searchInContent": { method: "Debugger.searchInContent", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.setAsyncCallStackDepth": { method: "Debugger.setAsyncCallStackDepth", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.setBlackboxExecutionContexts": { method: "Debugger.setBlackboxExecutionContexts", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Debugger.setBlackboxPatterns": { method: "Debugger.setBlackboxPatterns", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Debugger.setBlackboxedRanges": { method: "Debugger.setBlackboxedRanges", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Debugger.setBreakpoint": { method: "Debugger.setBreakpoint", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.setInstrumentationBreakpoint": { method: "Debugger.setInstrumentationBreakpoint", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.setBreakpointByUrl": { method: "Debugger.setBreakpointByUrl", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Debugger.setBreakpointOnFunctionCall": { method: "Debugger.setBreakpointOnFunctionCall", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Debugger.setBreakpointsActive": { method: "Debugger.setBreakpointsActive", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.setPauseOnExceptions": { method: "Debugger.setPauseOnExceptions", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.setReturnValue": { method: "Debugger.setReturnValue", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Debugger.setScriptSource": { method: "Debugger.setScriptSource", hasParams: true, hasResult: true, experimental: false, deprecated: true },
  "Debugger.setSkipAllPauses": { method: "Debugger.setSkipAllPauses", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.setVariableValue": { method: "Debugger.setVariableValue", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.stepInto": { method: "Debugger.stepInto", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Debugger.stepOut": { method: "Debugger.stepOut", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Debugger.stepOver": { method: "Debugger.stepOver", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.addInspectedHeapObject": { method: "HeapProfiler.addInspectedHeapObject", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.collectGarbage": { method: "HeapProfiler.collectGarbage", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.disable": { method: "HeapProfiler.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.enable": { method: "HeapProfiler.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.getHeapObjectId": { method: "HeapProfiler.getHeapObjectId", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "HeapProfiler.getObjectByHeapObjectId": { method: "HeapProfiler.getObjectByHeapObjectId", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "HeapProfiler.getSamplingProfile": { method: "HeapProfiler.getSamplingProfile", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "HeapProfiler.startSampling": { method: "HeapProfiler.startSampling", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.startTrackingHeapObjects": { method: "HeapProfiler.startTrackingHeapObjects", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.stopSampling": { method: "HeapProfiler.stopSampling", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "HeapProfiler.stopTrackingHeapObjects": { method: "HeapProfiler.stopTrackingHeapObjects", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "HeapProfiler.takeHeapSnapshot": { method: "HeapProfiler.takeHeapSnapshot", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Profiler.disable": { method: "Profiler.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Profiler.enable": { method: "Profiler.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Profiler.getBestEffortCoverage": { method: "Profiler.getBestEffortCoverage", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Profiler.setSamplingInterval": { method: "Profiler.setSamplingInterval", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Profiler.start": { method: "Profiler.start", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Profiler.startPreciseCoverage": { method: "Profiler.startPreciseCoverage", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Profiler.stop": { method: "Profiler.stop", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Profiler.stopPreciseCoverage": { method: "Profiler.stopPreciseCoverage", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Profiler.takePreciseCoverage": { method: "Profiler.takePreciseCoverage", hasParams: false, hasResult: true, experimental: false, deprecated: false },
  "Runtime.awaitPromise": { method: "Runtime.awaitPromise", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.callFunctionOn": { method: "Runtime.callFunctionOn", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.compileScript": { method: "Runtime.compileScript", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.disable": { method: "Runtime.disable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Runtime.discardConsoleEntries": { method: "Runtime.discardConsoleEntries", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Runtime.enable": { method: "Runtime.enable", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Runtime.evaluate": { method: "Runtime.evaluate", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.getIsolateId": { method: "Runtime.getIsolateId", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Runtime.getHeapUsage": { method: "Runtime.getHeapUsage", hasParams: false, hasResult: true, experimental: true, deprecated: false },
  "Runtime.getProperties": { method: "Runtime.getProperties", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.globalLexicalScopeNames": { method: "Runtime.globalLexicalScopeNames", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.queryObjects": { method: "Runtime.queryObjects", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.releaseObject": { method: "Runtime.releaseObject", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Runtime.releaseObjectGroup": { method: "Runtime.releaseObjectGroup", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Runtime.runIfWaitingForDebugger": { method: "Runtime.runIfWaitingForDebugger", hasParams: false, hasResult: false, experimental: false, deprecated: false },
  "Runtime.runScript": { method: "Runtime.runScript", hasParams: true, hasResult: true, experimental: false, deprecated: false },
  "Runtime.setAsyncCallStackDepth": { method: "Runtime.setAsyncCallStackDepth", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Runtime.setCustomObjectFormatterEnabled": { method: "Runtime.setCustomObjectFormatterEnabled", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Runtime.setMaxCallStackSizeToCapture": { method: "Runtime.setMaxCallStackSizeToCapture", hasParams: true, hasResult: false, experimental: true, deprecated: false },
  "Runtime.terminateExecution": { method: "Runtime.terminateExecution", hasParams: false, hasResult: false, experimental: true, deprecated: false },
  "Runtime.addBinding": { method: "Runtime.addBinding", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Runtime.removeBinding": { method: "Runtime.removeBinding", hasParams: true, hasResult: false, experimental: false, deprecated: false },
  "Runtime.getExceptionDetails": { method: "Runtime.getExceptionDetails", hasParams: true, hasResult: true, experimental: true, deprecated: false },
  "Schema.getDomains": { method: "Schema.getDomains", hasParams: false, hasResult: true, experimental: false, deprecated: false },
} as const satisfies { readonly [M in ProtocolCommand]: ProtocolCommandDescriptor<M> };

export const protocolMetadata = {
  source: "devtools-protocol@0.0.1677763",
  version: "1.3",
  domainCount: 58,
  typeCount: 607,
  commandCount: 663,
  eventCount: 233,
} as const;

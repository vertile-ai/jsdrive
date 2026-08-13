// Generated from devtools-protocol@0.0.1677763. Do not edit.

#[derive(Clone, Debug, PartialEq)]
pub enum JsonValue {
    Null,
    Boolean(bool),
    Number(f64),
    String(String),
    Array(Vec<JsonValue>),
    Object(std::collections::BTreeMap<String, JsonValue>),
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UnknownEnumValue {
    pub enum_name: &'static str,
    pub value: String,
}

pub mod accessibility {
    pub type AXNodeId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AXValueType {
        Boolean,
        Tristate,
        BooleanOrUndefined,
        Idref,
        IdrefList,
        Integer,
        Node,
        NodeList,
        Number,
        String,
        ComputedString,
        Token,
        TokenList,
        DomRelation,
        Role,
        InternalRole,
        ValueUndefined,
    }

    impl AXValueType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Boolean => "boolean",
                Self::Tristate => "tristate",
                Self::BooleanOrUndefined => "booleanOrUndefined",
                Self::Idref => "idref",
                Self::IdrefList => "idrefList",
                Self::Integer => "integer",
                Self::Node => "node",
                Self::NodeList => "nodeList",
                Self::Number => "number",
                Self::String => "string",
                Self::ComputedString => "computedString",
                Self::Token => "token",
                Self::TokenList => "tokenList",
                Self::DomRelation => "domRelation",
                Self::Role => "role",
                Self::InternalRole => "internalRole",
                Self::ValueUndefined => "valueUndefined",
            }
        }
    }

    impl AsRef<str> for AXValueType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AXValueType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "boolean" => Ok(Self::Boolean),
                "tristate" => Ok(Self::Tristate),
                "booleanOrUndefined" => Ok(Self::BooleanOrUndefined),
                "idref" => Ok(Self::Idref),
                "idrefList" => Ok(Self::IdrefList),
                "integer" => Ok(Self::Integer),
                "node" => Ok(Self::Node),
                "nodeList" => Ok(Self::NodeList),
                "number" => Ok(Self::Number),
                "string" => Ok(Self::String),
                "computedString" => Ok(Self::ComputedString),
                "token" => Ok(Self::Token),
                "tokenList" => Ok(Self::TokenList),
                "domRelation" => Ok(Self::DomRelation),
                "role" => Ok(Self::Role),
                "internalRole" => Ok(Self::InternalRole),
                "valueUndefined" => Ok(Self::ValueUndefined),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AXValueType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AXValueSourceType {
        Attribute,
        Implicit,
        Style,
        Contents,
        Placeholder,
        RelatedElement,
    }

    impl AXValueSourceType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Attribute => "attribute",
                Self::Implicit => "implicit",
                Self::Style => "style",
                Self::Contents => "contents",
                Self::Placeholder => "placeholder",
                Self::RelatedElement => "relatedElement",
            }
        }
    }

    impl AsRef<str> for AXValueSourceType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AXValueSourceType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "attribute" => Ok(Self::Attribute),
                "implicit" => Ok(Self::Implicit),
                "style" => Ok(Self::Style),
                "contents" => Ok(Self::Contents),
                "placeholder" => Ok(Self::Placeholder),
                "relatedElement" => Ok(Self::RelatedElement),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AXValueSourceType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AXValueNativeSourceType {
        Description,
        Figcaption,
        Label,
        Labelfor,
        Labelwrapped,
        Legend,
        Rubyannotation,
        Tablecaption,
        Title,
        Other,
    }

    impl AXValueNativeSourceType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Description => "description",
                Self::Figcaption => "figcaption",
                Self::Label => "label",
                Self::Labelfor => "labelfor",
                Self::Labelwrapped => "labelwrapped",
                Self::Legend => "legend",
                Self::Rubyannotation => "rubyannotation",
                Self::Tablecaption => "tablecaption",
                Self::Title => "title",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for AXValueNativeSourceType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AXValueNativeSourceType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "description" => Ok(Self::Description),
                "figcaption" => Ok(Self::Figcaption),
                "label" => Ok(Self::Label),
                "labelfor" => Ok(Self::Labelfor),
                "labelwrapped" => Ok(Self::Labelwrapped),
                "legend" => Ok(Self::Legend),
                "rubyannotation" => Ok(Self::Rubyannotation),
                "tablecaption" => Ok(Self::Tablecaption),
                "title" => Ok(Self::Title),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AXValueNativeSourceType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AXValueSource {
        pub type_: crate::generated::accessibility::AXValueSourceType,
        pub value: Option<Box<crate::generated::accessibility::AXValue>>,
        pub attribute: Option<String>,
        pub attribute_value: Option<Box<crate::generated::accessibility::AXValue>>,
        pub superseded: Option<bool>,
        pub native_source: Option<crate::generated::accessibility::AXValueNativeSourceType>,
        pub native_source_value: Option<Box<crate::generated::accessibility::AXValue>>,
        pub invalid: Option<bool>,
        pub invalid_reason: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AXRelatedNode {
        pub backend_dom_node_id: crate::generated::dom::BackendNodeId,
        pub idref: Option<String>,
        pub text: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AXProperty {
        pub name: crate::generated::accessibility::AXPropertyName,
        pub value: Box<crate::generated::accessibility::AXValue>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AXValue {
        pub type_: crate::generated::accessibility::AXValueType,
        pub value: Option<crate::generated::JsonValue>,
        pub related_nodes: Option<Vec<Box<crate::generated::accessibility::AXRelatedNode>>>,
        pub sources: Option<Vec<Box<crate::generated::accessibility::AXValueSource>>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AXPropertyName {
        Actions,
        Busy,
        Disabled,
        Editable,
        Focusable,
        Focused,
        Hidden,
        HiddenRoot,
        Invalid,
        Keyshortcuts,
        Settable,
        Roledescription,
        Live,
        Atomic,
        Relevant,
        Root,
        Autocomplete,
        HasPopup,
        Level,
        Multiselectable,
        Orientation,
        Multiline,
        Readonly,
        Required,
        Valuemin,
        Valuemax,
        Valuetext,
        Checked,
        Expanded,
        Modal,
        Pressed,
        Selected,
        Activedescendant,
        Controls,
        Describedby,
        Details,
        Errormessage,
        Flowto,
        Labelledby,
        Owns,
        Url,
        ActiveFullscreenElement,
        ActiveModalDialog,
        ActiveAriaModalDialog,
        AriaHiddenElement,
        AriaHiddenSubtree,
        EmptyAlt,
        EmptyText,
        InertElement,
        InertSubtree,
        LabelContainer,
        LabelFor,
        NotRendered,
        NotVisible,
        PresentationalRole,
        ProbablyPresentational,
        InactiveCarouselTabContent,
        Uninteresting,
    }

    impl AXPropertyName {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Actions => "actions",
                Self::Busy => "busy",
                Self::Disabled => "disabled",
                Self::Editable => "editable",
                Self::Focusable => "focusable",
                Self::Focused => "focused",
                Self::Hidden => "hidden",
                Self::HiddenRoot => "hiddenRoot",
                Self::Invalid => "invalid",
                Self::Keyshortcuts => "keyshortcuts",
                Self::Settable => "settable",
                Self::Roledescription => "roledescription",
                Self::Live => "live",
                Self::Atomic => "atomic",
                Self::Relevant => "relevant",
                Self::Root => "root",
                Self::Autocomplete => "autocomplete",
                Self::HasPopup => "hasPopup",
                Self::Level => "level",
                Self::Multiselectable => "multiselectable",
                Self::Orientation => "orientation",
                Self::Multiline => "multiline",
                Self::Readonly => "readonly",
                Self::Required => "required",
                Self::Valuemin => "valuemin",
                Self::Valuemax => "valuemax",
                Self::Valuetext => "valuetext",
                Self::Checked => "checked",
                Self::Expanded => "expanded",
                Self::Modal => "modal",
                Self::Pressed => "pressed",
                Self::Selected => "selected",
                Self::Activedescendant => "activedescendant",
                Self::Controls => "controls",
                Self::Describedby => "describedby",
                Self::Details => "details",
                Self::Errormessage => "errormessage",
                Self::Flowto => "flowto",
                Self::Labelledby => "labelledby",
                Self::Owns => "owns",
                Self::Url => "url",
                Self::ActiveFullscreenElement => "activeFullscreenElement",
                Self::ActiveModalDialog => "activeModalDialog",
                Self::ActiveAriaModalDialog => "activeAriaModalDialog",
                Self::AriaHiddenElement => "ariaHiddenElement",
                Self::AriaHiddenSubtree => "ariaHiddenSubtree",
                Self::EmptyAlt => "emptyAlt",
                Self::EmptyText => "emptyText",
                Self::InertElement => "inertElement",
                Self::InertSubtree => "inertSubtree",
                Self::LabelContainer => "labelContainer",
                Self::LabelFor => "labelFor",
                Self::NotRendered => "notRendered",
                Self::NotVisible => "notVisible",
                Self::PresentationalRole => "presentationalRole",
                Self::ProbablyPresentational => "probablyPresentational",
                Self::InactiveCarouselTabContent => "inactiveCarouselTabContent",
                Self::Uninteresting => "uninteresting",
            }
        }
    }

    impl AsRef<str> for AXPropertyName {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AXPropertyName {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "actions" => Ok(Self::Actions),
                "busy" => Ok(Self::Busy),
                "disabled" => Ok(Self::Disabled),
                "editable" => Ok(Self::Editable),
                "focusable" => Ok(Self::Focusable),
                "focused" => Ok(Self::Focused),
                "hidden" => Ok(Self::Hidden),
                "hiddenRoot" => Ok(Self::HiddenRoot),
                "invalid" => Ok(Self::Invalid),
                "keyshortcuts" => Ok(Self::Keyshortcuts),
                "settable" => Ok(Self::Settable),
                "roledescription" => Ok(Self::Roledescription),
                "live" => Ok(Self::Live),
                "atomic" => Ok(Self::Atomic),
                "relevant" => Ok(Self::Relevant),
                "root" => Ok(Self::Root),
                "autocomplete" => Ok(Self::Autocomplete),
                "hasPopup" => Ok(Self::HasPopup),
                "level" => Ok(Self::Level),
                "multiselectable" => Ok(Self::Multiselectable),
                "orientation" => Ok(Self::Orientation),
                "multiline" => Ok(Self::Multiline),
                "readonly" => Ok(Self::Readonly),
                "required" => Ok(Self::Required),
                "valuemin" => Ok(Self::Valuemin),
                "valuemax" => Ok(Self::Valuemax),
                "valuetext" => Ok(Self::Valuetext),
                "checked" => Ok(Self::Checked),
                "expanded" => Ok(Self::Expanded),
                "modal" => Ok(Self::Modal),
                "pressed" => Ok(Self::Pressed),
                "selected" => Ok(Self::Selected),
                "activedescendant" => Ok(Self::Activedescendant),
                "controls" => Ok(Self::Controls),
                "describedby" => Ok(Self::Describedby),
                "details" => Ok(Self::Details),
                "errormessage" => Ok(Self::Errormessage),
                "flowto" => Ok(Self::Flowto),
                "labelledby" => Ok(Self::Labelledby),
                "owns" => Ok(Self::Owns),
                "url" => Ok(Self::Url),
                "activeFullscreenElement" => Ok(Self::ActiveFullscreenElement),
                "activeModalDialog" => Ok(Self::ActiveModalDialog),
                "activeAriaModalDialog" => Ok(Self::ActiveAriaModalDialog),
                "ariaHiddenElement" => Ok(Self::AriaHiddenElement),
                "ariaHiddenSubtree" => Ok(Self::AriaHiddenSubtree),
                "emptyAlt" => Ok(Self::EmptyAlt),
                "emptyText" => Ok(Self::EmptyText),
                "inertElement" => Ok(Self::InertElement),
                "inertSubtree" => Ok(Self::InertSubtree),
                "labelContainer" => Ok(Self::LabelContainer),
                "labelFor" => Ok(Self::LabelFor),
                "notRendered" => Ok(Self::NotRendered),
                "notVisible" => Ok(Self::NotVisible),
                "presentationalRole" => Ok(Self::PresentationalRole),
                "probablyPresentational" => Ok(Self::ProbablyPresentational),
                "inactiveCarouselTabContent" => Ok(Self::InactiveCarouselTabContent),
                "uninteresting" => Ok(Self::Uninteresting),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AXPropertyName",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AXNode {
        pub node_id: crate::generated::accessibility::AXNodeId,
        pub ignored: bool,
        pub ignored_reasons: Option<Vec<Box<crate::generated::accessibility::AXProperty>>>,
        pub role: Option<Box<crate::generated::accessibility::AXValue>>,
        pub chrome_role: Option<Box<crate::generated::accessibility::AXValue>>,
        pub name: Option<Box<crate::generated::accessibility::AXValue>>,
        pub description: Option<Box<crate::generated::accessibility::AXValue>>,
        pub value: Option<Box<crate::generated::accessibility::AXValue>>,
        pub properties: Option<Vec<Box<crate::generated::accessibility::AXProperty>>>,
        pub parent_id: Option<crate::generated::accessibility::AXNodeId>,
        pub child_ids: Option<Vec<crate::generated::accessibility::AXNodeId>>,
        pub backend_dom_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub frame_id: Option<crate::generated::page::FrameId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPartialAXTreeParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub fetch_relatives: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPartialAXTreeResult {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFullAXTreeParams {
            pub depth: Option<i64>,
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFullAXTreeResult {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRootAXNodeParams {
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRootAXNodeResult {
            pub node: Box<crate::generated::accessibility::AXNode>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAXNodeAndAncestorsParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAXNodeAndAncestorsResult {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetChildAXNodesParams {
            pub id: crate::generated::accessibility::AXNodeId,
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetChildAXNodesResult {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QueryAXTreeParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub accessible_name: Option<String>,
            pub role: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QueryAXTreeResult {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadCompleteEvent {
            pub root: Box<crate::generated::accessibility::AXNode>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodesUpdatedEvent {
            pub nodes: Vec<Box<crate::generated::accessibility::AXNode>>,
        }
    }
}

pub mod ads {
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdFrameData {
        pub frame_id: crate::generated::page::FrameId,
        pub initial_origin: Option<String>,
        pub network_bytes: f64,
        pub cpu_time: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdMetrics {
        pub viewport_ad_density_by_area: i64,
        pub average_viewport_ad_density_by_area: f64,
        pub viewport_ad_count: i64,
        pub average_viewport_ad_count: f64,
        pub total_ad_cpu_time: f64,
        pub total_ad_network_bytes: f64,
        pub update_ad_frames: Vec<Box<crate::generated::ads::AdFrameData>>,
        pub remove_ad_frames: Vec<crate::generated::page::FrameId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAdMetricsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAdMetricsResult {
            pub metrics: Box<crate::generated::ads::AdMetrics>,
        }
    }

    pub mod events {
    }
}

pub mod animation {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AnimationTypePropertyEnum {
        CSSTransition,
        CSSAnimation,
        WebAnimation,
    }

    impl AnimationTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::CSSTransition => "CSSTransition",
                Self::CSSAnimation => "CSSAnimation",
                Self::WebAnimation => "WebAnimation",
            }
        }
    }

    impl AsRef<str> for AnimationTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AnimationTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "CSSTransition" => Ok(Self::CSSTransition),
                "CSSAnimation" => Ok(Self::CSSAnimation),
                "WebAnimation" => Ok(Self::WebAnimation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AnimationTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Animation {
        pub id: String,
        pub name: String,
        pub paused_state: bool,
        pub play_state: String,
        pub playback_rate: f64,
        pub start_time: f64,
        pub current_time: f64,
        pub type_: crate::generated::animation::AnimationTypePropertyEnum,
        pub source: Option<Box<crate::generated::animation::AnimationEffect>>,
        pub css_id: Option<String>,
        pub view_or_scroll_timeline: Option<Box<crate::generated::animation::ViewOrScrollTimeline>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ViewOrScrollTimeline {
        pub source_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub start_offset: Option<f64>,
        pub end_offset: Option<f64>,
        pub subject_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub axis: crate::generated::dom::ScrollOrientation,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AnimationEffect {
        pub delay: f64,
        pub end_delay: f64,
        pub iteration_start: f64,
        pub iterations: Option<f64>,
        pub duration: f64,
        pub direction: String,
        pub fill: String,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub keyframes_rule: Option<Box<crate::generated::animation::KeyframesRule>>,
        pub easing: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct KeyframesRule {
        pub name: Option<String>,
        pub keyframes: Vec<Box<crate::generated::animation::KeyframeStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct KeyframeStyle {
        pub offset: String,
        pub easing: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCurrentTimeParams {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCurrentTimeResult {
            pub current_time: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPlaybackRateParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPlaybackRateResult {
            pub playback_rate: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseAnimationsParams {
            pub animations: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseAnimationsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveAnimationParams {
            pub animation_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveAnimationResult {
            pub remote_object: Box<crate::generated::runtime::RemoteObject>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SeekAnimationsParams {
            pub animations: Vec<String>,
            pub current_time: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SeekAnimationsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPausedParams {
            pub animations: Vec<String>,
            pub paused: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPausedResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPlaybackRateParams {
            pub playback_rate: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPlaybackRateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimingParams {
            pub animation_id: String,
            pub duration: f64,
            pub delay: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimingResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AnimationCanceledEvent {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AnimationCreatedEvent {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AnimationStartedEvent {
            pub animation: Box<crate::generated::animation::Animation>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AnimationUpdatedEvent {
            pub animation: Box<crate::generated::animation::Animation>,
        }
    }
}

pub mod audits {
    #[derive(Clone, Debug, PartialEq)]
    pub struct AffectedCookie {
        pub name: String,
        pub path: String,
        pub domain: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AffectedRequest {
        pub request_id: Option<crate::generated::network::RequestId>,
        pub url: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AffectedFrame {
        pub frame_id: crate::generated::page::FrameId,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieExclusionReason {
        ExcludeSameSiteUnspecifiedTreatedAsLax,
        ExcludeSameSiteNoneInsecure,
        ExcludeSameSiteLax,
        ExcludeSameSiteStrict,
        ExcludeDomainNonASCII,
        ExcludeThirdPartyCookieBlockedInFirstPartySet,
        ExcludeThirdPartyPhaseout,
        ExcludePortMismatch,
        ExcludeSchemeMismatch,
    }

    impl CookieExclusionReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ExcludeSameSiteUnspecifiedTreatedAsLax => "ExcludeSameSiteUnspecifiedTreatedAsLax",
                Self::ExcludeSameSiteNoneInsecure => "ExcludeSameSiteNoneInsecure",
                Self::ExcludeSameSiteLax => "ExcludeSameSiteLax",
                Self::ExcludeSameSiteStrict => "ExcludeSameSiteStrict",
                Self::ExcludeDomainNonASCII => "ExcludeDomainNonASCII",
                Self::ExcludeThirdPartyCookieBlockedInFirstPartySet => "ExcludeThirdPartyCookieBlockedInFirstPartySet",
                Self::ExcludeThirdPartyPhaseout => "ExcludeThirdPartyPhaseout",
                Self::ExcludePortMismatch => "ExcludePortMismatch",
                Self::ExcludeSchemeMismatch => "ExcludeSchemeMismatch",
            }
        }
    }

    impl AsRef<str> for CookieExclusionReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieExclusionReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ExcludeSameSiteUnspecifiedTreatedAsLax" => Ok(Self::ExcludeSameSiteUnspecifiedTreatedAsLax),
                "ExcludeSameSiteNoneInsecure" => Ok(Self::ExcludeSameSiteNoneInsecure),
                "ExcludeSameSiteLax" => Ok(Self::ExcludeSameSiteLax),
                "ExcludeSameSiteStrict" => Ok(Self::ExcludeSameSiteStrict),
                "ExcludeDomainNonASCII" => Ok(Self::ExcludeDomainNonASCII),
                "ExcludeThirdPartyCookieBlockedInFirstPartySet" => Ok(Self::ExcludeThirdPartyCookieBlockedInFirstPartySet),
                "ExcludeThirdPartyPhaseout" => Ok(Self::ExcludeThirdPartyPhaseout),
                "ExcludePortMismatch" => Ok(Self::ExcludePortMismatch),
                "ExcludeSchemeMismatch" => Ok(Self::ExcludeSchemeMismatch),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieExclusionReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieWarningReason {
        WarnSameSiteUnspecifiedCrossSiteContext,
        WarnSameSiteNoneInsecure,
        WarnSameSiteUnspecifiedLaxAllowUnsafe,
        WarnSameSiteStrictLaxDowngradeStrict,
        WarnSameSiteStrictCrossDowngradeStrict,
        WarnSameSiteStrictCrossDowngradeLax,
        WarnSameSiteLaxCrossDowngradeStrict,
        WarnSameSiteLaxCrossDowngradeLax,
        WarnAttributeValueExceedsMaxSize,
        WarnDomainNonASCII,
        WarnThirdPartyPhaseout,
        WarnCrossSiteRedirectDowngradeChangesInclusion,
        WarnDeprecationTrialMetadata,
        WarnThirdPartyCookieHeuristic,
    }

    impl CookieWarningReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::WarnSameSiteUnspecifiedCrossSiteContext => "WarnSameSiteUnspecifiedCrossSiteContext",
                Self::WarnSameSiteNoneInsecure => "WarnSameSiteNoneInsecure",
                Self::WarnSameSiteUnspecifiedLaxAllowUnsafe => "WarnSameSiteUnspecifiedLaxAllowUnsafe",
                Self::WarnSameSiteStrictLaxDowngradeStrict => "WarnSameSiteStrictLaxDowngradeStrict",
                Self::WarnSameSiteStrictCrossDowngradeStrict => "WarnSameSiteStrictCrossDowngradeStrict",
                Self::WarnSameSiteStrictCrossDowngradeLax => "WarnSameSiteStrictCrossDowngradeLax",
                Self::WarnSameSiteLaxCrossDowngradeStrict => "WarnSameSiteLaxCrossDowngradeStrict",
                Self::WarnSameSiteLaxCrossDowngradeLax => "WarnSameSiteLaxCrossDowngradeLax",
                Self::WarnAttributeValueExceedsMaxSize => "WarnAttributeValueExceedsMaxSize",
                Self::WarnDomainNonASCII => "WarnDomainNonASCII",
                Self::WarnThirdPartyPhaseout => "WarnThirdPartyPhaseout",
                Self::WarnCrossSiteRedirectDowngradeChangesInclusion => "WarnCrossSiteRedirectDowngradeChangesInclusion",
                Self::WarnDeprecationTrialMetadata => "WarnDeprecationTrialMetadata",
                Self::WarnThirdPartyCookieHeuristic => "WarnThirdPartyCookieHeuristic",
            }
        }
    }

    impl AsRef<str> for CookieWarningReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieWarningReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "WarnSameSiteUnspecifiedCrossSiteContext" => Ok(Self::WarnSameSiteUnspecifiedCrossSiteContext),
                "WarnSameSiteNoneInsecure" => Ok(Self::WarnSameSiteNoneInsecure),
                "WarnSameSiteUnspecifiedLaxAllowUnsafe" => Ok(Self::WarnSameSiteUnspecifiedLaxAllowUnsafe),
                "WarnSameSiteStrictLaxDowngradeStrict" => Ok(Self::WarnSameSiteStrictLaxDowngradeStrict),
                "WarnSameSiteStrictCrossDowngradeStrict" => Ok(Self::WarnSameSiteStrictCrossDowngradeStrict),
                "WarnSameSiteStrictCrossDowngradeLax" => Ok(Self::WarnSameSiteStrictCrossDowngradeLax),
                "WarnSameSiteLaxCrossDowngradeStrict" => Ok(Self::WarnSameSiteLaxCrossDowngradeStrict),
                "WarnSameSiteLaxCrossDowngradeLax" => Ok(Self::WarnSameSiteLaxCrossDowngradeLax),
                "WarnAttributeValueExceedsMaxSize" => Ok(Self::WarnAttributeValueExceedsMaxSize),
                "WarnDomainNonASCII" => Ok(Self::WarnDomainNonASCII),
                "WarnThirdPartyPhaseout" => Ok(Self::WarnThirdPartyPhaseout),
                "WarnCrossSiteRedirectDowngradeChangesInclusion" => Ok(Self::WarnCrossSiteRedirectDowngradeChangesInclusion),
                "WarnDeprecationTrialMetadata" => Ok(Self::WarnDeprecationTrialMetadata),
                "WarnThirdPartyCookieHeuristic" => Ok(Self::WarnThirdPartyCookieHeuristic),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieWarningReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieOperation {
        SetCookie,
        ReadCookie,
    }

    impl CookieOperation {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SetCookie => "SetCookie",
                Self::ReadCookie => "ReadCookie",
            }
        }
    }

    impl AsRef<str> for CookieOperation {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieOperation {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SetCookie" => Ok(Self::SetCookie),
                "ReadCookie" => Ok(Self::ReadCookie),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieOperation",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum InsightType {
        GitHubResource,
        GracePeriod,
        Heuristics,
    }

    impl InsightType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::GitHubResource => "GitHubResource",
                Self::GracePeriod => "GracePeriod",
                Self::Heuristics => "Heuristics",
            }
        }
    }

    impl AsRef<str> for InsightType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for InsightType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "GitHubResource" => Ok(Self::GitHubResource),
                "GracePeriod" => Ok(Self::GracePeriod),
                "Heuristics" => Ok(Self::Heuristics),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "InsightType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CookieIssueInsight {
        pub type_: crate::generated::audits::InsightType,
        pub table_entry_url: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CookieIssueDetails {
        pub cookie: Option<Box<crate::generated::audits::AffectedCookie>>,
        pub raw_cookie_line: Option<String>,
        pub cookie_warning_reasons: Vec<crate::generated::audits::CookieWarningReason>,
        pub cookie_exclusion_reasons: Vec<crate::generated::audits::CookieExclusionReason>,
        pub operation: crate::generated::audits::CookieOperation,
        pub site_for_cookies: Option<String>,
        pub cookie_url: Option<String>,
        pub request: Option<Box<crate::generated::audits::AffectedRequest>>,
        pub insight: Option<Box<crate::generated::audits::CookieIssueInsight>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PerformanceIssueType {
        DocumentCookie,
    }

    impl PerformanceIssueType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::DocumentCookie => "DocumentCookie",
            }
        }
    }

    impl AsRef<str> for PerformanceIssueType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PerformanceIssueType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "DocumentCookie" => Ok(Self::DocumentCookie),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PerformanceIssueType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PerformanceIssueDetails {
        pub performance_issue_type: crate::generated::audits::PerformanceIssueType,
        pub source_code_location: Option<Box<crate::generated::audits::SourceCodeLocation>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum MixedContentResolutionStatus {
        MixedContentBlocked,
        MixedContentAutomaticallyUpgraded,
        MixedContentWarning,
    }

    impl MixedContentResolutionStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MixedContentBlocked => "MixedContentBlocked",
                Self::MixedContentAutomaticallyUpgraded => "MixedContentAutomaticallyUpgraded",
                Self::MixedContentWarning => "MixedContentWarning",
            }
        }
    }

    impl AsRef<str> for MixedContentResolutionStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for MixedContentResolutionStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "MixedContentBlocked" => Ok(Self::MixedContentBlocked),
                "MixedContentAutomaticallyUpgraded" => Ok(Self::MixedContentAutomaticallyUpgraded),
                "MixedContentWarning" => Ok(Self::MixedContentWarning),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "MixedContentResolutionStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum MixedContentResourceType {
        Audio,
        Beacon,
        CSPReport,
        Download,
        EventSource,
        Favicon,
        Font,
        Form,
        Frame,
        Image,
        Import,
        JSON,
        Manifest,
        Ping,
        PluginData,
        PluginResource,
        Prefetch,
        Resource,
        Script,
        ServiceWorker,
        SharedWorker,
        SpeculationRules,
        Stylesheet,
        Track,
        Video,
        Worker,
        XMLHttpRequest,
        XSLT,
    }

    impl MixedContentResourceType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Audio => "Audio",
                Self::Beacon => "Beacon",
                Self::CSPReport => "CSPReport",
                Self::Download => "Download",
                Self::EventSource => "EventSource",
                Self::Favicon => "Favicon",
                Self::Font => "Font",
                Self::Form => "Form",
                Self::Frame => "Frame",
                Self::Image => "Image",
                Self::Import => "Import",
                Self::JSON => "JSON",
                Self::Manifest => "Manifest",
                Self::Ping => "Ping",
                Self::PluginData => "PluginData",
                Self::PluginResource => "PluginResource",
                Self::Prefetch => "Prefetch",
                Self::Resource => "Resource",
                Self::Script => "Script",
                Self::ServiceWorker => "ServiceWorker",
                Self::SharedWorker => "SharedWorker",
                Self::SpeculationRules => "SpeculationRules",
                Self::Stylesheet => "Stylesheet",
                Self::Track => "Track",
                Self::Video => "Video",
                Self::Worker => "Worker",
                Self::XMLHttpRequest => "XMLHttpRequest",
                Self::XSLT => "XSLT",
            }
        }
    }

    impl AsRef<str> for MixedContentResourceType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for MixedContentResourceType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Audio" => Ok(Self::Audio),
                "Beacon" => Ok(Self::Beacon),
                "CSPReport" => Ok(Self::CSPReport),
                "Download" => Ok(Self::Download),
                "EventSource" => Ok(Self::EventSource),
                "Favicon" => Ok(Self::Favicon),
                "Font" => Ok(Self::Font),
                "Form" => Ok(Self::Form),
                "Frame" => Ok(Self::Frame),
                "Image" => Ok(Self::Image),
                "Import" => Ok(Self::Import),
                "JSON" => Ok(Self::JSON),
                "Manifest" => Ok(Self::Manifest),
                "Ping" => Ok(Self::Ping),
                "PluginData" => Ok(Self::PluginData),
                "PluginResource" => Ok(Self::PluginResource),
                "Prefetch" => Ok(Self::Prefetch),
                "Resource" => Ok(Self::Resource),
                "Script" => Ok(Self::Script),
                "ServiceWorker" => Ok(Self::ServiceWorker),
                "SharedWorker" => Ok(Self::SharedWorker),
                "SpeculationRules" => Ok(Self::SpeculationRules),
                "Stylesheet" => Ok(Self::Stylesheet),
                "Track" => Ok(Self::Track),
                "Video" => Ok(Self::Video),
                "Worker" => Ok(Self::Worker),
                "XMLHttpRequest" => Ok(Self::XMLHttpRequest),
                "XSLT" => Ok(Self::XSLT),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "MixedContentResourceType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct MixedContentIssueDetails {
        pub resource_type: Option<crate::generated::audits::MixedContentResourceType>,
        pub resolution_status: crate::generated::audits::MixedContentResolutionStatus,
        pub insecure_url: String,
        pub main_resource_url: String,
        pub request: Option<Box<crate::generated::audits::AffectedRequest>>,
        pub frame: Option<Box<crate::generated::audits::AffectedFrame>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BlockedByResponseReason {
        CoepFrameResourceNeedsCoepHeader,
        CoopSandboxedIFrameCannotNavigateToCoopPage,
        CorpNotSameOrigin,
        CorpNotSameOriginAfterDefaultedToSameOriginByCoep,
        CorpNotSameOriginAfterDefaultedToSameOriginByDip,
        CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip,
        CorpNotSameSite,
        SRIMessageSignatureMismatch,
    }

    impl BlockedByResponseReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::CoepFrameResourceNeedsCoepHeader => "CoepFrameResourceNeedsCoepHeader",
                Self::CoopSandboxedIFrameCannotNavigateToCoopPage => "CoopSandboxedIFrameCannotNavigateToCoopPage",
                Self::CorpNotSameOrigin => "CorpNotSameOrigin",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoep => "CorpNotSameOriginAfterDefaultedToSameOriginByCoep",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByDip => "CorpNotSameOriginAfterDefaultedToSameOriginByDip",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip => "CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip",
                Self::CorpNotSameSite => "CorpNotSameSite",
                Self::SRIMessageSignatureMismatch => "SRIMessageSignatureMismatch",
            }
        }
    }

    impl AsRef<str> for BlockedByResponseReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BlockedByResponseReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "CoepFrameResourceNeedsCoepHeader" => Ok(Self::CoepFrameResourceNeedsCoepHeader),
                "CoopSandboxedIFrameCannotNavigateToCoopPage" => Ok(Self::CoopSandboxedIFrameCannotNavigateToCoopPage),
                "CorpNotSameOrigin" => Ok(Self::CorpNotSameOrigin),
                "CorpNotSameOriginAfterDefaultedToSameOriginByCoep" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoep),
                "CorpNotSameOriginAfterDefaultedToSameOriginByDip" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByDip),
                "CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip),
                "CorpNotSameSite" => Ok(Self::CorpNotSameSite),
                "SRIMessageSignatureMismatch" => Ok(Self::SRIMessageSignatureMismatch),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BlockedByResponseReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BlockedByResponseIssueDetails {
        pub request: Box<crate::generated::audits::AffectedRequest>,
        pub parent_frame: Option<Box<crate::generated::audits::AffectedFrame>>,
        pub blocked_frame: Option<Box<crate::generated::audits::AffectedFrame>>,
        pub reason: crate::generated::audits::BlockedByResponseReason,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum HeavyAdResolutionStatus {
        HeavyAdBlocked,
        HeavyAdWarning,
    }

    impl HeavyAdResolutionStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::HeavyAdBlocked => "HeavyAdBlocked",
                Self::HeavyAdWarning => "HeavyAdWarning",
            }
        }
    }

    impl AsRef<str> for HeavyAdResolutionStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for HeavyAdResolutionStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "HeavyAdBlocked" => Ok(Self::HeavyAdBlocked),
                "HeavyAdWarning" => Ok(Self::HeavyAdWarning),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "HeavyAdResolutionStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum HeavyAdReason {
        NetworkTotalLimit,
        CpuTotalLimit,
        CpuPeakLimit,
    }

    impl HeavyAdReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::NetworkTotalLimit => "NetworkTotalLimit",
                Self::CpuTotalLimit => "CpuTotalLimit",
                Self::CpuPeakLimit => "CpuPeakLimit",
            }
        }
    }

    impl AsRef<str> for HeavyAdReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for HeavyAdReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "NetworkTotalLimit" => Ok(Self::NetworkTotalLimit),
                "CpuTotalLimit" => Ok(Self::CpuTotalLimit),
                "CpuPeakLimit" => Ok(Self::CpuPeakLimit),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "HeavyAdReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct HeavyAdIssueDetails {
        pub resolution: crate::generated::audits::HeavyAdResolutionStatus,
        pub reason: crate::generated::audits::HeavyAdReason,
        pub frame: Box<crate::generated::audits::AffectedFrame>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ContentSecurityPolicyViolationType {
        KInlineViolation,
        KEvalViolation,
        KURLViolation,
        KSRIViolation,
        KTrustedTypesSinkViolation,
        KTrustedTypesPolicyViolation,
        KWasmEvalViolation,
    }

    impl ContentSecurityPolicyViolationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::KInlineViolation => "kInlineViolation",
                Self::KEvalViolation => "kEvalViolation",
                Self::KURLViolation => "kURLViolation",
                Self::KSRIViolation => "kSRIViolation",
                Self::KTrustedTypesSinkViolation => "kTrustedTypesSinkViolation",
                Self::KTrustedTypesPolicyViolation => "kTrustedTypesPolicyViolation",
                Self::KWasmEvalViolation => "kWasmEvalViolation",
            }
        }
    }

    impl AsRef<str> for ContentSecurityPolicyViolationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ContentSecurityPolicyViolationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "kInlineViolation" => Ok(Self::KInlineViolation),
                "kEvalViolation" => Ok(Self::KEvalViolation),
                "kURLViolation" => Ok(Self::KURLViolation),
                "kSRIViolation" => Ok(Self::KSRIViolation),
                "kTrustedTypesSinkViolation" => Ok(Self::KTrustedTypesSinkViolation),
                "kTrustedTypesPolicyViolation" => Ok(Self::KTrustedTypesPolicyViolation),
                "kWasmEvalViolation" => Ok(Self::KWasmEvalViolation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ContentSecurityPolicyViolationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SourceCodeLocation {
        pub script_id: Option<crate::generated::runtime::ScriptId>,
        pub url: String,
        pub line_number: i64,
        pub column_number: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ContentSecurityPolicyIssueDetails {
        pub blocked_url: Option<String>,
        pub violated_directive: String,
        pub is_report_only: bool,
        pub content_security_policy_violation_type: crate::generated::audits::ContentSecurityPolicyViolationType,
        pub frame_ancestor: Option<Box<crate::generated::audits::AffectedFrame>>,
        pub source_code_location: Option<Box<crate::generated::audits::SourceCodeLocation>>,
        pub violating_node_id: Option<crate::generated::dom::BackendNodeId>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SharedArrayBufferIssueType {
        TransferIssue,
        CreationIssue,
    }

    impl SharedArrayBufferIssueType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::TransferIssue => "TransferIssue",
                Self::CreationIssue => "CreationIssue",
            }
        }
    }

    impl AsRef<str> for SharedArrayBufferIssueType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SharedArrayBufferIssueType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "TransferIssue" => Ok(Self::TransferIssue),
                "CreationIssue" => Ok(Self::CreationIssue),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SharedArrayBufferIssueType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedArrayBufferIssueDetails {
        pub source_code_location: Box<crate::generated::audits::SourceCodeLocation>,
        pub is_warning: bool,
        pub type_: crate::generated::audits::SharedArrayBufferIssueType,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CorsIssueDetails {
        pub cors_error_status: Box<crate::generated::network::CorsErrorStatus>,
        pub is_warning: bool,
        pub request: Box<crate::generated::audits::AffectedRequest>,
        pub location: Option<Box<crate::generated::audits::SourceCodeLocation>>,
        pub initiator_origin: Option<String>,
        pub resource_ip_address_space: Option<crate::generated::network::IPAddressSpace>,
        pub client_security_state: Option<Box<crate::generated::network::ClientSecurityState>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SharedDictionaryError {
        UseErrorCrossOriginNoCorsRequest,
        UseErrorDictionaryLoadFailure,
        UseErrorMatchingDictionaryNotUsed,
        UseErrorUnexpectedContentDictionaryHeader,
        WriteErrorCossOriginNoCorsRequest,
        WriteErrorDisallowedBySettings,
        WriteErrorExpiredResponse,
        WriteErrorFeatureDisabled,
        WriteErrorInsufficientResources,
        WriteErrorInvalidMatchField,
        WriteErrorInvalidStructuredHeader,
        WriteErrorInvalidTTLField,
        WriteErrorNavigationRequest,
        WriteErrorNoMatchField,
        WriteErrorNonIntegerTTLField,
        WriteErrorNonListMatchDestField,
        WriteErrorNonSecureContext,
        WriteErrorNonStringIdField,
        WriteErrorNonStringInMatchDestList,
        WriteErrorInvalidMatchDestList,
        WriteErrorNonStringMatchField,
        WriteErrorNonTokenTypeField,
        WriteErrorRequestAborted,
        WriteErrorShuttingDown,
        WriteErrorTooLongIdField,
        WriteErrorUnsupportedType,
    }

    impl SharedDictionaryError {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::UseErrorCrossOriginNoCorsRequest => "UseErrorCrossOriginNoCorsRequest",
                Self::UseErrorDictionaryLoadFailure => "UseErrorDictionaryLoadFailure",
                Self::UseErrorMatchingDictionaryNotUsed => "UseErrorMatchingDictionaryNotUsed",
                Self::UseErrorUnexpectedContentDictionaryHeader => "UseErrorUnexpectedContentDictionaryHeader",
                Self::WriteErrorCossOriginNoCorsRequest => "WriteErrorCossOriginNoCorsRequest",
                Self::WriteErrorDisallowedBySettings => "WriteErrorDisallowedBySettings",
                Self::WriteErrorExpiredResponse => "WriteErrorExpiredResponse",
                Self::WriteErrorFeatureDisabled => "WriteErrorFeatureDisabled",
                Self::WriteErrorInsufficientResources => "WriteErrorInsufficientResources",
                Self::WriteErrorInvalidMatchField => "WriteErrorInvalidMatchField",
                Self::WriteErrorInvalidStructuredHeader => "WriteErrorInvalidStructuredHeader",
                Self::WriteErrorInvalidTTLField => "WriteErrorInvalidTTLField",
                Self::WriteErrorNavigationRequest => "WriteErrorNavigationRequest",
                Self::WriteErrorNoMatchField => "WriteErrorNoMatchField",
                Self::WriteErrorNonIntegerTTLField => "WriteErrorNonIntegerTTLField",
                Self::WriteErrorNonListMatchDestField => "WriteErrorNonListMatchDestField",
                Self::WriteErrorNonSecureContext => "WriteErrorNonSecureContext",
                Self::WriteErrorNonStringIdField => "WriteErrorNonStringIdField",
                Self::WriteErrorNonStringInMatchDestList => "WriteErrorNonStringInMatchDestList",
                Self::WriteErrorInvalidMatchDestList => "WriteErrorInvalidMatchDestList",
                Self::WriteErrorNonStringMatchField => "WriteErrorNonStringMatchField",
                Self::WriteErrorNonTokenTypeField => "WriteErrorNonTokenTypeField",
                Self::WriteErrorRequestAborted => "WriteErrorRequestAborted",
                Self::WriteErrorShuttingDown => "WriteErrorShuttingDown",
                Self::WriteErrorTooLongIdField => "WriteErrorTooLongIdField",
                Self::WriteErrorUnsupportedType => "WriteErrorUnsupportedType",
            }
        }
    }

    impl AsRef<str> for SharedDictionaryError {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SharedDictionaryError {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "UseErrorCrossOriginNoCorsRequest" => Ok(Self::UseErrorCrossOriginNoCorsRequest),
                "UseErrorDictionaryLoadFailure" => Ok(Self::UseErrorDictionaryLoadFailure),
                "UseErrorMatchingDictionaryNotUsed" => Ok(Self::UseErrorMatchingDictionaryNotUsed),
                "UseErrorUnexpectedContentDictionaryHeader" => Ok(Self::UseErrorUnexpectedContentDictionaryHeader),
                "WriteErrorCossOriginNoCorsRequest" => Ok(Self::WriteErrorCossOriginNoCorsRequest),
                "WriteErrorDisallowedBySettings" => Ok(Self::WriteErrorDisallowedBySettings),
                "WriteErrorExpiredResponse" => Ok(Self::WriteErrorExpiredResponse),
                "WriteErrorFeatureDisabled" => Ok(Self::WriteErrorFeatureDisabled),
                "WriteErrorInsufficientResources" => Ok(Self::WriteErrorInsufficientResources),
                "WriteErrorInvalidMatchField" => Ok(Self::WriteErrorInvalidMatchField),
                "WriteErrorInvalidStructuredHeader" => Ok(Self::WriteErrorInvalidStructuredHeader),
                "WriteErrorInvalidTTLField" => Ok(Self::WriteErrorInvalidTTLField),
                "WriteErrorNavigationRequest" => Ok(Self::WriteErrorNavigationRequest),
                "WriteErrorNoMatchField" => Ok(Self::WriteErrorNoMatchField),
                "WriteErrorNonIntegerTTLField" => Ok(Self::WriteErrorNonIntegerTTLField),
                "WriteErrorNonListMatchDestField" => Ok(Self::WriteErrorNonListMatchDestField),
                "WriteErrorNonSecureContext" => Ok(Self::WriteErrorNonSecureContext),
                "WriteErrorNonStringIdField" => Ok(Self::WriteErrorNonStringIdField),
                "WriteErrorNonStringInMatchDestList" => Ok(Self::WriteErrorNonStringInMatchDestList),
                "WriteErrorInvalidMatchDestList" => Ok(Self::WriteErrorInvalidMatchDestList),
                "WriteErrorNonStringMatchField" => Ok(Self::WriteErrorNonStringMatchField),
                "WriteErrorNonTokenTypeField" => Ok(Self::WriteErrorNonTokenTypeField),
                "WriteErrorRequestAborted" => Ok(Self::WriteErrorRequestAborted),
                "WriteErrorShuttingDown" => Ok(Self::WriteErrorShuttingDown),
                "WriteErrorTooLongIdField" => Ok(Self::WriteErrorTooLongIdField),
                "WriteErrorUnsupportedType" => Ok(Self::WriteErrorUnsupportedType),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SharedDictionaryError",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SRIMessageSignatureError {
        MissingSignatureHeader,
        MissingSignatureInputHeader,
        InvalidSignatureHeader,
        InvalidSignatureInputHeader,
        SignatureHeaderValueIsNotByteSequence,
        SignatureHeaderValueIsParameterized,
        SignatureHeaderValueIsIncorrectLength,
        SignatureInputHeaderMissingLabel,
        SignatureInputHeaderValueNotInnerList,
        SignatureInputHeaderValueMissingComponents,
        SignatureInputHeaderInvalidComponentType,
        SignatureInputHeaderInvalidComponentName,
        SignatureInputHeaderInvalidHeaderComponentParameter,
        SignatureInputHeaderInvalidDerivedComponentParameter,
        SignatureInputHeaderKeyIdLength,
        SignatureInputHeaderInvalidParameter,
        SignatureInputHeaderMissingRequiredParameters,
        ValidationFailedSignatureExpired,
        ValidationFailedInvalidLength,
        ValidationFailedSignatureMismatch,
        ValidationFailedIntegrityMismatch,
        SignatureBaseUnknownDerivedComponent,
        SignatureBaseMissingHeader,
        SignatureBaseInvalidUnencodedDigest,
        SignatureBaseUnsupportedComponent,
    }

    impl SRIMessageSignatureError {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MissingSignatureHeader => "MissingSignatureHeader",
                Self::MissingSignatureInputHeader => "MissingSignatureInputHeader",
                Self::InvalidSignatureHeader => "InvalidSignatureHeader",
                Self::InvalidSignatureInputHeader => "InvalidSignatureInputHeader",
                Self::SignatureHeaderValueIsNotByteSequence => "SignatureHeaderValueIsNotByteSequence",
                Self::SignatureHeaderValueIsParameterized => "SignatureHeaderValueIsParameterized",
                Self::SignatureHeaderValueIsIncorrectLength => "SignatureHeaderValueIsIncorrectLength",
                Self::SignatureInputHeaderMissingLabel => "SignatureInputHeaderMissingLabel",
                Self::SignatureInputHeaderValueNotInnerList => "SignatureInputHeaderValueNotInnerList",
                Self::SignatureInputHeaderValueMissingComponents => "SignatureInputHeaderValueMissingComponents",
                Self::SignatureInputHeaderInvalidComponentType => "SignatureInputHeaderInvalidComponentType",
                Self::SignatureInputHeaderInvalidComponentName => "SignatureInputHeaderInvalidComponentName",
                Self::SignatureInputHeaderInvalidHeaderComponentParameter => "SignatureInputHeaderInvalidHeaderComponentParameter",
                Self::SignatureInputHeaderInvalidDerivedComponentParameter => "SignatureInputHeaderInvalidDerivedComponentParameter",
                Self::SignatureInputHeaderKeyIdLength => "SignatureInputHeaderKeyIdLength",
                Self::SignatureInputHeaderInvalidParameter => "SignatureInputHeaderInvalidParameter",
                Self::SignatureInputHeaderMissingRequiredParameters => "SignatureInputHeaderMissingRequiredParameters",
                Self::ValidationFailedSignatureExpired => "ValidationFailedSignatureExpired",
                Self::ValidationFailedInvalidLength => "ValidationFailedInvalidLength",
                Self::ValidationFailedSignatureMismatch => "ValidationFailedSignatureMismatch",
                Self::ValidationFailedIntegrityMismatch => "ValidationFailedIntegrityMismatch",
                Self::SignatureBaseUnknownDerivedComponent => "SignatureBaseUnknownDerivedComponent",
                Self::SignatureBaseMissingHeader => "SignatureBaseMissingHeader",
                Self::SignatureBaseInvalidUnencodedDigest => "SignatureBaseInvalidUnencodedDigest",
                Self::SignatureBaseUnsupportedComponent => "SignatureBaseUnsupportedComponent",
            }
        }
    }

    impl AsRef<str> for SRIMessageSignatureError {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SRIMessageSignatureError {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "MissingSignatureHeader" => Ok(Self::MissingSignatureHeader),
                "MissingSignatureInputHeader" => Ok(Self::MissingSignatureInputHeader),
                "InvalidSignatureHeader" => Ok(Self::InvalidSignatureHeader),
                "InvalidSignatureInputHeader" => Ok(Self::InvalidSignatureInputHeader),
                "SignatureHeaderValueIsNotByteSequence" => Ok(Self::SignatureHeaderValueIsNotByteSequence),
                "SignatureHeaderValueIsParameterized" => Ok(Self::SignatureHeaderValueIsParameterized),
                "SignatureHeaderValueIsIncorrectLength" => Ok(Self::SignatureHeaderValueIsIncorrectLength),
                "SignatureInputHeaderMissingLabel" => Ok(Self::SignatureInputHeaderMissingLabel),
                "SignatureInputHeaderValueNotInnerList" => Ok(Self::SignatureInputHeaderValueNotInnerList),
                "SignatureInputHeaderValueMissingComponents" => Ok(Self::SignatureInputHeaderValueMissingComponents),
                "SignatureInputHeaderInvalidComponentType" => Ok(Self::SignatureInputHeaderInvalidComponentType),
                "SignatureInputHeaderInvalidComponentName" => Ok(Self::SignatureInputHeaderInvalidComponentName),
                "SignatureInputHeaderInvalidHeaderComponentParameter" => Ok(Self::SignatureInputHeaderInvalidHeaderComponentParameter),
                "SignatureInputHeaderInvalidDerivedComponentParameter" => Ok(Self::SignatureInputHeaderInvalidDerivedComponentParameter),
                "SignatureInputHeaderKeyIdLength" => Ok(Self::SignatureInputHeaderKeyIdLength),
                "SignatureInputHeaderInvalidParameter" => Ok(Self::SignatureInputHeaderInvalidParameter),
                "SignatureInputHeaderMissingRequiredParameters" => Ok(Self::SignatureInputHeaderMissingRequiredParameters),
                "ValidationFailedSignatureExpired" => Ok(Self::ValidationFailedSignatureExpired),
                "ValidationFailedInvalidLength" => Ok(Self::ValidationFailedInvalidLength),
                "ValidationFailedSignatureMismatch" => Ok(Self::ValidationFailedSignatureMismatch),
                "ValidationFailedIntegrityMismatch" => Ok(Self::ValidationFailedIntegrityMismatch),
                "SignatureBaseUnknownDerivedComponent" => Ok(Self::SignatureBaseUnknownDerivedComponent),
                "SignatureBaseMissingHeader" => Ok(Self::SignatureBaseMissingHeader),
                "SignatureBaseInvalidUnencodedDigest" => Ok(Self::SignatureBaseInvalidUnencodedDigest),
                "SignatureBaseUnsupportedComponent" => Ok(Self::SignatureBaseUnsupportedComponent),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SRIMessageSignatureError",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum UnencodedDigestError {
        MalformedDictionary,
        UnknownAlgorithm,
        IncorrectDigestType,
        IncorrectDigestLength,
    }

    impl UnencodedDigestError {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MalformedDictionary => "MalformedDictionary",
                Self::UnknownAlgorithm => "UnknownAlgorithm",
                Self::IncorrectDigestType => "IncorrectDigestType",
                Self::IncorrectDigestLength => "IncorrectDigestLength",
            }
        }
    }

    impl AsRef<str> for UnencodedDigestError {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for UnencodedDigestError {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "MalformedDictionary" => Ok(Self::MalformedDictionary),
                "UnknownAlgorithm" => Ok(Self::UnknownAlgorithm),
                "IncorrectDigestType" => Ok(Self::IncorrectDigestType),
                "IncorrectDigestLength" => Ok(Self::IncorrectDigestLength),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "UnencodedDigestError",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ConnectionAllowlistError {
        InvalidHeader,
        MoreThanOneList,
        ItemNotInnerList,
        InvalidAllowlistItemType,
        ReportingEndpointNotToken,
        InvalidUrlPattern,
        IFrameAttributeLoosensEmbeddingRequirement,
        InvalidAllowConnectionAllowlistFrom,
        EmbeddingRequirementNotSatisfied,
    }

    impl ConnectionAllowlistError {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::InvalidHeader => "InvalidHeader",
                Self::MoreThanOneList => "MoreThanOneList",
                Self::ItemNotInnerList => "ItemNotInnerList",
                Self::InvalidAllowlistItemType => "InvalidAllowlistItemType",
                Self::ReportingEndpointNotToken => "ReportingEndpointNotToken",
                Self::InvalidUrlPattern => "InvalidUrlPattern",
                Self::IFrameAttributeLoosensEmbeddingRequirement => "IFrameAttributeLoosensEmbeddingRequirement",
                Self::InvalidAllowConnectionAllowlistFrom => "InvalidAllowConnectionAllowlistFrom",
                Self::EmbeddingRequirementNotSatisfied => "EmbeddingRequirementNotSatisfied",
            }
        }
    }

    impl AsRef<str> for ConnectionAllowlistError {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ConnectionAllowlistError {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "InvalidHeader" => Ok(Self::InvalidHeader),
                "MoreThanOneList" => Ok(Self::MoreThanOneList),
                "ItemNotInnerList" => Ok(Self::ItemNotInnerList),
                "InvalidAllowlistItemType" => Ok(Self::InvalidAllowlistItemType),
                "ReportingEndpointNotToken" => Ok(Self::ReportingEndpointNotToken),
                "InvalidUrlPattern" => Ok(Self::InvalidUrlPattern),
                "IFrameAttributeLoosensEmbeddingRequirement" => Ok(Self::IFrameAttributeLoosensEmbeddingRequirement),
                "InvalidAllowConnectionAllowlistFrom" => Ok(Self::InvalidAllowConnectionAllowlistFrom),
                "EmbeddingRequirementNotSatisfied" => Ok(Self::EmbeddingRequirementNotSatisfied),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ConnectionAllowlistError",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct QuirksModeIssueDetails {
        pub is_limited_quirks_mode: bool,
        pub document_node_id: crate::generated::dom::BackendNodeId,
        pub url: String,
        pub frame_id: crate::generated::page::FrameId,
        pub loader_id: crate::generated::network::LoaderId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct NavigatorUserAgentIssueDetails {
        pub url: String,
        pub location: Option<Box<crate::generated::audits::SourceCodeLocation>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedDictionaryIssueDetails {
        pub shared_dictionary_error: crate::generated::audits::SharedDictionaryError,
        pub request: Box<crate::generated::audits::AffectedRequest>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SRIMessageSignatureIssueDetails {
        pub error: crate::generated::audits::SRIMessageSignatureError,
        pub signature_base: String,
        pub integrity_assertions: Vec<String>,
        pub request: Box<crate::generated::audits::AffectedRequest>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct UnencodedDigestIssueDetails {
        pub error: crate::generated::audits::UnencodedDigestError,
        pub request: Box<crate::generated::audits::AffectedRequest>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ConnectionAllowlistIssueDetails {
        pub error: crate::generated::audits::ConnectionAllowlistError,
        pub request: Box<crate::generated::audits::AffectedRequest>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum GenericIssueErrorType {
        FormLabelForNameError,
        FormDuplicateIdForInputError,
        FormInputWithNoLabelError,
        FormAutocompleteAttributeEmptyError,
        FormEmptyIdAndNameAttributesForInputError,
        FormAriaLabelledByToNonExistingIdError,
        FormInputAssignedAutocompleteValueToIdOrNameAttributeError,
        FormLabelHasNeitherForNorNestedInputError,
        FormLabelForMatchesNonExistingIdError,
        FormInputHasWrongButWellIntendedAutocompleteValueError,
        ResponseWasBlockedByORB,
        NavigationEntryMarkedSkippable,
        BackUINavigationWouldSkipAd,
        AutofillAndManualTextPolicyControlledFeaturesInfo,
        AutofillPolicyControlledFeatureInfo,
        ManualTextPolicyControlledFeatureInfo,
        FormModelContextParameterMissingTitleAndDescription,
        FormModelContextMissingToolName,
        FormModelContextMissingToolDescription,
        FormModelContextRequiredParameterMissingName,
        FormModelContextParameterMissingName,
    }

    impl GenericIssueErrorType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::FormLabelForNameError => "FormLabelForNameError",
                Self::FormDuplicateIdForInputError => "FormDuplicateIdForInputError",
                Self::FormInputWithNoLabelError => "FormInputWithNoLabelError",
                Self::FormAutocompleteAttributeEmptyError => "FormAutocompleteAttributeEmptyError",
                Self::FormEmptyIdAndNameAttributesForInputError => "FormEmptyIdAndNameAttributesForInputError",
                Self::FormAriaLabelledByToNonExistingIdError => "FormAriaLabelledByToNonExistingIdError",
                Self::FormInputAssignedAutocompleteValueToIdOrNameAttributeError => "FormInputAssignedAutocompleteValueToIdOrNameAttributeError",
                Self::FormLabelHasNeitherForNorNestedInputError => "FormLabelHasNeitherForNorNestedInputError",
                Self::FormLabelForMatchesNonExistingIdError => "FormLabelForMatchesNonExistingIdError",
                Self::FormInputHasWrongButWellIntendedAutocompleteValueError => "FormInputHasWrongButWellIntendedAutocompleteValueError",
                Self::ResponseWasBlockedByORB => "ResponseWasBlockedByORB",
                Self::NavigationEntryMarkedSkippable => "NavigationEntryMarkedSkippable",
                Self::BackUINavigationWouldSkipAd => "BackUINavigationWouldSkipAd",
                Self::AutofillAndManualTextPolicyControlledFeaturesInfo => "AutofillAndManualTextPolicyControlledFeaturesInfo",
                Self::AutofillPolicyControlledFeatureInfo => "AutofillPolicyControlledFeatureInfo",
                Self::ManualTextPolicyControlledFeatureInfo => "ManualTextPolicyControlledFeatureInfo",
                Self::FormModelContextParameterMissingTitleAndDescription => "FormModelContextParameterMissingTitleAndDescription",
                Self::FormModelContextMissingToolName => "FormModelContextMissingToolName",
                Self::FormModelContextMissingToolDescription => "FormModelContextMissingToolDescription",
                Self::FormModelContextRequiredParameterMissingName => "FormModelContextRequiredParameterMissingName",
                Self::FormModelContextParameterMissingName => "FormModelContextParameterMissingName",
            }
        }
    }

    impl AsRef<str> for GenericIssueErrorType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for GenericIssueErrorType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "FormLabelForNameError" => Ok(Self::FormLabelForNameError),
                "FormDuplicateIdForInputError" => Ok(Self::FormDuplicateIdForInputError),
                "FormInputWithNoLabelError" => Ok(Self::FormInputWithNoLabelError),
                "FormAutocompleteAttributeEmptyError" => Ok(Self::FormAutocompleteAttributeEmptyError),
                "FormEmptyIdAndNameAttributesForInputError" => Ok(Self::FormEmptyIdAndNameAttributesForInputError),
                "FormAriaLabelledByToNonExistingIdError" => Ok(Self::FormAriaLabelledByToNonExistingIdError),
                "FormInputAssignedAutocompleteValueToIdOrNameAttributeError" => Ok(Self::FormInputAssignedAutocompleteValueToIdOrNameAttributeError),
                "FormLabelHasNeitherForNorNestedInputError" => Ok(Self::FormLabelHasNeitherForNorNestedInputError),
                "FormLabelForMatchesNonExistingIdError" => Ok(Self::FormLabelForMatchesNonExistingIdError),
                "FormInputHasWrongButWellIntendedAutocompleteValueError" => Ok(Self::FormInputHasWrongButWellIntendedAutocompleteValueError),
                "ResponseWasBlockedByORB" => Ok(Self::ResponseWasBlockedByORB),
                "NavigationEntryMarkedSkippable" => Ok(Self::NavigationEntryMarkedSkippable),
                "BackUINavigationWouldSkipAd" => Ok(Self::BackUINavigationWouldSkipAd),
                "AutofillAndManualTextPolicyControlledFeaturesInfo" => Ok(Self::AutofillAndManualTextPolicyControlledFeaturesInfo),
                "AutofillPolicyControlledFeatureInfo" => Ok(Self::AutofillPolicyControlledFeatureInfo),
                "ManualTextPolicyControlledFeatureInfo" => Ok(Self::ManualTextPolicyControlledFeatureInfo),
                "FormModelContextParameterMissingTitleAndDescription" => Ok(Self::FormModelContextParameterMissingTitleAndDescription),
                "FormModelContextMissingToolName" => Ok(Self::FormModelContextMissingToolName),
                "FormModelContextMissingToolDescription" => Ok(Self::FormModelContextMissingToolDescription),
                "FormModelContextRequiredParameterMissingName" => Ok(Self::FormModelContextRequiredParameterMissingName),
                "FormModelContextParameterMissingName" => Ok(Self::FormModelContextParameterMissingName),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "GenericIssueErrorType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct GenericIssueDetails {
        pub error_type: crate::generated::audits::GenericIssueErrorType,
        pub frame_id: Option<crate::generated::page::FrameId>,
        pub violating_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub violating_node_attribute: Option<String>,
        pub request: Option<Box<crate::generated::audits::AffectedRequest>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeprecationIssueDetails {
        pub affected_frame: Option<Box<crate::generated::audits::AffectedFrame>>,
        pub source_code_location: Box<crate::generated::audits::SourceCodeLocation>,
        pub type_: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BounceTrackingIssueDetails {
        pub tracking_sites: Vec<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CookieDeprecationMetadataIssueDetails {
        pub allowed_sites: Vec<String>,
        pub opt_out_percentage: f64,
        pub is_opt_out_top_level: bool,
        pub operation: crate::generated::audits::CookieOperation,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ClientHintIssueReason {
        MetaTagAllowListInvalidOrigin,
        MetaTagModifiedHTML,
    }

    impl ClientHintIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MetaTagAllowListInvalidOrigin => "MetaTagAllowListInvalidOrigin",
                Self::MetaTagModifiedHTML => "MetaTagModifiedHTML",
            }
        }
    }

    impl AsRef<str> for ClientHintIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ClientHintIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "MetaTagAllowListInvalidOrigin" => Ok(Self::MetaTagAllowListInvalidOrigin),
                "MetaTagModifiedHTML" => Ok(Self::MetaTagModifiedHTML),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ClientHintIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FederatedAuthRequestIssueDetails {
        pub federated_auth_request_issue_reason: crate::generated::audits::FederatedAuthRequestIssueReason,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum FederatedAuthRequestIssueReason {
        ShouldEmbargo,
        TooManyRequests,
        WellKnownHttpNotFound,
        WellKnownNoResponse,
        WellKnownBlockedByConnectionAllowlist,
        WellKnownInvalidResponse,
        WellKnownListEmpty,
        WellKnownInvalidContentType,
        ConfigNotInWellKnown,
        WellKnownTooBig,
        ConfigHttpNotFound,
        ConfigNoResponse,
        ConfigBlockedByConnectionAllowlist,
        ConfigInvalidResponse,
        ConfigInvalidContentType,
        IdpNotPotentiallyTrustworthy,
        DisabledInSettings,
        DisabledInFlags,
        ErrorFetchingSignin,
        InvalidSigninResponse,
        AccountsHttpNotFound,
        AccountsNoResponse,
        AccountsBlockedByConnectionAllowlist,
        AccountsInvalidResponse,
        AccountsListEmpty,
        AccountsInvalidContentType,
        IdTokenHttpNotFound,
        IdTokenNoResponse,
        IdTokenBlockedByConnectionAllowlist,
        IdTokenInvalidResponse,
        IdTokenIdpErrorResponse,
        IdTokenCrossSiteIdpErrorResponse,
        IdTokenInvalidRequest,
        IdTokenInvalidContentType,
        ErrorIdToken,
        Canceled,
        RpPageNotVisible,
        SilentMediationFailure,
        NotSignedInWithIdp,
        MissingTransientUserActivation,
        ReplacedByActiveMode,
        RelyingPartyOriginIsOpaque,
        TypeNotMatching,
        UiDismissedNoEmbargo,
        CorsError,
        SuppressedBySegmentationPlatform,
    }

    impl FederatedAuthRequestIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ShouldEmbargo => "ShouldEmbargo",
                Self::TooManyRequests => "TooManyRequests",
                Self::WellKnownHttpNotFound => "WellKnownHttpNotFound",
                Self::WellKnownNoResponse => "WellKnownNoResponse",
                Self::WellKnownBlockedByConnectionAllowlist => "WellKnownBlockedByConnectionAllowlist",
                Self::WellKnownInvalidResponse => "WellKnownInvalidResponse",
                Self::WellKnownListEmpty => "WellKnownListEmpty",
                Self::WellKnownInvalidContentType => "WellKnownInvalidContentType",
                Self::ConfigNotInWellKnown => "ConfigNotInWellKnown",
                Self::WellKnownTooBig => "WellKnownTooBig",
                Self::ConfigHttpNotFound => "ConfigHttpNotFound",
                Self::ConfigNoResponse => "ConfigNoResponse",
                Self::ConfigBlockedByConnectionAllowlist => "ConfigBlockedByConnectionAllowlist",
                Self::ConfigInvalidResponse => "ConfigInvalidResponse",
                Self::ConfigInvalidContentType => "ConfigInvalidContentType",
                Self::IdpNotPotentiallyTrustworthy => "IdpNotPotentiallyTrustworthy",
                Self::DisabledInSettings => "DisabledInSettings",
                Self::DisabledInFlags => "DisabledInFlags",
                Self::ErrorFetchingSignin => "ErrorFetchingSignin",
                Self::InvalidSigninResponse => "InvalidSigninResponse",
                Self::AccountsHttpNotFound => "AccountsHttpNotFound",
                Self::AccountsNoResponse => "AccountsNoResponse",
                Self::AccountsBlockedByConnectionAllowlist => "AccountsBlockedByConnectionAllowlist",
                Self::AccountsInvalidResponse => "AccountsInvalidResponse",
                Self::AccountsListEmpty => "AccountsListEmpty",
                Self::AccountsInvalidContentType => "AccountsInvalidContentType",
                Self::IdTokenHttpNotFound => "IdTokenHttpNotFound",
                Self::IdTokenNoResponse => "IdTokenNoResponse",
                Self::IdTokenBlockedByConnectionAllowlist => "IdTokenBlockedByConnectionAllowlist",
                Self::IdTokenInvalidResponse => "IdTokenInvalidResponse",
                Self::IdTokenIdpErrorResponse => "IdTokenIdpErrorResponse",
                Self::IdTokenCrossSiteIdpErrorResponse => "IdTokenCrossSiteIdpErrorResponse",
                Self::IdTokenInvalidRequest => "IdTokenInvalidRequest",
                Self::IdTokenInvalidContentType => "IdTokenInvalidContentType",
                Self::ErrorIdToken => "ErrorIdToken",
                Self::Canceled => "Canceled",
                Self::RpPageNotVisible => "RpPageNotVisible",
                Self::SilentMediationFailure => "SilentMediationFailure",
                Self::NotSignedInWithIdp => "NotSignedInWithIdp",
                Self::MissingTransientUserActivation => "MissingTransientUserActivation",
                Self::ReplacedByActiveMode => "ReplacedByActiveMode",
                Self::RelyingPartyOriginIsOpaque => "RelyingPartyOriginIsOpaque",
                Self::TypeNotMatching => "TypeNotMatching",
                Self::UiDismissedNoEmbargo => "UiDismissedNoEmbargo",
                Self::CorsError => "CorsError",
                Self::SuppressedBySegmentationPlatform => "SuppressedBySegmentationPlatform",
            }
        }
    }

    impl AsRef<str> for FederatedAuthRequestIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for FederatedAuthRequestIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ShouldEmbargo" => Ok(Self::ShouldEmbargo),
                "TooManyRequests" => Ok(Self::TooManyRequests),
                "WellKnownHttpNotFound" => Ok(Self::WellKnownHttpNotFound),
                "WellKnownNoResponse" => Ok(Self::WellKnownNoResponse),
                "WellKnownBlockedByConnectionAllowlist" => Ok(Self::WellKnownBlockedByConnectionAllowlist),
                "WellKnownInvalidResponse" => Ok(Self::WellKnownInvalidResponse),
                "WellKnownListEmpty" => Ok(Self::WellKnownListEmpty),
                "WellKnownInvalidContentType" => Ok(Self::WellKnownInvalidContentType),
                "ConfigNotInWellKnown" => Ok(Self::ConfigNotInWellKnown),
                "WellKnownTooBig" => Ok(Self::WellKnownTooBig),
                "ConfigHttpNotFound" => Ok(Self::ConfigHttpNotFound),
                "ConfigNoResponse" => Ok(Self::ConfigNoResponse),
                "ConfigBlockedByConnectionAllowlist" => Ok(Self::ConfigBlockedByConnectionAllowlist),
                "ConfigInvalidResponse" => Ok(Self::ConfigInvalidResponse),
                "ConfigInvalidContentType" => Ok(Self::ConfigInvalidContentType),
                "IdpNotPotentiallyTrustworthy" => Ok(Self::IdpNotPotentiallyTrustworthy),
                "DisabledInSettings" => Ok(Self::DisabledInSettings),
                "DisabledInFlags" => Ok(Self::DisabledInFlags),
                "ErrorFetchingSignin" => Ok(Self::ErrorFetchingSignin),
                "InvalidSigninResponse" => Ok(Self::InvalidSigninResponse),
                "AccountsHttpNotFound" => Ok(Self::AccountsHttpNotFound),
                "AccountsNoResponse" => Ok(Self::AccountsNoResponse),
                "AccountsBlockedByConnectionAllowlist" => Ok(Self::AccountsBlockedByConnectionAllowlist),
                "AccountsInvalidResponse" => Ok(Self::AccountsInvalidResponse),
                "AccountsListEmpty" => Ok(Self::AccountsListEmpty),
                "AccountsInvalidContentType" => Ok(Self::AccountsInvalidContentType),
                "IdTokenHttpNotFound" => Ok(Self::IdTokenHttpNotFound),
                "IdTokenNoResponse" => Ok(Self::IdTokenNoResponse),
                "IdTokenBlockedByConnectionAllowlist" => Ok(Self::IdTokenBlockedByConnectionAllowlist),
                "IdTokenInvalidResponse" => Ok(Self::IdTokenInvalidResponse),
                "IdTokenIdpErrorResponse" => Ok(Self::IdTokenIdpErrorResponse),
                "IdTokenCrossSiteIdpErrorResponse" => Ok(Self::IdTokenCrossSiteIdpErrorResponse),
                "IdTokenInvalidRequest" => Ok(Self::IdTokenInvalidRequest),
                "IdTokenInvalidContentType" => Ok(Self::IdTokenInvalidContentType),
                "ErrorIdToken" => Ok(Self::ErrorIdToken),
                "Canceled" => Ok(Self::Canceled),
                "RpPageNotVisible" => Ok(Self::RpPageNotVisible),
                "SilentMediationFailure" => Ok(Self::SilentMediationFailure),
                "NotSignedInWithIdp" => Ok(Self::NotSignedInWithIdp),
                "MissingTransientUserActivation" => Ok(Self::MissingTransientUserActivation),
                "ReplacedByActiveMode" => Ok(Self::ReplacedByActiveMode),
                "RelyingPartyOriginIsOpaque" => Ok(Self::RelyingPartyOriginIsOpaque),
                "TypeNotMatching" => Ok(Self::TypeNotMatching),
                "UiDismissedNoEmbargo" => Ok(Self::UiDismissedNoEmbargo),
                "CorsError" => Ok(Self::CorsError),
                "SuppressedBySegmentationPlatform" => Ok(Self::SuppressedBySegmentationPlatform),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "FederatedAuthRequestIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FederatedAuthUserInfoRequestIssueDetails {
        pub federated_auth_user_info_request_issue_reason: crate::generated::audits::FederatedAuthUserInfoRequestIssueReason,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum FederatedAuthUserInfoRequestIssueReason {
        NotSameOrigin,
        NotIframe,
        NotPotentiallyTrustworthy,
        NoApiPermission,
        NotSignedInWithIdp,
        NoAccountSharingPermission,
        InvalidConfigOrWellKnown,
        InvalidAccountsResponse,
        NoReturningUserFromFetchedAccounts,
    }

    impl FederatedAuthUserInfoRequestIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::NotSameOrigin => "NotSameOrigin",
                Self::NotIframe => "NotIframe",
                Self::NotPotentiallyTrustworthy => "NotPotentiallyTrustworthy",
                Self::NoApiPermission => "NoApiPermission",
                Self::NotSignedInWithIdp => "NotSignedInWithIdp",
                Self::NoAccountSharingPermission => "NoAccountSharingPermission",
                Self::InvalidConfigOrWellKnown => "InvalidConfigOrWellKnown",
                Self::InvalidAccountsResponse => "InvalidAccountsResponse",
                Self::NoReturningUserFromFetchedAccounts => "NoReturningUserFromFetchedAccounts",
            }
        }
    }

    impl AsRef<str> for FederatedAuthUserInfoRequestIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for FederatedAuthUserInfoRequestIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "NotSameOrigin" => Ok(Self::NotSameOrigin),
                "NotIframe" => Ok(Self::NotIframe),
                "NotPotentiallyTrustworthy" => Ok(Self::NotPotentiallyTrustworthy),
                "NoApiPermission" => Ok(Self::NoApiPermission),
                "NotSignedInWithIdp" => Ok(Self::NotSignedInWithIdp),
                "NoAccountSharingPermission" => Ok(Self::NoAccountSharingPermission),
                "InvalidConfigOrWellKnown" => Ok(Self::InvalidConfigOrWellKnown),
                "InvalidAccountsResponse" => Ok(Self::InvalidAccountsResponse),
                "NoReturningUserFromFetchedAccounts" => Ok(Self::NoReturningUserFromFetchedAccounts),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "FederatedAuthUserInfoRequestIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct EmailVerificationRequestIssueDetails {
        pub email_verification_request_issue_reason: crate::generated::audits::EmailVerificationRequestIssueReason,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum EmailVerificationRequestIssueReason {
        InvalidEmail,
        DnsFetchFailed,
        DnsInvalidRecord,
        WellKnownHttpNotFound,
        WellKnownNoResponse,
        WellKnownInvalidResponse,
        WellKnownListEmpty,
        WellKnownInvalidContentType,
        WellKnownMissingIssuanceEndpoint,
        WellKnownIssuanceEndpointCrossOrigin,
        WellKnownUnsupportedSigningAlgorithm,
        TokenHttpNotFound,
        TokenNoResponse,
        TokenInvalidResponse,
        TokenInvalidContentType,
        TokenMalformedSdJwt,
        TokenInvalidSdJwt,
        KeyBindingSigningFailed,
        RpOriginIsOpaque,
        WellKnownMissingAccountsEndpoint,
        UserLoggedOut,
        WellKnownAccountsEndpointCrossOrigin,
        AccountsHttpNotFound,
        AccountsNoResponse,
        AccountsInvalidResponse,
        AccountsInvalidContentType,
        AccountsEmptyList,
        EmailVerificationWellKnownHttpNotFound,
        EmailVerificationWellKnownNoResponse,
        EmailVerificationWellKnownInvalidResponse,
        EmailVerificationWellKnownInvalidContentType,
        JwksHttpNotFound,
        JwksInvalidResponse,
        TokenVerificationSdJwtUnsupportedHeaderAlg,
        TokenVerificationSdJwtInvalidTyp,
        TokenVerificationSdJwtMissingIss,
        TokenVerificationSdJwtMissingIat,
        TokenVerificationSdJwtMissingCnf,
        TokenVerificationSdJwtMissingEmail,
        TokenVerificationSdJwtInvalidIssuedAt,
        TokenVerificationSdJwtInvalidIssuer,
        TokenVerificationSdJwtJwksMissingKeys,
        TokenVerificationSdJwtSignatureFailed,
        TokenVerificationSdJwtInvalidEmailVerified,
        TokenVerificationSdJwtInvalidEmail,
        TokenVerificationSdJwtInvalidHolderKey,
        TokenVerificationKbInvalidTyp,
        TokenVerificationKbMissingAud,
        TokenVerificationKbMissingNonce,
        TokenVerificationKbMissingIat,
        TokenVerificationKbMissingSdHash,
        TokenVerificationKbInvalidIssuedAt,
        TokenVerificationKbInvalidAudience,
        TokenVerificationKbInvalidNonce,
        TokenVerificationKbInvalidSdHash,
        TokenVerificationKbMissingCnf,
        TokenVerificationKbSignatureFailed,
    }

    impl EmailVerificationRequestIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::InvalidEmail => "InvalidEmail",
                Self::DnsFetchFailed => "DnsFetchFailed",
                Self::DnsInvalidRecord => "DnsInvalidRecord",
                Self::WellKnownHttpNotFound => "WellKnownHttpNotFound",
                Self::WellKnownNoResponse => "WellKnownNoResponse",
                Self::WellKnownInvalidResponse => "WellKnownInvalidResponse",
                Self::WellKnownListEmpty => "WellKnownListEmpty",
                Self::WellKnownInvalidContentType => "WellKnownInvalidContentType",
                Self::WellKnownMissingIssuanceEndpoint => "WellKnownMissingIssuanceEndpoint",
                Self::WellKnownIssuanceEndpointCrossOrigin => "WellKnownIssuanceEndpointCrossOrigin",
                Self::WellKnownUnsupportedSigningAlgorithm => "WellKnownUnsupportedSigningAlgorithm",
                Self::TokenHttpNotFound => "TokenHttpNotFound",
                Self::TokenNoResponse => "TokenNoResponse",
                Self::TokenInvalidResponse => "TokenInvalidResponse",
                Self::TokenInvalidContentType => "TokenInvalidContentType",
                Self::TokenMalformedSdJwt => "TokenMalformedSdJwt",
                Self::TokenInvalidSdJwt => "TokenInvalidSdJwt",
                Self::KeyBindingSigningFailed => "KeyBindingSigningFailed",
                Self::RpOriginIsOpaque => "RpOriginIsOpaque",
                Self::WellKnownMissingAccountsEndpoint => "WellKnownMissingAccountsEndpoint",
                Self::UserLoggedOut => "UserLoggedOut",
                Self::WellKnownAccountsEndpointCrossOrigin => "WellKnownAccountsEndpointCrossOrigin",
                Self::AccountsHttpNotFound => "AccountsHttpNotFound",
                Self::AccountsNoResponse => "AccountsNoResponse",
                Self::AccountsInvalidResponse => "AccountsInvalidResponse",
                Self::AccountsInvalidContentType => "AccountsInvalidContentType",
                Self::AccountsEmptyList => "AccountsEmptyList",
                Self::EmailVerificationWellKnownHttpNotFound => "EmailVerificationWellKnownHttpNotFound",
                Self::EmailVerificationWellKnownNoResponse => "EmailVerificationWellKnownNoResponse",
                Self::EmailVerificationWellKnownInvalidResponse => "EmailVerificationWellKnownInvalidResponse",
                Self::EmailVerificationWellKnownInvalidContentType => "EmailVerificationWellKnownInvalidContentType",
                Self::JwksHttpNotFound => "JwksHttpNotFound",
                Self::JwksInvalidResponse => "JwksInvalidResponse",
                Self::TokenVerificationSdJwtUnsupportedHeaderAlg => "TokenVerificationSdJwtUnsupportedHeaderAlg",
                Self::TokenVerificationSdJwtInvalidTyp => "TokenVerificationSdJwtInvalidTyp",
                Self::TokenVerificationSdJwtMissingIss => "TokenVerificationSdJwtMissingIss",
                Self::TokenVerificationSdJwtMissingIat => "TokenVerificationSdJwtMissingIat",
                Self::TokenVerificationSdJwtMissingCnf => "TokenVerificationSdJwtMissingCnf",
                Self::TokenVerificationSdJwtMissingEmail => "TokenVerificationSdJwtMissingEmail",
                Self::TokenVerificationSdJwtInvalidIssuedAt => "TokenVerificationSdJwtInvalidIssuedAt",
                Self::TokenVerificationSdJwtInvalidIssuer => "TokenVerificationSdJwtInvalidIssuer",
                Self::TokenVerificationSdJwtJwksMissingKeys => "TokenVerificationSdJwtJwksMissingKeys",
                Self::TokenVerificationSdJwtSignatureFailed => "TokenVerificationSdJwtSignatureFailed",
                Self::TokenVerificationSdJwtInvalidEmailVerified => "TokenVerificationSdJwtInvalidEmailVerified",
                Self::TokenVerificationSdJwtInvalidEmail => "TokenVerificationSdJwtInvalidEmail",
                Self::TokenVerificationSdJwtInvalidHolderKey => "TokenVerificationSdJwtInvalidHolderKey",
                Self::TokenVerificationKbInvalidTyp => "TokenVerificationKbInvalidTyp",
                Self::TokenVerificationKbMissingAud => "TokenVerificationKbMissingAud",
                Self::TokenVerificationKbMissingNonce => "TokenVerificationKbMissingNonce",
                Self::TokenVerificationKbMissingIat => "TokenVerificationKbMissingIat",
                Self::TokenVerificationKbMissingSdHash => "TokenVerificationKbMissingSdHash",
                Self::TokenVerificationKbInvalidIssuedAt => "TokenVerificationKbInvalidIssuedAt",
                Self::TokenVerificationKbInvalidAudience => "TokenVerificationKbInvalidAudience",
                Self::TokenVerificationKbInvalidNonce => "TokenVerificationKbInvalidNonce",
                Self::TokenVerificationKbInvalidSdHash => "TokenVerificationKbInvalidSdHash",
                Self::TokenVerificationKbMissingCnf => "TokenVerificationKbMissingCnf",
                Self::TokenVerificationKbSignatureFailed => "TokenVerificationKbSignatureFailed",
            }
        }
    }

    impl AsRef<str> for EmailVerificationRequestIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for EmailVerificationRequestIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "InvalidEmail" => Ok(Self::InvalidEmail),
                "DnsFetchFailed" => Ok(Self::DnsFetchFailed),
                "DnsInvalidRecord" => Ok(Self::DnsInvalidRecord),
                "WellKnownHttpNotFound" => Ok(Self::WellKnownHttpNotFound),
                "WellKnownNoResponse" => Ok(Self::WellKnownNoResponse),
                "WellKnownInvalidResponse" => Ok(Self::WellKnownInvalidResponse),
                "WellKnownListEmpty" => Ok(Self::WellKnownListEmpty),
                "WellKnownInvalidContentType" => Ok(Self::WellKnownInvalidContentType),
                "WellKnownMissingIssuanceEndpoint" => Ok(Self::WellKnownMissingIssuanceEndpoint),
                "WellKnownIssuanceEndpointCrossOrigin" => Ok(Self::WellKnownIssuanceEndpointCrossOrigin),
                "WellKnownUnsupportedSigningAlgorithm" => Ok(Self::WellKnownUnsupportedSigningAlgorithm),
                "TokenHttpNotFound" => Ok(Self::TokenHttpNotFound),
                "TokenNoResponse" => Ok(Self::TokenNoResponse),
                "TokenInvalidResponse" => Ok(Self::TokenInvalidResponse),
                "TokenInvalidContentType" => Ok(Self::TokenInvalidContentType),
                "TokenMalformedSdJwt" => Ok(Self::TokenMalformedSdJwt),
                "TokenInvalidSdJwt" => Ok(Self::TokenInvalidSdJwt),
                "KeyBindingSigningFailed" => Ok(Self::KeyBindingSigningFailed),
                "RpOriginIsOpaque" => Ok(Self::RpOriginIsOpaque),
                "WellKnownMissingAccountsEndpoint" => Ok(Self::WellKnownMissingAccountsEndpoint),
                "UserLoggedOut" => Ok(Self::UserLoggedOut),
                "WellKnownAccountsEndpointCrossOrigin" => Ok(Self::WellKnownAccountsEndpointCrossOrigin),
                "AccountsHttpNotFound" => Ok(Self::AccountsHttpNotFound),
                "AccountsNoResponse" => Ok(Self::AccountsNoResponse),
                "AccountsInvalidResponse" => Ok(Self::AccountsInvalidResponse),
                "AccountsInvalidContentType" => Ok(Self::AccountsInvalidContentType),
                "AccountsEmptyList" => Ok(Self::AccountsEmptyList),
                "EmailVerificationWellKnownHttpNotFound" => Ok(Self::EmailVerificationWellKnownHttpNotFound),
                "EmailVerificationWellKnownNoResponse" => Ok(Self::EmailVerificationWellKnownNoResponse),
                "EmailVerificationWellKnownInvalidResponse" => Ok(Self::EmailVerificationWellKnownInvalidResponse),
                "EmailVerificationWellKnownInvalidContentType" => Ok(Self::EmailVerificationWellKnownInvalidContentType),
                "JwksHttpNotFound" => Ok(Self::JwksHttpNotFound),
                "JwksInvalidResponse" => Ok(Self::JwksInvalidResponse),
                "TokenVerificationSdJwtUnsupportedHeaderAlg" => Ok(Self::TokenVerificationSdJwtUnsupportedHeaderAlg),
                "TokenVerificationSdJwtInvalidTyp" => Ok(Self::TokenVerificationSdJwtInvalidTyp),
                "TokenVerificationSdJwtMissingIss" => Ok(Self::TokenVerificationSdJwtMissingIss),
                "TokenVerificationSdJwtMissingIat" => Ok(Self::TokenVerificationSdJwtMissingIat),
                "TokenVerificationSdJwtMissingCnf" => Ok(Self::TokenVerificationSdJwtMissingCnf),
                "TokenVerificationSdJwtMissingEmail" => Ok(Self::TokenVerificationSdJwtMissingEmail),
                "TokenVerificationSdJwtInvalidIssuedAt" => Ok(Self::TokenVerificationSdJwtInvalidIssuedAt),
                "TokenVerificationSdJwtInvalidIssuer" => Ok(Self::TokenVerificationSdJwtInvalidIssuer),
                "TokenVerificationSdJwtJwksMissingKeys" => Ok(Self::TokenVerificationSdJwtJwksMissingKeys),
                "TokenVerificationSdJwtSignatureFailed" => Ok(Self::TokenVerificationSdJwtSignatureFailed),
                "TokenVerificationSdJwtInvalidEmailVerified" => Ok(Self::TokenVerificationSdJwtInvalidEmailVerified),
                "TokenVerificationSdJwtInvalidEmail" => Ok(Self::TokenVerificationSdJwtInvalidEmail),
                "TokenVerificationSdJwtInvalidHolderKey" => Ok(Self::TokenVerificationSdJwtInvalidHolderKey),
                "TokenVerificationKbInvalidTyp" => Ok(Self::TokenVerificationKbInvalidTyp),
                "TokenVerificationKbMissingAud" => Ok(Self::TokenVerificationKbMissingAud),
                "TokenVerificationKbMissingNonce" => Ok(Self::TokenVerificationKbMissingNonce),
                "TokenVerificationKbMissingIat" => Ok(Self::TokenVerificationKbMissingIat),
                "TokenVerificationKbMissingSdHash" => Ok(Self::TokenVerificationKbMissingSdHash),
                "TokenVerificationKbInvalidIssuedAt" => Ok(Self::TokenVerificationKbInvalidIssuedAt),
                "TokenVerificationKbInvalidAudience" => Ok(Self::TokenVerificationKbInvalidAudience),
                "TokenVerificationKbInvalidNonce" => Ok(Self::TokenVerificationKbInvalidNonce),
                "TokenVerificationKbInvalidSdHash" => Ok(Self::TokenVerificationKbInvalidSdHash),
                "TokenVerificationKbMissingCnf" => Ok(Self::TokenVerificationKbMissingCnf),
                "TokenVerificationKbSignatureFailed" => Ok(Self::TokenVerificationKbSignatureFailed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "EmailVerificationRequestIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ClientHintIssueDetails {
        pub source_code_location: Box<crate::generated::audits::SourceCodeLocation>,
        pub client_hint_issue_reason: crate::generated::audits::ClientHintIssueReason,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FailedRequestInfo {
        pub url: String,
        pub failure_message: String,
        pub request_id: Option<crate::generated::network::RequestId>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PartitioningBlobURLInfo {
        BlockedCrossPartitionFetching,
        EnforceNoopenerForNavigation,
    }

    impl PartitioningBlobURLInfo {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::BlockedCrossPartitionFetching => "BlockedCrossPartitionFetching",
                Self::EnforceNoopenerForNavigation => "EnforceNoopenerForNavigation",
            }
        }
    }

    impl AsRef<str> for PartitioningBlobURLInfo {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PartitioningBlobURLInfo {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "BlockedCrossPartitionFetching" => Ok(Self::BlockedCrossPartitionFetching),
                "EnforceNoopenerForNavigation" => Ok(Self::EnforceNoopenerForNavigation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PartitioningBlobURLInfo",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PartitioningBlobURLIssueDetails {
        pub url: String,
        pub partitioning_blob_url_info: crate::generated::audits::PartitioningBlobURLInfo,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ElementAccessibilityIssueReason {
        DisallowedSelectChild,
        DisallowedOptGroupChild,
        NonPhrasingContentOptionChild,
        InteractiveContentOptionChild,
        InteractiveContentLegendChild,
        InteractiveContentSummaryDescendant,
    }

    impl ElementAccessibilityIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::DisallowedSelectChild => "DisallowedSelectChild",
                Self::DisallowedOptGroupChild => "DisallowedOptGroupChild",
                Self::NonPhrasingContentOptionChild => "NonPhrasingContentOptionChild",
                Self::InteractiveContentOptionChild => "InteractiveContentOptionChild",
                Self::InteractiveContentLegendChild => "InteractiveContentLegendChild",
                Self::InteractiveContentSummaryDescendant => "InteractiveContentSummaryDescendant",
            }
        }
    }

    impl AsRef<str> for ElementAccessibilityIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ElementAccessibilityIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "DisallowedSelectChild" => Ok(Self::DisallowedSelectChild),
                "DisallowedOptGroupChild" => Ok(Self::DisallowedOptGroupChild),
                "NonPhrasingContentOptionChild" => Ok(Self::NonPhrasingContentOptionChild),
                "InteractiveContentOptionChild" => Ok(Self::InteractiveContentOptionChild),
                "InteractiveContentLegendChild" => Ok(Self::InteractiveContentLegendChild),
                "InteractiveContentSummaryDescendant" => Ok(Self::InteractiveContentSummaryDescendant),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ElementAccessibilityIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ElementAccessibilityIssueDetails {
        pub node_id: crate::generated::dom::BackendNodeId,
        pub element_accessibility_issue_reason: crate::generated::audits::ElementAccessibilityIssueReason,
        pub has_disallowed_attributes: bool,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StyleSheetLoadingIssueReason {
        LateImportRule,
        RequestFailed,
    }

    impl StyleSheetLoadingIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::LateImportRule => "LateImportRule",
                Self::RequestFailed => "RequestFailed",
            }
        }
    }

    impl AsRef<str> for StyleSheetLoadingIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StyleSheetLoadingIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "LateImportRule" => Ok(Self::LateImportRule),
                "RequestFailed" => Ok(Self::RequestFailed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StyleSheetLoadingIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StylesheetLoadingIssueDetails {
        pub source_code_location: Box<crate::generated::audits::SourceCodeLocation>,
        pub style_sheet_loading_issue_reason: crate::generated::audits::StyleSheetLoadingIssueReason,
        pub failed_request_info: Option<Box<crate::generated::audits::FailedRequestInfo>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PropertyRuleIssueReason {
        InvalidSyntax,
        InvalidInitialValue,
        InvalidInherits,
        InvalidName,
    }

    impl PropertyRuleIssueReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::InvalidSyntax => "InvalidSyntax",
                Self::InvalidInitialValue => "InvalidInitialValue",
                Self::InvalidInherits => "InvalidInherits",
                Self::InvalidName => "InvalidName",
            }
        }
    }

    impl AsRef<str> for PropertyRuleIssueReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PropertyRuleIssueReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "InvalidSyntax" => Ok(Self::InvalidSyntax),
                "InvalidInitialValue" => Ok(Self::InvalidInitialValue),
                "InvalidInherits" => Ok(Self::InvalidInherits),
                "InvalidName" => Ok(Self::InvalidName),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PropertyRuleIssueReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PropertyRuleIssueDetails {
        pub source_code_location: Box<crate::generated::audits::SourceCodeLocation>,
        pub property_rule_issue_reason: crate::generated::audits::PropertyRuleIssueReason,
        pub property_value: Option<String>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum UserReidentificationIssueType {
        BlockedFrameNavigation,
        BlockedSubresource,
        NoisedCanvasReadback,
    }

    impl UserReidentificationIssueType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::BlockedFrameNavigation => "BlockedFrameNavigation",
                Self::BlockedSubresource => "BlockedSubresource",
                Self::NoisedCanvasReadback => "NoisedCanvasReadback",
            }
        }
    }

    impl AsRef<str> for UserReidentificationIssueType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for UserReidentificationIssueType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "BlockedFrameNavigation" => Ok(Self::BlockedFrameNavigation),
                "BlockedSubresource" => Ok(Self::BlockedSubresource),
                "NoisedCanvasReadback" => Ok(Self::NoisedCanvasReadback),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "UserReidentificationIssueType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct UserReidentificationIssueDetails {
        pub type_: crate::generated::audits::UserReidentificationIssueType,
        pub request: Option<Box<crate::generated::audits::AffectedRequest>>,
        pub source_code_location: Option<Box<crate::generated::audits::SourceCodeLocation>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PermissionElementIssueType {
        InvalidType,
        FencedFrameDisallowed,
        CspFrameAncestorsMissing,
        PermissionsPolicyBlocked,
        PaddingRightUnsupported,
        PaddingBottomUnsupported,
        InsetBoxShadowUnsupported,
        RequestInProgress,
        UntrustedEvent,
        RegistrationFailed,
        TypeNotSupported,
        InvalidTypeActivation,
        SecurityChecksFailed,
        ActivationDisabled,
        GeolocationDeprecated,
        InvalidDisplayStyle,
        NonOpaqueColor,
        LowContrast,
        FontSizeTooSmall,
        FontSizeTooLarge,
        InvalidSizeValue,
        NonSecureContext,
        MissingTransientUserActivation,
    }

    impl PermissionElementIssueType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::InvalidType => "InvalidType",
                Self::FencedFrameDisallowed => "FencedFrameDisallowed",
                Self::CspFrameAncestorsMissing => "CspFrameAncestorsMissing",
                Self::PermissionsPolicyBlocked => "PermissionsPolicyBlocked",
                Self::PaddingRightUnsupported => "PaddingRightUnsupported",
                Self::PaddingBottomUnsupported => "PaddingBottomUnsupported",
                Self::InsetBoxShadowUnsupported => "InsetBoxShadowUnsupported",
                Self::RequestInProgress => "RequestInProgress",
                Self::UntrustedEvent => "UntrustedEvent",
                Self::RegistrationFailed => "RegistrationFailed",
                Self::TypeNotSupported => "TypeNotSupported",
                Self::InvalidTypeActivation => "InvalidTypeActivation",
                Self::SecurityChecksFailed => "SecurityChecksFailed",
                Self::ActivationDisabled => "ActivationDisabled",
                Self::GeolocationDeprecated => "GeolocationDeprecated",
                Self::InvalidDisplayStyle => "InvalidDisplayStyle",
                Self::NonOpaqueColor => "NonOpaqueColor",
                Self::LowContrast => "LowContrast",
                Self::FontSizeTooSmall => "FontSizeTooSmall",
                Self::FontSizeTooLarge => "FontSizeTooLarge",
                Self::InvalidSizeValue => "InvalidSizeValue",
                Self::NonSecureContext => "NonSecureContext",
                Self::MissingTransientUserActivation => "MissingTransientUserActivation",
            }
        }
    }

    impl AsRef<str> for PermissionElementIssueType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PermissionElementIssueType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "InvalidType" => Ok(Self::InvalidType),
                "FencedFrameDisallowed" => Ok(Self::FencedFrameDisallowed),
                "CspFrameAncestorsMissing" => Ok(Self::CspFrameAncestorsMissing),
                "PermissionsPolicyBlocked" => Ok(Self::PermissionsPolicyBlocked),
                "PaddingRightUnsupported" => Ok(Self::PaddingRightUnsupported),
                "PaddingBottomUnsupported" => Ok(Self::PaddingBottomUnsupported),
                "InsetBoxShadowUnsupported" => Ok(Self::InsetBoxShadowUnsupported),
                "RequestInProgress" => Ok(Self::RequestInProgress),
                "UntrustedEvent" => Ok(Self::UntrustedEvent),
                "RegistrationFailed" => Ok(Self::RegistrationFailed),
                "TypeNotSupported" => Ok(Self::TypeNotSupported),
                "InvalidTypeActivation" => Ok(Self::InvalidTypeActivation),
                "SecurityChecksFailed" => Ok(Self::SecurityChecksFailed),
                "ActivationDisabled" => Ok(Self::ActivationDisabled),
                "GeolocationDeprecated" => Ok(Self::GeolocationDeprecated),
                "InvalidDisplayStyle" => Ok(Self::InvalidDisplayStyle),
                "NonOpaqueColor" => Ok(Self::NonOpaqueColor),
                "LowContrast" => Ok(Self::LowContrast),
                "FontSizeTooSmall" => Ok(Self::FontSizeTooSmall),
                "FontSizeTooLarge" => Ok(Self::FontSizeTooLarge),
                "InvalidSizeValue" => Ok(Self::InvalidSizeValue),
                "NonSecureContext" => Ok(Self::NonSecureContext),
                "MissingTransientUserActivation" => Ok(Self::MissingTransientUserActivation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PermissionElementIssueType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PermissionElementIssueDetails {
        pub issue_type: crate::generated::audits::PermissionElementIssueType,
        pub type_: Option<String>,
        pub node_id: Option<crate::generated::dom::BackendNodeId>,
        pub is_warning: Option<bool>,
        pub permission_name: Option<String>,
        pub occluder_node_info: Option<String>,
        pub occluder_parent_node_info: Option<String>,
        pub disable_reason: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SelectivePermissionsInterventionIssueDetails {
        pub api_name: String,
        pub ad_ancestry: Box<crate::generated::network::AdAncestry>,
        pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LazyLoadImageIssueDetails {
        pub node_id: crate::generated::dom::BackendNodeId,
        pub url: String,
        pub frame_id: crate::generated::page::FrameId,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum InspectorIssueCode {
        CookieIssue,
        MixedContentIssue,
        BlockedByResponseIssue,
        HeavyAdIssue,
        ContentSecurityPolicyIssue,
        SharedArrayBufferIssue,
        CorsIssue,
        QuirksModeIssue,
        PartitioningBlobURLIssue,
        NavigatorUserAgentIssue,
        GenericIssue,
        DeprecationIssue,
        ClientHintIssue,
        FederatedAuthRequestIssue,
        BounceTrackingIssue,
        CookieDeprecationMetadataIssue,
        StylesheetLoadingIssue,
        FederatedAuthUserInfoRequestIssue,
        PropertyRuleIssue,
        SharedDictionaryIssue,
        ElementAccessibilityIssue,
        SRIMessageSignatureIssue,
        UnencodedDigestIssue,
        ConnectionAllowlistIssue,
        UserReidentificationIssue,
        PermissionElementIssue,
        PerformanceIssue,
        SelectivePermissionsInterventionIssue,
        EmailVerificationRequestIssue,
        LazyLoadImageIssue,
    }

    impl InspectorIssueCode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::CookieIssue => "CookieIssue",
                Self::MixedContentIssue => "MixedContentIssue",
                Self::BlockedByResponseIssue => "BlockedByResponseIssue",
                Self::HeavyAdIssue => "HeavyAdIssue",
                Self::ContentSecurityPolicyIssue => "ContentSecurityPolicyIssue",
                Self::SharedArrayBufferIssue => "SharedArrayBufferIssue",
                Self::CorsIssue => "CorsIssue",
                Self::QuirksModeIssue => "QuirksModeIssue",
                Self::PartitioningBlobURLIssue => "PartitioningBlobURLIssue",
                Self::NavigatorUserAgentIssue => "NavigatorUserAgentIssue",
                Self::GenericIssue => "GenericIssue",
                Self::DeprecationIssue => "DeprecationIssue",
                Self::ClientHintIssue => "ClientHintIssue",
                Self::FederatedAuthRequestIssue => "FederatedAuthRequestIssue",
                Self::BounceTrackingIssue => "BounceTrackingIssue",
                Self::CookieDeprecationMetadataIssue => "CookieDeprecationMetadataIssue",
                Self::StylesheetLoadingIssue => "StylesheetLoadingIssue",
                Self::FederatedAuthUserInfoRequestIssue => "FederatedAuthUserInfoRequestIssue",
                Self::PropertyRuleIssue => "PropertyRuleIssue",
                Self::SharedDictionaryIssue => "SharedDictionaryIssue",
                Self::ElementAccessibilityIssue => "ElementAccessibilityIssue",
                Self::SRIMessageSignatureIssue => "SRIMessageSignatureIssue",
                Self::UnencodedDigestIssue => "UnencodedDigestIssue",
                Self::ConnectionAllowlistIssue => "ConnectionAllowlistIssue",
                Self::UserReidentificationIssue => "UserReidentificationIssue",
                Self::PermissionElementIssue => "PermissionElementIssue",
                Self::PerformanceIssue => "PerformanceIssue",
                Self::SelectivePermissionsInterventionIssue => "SelectivePermissionsInterventionIssue",
                Self::EmailVerificationRequestIssue => "EmailVerificationRequestIssue",
                Self::LazyLoadImageIssue => "LazyLoadImageIssue",
            }
        }
    }

    impl AsRef<str> for InspectorIssueCode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for InspectorIssueCode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "CookieIssue" => Ok(Self::CookieIssue),
                "MixedContentIssue" => Ok(Self::MixedContentIssue),
                "BlockedByResponseIssue" => Ok(Self::BlockedByResponseIssue),
                "HeavyAdIssue" => Ok(Self::HeavyAdIssue),
                "ContentSecurityPolicyIssue" => Ok(Self::ContentSecurityPolicyIssue),
                "SharedArrayBufferIssue" => Ok(Self::SharedArrayBufferIssue),
                "CorsIssue" => Ok(Self::CorsIssue),
                "QuirksModeIssue" => Ok(Self::QuirksModeIssue),
                "PartitioningBlobURLIssue" => Ok(Self::PartitioningBlobURLIssue),
                "NavigatorUserAgentIssue" => Ok(Self::NavigatorUserAgentIssue),
                "GenericIssue" => Ok(Self::GenericIssue),
                "DeprecationIssue" => Ok(Self::DeprecationIssue),
                "ClientHintIssue" => Ok(Self::ClientHintIssue),
                "FederatedAuthRequestIssue" => Ok(Self::FederatedAuthRequestIssue),
                "BounceTrackingIssue" => Ok(Self::BounceTrackingIssue),
                "CookieDeprecationMetadataIssue" => Ok(Self::CookieDeprecationMetadataIssue),
                "StylesheetLoadingIssue" => Ok(Self::StylesheetLoadingIssue),
                "FederatedAuthUserInfoRequestIssue" => Ok(Self::FederatedAuthUserInfoRequestIssue),
                "PropertyRuleIssue" => Ok(Self::PropertyRuleIssue),
                "SharedDictionaryIssue" => Ok(Self::SharedDictionaryIssue),
                "ElementAccessibilityIssue" => Ok(Self::ElementAccessibilityIssue),
                "SRIMessageSignatureIssue" => Ok(Self::SRIMessageSignatureIssue),
                "UnencodedDigestIssue" => Ok(Self::UnencodedDigestIssue),
                "ConnectionAllowlistIssue" => Ok(Self::ConnectionAllowlistIssue),
                "UserReidentificationIssue" => Ok(Self::UserReidentificationIssue),
                "PermissionElementIssue" => Ok(Self::PermissionElementIssue),
                "PerformanceIssue" => Ok(Self::PerformanceIssue),
                "SelectivePermissionsInterventionIssue" => Ok(Self::SelectivePermissionsInterventionIssue),
                "EmailVerificationRequestIssue" => Ok(Self::EmailVerificationRequestIssue),
                "LazyLoadImageIssue" => Ok(Self::LazyLoadImageIssue),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "InspectorIssueCode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InspectorIssueDetails {
        pub cookie_issue_details: Option<Box<crate::generated::audits::CookieIssueDetails>>,
        pub mixed_content_issue_details: Option<Box<crate::generated::audits::MixedContentIssueDetails>>,
        pub blocked_by_response_issue_details: Option<Box<crate::generated::audits::BlockedByResponseIssueDetails>>,
        pub heavy_ad_issue_details: Option<Box<crate::generated::audits::HeavyAdIssueDetails>>,
        pub content_security_policy_issue_details: Option<Box<crate::generated::audits::ContentSecurityPolicyIssueDetails>>,
        pub shared_array_buffer_issue_details: Option<Box<crate::generated::audits::SharedArrayBufferIssueDetails>>,
        pub cors_issue_details: Option<Box<crate::generated::audits::CorsIssueDetails>>,
        pub quirks_mode_issue_details: Option<Box<crate::generated::audits::QuirksModeIssueDetails>>,
        pub partitioning_blob_url_issue_details: Option<Box<crate::generated::audits::PartitioningBlobURLIssueDetails>>,
        pub navigator_user_agent_issue_details: Option<Box<crate::generated::audits::NavigatorUserAgentIssueDetails>>,
        pub generic_issue_details: Option<Box<crate::generated::audits::GenericIssueDetails>>,
        pub deprecation_issue_details: Option<Box<crate::generated::audits::DeprecationIssueDetails>>,
        pub client_hint_issue_details: Option<Box<crate::generated::audits::ClientHintIssueDetails>>,
        pub federated_auth_request_issue_details: Option<Box<crate::generated::audits::FederatedAuthRequestIssueDetails>>,
        pub bounce_tracking_issue_details: Option<Box<crate::generated::audits::BounceTrackingIssueDetails>>,
        pub cookie_deprecation_metadata_issue_details: Option<Box<crate::generated::audits::CookieDeprecationMetadataIssueDetails>>,
        pub stylesheet_loading_issue_details: Option<Box<crate::generated::audits::StylesheetLoadingIssueDetails>>,
        pub property_rule_issue_details: Option<Box<crate::generated::audits::PropertyRuleIssueDetails>>,
        pub federated_auth_user_info_request_issue_details: Option<Box<crate::generated::audits::FederatedAuthUserInfoRequestIssueDetails>>,
        pub shared_dictionary_issue_details: Option<Box<crate::generated::audits::SharedDictionaryIssueDetails>>,
        pub element_accessibility_issue_details: Option<Box<crate::generated::audits::ElementAccessibilityIssueDetails>>,
        pub sri_message_signature_issue_details: Option<Box<crate::generated::audits::SRIMessageSignatureIssueDetails>>,
        pub unencoded_digest_issue_details: Option<Box<crate::generated::audits::UnencodedDigestIssueDetails>>,
        pub connection_allowlist_issue_details: Option<Box<crate::generated::audits::ConnectionAllowlistIssueDetails>>,
        pub user_reidentification_issue_details: Option<Box<crate::generated::audits::UserReidentificationIssueDetails>>,
        pub permission_element_issue_details: Option<Box<crate::generated::audits::PermissionElementIssueDetails>>,
        pub performance_issue_details: Option<Box<crate::generated::audits::PerformanceIssueDetails>>,
        pub selective_permissions_intervention_issue_details: Option<Box<crate::generated::audits::SelectivePermissionsInterventionIssueDetails>>,
        pub email_verification_request_issue_details: Option<Box<crate::generated::audits::EmailVerificationRequestIssueDetails>>,
        pub lazy_load_image_issue_details: Option<Box<crate::generated::audits::LazyLoadImageIssueDetails>>,
    }
    pub type IssueId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct InspectorIssue {
        pub code: crate::generated::audits::InspectorIssueCode,
        pub details: Box<crate::generated::audits::InspectorIssueDetails>,
        pub issue_id: Option<crate::generated::audits::IssueId>,
    }

    pub mod commands {
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum GetEncodedResponseEncodingParamEnum {
            Webp,
            Jpeg,
            Png,
        }

        impl GetEncodedResponseEncodingParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Webp => "webp",
                    Self::Jpeg => "jpeg",
                    Self::Png => "png",
                }
            }
        }

        impl AsRef<str> for GetEncodedResponseEncodingParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for GetEncodedResponseEncodingParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "webp" => Ok(Self::Webp),
                    "jpeg" => Ok(Self::Jpeg),
                    "png" => Ok(Self::Png),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "GetEncodedResponseEncodingParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEncodedResponseParams {
            pub request_id: crate::generated::network::RequestId,
            pub encoding: crate::generated::audits::commands::GetEncodedResponseEncodingParamEnum,
            pub quality: Option<f64>,
            pub size_only: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEncodedResponseResult {
            pub body: Option<String>,
            pub original_size: i64,
            pub encoded_size: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CheckFormsIssuesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CheckFormsIssuesResult {
            pub form_issues: Vec<Box<crate::generated::audits::GenericIssueDetails>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct IssueAddedEvent {
            pub issue: Box<crate::generated::audits::InspectorIssue>,
        }
    }
}

pub mod autofill {
    #[derive(Clone, Debug, PartialEq)]
    pub struct CreditCard {
        pub number: String,
        pub name: String,
        pub expiry_month: String,
        pub expiry_year: String,
        pub cvc: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AddressField {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AddressFields {
        pub fields: Vec<Box<crate::generated::autofill::AddressField>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Address {
        pub fields: Vec<Box<crate::generated::autofill::AddressField>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AddressUI {
        pub address_fields: Vec<Box<crate::generated::autofill::AddressFields>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum FillingStrategy {
        AutocompleteAttribute,
        AutofillInferred,
    }

    impl FillingStrategy {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AutocompleteAttribute => "autocompleteAttribute",
                Self::AutofillInferred => "autofillInferred",
            }
        }
    }

    impl AsRef<str> for FillingStrategy {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for FillingStrategy {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "autocompleteAttribute" => Ok(Self::AutocompleteAttribute),
                "autofillInferred" => Ok(Self::AutofillInferred),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "FillingStrategy",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FilledField {
        pub html_type: String,
        pub id: String,
        pub name: String,
        pub value: String,
        pub autofill_type: String,
        pub filling_strategy: crate::generated::autofill::FillingStrategy,
        pub frame_id: crate::generated::page::FrameId,
        pub field_id: crate::generated::dom::BackendNodeId,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct TriggerParams {
            pub field_id: crate::generated::dom::BackendNodeId,
            pub frame_id: Option<crate::generated::page::FrameId>,
            pub card: Option<Box<crate::generated::autofill::CreditCard>>,
            pub address: Option<Box<crate::generated::autofill::Address>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TriggerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAddressesParams {
            pub addresses: Vec<Box<crate::generated::autofill::Address>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAddressesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddressFormFilledEvent {
            pub filled_fields: Vec<Box<crate::generated::autofill::FilledField>>,
            pub address_ui: Box<crate::generated::autofill::AddressUI>,
        }
    }
}

pub mod background_service {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ServiceName {
        BackgroundFetch,
        BackgroundSync,
        PushMessaging,
        Notifications,
        PaymentHandler,
        PeriodicBackgroundSync,
    }

    impl ServiceName {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::BackgroundFetch => "backgroundFetch",
                Self::BackgroundSync => "backgroundSync",
                Self::PushMessaging => "pushMessaging",
                Self::Notifications => "notifications",
                Self::PaymentHandler => "paymentHandler",
                Self::PeriodicBackgroundSync => "periodicBackgroundSync",
            }
        }
    }

    impl AsRef<str> for ServiceName {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ServiceName {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "backgroundFetch" => Ok(Self::BackgroundFetch),
                "backgroundSync" => Ok(Self::BackgroundSync),
                "pushMessaging" => Ok(Self::PushMessaging),
                "notifications" => Ok(Self::Notifications),
                "paymentHandler" => Ok(Self::PaymentHandler),
                "periodicBackgroundSync" => Ok(Self::PeriodicBackgroundSync),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ServiceName",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct EventMetadata {
        pub key: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BackgroundServiceEvent {
        pub timestamp: crate::generated::network::TimeSinceEpoch,
        pub origin: String,
        pub service_worker_registration_id: crate::generated::service_worker::RegistrationID,
        pub service: crate::generated::background_service::ServiceName,
        pub event_name: String,
        pub instance_id: String,
        pub event_metadata: Vec<Box<crate::generated::background_service::EventMetadata>>,
        pub storage_key: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartObservingParams {
            pub service: crate::generated::background_service::ServiceName,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartObservingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopObservingParams {
            pub service: crate::generated::background_service::ServiceName,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopObservingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRecordingParams {
            pub should_record: bool,
            pub service: crate::generated::background_service::ServiceName,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRecordingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearEventsParams {
            pub service: crate::generated::background_service::ServiceName,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearEventsResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct RecordingStateChangedEvent {
            pub is_recording: bool,
            pub service: crate::generated::background_service::ServiceName,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BackgroundServiceEventReceivedEvent {
            pub background_service_event: Box<crate::generated::background_service::BackgroundServiceEvent>,
        }
    }
}

pub mod bluetooth_emulation {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CentralState {
        Absent,
        PoweredOff,
        PoweredOn,
    }

    impl CentralState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Absent => "absent",
                Self::PoweredOff => "powered-off",
                Self::PoweredOn => "powered-on",
            }
        }
    }

    impl AsRef<str> for CentralState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CentralState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "absent" => Ok(Self::Absent),
                "powered-off" => Ok(Self::PoweredOff),
                "powered-on" => Ok(Self::PoweredOn),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CentralState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum GATTOperationType {
        Connection,
        Discovery,
    }

    impl GATTOperationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Connection => "connection",
                Self::Discovery => "discovery",
            }
        }
    }

    impl AsRef<str> for GATTOperationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for GATTOperationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "connection" => Ok(Self::Connection),
                "discovery" => Ok(Self::Discovery),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "GATTOperationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CharacteristicWriteType {
        WriteDefaultDeprecated,
        WriteWithResponse,
        WriteWithoutResponse,
    }

    impl CharacteristicWriteType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::WriteDefaultDeprecated => "write-default-deprecated",
                Self::WriteWithResponse => "write-with-response",
                Self::WriteWithoutResponse => "write-without-response",
            }
        }
    }

    impl AsRef<str> for CharacteristicWriteType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CharacteristicWriteType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "write-default-deprecated" => Ok(Self::WriteDefaultDeprecated),
                "write-with-response" => Ok(Self::WriteWithResponse),
                "write-without-response" => Ok(Self::WriteWithoutResponse),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CharacteristicWriteType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CharacteristicOperationType {
        Read,
        Write,
        SubscribeToNotifications,
        UnsubscribeFromNotifications,
    }

    impl CharacteristicOperationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Read => "read",
                Self::Write => "write",
                Self::SubscribeToNotifications => "subscribe-to-notifications",
                Self::UnsubscribeFromNotifications => "unsubscribe-from-notifications",
            }
        }
    }

    impl AsRef<str> for CharacteristicOperationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CharacteristicOperationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "read" => Ok(Self::Read),
                "write" => Ok(Self::Write),
                "subscribe-to-notifications" => Ok(Self::SubscribeToNotifications),
                "unsubscribe-from-notifications" => Ok(Self::UnsubscribeFromNotifications),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CharacteristicOperationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DescriptorOperationType {
        Read,
        Write,
    }

    impl DescriptorOperationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Read => "read",
                Self::Write => "write",
            }
        }
    }

    impl AsRef<str> for DescriptorOperationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DescriptorOperationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "read" => Ok(Self::Read),
                "write" => Ok(Self::Write),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DescriptorOperationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ManufacturerData {
        pub key: i64,
        pub data: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScanRecord {
        pub name: Option<String>,
        pub uuids: Option<Vec<String>>,
        pub appearance: Option<i64>,
        pub tx_power: Option<i64>,
        pub manufacturer_data: Option<Vec<Box<crate::generated::bluetooth_emulation::ManufacturerData>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScanEntry {
        pub device_address: String,
        pub rssi: i64,
        pub scan_record: Box<crate::generated::bluetooth_emulation::ScanRecord>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CharacteristicProperties {
        pub broadcast: Option<bool>,
        pub read: Option<bool>,
        pub write_without_response: Option<bool>,
        pub write: Option<bool>,
        pub notify: Option<bool>,
        pub indicate: Option<bool>,
        pub authenticated_signed_writes: Option<bool>,
        pub extended_properties: Option<bool>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub state: crate::generated::bluetooth_emulation::CentralState,
            pub le_supported: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSimulatedCentralStateParams {
            pub state: crate::generated::bluetooth_emulation::CentralState,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSimulatedCentralStateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulatePreconnectedPeripheralParams {
            pub address: String,
            pub name: String,
            pub manufacturer_data: Vec<Box<crate::generated::bluetooth_emulation::ManufacturerData>>,
            pub known_service_uuids: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulatePreconnectedPeripheralResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateAdvertisementParams {
            pub entry: Box<crate::generated::bluetooth_emulation::ScanEntry>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateAdvertisementResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateGATTOperationResponseParams {
            pub address: String,
            pub type_: crate::generated::bluetooth_emulation::GATTOperationType,
            pub code: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateGATTOperationResponseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateCharacteristicOperationResponseParams {
            pub characteristic_id: String,
            pub type_: crate::generated::bluetooth_emulation::CharacteristicOperationType,
            pub code: i64,
            pub data: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateCharacteristicOperationResponseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateDescriptorOperationResponseParams {
            pub descriptor_id: String,
            pub type_: crate::generated::bluetooth_emulation::DescriptorOperationType,
            pub code: i64,
            pub data: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateDescriptorOperationResponseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddServiceParams {
            pub address: String,
            pub service_uuid: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddServiceResult {
            pub service_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveServiceParams {
            pub service_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveServiceResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCharacteristicParams {
            pub service_id: String,
            pub characteristic_uuid: String,
            pub properties: Box<crate::generated::bluetooth_emulation::CharacteristicProperties>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCharacteristicResult {
            pub characteristic_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveCharacteristicParams {
            pub characteristic_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveCharacteristicResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddDescriptorParams {
            pub characteristic_id: String,
            pub descriptor_uuid: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddDescriptorResult {
            pub descriptor_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDescriptorParams {
            pub descriptor_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDescriptorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateGATTDisconnectionParams {
            pub address: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulateGATTDisconnectionResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GattOperationReceivedEvent {
            pub address: String,
            pub type_: crate::generated::bluetooth_emulation::GATTOperationType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CharacteristicOperationReceivedEvent {
            pub characteristic_id: String,
            pub type_: crate::generated::bluetooth_emulation::CharacteristicOperationType,
            pub data: Option<String>,
            pub write_type: Option<crate::generated::bluetooth_emulation::CharacteristicWriteType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DescriptorOperationReceivedEvent {
            pub descriptor_id: String,
            pub type_: crate::generated::bluetooth_emulation::DescriptorOperationType,
            pub data: Option<String>,
        }
    }
}

pub mod browser {
    pub type BrowserContextID = String;
    pub type WindowID = i64;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum WindowState {
        Normal,
        Minimized,
        Maximized,
        Fullscreen,
    }

    impl WindowState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Normal => "normal",
                Self::Minimized => "minimized",
                Self::Maximized => "maximized",
                Self::Fullscreen => "fullscreen",
            }
        }
    }

    impl AsRef<str> for WindowState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for WindowState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "normal" => Ok(Self::Normal),
                "minimized" => Ok(Self::Minimized),
                "maximized" => Ok(Self::Maximized),
                "fullscreen" => Ok(Self::Fullscreen),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "WindowState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Bounds {
        pub left: Option<i64>,
        pub top: Option<i64>,
        pub width: Option<i64>,
        pub height: Option<i64>,
        pub window_state: Option<crate::generated::browser::WindowState>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PermissionType {
        Ar,
        AudioCapture,
        AutomaticFullscreen,
        BackgroundFetch,
        BackgroundSync,
        CameraPanTiltZoom,
        CapturedSurfaceControl,
        ClipboardReadWrite,
        ClipboardSanitizedWrite,
        DisplayCapture,
        DurableStorage,
        Geolocation,
        HandTracking,
        IdleDetection,
        KeyboardLock,
        LocalFonts,
        LocalNetwork,
        LocalNetworkAccess,
        LoopbackNetwork,
        Midi,
        MidiSysex,
        Nfc,
        Notifications,
        PaymentHandler,
        PeriodicBackgroundSync,
        PointerLock,
        ProtectedMediaIdentifier,
        Sensors,
        SmartCard,
        SpeakerSelection,
        StorageAccess,
        TopLevelStorageAccess,
        VideoCapture,
        Vr,
        WakeLockScreen,
        WakeLockSystem,
        WebAppInstallation,
        WebPrinting,
        WindowManagement,
    }

    impl PermissionType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Ar => "ar",
                Self::AudioCapture => "audioCapture",
                Self::AutomaticFullscreen => "automaticFullscreen",
                Self::BackgroundFetch => "backgroundFetch",
                Self::BackgroundSync => "backgroundSync",
                Self::CameraPanTiltZoom => "cameraPanTiltZoom",
                Self::CapturedSurfaceControl => "capturedSurfaceControl",
                Self::ClipboardReadWrite => "clipboardReadWrite",
                Self::ClipboardSanitizedWrite => "clipboardSanitizedWrite",
                Self::DisplayCapture => "displayCapture",
                Self::DurableStorage => "durableStorage",
                Self::Geolocation => "geolocation",
                Self::HandTracking => "handTracking",
                Self::IdleDetection => "idleDetection",
                Self::KeyboardLock => "keyboardLock",
                Self::LocalFonts => "localFonts",
                Self::LocalNetwork => "localNetwork",
                Self::LocalNetworkAccess => "localNetworkAccess",
                Self::LoopbackNetwork => "loopbackNetwork",
                Self::Midi => "midi",
                Self::MidiSysex => "midiSysex",
                Self::Nfc => "nfc",
                Self::Notifications => "notifications",
                Self::PaymentHandler => "paymentHandler",
                Self::PeriodicBackgroundSync => "periodicBackgroundSync",
                Self::PointerLock => "pointerLock",
                Self::ProtectedMediaIdentifier => "protectedMediaIdentifier",
                Self::Sensors => "sensors",
                Self::SmartCard => "smartCard",
                Self::SpeakerSelection => "speakerSelection",
                Self::StorageAccess => "storageAccess",
                Self::TopLevelStorageAccess => "topLevelStorageAccess",
                Self::VideoCapture => "videoCapture",
                Self::Vr => "vr",
                Self::WakeLockScreen => "wakeLockScreen",
                Self::WakeLockSystem => "wakeLockSystem",
                Self::WebAppInstallation => "webAppInstallation",
                Self::WebPrinting => "webPrinting",
                Self::WindowManagement => "windowManagement",
            }
        }
    }

    impl AsRef<str> for PermissionType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PermissionType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ar" => Ok(Self::Ar),
                "audioCapture" => Ok(Self::AudioCapture),
                "automaticFullscreen" => Ok(Self::AutomaticFullscreen),
                "backgroundFetch" => Ok(Self::BackgroundFetch),
                "backgroundSync" => Ok(Self::BackgroundSync),
                "cameraPanTiltZoom" => Ok(Self::CameraPanTiltZoom),
                "capturedSurfaceControl" => Ok(Self::CapturedSurfaceControl),
                "clipboardReadWrite" => Ok(Self::ClipboardReadWrite),
                "clipboardSanitizedWrite" => Ok(Self::ClipboardSanitizedWrite),
                "displayCapture" => Ok(Self::DisplayCapture),
                "durableStorage" => Ok(Self::DurableStorage),
                "geolocation" => Ok(Self::Geolocation),
                "handTracking" => Ok(Self::HandTracking),
                "idleDetection" => Ok(Self::IdleDetection),
                "keyboardLock" => Ok(Self::KeyboardLock),
                "localFonts" => Ok(Self::LocalFonts),
                "localNetwork" => Ok(Self::LocalNetwork),
                "localNetworkAccess" => Ok(Self::LocalNetworkAccess),
                "loopbackNetwork" => Ok(Self::LoopbackNetwork),
                "midi" => Ok(Self::Midi),
                "midiSysex" => Ok(Self::MidiSysex),
                "nfc" => Ok(Self::Nfc),
                "notifications" => Ok(Self::Notifications),
                "paymentHandler" => Ok(Self::PaymentHandler),
                "periodicBackgroundSync" => Ok(Self::PeriodicBackgroundSync),
                "pointerLock" => Ok(Self::PointerLock),
                "protectedMediaIdentifier" => Ok(Self::ProtectedMediaIdentifier),
                "sensors" => Ok(Self::Sensors),
                "smartCard" => Ok(Self::SmartCard),
                "speakerSelection" => Ok(Self::SpeakerSelection),
                "storageAccess" => Ok(Self::StorageAccess),
                "topLevelStorageAccess" => Ok(Self::TopLevelStorageAccess),
                "videoCapture" => Ok(Self::VideoCapture),
                "vr" => Ok(Self::Vr),
                "wakeLockScreen" => Ok(Self::WakeLockScreen),
                "wakeLockSystem" => Ok(Self::WakeLockSystem),
                "webAppInstallation" => Ok(Self::WebAppInstallation),
                "webPrinting" => Ok(Self::WebPrinting),
                "windowManagement" => Ok(Self::WindowManagement),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PermissionType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PermissionSetting {
        Granted,
        Denied,
        Prompt,
    }

    impl PermissionSetting {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Granted => "granted",
                Self::Denied => "denied",
                Self::Prompt => "prompt",
            }
        }
    }

    impl AsRef<str> for PermissionSetting {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PermissionSetting {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "granted" => Ok(Self::Granted),
                "denied" => Ok(Self::Denied),
                "prompt" => Ok(Self::Prompt),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PermissionSetting",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PermissionDescriptor {
        pub name: String,
        pub sysex: Option<bool>,
        pub user_visible_only: Option<bool>,
        pub allow_without_sanitization: Option<bool>,
        pub allow_without_gesture: Option<bool>,
        pub pan_tilt_zoom: Option<bool>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BrowserCommandId {
        OpenTabSearch,
        CloseTabSearch,
        OpenGlic,
    }

    impl BrowserCommandId {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::OpenTabSearch => "openTabSearch",
                Self::CloseTabSearch => "closeTabSearch",
                Self::OpenGlic => "openGlic",
            }
        }
    }

    impl AsRef<str> for BrowserCommandId {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BrowserCommandId {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "openTabSearch" => Ok(Self::OpenTabSearch),
                "closeTabSearch" => Ok(Self::CloseTabSearch),
                "openGlic" => Ok(Self::OpenGlic),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BrowserCommandId",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Bucket {
        pub low: i64,
        pub high: i64,
        pub count: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Histogram {
        pub name: String,
        pub sum: i64,
        pub count: i64,
        pub buckets: Vec<Box<crate::generated::browser::Bucket>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPermissionParams {
            pub permission: Box<crate::generated::browser::PermissionDescriptor>,
            pub setting: crate::generated::browser::PermissionSetting,
            pub origin: Option<String>,
            pub embedded_origin: Option<String>,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPermissionResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GrantPermissionsParams {
            pub permissions: Vec<crate::generated::browser::PermissionType>,
            pub origin: Option<String>,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GrantPermissionsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetPermissionsParams {
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetPermissionsResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetDownloadBehaviorBehaviorParamEnum {
            Deny,
            Allow,
            AllowAndName,
            Default,
        }

        impl SetDownloadBehaviorBehaviorParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Deny => "deny",
                    Self::Allow => "allow",
                    Self::AllowAndName => "allowAndName",
                    Self::Default => "default",
                }
            }
        }

        impl AsRef<str> for SetDownloadBehaviorBehaviorParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetDownloadBehaviorBehaviorParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "deny" => Ok(Self::Deny),
                    "allow" => Ok(Self::Allow),
                    "allowAndName" => Ok(Self::AllowAndName),
                    "default" => Ok(Self::Default),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetDownloadBehaviorBehaviorParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDownloadBehaviorParams {
            pub behavior: crate::generated::browser::commands::SetDownloadBehaviorBehaviorParamEnum,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
            pub download_path: Option<String>,
            pub events_enabled: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDownloadBehaviorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelDownloadParams {
            pub guid: String,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelDownloadResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashGpuProcessParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashGpuProcessResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetVersionParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetVersionResult {
            pub protocol_version: String,
            pub product: String,
            pub revision: String,
            pub user_agent: String,
            pub js_version: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserCommandLineParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserCommandLineResult {
            pub arguments: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHistogramsParams {
            pub query: Option<String>,
            pub delta: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHistogramsResult {
            pub histograms: Vec<Box<crate::generated::browser::Histogram>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHistogramParams {
            pub name: String,
            pub delta: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHistogramResult {
            pub histogram: Box<crate::generated::browser::Histogram>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWindowBoundsParams {
            pub window_id: crate::generated::browser::WindowID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWindowBoundsResult {
            pub bounds: Box<crate::generated::browser::Bounds>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWindowForTargetParams {
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWindowForTargetResult {
            pub window_id: crate::generated::browser::WindowID,
            pub bounds: Box<crate::generated::browser::Bounds>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetWindowBoundsParams {
            pub window_id: crate::generated::browser::WindowID,
            pub bounds: Box<crate::generated::browser::Bounds>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetWindowBoundsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContentsSizeParams {
            pub window_id: crate::generated::browser::WindowID,
            pub width: Option<i64>,
            pub height: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContentsSizeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDockTileParams {
            pub badge_label: Option<String>,
            pub image: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDockTileResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExecuteBrowserCommandParams {
            pub command_id: crate::generated::browser::BrowserCommandId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExecuteBrowserCommandResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddPrivacySandboxEnrollmentOverrideParams {
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddPrivacySandboxEnrollmentOverrideResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DownloadWillBeginEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub guid: String,
            pub url: String,
            pub suggested_filename: String,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DownloadProgressStateEventEnum {
            InProgress,
            Completed,
            Canceled,
        }

        impl DownloadProgressStateEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::InProgress => "inProgress",
                    Self::Completed => "completed",
                    Self::Canceled => "canceled",
                }
            }
        }

        impl AsRef<str> for DownloadProgressStateEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DownloadProgressStateEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "inProgress" => Ok(Self::InProgress),
                    "completed" => Ok(Self::Completed),
                    "canceled" => Ok(Self::Canceled),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DownloadProgressStateEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DownloadProgressEvent {
            pub guid: String,
            pub total_bytes: f64,
            pub received_bytes: f64,
            pub state: crate::generated::browser::events::DownloadProgressStateEventEnum,
            pub file_path: Option<String>,
        }
    }
}

pub mod css {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CSSMediaSourcePropertyEnum {
        MediaRule,
        ImportRule,
        LinkedSheet,
        InlineSheet,
    }

    impl CSSMediaSourcePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MediaRule => "mediaRule",
                Self::ImportRule => "importRule",
                Self::LinkedSheet => "linkedSheet",
                Self::InlineSheet => "inlineSheet",
            }
        }
    }

    impl AsRef<str> for CSSMediaSourcePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CSSMediaSourcePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "mediaRule" => Ok(Self::MediaRule),
                "importRule" => Ok(Self::ImportRule),
                "linkedSheet" => Ok(Self::LinkedSheet),
                "inlineSheet" => Ok(Self::InlineSheet),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CSSMediaSourcePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CSSAtRuleTypePropertyEnum {
        FontFace,
        FontFeatureValues,
        FontPaletteValues,
        CounterStyle,
    }

    impl CSSAtRuleTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::FontFace => "font-face",
                Self::FontFeatureValues => "font-feature-values",
                Self::FontPaletteValues => "font-palette-values",
                Self::CounterStyle => "counter-style",
            }
        }
    }

    impl AsRef<str> for CSSAtRuleTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CSSAtRuleTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "font-face" => Ok(Self::FontFace),
                "font-feature-values" => Ok(Self::FontFeatureValues),
                "font-palette-values" => Ok(Self::FontPaletteValues),
                "counter-style" => Ok(Self::CounterStyle),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CSSAtRuleTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CSSAtRuleSubsectionPropertyEnum {
        Swash,
        Annotation,
        Ornaments,
        Stylistic,
        Styleset,
        CharacterVariant,
    }

    impl CSSAtRuleSubsectionPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Swash => "swash",
                Self::Annotation => "annotation",
                Self::Ornaments => "ornaments",
                Self::Stylistic => "stylistic",
                Self::Styleset => "styleset",
                Self::CharacterVariant => "character-variant",
            }
        }
    }

    impl AsRef<str> for CSSAtRuleSubsectionPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CSSAtRuleSubsectionPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "swash" => Ok(Self::Swash),
                "annotation" => Ok(Self::Annotation),
                "ornaments" => Ok(Self::Ornaments),
                "stylistic" => Ok(Self::Stylistic),
                "styleset" => Ok(Self::Styleset),
                "character-variant" => Ok(Self::CharacterVariant),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CSSAtRuleSubsectionPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StyleSheetOrigin {
        Injected,
        UserAgent,
        Inspector,
        Regular,
    }

    impl StyleSheetOrigin {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Injected => "injected",
                Self::UserAgent => "user-agent",
                Self::Inspector => "inspector",
                Self::Regular => "regular",
            }
        }
    }

    impl AsRef<str> for StyleSheetOrigin {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StyleSheetOrigin {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "injected" => Ok(Self::Injected),
                "user-agent" => Ok(Self::UserAgent),
                "inspector" => Ok(Self::Inspector),
                "regular" => Ok(Self::Regular),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StyleSheetOrigin",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PseudoElementMatches {
        pub pseudo_type: crate::generated::dom::PseudoType,
        pub pseudo_identifier: Option<String>,
        pub matches: Vec<Box<crate::generated::css::RuleMatch>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSAnimationStyle {
        pub name: Option<String>,
        pub style: Box<crate::generated::css::CSSStyle>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InheritedStyleEntry {
        pub inline_style: Option<Box<crate::generated::css::CSSStyle>>,
        pub matched_css_rules: Vec<Box<crate::generated::css::RuleMatch>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InheritedAnimatedStyleEntry {
        pub animation_styles: Option<Vec<Box<crate::generated::css::CSSAnimationStyle>>>,
        pub transitions_style: Option<Box<crate::generated::css::CSSStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InheritedPseudoElementMatches {
        pub pseudo_elements: Vec<Box<crate::generated::css::PseudoElementMatches>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RuleMatch {
        pub rule: Box<crate::generated::css::CSSRule>,
        pub matching_selectors: Vec<i64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Value {
        pub text: String,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub specificity: Option<Box<crate::generated::css::Specificity>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SpecificityComponent {
        pub text: String,
        pub a: i64,
        pub b: i64,
        pub c: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Specificity {
        pub a: i64,
        pub b: i64,
        pub c: i64,
        pub components: Option<Vec<Box<crate::generated::css::SpecificityComponent>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SelectorList {
        pub selectors: Vec<Box<crate::generated::css::Value>>,
        pub text: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSStyleSheetHeader {
        pub style_sheet_id: crate::generated::dom::StyleSheetId,
        pub frame_id: crate::generated::page::FrameId,
        pub source_url: String,
        pub source_map_url: Option<String>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub title: String,
        pub owner_node: Option<crate::generated::dom::BackendNodeId>,
        pub disabled: bool,
        pub has_source_url: Option<bool>,
        pub is_inline: bool,
        pub is_mutable: bool,
        pub is_constructed: bool,
        pub start_line: f64,
        pub start_column: f64,
        pub length: f64,
        pub end_line: f64,
        pub end_column: f64,
        pub loading_failed: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSRule {
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub selector_list: Box<crate::generated::css::SelectorList>,
        pub nesting_selectors: Option<Vec<String>>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub style: Box<crate::generated::css::CSSStyle>,
        pub origin_tree_scope_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub media: Option<Vec<Box<crate::generated::css::CSSMedia>>>,
        pub container_queries: Option<Vec<Box<crate::generated::css::CSSContainerQuery>>>,
        pub supports: Option<Vec<Box<crate::generated::css::CSSSupports>>>,
        pub layers: Option<Vec<Box<crate::generated::css::CSSLayer>>>,
        pub scopes: Option<Vec<Box<crate::generated::css::CSSScope>>>,
        pub rule_types: Option<Vec<crate::generated::css::CSSRuleType>>,
        pub starting_styles: Option<Vec<Box<crate::generated::css::CSSStartingStyle>>>,
        pub navigations: Option<Vec<Box<crate::generated::css::CSSNavigation>>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CSSRuleType {
        MediaRule,
        SupportsRule,
        ContainerRule,
        LayerRule,
        ScopeRule,
        StyleRule,
        StartingStyleRule,
        NavigationRule,
    }

    impl CSSRuleType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::MediaRule => "MediaRule",
                Self::SupportsRule => "SupportsRule",
                Self::ContainerRule => "ContainerRule",
                Self::LayerRule => "LayerRule",
                Self::ScopeRule => "ScopeRule",
                Self::StyleRule => "StyleRule",
                Self::StartingStyleRule => "StartingStyleRule",
                Self::NavigationRule => "NavigationRule",
            }
        }
    }

    impl AsRef<str> for CSSRuleType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CSSRuleType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "MediaRule" => Ok(Self::MediaRule),
                "SupportsRule" => Ok(Self::SupportsRule),
                "ContainerRule" => Ok(Self::ContainerRule),
                "LayerRule" => Ok(Self::LayerRule),
                "ScopeRule" => Ok(Self::ScopeRule),
                "StyleRule" => Ok(Self::StyleRule),
                "StartingStyleRule" => Ok(Self::StartingStyleRule),
                "NavigationRule" => Ok(Self::NavigationRule),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CSSRuleType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RuleUsage {
        pub style_sheet_id: crate::generated::dom::StyleSheetId,
        pub start_offset: f64,
        pub end_offset: f64,
        pub used: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SourceRange {
        pub start_line: i64,
        pub start_column: i64,
        pub end_line: i64,
        pub end_column: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ShorthandEntry {
        pub name: String,
        pub value: String,
        pub important: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSComputedStyleProperty {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ComputedStyleExtraFields {
        pub is_appearance_base: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSStyle {
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub css_properties: Vec<Box<crate::generated::css::CSSProperty>>,
        pub shorthand_entries: Vec<Box<crate::generated::css::ShorthandEntry>>,
        pub css_text: Option<String>,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSProperty {
        pub name: String,
        pub value: String,
        pub important: Option<bool>,
        pub implicit: Option<bool>,
        pub text: Option<String>,
        pub parsed_ok: Option<bool>,
        pub disabled: Option<bool>,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub longhand_properties: Option<Vec<Box<crate::generated::css::CSSProperty>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSMedia {
        pub text: String,
        pub source: crate::generated::css::CSSMediaSourcePropertyEnum,
        pub source_url: Option<String>,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub media_list: Option<Vec<Box<crate::generated::css::MediaQuery>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct MediaQuery {
        pub expressions: Vec<Box<crate::generated::css::MediaQueryExpression>>,
        pub active: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct MediaQueryExpression {
        pub value: f64,
        pub unit: String,
        pub feature: String,
        pub value_range: Option<Box<crate::generated::css::SourceRange>>,
        pub computed_length: Option<f64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSContainerQuery {
        pub text: String,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub name: Option<String>,
        pub physical_axes: Option<crate::generated::dom::PhysicalAxes>,
        pub logical_axes: Option<crate::generated::dom::LogicalAxes>,
        pub queries_scroll_state: Option<bool>,
        pub queries_anchored: Option<bool>,
        pub condition_text: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSSupports {
        pub text: String,
        pub active: bool,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSNavigation {
        pub text: String,
        pub active: Option<bool>,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSScope {
        pub text: String,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSLayer {
        pub text: String,
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSStartingStyle {
        pub range: Option<Box<crate::generated::css::SourceRange>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSLayerData {
        pub name: String,
        pub sub_layers: Option<Vec<Box<crate::generated::css::CSSLayerData>>>,
        pub order: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlatformFontUsage {
        pub family_name: String,
        pub post_script_name: String,
        pub is_custom_font: bool,
        pub glyph_count: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FontVariationAxis {
        pub tag: String,
        pub name: String,
        pub min_value: f64,
        pub max_value: f64,
        pub default_value: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FontFace {
        pub font_family: String,
        pub font_style: String,
        pub font_variant: String,
        pub font_weight: String,
        pub font_stretch: String,
        pub font_display: String,
        pub unicode_range: String,
        pub src: String,
        pub platform_font_family: String,
        pub font_variation_axes: Option<Vec<Box<crate::generated::css::FontVariationAxis>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSTryRule {
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub style: Box<crate::generated::css::CSSStyle>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSPositionTryRule {
        pub name: Box<crate::generated::css::Value>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub style: Box<crate::generated::css::CSSStyle>,
        pub active: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSKeyframesRule {
        pub animation_name: Box<crate::generated::css::Value>,
        pub keyframes: Vec<Box<crate::generated::css::CSSKeyframeRule>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSPropertyRegistration {
        pub property_name: String,
        pub initial_value: Option<Box<crate::generated::css::Value>>,
        pub inherits: bool,
        pub syntax: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSAtRule {
        pub type_: crate::generated::css::CSSAtRuleTypePropertyEnum,
        pub subsection: Option<crate::generated::css::CSSAtRuleSubsectionPropertyEnum>,
        pub name: Option<Box<crate::generated::css::Value>>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub style: Box<crate::generated::css::CSSStyle>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSPropertyRule {
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub property_name: Box<crate::generated::css::Value>,
        pub style: Box<crate::generated::css::CSSStyle>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSFunctionParameter {
        pub name: String,
        pub type_: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSFunctionConditionNode {
        pub media: Option<Box<crate::generated::css::CSSMedia>>,
        pub container_queries: Option<Box<crate::generated::css::CSSContainerQuery>>,
        pub supports: Option<Box<crate::generated::css::CSSSupports>>,
        pub navigation: Option<Box<crate::generated::css::CSSNavigation>>,
        pub children: Vec<Box<crate::generated::css::CSSFunctionNode>>,
        pub condition_text: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSFunctionNode {
        pub condition: Option<Box<crate::generated::css::CSSFunctionConditionNode>>,
        pub style: Option<Box<crate::generated::css::CSSStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSFunctionRule {
        pub name: Box<crate::generated::css::Value>,
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub parameters: Vec<Box<crate::generated::css::CSSFunctionParameter>>,
        pub children: Vec<Box<crate::generated::css::CSSFunctionNode>>,
        pub origin_tree_scope_node_id: Option<crate::generated::dom::BackendNodeId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSKeyframeRule {
        pub style_sheet_id: Option<crate::generated::dom::StyleSheetId>,
        pub origin: crate::generated::css::StyleSheetOrigin,
        pub key_text: Box<crate::generated::css::Value>,
        pub style: Box<crate::generated::css::CSSStyle>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StyleDeclarationEdit {
        pub style_sheet_id: crate::generated::dom::StyleSheetId,
        pub range: Box<crate::generated::css::SourceRange>,
        pub text: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddRuleParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub rule_text: String,
            pub location: Box<crate::generated::css::SourceRange>,
            pub node_for_property_syntax_validation: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddRuleResult {
            pub rule: Box<crate::generated::css::CSSRule>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectClassNamesParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectClassNamesResult {
            pub class_names: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateStyleSheetParams {
            pub frame_id: crate::generated::page::FrameId,
            pub force: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateStyleSheetResult {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForcePseudoStateParams {
            pub node_id: crate::generated::dom::NodeId,
            pub forced_pseudo_classes: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForcePseudoStateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceStartingStyleParams {
            pub node_id: crate::generated::dom::NodeId,
            pub forced: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceStartingStyleResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBackgroundColorsParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBackgroundColorsResult {
            pub background_colors: Option<Vec<String>>,
            pub computed_font_size: Option<String>,
            pub computed_font_weight: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetComputedStyleForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetComputedStyleForNodeResult {
            pub computed_style: Vec<Box<crate::generated::css::CSSComputedStyleProperty>>,
            pub extra_fields: Box<crate::generated::css::ComputedStyleExtraFields>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveValuesParams {
            pub values: Vec<String>,
            pub node_id: crate::generated::dom::NodeId,
            pub property_name: Option<String>,
            pub pseudo_type: Option<crate::generated::dom::PseudoType>,
            pub pseudo_identifier: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveValuesResult {
            pub results: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLonghandPropertiesParams {
            pub shorthand_name: String,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLonghandPropertiesResult {
            pub longhand_properties: Vec<Box<crate::generated::css::CSSProperty>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInlineStylesForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInlineStylesForNodeResult {
            pub inline_style: Option<Box<crate::generated::css::CSSStyle>>,
            pub attributes_style: Option<Box<crate::generated::css::CSSStyle>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnimatedStylesForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnimatedStylesForNodeResult {
            pub animation_styles: Option<Vec<Box<crate::generated::css::CSSAnimationStyle>>>,
            pub transitions_style: Option<Box<crate::generated::css::CSSStyle>>,
            pub inherited: Option<Vec<Box<crate::generated::css::InheritedAnimatedStyleEntry>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMatchedStylesForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMatchedStylesForNodeResult {
            pub inline_style: Option<Box<crate::generated::css::CSSStyle>>,
            pub attributes_style: Option<Box<crate::generated::css::CSSStyle>>,
            pub matched_css_rules: Option<Vec<Box<crate::generated::css::RuleMatch>>>,
            pub pseudo_elements: Option<Vec<Box<crate::generated::css::PseudoElementMatches>>>,
            pub inherited: Option<Vec<Box<crate::generated::css::InheritedStyleEntry>>>,
            pub inherited_pseudo_elements: Option<Vec<Box<crate::generated::css::InheritedPseudoElementMatches>>>,
            pub css_keyframes_rules: Option<Vec<Box<crate::generated::css::CSSKeyframesRule>>>,
            pub css_position_try_rules: Option<Vec<Box<crate::generated::css::CSSPositionTryRule>>>,
            pub active_position_fallback_index: Option<i64>,
            pub css_property_rules: Option<Vec<Box<crate::generated::css::CSSPropertyRule>>>,
            pub css_property_registrations: Option<Vec<Box<crate::generated::css::CSSPropertyRegistration>>>,
            pub css_at_rules: Option<Vec<Box<crate::generated::css::CSSAtRule>>>,
            pub parent_layout_node_id: Option<crate::generated::dom::NodeId>,
            pub css_function_rules: Option<Vec<Box<crate::generated::css::CSSFunctionRule>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEnvironmentVariablesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEnvironmentVariablesResult {
            pub environment_variables: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMediaQueriesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMediaQueriesResult {
            pub medias: Vec<Box<crate::generated::css::CSSMedia>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPlatformFontsForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPlatformFontsForNodeResult {
            pub fonts: Vec<Box<crate::generated::css::PlatformFontUsage>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStyleSheetTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStyleSheetTextResult {
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLayersForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLayersForNodeResult {
            pub root_layer: Box<crate::generated::css::CSSLayerData>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLocationForSelectorParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub selector_text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLocationForSelectorResult {
            pub ranges: Vec<Box<crate::generated::css::SourceRange>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackComputedStyleUpdatesForNodeParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackComputedStyleUpdatesForNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackComputedStyleUpdatesParams {
            pub properties_to_track: Vec<Box<crate::generated::css::CSSComputedStyleProperty>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackComputedStyleUpdatesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeComputedStyleUpdatesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeComputedStyleUpdatesResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEffectivePropertyValueForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
            pub property_name: String,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEffectivePropertyValueForNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPropertyRulePropertyNameParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub property_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPropertyRulePropertyNameResult {
            pub property_name: Box<crate::generated::css::Value>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetKeyframeKeyParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub key_text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetKeyframeKeyResult {
            pub key_text: Box<crate::generated::css::Value>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetMediaTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetMediaTextResult {
            pub media: Box<crate::generated::css::CSSMedia>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContainerQueryTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContainerQueryTextResult {
            pub container_query: Box<crate::generated::css::CSSContainerQuery>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContainerQueryConditionTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetContainerQueryConditionTextResult {
            pub container_query: Box<crate::generated::css::CSSContainerQuery>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSupportsTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSupportsTextResult {
            pub supports: Box<crate::generated::css::CSSSupports>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNavigationTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNavigationTextResult {
            pub navigation: Box<crate::generated::css::CSSNavigation>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScopeTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScopeTextResult {
            pub scope: Box<crate::generated::css::CSSScope>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRuleSelectorParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub range: Box<crate::generated::css::SourceRange>,
            pub selector: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRuleSelectorResult {
            pub selector_list: Box<crate::generated::css::SelectorList>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStyleSheetTextParams {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStyleSheetTextResult {
            pub source_map_url: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStyleTextsParams {
            pub edits: Vec<Box<crate::generated::css::StyleDeclarationEdit>>,
            pub node_for_property_syntax_validation: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStyleTextsResult {
            pub styles: Vec<Box<crate::generated::css::CSSStyle>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartRuleUsageTrackingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartRuleUsageTrackingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopRuleUsageTrackingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopRuleUsageTrackingResult {
            pub rule_usage: Vec<Box<crate::generated::css::RuleUsage>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeCoverageDeltaParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeCoverageDeltaResult {
            pub coverage: Vec<Box<crate::generated::css::RuleUsage>>,
            pub timestamp: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLocalFontsEnabledParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLocalFontsEnabledResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct FontsUpdatedEvent {
            pub font: Option<Box<crate::generated::css::FontFace>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct MediaQueryResultChangedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StyleSheetAddedEvent {
            pub header: Box<crate::generated::css::CSSStyleSheetHeader>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StyleSheetChangedEvent {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StyleSheetRemovedEvent {
            pub style_sheet_id: crate::generated::dom::StyleSheetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ComputedStyleUpdatedEvent {
            pub node_id: crate::generated::dom::NodeId,
        }
    }
}

pub mod cache_storage {
    pub type CacheId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CachedResponseType {
        Basic,
        Cors,
        Default,
        Error,
        OpaqueResponse,
        OpaqueRedirect,
    }

    impl CachedResponseType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Basic => "basic",
                Self::Cors => "cors",
                Self::Default => "default",
                Self::Error => "error",
                Self::OpaqueResponse => "opaqueResponse",
                Self::OpaqueRedirect => "opaqueRedirect",
            }
        }
    }

    impl AsRef<str> for CachedResponseType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CachedResponseType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "basic" => Ok(Self::Basic),
                "cors" => Ok(Self::Cors),
                "default" => Ok(Self::Default),
                "error" => Ok(Self::Error),
                "opaqueResponse" => Ok(Self::OpaqueResponse),
                "opaqueRedirect" => Ok(Self::OpaqueRedirect),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CachedResponseType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DataEntry {
        pub request_url: String,
        pub request_method: String,
        pub request_headers: Vec<Box<crate::generated::cache_storage::Header>>,
        pub response_time: f64,
        pub response_status: i64,
        pub response_status_text: String,
        pub response_type: crate::generated::cache_storage::CachedResponseType,
        pub response_headers: Vec<Box<crate::generated::cache_storage::Header>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Cache {
        pub cache_id: crate::generated::cache_storage::CacheId,
        pub security_origin: String,
        pub storage_key: String,
        pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
        pub cache_name: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Header {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CachedResponse {
        pub body: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCacheParams {
            pub cache_id: crate::generated::cache_storage::CacheId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCacheResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteEntryParams {
            pub cache_id: crate::generated::cache_storage::CacheId,
            pub request: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteEntryResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestCacheNamesParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestCacheNamesResult {
            pub caches: Vec<Box<crate::generated::cache_storage::Cache>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestCachedResponseParams {
            pub cache_id: crate::generated::cache_storage::CacheId,
            pub request_url: String,
            pub request_headers: Vec<Box<crate::generated::cache_storage::Header>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestCachedResponseResult {
            pub response: Box<crate::generated::cache_storage::CachedResponse>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestEntriesParams {
            pub cache_id: crate::generated::cache_storage::CacheId,
            pub skip_count: Option<i64>,
            pub page_size: Option<i64>,
            pub path_filter: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestEntriesResult {
            pub cache_data_entries: Vec<Box<crate::generated::cache_storage::DataEntry>>,
            pub return_count: f64,
        }
    }

    pub mod events {
    }
}

pub mod cast {
    #[derive(Clone, Debug, PartialEq)]
    pub struct Sink {
        pub name: String,
        pub id: String,
        pub session: Option<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub presentation_url: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSinkToUseParams {
            pub sink_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSinkToUseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartDesktopMirroringParams {
            pub sink_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartDesktopMirroringResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartTabMirroringParams {
            pub sink_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartTabMirroringResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopCastingParams {
            pub sink_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopCastingResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct SinksUpdatedEvent {
            pub sinks: Vec<Box<crate::generated::cast::Sink>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct IssueUpdatedEvent {
            pub issue_message: String,
        }
    }
}

pub mod crash_report_context {
    #[derive(Clone, Debug, PartialEq)]
    pub struct CrashReportContextEntry {
        pub key: String,
        pub value: String,
        pub frame_id: crate::generated::page::FrameId,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEntriesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEntriesResult {
            pub entries: Vec<Box<crate::generated::crash_report_context::CrashReportContextEntry>>,
        }
    }

    pub mod events {
    }
}

pub mod dom {
    pub type NodeId = i64;
    pub type BackendNodeId = i64;
    pub type StyleSheetId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct BackendNode {
        pub node_type: i64,
        pub node_name: String,
        pub backend_node_id: crate::generated::dom::BackendNodeId,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PseudoType {
        FirstLine,
        FirstLetter,
        Checkmark,
        Before,
        After,
        ExpandIcon,
        PickerIcon,
        InterestButton,
        Marker,
        Backdrop,
        Column,
        Selection,
        SearchText,
        TargetText,
        SpellingError,
        GrammarError,
        Highlight,
        FirstLineInherited,
        ScrollMarker,
        ScrollMarkerGroup,
        ScrollButton,
        Scrollbar,
        ScrollbarThumb,
        ScrollbarButton,
        ScrollbarTrack,
        ScrollbarTrackPiece,
        ScrollbarCorner,
        Resizer,
        InputListButton,
        ViewTransition,
        ViewTransitionGroup,
        ViewTransitionImagePair,
        ViewTransitionGroupChildren,
        ViewTransitionOld,
        ViewTransitionNew,
        Placeholder,
        FileSelectorButton,
        DetailsContent,
        Picker,
        SelectListbox,
        PermissionIcon,
        OverscrollAreaParent,
        OverscrollBackdrop,
        Skeleton,
    }

    impl PseudoType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::FirstLine => "first-line",
                Self::FirstLetter => "first-letter",
                Self::Checkmark => "checkmark",
                Self::Before => "before",
                Self::After => "after",
                Self::ExpandIcon => "expand-icon",
                Self::PickerIcon => "picker-icon",
                Self::InterestButton => "interest-button",
                Self::Marker => "marker",
                Self::Backdrop => "backdrop",
                Self::Column => "column",
                Self::Selection => "selection",
                Self::SearchText => "search-text",
                Self::TargetText => "target-text",
                Self::SpellingError => "spelling-error",
                Self::GrammarError => "grammar-error",
                Self::Highlight => "highlight",
                Self::FirstLineInherited => "first-line-inherited",
                Self::ScrollMarker => "scroll-marker",
                Self::ScrollMarkerGroup => "scroll-marker-group",
                Self::ScrollButton => "scroll-button",
                Self::Scrollbar => "scrollbar",
                Self::ScrollbarThumb => "scrollbar-thumb",
                Self::ScrollbarButton => "scrollbar-button",
                Self::ScrollbarTrack => "scrollbar-track",
                Self::ScrollbarTrackPiece => "scrollbar-track-piece",
                Self::ScrollbarCorner => "scrollbar-corner",
                Self::Resizer => "resizer",
                Self::InputListButton => "input-list-button",
                Self::ViewTransition => "view-transition",
                Self::ViewTransitionGroup => "view-transition-group",
                Self::ViewTransitionImagePair => "view-transition-image-pair",
                Self::ViewTransitionGroupChildren => "view-transition-group-children",
                Self::ViewTransitionOld => "view-transition-old",
                Self::ViewTransitionNew => "view-transition-new",
                Self::Placeholder => "placeholder",
                Self::FileSelectorButton => "file-selector-button",
                Self::DetailsContent => "details-content",
                Self::Picker => "picker",
                Self::SelectListbox => "select-listbox",
                Self::PermissionIcon => "permission-icon",
                Self::OverscrollAreaParent => "overscroll-area-parent",
                Self::OverscrollBackdrop => "overscroll-backdrop",
                Self::Skeleton => "skeleton",
            }
        }
    }

    impl AsRef<str> for PseudoType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PseudoType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "first-line" => Ok(Self::FirstLine),
                "first-letter" => Ok(Self::FirstLetter),
                "checkmark" => Ok(Self::Checkmark),
                "before" => Ok(Self::Before),
                "after" => Ok(Self::After),
                "expand-icon" => Ok(Self::ExpandIcon),
                "picker-icon" => Ok(Self::PickerIcon),
                "interest-button" => Ok(Self::InterestButton),
                "marker" => Ok(Self::Marker),
                "backdrop" => Ok(Self::Backdrop),
                "column" => Ok(Self::Column),
                "selection" => Ok(Self::Selection),
                "search-text" => Ok(Self::SearchText),
                "target-text" => Ok(Self::TargetText),
                "spelling-error" => Ok(Self::SpellingError),
                "grammar-error" => Ok(Self::GrammarError),
                "highlight" => Ok(Self::Highlight),
                "first-line-inherited" => Ok(Self::FirstLineInherited),
                "scroll-marker" => Ok(Self::ScrollMarker),
                "scroll-marker-group" => Ok(Self::ScrollMarkerGroup),
                "scroll-button" => Ok(Self::ScrollButton),
                "scrollbar" => Ok(Self::Scrollbar),
                "scrollbar-thumb" => Ok(Self::ScrollbarThumb),
                "scrollbar-button" => Ok(Self::ScrollbarButton),
                "scrollbar-track" => Ok(Self::ScrollbarTrack),
                "scrollbar-track-piece" => Ok(Self::ScrollbarTrackPiece),
                "scrollbar-corner" => Ok(Self::ScrollbarCorner),
                "resizer" => Ok(Self::Resizer),
                "input-list-button" => Ok(Self::InputListButton),
                "view-transition" => Ok(Self::ViewTransition),
                "view-transition-group" => Ok(Self::ViewTransitionGroup),
                "view-transition-image-pair" => Ok(Self::ViewTransitionImagePair),
                "view-transition-group-children" => Ok(Self::ViewTransitionGroupChildren),
                "view-transition-old" => Ok(Self::ViewTransitionOld),
                "view-transition-new" => Ok(Self::ViewTransitionNew),
                "placeholder" => Ok(Self::Placeholder),
                "file-selector-button" => Ok(Self::FileSelectorButton),
                "details-content" => Ok(Self::DetailsContent),
                "picker" => Ok(Self::Picker),
                "select-listbox" => Ok(Self::SelectListbox),
                "permission-icon" => Ok(Self::PermissionIcon),
                "overscroll-area-parent" => Ok(Self::OverscrollAreaParent),
                "overscroll-backdrop" => Ok(Self::OverscrollBackdrop),
                "skeleton" => Ok(Self::Skeleton),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PseudoType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ShadowRootType {
        UserAgent,
        Open,
        Closed,
    }

    impl ShadowRootType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::UserAgent => "user-agent",
                Self::Open => "open",
                Self::Closed => "closed",
            }
        }
    }

    impl AsRef<str> for ShadowRootType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ShadowRootType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "user-agent" => Ok(Self::UserAgent),
                "open" => Ok(Self::Open),
                "closed" => Ok(Self::Closed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ShadowRootType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CompatibilityMode {
        QuirksMode,
        LimitedQuirksMode,
        NoQuirksMode,
    }

    impl CompatibilityMode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::QuirksMode => "QuirksMode",
                Self::LimitedQuirksMode => "LimitedQuirksMode",
                Self::NoQuirksMode => "NoQuirksMode",
            }
        }
    }

    impl AsRef<str> for CompatibilityMode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CompatibilityMode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "QuirksMode" => Ok(Self::QuirksMode),
                "LimitedQuirksMode" => Ok(Self::LimitedQuirksMode),
                "NoQuirksMode" => Ok(Self::NoQuirksMode),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CompatibilityMode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PhysicalAxes {
        Horizontal,
        Vertical,
        Both,
    }

    impl PhysicalAxes {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Horizontal => "Horizontal",
                Self::Vertical => "Vertical",
                Self::Both => "Both",
            }
        }
    }

    impl AsRef<str> for PhysicalAxes {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PhysicalAxes {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Horizontal" => Ok(Self::Horizontal),
                "Vertical" => Ok(Self::Vertical),
                "Both" => Ok(Self::Both),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PhysicalAxes",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LogicalAxes {
        Inline,
        Block,
        Both,
    }

    impl LogicalAxes {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Inline => "Inline",
                Self::Block => "Block",
                Self::Both => "Both",
            }
        }
    }

    impl AsRef<str> for LogicalAxes {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LogicalAxes {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Inline" => Ok(Self::Inline),
                "Block" => Ok(Self::Block),
                "Both" => Ok(Self::Both),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LogicalAxes",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScrollOrientation {
        Horizontal,
        Vertical,
    }

    impl ScrollOrientation {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Horizontal => "horizontal",
                Self::Vertical => "vertical",
            }
        }
    }

    impl AsRef<str> for ScrollOrientation {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScrollOrientation {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "horizontal" => Ok(Self::Horizontal),
                "vertical" => Ok(Self::Vertical),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScrollOrientation",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Node {
        pub node_id: crate::generated::dom::NodeId,
        pub parent_id: Option<crate::generated::dom::NodeId>,
        pub backend_node_id: crate::generated::dom::BackendNodeId,
        pub node_type: i64,
        pub node_name: String,
        pub local_name: String,
        pub node_value: String,
        pub child_node_count: Option<i64>,
        pub children: Option<Vec<Box<crate::generated::dom::Node>>>,
        pub attributes: Option<Vec<String>>,
        pub document_url: Option<String>,
        pub base_url: Option<String>,
        pub public_id: Option<String>,
        pub system_id: Option<String>,
        pub internal_subset: Option<String>,
        pub xml_version: Option<String>,
        pub name: Option<String>,
        pub value: Option<String>,
        pub pseudo_type: Option<crate::generated::dom::PseudoType>,
        pub pseudo_identifier: Option<String>,
        pub shadow_root_type: Option<crate::generated::dom::ShadowRootType>,
        pub frame_id: Option<crate::generated::page::FrameId>,
        pub content_document: Option<Box<crate::generated::dom::Node>>,
        pub shadow_roots: Option<Vec<Box<crate::generated::dom::Node>>>,
        pub template_content: Option<Box<crate::generated::dom::Node>>,
        pub pseudo_elements: Option<Vec<Box<crate::generated::dom::Node>>>,
        pub imported_document: Option<Box<crate::generated::dom::Node>>,
        pub distributed_nodes: Option<Vec<Box<crate::generated::dom::BackendNode>>>,
        pub is_svg: Option<bool>,
        pub compatibility_mode: Option<crate::generated::dom::CompatibilityMode>,
        pub assigned_slot: Option<Box<crate::generated::dom::BackendNode>>,
        pub is_scrollable: Option<bool>,
        pub affected_by_starting_styles: Option<bool>,
        pub adopted_style_sheets: Option<Vec<crate::generated::dom::StyleSheetId>>,
        pub ad_provenance: Option<Box<crate::generated::network::AdProvenance>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DetachedElementInfo {
        pub tree_node: Box<crate::generated::dom::Node>,
        pub retained_node_ids: Vec<crate::generated::dom::NodeId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RGBA {
        pub r: i64,
        pub g: i64,
        pub b: i64,
        pub a: Option<f64>,
    }
    pub type Quad = Vec<f64>;
    #[derive(Clone, Debug, PartialEq)]
    pub struct BoxModel {
        pub content: crate::generated::dom::Quad,
        pub padding: crate::generated::dom::Quad,
        pub border: crate::generated::dom::Quad,
        pub margin: crate::generated::dom::Quad,
        pub width: i64,
        pub height: i64,
        pub shape_outside: Option<Box<crate::generated::dom::ShapeOutsideInfo>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ShapeOutsideInfo {
        pub bounds: crate::generated::dom::Quad,
        pub shape: Vec<crate::generated::JsonValue>,
        pub margin_shape: Vec<crate::generated::JsonValue>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Rect {
        pub x: f64,
        pub y: f64,
        pub width: f64,
        pub height: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CSSComputedStyleProperty {
        pub name: String,
        pub value: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectClassNamesFromSubtreeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectClassNamesFromSubtreeResult {
            pub class_names: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CopyToParams {
            pub node_id: crate::generated::dom::NodeId,
            pub target_node_id: crate::generated::dom::NodeId,
            pub insert_before_node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CopyToResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DescribeNodeParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub depth: Option<i64>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DescribeNodeResult {
            pub node: Box<crate::generated::dom::Node>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScrollIntoViewIfNeededParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub rect: Option<Box<crate::generated::dom::Rect>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScrollIntoViewIfNeededResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DiscardSearchResultsParams {
            pub search_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DiscardSearchResultsResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum EnableIncludeWhitespaceParamEnum {
            None,
            All,
        }

        impl EnableIncludeWhitespaceParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::None => "none",
                    Self::All => "all",
                }
            }
        }

        impl AsRef<str> for EnableIncludeWhitespaceParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for EnableIncludeWhitespaceParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "none" => Ok(Self::None),
                    "all" => Ok(Self::All),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "EnableIncludeWhitespaceParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub include_whitespace: Option<crate::generated::dom::commands::EnableIncludeWhitespaceParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct FocusParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FocusResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAttributesParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAttributesResult {
            pub attributes: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBoxModelParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBoxModelResult {
            pub model: Box<crate::generated::dom::BoxModel>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetContentQuadsParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetContentQuadsResult {
            pub quads: Vec<crate::generated::dom::Quad>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDocumentParams {
            pub depth: Option<i64>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDocumentResult {
            pub root: Box<crate::generated::dom::Node>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFlattenedDocumentParams {
            pub depth: Option<i64>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFlattenedDocumentResult {
            pub nodes: Vec<Box<crate::generated::dom::Node>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodesForSubtreeByStyleParams {
            pub node_id: crate::generated::dom::NodeId,
            pub computed_styles: Vec<Box<crate::generated::dom::CSSComputedStyleProperty>>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodesForSubtreeByStyleResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodeForLocationParams {
            pub x: i64,
            pub y: i64,
            pub include_user_agent_shadow_dom: Option<bool>,
            pub ignore_pointer_events_none: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodeForLocationResult {
            pub backend_node_id: crate::generated::dom::BackendNodeId,
            pub frame_id: crate::generated::page::FrameId,
            pub node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOuterHTMLParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub include_shadow_dom: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOuterHTMLResult {
            pub outer_html: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRelayoutBoundaryParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRelayoutBoundaryResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSearchResultsParams {
            pub search_id: String,
            pub from_index: i64,
            pub to_index: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSearchResultsResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HideHighlightParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HideHighlightResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightNodeParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightRectParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightRectResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct MarkUndoableStateParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct MarkUndoableStateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct MoveToParams {
            pub node_id: crate::generated::dom::NodeId,
            pub target_node_id: crate::generated::dom::NodeId,
            pub insert_before_node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct MoveToResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PerformSearchParams {
            pub query: String,
            pub include_user_agent_shadow_dom: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PerformSearchResult {
            pub search_id: String,
            pub result_count: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PushNodeByPathToFrontendParams {
            pub path: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PushNodeByPathToFrontendResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PushNodesByBackendIdsToFrontendParams {
            pub backend_node_ids: Vec<crate::generated::dom::BackendNodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PushNodesByBackendIdsToFrontendResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QuerySelectorParams {
            pub node_id: crate::generated::dom::NodeId,
            pub selector: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QuerySelectorResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QuerySelectorAllParams {
            pub node_id: crate::generated::dom::NodeId,
            pub selector: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QuerySelectorAllResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTopLayerElementsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTopLayerElementsResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum GetElementByRelationRelationParamEnum {
            PopoverTarget,
            InterestTarget,
            CommandFor,
        }

        impl GetElementByRelationRelationParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::PopoverTarget => "PopoverTarget",
                    Self::InterestTarget => "InterestTarget",
                    Self::CommandFor => "CommandFor",
                }
            }
        }

        impl AsRef<str> for GetElementByRelationRelationParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for GetElementByRelationRelationParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "PopoverTarget" => Ok(Self::PopoverTarget),
                    "InterestTarget" => Ok(Self::InterestTarget),
                    "CommandFor" => Ok(Self::CommandFor),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "GetElementByRelationRelationParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetElementByRelationParams {
            pub node_id: crate::generated::dom::NodeId,
            pub relation: crate::generated::dom::commands::GetElementByRelationRelationParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetElementByRelationResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RedoParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RedoResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveAttributeParams {
            pub node_id: crate::generated::dom::NodeId,
            pub name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveAttributeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestChildNodesParams {
            pub node_id: crate::generated::dom::NodeId,
            pub depth: Option<i64>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestChildNodesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestNodeParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestNodeResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveNodeParams {
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_group: Option<String>,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveNodeResult {
            pub object: Box<crate::generated::runtime::RemoteObject>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttributeValueParams {
            pub node_id: crate::generated::dom::NodeId,
            pub name: String,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttributeValueResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttributesAsTextParams {
            pub node_id: crate::generated::dom::NodeId,
            pub text: String,
            pub name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttributesAsTextResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFileInputFilesParams {
            pub files: Vec<String>,
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFileInputFilesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeStackTracesEnabledParams {
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeStackTracesEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodeStackTracesParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNodeStackTracesResult {
            pub creation: Option<Box<crate::generated::runtime::StackTrace>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFileInfoParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFileInfoResult {
            pub path: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDetachedDomNodesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDetachedDomNodesResult {
            pub detached_nodes: Vec<Box<crate::generated::dom::DetachedElementInfo>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInspectedNodeParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInspectedNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeNameParams {
            pub node_id: crate::generated::dom::NodeId,
            pub name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeNameResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeValueParams {
            pub node_id: crate::generated::dom::NodeId,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNodeValueResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetOuterHTMLParams {
            pub node_id: crate::generated::dom::NodeId,
            pub outer_html: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetOuterHTMLResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UndoParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UndoResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFrameOwnerParams {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFrameOwnerResult {
            pub backend_node_id: crate::generated::dom::BackendNodeId,
            pub node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetContainerForNodeParams {
            pub node_id: crate::generated::dom::NodeId,
            pub container_name: Option<String>,
            pub physical_axes: Option<crate::generated::dom::PhysicalAxes>,
            pub logical_axes: Option<crate::generated::dom::LogicalAxes>,
            pub queries_scroll_state: Option<bool>,
            pub queries_anchored: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetContainerForNodeResult {
            pub node_id: Option<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetQueryingDescendantsForContainerParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetQueryingDescendantsForContainerResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnchorElementParams {
            pub node_id: crate::generated::dom::NodeId,
            pub anchor_specifier: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnchorElementResult {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceShowPopoverParams {
            pub node_id: crate::generated::dom::NodeId,
            pub enable: bool,
            pub invoker_node_id: Option<crate::generated::dom::BackendNodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceShowPopoverResult {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceShowInterestParams {
            pub node_id: crate::generated::dom::NodeId,
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForceShowInterestResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttributeModifiedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub name: String,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AdoptedStyleSheetsModifiedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub adopted_style_sheets: Vec<crate::generated::dom::StyleSheetId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttributeRemovedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CharacterDataModifiedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub character_data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ChildNodeCountUpdatedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub child_node_count: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ChildNodeInsertedEvent {
            pub parent_node_id: crate::generated::dom::NodeId,
            pub previous_node_id: crate::generated::dom::NodeId,
            pub node: Box<crate::generated::dom::Node>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ChildNodeRemovedEvent {
            pub parent_node_id: crate::generated::dom::NodeId,
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DistributedNodesUpdatedEvent {
            pub insertion_point_id: crate::generated::dom::NodeId,
            pub distributed_nodes: Vec<Box<crate::generated::dom::BackendNode>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DocumentUpdatedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct InlineStyleInvalidatedEvent {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PseudoElementAddedEvent {
            pub parent_id: crate::generated::dom::NodeId,
            pub pseudo_element: Box<crate::generated::dom::Node>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TopLayerElementsUpdatedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScrollableFlagUpdatedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub is_scrollable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AdRelatedStateUpdatedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub ad_provenance: Option<Box<crate::generated::network::AdProvenance>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AffectedByStartingStylesFlagUpdatedEvent {
            pub node_id: crate::generated::dom::NodeId,
            pub affected_by_starting_styles: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PseudoElementRemovedEvent {
            pub parent_id: crate::generated::dom::NodeId,
            pub pseudo_element_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetChildNodesEvent {
            pub parent_id: crate::generated::dom::NodeId,
            pub nodes: Vec<Box<crate::generated::dom::Node>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ShadowRootPoppedEvent {
            pub host_id: crate::generated::dom::NodeId,
            pub root_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ShadowRootPushedEvent {
            pub host_id: crate::generated::dom::NodeId,
            pub root: Box<crate::generated::dom::Node>,
        }
    }
}

pub mod dom_debugger {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DOMBreakpointType {
        SubtreeModified,
        AttributeModified,
        NodeRemoved,
    }

    impl DOMBreakpointType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SubtreeModified => "subtree-modified",
                Self::AttributeModified => "attribute-modified",
                Self::NodeRemoved => "node-removed",
            }
        }
    }

    impl AsRef<str> for DOMBreakpointType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DOMBreakpointType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "subtree-modified" => Ok(Self::SubtreeModified),
                "attribute-modified" => Ok(Self::AttributeModified),
                "node-removed" => Ok(Self::NodeRemoved),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DOMBreakpointType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CSPViolationType {
        TrustedtypeSinkViolation,
        TrustedtypePolicyViolation,
    }

    impl CSPViolationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::TrustedtypeSinkViolation => "trustedtype-sink-violation",
                Self::TrustedtypePolicyViolation => "trustedtype-policy-violation",
            }
        }
    }

    impl AsRef<str> for CSPViolationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CSPViolationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "trustedtype-sink-violation" => Ok(Self::TrustedtypeSinkViolation),
                "trustedtype-policy-violation" => Ok(Self::TrustedtypePolicyViolation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CSPViolationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct EventListener {
        pub type_: String,
        pub use_capture: bool,
        pub passive: bool,
        pub once: bool,
        pub script_id: crate::generated::runtime::ScriptId,
        pub line_number: i64,
        pub column_number: i64,
        pub handler: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub original_handler: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEventListenersParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
            pub depth: Option<i64>,
            pub pierce: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetEventListenersResult {
            pub listeners: Vec<Box<crate::generated::dom_debugger::EventListener>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDOMBreakpointParams {
            pub node_id: crate::generated::dom::NodeId,
            pub type_: crate::generated::dom_debugger::DOMBreakpointType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDOMBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveEventListenerBreakpointParams {
            pub event_name: String,
            pub target_name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveEventListenerBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveInstrumentationBreakpointParams {
            pub event_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveInstrumentationBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveXHRBreakpointParams {
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveXHRBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakOnCSPViolationParams {
            pub violation_types: Vec<crate::generated::dom_debugger::CSPViolationType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakOnCSPViolationResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDOMBreakpointParams {
            pub node_id: crate::generated::dom::NodeId,
            pub type_: crate::generated::dom_debugger::DOMBreakpointType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDOMBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEventListenerBreakpointParams {
            pub event_name: String,
            pub target_name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEventListenerBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointParams {
            pub event_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetXHRBreakpointParams {
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetXHRBreakpointResult;
    }

    pub mod events {
    }
}

pub mod dom_snapshot {
    #[derive(Clone, Debug, PartialEq)]
    pub struct DOMNode {
        pub node_type: i64,
        pub node_name: String,
        pub node_value: String,
        pub text_value: Option<String>,
        pub input_value: Option<String>,
        pub input_checked: Option<bool>,
        pub option_selected: Option<bool>,
        pub backend_node_id: crate::generated::dom::BackendNodeId,
        pub child_node_indexes: Option<Vec<i64>>,
        pub attributes: Option<Vec<Box<crate::generated::dom_snapshot::NameValue>>>,
        pub pseudo_element_indexes: Option<Vec<i64>>,
        pub layout_node_index: Option<i64>,
        pub document_url: Option<String>,
        pub base_url: Option<String>,
        pub content_language: Option<String>,
        pub document_encoding: Option<String>,
        pub public_id: Option<String>,
        pub system_id: Option<String>,
        pub frame_id: Option<crate::generated::page::FrameId>,
        pub content_document_index: Option<i64>,
        pub pseudo_type: Option<crate::generated::dom::PseudoType>,
        pub shadow_root_type: Option<crate::generated::dom::ShadowRootType>,
        pub is_clickable: Option<bool>,
        pub event_listeners: Option<Vec<Box<crate::generated::dom_debugger::EventListener>>>,
        pub current_source_url: Option<String>,
        pub origin_url: Option<String>,
        pub scroll_offset_x: Option<f64>,
        pub scroll_offset_y: Option<f64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InlineTextBox {
        pub bounding_box: Box<crate::generated::dom::Rect>,
        pub start_character_index: i64,
        pub num_characters: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LayoutTreeNode {
        pub dom_node_index: i64,
        pub bounding_box: Box<crate::generated::dom::Rect>,
        pub layout_text: Option<String>,
        pub inline_text_nodes: Option<Vec<Box<crate::generated::dom_snapshot::InlineTextBox>>>,
        pub style_index: Option<i64>,
        pub paint_order: Option<i64>,
        pub is_stacking_context: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ComputedStyle {
        pub properties: Vec<Box<crate::generated::dom_snapshot::NameValue>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct NameValue {
        pub name: String,
        pub value: String,
    }
    pub type StringIndex = i64;
    pub type ArrayOfStrings = Vec<crate::generated::dom_snapshot::StringIndex>;
    #[derive(Clone, Debug, PartialEq)]
    pub struct RareStringData {
        pub index: Vec<i64>,
        pub value: Vec<crate::generated::dom_snapshot::StringIndex>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RareBooleanData {
        pub index: Vec<i64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RareIntegerData {
        pub index: Vec<i64>,
        pub value: Vec<i64>,
    }
    pub type Rectangle = Vec<f64>;
    #[derive(Clone, Debug, PartialEq)]
    pub struct DocumentSnapshot {
        pub document_url: crate::generated::dom_snapshot::StringIndex,
        pub title: crate::generated::dom_snapshot::StringIndex,
        pub base_url: crate::generated::dom_snapshot::StringIndex,
        pub content_language: crate::generated::dom_snapshot::StringIndex,
        pub encoding_name: crate::generated::dom_snapshot::StringIndex,
        pub public_id: crate::generated::dom_snapshot::StringIndex,
        pub system_id: crate::generated::dom_snapshot::StringIndex,
        pub frame_id: crate::generated::dom_snapshot::StringIndex,
        pub nodes: Box<crate::generated::dom_snapshot::NodeTreeSnapshot>,
        pub layout: Box<crate::generated::dom_snapshot::LayoutTreeSnapshot>,
        pub text_boxes: Box<crate::generated::dom_snapshot::TextBoxSnapshot>,
        pub scroll_offset_x: Option<f64>,
        pub scroll_offset_y: Option<f64>,
        pub content_width: Option<f64>,
        pub content_height: Option<f64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct NodeTreeSnapshot {
        pub parent_index: Option<Vec<i64>>,
        pub node_type: Option<Vec<i64>>,
        pub shadow_root_type: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub node_name: Option<Vec<crate::generated::dom_snapshot::StringIndex>>,
        pub node_value: Option<Vec<crate::generated::dom_snapshot::StringIndex>>,
        pub backend_node_id: Option<Vec<crate::generated::dom::BackendNodeId>>,
        pub attributes: Option<Vec<crate::generated::dom_snapshot::ArrayOfStrings>>,
        pub text_value: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub input_value: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub input_checked: Option<Box<crate::generated::dom_snapshot::RareBooleanData>>,
        pub option_selected: Option<Box<crate::generated::dom_snapshot::RareBooleanData>>,
        pub content_document_index: Option<Box<crate::generated::dom_snapshot::RareIntegerData>>,
        pub pseudo_type: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub pseudo_identifier: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub is_clickable: Option<Box<crate::generated::dom_snapshot::RareBooleanData>>,
        pub current_source_url: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
        pub origin_url: Option<Box<crate::generated::dom_snapshot::RareStringData>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LayoutTreeSnapshot {
        pub node_index: Vec<i64>,
        pub styles: Vec<crate::generated::dom_snapshot::ArrayOfStrings>,
        pub bounds: Vec<crate::generated::dom_snapshot::Rectangle>,
        pub text: Vec<crate::generated::dom_snapshot::StringIndex>,
        pub stacking_contexts: Box<crate::generated::dom_snapshot::RareBooleanData>,
        pub paint_orders: Option<Vec<i64>>,
        pub offset_rects: Option<Vec<crate::generated::dom_snapshot::Rectangle>>,
        pub scroll_rects: Option<Vec<crate::generated::dom_snapshot::Rectangle>>,
        pub client_rects: Option<Vec<crate::generated::dom_snapshot::Rectangle>>,
        pub blended_background_colors: Option<Vec<crate::generated::dom_snapshot::StringIndex>>,
        pub text_color_opacities: Option<Vec<f64>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct TextBoxSnapshot {
        pub layout_index: Vec<i64>,
        pub bounds: Vec<crate::generated::dom_snapshot::Rectangle>,
        pub start: Vec<i64>,
        pub length: Vec<i64>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSnapshotParams {
            pub computed_style_whitelist: Vec<String>,
            pub include_event_listeners: Option<bool>,
            pub include_paint_order: Option<bool>,
            pub include_user_agent_shadow_tree: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSnapshotResult {
            pub dom_nodes: Vec<Box<crate::generated::dom_snapshot::DOMNode>>,
            pub layout_tree_nodes: Vec<Box<crate::generated::dom_snapshot::LayoutTreeNode>>,
            pub computed_styles: Vec<Box<crate::generated::dom_snapshot::ComputedStyle>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureSnapshotParams {
            pub computed_styles: Vec<String>,
            pub include_paint_order: Option<bool>,
            pub include_dom_rects: Option<bool>,
            pub include_blended_background_colors: Option<bool>,
            pub include_text_color_opacities: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureSnapshotResult {
            pub documents: Vec<Box<crate::generated::dom_snapshot::DocumentSnapshot>>,
            pub strings: Vec<String>,
        }
    }

    pub mod events {
    }
}

pub mod dom_storage {
    pub type SerializedStorageKey = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct StorageId {
        pub security_origin: Option<String>,
        pub storage_key: Option<crate::generated::dom_storage::SerializedStorageKey>,
        pub is_local_storage: bool,
    }
    pub type Item = Vec<String>;

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearParams {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMStorageItemsParams {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMStorageItemsResult {
            pub entries: Vec<crate::generated::dom_storage::Item>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDOMStorageItemParams {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
            pub key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveDOMStorageItemResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDOMStorageItemParams {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
            pub key: String,
            pub value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDOMStorageItemResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DomStorageItemAddedEvent {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
            pub key: String,
            pub new_value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DomStorageItemRemovedEvent {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
            pub key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DomStorageItemUpdatedEvent {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
            pub key: String,
            pub old_value: String,
            pub new_value: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DomStorageItemsClearedEvent {
            pub storage_id: Box<crate::generated::dom_storage::StorageId>,
        }
    }
}

pub mod device_access {
    pub type RequestId = String;
    pub type DeviceId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct PromptDevice {
        pub id: crate::generated::device_access::DeviceId,
        pub name: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SelectPromptParams {
            pub id: crate::generated::device_access::RequestId,
            pub device_id: crate::generated::device_access::DeviceId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SelectPromptResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelPromptParams {
            pub id: crate::generated::device_access::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelPromptResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeviceRequestPromptedEvent {
            pub id: crate::generated::device_access::RequestId,
            pub devices: Vec<Box<crate::generated::device_access::PromptDevice>>,
        }
    }
}

pub mod device_orientation {

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceOrientationOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceOrientationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceOrientationOverrideParams {
            pub alpha: f64,
            pub beta: f64,
            pub gamma: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceOrientationOverrideResult;
    }

    pub mod events {
    }
}

pub mod digital_credentials {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum VirtualWalletAction {
        Respond,
        Decline,
        Wait,
        Clear,
    }

    impl VirtualWalletAction {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Respond => "respond",
                Self::Decline => "decline",
                Self::Wait => "wait",
                Self::Clear => "clear",
            }
        }
    }

    impl AsRef<str> for VirtualWalletAction {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for VirtualWalletAction {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "respond" => Ok(Self::Respond),
                "decline" => Ok(Self::Decline),
                "wait" => Ok(Self::Wait),
                "clear" => Ok(Self::Clear),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "VirtualWalletAction",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualWalletBehaviorParams {
            pub action: crate::generated::digital_credentials::VirtualWalletAction,
            pub protocol: Option<String>,
            pub response: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualWalletBehaviorResult;
    }

    pub mod events {
    }
}

pub mod emulation {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScreenOrientationTypePropertyEnum {
        PortraitPrimary,
        PortraitSecondary,
        LandscapePrimary,
        LandscapeSecondary,
    }

    impl ScreenOrientationTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::PortraitPrimary => "portraitPrimary",
                Self::PortraitSecondary => "portraitSecondary",
                Self::LandscapePrimary => "landscapePrimary",
                Self::LandscapeSecondary => "landscapeSecondary",
            }
        }
    }

    impl AsRef<str> for ScreenOrientationTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScreenOrientationTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "portraitPrimary" => Ok(Self::PortraitPrimary),
                "portraitSecondary" => Ok(Self::PortraitSecondary),
                "landscapePrimary" => Ok(Self::LandscapePrimary),
                "landscapeSecondary" => Ok(Self::LandscapeSecondary),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScreenOrientationTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DisplayFeatureOrientationPropertyEnum {
        Vertical,
        Horizontal,
    }

    impl DisplayFeatureOrientationPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Vertical => "vertical",
                Self::Horizontal => "horizontal",
            }
        }
    }

    impl AsRef<str> for DisplayFeatureOrientationPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DisplayFeatureOrientationPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "vertical" => Ok(Self::Vertical),
                "horizontal" => Ok(Self::Horizontal),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DisplayFeatureOrientationPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DevicePostureTypePropertyEnum {
        Continuous,
        Folded,
    }

    impl DevicePostureTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Continuous => "continuous",
                Self::Folded => "folded",
            }
        }
    }

    impl AsRef<str> for DevicePostureTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DevicePostureTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "continuous" => Ok(Self::Continuous),
                "folded" => Ok(Self::Folded),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DevicePostureTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SafeAreaInsets {
        pub top: Option<i64>,
        pub top_max: Option<i64>,
        pub left: Option<i64>,
        pub left_max: Option<i64>,
        pub bottom: Option<i64>,
        pub bottom_max: Option<i64>,
        pub right: Option<i64>,
        pub right_max: Option<i64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScreenOrientation {
        pub type_: crate::generated::emulation::ScreenOrientationTypePropertyEnum,
        pub angle: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DisplayFeature {
        pub orientation: crate::generated::emulation::DisplayFeatureOrientationPropertyEnum,
        pub offset: i64,
        pub mask_length: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DevicePosture {
        pub type_: crate::generated::emulation::DevicePostureTypePropertyEnum,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct MediaFeature {
        pub name: String,
        pub value: String,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum VirtualTimePolicy {
        Advance,
        Pause,
        PauseIfNetworkFetchesPending,
    }

    impl VirtualTimePolicy {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Advance => "advance",
                Self::Pause => "pause",
                Self::PauseIfNetworkFetchesPending => "pauseIfNetworkFetchesPending",
            }
        }
    }

    impl AsRef<str> for VirtualTimePolicy {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for VirtualTimePolicy {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "advance" => Ok(Self::Advance),
                "pause" => Ok(Self::Pause),
                "pauseIfNetworkFetchesPending" => Ok(Self::PauseIfNetworkFetchesPending),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "VirtualTimePolicy",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct UserAgentBrandVersion {
        pub brand: String,
        pub version: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct UserAgentMetadata {
        pub brands: Option<Vec<Box<crate::generated::emulation::UserAgentBrandVersion>>>,
        pub full_version_list: Option<Vec<Box<crate::generated::emulation::UserAgentBrandVersion>>>,
        pub full_version: Option<String>,
        pub platform: String,
        pub platform_version: String,
        pub architecture: String,
        pub model: String,
        pub mobile: bool,
        pub bitness: Option<String>,
        pub wow64: Option<bool>,
        pub form_factors: Option<Vec<String>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SensorType {
        AbsoluteOrientation,
        Accelerometer,
        AmbientLight,
        Gravity,
        Gyroscope,
        LinearAcceleration,
        Magnetometer,
        RelativeOrientation,
    }

    impl SensorType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AbsoluteOrientation => "absolute-orientation",
                Self::Accelerometer => "accelerometer",
                Self::AmbientLight => "ambient-light",
                Self::Gravity => "gravity",
                Self::Gyroscope => "gyroscope",
                Self::LinearAcceleration => "linear-acceleration",
                Self::Magnetometer => "magnetometer",
                Self::RelativeOrientation => "relative-orientation",
            }
        }
    }

    impl AsRef<str> for SensorType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SensorType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "absolute-orientation" => Ok(Self::AbsoluteOrientation),
                "accelerometer" => Ok(Self::Accelerometer),
                "ambient-light" => Ok(Self::AmbientLight),
                "gravity" => Ok(Self::Gravity),
                "gyroscope" => Ok(Self::Gyroscope),
                "linear-acceleration" => Ok(Self::LinearAcceleration),
                "magnetometer" => Ok(Self::Magnetometer),
                "relative-orientation" => Ok(Self::RelativeOrientation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SensorType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SensorMetadata {
        pub available: Option<bool>,
        pub minimum_frequency: Option<f64>,
        pub maximum_frequency: Option<f64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SensorReadingSingle {
        pub value: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SensorReadingXYZ {
        pub x: f64,
        pub y: f64,
        pub z: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SensorReadingQuaternion {
        pub x: f64,
        pub y: f64,
        pub z: f64,
        pub w: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SensorReading {
        pub single: Option<Box<crate::generated::emulation::SensorReadingSingle>>,
        pub xyz: Option<Box<crate::generated::emulation::SensorReadingXYZ>>,
        pub quaternion: Option<Box<crate::generated::emulation::SensorReadingQuaternion>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PressureSource {
        Cpu,
    }

    impl PressureSource {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Cpu => "cpu",
            }
        }
    }

    impl AsRef<str> for PressureSource {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PressureSource {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "cpu" => Ok(Self::Cpu),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PressureSource",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PressureState {
        Nominal,
        Fair,
        Serious,
        Critical,
    }

    impl PressureState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Nominal => "nominal",
                Self::Fair => "fair",
                Self::Serious => "serious",
                Self::Critical => "critical",
            }
        }
    }

    impl AsRef<str> for PressureState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PressureState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "nominal" => Ok(Self::Nominal),
                "fair" => Ok(Self::Fair),
                "serious" => Ok(Self::Serious),
                "critical" => Ok(Self::Critical),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PressureState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PressureMetadata {
        pub available: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WorkAreaInsets {
        pub top: Option<i64>,
        pub left: Option<i64>,
        pub bottom: Option<i64>,
        pub right: Option<i64>,
    }
    pub type ScreenId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScreenInfo {
        pub left: i64,
        pub top: i64,
        pub width: i64,
        pub height: i64,
        pub avail_left: i64,
        pub avail_top: i64,
        pub avail_width: i64,
        pub avail_height: i64,
        pub device_pixel_ratio: f64,
        pub orientation: Box<crate::generated::emulation::ScreenOrientation>,
        pub color_depth: i64,
        pub is_extended: bool,
        pub is_internal: bool,
        pub is_primary: bool,
        pub label: String,
        pub id: crate::generated::emulation::ScreenId,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DisabledImageType {
        Avif,
        Jxl,
        Webp,
    }

    impl DisabledImageType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Avif => "avif",
                Self::Jxl => "jxl",
                Self::Webp => "webp",
            }
        }
    }

    impl AsRef<str> for DisabledImageType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DisabledImageType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "avif" => Ok(Self::Avif),
                "jxl" => Ok(Self::Jxl),
                "webp" => Ok(Self::Webp),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DisabledImageType",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanEmulateParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanEmulateResult {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceMetricsOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceMetricsOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearGeolocationOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearGeolocationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetPageScaleFactorParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetPageScaleFactorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFocusEmulationEnabledParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFocusEmulationEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutoDarkModeOverrideParams {
            pub enabled: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutoDarkModeOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCPUThrottlingRateParams {
            pub rate: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCPUThrottlingRateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDefaultBackgroundColorOverrideParams {
            pub color: Option<Box<crate::generated::dom::RGBA>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDefaultBackgroundColorOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSafeAreaInsetsOverrideParams {
            pub insets: Box<crate::generated::emulation::SafeAreaInsets>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSafeAreaInsetsOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualKeyboardGeometryOverrideParams {
            pub keyboard_rect: Option<Box<crate::generated::dom::Rect>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualKeyboardGeometryOverrideResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetDeviceMetricsOverrideScrollbarTypeParamEnum {
            Overlay,
            Default,
        }

        impl SetDeviceMetricsOverrideScrollbarTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Overlay => "overlay",
                    Self::Default => "default",
                }
            }
        }

        impl AsRef<str> for SetDeviceMetricsOverrideScrollbarTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetDeviceMetricsOverrideScrollbarTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "overlay" => Ok(Self::Overlay),
                    "default" => Ok(Self::Default),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetDeviceMetricsOverrideScrollbarTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceMetricsOverrideParams {
            pub width: i64,
            pub height: i64,
            pub device_scale_factor: f64,
            pub mobile: bool,
            pub scale: Option<f64>,
            pub screen_width: Option<i64>,
            pub screen_height: Option<i64>,
            pub position_x: Option<i64>,
            pub position_y: Option<i64>,
            pub dont_set_visible_size: Option<bool>,
            pub screen_orientation: Option<Box<crate::generated::emulation::ScreenOrientation>>,
            pub viewport: Option<Box<crate::generated::page::Viewport>>,
            pub display_feature: Option<Box<crate::generated::emulation::DisplayFeature>>,
            pub device_posture: Option<Box<crate::generated::emulation::DevicePosture>>,
            pub scrollbar_type: Option<crate::generated::emulation::commands::SetDeviceMetricsOverrideScrollbarTypeParamEnum>,
            pub screen_orientation_lock_emulation: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceMetricsOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDevicePostureOverrideParams {
            pub posture: Box<crate::generated::emulation::DevicePosture>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDevicePostureOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDevicePostureOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDevicePostureOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDisplayFeaturesOverrideParams {
            pub features: Vec<Box<crate::generated::emulation::DisplayFeature>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDisplayFeaturesOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDisplayFeaturesOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDisplayFeaturesOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScrollbarsHiddenParams {
            pub hidden: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScrollbarsHiddenResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDocumentCookieDisabledParams {
            pub disabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDocumentCookieDisabledResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetEmitTouchEventsForMouseConfigurationParamEnum {
            Mobile,
            Desktop,
        }

        impl SetEmitTouchEventsForMouseConfigurationParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Mobile => "mobile",
                    Self::Desktop => "desktop",
                }
            }
        }

        impl AsRef<str> for SetEmitTouchEventsForMouseConfigurationParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetEmitTouchEventsForMouseConfigurationParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mobile" => Ok(Self::Mobile),
                    "desktop" => Ok(Self::Desktop),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetEmitTouchEventsForMouseConfigurationParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmitTouchEventsForMouseParams {
            pub enabled: bool,
            pub configuration: Option<crate::generated::emulation::commands::SetEmitTouchEventsForMouseConfigurationParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmitTouchEventsForMouseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedMediaParams {
            pub media: Option<String>,
            pub features: Option<Vec<Box<crate::generated::emulation::MediaFeature>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedMediaResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetEmulatedVisionDeficiencyTypeParamEnum {
            None,
            BlurredVision,
            ReducedContrast,
            Achromatopsia,
            Deuteranopia,
            Protanopia,
            Tritanopia,
        }

        impl SetEmulatedVisionDeficiencyTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::None => "none",
                    Self::BlurredVision => "blurredVision",
                    Self::ReducedContrast => "reducedContrast",
                    Self::Achromatopsia => "achromatopsia",
                    Self::Deuteranopia => "deuteranopia",
                    Self::Protanopia => "protanopia",
                    Self::Tritanopia => "tritanopia",
                }
            }
        }

        impl AsRef<str> for SetEmulatedVisionDeficiencyTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetEmulatedVisionDeficiencyTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "none" => Ok(Self::None),
                    "blurredVision" => Ok(Self::BlurredVision),
                    "reducedContrast" => Ok(Self::ReducedContrast),
                    "achromatopsia" => Ok(Self::Achromatopsia),
                    "deuteranopia" => Ok(Self::Deuteranopia),
                    "protanopia" => Ok(Self::Protanopia),
                    "tritanopia" => Ok(Self::Tritanopia),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetEmulatedVisionDeficiencyTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedVisionDeficiencyParams {
            pub type_: crate::generated::emulation::commands::SetEmulatedVisionDeficiencyTypeParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedVisionDeficiencyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedOSTextScaleParams {
            pub scale: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetEmulatedOSTextScaleResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetGeolocationOverrideParams {
            pub latitude: Option<f64>,
            pub longitude: Option<f64>,
            pub accuracy: Option<f64>,
            pub altitude: Option<f64>,
            pub altitude_accuracy: Option<f64>,
            pub heading: Option<f64>,
            pub speed: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetGeolocationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOverriddenSensorInformationParams {
            pub type_: crate::generated::emulation::SensorType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOverriddenSensorInformationResult {
            pub requested_sampling_frequency: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSensorOverrideEnabledParams {
            pub enabled: bool,
            pub type_: crate::generated::emulation::SensorType,
            pub metadata: Option<Box<crate::generated::emulation::SensorMetadata>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSensorOverrideEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSensorOverrideReadingsParams {
            pub type_: crate::generated::emulation::SensorType,
            pub reading: Box<crate::generated::emulation::SensorReading>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSensorOverrideReadingsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureSourceOverrideEnabledParams {
            pub enabled: bool,
            pub source: crate::generated::emulation::PressureSource,
            pub metadata: Option<Box<crate::generated::emulation::PressureMetadata>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureSourceOverrideEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureStateOverrideParams {
            pub source: crate::generated::emulation::PressureSource,
            pub state: crate::generated::emulation::PressureState,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureStateOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIdleOverrideParams {
            pub is_user_active: bool,
            pub is_screen_unlocked: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIdleOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearIdleOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearIdleOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNavigatorOverridesParams {
            pub platform: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetNavigatorOverridesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPageScaleFactorParams {
            pub page_scale_factor: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPageScaleFactorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScriptExecutionDisabledParams {
            pub value: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScriptExecutionDisabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTouchEmulationEnabledParams {
            pub enabled: bool,
            pub max_touch_points: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTouchEmulationEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualTimePolicyParams {
            pub policy: crate::generated::emulation::VirtualTimePolicy,
            pub budget: Option<f64>,
            pub max_virtual_time_task_starvation_count: Option<i64>,
            pub initial_virtual_time: Option<crate::generated::network::TimeSinceEpoch>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVirtualTimePolicyResult {
            pub virtual_time_ticks_base: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLocaleOverrideParams {
            pub locale: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLocaleOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimezoneOverrideParams {
            pub timezone_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimezoneOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVisibleSizeParams {
            pub width: i64,
            pub height: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVisibleSizeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDisabledImageTypesParams {
            pub image_types: Vec<crate::generated::emulation::DisabledImageType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDisabledImageTypesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDataSaverOverrideParams {
            pub data_saver_enabled: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDataSaverOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetHardwareConcurrencyOverrideParams {
            pub hardware_concurrency: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetHardwareConcurrencyOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserAgentOverrideParams {
            pub user_agent: String,
            pub accept_language: Option<String>,
            pub platform: Option<String>,
            pub user_agent_metadata: Option<Box<crate::generated::emulation::UserAgentMetadata>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserAgentOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutomationOverrideParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutomationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSmallViewportHeightDifferenceOverrideParams {
            pub difference: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSmallViewportHeightDifferenceOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetScreenInfosParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetScreenInfosResult {
            pub screen_infos: Vec<Box<crate::generated::emulation::ScreenInfo>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScreenParams {
            pub left: i64,
            pub top: i64,
            pub width: i64,
            pub height: i64,
            pub work_area_insets: Option<Box<crate::generated::emulation::WorkAreaInsets>>,
            pub device_pixel_ratio: Option<f64>,
            pub rotation: Option<i64>,
            pub color_depth: Option<i64>,
            pub label: Option<String>,
            pub is_internal: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScreenResult {
            pub screen_info: Box<crate::generated::emulation::ScreenInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UpdateScreenParams {
            pub screen_id: crate::generated::emulation::ScreenId,
            pub left: Option<i64>,
            pub top: Option<i64>,
            pub width: Option<i64>,
            pub height: Option<i64>,
            pub work_area_insets: Option<Box<crate::generated::emulation::WorkAreaInsets>>,
            pub device_pixel_ratio: Option<f64>,
            pub rotation: Option<i64>,
            pub color_depth: Option<i64>,
            pub label: Option<String>,
            pub is_internal: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UpdateScreenResult {
            pub screen_info: Box<crate::generated::emulation::ScreenInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScreenParams {
            pub screen_id: crate::generated::emulation::ScreenId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScreenResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPrimaryScreenParams {
            pub screen_id: crate::generated::emulation::ScreenId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPrimaryScreenResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct VirtualTimeBudgetExpiredEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreenOrientationLockChangedEvent {
            pub locked: bool,
            pub orientation: Option<Box<crate::generated::emulation::ScreenOrientation>>,
        }
    }
}

pub mod event_breakpoints {

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointParams {
            pub event_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveInstrumentationBreakpointParams {
            pub event_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveInstrumentationBreakpointResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
    }

    pub mod events {
    }
}

pub mod extensions {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StorageArea {
        Session,
        Local,
        Sync,
        Managed,
    }

    impl StorageArea {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Session => "session",
                Self::Local => "local",
                Self::Sync => "sync",
                Self::Managed => "managed",
            }
        }
    }

    impl AsRef<str> for StorageArea {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StorageArea {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "session" => Ok(Self::Session),
                "local" => Ok(Self::Local),
                "sync" => Ok(Self::Sync),
                "managed" => Ok(Self::Managed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StorageArea",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ExtensionInfo {
        pub id: String,
        pub name: String,
        pub version: String,
        pub path: String,
        pub enabled: bool,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct TriggerActionParams {
            pub id: String,
            pub target_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TriggerActionResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadUnpackedParams {
            pub path: String,
            pub enable_in_incognito: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadUnpackedResult {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetExtensionsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetExtensionsResult {
            pub extensions: Vec<Box<crate::generated::extensions::ExtensionInfo>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UninstallParams {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UninstallResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageItemsParams {
            pub id: String,
            pub storage_area: crate::generated::extensions::StorageArea,
            pub keys: Option<Vec<String>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageItemsResult {
            pub data: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveStorageItemsParams {
            pub id: String,
            pub storage_area: crate::generated::extensions::StorageArea,
            pub keys: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveStorageItemsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearStorageItemsParams {
            pub id: String,
            pub storage_area: crate::generated::extensions::StorageArea,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearStorageItemsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStorageItemsParams {
            pub id: String,
            pub storage_area: crate::generated::extensions::StorageArea,
            pub values: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStorageItemsResult;
    }

    pub mod events {
    }
}

pub mod fed_cm {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LoginState {
        SignIn,
        SignUp,
    }

    impl LoginState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SignIn => "SignIn",
                Self::SignUp => "SignUp",
            }
        }
    }

    impl AsRef<str> for LoginState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LoginState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SignIn" => Ok(Self::SignIn),
                "SignUp" => Ok(Self::SignUp),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LoginState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DialogType {
        AccountChooser,
        AutoReauthn,
        ConfirmIdpLogin,
        Error,
    }

    impl DialogType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AccountChooser => "AccountChooser",
                Self::AutoReauthn => "AutoReauthn",
                Self::ConfirmIdpLogin => "ConfirmIdpLogin",
                Self::Error => "Error",
            }
        }
    }

    impl AsRef<str> for DialogType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DialogType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "AccountChooser" => Ok(Self::AccountChooser),
                "AutoReauthn" => Ok(Self::AutoReauthn),
                "ConfirmIdpLogin" => Ok(Self::ConfirmIdpLogin),
                "Error" => Ok(Self::Error),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DialogType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DialogButton {
        ConfirmIdpLoginContinue,
        ErrorGotIt,
        ErrorMoreDetails,
    }

    impl DialogButton {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ConfirmIdpLoginContinue => "ConfirmIdpLoginContinue",
                Self::ErrorGotIt => "ErrorGotIt",
                Self::ErrorMoreDetails => "ErrorMoreDetails",
            }
        }
    }

    impl AsRef<str> for DialogButton {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DialogButton {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ConfirmIdpLoginContinue" => Ok(Self::ConfirmIdpLoginContinue),
                "ErrorGotIt" => Ok(Self::ErrorGotIt),
                "ErrorMoreDetails" => Ok(Self::ErrorMoreDetails),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DialogButton",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AccountUrlType {
        TermsOfService,
        PrivacyPolicy,
    }

    impl AccountUrlType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::TermsOfService => "TermsOfService",
                Self::PrivacyPolicy => "PrivacyPolicy",
            }
        }
    }

    impl AsRef<str> for AccountUrlType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AccountUrlType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "TermsOfService" => Ok(Self::TermsOfService),
                "PrivacyPolicy" => Ok(Self::PrivacyPolicy),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AccountUrlType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Account {
        pub account_id: String,
        pub email: String,
        pub name: String,
        pub given_name: String,
        pub picture_url: String,
        pub idp_config_url: String,
        pub idp_login_url: String,
        pub login_state: crate::generated::fed_cm::LoginState,
        pub terms_of_service_url: Option<String>,
        pub privacy_policy_url: Option<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub disable_rejection_delay: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SelectAccountParams {
            pub dialog_id: String,
            pub account_index: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SelectAccountResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClickDialogButtonParams {
            pub dialog_id: String,
            pub dialog_button: crate::generated::fed_cm::DialogButton,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClickDialogButtonResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenUrlParams {
            pub dialog_id: String,
            pub account_index: i64,
            pub account_url_type: crate::generated::fed_cm::AccountUrlType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenUrlResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DismissDialogParams {
            pub dialog_id: String,
            pub trigger_cooldown: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DismissDialogResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetCooldownParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetCooldownResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DialogShownEvent {
            pub dialog_id: String,
            pub dialog_type: crate::generated::fed_cm::DialogType,
            pub accounts: Vec<Box<crate::generated::fed_cm::Account>>,
            pub title: String,
            pub subtitle: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DialogClosedEvent {
            pub dialog_id: String,
        }
    }
}

pub mod fetch {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthChallengeSourcePropertyEnum {
        Server,
        Proxy,
    }

    impl AuthChallengeSourcePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Server => "Server",
                Self::Proxy => "Proxy",
            }
        }
    }

    impl AsRef<str> for AuthChallengeSourcePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthChallengeSourcePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Server" => Ok(Self::Server),
                "Proxy" => Ok(Self::Proxy),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthChallengeSourcePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthChallengeResponseResponsePropertyEnum {
        Default,
        CancelAuth,
        ProvideCredentials,
    }

    impl AuthChallengeResponseResponsePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Default => "Default",
                Self::CancelAuth => "CancelAuth",
                Self::ProvideCredentials => "ProvideCredentials",
            }
        }
    }

    impl AsRef<str> for AuthChallengeResponseResponsePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthChallengeResponseResponsePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Default" => Ok(Self::Default),
                "CancelAuth" => Ok(Self::CancelAuth),
                "ProvideCredentials" => Ok(Self::ProvideCredentials),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthChallengeResponseResponsePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type RequestId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RequestStage {
        Request,
        Response,
    }

    impl RequestStage {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Request => "Request",
                Self::Response => "Response",
            }
        }
    }

    impl AsRef<str> for RequestStage {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RequestStage {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Request" => Ok(Self::Request),
                "Response" => Ok(Self::Response),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RequestStage",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RequestPattern {
        pub url_pattern: Option<String>,
        pub resource_type: Option<crate::generated::network::ResourceType>,
        pub request_stage: Option<crate::generated::fetch::RequestStage>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct HeaderEntry {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AuthChallenge {
        pub source: Option<crate::generated::fetch::AuthChallengeSourcePropertyEnum>,
        pub origin: String,
        pub scheme: String,
        pub realm: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AuthChallengeResponse {
        pub response: crate::generated::fetch::AuthChallengeResponseResponsePropertyEnum,
        pub username: Option<String>,
        pub password: Option<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub patterns: Option<Vec<Box<crate::generated::fetch::RequestPattern>>>,
            pub handle_auth_requests: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct FailRequestParams {
            pub request_id: crate::generated::fetch::RequestId,
            pub error_reason: crate::generated::network::ErrorReason,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FailRequestResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct FulfillRequestParams {
            pub request_id: crate::generated::fetch::RequestId,
            pub response_code: i64,
            pub response_headers: Option<Vec<Box<crate::generated::fetch::HeaderEntry>>>,
            pub binary_response_headers: Option<String>,
            pub body: Option<String>,
            pub response_phrase: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FulfillRequestResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueRequestParams {
            pub request_id: crate::generated::fetch::RequestId,
            pub url: Option<String>,
            pub method: Option<String>,
            pub post_data: Option<String>,
            pub headers: Option<Vec<Box<crate::generated::fetch::HeaderEntry>>>,
            pub intercept_response: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueRequestResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueWithAuthParams {
            pub request_id: crate::generated::fetch::RequestId,
            pub auth_challenge_response: Box<crate::generated::fetch::AuthChallengeResponse>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueWithAuthResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueResponseParams {
            pub request_id: crate::generated::fetch::RequestId,
            pub response_code: Option<i64>,
            pub response_phrase: Option<String>,
            pub response_headers: Option<Vec<Box<crate::generated::fetch::HeaderEntry>>>,
            pub binary_response_headers: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueResponseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResponseBodyParams {
            pub request_id: crate::generated::fetch::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResponseBodyResult {
            pub body: String,
            pub base64_encoded: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeResponseBodyAsStreamParams {
            pub request_id: crate::generated::fetch::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeResponseBodyAsStreamResult {
            pub stream: crate::generated::io::StreamHandle,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestPausedEvent {
            pub request_id: crate::generated::fetch::RequestId,
            pub request: Box<crate::generated::network::Request>,
            pub frame_id: crate::generated::page::FrameId,
            pub resource_type: crate::generated::network::ResourceType,
            pub response_error_reason: Option<crate::generated::network::ErrorReason>,
            pub response_status_code: Option<i64>,
            pub response_status_text: Option<String>,
            pub response_headers: Option<Vec<Box<crate::generated::fetch::HeaderEntry>>>,
            pub network_id: Option<crate::generated::network::RequestId>,
            pub redirected_request_id: Option<crate::generated::fetch::RequestId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AuthRequiredEvent {
            pub request_id: crate::generated::fetch::RequestId,
            pub request: Box<crate::generated::network::Request>,
            pub frame_id: crate::generated::page::FrameId,
            pub resource_type: crate::generated::network::ResourceType,
            pub auth_challenge: Box<crate::generated::fetch::AuthChallenge>,
        }
    }
}

pub mod file_system {
    #[derive(Clone, Debug, PartialEq)]
    pub struct File {
        pub name: String,
        pub last_modified: crate::generated::network::TimeSinceEpoch,
        pub size: f64,
        pub type_: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Directory {
        pub name: String,
        pub nested_directories: Vec<String>,
        pub nested_files: Vec<Box<crate::generated::file_system::File>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BucketFileSystemLocator {
        pub storage_key: crate::generated::storage::SerializedStorageKey,
        pub bucket_name: Option<String>,
        pub path_components: Vec<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDirectoryParams {
            pub bucket_file_system_locator: Box<crate::generated::file_system::BucketFileSystemLocator>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDirectoryResult {
            pub directory: Box<crate::generated::file_system::Directory>,
        }
    }

    pub mod events {
    }
}

pub mod headless_experimental {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScreenshotParamsFormatPropertyEnum {
        Jpeg,
        Png,
        Webp,
    }

    impl ScreenshotParamsFormatPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Jpeg => "jpeg",
                Self::Png => "png",
                Self::Webp => "webp",
            }
        }
    }

    impl AsRef<str> for ScreenshotParamsFormatPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScreenshotParamsFormatPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "jpeg" => Ok(Self::Jpeg),
                "png" => Ok(Self::Png),
                "webp" => Ok(Self::Webp),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScreenshotParamsFormatPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScreenshotParams {
        pub format: Option<crate::generated::headless_experimental::ScreenshotParamsFormatPropertyEnum>,
        pub quality: Option<i64>,
        pub optimize_for_speed: Option<bool>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct BeginFrameParams {
            pub frame_time_ticks: Option<f64>,
            pub interval: Option<f64>,
            pub no_display_updates: Option<bool>,
            pub screenshot: Option<Box<crate::generated::headless_experimental::ScreenshotParams>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BeginFrameResult {
            pub has_damage: bool,
            pub screenshot_data: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
    }

    pub mod events {
    }
}

pub mod io {
    pub type StreamHandle = String;

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseParams {
            pub handle: crate::generated::io::StreamHandle,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReadParams {
            pub handle: crate::generated::io::StreamHandle,
            pub offset: Option<i64>,
            pub size: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReadResult {
            pub base64_encoded: Option<bool>,
            pub data: String,
            pub eof: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveBlobParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResolveBlobResult {
            pub uuid: String,
        }
    }

    pub mod events {
    }
}

pub mod indexed_db {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum KeyTypePropertyEnum {
        Number,
        String,
        Date,
        Array,
    }

    impl KeyTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Number => "number",
                Self::String => "string",
                Self::Date => "date",
                Self::Array => "array",
            }
        }
    }

    impl AsRef<str> for KeyTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for KeyTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "number" => Ok(Self::Number),
                "string" => Ok(Self::String),
                "date" => Ok(Self::Date),
                "array" => Ok(Self::Array),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "KeyTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum KeyPathTypePropertyEnum {
        Null,
        String,
        Array,
    }

    impl KeyPathTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Null => "null",
                Self::String => "string",
                Self::Array => "array",
            }
        }
    }

    impl AsRef<str> for KeyPathTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for KeyPathTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "null" => Ok(Self::Null),
                "string" => Ok(Self::String),
                "array" => Ok(Self::Array),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "KeyPathTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DatabaseWithObjectStores {
        pub name: String,
        pub version: f64,
        pub object_stores: Vec<Box<crate::generated::indexed_db::ObjectStore>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ObjectStore {
        pub name: String,
        pub key_path: Box<crate::generated::indexed_db::KeyPath>,
        pub auto_increment: bool,
        pub indexes: Vec<Box<crate::generated::indexed_db::ObjectStoreIndex>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ObjectStoreIndex {
        pub name: String,
        pub key_path: Box<crate::generated::indexed_db::KeyPath>,
        pub unique: bool,
        pub multi_entry: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Key {
        pub type_: crate::generated::indexed_db::KeyTypePropertyEnum,
        pub number: Option<f64>,
        pub string: Option<String>,
        pub date: Option<f64>,
        pub array: Option<Vec<Box<crate::generated::indexed_db::Key>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct KeyRange {
        pub lower: Option<Box<crate::generated::indexed_db::Key>>,
        pub upper: Option<Box<crate::generated::indexed_db::Key>>,
        pub lower_open: bool,
        pub upper_open: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DataEntry {
        pub key: Box<crate::generated::runtime::RemoteObject>,
        pub primary_key: Box<crate::generated::runtime::RemoteObject>,
        pub value: Box<crate::generated::runtime::RemoteObject>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct KeyPath {
        pub type_: crate::generated::indexed_db::KeyPathTypePropertyEnum,
        pub string: Option<String>,
        pub array: Option<Vec<String>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearObjectStoreParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
            pub object_store_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearObjectStoreResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteDatabaseParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteDatabaseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteObjectStoreEntriesParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
            pub object_store_name: String,
            pub key_range: Box<crate::generated::indexed_db::KeyRange>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteObjectStoreEntriesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDataParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
            pub object_store_name: String,
            pub index_name: Option<String>,
            pub skip_count: i64,
            pub page_size: i64,
            pub key_range: Option<Box<crate::generated::indexed_db::KeyRange>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDataResult {
            pub object_store_data_entries: Vec<Box<crate::generated::indexed_db::DataEntry>>,
            pub has_more: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMetadataParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
            pub object_store_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMetadataResult {
            pub entries_count: f64,
            pub key_generator_value: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDatabaseParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
            pub database_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDatabaseResult {
            pub database_with_object_stores: Box<crate::generated::indexed_db::DatabaseWithObjectStores>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDatabaseNamesParams {
            pub security_origin: Option<String>,
            pub storage_key: Option<String>,
            pub storage_bucket: Option<Box<crate::generated::storage::StorageBucket>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestDatabaseNamesResult {
            pub database_names: Vec<String>,
        }
    }

    pub mod events {
    }
}

pub mod input {
    #[derive(Clone, Debug, PartialEq)]
    pub struct TouchPoint {
        pub x: f64,
        pub y: f64,
        pub radius_x: Option<f64>,
        pub radius_y: Option<f64>,
        pub rotation_angle: Option<f64>,
        pub force: Option<f64>,
        pub tangential_pressure: Option<f64>,
        pub tilt_x: Option<f64>,
        pub tilt_y: Option<f64>,
        pub twist: Option<i64>,
        pub id: Option<f64>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum GestureSourceType {
        Default,
        Touch,
        Mouse,
    }

    impl GestureSourceType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Default => "default",
                Self::Touch => "touch",
                Self::Mouse => "mouse",
            }
        }
    }

    impl AsRef<str> for GestureSourceType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for GestureSourceType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "default" => Ok(Self::Default),
                "touch" => Ok(Self::Touch),
                "mouse" => Ok(Self::Mouse),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "GestureSourceType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum MouseButton {
        None,
        Left,
        Middle,
        Right,
        Back,
        Forward,
    }

    impl MouseButton {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "none",
                Self::Left => "left",
                Self::Middle => "middle",
                Self::Right => "right",
                Self::Back => "back",
                Self::Forward => "forward",
            }
        }
    }

    impl AsRef<str> for MouseButton {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for MouseButton {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "none" => Ok(Self::None),
                "left" => Ok(Self::Left),
                "middle" => Ok(Self::Middle),
                "right" => Ok(Self::Right),
                "back" => Ok(Self::Back),
                "forward" => Ok(Self::Forward),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "MouseButton",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type TimeSinceEpoch = f64;
    #[derive(Clone, Debug, PartialEq)]
    pub struct DragDataItem {
        pub mime_type: String,
        pub data: String,
        pub title: Option<String>,
        pub base_url: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DragData {
        pub items: Vec<Box<crate::generated::input::DragDataItem>>,
        pub files: Option<Vec<String>>,
        pub drag_operations_mask: i64,
    }

    pub mod commands {
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DispatchDragEventTypeParamEnum {
            DragEnter,
            DragOver,
            Drop,
            DragCancel,
        }

        impl DispatchDragEventTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::DragEnter => "dragEnter",
                    Self::DragOver => "dragOver",
                    Self::Drop => "drop",
                    Self::DragCancel => "dragCancel",
                }
            }
        }

        impl AsRef<str> for DispatchDragEventTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DispatchDragEventTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "dragEnter" => Ok(Self::DragEnter),
                    "dragOver" => Ok(Self::DragOver),
                    "drop" => Ok(Self::Drop),
                    "dragCancel" => Ok(Self::DragCancel),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DispatchDragEventTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchDragEventParams {
            pub type_: crate::generated::input::commands::DispatchDragEventTypeParamEnum,
            pub x: f64,
            pub y: f64,
            pub data: Box<crate::generated::input::DragData>,
            pub modifiers: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchDragEventResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DispatchKeyEventTypeParamEnum {
            KeyDown,
            KeyUp,
            RawKeyDown,
            Char,
        }

        impl DispatchKeyEventTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::KeyDown => "keyDown",
                    Self::KeyUp => "keyUp",
                    Self::RawKeyDown => "rawKeyDown",
                    Self::Char => "char",
                }
            }
        }

        impl AsRef<str> for DispatchKeyEventTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DispatchKeyEventTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "keyDown" => Ok(Self::KeyDown),
                    "keyUp" => Ok(Self::KeyUp),
                    "rawKeyDown" => Ok(Self::RawKeyDown),
                    "char" => Ok(Self::Char),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DispatchKeyEventTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchKeyEventParams {
            pub type_: crate::generated::input::commands::DispatchKeyEventTypeParamEnum,
            pub modifiers: Option<i64>,
            pub timestamp: Option<crate::generated::input::TimeSinceEpoch>,
            pub text: Option<String>,
            pub unmodified_text: Option<String>,
            pub key_identifier: Option<String>,
            pub code: Option<String>,
            pub key: Option<String>,
            pub windows_virtual_key_code: Option<i64>,
            pub native_virtual_key_code: Option<i64>,
            pub auto_repeat: Option<bool>,
            pub is_keypad: Option<bool>,
            pub is_system_key: Option<bool>,
            pub location: Option<i64>,
            pub commands: Option<Vec<String>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchKeyEventResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct InsertTextParams {
            pub text: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InsertTextResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ImeSetCompositionParams {
            pub text: String,
            pub selection_start: i64,
            pub selection_end: i64,
            pub replacement_start: Option<i64>,
            pub replacement_end: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ImeSetCompositionResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DispatchMouseEventTypeParamEnum {
            MousePressed,
            MouseReleased,
            MouseMoved,
            MouseWheel,
        }

        impl DispatchMouseEventTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::MousePressed => "mousePressed",
                    Self::MouseReleased => "mouseReleased",
                    Self::MouseMoved => "mouseMoved",
                    Self::MouseWheel => "mouseWheel",
                }
            }
        }

        impl AsRef<str> for DispatchMouseEventTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DispatchMouseEventTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mousePressed" => Ok(Self::MousePressed),
                    "mouseReleased" => Ok(Self::MouseReleased),
                    "mouseMoved" => Ok(Self::MouseMoved),
                    "mouseWheel" => Ok(Self::MouseWheel),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DispatchMouseEventTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DispatchMouseEventPointerTypeParamEnum {
            Mouse,
            Pen,
        }

        impl DispatchMouseEventPointerTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Mouse => "mouse",
                    Self::Pen => "pen",
                }
            }
        }

        impl AsRef<str> for DispatchMouseEventPointerTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DispatchMouseEventPointerTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mouse" => Ok(Self::Mouse),
                    "pen" => Ok(Self::Pen),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DispatchMouseEventPointerTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchMouseEventParams {
            pub type_: crate::generated::input::commands::DispatchMouseEventTypeParamEnum,
            pub x: f64,
            pub y: f64,
            pub modifiers: Option<i64>,
            pub timestamp: Option<crate::generated::input::TimeSinceEpoch>,
            pub button: Option<crate::generated::input::MouseButton>,
            pub buttons: Option<i64>,
            pub click_count: Option<i64>,
            pub force: Option<f64>,
            pub tangential_pressure: Option<f64>,
            pub tilt_x: Option<f64>,
            pub tilt_y: Option<f64>,
            pub twist: Option<i64>,
            pub delta_x: Option<f64>,
            pub delta_y: Option<f64>,
            pub pointer_type: Option<crate::generated::input::commands::DispatchMouseEventPointerTypeParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchMouseEventResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DispatchTouchEventTypeParamEnum {
            TouchStart,
            TouchEnd,
            TouchMove,
            TouchCancel,
        }

        impl DispatchTouchEventTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::TouchStart => "touchStart",
                    Self::TouchEnd => "touchEnd",
                    Self::TouchMove => "touchMove",
                    Self::TouchCancel => "touchCancel",
                }
            }
        }

        impl AsRef<str> for DispatchTouchEventTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DispatchTouchEventTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "touchStart" => Ok(Self::TouchStart),
                    "touchEnd" => Ok(Self::TouchEnd),
                    "touchMove" => Ok(Self::TouchMove),
                    "touchCancel" => Ok(Self::TouchCancel),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DispatchTouchEventTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchTouchEventParams {
            pub type_: crate::generated::input::commands::DispatchTouchEventTypeParamEnum,
            pub touch_points: Vec<Box<crate::generated::input::TouchPoint>>,
            pub modifiers: Option<i64>,
            pub timestamp: Option<crate::generated::input::TimeSinceEpoch>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchTouchEventResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelDraggingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelDraggingResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum EmulateTouchFromMouseEventTypeParamEnum {
            MousePressed,
            MouseReleased,
            MouseMoved,
            MouseWheel,
        }

        impl EmulateTouchFromMouseEventTypeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::MousePressed => "mousePressed",
                    Self::MouseReleased => "mouseReleased",
                    Self::MouseMoved => "mouseMoved",
                    Self::MouseWheel => "mouseWheel",
                }
            }
        }

        impl AsRef<str> for EmulateTouchFromMouseEventTypeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for EmulateTouchFromMouseEventTypeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mousePressed" => Ok(Self::MousePressed),
                    "mouseReleased" => Ok(Self::MouseReleased),
                    "mouseMoved" => Ok(Self::MouseMoved),
                    "mouseWheel" => Ok(Self::MouseWheel),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "EmulateTouchFromMouseEventTypeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateTouchFromMouseEventParams {
            pub type_: crate::generated::input::commands::EmulateTouchFromMouseEventTypeParamEnum,
            pub x: i64,
            pub y: i64,
            pub button: crate::generated::input::MouseButton,
            pub timestamp: Option<crate::generated::input::TimeSinceEpoch>,
            pub delta_x: Option<f64>,
            pub delta_y: Option<f64>,
            pub modifiers: Option<i64>,
            pub click_count: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateTouchFromMouseEventResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIgnoreInputEventsParams {
            pub ignore: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIgnoreInputEventsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInterceptDragsParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInterceptDragsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizePinchGestureParams {
            pub x: f64,
            pub y: f64,
            pub scale_factor: f64,
            pub relative_speed: Option<i64>,
            pub gesture_source_type: Option<crate::generated::input::GestureSourceType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizePinchGestureResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizeScrollGestureParams {
            pub x: f64,
            pub y: f64,
            pub x_distance: Option<f64>,
            pub y_distance: Option<f64>,
            pub x_overscroll: Option<f64>,
            pub y_overscroll: Option<f64>,
            pub prevent_fling: Option<bool>,
            pub speed: Option<i64>,
            pub gesture_source_type: Option<crate::generated::input::GestureSourceType>,
            pub repeat_count: Option<i64>,
            pub repeat_delay_ms: Option<i64>,
            pub interaction_marker_name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizeScrollGestureResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizeTapGestureParams {
            pub x: f64,
            pub y: f64,
            pub duration: Option<i64>,
            pub tap_count: Option<i64>,
            pub gesture_source_type: Option<crate::generated::input::GestureSourceType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SynthesizeTapGestureResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DragInterceptedEvent {
            pub data: Box<crate::generated::input::DragData>,
        }
    }
}

pub mod inspector {

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DetachedEvent {
            pub reason: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetCrashedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetReloadedAfterCrashEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct WorkerScriptLoadedEvent;
    }
}

pub mod layer_tree {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScrollRectTypePropertyEnum {
        RepaintsOnScroll,
        TouchEventHandler,
        WheelEventHandler,
    }

    impl ScrollRectTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::RepaintsOnScroll => "RepaintsOnScroll",
                Self::TouchEventHandler => "TouchEventHandler",
                Self::WheelEventHandler => "WheelEventHandler",
            }
        }
    }

    impl AsRef<str> for ScrollRectTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScrollRectTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "RepaintsOnScroll" => Ok(Self::RepaintsOnScroll),
                "TouchEventHandler" => Ok(Self::TouchEventHandler),
                "WheelEventHandler" => Ok(Self::WheelEventHandler),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScrollRectTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type LayerId = String;
    pub type SnapshotId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScrollRect {
        pub rect: Box<crate::generated::dom::Rect>,
        pub type_: crate::generated::layer_tree::ScrollRectTypePropertyEnum,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StickyPositionConstraint {
        pub sticky_box_rect: Box<crate::generated::dom::Rect>,
        pub containing_block_rect: Box<crate::generated::dom::Rect>,
        pub nearest_layer_shifting_sticky_box: Option<crate::generated::layer_tree::LayerId>,
        pub nearest_layer_shifting_containing_block: Option<crate::generated::layer_tree::LayerId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PictureTile {
        pub x: f64,
        pub y: f64,
        pub picture: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Layer {
        pub layer_id: crate::generated::layer_tree::LayerId,
        pub parent_layer_id: Option<crate::generated::layer_tree::LayerId>,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub offset_x: f64,
        pub offset_y: f64,
        pub width: f64,
        pub height: f64,
        pub transform: Option<Vec<f64>>,
        pub anchor_x: Option<f64>,
        pub anchor_y: Option<f64>,
        pub anchor_z: Option<f64>,
        pub paint_count: i64,
        pub draws_content: bool,
        pub invisible: Option<bool>,
        pub scroll_rects: Option<Vec<Box<crate::generated::layer_tree::ScrollRect>>>,
        pub sticky_position_constraint: Option<Box<crate::generated::layer_tree::StickyPositionConstraint>>,
    }
    pub type PaintProfile = Vec<f64>;

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CompositingReasonsParams {
            pub layer_id: crate::generated::layer_tree::LayerId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CompositingReasonsResult {
            pub compositing_reasons: Vec<String>,
            pub compositing_reason_ids: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadSnapshotParams {
            pub tiles: Vec<Box<crate::generated::layer_tree::PictureTile>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadSnapshotResult {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct MakeSnapshotParams {
            pub layer_id: crate::generated::layer_tree::LayerId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct MakeSnapshotResult {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ProfileSnapshotParams {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
            pub min_repeat_count: Option<i64>,
            pub min_duration: Option<f64>,
            pub clip_rect: Option<Box<crate::generated::dom::Rect>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ProfileSnapshotResult {
            pub timings: Vec<crate::generated::layer_tree::PaintProfile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseSnapshotParams {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseSnapshotResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReplaySnapshotParams {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
            pub from_step: Option<i64>,
            pub to_step: Option<i64>,
            pub scale: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReplaySnapshotResult {
            pub data_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SnapshotCommandLogParams {
            pub snapshot_id: crate::generated::layer_tree::SnapshotId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SnapshotCommandLogResult {
            pub command_log: Vec<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct LayerPaintedEvent {
            pub layer_id: crate::generated::layer_tree::LayerId,
            pub clip: Box<crate::generated::dom::Rect>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LayerTreeDidChangeEvent {
            pub layers: Option<Vec<Box<crate::generated::layer_tree::Layer>>>,
        }
    }
}

pub mod log {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LogEntrySourcePropertyEnum {
        Xml,
        Javascript,
        Network,
        Storage,
        Appcache,
        Rendering,
        Security,
        Deprecation,
        Worker,
        Violation,
        Intervention,
        Recommendation,
        Other,
    }

    impl LogEntrySourcePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Xml => "xml",
                Self::Javascript => "javascript",
                Self::Network => "network",
                Self::Storage => "storage",
                Self::Appcache => "appcache",
                Self::Rendering => "rendering",
                Self::Security => "security",
                Self::Deprecation => "deprecation",
                Self::Worker => "worker",
                Self::Violation => "violation",
                Self::Intervention => "intervention",
                Self::Recommendation => "recommendation",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for LogEntrySourcePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LogEntrySourcePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "xml" => Ok(Self::Xml),
                "javascript" => Ok(Self::Javascript),
                "network" => Ok(Self::Network),
                "storage" => Ok(Self::Storage),
                "appcache" => Ok(Self::Appcache),
                "rendering" => Ok(Self::Rendering),
                "security" => Ok(Self::Security),
                "deprecation" => Ok(Self::Deprecation),
                "worker" => Ok(Self::Worker),
                "violation" => Ok(Self::Violation),
                "intervention" => Ok(Self::Intervention),
                "recommendation" => Ok(Self::Recommendation),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LogEntrySourcePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LogEntryLevelPropertyEnum {
        Verbose,
        Info,
        Warning,
        Error,
    }

    impl LogEntryLevelPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Verbose => "verbose",
                Self::Info => "info",
                Self::Warning => "warning",
                Self::Error => "error",
            }
        }
    }

    impl AsRef<str> for LogEntryLevelPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LogEntryLevelPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "verbose" => Ok(Self::Verbose),
                "info" => Ok(Self::Info),
                "warning" => Ok(Self::Warning),
                "error" => Ok(Self::Error),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LogEntryLevelPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LogEntryCategoryPropertyEnum {
        Cors,
    }

    impl LogEntryCategoryPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Cors => "cors",
            }
        }
    }

    impl AsRef<str> for LogEntryCategoryPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LogEntryCategoryPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "cors" => Ok(Self::Cors),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LogEntryCategoryPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ViolationSettingNamePropertyEnum {
        LongTask,
        LongLayout,
        BlockedEvent,
        BlockedParser,
        DiscouragedAPIUse,
        Handler,
        RecurringHandler,
    }

    impl ViolationSettingNamePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::LongTask => "longTask",
                Self::LongLayout => "longLayout",
                Self::BlockedEvent => "blockedEvent",
                Self::BlockedParser => "blockedParser",
                Self::DiscouragedAPIUse => "discouragedAPIUse",
                Self::Handler => "handler",
                Self::RecurringHandler => "recurringHandler",
            }
        }
    }

    impl AsRef<str> for ViolationSettingNamePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ViolationSettingNamePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "longTask" => Ok(Self::LongTask),
                "longLayout" => Ok(Self::LongLayout),
                "blockedEvent" => Ok(Self::BlockedEvent),
                "blockedParser" => Ok(Self::BlockedParser),
                "discouragedAPIUse" => Ok(Self::DiscouragedAPIUse),
                "handler" => Ok(Self::Handler),
                "recurringHandler" => Ok(Self::RecurringHandler),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ViolationSettingNamePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LogEntry {
        pub source: crate::generated::log::LogEntrySourcePropertyEnum,
        pub level: crate::generated::log::LogEntryLevelPropertyEnum,
        pub text: String,
        pub category: Option<crate::generated::log::LogEntryCategoryPropertyEnum>,
        pub timestamp: crate::generated::runtime::Timestamp,
        pub url: Option<String>,
        pub line_number: Option<i64>,
        pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
        pub network_request_id: Option<crate::generated::network::RequestId>,
        pub worker_id: Option<String>,
        pub args: Option<Vec<Box<crate::generated::runtime::RemoteObject>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ViolationSetting {
        pub name: crate::generated::log::ViolationSettingNamePropertyEnum,
        pub threshold: f64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartViolationsReportParams {
            pub config: Vec<Box<crate::generated::log::ViolationSetting>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartViolationsReportResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopViolationsReportParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopViolationsReportResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EntryAddedEvent {
            pub entry: Box<crate::generated::log::LogEntry>,
        }
    }
}

pub mod media {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PlayerMessageLevelPropertyEnum {
        Error,
        Warning,
        Info,
        Debug,
    }

    impl PlayerMessageLevelPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Error => "error",
                Self::Warning => "warning",
                Self::Info => "info",
                Self::Debug => "debug",
            }
        }
    }

    impl AsRef<str> for PlayerMessageLevelPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PlayerMessageLevelPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "error" => Ok(Self::Error),
                "warning" => Ok(Self::Warning),
                "info" => Ok(Self::Info),
                "debug" => Ok(Self::Debug),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PlayerMessageLevelPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type PlayerId = String;
    pub type Timestamp = f64;
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlayerMessage {
        pub level: crate::generated::media::PlayerMessageLevelPropertyEnum,
        pub message: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlayerProperty {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlayerEvent {
        pub timestamp: crate::generated::media::Timestamp,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlayerErrorSourceLocation {
        pub file: String,
        pub line: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PlayerError {
        pub error_type: String,
        pub code: i64,
        pub stack: Vec<Box<crate::generated::media::PlayerErrorSourceLocation>>,
        pub cause: Vec<Box<crate::generated::media::PlayerError>>,
        pub data: std::collections::BTreeMap<String, crate::generated::JsonValue>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Player {
        pub player_id: crate::generated::media::PlayerId,
        pub dom_node_id: Option<crate::generated::dom::BackendNodeId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct PlayerPropertiesChangedEvent {
            pub player_id: crate::generated::media::PlayerId,
            pub properties: Vec<Box<crate::generated::media::PlayerProperty>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PlayerEventsAddedEvent {
            pub player_id: crate::generated::media::PlayerId,
            pub events: Vec<Box<crate::generated::media::PlayerEvent>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PlayerMessagesLoggedEvent {
            pub player_id: crate::generated::media::PlayerId,
            pub messages: Vec<Box<crate::generated::media::PlayerMessage>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PlayerErrorsRaisedEvent {
            pub player_id: crate::generated::media::PlayerId,
            pub errors: Vec<Box<crate::generated::media::PlayerError>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PlayerCreatedEvent {
            pub player: Box<crate::generated::media::Player>,
        }
    }
}

pub mod memory {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PressureLevel {
        Moderate,
        Critical,
    }

    impl PressureLevel {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Moderate => "moderate",
                Self::Critical => "critical",
            }
        }
    }

    impl AsRef<str> for PressureLevel {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PressureLevel {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "moderate" => Ok(Self::Moderate),
                "critical" => Ok(Self::Critical),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PressureLevel",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SamplingProfileNode {
        pub size: f64,
        pub total: f64,
        pub stack: Vec<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SamplingProfile {
        pub samples: Vec<Box<crate::generated::memory::SamplingProfileNode>>,
        pub modules: Vec<Box<crate::generated::memory::Module>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Module {
        pub name: String,
        pub uuid: String,
        pub base_address: String,
        pub size: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DOMCounter {
        pub name: String,
        pub count: i64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMCountersParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMCountersResult {
            pub documents: i64,
            pub nodes: i64,
            pub js_event_listeners: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMCountersForLeakDetectionParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDOMCountersForLeakDetectionResult {
            pub counters: Vec<Box<crate::generated::memory::DOMCounter>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrepareForLeakDetectionParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrepareForLeakDetectionResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForciblyPurgeJavaScriptMemoryParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ForciblyPurgeJavaScriptMemoryResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureNotificationsSuppressedParams {
            pub suppressed: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPressureNotificationsSuppressedResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulatePressureNotificationParams {
            pub level: crate::generated::memory::PressureLevel,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SimulatePressureNotificationResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartSamplingParams {
            pub sampling_interval: Option<i64>,
            pub suppress_randomness: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartSamplingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopSamplingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopSamplingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAllTimeSamplingProfileParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAllTimeSamplingProfileResult {
            pub profile: Box<crate::generated::memory::SamplingProfile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserSamplingProfileParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserSamplingProfileResult {
            pub profile: Box<crate::generated::memory::SamplingProfile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSamplingProfileParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSamplingProfileResult {
            pub profile: Box<crate::generated::memory::SamplingProfile>,
        }
    }

    pub mod events {
    }
}

pub mod network {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RequestReferrerPolicyPropertyEnum {
        UnsafeUrl,
        NoReferrerWhenDowngrade,
        NoReferrer,
        Origin,
        OriginWhenCrossOrigin,
        SameOrigin,
        StrictOrigin,
        StrictOriginWhenCrossOrigin,
    }

    impl RequestReferrerPolicyPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::UnsafeUrl => "unsafe-url",
                Self::NoReferrerWhenDowngrade => "no-referrer-when-downgrade",
                Self::NoReferrer => "no-referrer",
                Self::Origin => "origin",
                Self::OriginWhenCrossOrigin => "origin-when-cross-origin",
                Self::SameOrigin => "same-origin",
                Self::StrictOrigin => "strict-origin",
                Self::StrictOriginWhenCrossOrigin => "strict-origin-when-cross-origin",
            }
        }
    }

    impl AsRef<str> for RequestReferrerPolicyPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RequestReferrerPolicyPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "unsafe-url" => Ok(Self::UnsafeUrl),
                "no-referrer-when-downgrade" => Ok(Self::NoReferrerWhenDowngrade),
                "no-referrer" => Ok(Self::NoReferrer),
                "origin" => Ok(Self::Origin),
                "origin-when-cross-origin" => Ok(Self::OriginWhenCrossOrigin),
                "same-origin" => Ok(Self::SameOrigin),
                "strict-origin" => Ok(Self::StrictOrigin),
                "strict-origin-when-cross-origin" => Ok(Self::StrictOriginWhenCrossOrigin),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RequestReferrerPolicyPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TrustTokenParamsRefreshPolicyPropertyEnum {
        UseCached,
        Refresh,
    }

    impl TrustTokenParamsRefreshPolicyPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::UseCached => "UseCached",
                Self::Refresh => "Refresh",
            }
        }
    }

    impl AsRef<str> for TrustTokenParamsRefreshPolicyPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TrustTokenParamsRefreshPolicyPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "UseCached" => Ok(Self::UseCached),
                "Refresh" => Ok(Self::Refresh),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TrustTokenParamsRefreshPolicyPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum InitiatorTypePropertyEnum {
        Parser,
        Script,
        Preload,
        SignedExchange,
        Preflight,
        FedCM,
        Other,
    }

    impl InitiatorTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Parser => "parser",
                Self::Script => "script",
                Self::Preload => "preload",
                Self::SignedExchange => "SignedExchange",
                Self::Preflight => "preflight",
                Self::FedCM => "FedCM",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for InitiatorTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for InitiatorTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "parser" => Ok(Self::Parser),
                "script" => Ok(Self::Script),
                "preload" => Ok(Self::Preload),
                "SignedExchange" => Ok(Self::SignedExchange),
                "preflight" => Ok(Self::Preflight),
                "FedCM" => Ok(Self::FedCM),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "InitiatorTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthChallengeSourcePropertyEnum {
        Server,
        Proxy,
    }

    impl AuthChallengeSourcePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Server => "Server",
                Self::Proxy => "Proxy",
            }
        }
    }

    impl AsRef<str> for AuthChallengeSourcePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthChallengeSourcePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Server" => Ok(Self::Server),
                "Proxy" => Ok(Self::Proxy),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthChallengeSourcePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthChallengeResponseResponsePropertyEnum {
        Default,
        CancelAuth,
        ProvideCredentials,
    }

    impl AuthChallengeResponseResponsePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Default => "Default",
                Self::CancelAuth => "CancelAuth",
                Self::ProvideCredentials => "ProvideCredentials",
            }
        }
    }

    impl AsRef<str> for AuthChallengeResponseResponsePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthChallengeResponseResponsePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Default" => Ok(Self::Default),
                "CancelAuth" => Ok(Self::CancelAuth),
                "ProvideCredentials" => Ok(Self::ProvideCredentials),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthChallengeResponseResponsePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DeviceBoundSessionWithUsageUsagePropertyEnum {
        NotInScope,
        InScopeRefreshNotYetNeeded,
        InScopeRefreshNotAllowed,
        ProactiveRefreshNotPossible,
        ProactiveRefreshAttempted,
        Deferred,
    }

    impl DeviceBoundSessionWithUsageUsagePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::NotInScope => "NotInScope",
                Self::InScopeRefreshNotYetNeeded => "InScopeRefreshNotYetNeeded",
                Self::InScopeRefreshNotAllowed => "InScopeRefreshNotAllowed",
                Self::ProactiveRefreshNotPossible => "ProactiveRefreshNotPossible",
                Self::ProactiveRefreshAttempted => "ProactiveRefreshAttempted",
                Self::Deferred => "Deferred",
            }
        }
    }

    impl AsRef<str> for DeviceBoundSessionWithUsageUsagePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DeviceBoundSessionWithUsageUsagePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "NotInScope" => Ok(Self::NotInScope),
                "InScopeRefreshNotYetNeeded" => Ok(Self::InScopeRefreshNotYetNeeded),
                "InScopeRefreshNotAllowed" => Ok(Self::InScopeRefreshNotAllowed),
                "ProactiveRefreshNotPossible" => Ok(Self::ProactiveRefreshNotPossible),
                "ProactiveRefreshAttempted" => Ok(Self::ProactiveRefreshAttempted),
                "Deferred" => Ok(Self::Deferred),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DeviceBoundSessionWithUsageUsagePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DeviceBoundSessionUrlRuleRuleTypePropertyEnum {
        Exclude,
        Include,
    }

    impl DeviceBoundSessionUrlRuleRuleTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Exclude => "Exclude",
                Self::Include => "Include",
            }
        }
    }

    impl AsRef<str> for DeviceBoundSessionUrlRuleRuleTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DeviceBoundSessionUrlRuleRuleTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Exclude" => Ok(Self::Exclude),
                "Include" => Ok(Self::Include),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DeviceBoundSessionUrlRuleRuleTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RefreshEventDetailsRefreshResultPropertyEnum {
        Refreshed,
        InitializedService,
        Unreachable,
        ServerError,
        FatalError,
        SigningQuotaExceeded,
        RefreshedAsWaiter,
        TransientSigningError,
        InScopeRefreshNotYetNeeded,
    }

    impl RefreshEventDetailsRefreshResultPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Refreshed => "Refreshed",
                Self::InitializedService => "InitializedService",
                Self::Unreachable => "Unreachable",
                Self::ServerError => "ServerError",
                Self::FatalError => "FatalError",
                Self::SigningQuotaExceeded => "SigningQuotaExceeded",
                Self::RefreshedAsWaiter => "RefreshedAsWaiter",
                Self::TransientSigningError => "TransientSigningError",
                Self::InScopeRefreshNotYetNeeded => "InScopeRefreshNotYetNeeded",
            }
        }
    }

    impl AsRef<str> for RefreshEventDetailsRefreshResultPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RefreshEventDetailsRefreshResultPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Refreshed" => Ok(Self::Refreshed),
                "InitializedService" => Ok(Self::InitializedService),
                "Unreachable" => Ok(Self::Unreachable),
                "ServerError" => Ok(Self::ServerError),
                "FatalError" => Ok(Self::FatalError),
                "SigningQuotaExceeded" => Ok(Self::SigningQuotaExceeded),
                "RefreshedAsWaiter" => Ok(Self::RefreshedAsWaiter),
                "TransientSigningError" => Ok(Self::TransientSigningError),
                "InScopeRefreshNotYetNeeded" => Ok(Self::InScopeRefreshNotYetNeeded),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RefreshEventDetailsRefreshResultPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TerminationEventDetailsDeletionReasonPropertyEnum {
        Expired,
        FailedToRestoreKey,
        FailedToUnwrapKey,
        StoragePartitionCleared,
        ClearBrowsingData,
        ServerRequested,
        InvalidSessionParams,
        RefreshFatalError,
        DevTools,
    }

    impl TerminationEventDetailsDeletionReasonPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Expired => "Expired",
                Self::FailedToRestoreKey => "FailedToRestoreKey",
                Self::FailedToUnwrapKey => "FailedToUnwrapKey",
                Self::StoragePartitionCleared => "StoragePartitionCleared",
                Self::ClearBrowsingData => "ClearBrowsingData",
                Self::ServerRequested => "ServerRequested",
                Self::InvalidSessionParams => "InvalidSessionParams",
                Self::RefreshFatalError => "RefreshFatalError",
                Self::DevTools => "DevTools",
            }
        }
    }

    impl AsRef<str> for TerminationEventDetailsDeletionReasonPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TerminationEventDetailsDeletionReasonPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Expired" => Ok(Self::Expired),
                "FailedToRestoreKey" => Ok(Self::FailedToRestoreKey),
                "FailedToUnwrapKey" => Ok(Self::FailedToUnwrapKey),
                "StoragePartitionCleared" => Ok(Self::StoragePartitionCleared),
                "ClearBrowsingData" => Ok(Self::ClearBrowsingData),
                "ServerRequested" => Ok(Self::ServerRequested),
                "InvalidSessionParams" => Ok(Self::InvalidSessionParams),
                "RefreshFatalError" => Ok(Self::RefreshFatalError),
                "DevTools" => Ok(Self::DevTools),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TerminationEventDetailsDeletionReasonPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ChallengeEventDetailsChallengeResultPropertyEnum {
        Success,
        NoSessionId,
        NoSessionMatch,
        CantSetBoundCookie,
    }

    impl ChallengeEventDetailsChallengeResultPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Success => "Success",
                Self::NoSessionId => "NoSessionId",
                Self::NoSessionMatch => "NoSessionMatch",
                Self::CantSetBoundCookie => "CantSetBoundCookie",
            }
        }
    }

    impl AsRef<str> for ChallengeEventDetailsChallengeResultPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ChallengeEventDetailsChallengeResultPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Success" => Ok(Self::Success),
                "NoSessionId" => Ok(Self::NoSessionId),
                "NoSessionMatch" => Ok(Self::NoSessionMatch),
                "CantSetBoundCookie" => Ok(Self::CantSetBoundCookie),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ChallengeEventDetailsChallengeResultPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ResourceType {
        Document,
        Stylesheet,
        Image,
        Media,
        Font,
        Script,
        TextTrack,
        XHR,
        Fetch,
        Prefetch,
        EventSource,
        WebSocket,
        Manifest,
        SignedExchange,
        Ping,
        CSPViolationReport,
        Preflight,
        FedCM,
        Other,
    }

    impl ResourceType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Document => "Document",
                Self::Stylesheet => "Stylesheet",
                Self::Image => "Image",
                Self::Media => "Media",
                Self::Font => "Font",
                Self::Script => "Script",
                Self::TextTrack => "TextTrack",
                Self::XHR => "XHR",
                Self::Fetch => "Fetch",
                Self::Prefetch => "Prefetch",
                Self::EventSource => "EventSource",
                Self::WebSocket => "WebSocket",
                Self::Manifest => "Manifest",
                Self::SignedExchange => "SignedExchange",
                Self::Ping => "Ping",
                Self::CSPViolationReport => "CSPViolationReport",
                Self::Preflight => "Preflight",
                Self::FedCM => "FedCM",
                Self::Other => "Other",
            }
        }
    }

    impl AsRef<str> for ResourceType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ResourceType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Document" => Ok(Self::Document),
                "Stylesheet" => Ok(Self::Stylesheet),
                "Image" => Ok(Self::Image),
                "Media" => Ok(Self::Media),
                "Font" => Ok(Self::Font),
                "Script" => Ok(Self::Script),
                "TextTrack" => Ok(Self::TextTrack),
                "XHR" => Ok(Self::XHR),
                "Fetch" => Ok(Self::Fetch),
                "Prefetch" => Ok(Self::Prefetch),
                "EventSource" => Ok(Self::EventSource),
                "WebSocket" => Ok(Self::WebSocket),
                "Manifest" => Ok(Self::Manifest),
                "SignedExchange" => Ok(Self::SignedExchange),
                "Ping" => Ok(Self::Ping),
                "CSPViolationReport" => Ok(Self::CSPViolationReport),
                "Preflight" => Ok(Self::Preflight),
                "FedCM" => Ok(Self::FedCM),
                "Other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ResourceType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type LoaderId = String;
    pub type RequestId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ErrorReason {
        Failed,
        Aborted,
        TimedOut,
        AccessDenied,
        ConnectionClosed,
        ConnectionReset,
        ConnectionRefused,
        ConnectionAborted,
        ConnectionFailed,
        NameNotResolved,
        InternetDisconnected,
        AddressUnreachable,
        BlockedByClient,
        BlockedByResponse,
    }

    impl ErrorReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Failed => "Failed",
                Self::Aborted => "Aborted",
                Self::TimedOut => "TimedOut",
                Self::AccessDenied => "AccessDenied",
                Self::ConnectionClosed => "ConnectionClosed",
                Self::ConnectionReset => "ConnectionReset",
                Self::ConnectionRefused => "ConnectionRefused",
                Self::ConnectionAborted => "ConnectionAborted",
                Self::ConnectionFailed => "ConnectionFailed",
                Self::NameNotResolved => "NameNotResolved",
                Self::InternetDisconnected => "InternetDisconnected",
                Self::AddressUnreachable => "AddressUnreachable",
                Self::BlockedByClient => "BlockedByClient",
                Self::BlockedByResponse => "BlockedByResponse",
            }
        }
    }

    impl AsRef<str> for ErrorReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ErrorReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Failed" => Ok(Self::Failed),
                "Aborted" => Ok(Self::Aborted),
                "TimedOut" => Ok(Self::TimedOut),
                "AccessDenied" => Ok(Self::AccessDenied),
                "ConnectionClosed" => Ok(Self::ConnectionClosed),
                "ConnectionReset" => Ok(Self::ConnectionReset),
                "ConnectionRefused" => Ok(Self::ConnectionRefused),
                "ConnectionAborted" => Ok(Self::ConnectionAborted),
                "ConnectionFailed" => Ok(Self::ConnectionFailed),
                "NameNotResolved" => Ok(Self::NameNotResolved),
                "InternetDisconnected" => Ok(Self::InternetDisconnected),
                "AddressUnreachable" => Ok(Self::AddressUnreachable),
                "BlockedByClient" => Ok(Self::BlockedByClient),
                "BlockedByResponse" => Ok(Self::BlockedByResponse),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ErrorReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type TimeSinceEpoch = f64;
    pub type MonotonicTime = f64;
    pub type Headers = std::collections::BTreeMap<String, crate::generated::JsonValue>;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ConnectionType {
        None,
        Cellular2g,
        Cellular3g,
        Cellular4g,
        Bluetooth,
        Ethernet,
        Wifi,
        Wimax,
        Other,
    }

    impl ConnectionType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "none",
                Self::Cellular2g => "cellular2g",
                Self::Cellular3g => "cellular3g",
                Self::Cellular4g => "cellular4g",
                Self::Bluetooth => "bluetooth",
                Self::Ethernet => "ethernet",
                Self::Wifi => "wifi",
                Self::Wimax => "wimax",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for ConnectionType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ConnectionType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "none" => Ok(Self::None),
                "cellular2g" => Ok(Self::Cellular2g),
                "cellular3g" => Ok(Self::Cellular3g),
                "cellular4g" => Ok(Self::Cellular4g),
                "bluetooth" => Ok(Self::Bluetooth),
                "ethernet" => Ok(Self::Ethernet),
                "wifi" => Ok(Self::Wifi),
                "wimax" => Ok(Self::Wimax),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ConnectionType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieSameSite {
        Strict,
        Lax,
        None,
    }

    impl CookieSameSite {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Strict => "Strict",
                Self::Lax => "Lax",
                Self::None => "None",
            }
        }
    }

    impl AsRef<str> for CookieSameSite {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieSameSite {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Strict" => Ok(Self::Strict),
                "Lax" => Ok(Self::Lax),
                "None" => Ok(Self::None),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieSameSite",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookiePriority {
        Low,
        Medium,
        High,
    }

    impl CookiePriority {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Low => "Low",
                Self::Medium => "Medium",
                Self::High => "High",
            }
        }
    }

    impl AsRef<str> for CookiePriority {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookiePriority {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Low" => Ok(Self::Low),
                "Medium" => Ok(Self::Medium),
                "High" => Ok(Self::High),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookiePriority",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieSourceScheme {
        Unset,
        NonSecure,
        Secure,
    }

    impl CookieSourceScheme {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Unset => "Unset",
                Self::NonSecure => "NonSecure",
                Self::Secure => "Secure",
            }
        }
    }

    impl AsRef<str> for CookieSourceScheme {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieSourceScheme {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Unset" => Ok(Self::Unset),
                "NonSecure" => Ok(Self::NonSecure),
                "Secure" => Ok(Self::Secure),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieSourceScheme",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ResourceTiming {
        pub request_time: f64,
        pub proxy_start: f64,
        pub proxy_end: f64,
        pub dns_start: f64,
        pub dns_end: f64,
        pub connect_start: f64,
        pub connect_end: f64,
        pub ssl_start: f64,
        pub ssl_end: f64,
        pub worker_start: f64,
        pub worker_ready: f64,
        pub worker_fetch_start: f64,
        pub worker_respond_with_settled: f64,
        pub worker_router_evaluation_start: Option<f64>,
        pub worker_cache_lookup_start: Option<f64>,
        pub send_start: f64,
        pub send_end: f64,
        pub push_start: f64,
        pub push_end: f64,
        pub receive_headers_start: f64,
        pub receive_headers_end: f64,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ResourcePriority {
        VeryLow,
        Low,
        Medium,
        High,
        VeryHigh,
    }

    impl ResourcePriority {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::VeryLow => "VeryLow",
                Self::Low => "Low",
                Self::Medium => "Medium",
                Self::High => "High",
                Self::VeryHigh => "VeryHigh",
            }
        }
    }

    impl AsRef<str> for ResourcePriority {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ResourcePriority {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "VeryLow" => Ok(Self::VeryLow),
                "Low" => Ok(Self::Low),
                "Medium" => Ok(Self::Medium),
                "High" => Ok(Self::High),
                "VeryHigh" => Ok(Self::VeryHigh),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ResourcePriority",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RenderBlockingBehavior {
        Blocking,
        InBodyParserBlocking,
        NonBlocking,
        NonBlockingDynamic,
        PotentiallyBlocking,
    }

    impl RenderBlockingBehavior {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Blocking => "Blocking",
                Self::InBodyParserBlocking => "InBodyParserBlocking",
                Self::NonBlocking => "NonBlocking",
                Self::NonBlockingDynamic => "NonBlockingDynamic",
                Self::PotentiallyBlocking => "PotentiallyBlocking",
            }
        }
    }

    impl AsRef<str> for RenderBlockingBehavior {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RenderBlockingBehavior {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Blocking" => Ok(Self::Blocking),
                "InBodyParserBlocking" => Ok(Self::InBodyParserBlocking),
                "NonBlocking" => Ok(Self::NonBlocking),
                "NonBlockingDynamic" => Ok(Self::NonBlockingDynamic),
                "PotentiallyBlocking" => Ok(Self::PotentiallyBlocking),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RenderBlockingBehavior",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PostDataEntry {
        pub bytes: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Request {
        pub url: String,
        pub url_fragment: Option<String>,
        pub method: String,
        pub headers: Box<crate::generated::network::Headers>,
        pub post_data: Option<String>,
        pub has_post_data: Option<bool>,
        pub post_data_entries: Option<Vec<Box<crate::generated::network::PostDataEntry>>>,
        pub mixed_content_type: Option<crate::generated::security::MixedContentType>,
        pub initial_priority: crate::generated::network::ResourcePriority,
        pub referrer_policy: crate::generated::network::RequestReferrerPolicyPropertyEnum,
        pub is_link_preload: Option<bool>,
        pub trust_token_params: Option<Box<crate::generated::network::TrustTokenParams>>,
        pub is_same_site: Option<bool>,
        pub is_ad_related: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SignedCertificateTimestamp {
        pub status: String,
        pub origin: String,
        pub log_description: String,
        pub log_id: String,
        pub timestamp: f64,
        pub hash_algorithm: String,
        pub signature_algorithm: String,
        pub signature_data: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SecurityDetails {
        pub protocol: String,
        pub key_exchange: String,
        pub key_exchange_group: Option<String>,
        pub cipher: String,
        pub mac: Option<String>,
        pub certificate_id: crate::generated::security::CertificateId,
        pub subject_name: String,
        pub san_list: Vec<String>,
        pub issuer: String,
        pub valid_from: crate::generated::network::TimeSinceEpoch,
        pub valid_to: crate::generated::network::TimeSinceEpoch,
        pub signed_certificate_timestamp_list: Vec<Box<crate::generated::network::SignedCertificateTimestamp>>,
        pub certificate_transparency_compliance: crate::generated::network::CertificateTransparencyCompliance,
        pub server_signature_algorithm: Option<i64>,
        pub encrypted_client_hello: bool,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CertificateTransparencyCompliance {
        Unknown,
        NotCompliant,
        Compliant,
    }

    impl CertificateTransparencyCompliance {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Unknown => "unknown",
                Self::NotCompliant => "not-compliant",
                Self::Compliant => "compliant",
            }
        }
    }

    impl AsRef<str> for CertificateTransparencyCompliance {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CertificateTransparencyCompliance {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "unknown" => Ok(Self::Unknown),
                "not-compliant" => Ok(Self::NotCompliant),
                "compliant" => Ok(Self::Compliant),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CertificateTransparencyCompliance",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BlockedReason {
        Other,
        Csp,
        MixedContent,
        Origin,
        Inspector,
        Integrity,
        SubresourceFilter,
        ContentType,
        CoepFrameResourceNeedsCoepHeader,
        CoopSandboxedIframeCannotNavigateToCoopPage,
        CorpNotSameOrigin,
        CorpNotSameOriginAfterDefaultedToSameOriginByCoep,
        CorpNotSameOriginAfterDefaultedToSameOriginByDip,
        CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip,
        CorpNotSameSite,
        SriMessageSignatureMismatch,
    }

    impl BlockedReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Other => "other",
                Self::Csp => "csp",
                Self::MixedContent => "mixed-content",
                Self::Origin => "origin",
                Self::Inspector => "inspector",
                Self::Integrity => "integrity",
                Self::SubresourceFilter => "subresource-filter",
                Self::ContentType => "content-type",
                Self::CoepFrameResourceNeedsCoepHeader => "coep-frame-resource-needs-coep-header",
                Self::CoopSandboxedIframeCannotNavigateToCoopPage => "coop-sandboxed-iframe-cannot-navigate-to-coop-page",
                Self::CorpNotSameOrigin => "corp-not-same-origin",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoep => "corp-not-same-origin-after-defaulted-to-same-origin-by-coep",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByDip => "corp-not-same-origin-after-defaulted-to-same-origin-by-dip",
                Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip => "corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip",
                Self::CorpNotSameSite => "corp-not-same-site",
                Self::SriMessageSignatureMismatch => "sri-message-signature-mismatch",
            }
        }
    }

    impl AsRef<str> for BlockedReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BlockedReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "other" => Ok(Self::Other),
                "csp" => Ok(Self::Csp),
                "mixed-content" => Ok(Self::MixedContent),
                "origin" => Ok(Self::Origin),
                "inspector" => Ok(Self::Inspector),
                "integrity" => Ok(Self::Integrity),
                "subresource-filter" => Ok(Self::SubresourceFilter),
                "content-type" => Ok(Self::ContentType),
                "coep-frame-resource-needs-coep-header" => Ok(Self::CoepFrameResourceNeedsCoepHeader),
                "coop-sandboxed-iframe-cannot-navigate-to-coop-page" => Ok(Self::CoopSandboxedIframeCannotNavigateToCoopPage),
                "corp-not-same-origin" => Ok(Self::CorpNotSameOrigin),
                "corp-not-same-origin-after-defaulted-to-same-origin-by-coep" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoep),
                "corp-not-same-origin-after-defaulted-to-same-origin-by-dip" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByDip),
                "corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip" => Ok(Self::CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip),
                "corp-not-same-site" => Ok(Self::CorpNotSameSite),
                "sri-message-signature-mismatch" => Ok(Self::SriMessageSignatureMismatch),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BlockedReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CorsError {
        DisallowedByMode,
        InvalidResponse,
        WildcardOriginNotAllowed,
        MissingAllowOriginHeader,
        MultipleAllowOriginValues,
        InvalidAllowOriginValue,
        AllowOriginMismatch,
        InvalidAllowCredentials,
        CorsDisabledScheme,
        PreflightInvalidStatus,
        PreflightDisallowedRedirect,
        PreflightWildcardOriginNotAllowed,
        PreflightMissingAllowOriginHeader,
        PreflightMultipleAllowOriginValues,
        PreflightInvalidAllowOriginValue,
        PreflightAllowOriginMismatch,
        PreflightInvalidAllowCredentials,
        PreflightMissingAllowExternal,
        PreflightInvalidAllowExternal,
        InvalidAllowMethodsPreflightResponse,
        InvalidAllowHeadersPreflightResponse,
        MethodDisallowedByPreflightResponse,
        HeaderDisallowedByPreflightResponse,
        RedirectContainsCredentials,
        InsecureLocalNetwork,
        InvalidLocalNetworkAccess,
        NoCorsRedirectModeNotFollow,
        LocalNetworkAccessPermissionDenied,
    }

    impl CorsError {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::DisallowedByMode => "DisallowedByMode",
                Self::InvalidResponse => "InvalidResponse",
                Self::WildcardOriginNotAllowed => "WildcardOriginNotAllowed",
                Self::MissingAllowOriginHeader => "MissingAllowOriginHeader",
                Self::MultipleAllowOriginValues => "MultipleAllowOriginValues",
                Self::InvalidAllowOriginValue => "InvalidAllowOriginValue",
                Self::AllowOriginMismatch => "AllowOriginMismatch",
                Self::InvalidAllowCredentials => "InvalidAllowCredentials",
                Self::CorsDisabledScheme => "CorsDisabledScheme",
                Self::PreflightInvalidStatus => "PreflightInvalidStatus",
                Self::PreflightDisallowedRedirect => "PreflightDisallowedRedirect",
                Self::PreflightWildcardOriginNotAllowed => "PreflightWildcardOriginNotAllowed",
                Self::PreflightMissingAllowOriginHeader => "PreflightMissingAllowOriginHeader",
                Self::PreflightMultipleAllowOriginValues => "PreflightMultipleAllowOriginValues",
                Self::PreflightInvalidAllowOriginValue => "PreflightInvalidAllowOriginValue",
                Self::PreflightAllowOriginMismatch => "PreflightAllowOriginMismatch",
                Self::PreflightInvalidAllowCredentials => "PreflightInvalidAllowCredentials",
                Self::PreflightMissingAllowExternal => "PreflightMissingAllowExternal",
                Self::PreflightInvalidAllowExternal => "PreflightInvalidAllowExternal",
                Self::InvalidAllowMethodsPreflightResponse => "InvalidAllowMethodsPreflightResponse",
                Self::InvalidAllowHeadersPreflightResponse => "InvalidAllowHeadersPreflightResponse",
                Self::MethodDisallowedByPreflightResponse => "MethodDisallowedByPreflightResponse",
                Self::HeaderDisallowedByPreflightResponse => "HeaderDisallowedByPreflightResponse",
                Self::RedirectContainsCredentials => "RedirectContainsCredentials",
                Self::InsecureLocalNetwork => "InsecureLocalNetwork",
                Self::InvalidLocalNetworkAccess => "InvalidLocalNetworkAccess",
                Self::NoCorsRedirectModeNotFollow => "NoCorsRedirectModeNotFollow",
                Self::LocalNetworkAccessPermissionDenied => "LocalNetworkAccessPermissionDenied",
            }
        }
    }

    impl AsRef<str> for CorsError {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CorsError {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "DisallowedByMode" => Ok(Self::DisallowedByMode),
                "InvalidResponse" => Ok(Self::InvalidResponse),
                "WildcardOriginNotAllowed" => Ok(Self::WildcardOriginNotAllowed),
                "MissingAllowOriginHeader" => Ok(Self::MissingAllowOriginHeader),
                "MultipleAllowOriginValues" => Ok(Self::MultipleAllowOriginValues),
                "InvalidAllowOriginValue" => Ok(Self::InvalidAllowOriginValue),
                "AllowOriginMismatch" => Ok(Self::AllowOriginMismatch),
                "InvalidAllowCredentials" => Ok(Self::InvalidAllowCredentials),
                "CorsDisabledScheme" => Ok(Self::CorsDisabledScheme),
                "PreflightInvalidStatus" => Ok(Self::PreflightInvalidStatus),
                "PreflightDisallowedRedirect" => Ok(Self::PreflightDisallowedRedirect),
                "PreflightWildcardOriginNotAllowed" => Ok(Self::PreflightWildcardOriginNotAllowed),
                "PreflightMissingAllowOriginHeader" => Ok(Self::PreflightMissingAllowOriginHeader),
                "PreflightMultipleAllowOriginValues" => Ok(Self::PreflightMultipleAllowOriginValues),
                "PreflightInvalidAllowOriginValue" => Ok(Self::PreflightInvalidAllowOriginValue),
                "PreflightAllowOriginMismatch" => Ok(Self::PreflightAllowOriginMismatch),
                "PreflightInvalidAllowCredentials" => Ok(Self::PreflightInvalidAllowCredentials),
                "PreflightMissingAllowExternal" => Ok(Self::PreflightMissingAllowExternal),
                "PreflightInvalidAllowExternal" => Ok(Self::PreflightInvalidAllowExternal),
                "InvalidAllowMethodsPreflightResponse" => Ok(Self::InvalidAllowMethodsPreflightResponse),
                "InvalidAllowHeadersPreflightResponse" => Ok(Self::InvalidAllowHeadersPreflightResponse),
                "MethodDisallowedByPreflightResponse" => Ok(Self::MethodDisallowedByPreflightResponse),
                "HeaderDisallowedByPreflightResponse" => Ok(Self::HeaderDisallowedByPreflightResponse),
                "RedirectContainsCredentials" => Ok(Self::RedirectContainsCredentials),
                "InsecureLocalNetwork" => Ok(Self::InsecureLocalNetwork),
                "InvalidLocalNetworkAccess" => Ok(Self::InvalidLocalNetworkAccess),
                "NoCorsRedirectModeNotFollow" => Ok(Self::NoCorsRedirectModeNotFollow),
                "LocalNetworkAccessPermissionDenied" => Ok(Self::LocalNetworkAccessPermissionDenied),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CorsError",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CorsErrorStatus {
        pub cors_error: crate::generated::network::CorsError,
        pub failed_parameter: String,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ServiceWorkerResponseSource {
        CacheStorage,
        HttpCache,
        FallbackCode,
        Network,
    }

    impl ServiceWorkerResponseSource {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::CacheStorage => "cache-storage",
                Self::HttpCache => "http-cache",
                Self::FallbackCode => "fallback-code",
                Self::Network => "network",
            }
        }
    }

    impl AsRef<str> for ServiceWorkerResponseSource {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ServiceWorkerResponseSource {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "cache-storage" => Ok(Self::CacheStorage),
                "http-cache" => Ok(Self::HttpCache),
                "fallback-code" => Ok(Self::FallbackCode),
                "network" => Ok(Self::Network),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ServiceWorkerResponseSource",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct TrustTokenParams {
        pub operation: crate::generated::network::TrustTokenOperationType,
        pub refresh_policy: crate::generated::network::TrustTokenParamsRefreshPolicyPropertyEnum,
        pub issuers: Option<Vec<String>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TrustTokenOperationType {
        Issuance,
        Redemption,
        Signing,
    }

    impl TrustTokenOperationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Issuance => "Issuance",
                Self::Redemption => "Redemption",
                Self::Signing => "Signing",
            }
        }
    }

    impl AsRef<str> for TrustTokenOperationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TrustTokenOperationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Issuance" => Ok(Self::Issuance),
                "Redemption" => Ok(Self::Redemption),
                "Signing" => Ok(Self::Signing),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TrustTokenOperationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AlternateProtocolUsage {
        AlternativeJobWonWithoutRace,
        AlternativeJobWonRace,
        MainJobWonRace,
        MappingMissing,
        Broken,
        DnsAlpnH3JobWonWithoutRace,
        DnsAlpnH3JobWonRace,
        UnspecifiedReason,
    }

    impl AlternateProtocolUsage {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AlternativeJobWonWithoutRace => "alternativeJobWonWithoutRace",
                Self::AlternativeJobWonRace => "alternativeJobWonRace",
                Self::MainJobWonRace => "mainJobWonRace",
                Self::MappingMissing => "mappingMissing",
                Self::Broken => "broken",
                Self::DnsAlpnH3JobWonWithoutRace => "dnsAlpnH3JobWonWithoutRace",
                Self::DnsAlpnH3JobWonRace => "dnsAlpnH3JobWonRace",
                Self::UnspecifiedReason => "unspecifiedReason",
            }
        }
    }

    impl AsRef<str> for AlternateProtocolUsage {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AlternateProtocolUsage {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "alternativeJobWonWithoutRace" => Ok(Self::AlternativeJobWonWithoutRace),
                "alternativeJobWonRace" => Ok(Self::AlternativeJobWonRace),
                "mainJobWonRace" => Ok(Self::MainJobWonRace),
                "mappingMissing" => Ok(Self::MappingMissing),
                "broken" => Ok(Self::Broken),
                "dnsAlpnH3JobWonWithoutRace" => Ok(Self::DnsAlpnH3JobWonWithoutRace),
                "dnsAlpnH3JobWonRace" => Ok(Self::DnsAlpnH3JobWonRace),
                "unspecifiedReason" => Ok(Self::UnspecifiedReason),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AlternateProtocolUsage",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ServiceWorkerRouterSource {
        Network,
        Cache,
        FetchEvent,
        RaceNetworkAndFetchHandler,
        RaceNetworkAndCache,
    }

    impl ServiceWorkerRouterSource {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Network => "network",
                Self::Cache => "cache",
                Self::FetchEvent => "fetch-event",
                Self::RaceNetworkAndFetchHandler => "race-network-and-fetch-handler",
                Self::RaceNetworkAndCache => "race-network-and-cache",
            }
        }
    }

    impl AsRef<str> for ServiceWorkerRouterSource {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ServiceWorkerRouterSource {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "network" => Ok(Self::Network),
                "cache" => Ok(Self::Cache),
                "fetch-event" => Ok(Self::FetchEvent),
                "race-network-and-fetch-handler" => Ok(Self::RaceNetworkAndFetchHandler),
                "race-network-and-cache" => Ok(Self::RaceNetworkAndCache),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ServiceWorkerRouterSource",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ServiceWorkerRouterInfo {
        pub rule_id_matched: Option<i64>,
        pub matched_source_type: Option<crate::generated::network::ServiceWorkerRouterSource>,
        pub actual_source_type: Option<crate::generated::network::ServiceWorkerRouterSource>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Response {
        pub url: String,
        pub status: i64,
        pub status_text: String,
        pub headers: Box<crate::generated::network::Headers>,
        pub headers_text: Option<String>,
        pub mime_type: String,
        pub charset: String,
        pub request_headers: Option<Box<crate::generated::network::Headers>>,
        pub request_headers_text: Option<String>,
        pub connection_reused: bool,
        pub connection_id: f64,
        pub remote_ip_address: Option<String>,
        pub remote_port: Option<i64>,
        pub from_disk_cache: Option<bool>,
        pub from_service_worker: Option<bool>,
        pub from_prefetch_cache: Option<bool>,
        pub from_early_hints: Option<bool>,
        pub service_worker_router_info: Option<Box<crate::generated::network::ServiceWorkerRouterInfo>>,
        pub encoded_data_length: f64,
        pub timing: Option<Box<crate::generated::network::ResourceTiming>>,
        pub service_worker_response_source: Option<crate::generated::network::ServiceWorkerResponseSource>,
        pub response_time: Option<crate::generated::network::TimeSinceEpoch>,
        pub cache_storage_cache_name: Option<String>,
        pub protocol: Option<String>,
        pub alternate_protocol_usage: Option<crate::generated::network::AlternateProtocolUsage>,
        pub security_state: crate::generated::security::SecurityState,
        pub security_details: Option<Box<crate::generated::network::SecurityDetails>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WebSocketRequest {
        pub headers: Box<crate::generated::network::Headers>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WebSocketResponse {
        pub status: i64,
        pub status_text: String,
        pub headers: Box<crate::generated::network::Headers>,
        pub headers_text: Option<String>,
        pub request_headers: Option<Box<crate::generated::network::Headers>>,
        pub request_headers_text: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WebSocketFrame {
        pub opcode: f64,
        pub mask: bool,
        pub payload_data: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CachedResource {
        pub url: String,
        pub type_: crate::generated::network::ResourceType,
        pub response: Option<Box<crate::generated::network::Response>>,
        pub body_size: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Initiator {
        pub type_: crate::generated::network::InitiatorTypePropertyEnum,
        pub stack: Option<Box<crate::generated::runtime::StackTrace>>,
        pub url: Option<String>,
        pub line_number: Option<f64>,
        pub column_number: Option<f64>,
        pub request_id: Option<crate::generated::network::RequestId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CookiePartitionKey {
        pub top_level_site: String,
        pub has_cross_site_ancestor: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Cookie {
        pub name: String,
        pub value: String,
        pub domain: String,
        pub path: String,
        pub expires: f64,
        pub size: i64,
        pub http_only: bool,
        pub secure: bool,
        pub session: bool,
        pub same_site: Option<crate::generated::network::CookieSameSite>,
        pub priority: crate::generated::network::CookiePriority,
        pub source_scheme: crate::generated::network::CookieSourceScheme,
        pub source_port: i64,
        pub partition_key: Option<Box<crate::generated::network::CookiePartitionKey>>,
        pub partition_key_opaque: Option<bool>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SetCookieBlockedReason {
        SecureOnly,
        SameSiteStrict,
        SameSiteLax,
        SameSiteUnspecifiedTreatedAsLax,
        SameSiteNoneInsecure,
        UserPreferences,
        ThirdPartyPhaseout,
        ThirdPartyBlockedInFirstPartySet,
        SyntaxError,
        SchemeNotSupported,
        OverwriteSecure,
        InvalidDomain,
        InvalidPrefix,
        UnknownError,
        SchemefulSameSiteStrict,
        SchemefulSameSiteLax,
        SchemefulSameSiteUnspecifiedTreatedAsLax,
        NameValuePairExceedsMaxSize,
        DisallowedCharacter,
        NoCookieContent,
    }

    impl SetCookieBlockedReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SecureOnly => "SecureOnly",
                Self::SameSiteStrict => "SameSiteStrict",
                Self::SameSiteLax => "SameSiteLax",
                Self::SameSiteUnspecifiedTreatedAsLax => "SameSiteUnspecifiedTreatedAsLax",
                Self::SameSiteNoneInsecure => "SameSiteNoneInsecure",
                Self::UserPreferences => "UserPreferences",
                Self::ThirdPartyPhaseout => "ThirdPartyPhaseout",
                Self::ThirdPartyBlockedInFirstPartySet => "ThirdPartyBlockedInFirstPartySet",
                Self::SyntaxError => "SyntaxError",
                Self::SchemeNotSupported => "SchemeNotSupported",
                Self::OverwriteSecure => "OverwriteSecure",
                Self::InvalidDomain => "InvalidDomain",
                Self::InvalidPrefix => "InvalidPrefix",
                Self::UnknownError => "UnknownError",
                Self::SchemefulSameSiteStrict => "SchemefulSameSiteStrict",
                Self::SchemefulSameSiteLax => "SchemefulSameSiteLax",
                Self::SchemefulSameSiteUnspecifiedTreatedAsLax => "SchemefulSameSiteUnspecifiedTreatedAsLax",
                Self::NameValuePairExceedsMaxSize => "NameValuePairExceedsMaxSize",
                Self::DisallowedCharacter => "DisallowedCharacter",
                Self::NoCookieContent => "NoCookieContent",
            }
        }
    }

    impl AsRef<str> for SetCookieBlockedReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SetCookieBlockedReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SecureOnly" => Ok(Self::SecureOnly),
                "SameSiteStrict" => Ok(Self::SameSiteStrict),
                "SameSiteLax" => Ok(Self::SameSiteLax),
                "SameSiteUnspecifiedTreatedAsLax" => Ok(Self::SameSiteUnspecifiedTreatedAsLax),
                "SameSiteNoneInsecure" => Ok(Self::SameSiteNoneInsecure),
                "UserPreferences" => Ok(Self::UserPreferences),
                "ThirdPartyPhaseout" => Ok(Self::ThirdPartyPhaseout),
                "ThirdPartyBlockedInFirstPartySet" => Ok(Self::ThirdPartyBlockedInFirstPartySet),
                "SyntaxError" => Ok(Self::SyntaxError),
                "SchemeNotSupported" => Ok(Self::SchemeNotSupported),
                "OverwriteSecure" => Ok(Self::OverwriteSecure),
                "InvalidDomain" => Ok(Self::InvalidDomain),
                "InvalidPrefix" => Ok(Self::InvalidPrefix),
                "UnknownError" => Ok(Self::UnknownError),
                "SchemefulSameSiteStrict" => Ok(Self::SchemefulSameSiteStrict),
                "SchemefulSameSiteLax" => Ok(Self::SchemefulSameSiteLax),
                "SchemefulSameSiteUnspecifiedTreatedAsLax" => Ok(Self::SchemefulSameSiteUnspecifiedTreatedAsLax),
                "NameValuePairExceedsMaxSize" => Ok(Self::NameValuePairExceedsMaxSize),
                "DisallowedCharacter" => Ok(Self::DisallowedCharacter),
                "NoCookieContent" => Ok(Self::NoCookieContent),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SetCookieBlockedReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieBlockedReason {
        SecureOnly,
        NotOnPath,
        DomainMismatch,
        SameSiteStrict,
        SameSiteLax,
        SameSiteUnspecifiedTreatedAsLax,
        SameSiteNoneInsecure,
        UserPreferences,
        ThirdPartyPhaseout,
        ThirdPartyBlockedInFirstPartySet,
        UnknownError,
        SchemefulSameSiteStrict,
        SchemefulSameSiteLax,
        SchemefulSameSiteUnspecifiedTreatedAsLax,
        NameValuePairExceedsMaxSize,
        PortMismatch,
        SchemeMismatch,
        AnonymousContext,
    }

    impl CookieBlockedReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SecureOnly => "SecureOnly",
                Self::NotOnPath => "NotOnPath",
                Self::DomainMismatch => "DomainMismatch",
                Self::SameSiteStrict => "SameSiteStrict",
                Self::SameSiteLax => "SameSiteLax",
                Self::SameSiteUnspecifiedTreatedAsLax => "SameSiteUnspecifiedTreatedAsLax",
                Self::SameSiteNoneInsecure => "SameSiteNoneInsecure",
                Self::UserPreferences => "UserPreferences",
                Self::ThirdPartyPhaseout => "ThirdPartyPhaseout",
                Self::ThirdPartyBlockedInFirstPartySet => "ThirdPartyBlockedInFirstPartySet",
                Self::UnknownError => "UnknownError",
                Self::SchemefulSameSiteStrict => "SchemefulSameSiteStrict",
                Self::SchemefulSameSiteLax => "SchemefulSameSiteLax",
                Self::SchemefulSameSiteUnspecifiedTreatedAsLax => "SchemefulSameSiteUnspecifiedTreatedAsLax",
                Self::NameValuePairExceedsMaxSize => "NameValuePairExceedsMaxSize",
                Self::PortMismatch => "PortMismatch",
                Self::SchemeMismatch => "SchemeMismatch",
                Self::AnonymousContext => "AnonymousContext",
            }
        }
    }

    impl AsRef<str> for CookieBlockedReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieBlockedReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SecureOnly" => Ok(Self::SecureOnly),
                "NotOnPath" => Ok(Self::NotOnPath),
                "DomainMismatch" => Ok(Self::DomainMismatch),
                "SameSiteStrict" => Ok(Self::SameSiteStrict),
                "SameSiteLax" => Ok(Self::SameSiteLax),
                "SameSiteUnspecifiedTreatedAsLax" => Ok(Self::SameSiteUnspecifiedTreatedAsLax),
                "SameSiteNoneInsecure" => Ok(Self::SameSiteNoneInsecure),
                "UserPreferences" => Ok(Self::UserPreferences),
                "ThirdPartyPhaseout" => Ok(Self::ThirdPartyPhaseout),
                "ThirdPartyBlockedInFirstPartySet" => Ok(Self::ThirdPartyBlockedInFirstPartySet),
                "UnknownError" => Ok(Self::UnknownError),
                "SchemefulSameSiteStrict" => Ok(Self::SchemefulSameSiteStrict),
                "SchemefulSameSiteLax" => Ok(Self::SchemefulSameSiteLax),
                "SchemefulSameSiteUnspecifiedTreatedAsLax" => Ok(Self::SchemefulSameSiteUnspecifiedTreatedAsLax),
                "NameValuePairExceedsMaxSize" => Ok(Self::NameValuePairExceedsMaxSize),
                "PortMismatch" => Ok(Self::PortMismatch),
                "SchemeMismatch" => Ok(Self::SchemeMismatch),
                "AnonymousContext" => Ok(Self::AnonymousContext),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieBlockedReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CookieExemptionReason {
        None,
        UserSetting,
        EnterprisePolicy,
        StorageAccess,
        TopLevelStorageAccess,
        Scheme,
        SameSiteNoneCookiesInSandbox,
    }

    impl CookieExemptionReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "None",
                Self::UserSetting => "UserSetting",
                Self::EnterprisePolicy => "EnterprisePolicy",
                Self::StorageAccess => "StorageAccess",
                Self::TopLevelStorageAccess => "TopLevelStorageAccess",
                Self::Scheme => "Scheme",
                Self::SameSiteNoneCookiesInSandbox => "SameSiteNoneCookiesInSandbox",
            }
        }
    }

    impl AsRef<str> for CookieExemptionReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CookieExemptionReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "None" => Ok(Self::None),
                "UserSetting" => Ok(Self::UserSetting),
                "EnterprisePolicy" => Ok(Self::EnterprisePolicy),
                "StorageAccess" => Ok(Self::StorageAccess),
                "TopLevelStorageAccess" => Ok(Self::TopLevelStorageAccess),
                "Scheme" => Ok(Self::Scheme),
                "SameSiteNoneCookiesInSandbox" => Ok(Self::SameSiteNoneCookiesInSandbox),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CookieExemptionReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BlockedSetCookieWithReason {
        pub blocked_reasons: Vec<crate::generated::network::SetCookieBlockedReason>,
        pub cookie_line: String,
        pub cookie: Option<Box<crate::generated::network::Cookie>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ExemptedSetCookieWithReason {
        pub exemption_reason: crate::generated::network::CookieExemptionReason,
        pub cookie_line: String,
        pub cookie: Box<crate::generated::network::Cookie>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AssociatedCookie {
        pub cookie: Box<crate::generated::network::Cookie>,
        pub blocked_reasons: Vec<crate::generated::network::CookieBlockedReason>,
        pub exemption_reason: Option<crate::generated::network::CookieExemptionReason>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CookieParam {
        pub name: String,
        pub value: String,
        pub url: Option<String>,
        pub domain: Option<String>,
        pub path: Option<String>,
        pub secure: Option<bool>,
        pub http_only: Option<bool>,
        pub same_site: Option<crate::generated::network::CookieSameSite>,
        pub expires: Option<crate::generated::network::TimeSinceEpoch>,
        pub priority: Option<crate::generated::network::CookiePriority>,
        pub source_scheme: Option<crate::generated::network::CookieSourceScheme>,
        pub source_port: Option<i64>,
        pub partition_key: Option<Box<crate::generated::network::CookiePartitionKey>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AuthChallenge {
        pub source: Option<crate::generated::network::AuthChallengeSourcePropertyEnum>,
        pub origin: String,
        pub scheme: String,
        pub realm: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AuthChallengeResponse {
        pub response: crate::generated::network::AuthChallengeResponseResponsePropertyEnum,
        pub username: Option<String>,
        pub password: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SignedExchangeSignature {
        pub label: String,
        pub signature: String,
        pub integrity: String,
        pub cert_url: Option<String>,
        pub cert_sha256: Option<String>,
        pub validity_url: String,
        pub date: i64,
        pub expires: i64,
        pub certificates: Option<Vec<String>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SignedExchangeHeader {
        pub request_url: String,
        pub response_code: i64,
        pub response_headers: Box<crate::generated::network::Headers>,
        pub signatures: Vec<Box<crate::generated::network::SignedExchangeSignature>>,
        pub header_integrity: String,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SignedExchangeErrorField {
        SignatureSig,
        SignatureIntegrity,
        SignatureCertUrl,
        SignatureCertSha256,
        SignatureValidityUrl,
        SignatureTimestamps,
    }

    impl SignedExchangeErrorField {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SignatureSig => "signatureSig",
                Self::SignatureIntegrity => "signatureIntegrity",
                Self::SignatureCertUrl => "signatureCertUrl",
                Self::SignatureCertSha256 => "signatureCertSha256",
                Self::SignatureValidityUrl => "signatureValidityUrl",
                Self::SignatureTimestamps => "signatureTimestamps",
            }
        }
    }

    impl AsRef<str> for SignedExchangeErrorField {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SignedExchangeErrorField {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "signatureSig" => Ok(Self::SignatureSig),
                "signatureIntegrity" => Ok(Self::SignatureIntegrity),
                "signatureCertUrl" => Ok(Self::SignatureCertUrl),
                "signatureCertSha256" => Ok(Self::SignatureCertSha256),
                "signatureValidityUrl" => Ok(Self::SignatureValidityUrl),
                "signatureTimestamps" => Ok(Self::SignatureTimestamps),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SignedExchangeErrorField",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SignedExchangeError {
        pub message: String,
        pub signature_index: Option<i64>,
        pub error_field: Option<crate::generated::network::SignedExchangeErrorField>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SignedExchangeInfo {
        pub outer_response: Box<crate::generated::network::Response>,
        pub has_extra_info: bool,
        pub header: Option<Box<crate::generated::network::SignedExchangeHeader>>,
        pub security_details: Option<Box<crate::generated::network::SecurityDetails>>,
        pub errors: Option<Vec<Box<crate::generated::network::SignedExchangeError>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct NetworkConditions {
        pub url_pattern: String,
        pub latency: f64,
        pub download_throughput: f64,
        pub upload_throughput: f64,
        pub connection_type: Option<crate::generated::network::ConnectionType>,
        pub packet_loss: Option<f64>,
        pub packet_queue_length: Option<i64>,
        pub packet_reordering: Option<bool>,
        pub offline: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BlockPattern {
        pub url_pattern: String,
        pub block: bool,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DirectSocketDnsQueryType {
        Ipv4,
        Ipv6,
    }

    impl DirectSocketDnsQueryType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Ipv4 => "ipv4",
                Self::Ipv6 => "ipv6",
            }
        }
    }

    impl AsRef<str> for DirectSocketDnsQueryType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DirectSocketDnsQueryType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ipv4" => Ok(Self::Ipv4),
                "ipv6" => Ok(Self::Ipv6),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DirectSocketDnsQueryType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DirectTCPSocketOptions {
        pub no_delay: bool,
        pub keep_alive_delay: Option<f64>,
        pub send_buffer_size: Option<f64>,
        pub receive_buffer_size: Option<f64>,
        pub dns_query_type: Option<crate::generated::network::DirectSocketDnsQueryType>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DirectUDPSocketOptions {
        pub remote_addr: Option<String>,
        pub remote_port: Option<i64>,
        pub local_addr: Option<String>,
        pub local_port: Option<i64>,
        pub dns_query_type: Option<crate::generated::network::DirectSocketDnsQueryType>,
        pub send_buffer_size: Option<f64>,
        pub receive_buffer_size: Option<f64>,
        pub multicast_loopback: Option<bool>,
        pub multicast_time_to_live: Option<i64>,
        pub multicast_allow_address_sharing: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DirectUDPMessage {
        pub data: String,
        pub remote_addr: Option<String>,
        pub remote_port: Option<i64>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LocalNetworkAccessRequestPolicy {
        Allow,
        BlockFromInsecureToMorePrivate,
        WarnFromInsecureToMorePrivate,
        PermissionBlock,
        PermissionWarn,
    }

    impl LocalNetworkAccessRequestPolicy {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Allow => "Allow",
                Self::BlockFromInsecureToMorePrivate => "BlockFromInsecureToMorePrivate",
                Self::WarnFromInsecureToMorePrivate => "WarnFromInsecureToMorePrivate",
                Self::PermissionBlock => "PermissionBlock",
                Self::PermissionWarn => "PermissionWarn",
            }
        }
    }

    impl AsRef<str> for LocalNetworkAccessRequestPolicy {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LocalNetworkAccessRequestPolicy {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Allow" => Ok(Self::Allow),
                "BlockFromInsecureToMorePrivate" => Ok(Self::BlockFromInsecureToMorePrivate),
                "WarnFromInsecureToMorePrivate" => Ok(Self::WarnFromInsecureToMorePrivate),
                "PermissionBlock" => Ok(Self::PermissionBlock),
                "PermissionWarn" => Ok(Self::PermissionWarn),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LocalNetworkAccessRequestPolicy",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum IPAddressSpace {
        Loopback,
        Local,
        Public,
        Unknown,
    }

    impl IPAddressSpace {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Loopback => "Loopback",
                Self::Local => "Local",
                Self::Public => "Public",
                Self::Unknown => "Unknown",
            }
        }
    }

    impl AsRef<str> for IPAddressSpace {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for IPAddressSpace {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Loopback" => Ok(Self::Loopback),
                "Local" => Ok(Self::Local),
                "Public" => Ok(Self::Public),
                "Unknown" => Ok(Self::Unknown),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "IPAddressSpace",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ConnectTiming {
        pub request_time: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ClientSecurityState {
        pub initiator_is_secure_context: bool,
        pub initiator_ip_address_space: crate::generated::network::IPAddressSpace,
        pub local_network_access_request_policy: crate::generated::network::LocalNetworkAccessRequestPolicy,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdScriptIdentifier {
        pub script_id: crate::generated::runtime::ScriptId,
        pub debugger_id: crate::generated::runtime::UniqueDebuggerId,
        pub name: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdAncestry {
        pub ancestry_chain: Vec<Box<crate::generated::network::AdScriptIdentifier>>,
        pub root_script_filterlist_rule: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdProvenance {
        pub filterlist_rule: Option<String>,
        pub ad_script_ancestry: Option<Box<crate::generated::network::AdAncestry>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CrossOriginOpenerPolicyValue {
        SameOrigin,
        SameOriginAllowPopups,
        RestrictProperties,
        UnsafeNone,
        SameOriginPlusCoep,
        RestrictPropertiesPlusCoep,
        NoopenerAllowPopups,
    }

    impl CrossOriginOpenerPolicyValue {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SameOrigin => "SameOrigin",
                Self::SameOriginAllowPopups => "SameOriginAllowPopups",
                Self::RestrictProperties => "RestrictProperties",
                Self::UnsafeNone => "UnsafeNone",
                Self::SameOriginPlusCoep => "SameOriginPlusCoep",
                Self::RestrictPropertiesPlusCoep => "RestrictPropertiesPlusCoep",
                Self::NoopenerAllowPopups => "NoopenerAllowPopups",
            }
        }
    }

    impl AsRef<str> for CrossOriginOpenerPolicyValue {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CrossOriginOpenerPolicyValue {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SameOrigin" => Ok(Self::SameOrigin),
                "SameOriginAllowPopups" => Ok(Self::SameOriginAllowPopups),
                "RestrictProperties" => Ok(Self::RestrictProperties),
                "UnsafeNone" => Ok(Self::UnsafeNone),
                "SameOriginPlusCoep" => Ok(Self::SameOriginPlusCoep),
                "RestrictPropertiesPlusCoep" => Ok(Self::RestrictPropertiesPlusCoep),
                "NoopenerAllowPopups" => Ok(Self::NoopenerAllowPopups),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CrossOriginOpenerPolicyValue",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CrossOriginOpenerPolicyStatus {
        pub value: crate::generated::network::CrossOriginOpenerPolicyValue,
        pub report_only_value: crate::generated::network::CrossOriginOpenerPolicyValue,
        pub reporting_endpoint: Option<String>,
        pub report_only_reporting_endpoint: Option<String>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CrossOriginEmbedderPolicyValue {
        None,
        Credentialless,
        RequireCorp,
    }

    impl CrossOriginEmbedderPolicyValue {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "None",
                Self::Credentialless => "Credentialless",
                Self::RequireCorp => "RequireCorp",
            }
        }
    }

    impl AsRef<str> for CrossOriginEmbedderPolicyValue {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CrossOriginEmbedderPolicyValue {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "None" => Ok(Self::None),
                "Credentialless" => Ok(Self::Credentialless),
                "RequireCorp" => Ok(Self::RequireCorp),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CrossOriginEmbedderPolicyValue",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CrossOriginEmbedderPolicyStatus {
        pub value: crate::generated::network::CrossOriginEmbedderPolicyValue,
        pub report_only_value: crate::generated::network::CrossOriginEmbedderPolicyValue,
        pub reporting_endpoint: Option<String>,
        pub report_only_reporting_endpoint: Option<String>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ContentSecurityPolicySource {
        HTTP,
        Meta,
    }

    impl ContentSecurityPolicySource {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::HTTP => "HTTP",
                Self::Meta => "Meta",
            }
        }
    }

    impl AsRef<str> for ContentSecurityPolicySource {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ContentSecurityPolicySource {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "HTTP" => Ok(Self::HTTP),
                "Meta" => Ok(Self::Meta),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ContentSecurityPolicySource",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ContentSecurityPolicyStatus {
        pub effective_directives: String,
        pub is_enforced: bool,
        pub source: crate::generated::network::ContentSecurityPolicySource,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SecurityIsolationStatus {
        pub coop: Option<Box<crate::generated::network::CrossOriginOpenerPolicyStatus>>,
        pub coep: Option<Box<crate::generated::network::CrossOriginEmbedderPolicyStatus>>,
        pub csp: Option<Vec<Box<crate::generated::network::ContentSecurityPolicyStatus>>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ReportStatus {
        Queued,
        Pending,
        MarkedForRemoval,
        Success,
    }

    impl ReportStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Queued => "Queued",
                Self::Pending => "Pending",
                Self::MarkedForRemoval => "MarkedForRemoval",
                Self::Success => "Success",
            }
        }
    }

    impl AsRef<str> for ReportStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ReportStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Queued" => Ok(Self::Queued),
                "Pending" => Ok(Self::Pending),
                "MarkedForRemoval" => Ok(Self::MarkedForRemoval),
                "Success" => Ok(Self::Success),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ReportStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type ReportId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct ReportingApiReport {
        pub id: crate::generated::network::ReportId,
        pub initiator_url: String,
        pub destination: String,
        pub type_: String,
        pub timestamp: crate::generated::network::TimeSinceEpoch,
        pub depth: i64,
        pub completed_attempts: i64,
        pub body: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        pub status: crate::generated::network::ReportStatus,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ReportingApiEndpoint {
        pub url: String,
        pub group_name: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionKey {
        pub site: String,
        pub id: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionWithUsage {
        pub session_key: Box<crate::generated::network::DeviceBoundSessionKey>,
        pub usage: crate::generated::network::DeviceBoundSessionWithUsageUsagePropertyEnum,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionCookieCraving {
        pub name: String,
        pub domain: String,
        pub path: String,
        pub secure: bool,
        pub http_only: bool,
        pub same_site: Option<crate::generated::network::CookieSameSite>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionUrlRule {
        pub rule_type: crate::generated::network::DeviceBoundSessionUrlRuleRuleTypePropertyEnum,
        pub host_pattern: String,
        pub path_prefix: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionInclusionRules {
        pub origin: String,
        pub include_site: bool,
        pub url_rules: Vec<Box<crate::generated::network::DeviceBoundSessionUrlRule>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSession {
        pub key: Box<crate::generated::network::DeviceBoundSessionKey>,
        pub refresh_url: String,
        pub inclusion_rules: Box<crate::generated::network::DeviceBoundSessionInclusionRules>,
        pub cookie_cravings: Vec<Box<crate::generated::network::DeviceBoundSessionCookieCraving>>,
        pub expiry_date: crate::generated::network::TimeSinceEpoch,
        pub cached_challenge: Option<String>,
        pub allowed_refresh_initiators: Vec<String>,
    }
    pub type DeviceBoundSessionEventId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DeviceBoundSessionFetchResult {
        Success,
        SigningKeyGenerationError,
        AttestationKeyGenerationError,
        SigningError,
        TransientSigningError,
        ServerRequestedTermination,
        InvalidSessionId,
        InvalidChallenge,
        TooManyChallenges,
        InvalidFetcherUrl,
        InvalidRefreshUrl,
        TransientHttpError,
        ScopeOriginSameSiteMismatch,
        RefreshUrlSameSiteMismatch,
        MismatchedSessionId,
        MissingScope,
        NoCredentials,
        SubdomainRegistrationWellKnownUnavailable,
        SubdomainRegistrationUnauthorized,
        SubdomainRegistrationWellKnownMalformed,
        SessionProviderWellKnownUnavailable,
        RelyingPartyWellKnownUnavailable,
        FederatedKeyThumbprintMismatch,
        InvalidFederatedSessionUrl,
        InvalidFederatedKey,
        TooManyRelyingOriginLabels,
        BoundCookieSetForbidden,
        NetError,
        ProxyError,
        EmptySessionConfig,
        InvalidCredentialsConfig,
        InvalidCredentialsType,
        InvalidCredentialsEmptyName,
        InvalidCredentialsCookie,
        PersistentHttpError,
        RegistrationAttemptedChallenge,
        InvalidScopeOrigin,
        ScopeOriginContainsPath,
        RefreshInitiatorNotString,
        RefreshInitiatorInvalidHostPattern,
        InvalidScopeSpecification,
        MissingScopeSpecificationType,
        EmptyScopeSpecificationDomain,
        EmptyScopeSpecificationPath,
        InvalidScopeSpecificationType,
        InvalidScopeIncludeSite,
        MissingScopeIncludeSite,
        FederatedNotAuthorizedByProvider,
        FederatedNotAuthorizedByRelyingParty,
        SessionProviderWellKnownMalformed,
        SessionProviderWellKnownHasProviderOrigin,
        RelyingPartyWellKnownMalformed,
        RelyingPartyWellKnownHasRelyingOrigins,
        InvalidFederatedSessionProviderSessionMissing,
        InvalidFederatedSessionWrongProviderOrigin,
        InvalidCredentialsCookieCreationTime,
        InvalidCredentialsCookieName,
        InvalidCredentialsCookieParsing,
        InvalidCredentialsCookieUnpermittedAttribute,
        InvalidCredentialsCookieInvalidDomain,
        InvalidCredentialsCookiePrefix,
        InvalidScopeRulePath,
        InvalidScopeRuleHostPattern,
        ScopeRuleOriginScopedHostPatternMismatch,
        ScopeRuleSiteScopedHostPatternMismatch,
        SigningQuotaExceeded,
        InvalidConfigJson,
        InvalidFederatedSessionProviderFailedToRestoreKey,
        FailedToUnwrapKey,
        SessionDeletedDuringRefresh,
        CrossOriginRegistrationSiteNotIncluded,
        InvalidPreProvisionedKeyInitiatorMissing,
        PreProvisionedKeyAccessNotGranted,
        PreProvisionedKeyNotFound,
    }

    impl DeviceBoundSessionFetchResult {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Success => "Success",
                Self::SigningKeyGenerationError => "SigningKeyGenerationError",
                Self::AttestationKeyGenerationError => "AttestationKeyGenerationError",
                Self::SigningError => "SigningError",
                Self::TransientSigningError => "TransientSigningError",
                Self::ServerRequestedTermination => "ServerRequestedTermination",
                Self::InvalidSessionId => "InvalidSessionId",
                Self::InvalidChallenge => "InvalidChallenge",
                Self::TooManyChallenges => "TooManyChallenges",
                Self::InvalidFetcherUrl => "InvalidFetcherUrl",
                Self::InvalidRefreshUrl => "InvalidRefreshUrl",
                Self::TransientHttpError => "TransientHttpError",
                Self::ScopeOriginSameSiteMismatch => "ScopeOriginSameSiteMismatch",
                Self::RefreshUrlSameSiteMismatch => "RefreshUrlSameSiteMismatch",
                Self::MismatchedSessionId => "MismatchedSessionId",
                Self::MissingScope => "MissingScope",
                Self::NoCredentials => "NoCredentials",
                Self::SubdomainRegistrationWellKnownUnavailable => "SubdomainRegistrationWellKnownUnavailable",
                Self::SubdomainRegistrationUnauthorized => "SubdomainRegistrationUnauthorized",
                Self::SubdomainRegistrationWellKnownMalformed => "SubdomainRegistrationWellKnownMalformed",
                Self::SessionProviderWellKnownUnavailable => "SessionProviderWellKnownUnavailable",
                Self::RelyingPartyWellKnownUnavailable => "RelyingPartyWellKnownUnavailable",
                Self::FederatedKeyThumbprintMismatch => "FederatedKeyThumbprintMismatch",
                Self::InvalidFederatedSessionUrl => "InvalidFederatedSessionUrl",
                Self::InvalidFederatedKey => "InvalidFederatedKey",
                Self::TooManyRelyingOriginLabels => "TooManyRelyingOriginLabels",
                Self::BoundCookieSetForbidden => "BoundCookieSetForbidden",
                Self::NetError => "NetError",
                Self::ProxyError => "ProxyError",
                Self::EmptySessionConfig => "EmptySessionConfig",
                Self::InvalidCredentialsConfig => "InvalidCredentialsConfig",
                Self::InvalidCredentialsType => "InvalidCredentialsType",
                Self::InvalidCredentialsEmptyName => "InvalidCredentialsEmptyName",
                Self::InvalidCredentialsCookie => "InvalidCredentialsCookie",
                Self::PersistentHttpError => "PersistentHttpError",
                Self::RegistrationAttemptedChallenge => "RegistrationAttemptedChallenge",
                Self::InvalidScopeOrigin => "InvalidScopeOrigin",
                Self::ScopeOriginContainsPath => "ScopeOriginContainsPath",
                Self::RefreshInitiatorNotString => "RefreshInitiatorNotString",
                Self::RefreshInitiatorInvalidHostPattern => "RefreshInitiatorInvalidHostPattern",
                Self::InvalidScopeSpecification => "InvalidScopeSpecification",
                Self::MissingScopeSpecificationType => "MissingScopeSpecificationType",
                Self::EmptyScopeSpecificationDomain => "EmptyScopeSpecificationDomain",
                Self::EmptyScopeSpecificationPath => "EmptyScopeSpecificationPath",
                Self::InvalidScopeSpecificationType => "InvalidScopeSpecificationType",
                Self::InvalidScopeIncludeSite => "InvalidScopeIncludeSite",
                Self::MissingScopeIncludeSite => "MissingScopeIncludeSite",
                Self::FederatedNotAuthorizedByProvider => "FederatedNotAuthorizedByProvider",
                Self::FederatedNotAuthorizedByRelyingParty => "FederatedNotAuthorizedByRelyingParty",
                Self::SessionProviderWellKnownMalformed => "SessionProviderWellKnownMalformed",
                Self::SessionProviderWellKnownHasProviderOrigin => "SessionProviderWellKnownHasProviderOrigin",
                Self::RelyingPartyWellKnownMalformed => "RelyingPartyWellKnownMalformed",
                Self::RelyingPartyWellKnownHasRelyingOrigins => "RelyingPartyWellKnownHasRelyingOrigins",
                Self::InvalidFederatedSessionProviderSessionMissing => "InvalidFederatedSessionProviderSessionMissing",
                Self::InvalidFederatedSessionWrongProviderOrigin => "InvalidFederatedSessionWrongProviderOrigin",
                Self::InvalidCredentialsCookieCreationTime => "InvalidCredentialsCookieCreationTime",
                Self::InvalidCredentialsCookieName => "InvalidCredentialsCookieName",
                Self::InvalidCredentialsCookieParsing => "InvalidCredentialsCookieParsing",
                Self::InvalidCredentialsCookieUnpermittedAttribute => "InvalidCredentialsCookieUnpermittedAttribute",
                Self::InvalidCredentialsCookieInvalidDomain => "InvalidCredentialsCookieInvalidDomain",
                Self::InvalidCredentialsCookiePrefix => "InvalidCredentialsCookiePrefix",
                Self::InvalidScopeRulePath => "InvalidScopeRulePath",
                Self::InvalidScopeRuleHostPattern => "InvalidScopeRuleHostPattern",
                Self::ScopeRuleOriginScopedHostPatternMismatch => "ScopeRuleOriginScopedHostPatternMismatch",
                Self::ScopeRuleSiteScopedHostPatternMismatch => "ScopeRuleSiteScopedHostPatternMismatch",
                Self::SigningQuotaExceeded => "SigningQuotaExceeded",
                Self::InvalidConfigJson => "InvalidConfigJson",
                Self::InvalidFederatedSessionProviderFailedToRestoreKey => "InvalidFederatedSessionProviderFailedToRestoreKey",
                Self::FailedToUnwrapKey => "FailedToUnwrapKey",
                Self::SessionDeletedDuringRefresh => "SessionDeletedDuringRefresh",
                Self::CrossOriginRegistrationSiteNotIncluded => "CrossOriginRegistrationSiteNotIncluded",
                Self::InvalidPreProvisionedKeyInitiatorMissing => "InvalidPreProvisionedKeyInitiatorMissing",
                Self::PreProvisionedKeyAccessNotGranted => "PreProvisionedKeyAccessNotGranted",
                Self::PreProvisionedKeyNotFound => "PreProvisionedKeyNotFound",
            }
        }
    }

    impl AsRef<str> for DeviceBoundSessionFetchResult {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DeviceBoundSessionFetchResult {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Success" => Ok(Self::Success),
                "SigningKeyGenerationError" => Ok(Self::SigningKeyGenerationError),
                "AttestationKeyGenerationError" => Ok(Self::AttestationKeyGenerationError),
                "SigningError" => Ok(Self::SigningError),
                "TransientSigningError" => Ok(Self::TransientSigningError),
                "ServerRequestedTermination" => Ok(Self::ServerRequestedTermination),
                "InvalidSessionId" => Ok(Self::InvalidSessionId),
                "InvalidChallenge" => Ok(Self::InvalidChallenge),
                "TooManyChallenges" => Ok(Self::TooManyChallenges),
                "InvalidFetcherUrl" => Ok(Self::InvalidFetcherUrl),
                "InvalidRefreshUrl" => Ok(Self::InvalidRefreshUrl),
                "TransientHttpError" => Ok(Self::TransientHttpError),
                "ScopeOriginSameSiteMismatch" => Ok(Self::ScopeOriginSameSiteMismatch),
                "RefreshUrlSameSiteMismatch" => Ok(Self::RefreshUrlSameSiteMismatch),
                "MismatchedSessionId" => Ok(Self::MismatchedSessionId),
                "MissingScope" => Ok(Self::MissingScope),
                "NoCredentials" => Ok(Self::NoCredentials),
                "SubdomainRegistrationWellKnownUnavailable" => Ok(Self::SubdomainRegistrationWellKnownUnavailable),
                "SubdomainRegistrationUnauthorized" => Ok(Self::SubdomainRegistrationUnauthorized),
                "SubdomainRegistrationWellKnownMalformed" => Ok(Self::SubdomainRegistrationWellKnownMalformed),
                "SessionProviderWellKnownUnavailable" => Ok(Self::SessionProviderWellKnownUnavailable),
                "RelyingPartyWellKnownUnavailable" => Ok(Self::RelyingPartyWellKnownUnavailable),
                "FederatedKeyThumbprintMismatch" => Ok(Self::FederatedKeyThumbprintMismatch),
                "InvalidFederatedSessionUrl" => Ok(Self::InvalidFederatedSessionUrl),
                "InvalidFederatedKey" => Ok(Self::InvalidFederatedKey),
                "TooManyRelyingOriginLabels" => Ok(Self::TooManyRelyingOriginLabels),
                "BoundCookieSetForbidden" => Ok(Self::BoundCookieSetForbidden),
                "NetError" => Ok(Self::NetError),
                "ProxyError" => Ok(Self::ProxyError),
                "EmptySessionConfig" => Ok(Self::EmptySessionConfig),
                "InvalidCredentialsConfig" => Ok(Self::InvalidCredentialsConfig),
                "InvalidCredentialsType" => Ok(Self::InvalidCredentialsType),
                "InvalidCredentialsEmptyName" => Ok(Self::InvalidCredentialsEmptyName),
                "InvalidCredentialsCookie" => Ok(Self::InvalidCredentialsCookie),
                "PersistentHttpError" => Ok(Self::PersistentHttpError),
                "RegistrationAttemptedChallenge" => Ok(Self::RegistrationAttemptedChallenge),
                "InvalidScopeOrigin" => Ok(Self::InvalidScopeOrigin),
                "ScopeOriginContainsPath" => Ok(Self::ScopeOriginContainsPath),
                "RefreshInitiatorNotString" => Ok(Self::RefreshInitiatorNotString),
                "RefreshInitiatorInvalidHostPattern" => Ok(Self::RefreshInitiatorInvalidHostPattern),
                "InvalidScopeSpecification" => Ok(Self::InvalidScopeSpecification),
                "MissingScopeSpecificationType" => Ok(Self::MissingScopeSpecificationType),
                "EmptyScopeSpecificationDomain" => Ok(Self::EmptyScopeSpecificationDomain),
                "EmptyScopeSpecificationPath" => Ok(Self::EmptyScopeSpecificationPath),
                "InvalidScopeSpecificationType" => Ok(Self::InvalidScopeSpecificationType),
                "InvalidScopeIncludeSite" => Ok(Self::InvalidScopeIncludeSite),
                "MissingScopeIncludeSite" => Ok(Self::MissingScopeIncludeSite),
                "FederatedNotAuthorizedByProvider" => Ok(Self::FederatedNotAuthorizedByProvider),
                "FederatedNotAuthorizedByRelyingParty" => Ok(Self::FederatedNotAuthorizedByRelyingParty),
                "SessionProviderWellKnownMalformed" => Ok(Self::SessionProviderWellKnownMalformed),
                "SessionProviderWellKnownHasProviderOrigin" => Ok(Self::SessionProviderWellKnownHasProviderOrigin),
                "RelyingPartyWellKnownMalformed" => Ok(Self::RelyingPartyWellKnownMalformed),
                "RelyingPartyWellKnownHasRelyingOrigins" => Ok(Self::RelyingPartyWellKnownHasRelyingOrigins),
                "InvalidFederatedSessionProviderSessionMissing" => Ok(Self::InvalidFederatedSessionProviderSessionMissing),
                "InvalidFederatedSessionWrongProviderOrigin" => Ok(Self::InvalidFederatedSessionWrongProviderOrigin),
                "InvalidCredentialsCookieCreationTime" => Ok(Self::InvalidCredentialsCookieCreationTime),
                "InvalidCredentialsCookieName" => Ok(Self::InvalidCredentialsCookieName),
                "InvalidCredentialsCookieParsing" => Ok(Self::InvalidCredentialsCookieParsing),
                "InvalidCredentialsCookieUnpermittedAttribute" => Ok(Self::InvalidCredentialsCookieUnpermittedAttribute),
                "InvalidCredentialsCookieInvalidDomain" => Ok(Self::InvalidCredentialsCookieInvalidDomain),
                "InvalidCredentialsCookiePrefix" => Ok(Self::InvalidCredentialsCookiePrefix),
                "InvalidScopeRulePath" => Ok(Self::InvalidScopeRulePath),
                "InvalidScopeRuleHostPattern" => Ok(Self::InvalidScopeRuleHostPattern),
                "ScopeRuleOriginScopedHostPatternMismatch" => Ok(Self::ScopeRuleOriginScopedHostPatternMismatch),
                "ScopeRuleSiteScopedHostPatternMismatch" => Ok(Self::ScopeRuleSiteScopedHostPatternMismatch),
                "SigningQuotaExceeded" => Ok(Self::SigningQuotaExceeded),
                "InvalidConfigJson" => Ok(Self::InvalidConfigJson),
                "InvalidFederatedSessionProviderFailedToRestoreKey" => Ok(Self::InvalidFederatedSessionProviderFailedToRestoreKey),
                "FailedToUnwrapKey" => Ok(Self::FailedToUnwrapKey),
                "SessionDeletedDuringRefresh" => Ok(Self::SessionDeletedDuringRefresh),
                "CrossOriginRegistrationSiteNotIncluded" => Ok(Self::CrossOriginRegistrationSiteNotIncluded),
                "InvalidPreProvisionedKeyInitiatorMissing" => Ok(Self::InvalidPreProvisionedKeyInitiatorMissing),
                "PreProvisionedKeyAccessNotGranted" => Ok(Self::PreProvisionedKeyAccessNotGranted),
                "PreProvisionedKeyNotFound" => Ok(Self::PreProvisionedKeyNotFound),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DeviceBoundSessionFetchResult",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeviceBoundSessionFailedRequest {
        pub request_url: String,
        pub net_error: Option<String>,
        pub response_error: Option<i64>,
        pub response_error_body: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CreationEventDetails {
        pub fetch_result: crate::generated::network::DeviceBoundSessionFetchResult,
        pub new_session: Option<Box<crate::generated::network::DeviceBoundSession>>,
        pub failed_request: Option<Box<crate::generated::network::DeviceBoundSessionFailedRequest>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RefreshEventDetails {
        pub refresh_result: crate::generated::network::RefreshEventDetailsRefreshResultPropertyEnum,
        pub fetch_result: Option<crate::generated::network::DeviceBoundSessionFetchResult>,
        pub new_session: Option<Box<crate::generated::network::DeviceBoundSession>>,
        pub was_fully_proactive_refresh: bool,
        pub failed_request: Option<Box<crate::generated::network::DeviceBoundSessionFailedRequest>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct TerminationEventDetails {
        pub deletion_reason: crate::generated::network::TerminationEventDetailsDeletionReasonPropertyEnum,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ChallengeEventDetails {
        pub challenge_result: crate::generated::network::ChallengeEventDetailsChallengeResultPropertyEnum,
        pub challenge: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LoadNetworkResourcePageResult {
        pub success: bool,
        pub net_error: Option<f64>,
        pub net_error_name: Option<String>,
        pub http_status_code: Option<f64>,
        pub stream: Option<crate::generated::io::StreamHandle>,
        pub headers: Option<Box<crate::generated::network::Headers>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LoadNetworkResourceOptions {
        pub disable_cache: bool,
        pub include_credentials: bool,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanClearBrowserCacheParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanClearBrowserCacheResult {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanClearBrowserCookiesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanClearBrowserCookiesResult {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanEmulateNetworkConditionsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CanEmulateNetworkConditionsResult {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearBrowserCacheParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearBrowserCacheResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearBrowserCookiesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearBrowserCookiesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCookiesParams {
            pub name: String,
            pub url: Option<String>,
            pub domain: Option<String>,
            pub path: Option<String>,
            pub partition_key: Option<Box<crate::generated::network::CookiePartitionKey>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCookiesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateNetworkConditionsParams {
            pub offline: bool,
            pub latency: f64,
            pub download_throughput: f64,
            pub upload_throughput: f64,
            pub connection_type: Option<crate::generated::network::ConnectionType>,
            pub packet_loss: Option<f64>,
            pub packet_queue_length: Option<i64>,
            pub packet_reordering: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateNetworkConditionsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateNetworkConditionsByRuleParams {
            pub offline: Option<bool>,
            pub emulate_offline_service_worker: Option<bool>,
            pub matched_network_conditions: Vec<Box<crate::generated::network::NetworkConditions>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EmulateNetworkConditionsByRuleResult {
            pub rule_ids: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OverrideNetworkStateParams {
            pub offline: bool,
            pub latency: f64,
            pub download_throughput: f64,
            pub upload_throughput: f64,
            pub connection_type: Option<crate::generated::network::ConnectionType>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OverrideNetworkStateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub max_total_buffer_size: Option<i64>,
            pub max_resource_buffer_size: Option<i64>,
            pub max_post_data_size: Option<i64>,
            pub report_direct_socket_traffic: Option<bool>,
            pub enable_durable_messages: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConfigureDurableMessagesParams {
            pub max_total_buffer_size: Option<i64>,
            pub max_resource_buffer_size: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConfigureDurableMessagesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAllCookiesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAllCookiesResult {
            pub cookies: Vec<Box<crate::generated::network::Cookie>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCertificateParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCertificateResult {
            pub table_names: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCookiesParams {
            pub urls: Option<Vec<String>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCookiesResult {
            pub cookies: Vec<Box<crate::generated::network::Cookie>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResponseBodyParams {
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResponseBodyResult {
            pub body: String,
            pub base64_encoded: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRequestPostDataParams {
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRequestPostDataResult {
            pub post_data: String,
            pub base64_encoded: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReplayXHRParams {
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReplayXHRResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInResponseBodyParams {
            pub request_id: crate::generated::network::RequestId,
            pub query: String,
            pub case_sensitive: Option<bool>,
            pub is_regex: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInResponseBodyResult {
            pub result: Vec<Box<crate::generated::debugger::SearchMatch>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlockedURLsParams {
            pub url_patterns: Option<Vec<Box<crate::generated::network::BlockPattern>>>,
            pub urls: Option<Vec<String>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlockedURLsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBypassServiceWorkerParams {
            pub bypass: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBypassServiceWorkerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCacheDisabledParams {
            pub cache_disabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCacheDisabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookieParams {
            pub name: String,
            pub value: String,
            pub url: Option<String>,
            pub domain: Option<String>,
            pub path: Option<String>,
            pub secure: Option<bool>,
            pub http_only: Option<bool>,
            pub same_site: Option<crate::generated::network::CookieSameSite>,
            pub expires: Option<crate::generated::network::TimeSinceEpoch>,
            pub priority: Option<crate::generated::network::CookiePriority>,
            pub source_scheme: Option<crate::generated::network::CookieSourceScheme>,
            pub source_port: Option<i64>,
            pub partition_key: Option<Box<crate::generated::network::CookiePartitionKey>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookieResult {
            pub success: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookiesParams {
            pub cookies: Vec<Box<crate::generated::network::CookieParam>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookiesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetExtraHTTPHeadersParams {
            pub headers: Box<crate::generated::network::Headers>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetExtraHTTPHeadersResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttachDebugStackParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttachDebugStackResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserAgentOverrideParams {
            pub user_agent: String,
            pub accept_language: Option<String>,
            pub platform: Option<String>,
            pub user_agent_metadata: Option<Box<crate::generated::emulation::UserAgentMetadata>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserAgentOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StreamResourceContentParams {
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StreamResourceContentResult {
            pub buffered_data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSecurityIsolationStatusParams {
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSecurityIsolationStatusResult {
            pub status: Box<crate::generated::network::SecurityIsolationStatus>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableReportingApiParams {
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableReportingApiResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableDeviceBoundSessionsParams {
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableDeviceBoundSessionsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteDeviceBoundSessionParams {
            pub key: Box<crate::generated::network::DeviceBoundSessionKey>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteDeviceBoundSessionResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct FetchSchemefulSiteParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FetchSchemefulSiteResult {
            pub schemeful_site: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadNetworkResourceParams {
            pub frame_id: Option<crate::generated::page::FrameId>,
            pub url: String,
            pub options: Box<crate::generated::network::LoadNetworkResourceOptions>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadNetworkResourceResult {
            pub resource: Box<crate::generated::network::LoadNetworkResourcePageResult>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookieControlsParams {
            pub enable_third_party_cookie_restriction: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookieControlsResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DataReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub data_length: i64,
            pub encoded_data_length: i64,
            pub data: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EventSourceMessageReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub event_name: String,
            pub event_id: String,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadingFailedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub type_: crate::generated::network::ResourceType,
            pub error_text: String,
            pub canceled: Option<bool>,
            pub blocked_reason: Option<crate::generated::network::BlockedReason>,
            pub cors_error_status: Option<Box<crate::generated::network::CorsErrorStatus>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadingFinishedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub encoded_data_length: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestServedFromCacheEvent {
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestWillBeSentEvent {
            pub request_id: crate::generated::network::RequestId,
            pub loader_id: crate::generated::network::LoaderId,
            pub document_url: String,
            pub request: Box<crate::generated::network::Request>,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub wall_time: crate::generated::network::TimeSinceEpoch,
            pub initiator: Box<crate::generated::network::Initiator>,
            pub redirect_has_extra_info: bool,
            pub redirect_response: Option<Box<crate::generated::network::Response>>,
            pub type_: Option<crate::generated::network::ResourceType>,
            pub frame_id: Option<crate::generated::page::FrameId>,
            pub has_user_gesture: Option<bool>,
            pub render_blocking_behavior: Option<crate::generated::network::RenderBlockingBehavior>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResourceChangedPriorityEvent {
            pub request_id: crate::generated::network::RequestId,
            pub new_priority: crate::generated::network::ResourcePriority,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SignedExchangeReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub info: Box<crate::generated::network::SignedExchangeInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResponseReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub loader_id: crate::generated::network::LoaderId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub type_: crate::generated::network::ResourceType,
            pub response: Box<crate::generated::network::Response>,
            pub has_extra_info: bool,
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketClosedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketCreatedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub url: String,
            pub initiator: Option<Box<crate::generated::network::Initiator>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketFrameErrorEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub error_message: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketFrameReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub response: Box<crate::generated::network::WebSocketFrame>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketFrameSentEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub response: Box<crate::generated::network::WebSocketFrame>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketHandshakeResponseReceivedEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub response: Box<crate::generated::network::WebSocketResponse>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebSocketWillSendHandshakeRequestEvent {
            pub request_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub wall_time: crate::generated::network::TimeSinceEpoch,
            pub request: Box<crate::generated::network::WebSocketRequest>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebTransportCreatedEvent {
            pub transport_id: crate::generated::network::RequestId,
            pub url: String,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub initiator: Option<Box<crate::generated::network::Initiator>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebTransportConnectionEstablishedEvent {
            pub transport_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WebTransportClosedEvent {
            pub transport_id: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketCreatedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub remote_addr: String,
            pub remote_port: i64,
            pub options: Box<crate::generated::network::DirectTCPSocketOptions>,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub initiator: Option<Box<crate::generated::network::Initiator>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketOpenedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub remote_addr: String,
            pub remote_port: i64,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub local_addr: Option<String>,
            pub local_port: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketAbortedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub error_message: crate::generated::network::ErrorReason,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketClosedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketChunkSentEvent {
            pub identifier: crate::generated::network::RequestId,
            pub data: String,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectTCPSocketChunkReceivedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub data: String,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketJoinedMulticastGroupEvent {
            pub identifier: crate::generated::network::RequestId,
            pub ip_address: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketLeftMulticastGroupEvent {
            pub identifier: crate::generated::network::RequestId,
            pub ip_address: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketCreatedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub options: Box<crate::generated::network::DirectUDPSocketOptions>,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub initiator: Option<Box<crate::generated::network::Initiator>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketOpenedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub local_addr: String,
            pub local_port: i64,
            pub timestamp: crate::generated::network::MonotonicTime,
            pub remote_addr: Option<String>,
            pub remote_port: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketAbortedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub error_message: crate::generated::network::ErrorReason,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketClosedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketChunkSentEvent {
            pub identifier: crate::generated::network::RequestId,
            pub message: Box<crate::generated::network::DirectUDPMessage>,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DirectUDPSocketChunkReceivedEvent {
            pub identifier: crate::generated::network::RequestId,
            pub message: Box<crate::generated::network::DirectUDPMessage>,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestWillBeSentExtraInfoEvent {
            pub request_id: crate::generated::network::RequestId,
            pub associated_cookies: Vec<Box<crate::generated::network::AssociatedCookie>>,
            pub headers: Box<crate::generated::network::Headers>,
            pub connect_timing: Box<crate::generated::network::ConnectTiming>,
            pub device_bound_session_usages: Option<Vec<Box<crate::generated::network::DeviceBoundSessionWithUsage>>>,
            pub client_security_state: Option<Box<crate::generated::network::ClientSecurityState>>,
            pub site_has_cookie_in_other_partition: Option<bool>,
            pub applied_network_conditions_id: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResponseReceivedExtraInfoEvent {
            pub request_id: crate::generated::network::RequestId,
            pub blocked_cookies: Vec<Box<crate::generated::network::BlockedSetCookieWithReason>>,
            pub headers: Box<crate::generated::network::Headers>,
            pub resource_ip_address_space: crate::generated::network::IPAddressSpace,
            pub status_code: i64,
            pub headers_text: Option<String>,
            pub cookie_partition_key: Option<Box<crate::generated::network::CookiePartitionKey>>,
            pub cookie_partition_key_opaque: Option<bool>,
            pub exempted_cookies: Option<Vec<Box<crate::generated::network::ExemptedSetCookieWithReason>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResponseReceivedEarlyHintsEvent {
            pub request_id: crate::generated::network::RequestId,
            pub headers: Box<crate::generated::network::Headers>,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum TrustTokenOperationDoneStatusEventEnum {
            Ok,
            InvalidArgument,
            MissingIssuerKeys,
            FailedPrecondition,
            ResourceExhausted,
            AlreadyExists,
            ResourceLimited,
            Unauthorized,
            BadResponse,
            InternalError,
            UnknownError,
            FulfilledLocally,
            SiteIssuerLimit,
        }

        impl TrustTokenOperationDoneStatusEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Ok => "Ok",
                    Self::InvalidArgument => "InvalidArgument",
                    Self::MissingIssuerKeys => "MissingIssuerKeys",
                    Self::FailedPrecondition => "FailedPrecondition",
                    Self::ResourceExhausted => "ResourceExhausted",
                    Self::AlreadyExists => "AlreadyExists",
                    Self::ResourceLimited => "ResourceLimited",
                    Self::Unauthorized => "Unauthorized",
                    Self::BadResponse => "BadResponse",
                    Self::InternalError => "InternalError",
                    Self::UnknownError => "UnknownError",
                    Self::FulfilledLocally => "FulfilledLocally",
                    Self::SiteIssuerLimit => "SiteIssuerLimit",
                }
            }
        }

        impl AsRef<str> for TrustTokenOperationDoneStatusEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for TrustTokenOperationDoneStatusEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "Ok" => Ok(Self::Ok),
                    "InvalidArgument" => Ok(Self::InvalidArgument),
                    "MissingIssuerKeys" => Ok(Self::MissingIssuerKeys),
                    "FailedPrecondition" => Ok(Self::FailedPrecondition),
                    "ResourceExhausted" => Ok(Self::ResourceExhausted),
                    "AlreadyExists" => Ok(Self::AlreadyExists),
                    "ResourceLimited" => Ok(Self::ResourceLimited),
                    "Unauthorized" => Ok(Self::Unauthorized),
                    "BadResponse" => Ok(Self::BadResponse),
                    "InternalError" => Ok(Self::InternalError),
                    "UnknownError" => Ok(Self::UnknownError),
                    "FulfilledLocally" => Ok(Self::FulfilledLocally),
                    "SiteIssuerLimit" => Ok(Self::SiteIssuerLimit),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "TrustTokenOperationDoneStatusEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrustTokenOperationDoneEvent {
            pub status: crate::generated::network::events::TrustTokenOperationDoneStatusEventEnum,
            pub type_: crate::generated::network::TrustTokenOperationType,
            pub request_id: crate::generated::network::RequestId,
            pub top_level_origin: Option<String>,
            pub issuer_origin: Option<String>,
            pub issued_token_count: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PolicyUpdatedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportingApiReportAddedEvent {
            pub report: Box<crate::generated::network::ReportingApiReport>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportingApiReportUpdatedEvent {
            pub report: Box<crate::generated::network::ReportingApiReport>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportingApiEndpointsChangedForOriginEvent {
            pub origin: String,
            pub endpoints: Vec<Box<crate::generated::network::ReportingApiEndpoint>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeviceBoundSessionsAddedEvent {
            pub sessions: Vec<Box<crate::generated::network::DeviceBoundSession>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeviceBoundSessionEventOccurredEvent {
            pub event_id: crate::generated::network::DeviceBoundSessionEventId,
            pub site: String,
            pub succeeded: bool,
            pub session_id: Option<String>,
            pub creation_event_details: Option<Box<crate::generated::network::CreationEventDetails>>,
            pub refresh_event_details: Option<Box<crate::generated::network::RefreshEventDetails>>,
            pub termination_event_details: Option<Box<crate::generated::network::TerminationEventDetails>>,
            pub challenge_event_details: Option<Box<crate::generated::network::ChallengeEventDetails>>,
        }
    }
}

pub mod overlay {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum LineStylePatternPropertyEnum {
        Dashed,
        Dotted,
    }

    impl LineStylePatternPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Dashed => "dashed",
                Self::Dotted => "dotted",
            }
        }
    }

    impl AsRef<str> for LineStylePatternPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for LineStylePatternPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "dashed" => Ok(Self::Dashed),
                "dotted" => Ok(Self::Dotted),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "LineStylePatternPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SourceOrderConfig {
        pub parent_outline_color: Box<crate::generated::dom::RGBA>,
        pub child_outline_color: Box<crate::generated::dom::RGBA>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct GridHighlightConfig {
        pub show_grid_extension_lines: Option<bool>,
        pub show_positive_line_numbers: Option<bool>,
        pub show_negative_line_numbers: Option<bool>,
        pub show_area_names: Option<bool>,
        pub show_line_names: Option<bool>,
        pub show_track_sizes: Option<bool>,
        pub grid_border_color: Option<Box<crate::generated::dom::RGBA>>,
        pub cell_border_color: Option<Box<crate::generated::dom::RGBA>>,
        pub row_line_color: Option<Box<crate::generated::dom::RGBA>>,
        pub column_line_color: Option<Box<crate::generated::dom::RGBA>>,
        pub grid_border_dash: Option<bool>,
        pub cell_border_dash: Option<bool>,
        pub row_line_dash: Option<bool>,
        pub column_line_dash: Option<bool>,
        pub row_gap_color: Option<Box<crate::generated::dom::RGBA>>,
        pub row_hatch_color: Option<Box<crate::generated::dom::RGBA>>,
        pub column_gap_color: Option<Box<crate::generated::dom::RGBA>>,
        pub column_hatch_color: Option<Box<crate::generated::dom::RGBA>>,
        pub area_border_color: Option<Box<crate::generated::dom::RGBA>>,
        pub grid_background_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FlexContainerHighlightConfig {
        pub container_border: Option<Box<crate::generated::overlay::LineStyle>>,
        pub line_separator: Option<Box<crate::generated::overlay::LineStyle>>,
        pub item_separator: Option<Box<crate::generated::overlay::LineStyle>>,
        pub main_distributed_space: Option<Box<crate::generated::overlay::BoxStyle>>,
        pub cross_distributed_space: Option<Box<crate::generated::overlay::BoxStyle>>,
        pub row_gap_space: Option<Box<crate::generated::overlay::BoxStyle>>,
        pub column_gap_space: Option<Box<crate::generated::overlay::BoxStyle>>,
        pub cross_alignment: Option<Box<crate::generated::overlay::LineStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FlexItemHighlightConfig {
        pub base_size_box: Option<Box<crate::generated::overlay::BoxStyle>>,
        pub base_size_border: Option<Box<crate::generated::overlay::LineStyle>>,
        pub flexibility_arrow: Option<Box<crate::generated::overlay::LineStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LineStyle {
        pub color: Option<Box<crate::generated::dom::RGBA>>,
        pub pattern: Option<crate::generated::overlay::LineStylePatternPropertyEnum>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BoxStyle {
        pub fill_color: Option<Box<crate::generated::dom::RGBA>>,
        pub hatch_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ContrastAlgorithm {
        Aa,
        Aaa,
        Apca,
    }

    impl ContrastAlgorithm {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Aa => "aa",
                Self::Aaa => "aaa",
                Self::Apca => "apca",
            }
        }
    }

    impl AsRef<str> for ContrastAlgorithm {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ContrastAlgorithm {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "aa" => Ok(Self::Aa),
                "aaa" => Ok(Self::Aaa),
                "apca" => Ok(Self::Apca),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ContrastAlgorithm",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct HighlightConfig {
        pub show_info: Option<bool>,
        pub show_styles: Option<bool>,
        pub show_rulers: Option<bool>,
        pub show_accessibility_info: Option<bool>,
        pub show_extension_lines: Option<bool>,
        pub content_color: Option<Box<crate::generated::dom::RGBA>>,
        pub padding_color: Option<Box<crate::generated::dom::RGBA>>,
        pub border_color: Option<Box<crate::generated::dom::RGBA>>,
        pub margin_color: Option<Box<crate::generated::dom::RGBA>>,
        pub event_target_color: Option<Box<crate::generated::dom::RGBA>>,
        pub shape_color: Option<Box<crate::generated::dom::RGBA>>,
        pub shape_margin_color: Option<Box<crate::generated::dom::RGBA>>,
        pub css_grid_color: Option<Box<crate::generated::dom::RGBA>>,
        pub color_format: Option<crate::generated::overlay::ColorFormat>,
        pub grid_highlight_config: Option<Box<crate::generated::overlay::GridHighlightConfig>>,
        pub flex_container_highlight_config: Option<Box<crate::generated::overlay::FlexContainerHighlightConfig>>,
        pub flex_item_highlight_config: Option<Box<crate::generated::overlay::FlexItemHighlightConfig>>,
        pub contrast_algorithm: Option<crate::generated::overlay::ContrastAlgorithm>,
        pub container_query_container_highlight_config: Option<Box<crate::generated::overlay::ContainerQueryContainerHighlightConfig>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ColorFormat {
        Rgb,
        Hsl,
        Hwb,
        Hex,
    }

    impl ColorFormat {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Rgb => "rgb",
                Self::Hsl => "hsl",
                Self::Hwb => "hwb",
                Self::Hex => "hex",
            }
        }
    }

    impl AsRef<str> for ColorFormat {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ColorFormat {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "rgb" => Ok(Self::Rgb),
                "hsl" => Ok(Self::Hsl),
                "hwb" => Ok(Self::Hwb),
                "hex" => Ok(Self::Hex),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ColorFormat",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct GridNodeHighlightConfig {
        pub grid_highlight_config: Box<crate::generated::overlay::GridHighlightConfig>,
        pub node_id: crate::generated::dom::NodeId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FlexNodeHighlightConfig {
        pub flex_container_highlight_config: Box<crate::generated::overlay::FlexContainerHighlightConfig>,
        pub node_id: crate::generated::dom::NodeId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScrollSnapContainerHighlightConfig {
        pub snapport_border: Option<Box<crate::generated::overlay::LineStyle>>,
        pub snap_area_border: Option<Box<crate::generated::overlay::LineStyle>>,
        pub scroll_margin_color: Option<Box<crate::generated::dom::RGBA>>,
        pub scroll_padding_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScrollSnapHighlightConfig {
        pub scroll_snap_container_highlight_config: Box<crate::generated::overlay::ScrollSnapContainerHighlightConfig>,
        pub node_id: crate::generated::dom::NodeId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct HingeConfig {
        pub rect: Box<crate::generated::dom::Rect>,
        pub content_color: Option<Box<crate::generated::dom::RGBA>>,
        pub outline_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DisplayCutoutShape {
        Pill,
        Notch,
        Circle,
        Rectangle,
    }

    impl DisplayCutoutShape {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Pill => "pill",
                Self::Notch => "notch",
                Self::Circle => "circle",
                Self::Rectangle => "rectangle",
            }
        }
    }

    impl AsRef<str> for DisplayCutoutShape {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DisplayCutoutShape {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "pill" => Ok(Self::Pill),
                "notch" => Ok(Self::Notch),
                "circle" => Ok(Self::Circle),
                "rectangle" => Ok(Self::Rectangle),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DisplayCutoutShape",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DisplayCutoutConfig {
        pub rect: Box<crate::generated::dom::Rect>,
        pub shape: crate::generated::overlay::DisplayCutoutShape,
        pub border_radius: Option<i64>,
        pub upper_radius: Option<i64>,
        pub lower_radius: Option<i64>,
        pub cx: Option<i64>,
        pub cy: Option<i64>,
        pub radius: Option<i64>,
        pub content_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WindowControlsOverlayConfig {
        pub show_css: bool,
        pub selected_platform: String,
        pub theme_color: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ContainerQueryHighlightConfig {
        pub container_query_container_highlight_config: Box<crate::generated::overlay::ContainerQueryContainerHighlightConfig>,
        pub node_id: crate::generated::dom::NodeId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ContainerQueryContainerHighlightConfig {
        pub container_border: Option<Box<crate::generated::overlay::LineStyle>>,
        pub descendant_border: Option<Box<crate::generated::overlay::LineStyle>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct IsolatedElementHighlightConfig {
        pub isolation_mode_highlight_config: Box<crate::generated::overlay::IsolationModeHighlightConfig>,
        pub node_id: crate::generated::dom::NodeId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct IsolationModeHighlightConfig {
        pub resizer_color: Option<Box<crate::generated::dom::RGBA>>,
        pub resizer_handle_color: Option<Box<crate::generated::dom::RGBA>>,
        pub mask_color: Option<Box<crate::generated::dom::RGBA>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum InspectMode {
        SearchForNode,
        SearchForUAShadowDOM,
        CaptureAreaScreenshot,
        None,
    }

    impl InspectMode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SearchForNode => "searchForNode",
                Self::SearchForUAShadowDOM => "searchForUAShadowDOM",
                Self::CaptureAreaScreenshot => "captureAreaScreenshot",
                Self::None => "none",
            }
        }
    }

    impl AsRef<str> for InspectMode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for InspectMode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "searchForNode" => Ok(Self::SearchForNode),
                "searchForUAShadowDOM" => Ok(Self::SearchForUAShadowDOM),
                "captureAreaScreenshot" => Ok(Self::CaptureAreaScreenshot),
                "none" => Ok(Self::None),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "InspectMode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InspectedElementAnchorConfig {
        pub node_id: Option<crate::generated::dom::NodeId>,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHighlightObjectForTestParams {
            pub node_id: crate::generated::dom::NodeId,
            pub include_distance: Option<bool>,
            pub include_style: Option<bool>,
            pub color_format: Option<crate::generated::overlay::ColorFormat>,
            pub show_accessibility_info: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHighlightObjectForTestResult {
            pub highlight: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetGridHighlightObjectsForTestParams {
            pub node_ids: Vec<crate::generated::dom::NodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetGridHighlightObjectsForTestResult {
            pub highlights: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSourceOrderHighlightObjectForTestParams {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSourceOrderHighlightObjectForTestResult {
            pub highlight: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HideHighlightParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HideHighlightResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightFrameParams {
            pub frame_id: crate::generated::page::FrameId,
            pub content_color: Option<Box<crate::generated::dom::RGBA>>,
            pub content_outline_color: Option<Box<crate::generated::dom::RGBA>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightFrameResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightNodeParams {
            pub highlight_config: Box<crate::generated::overlay::HighlightConfig>,
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub selector: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightNodeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightQuadParams {
            pub quad: crate::generated::dom::Quad,
            pub color: Option<Box<crate::generated::dom::RGBA>>,
            pub outline_color: Option<Box<crate::generated::dom::RGBA>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightQuadResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightRectParams {
            pub x: i64,
            pub y: i64,
            pub width: i64,
            pub height: i64,
            pub color: Option<Box<crate::generated::dom::RGBA>>,
            pub outline_color: Option<Box<crate::generated::dom::RGBA>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightRectResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightSourceOrderParams {
            pub source_order_config: Box<crate::generated::overlay::SourceOrderConfig>,
            pub node_id: Option<crate::generated::dom::NodeId>,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HighlightSourceOrderResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInspectModeParams {
            pub mode: crate::generated::overlay::InspectMode,
            pub highlight_config: Option<Box<crate::generated::overlay::HighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInspectModeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowAdHighlightsParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowAdHighlightsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPausedInDebuggerMessageParams {
            pub message: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPausedInDebuggerMessageResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowDebugBordersParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowDebugBordersResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowFPSCounterParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowFPSCounterResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowGridOverlaysParams {
            pub grid_node_highlight_configs: Vec<Box<crate::generated::overlay::GridNodeHighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowGridOverlaysResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowFlexOverlaysParams {
            pub flex_node_highlight_configs: Vec<Box<crate::generated::overlay::FlexNodeHighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowFlexOverlaysResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowScrollSnapOverlaysParams {
            pub scroll_snap_highlight_configs: Vec<Box<crate::generated::overlay::ScrollSnapHighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowScrollSnapOverlaysResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowContainerQueryOverlaysParams {
            pub container_query_highlight_configs: Vec<Box<crate::generated::overlay::ContainerQueryHighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowContainerQueryOverlaysResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowInspectedElementAnchorParams {
            pub inspected_element_anchor_config: Box<crate::generated::overlay::InspectedElementAnchorConfig>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowInspectedElementAnchorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowPaintRectsParams {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowPaintRectsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowLayoutShiftRegionsParams {
            pub result: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowLayoutShiftRegionsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowScrollBottleneckRectsParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowScrollBottleneckRectsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowHitTestBordersParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowHitTestBordersResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowWebVitalsParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowWebVitalsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowViewportSizeOnResizeParams {
            pub show: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowViewportSizeOnResizeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowHingeParams {
            pub hinge_config: Option<Box<crate::generated::overlay::HingeConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowHingeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowDisplayCutoutParams {
            pub display_cutout_config: Option<Box<crate::generated::overlay::DisplayCutoutConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowDisplayCutoutResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowIsolatedElementsParams {
            pub isolated_element_highlight_configs: Vec<Box<crate::generated::overlay::IsolatedElementHighlightConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowIsolatedElementsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowWindowControlsOverlayParams {
            pub window_controls_overlay_config: Option<Box<crate::generated::overlay::WindowControlsOverlayConfig>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetShowWindowControlsOverlayResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct InspectNodeRequestedEvent {
            pub backend_node_id: crate::generated::dom::BackendNodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodeHighlightRequestedEvent {
            pub node_id: crate::generated::dom::NodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreenshotRequestedEvent {
            pub viewport: Box<crate::generated::page::Viewport>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InspectPanelShowRequestedEvent {
            pub backend_node_id: crate::generated::dom::BackendNodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InspectedElementWindowRestoredEvent {
            pub backend_node_id: crate::generated::dom::BackendNodeId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InspectModeCanceledEvent;
    }
}

pub mod pwa {
    #[derive(Clone, Debug, PartialEq)]
    pub struct FileHandlerAccept {
        pub media_type: String,
        pub file_extensions: Vec<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FileHandler {
        pub action: String,
        pub accepts: Vec<Box<crate::generated::pwa::FileHandlerAccept>>,
        pub display_name: String,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DisplayMode {
        Standalone,
        Browser,
    }

    impl DisplayMode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Standalone => "standalone",
                Self::Browser => "browser",
            }
        }
    }

    impl AsRef<str> for DisplayMode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DisplayMode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "standalone" => Ok(Self::Standalone),
                "browser" => Ok(Self::Browser),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DisplayMode",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOsAppStateParams {
            pub manifest_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOsAppStateResult {
            pub badge_count: i64,
            pub file_handlers: Vec<Box<crate::generated::pwa::FileHandler>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InstallParams {
            pub manifest_id: String,
            pub install_url_or_bundle_url: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InstallResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UninstallParams {
            pub manifest_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UninstallResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct LaunchParams {
            pub manifest_id: String,
            pub url: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LaunchResult {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LaunchFilesInAppParams {
            pub manifest_id: String,
            pub files: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LaunchFilesInAppResult {
            pub target_ids: Vec<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenCurrentPageInAppParams {
            pub manifest_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenCurrentPageInAppResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ChangeAppUserSettingsParams {
            pub manifest_id: String,
            pub link_capturing: Option<bool>,
            pub display_mode: Option<crate::generated::pwa::DisplayMode>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ChangeAppUserSettingsResult;
    }

    pub mod events {
    }
}

pub mod page {
    pub type FrameId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AdFrameType {
        None,
        Child,
        Root,
    }

    impl AdFrameType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "none",
                Self::Child => "child",
                Self::Root => "root",
            }
        }
    }

    impl AsRef<str> for AdFrameType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AdFrameType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "none" => Ok(Self::None),
                "child" => Ok(Self::Child),
                "root" => Ok(Self::Root),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AdFrameType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AdFrameExplanation {
        ParentIsAd,
        CreatedByAdScript,
        MatchedBlockingRule,
    }

    impl AdFrameExplanation {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ParentIsAd => "ParentIsAd",
                Self::CreatedByAdScript => "CreatedByAdScript",
                Self::MatchedBlockingRule => "MatchedBlockingRule",
            }
        }
    }

    impl AsRef<str> for AdFrameExplanation {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AdFrameExplanation {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ParentIsAd" => Ok(Self::ParentIsAd),
                "CreatedByAdScript" => Ok(Self::CreatedByAdScript),
                "MatchedBlockingRule" => Ok(Self::MatchedBlockingRule),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AdFrameExplanation",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AdFrameStatus {
        pub ad_frame_type: crate::generated::page::AdFrameType,
        pub explanations: Option<Vec<crate::generated::page::AdFrameExplanation>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SecureContextType {
        Secure,
        SecureLocalhost,
        InsecureScheme,
        InsecureAncestor,
    }

    impl SecureContextType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Secure => "Secure",
                Self::SecureLocalhost => "SecureLocalhost",
                Self::InsecureScheme => "InsecureScheme",
                Self::InsecureAncestor => "InsecureAncestor",
            }
        }
    }

    impl AsRef<str> for SecureContextType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SecureContextType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Secure" => Ok(Self::Secure),
                "SecureLocalhost" => Ok(Self::SecureLocalhost),
                "InsecureScheme" => Ok(Self::InsecureScheme),
                "InsecureAncestor" => Ok(Self::InsecureAncestor),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SecureContextType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CrossOriginIsolatedContextType {
        Isolated,
        NotIsolated,
        NotIsolatedFeatureDisabled,
    }

    impl CrossOriginIsolatedContextType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Isolated => "Isolated",
                Self::NotIsolated => "NotIsolated",
                Self::NotIsolatedFeatureDisabled => "NotIsolatedFeatureDisabled",
            }
        }
    }

    impl AsRef<str> for CrossOriginIsolatedContextType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CrossOriginIsolatedContextType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Isolated" => Ok(Self::Isolated),
                "NotIsolated" => Ok(Self::NotIsolated),
                "NotIsolatedFeatureDisabled" => Ok(Self::NotIsolatedFeatureDisabled),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CrossOriginIsolatedContextType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum GatedAPIFeatures {
        SharedArrayBuffers,
        SharedArrayBuffersTransferAllowed,
        PerformanceMeasureMemory,
        PerformanceProfile,
    }

    impl GatedAPIFeatures {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SharedArrayBuffers => "SharedArrayBuffers",
                Self::SharedArrayBuffersTransferAllowed => "SharedArrayBuffersTransferAllowed",
                Self::PerformanceMeasureMemory => "PerformanceMeasureMemory",
                Self::PerformanceProfile => "PerformanceProfile",
            }
        }
    }

    impl AsRef<str> for GatedAPIFeatures {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for GatedAPIFeatures {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SharedArrayBuffers" => Ok(Self::SharedArrayBuffers),
                "SharedArrayBuffersTransferAllowed" => Ok(Self::SharedArrayBuffersTransferAllowed),
                "PerformanceMeasureMemory" => Ok(Self::PerformanceMeasureMemory),
                "PerformanceProfile" => Ok(Self::PerformanceProfile),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "GatedAPIFeatures",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PermissionsPolicyFeature {
        Accelerometer,
        AllScreensCapture,
        AmbientLightSensor,
        AriaNotify,
        Autofill,
        Autoplay,
        Bluetooth,
        BrowsingTopics,
        Camera,
        CapturedSurfaceControl,
        ChDpr,
        ChDeviceMemory,
        ChDownlink,
        ChEct,
        ChPrefersColorScheme,
        ChPrefersReducedMotion,
        ChPrefersReducedTransparency,
        ChRtt,
        ChSaveData,
        ChUa,
        ChUaArch,
        ChUaBitness,
        ChUaHighEntropyValues,
        ChUaPlatform,
        ChUaModel,
        ChUaMobile,
        ChUaFormFactors,
        ChUaFullVersion,
        ChUaFullVersionList,
        ChUaPlatformVersion,
        ChUaWow64,
        ChViewportHeight,
        ChViewportWidth,
        ChWidth,
        ClipboardRead,
        ClipboardWrite,
        ComputePressure,
        ControlledFrame,
        CrossOriginIsolated,
        DeferredFetch,
        DeferredFetchMinimal,
        DeviceAttributes,
        DigitalCredentialsCreate,
        DigitalCredentialsGet,
        DirectSockets,
        DirectSocketsMulticast,
        DisplayCapture,
        DocumentDomain,
        EncryptedMedia,
        ExecutionWhileOutOfViewport,
        ExecutionWhileNotRendered,
        FocusWithoutUserActivation,
        Fullscreen,
        Frobulate,
        Gamepad,
        Geolocation,
        Gyroscope,
        Hid,
        IdentityCredentialsGet,
        IdleDetection,
        InterestCohort,
        JoinAdInterestGroup,
        KeyboardMap,
        LanguageDetector,
        LanguageModel,
        LocalFonts,
        LocalNetwork,
        LocalNetworkAccess,
        LoopbackNetwork,
        Magnetometer,
        ManualText,
        MediaPlaybackWhileNotVisible,
        Microphone,
        Midi,
        OnDeviceSpeechRecognition,
        OtpCredentials,
        Payment,
        PictureInPicture,
        PrivateAggregation,
        PrivateStateTokenIssuance,
        PrivateStateTokenRedemption,
        PublickeyCredentialsCreate,
        PublickeyCredentialsGet,
        RecordAdAuctionEvents,
        Rewriter,
        RunAdAuction,
        ScreenWakeLock,
        Serial,
        SharedStorage,
        SharedStorageSelectUrl,
        SmartCard,
        SpeakerSelection,
        StorageAccess,
        SubApps,
        Summarizer,
        SyncXhr,
        Tools,
        Translator,
        Unload,
        Usb,
        UsbUnrestricted,
        VerticalScroll,
        WebAppInstallation,
        Webnn,
        WebPrinting,
        WebShare,
        WindowManagement,
        Writer,
        XrSpatialTracking,
    }

    impl PermissionsPolicyFeature {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Accelerometer => "accelerometer",
                Self::AllScreensCapture => "all-screens-capture",
                Self::AmbientLightSensor => "ambient-light-sensor",
                Self::AriaNotify => "aria-notify",
                Self::Autofill => "autofill",
                Self::Autoplay => "autoplay",
                Self::Bluetooth => "bluetooth",
                Self::BrowsingTopics => "browsing-topics",
                Self::Camera => "camera",
                Self::CapturedSurfaceControl => "captured-surface-control",
                Self::ChDpr => "ch-dpr",
                Self::ChDeviceMemory => "ch-device-memory",
                Self::ChDownlink => "ch-downlink",
                Self::ChEct => "ch-ect",
                Self::ChPrefersColorScheme => "ch-prefers-color-scheme",
                Self::ChPrefersReducedMotion => "ch-prefers-reduced-motion",
                Self::ChPrefersReducedTransparency => "ch-prefers-reduced-transparency",
                Self::ChRtt => "ch-rtt",
                Self::ChSaveData => "ch-save-data",
                Self::ChUa => "ch-ua",
                Self::ChUaArch => "ch-ua-arch",
                Self::ChUaBitness => "ch-ua-bitness",
                Self::ChUaHighEntropyValues => "ch-ua-high-entropy-values",
                Self::ChUaPlatform => "ch-ua-platform",
                Self::ChUaModel => "ch-ua-model",
                Self::ChUaMobile => "ch-ua-mobile",
                Self::ChUaFormFactors => "ch-ua-form-factors",
                Self::ChUaFullVersion => "ch-ua-full-version",
                Self::ChUaFullVersionList => "ch-ua-full-version-list",
                Self::ChUaPlatformVersion => "ch-ua-platform-version",
                Self::ChUaWow64 => "ch-ua-wow64",
                Self::ChViewportHeight => "ch-viewport-height",
                Self::ChViewportWidth => "ch-viewport-width",
                Self::ChWidth => "ch-width",
                Self::ClipboardRead => "clipboard-read",
                Self::ClipboardWrite => "clipboard-write",
                Self::ComputePressure => "compute-pressure",
                Self::ControlledFrame => "controlled-frame",
                Self::CrossOriginIsolated => "cross-origin-isolated",
                Self::DeferredFetch => "deferred-fetch",
                Self::DeferredFetchMinimal => "deferred-fetch-minimal",
                Self::DeviceAttributes => "device-attributes",
                Self::DigitalCredentialsCreate => "digital-credentials-create",
                Self::DigitalCredentialsGet => "digital-credentials-get",
                Self::DirectSockets => "direct-sockets",
                Self::DirectSocketsMulticast => "direct-sockets-multicast",
                Self::DisplayCapture => "display-capture",
                Self::DocumentDomain => "document-domain",
                Self::EncryptedMedia => "encrypted-media",
                Self::ExecutionWhileOutOfViewport => "execution-while-out-of-viewport",
                Self::ExecutionWhileNotRendered => "execution-while-not-rendered",
                Self::FocusWithoutUserActivation => "focus-without-user-activation",
                Self::Fullscreen => "fullscreen",
                Self::Frobulate => "frobulate",
                Self::Gamepad => "gamepad",
                Self::Geolocation => "geolocation",
                Self::Gyroscope => "gyroscope",
                Self::Hid => "hid",
                Self::IdentityCredentialsGet => "identity-credentials-get",
                Self::IdleDetection => "idle-detection",
                Self::InterestCohort => "interest-cohort",
                Self::JoinAdInterestGroup => "join-ad-interest-group",
                Self::KeyboardMap => "keyboard-map",
                Self::LanguageDetector => "language-detector",
                Self::LanguageModel => "language-model",
                Self::LocalFonts => "local-fonts",
                Self::LocalNetwork => "local-network",
                Self::LocalNetworkAccess => "local-network-access",
                Self::LoopbackNetwork => "loopback-network",
                Self::Magnetometer => "magnetometer",
                Self::ManualText => "manual-text",
                Self::MediaPlaybackWhileNotVisible => "media-playback-while-not-visible",
                Self::Microphone => "microphone",
                Self::Midi => "midi",
                Self::OnDeviceSpeechRecognition => "on-device-speech-recognition",
                Self::OtpCredentials => "otp-credentials",
                Self::Payment => "payment",
                Self::PictureInPicture => "picture-in-picture",
                Self::PrivateAggregation => "private-aggregation",
                Self::PrivateStateTokenIssuance => "private-state-token-issuance",
                Self::PrivateStateTokenRedemption => "private-state-token-redemption",
                Self::PublickeyCredentialsCreate => "publickey-credentials-create",
                Self::PublickeyCredentialsGet => "publickey-credentials-get",
                Self::RecordAdAuctionEvents => "record-ad-auction-events",
                Self::Rewriter => "rewriter",
                Self::RunAdAuction => "run-ad-auction",
                Self::ScreenWakeLock => "screen-wake-lock",
                Self::Serial => "serial",
                Self::SharedStorage => "shared-storage",
                Self::SharedStorageSelectUrl => "shared-storage-select-url",
                Self::SmartCard => "smart-card",
                Self::SpeakerSelection => "speaker-selection",
                Self::StorageAccess => "storage-access",
                Self::SubApps => "sub-apps",
                Self::Summarizer => "summarizer",
                Self::SyncXhr => "sync-xhr",
                Self::Tools => "tools",
                Self::Translator => "translator",
                Self::Unload => "unload",
                Self::Usb => "usb",
                Self::UsbUnrestricted => "usb-unrestricted",
                Self::VerticalScroll => "vertical-scroll",
                Self::WebAppInstallation => "web-app-installation",
                Self::Webnn => "webnn",
                Self::WebPrinting => "web-printing",
                Self::WebShare => "web-share",
                Self::WindowManagement => "window-management",
                Self::Writer => "writer",
                Self::XrSpatialTracking => "xr-spatial-tracking",
            }
        }
    }

    impl AsRef<str> for PermissionsPolicyFeature {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PermissionsPolicyFeature {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "accelerometer" => Ok(Self::Accelerometer),
                "all-screens-capture" => Ok(Self::AllScreensCapture),
                "ambient-light-sensor" => Ok(Self::AmbientLightSensor),
                "aria-notify" => Ok(Self::AriaNotify),
                "autofill" => Ok(Self::Autofill),
                "autoplay" => Ok(Self::Autoplay),
                "bluetooth" => Ok(Self::Bluetooth),
                "browsing-topics" => Ok(Self::BrowsingTopics),
                "camera" => Ok(Self::Camera),
                "captured-surface-control" => Ok(Self::CapturedSurfaceControl),
                "ch-dpr" => Ok(Self::ChDpr),
                "ch-device-memory" => Ok(Self::ChDeviceMemory),
                "ch-downlink" => Ok(Self::ChDownlink),
                "ch-ect" => Ok(Self::ChEct),
                "ch-prefers-color-scheme" => Ok(Self::ChPrefersColorScheme),
                "ch-prefers-reduced-motion" => Ok(Self::ChPrefersReducedMotion),
                "ch-prefers-reduced-transparency" => Ok(Self::ChPrefersReducedTransparency),
                "ch-rtt" => Ok(Self::ChRtt),
                "ch-save-data" => Ok(Self::ChSaveData),
                "ch-ua" => Ok(Self::ChUa),
                "ch-ua-arch" => Ok(Self::ChUaArch),
                "ch-ua-bitness" => Ok(Self::ChUaBitness),
                "ch-ua-high-entropy-values" => Ok(Self::ChUaHighEntropyValues),
                "ch-ua-platform" => Ok(Self::ChUaPlatform),
                "ch-ua-model" => Ok(Self::ChUaModel),
                "ch-ua-mobile" => Ok(Self::ChUaMobile),
                "ch-ua-form-factors" => Ok(Self::ChUaFormFactors),
                "ch-ua-full-version" => Ok(Self::ChUaFullVersion),
                "ch-ua-full-version-list" => Ok(Self::ChUaFullVersionList),
                "ch-ua-platform-version" => Ok(Self::ChUaPlatformVersion),
                "ch-ua-wow64" => Ok(Self::ChUaWow64),
                "ch-viewport-height" => Ok(Self::ChViewportHeight),
                "ch-viewport-width" => Ok(Self::ChViewportWidth),
                "ch-width" => Ok(Self::ChWidth),
                "clipboard-read" => Ok(Self::ClipboardRead),
                "clipboard-write" => Ok(Self::ClipboardWrite),
                "compute-pressure" => Ok(Self::ComputePressure),
                "controlled-frame" => Ok(Self::ControlledFrame),
                "cross-origin-isolated" => Ok(Self::CrossOriginIsolated),
                "deferred-fetch" => Ok(Self::DeferredFetch),
                "deferred-fetch-minimal" => Ok(Self::DeferredFetchMinimal),
                "device-attributes" => Ok(Self::DeviceAttributes),
                "digital-credentials-create" => Ok(Self::DigitalCredentialsCreate),
                "digital-credentials-get" => Ok(Self::DigitalCredentialsGet),
                "direct-sockets" => Ok(Self::DirectSockets),
                "direct-sockets-multicast" => Ok(Self::DirectSocketsMulticast),
                "display-capture" => Ok(Self::DisplayCapture),
                "document-domain" => Ok(Self::DocumentDomain),
                "encrypted-media" => Ok(Self::EncryptedMedia),
                "execution-while-out-of-viewport" => Ok(Self::ExecutionWhileOutOfViewport),
                "execution-while-not-rendered" => Ok(Self::ExecutionWhileNotRendered),
                "focus-without-user-activation" => Ok(Self::FocusWithoutUserActivation),
                "fullscreen" => Ok(Self::Fullscreen),
                "frobulate" => Ok(Self::Frobulate),
                "gamepad" => Ok(Self::Gamepad),
                "geolocation" => Ok(Self::Geolocation),
                "gyroscope" => Ok(Self::Gyroscope),
                "hid" => Ok(Self::Hid),
                "identity-credentials-get" => Ok(Self::IdentityCredentialsGet),
                "idle-detection" => Ok(Self::IdleDetection),
                "interest-cohort" => Ok(Self::InterestCohort),
                "join-ad-interest-group" => Ok(Self::JoinAdInterestGroup),
                "keyboard-map" => Ok(Self::KeyboardMap),
                "language-detector" => Ok(Self::LanguageDetector),
                "language-model" => Ok(Self::LanguageModel),
                "local-fonts" => Ok(Self::LocalFonts),
                "local-network" => Ok(Self::LocalNetwork),
                "local-network-access" => Ok(Self::LocalNetworkAccess),
                "loopback-network" => Ok(Self::LoopbackNetwork),
                "magnetometer" => Ok(Self::Magnetometer),
                "manual-text" => Ok(Self::ManualText),
                "media-playback-while-not-visible" => Ok(Self::MediaPlaybackWhileNotVisible),
                "microphone" => Ok(Self::Microphone),
                "midi" => Ok(Self::Midi),
                "on-device-speech-recognition" => Ok(Self::OnDeviceSpeechRecognition),
                "otp-credentials" => Ok(Self::OtpCredentials),
                "payment" => Ok(Self::Payment),
                "picture-in-picture" => Ok(Self::PictureInPicture),
                "private-aggregation" => Ok(Self::PrivateAggregation),
                "private-state-token-issuance" => Ok(Self::PrivateStateTokenIssuance),
                "private-state-token-redemption" => Ok(Self::PrivateStateTokenRedemption),
                "publickey-credentials-create" => Ok(Self::PublickeyCredentialsCreate),
                "publickey-credentials-get" => Ok(Self::PublickeyCredentialsGet),
                "record-ad-auction-events" => Ok(Self::RecordAdAuctionEvents),
                "rewriter" => Ok(Self::Rewriter),
                "run-ad-auction" => Ok(Self::RunAdAuction),
                "screen-wake-lock" => Ok(Self::ScreenWakeLock),
                "serial" => Ok(Self::Serial),
                "shared-storage" => Ok(Self::SharedStorage),
                "shared-storage-select-url" => Ok(Self::SharedStorageSelectUrl),
                "smart-card" => Ok(Self::SmartCard),
                "speaker-selection" => Ok(Self::SpeakerSelection),
                "storage-access" => Ok(Self::StorageAccess),
                "sub-apps" => Ok(Self::SubApps),
                "summarizer" => Ok(Self::Summarizer),
                "sync-xhr" => Ok(Self::SyncXhr),
                "tools" => Ok(Self::Tools),
                "translator" => Ok(Self::Translator),
                "unload" => Ok(Self::Unload),
                "usb" => Ok(Self::Usb),
                "usb-unrestricted" => Ok(Self::UsbUnrestricted),
                "vertical-scroll" => Ok(Self::VerticalScroll),
                "web-app-installation" => Ok(Self::WebAppInstallation),
                "webnn" => Ok(Self::Webnn),
                "web-printing" => Ok(Self::WebPrinting),
                "web-share" => Ok(Self::WebShare),
                "window-management" => Ok(Self::WindowManagement),
                "writer" => Ok(Self::Writer),
                "xr-spatial-tracking" => Ok(Self::XrSpatialTracking),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PermissionsPolicyFeature",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PermissionsPolicyBlockReason {
        Header,
        IframeAttribute,
        InFencedFrameTree,
        InIsolatedApp,
    }

    impl PermissionsPolicyBlockReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Header => "Header",
                Self::IframeAttribute => "IframeAttribute",
                Self::InFencedFrameTree => "InFencedFrameTree",
                Self::InIsolatedApp => "InIsolatedApp",
            }
        }
    }

    impl AsRef<str> for PermissionsPolicyBlockReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PermissionsPolicyBlockReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Header" => Ok(Self::Header),
                "IframeAttribute" => Ok(Self::IframeAttribute),
                "InFencedFrameTree" => Ok(Self::InFencedFrameTree),
                "InIsolatedApp" => Ok(Self::InIsolatedApp),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PermissionsPolicyBlockReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PermissionsPolicyBlockLocator {
        pub frame_id: crate::generated::page::FrameId,
        pub block_reason: crate::generated::page::PermissionsPolicyBlockReason,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PermissionsPolicyFeatureState {
        pub feature: crate::generated::page::PermissionsPolicyFeature,
        pub allowed: bool,
        pub locator: Option<Box<crate::generated::page::PermissionsPolicyBlockLocator>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum OriginTrialTokenStatus {
        Success,
        NotSupported,
        Insecure,
        Expired,
        WrongOrigin,
        InvalidSignature,
        Malformed,
        WrongVersion,
        FeatureDisabled,
        TokenDisabled,
        FeatureDisabledForUser,
        UnknownTrial,
    }

    impl OriginTrialTokenStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Success => "Success",
                Self::NotSupported => "NotSupported",
                Self::Insecure => "Insecure",
                Self::Expired => "Expired",
                Self::WrongOrigin => "WrongOrigin",
                Self::InvalidSignature => "InvalidSignature",
                Self::Malformed => "Malformed",
                Self::WrongVersion => "WrongVersion",
                Self::FeatureDisabled => "FeatureDisabled",
                Self::TokenDisabled => "TokenDisabled",
                Self::FeatureDisabledForUser => "FeatureDisabledForUser",
                Self::UnknownTrial => "UnknownTrial",
            }
        }
    }

    impl AsRef<str> for OriginTrialTokenStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for OriginTrialTokenStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Success" => Ok(Self::Success),
                "NotSupported" => Ok(Self::NotSupported),
                "Insecure" => Ok(Self::Insecure),
                "Expired" => Ok(Self::Expired),
                "WrongOrigin" => Ok(Self::WrongOrigin),
                "InvalidSignature" => Ok(Self::InvalidSignature),
                "Malformed" => Ok(Self::Malformed),
                "WrongVersion" => Ok(Self::WrongVersion),
                "FeatureDisabled" => Ok(Self::FeatureDisabled),
                "TokenDisabled" => Ok(Self::TokenDisabled),
                "FeatureDisabledForUser" => Ok(Self::FeatureDisabledForUser),
                "UnknownTrial" => Ok(Self::UnknownTrial),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "OriginTrialTokenStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum OriginTrialStatus {
        Enabled,
        ValidTokenNotProvided,
        OSNotSupported,
        TrialNotAllowed,
    }

    impl OriginTrialStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Enabled => "Enabled",
                Self::ValidTokenNotProvided => "ValidTokenNotProvided",
                Self::OSNotSupported => "OSNotSupported",
                Self::TrialNotAllowed => "TrialNotAllowed",
            }
        }
    }

    impl AsRef<str> for OriginTrialStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for OriginTrialStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Enabled" => Ok(Self::Enabled),
                "ValidTokenNotProvided" => Ok(Self::ValidTokenNotProvided),
                "OSNotSupported" => Ok(Self::OSNotSupported),
                "TrialNotAllowed" => Ok(Self::TrialNotAllowed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "OriginTrialStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum OriginTrialUsageRestriction {
        None,
        Subset,
    }

    impl OriginTrialUsageRestriction {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "None",
                Self::Subset => "Subset",
            }
        }
    }

    impl AsRef<str> for OriginTrialUsageRestriction {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for OriginTrialUsageRestriction {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "None" => Ok(Self::None),
                "Subset" => Ok(Self::Subset),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "OriginTrialUsageRestriction",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct OriginTrialToken {
        pub origin: String,
        pub match_sub_domains: bool,
        pub trial_name: String,
        pub expiry_time: crate::generated::network::TimeSinceEpoch,
        pub is_third_party: bool,
        pub usage_restriction: crate::generated::page::OriginTrialUsageRestriction,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct OriginTrialTokenWithStatus {
        pub raw_token_text: String,
        pub parsed_token: Option<Box<crate::generated::page::OriginTrialToken>>,
        pub status: crate::generated::page::OriginTrialTokenStatus,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct OriginTrial {
        pub trial_name: String,
        pub status: crate::generated::page::OriginTrialStatus,
        pub tokens_with_status: Vec<Box<crate::generated::page::OriginTrialTokenWithStatus>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SecurityOriginDetails {
        pub is_localhost: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Frame {
        pub id: crate::generated::page::FrameId,
        pub parent_id: Option<crate::generated::page::FrameId>,
        pub loader_id: crate::generated::network::LoaderId,
        pub name: Option<String>,
        pub url: String,
        pub url_fragment: Option<String>,
        pub domain_and_registry: String,
        pub security_origin: String,
        pub security_origin_details: Option<Box<crate::generated::page::SecurityOriginDetails>>,
        pub mime_type: String,
        pub unreachable_url: Option<String>,
        pub ad_frame_status: Option<Box<crate::generated::page::AdFrameStatus>>,
        pub secure_context_type: crate::generated::page::SecureContextType,
        pub cross_origin_isolated_context_type: crate::generated::page::CrossOriginIsolatedContextType,
        pub gated_api_features: Vec<crate::generated::page::GatedAPIFeatures>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FrameResource {
        pub url: String,
        pub type_: crate::generated::network::ResourceType,
        pub mime_type: String,
        pub last_modified: Option<crate::generated::network::TimeSinceEpoch>,
        pub content_size: Option<f64>,
        pub failed: Option<bool>,
        pub canceled: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FrameResourceTree {
        pub frame: Box<crate::generated::page::Frame>,
        pub child_frames: Option<Vec<Box<crate::generated::page::FrameResourceTree>>>,
        pub resources: Vec<Box<crate::generated::page::FrameResource>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FrameTree {
        pub frame: Box<crate::generated::page::Frame>,
        pub child_frames: Option<Vec<Box<crate::generated::page::FrameTree>>>,
    }
    pub type ScriptIdentifier = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TransitionType {
        Link,
        Typed,
        AddressBar,
        AutoBookmark,
        AutoSubframe,
        ManualSubframe,
        Generated,
        AutoToplevel,
        FormSubmit,
        Reload,
        Keyword,
        KeywordGenerated,
        Other,
    }

    impl TransitionType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Link => "link",
                Self::Typed => "typed",
                Self::AddressBar => "address_bar",
                Self::AutoBookmark => "auto_bookmark",
                Self::AutoSubframe => "auto_subframe",
                Self::ManualSubframe => "manual_subframe",
                Self::Generated => "generated",
                Self::AutoToplevel => "auto_toplevel",
                Self::FormSubmit => "form_submit",
                Self::Reload => "reload",
                Self::Keyword => "keyword",
                Self::KeywordGenerated => "keyword_generated",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for TransitionType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TransitionType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "link" => Ok(Self::Link),
                "typed" => Ok(Self::Typed),
                "address_bar" => Ok(Self::AddressBar),
                "auto_bookmark" => Ok(Self::AutoBookmark),
                "auto_subframe" => Ok(Self::AutoSubframe),
                "manual_subframe" => Ok(Self::ManualSubframe),
                "generated" => Ok(Self::Generated),
                "auto_toplevel" => Ok(Self::AutoToplevel),
                "form_submit" => Ok(Self::FormSubmit),
                "reload" => Ok(Self::Reload),
                "keyword" => Ok(Self::Keyword),
                "keyword_generated" => Ok(Self::KeywordGenerated),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TransitionType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct NavigationEntry {
        pub id: i64,
        pub url: String,
        pub user_typed_url: String,
        pub title: String,
        pub transition_type: crate::generated::page::TransitionType,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScreencastFrameMetadata {
        pub offset_top: f64,
        pub page_scale_factor: f64,
        pub device_width: f64,
        pub device_height: f64,
        pub scroll_offset_x: f64,
        pub scroll_offset_y: f64,
        pub timestamp: Option<crate::generated::network::TimeSinceEpoch>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DialogType {
        Alert,
        Confirm,
        Prompt,
        Beforeunload,
    }

    impl DialogType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Alert => "alert",
                Self::Confirm => "confirm",
                Self::Prompt => "prompt",
                Self::Beforeunload => "beforeunload",
            }
        }
    }

    impl AsRef<str> for DialogType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DialogType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "alert" => Ok(Self::Alert),
                "confirm" => Ok(Self::Confirm),
                "prompt" => Ok(Self::Prompt),
                "beforeunload" => Ok(Self::Beforeunload),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DialogType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AppManifestError {
        pub message: String,
        pub critical: i64,
        pub line: i64,
        pub column: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AppManifestParsedProperties {
        pub scope: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LayoutViewport {
        pub page_x: i64,
        pub page_y: i64,
        pub client_width: i64,
        pub client_height: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct VisualViewport {
        pub offset_x: f64,
        pub offset_y: f64,
        pub page_x: f64,
        pub page_y: f64,
        pub client_width: f64,
        pub client_height: f64,
        pub scale: f64,
        pub zoom: Option<f64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Viewport {
        pub x: f64,
        pub y: f64,
        pub width: f64,
        pub height: f64,
        pub scale: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FontFamilies {
        pub standard: Option<String>,
        pub fixed: Option<String>,
        pub serif: Option<String>,
        pub sans_serif: Option<String>,
        pub cursive: Option<String>,
        pub fantasy: Option<String>,
        pub math: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScriptFontFamilies {
        pub script: String,
        pub font_families: Box<crate::generated::page::FontFamilies>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FontSizes {
        pub standard: Option<i64>,
        pub fixed: Option<i64>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ClientNavigationReason {
        AnchorClick,
        FormSubmissionGet,
        FormSubmissionPost,
        HttpHeaderRefresh,
        InitialFrameNavigation,
        MetaTagRefresh,
        Other,
        PageBlockInterstitial,
        Reload,
        ScriptInitiated,
    }

    impl ClientNavigationReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AnchorClick => "anchorClick",
                Self::FormSubmissionGet => "formSubmissionGet",
                Self::FormSubmissionPost => "formSubmissionPost",
                Self::HttpHeaderRefresh => "httpHeaderRefresh",
                Self::InitialFrameNavigation => "initialFrameNavigation",
                Self::MetaTagRefresh => "metaTagRefresh",
                Self::Other => "other",
                Self::PageBlockInterstitial => "pageBlockInterstitial",
                Self::Reload => "reload",
                Self::ScriptInitiated => "scriptInitiated",
            }
        }
    }

    impl AsRef<str> for ClientNavigationReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ClientNavigationReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "anchorClick" => Ok(Self::AnchorClick),
                "formSubmissionGet" => Ok(Self::FormSubmissionGet),
                "formSubmissionPost" => Ok(Self::FormSubmissionPost),
                "httpHeaderRefresh" => Ok(Self::HttpHeaderRefresh),
                "initialFrameNavigation" => Ok(Self::InitialFrameNavigation),
                "metaTagRefresh" => Ok(Self::MetaTagRefresh),
                "other" => Ok(Self::Other),
                "pageBlockInterstitial" => Ok(Self::PageBlockInterstitial),
                "reload" => Ok(Self::Reload),
                "scriptInitiated" => Ok(Self::ScriptInitiated),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ClientNavigationReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ClientNavigationDisposition {
        CurrentTab,
        NewTab,
        NewWindow,
        Download,
    }

    impl ClientNavigationDisposition {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::CurrentTab => "currentTab",
                Self::NewTab => "newTab",
                Self::NewWindow => "newWindow",
                Self::Download => "download",
            }
        }
    }

    impl AsRef<str> for ClientNavigationDisposition {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ClientNavigationDisposition {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "currentTab" => Ok(Self::CurrentTab),
                "newTab" => Ok(Self::NewTab),
                "newWindow" => Ok(Self::NewWindow),
                "download" => Ok(Self::Download),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ClientNavigationDisposition",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InstallabilityErrorArgument {
        pub name: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InstallabilityError {
        pub error_id: String,
        pub error_arguments: Vec<Box<crate::generated::page::InstallabilityErrorArgument>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ReferrerPolicy {
        NoReferrer,
        NoReferrerWhenDowngrade,
        Origin,
        OriginWhenCrossOrigin,
        SameOrigin,
        StrictOrigin,
        StrictOriginWhenCrossOrigin,
        UnsafeUrl,
    }

    impl ReferrerPolicy {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::NoReferrer => "noReferrer",
                Self::NoReferrerWhenDowngrade => "noReferrerWhenDowngrade",
                Self::Origin => "origin",
                Self::OriginWhenCrossOrigin => "originWhenCrossOrigin",
                Self::SameOrigin => "sameOrigin",
                Self::StrictOrigin => "strictOrigin",
                Self::StrictOriginWhenCrossOrigin => "strictOriginWhenCrossOrigin",
                Self::UnsafeUrl => "unsafeUrl",
            }
        }
    }

    impl AsRef<str> for ReferrerPolicy {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ReferrerPolicy {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "noReferrer" => Ok(Self::NoReferrer),
                "noReferrerWhenDowngrade" => Ok(Self::NoReferrerWhenDowngrade),
                "origin" => Ok(Self::Origin),
                "originWhenCrossOrigin" => Ok(Self::OriginWhenCrossOrigin),
                "sameOrigin" => Ok(Self::SameOrigin),
                "strictOrigin" => Ok(Self::StrictOrigin),
                "strictOriginWhenCrossOrigin" => Ok(Self::StrictOriginWhenCrossOrigin),
                "unsafeUrl" => Ok(Self::UnsafeUrl),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ReferrerPolicy",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CompilationCacheParams {
        pub url: String,
        pub eager: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FileFilter {
        pub name: Option<String>,
        pub accepts: Option<Vec<String>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FileHandler {
        pub action: String,
        pub name: String,
        pub accepts: Option<Vec<Box<crate::generated::page::FileFilter>>>,
        pub launch_type: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ImageResource {
        pub url: String,
        pub sizes: Option<String>,
        pub type_: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LaunchHandler {
        pub client_mode: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ProtocolHandler {
        pub protocol: String,
        pub url: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RelatedApplication {
        pub id: Option<String>,
        pub url: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScopeExtension {
        pub origin: String,
        pub has_origin_wildcard: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Screenshot {
        pub image: Box<crate::generated::page::ImageResource>,
        pub form_factor: String,
        pub label: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ShareTarget {
        pub action: String,
        pub method: String,
        pub enctype: String,
        pub title: Option<String>,
        pub text: Option<String>,
        pub url: Option<String>,
        pub files: Option<Vec<Box<crate::generated::page::FileFilter>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Shortcut {
        pub name: String,
        pub url: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WebAppManifest {
        pub background_color: Option<String>,
        pub description: Option<String>,
        pub dir: Option<String>,
        pub display: Option<String>,
        pub display_overrides: Option<Vec<String>>,
        pub file_handlers: Option<Vec<Box<crate::generated::page::FileHandler>>>,
        pub icons: Option<Vec<Box<crate::generated::page::ImageResource>>>,
        pub id: Option<String>,
        pub lang: Option<String>,
        pub launch_handler: Option<Box<crate::generated::page::LaunchHandler>>,
        pub name: Option<String>,
        pub orientation: Option<String>,
        pub prefer_related_applications: Option<bool>,
        pub protocol_handlers: Option<Vec<Box<crate::generated::page::ProtocolHandler>>>,
        pub related_applications: Option<Vec<Box<crate::generated::page::RelatedApplication>>>,
        pub scope: Option<String>,
        pub scope_extensions: Option<Vec<Box<crate::generated::page::ScopeExtension>>>,
        pub screenshots: Option<Vec<Box<crate::generated::page::Screenshot>>>,
        pub share_target: Option<Box<crate::generated::page::ShareTarget>>,
        pub short_name: Option<String>,
        pub shortcuts: Option<Vec<Box<crate::generated::page::Shortcut>>>,
        pub start_url: Option<String>,
        pub theme_color: Option<String>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum NavigationType {
        Navigation,
        BackForwardCacheRestore,
    }

    impl NavigationType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Navigation => "Navigation",
                Self::BackForwardCacheRestore => "BackForwardCacheRestore",
            }
        }
    }

    impl AsRef<str> for NavigationType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for NavigationType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Navigation" => Ok(Self::Navigation),
                "BackForwardCacheRestore" => Ok(Self::BackForwardCacheRestore),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "NavigationType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BackForwardCacheNotRestoredReason {
        NotPrimaryMainFrame,
        BackForwardCacheDisabled,
        RelatedActiveContentsExist,
        HTTPStatusNotOK,
        SchemeNotHTTPOrHTTPS,
        Loading,
        WasGrantedMediaAccess,
        DisableForRenderFrameHostCalled,
        DomainNotAllowed,
        HTTPMethodNotGET,
        SubframeIsNavigating,
        Timeout,
        CacheLimit,
        JavaScriptExecution,
        RendererProcessKilled,
        RendererProcessCrashed,
        SchedulerTrackedFeatureUsed,
        ConflictingBrowsingInstance,
        CacheFlushed,
        ServiceWorkerVersionActivation,
        SessionRestored,
        ServiceWorkerPostMessage,
        EnteredBackForwardCacheBeforeServiceWorkerHostAdded,
        RenderFrameHostReusedSameSite,
        RenderFrameHostReusedCrossSite,
        ServiceWorkerClaim,
        IgnoreEventAndEvict,
        HaveInnerContents,
        TimeoutPuttingInCache,
        BackForwardCacheDisabledByLowMemory,
        BackForwardCacheDisabledByCommandLine,
        NetworkRequestDatapipeDrainedAsBytesConsumer,
        NetworkRequestRedirected,
        NetworkRequestTimeout,
        NetworkExceedsBufferLimit,
        NavigationCancelledWhileRestoring,
        NotMostRecentNavigationEntry,
        BackForwardCacheDisabledForPrerender,
        UserAgentOverrideDiffers,
        ForegroundCacheLimit,
        ForwardCacheDisabled,
        BrowsingInstanceNotSwapped,
        BackForwardCacheDisabledForDelegate,
        UnloadHandlerExistsInMainFrame,
        UnloadHandlerExistsInSubFrame,
        ServiceWorkerUnregistration,
        CacheControlNoStore,
        CacheControlNoStoreCookieModified,
        CacheControlNoStoreHTTPOnlyCookieModified,
        NoResponseHead,
        Unknown,
        ActivationNavigationsDisallowedForBug1234857,
        ErrorDocument,
        FencedFramesEmbedder,
        CookieDisabled,
        HTTPAuthRequired,
        CookieFlushed,
        BroadcastChannelOnMessage,
        WebViewSettingsChanged,
        WebViewJavaScriptObjectChanged,
        WebViewMessageListenerInjected,
        WebViewSafeBrowsingAllowlistChanged,
        WebViewDocumentStartJavascriptChanged,
        WebSocket,
        WebTransport,
        WebRTC,
        MainResourceHasCacheControlNoStore,
        MainResourceHasCacheControlNoCache,
        SubresourceHasCacheControlNoStore,
        SubresourceHasCacheControlNoCache,
        ContainsPlugins,
        DocumentLoaded,
        OutstandingNetworkRequestOthers,
        RequestedMIDIPermission,
        RequestedAudioCapturePermission,
        RequestedVideoCapturePermission,
        RequestedBackForwardCacheBlockedSensors,
        RequestedBackgroundWorkPermission,
        BroadcastChannel,
        WebXR,
        SharedWorker,
        SharedWorkerMessage,
        SharedWorkerWithNoActiveClient,
        WebLocks,
        WebLocksContention,
        WebHID,
        WebBluetooth,
        WebShare,
        RequestedStorageAccessGrant,
        WebNfc,
        OutstandingNetworkRequestFetch,
        OutstandingNetworkRequestXHR,
        AppBanner,
        Printing,
        WebDatabase,
        PictureInPicture,
        SpeechRecognizer,
        IdleManager,
        PaymentManager,
        SpeechSynthesis,
        KeyboardLock,
        WebOTPService,
        OutstandingNetworkRequestDirectSocket,
        InjectedJavascript,
        InjectedStyleSheet,
        KeepaliveRequest,
        IndexedDBEvent,
        Dummy,
        JsNetworkRequestReceivedCacheControlNoStoreResource,
        WebRTCUsedWithCCNS,
        WebTransportUsedWithCCNS,
        WebSocketUsedWithCCNS,
        SmartCard,
        LiveMediaStreamTrack,
        UnloadHandler,
        ParserAborted,
        ContentSecurityHandler,
        ContentWebAuthenticationAPI,
        ContentFileChooser,
        ContentSerial,
        ContentFileSystemAccess,
        ContentMediaDevicesDispatcherHost,
        ContentWebBluetooth,
        ContentWebUSB,
        ContentMediaSessionService,
        ContentScreenReader,
        ContentDiscarded,
        EmbedderPopupBlockerTabHelper,
        EmbedderSafeBrowsingTriggeredPopupBlocker,
        EmbedderSafeBrowsingThreatDetails,
        EmbedderAppBannerManager,
        EmbedderDomDistillerViewerSource,
        EmbedderDomDistillerSelfDeletingRequestDelegate,
        EmbedderOomInterventionTabHelper,
        EmbedderOfflinePage,
        EmbedderChromePasswordManagerClientBindCredentialManager,
        EmbedderPermissionRequestManager,
        EmbedderModalDialog,
        EmbedderExtensions,
        EmbedderExtensionMessaging,
        EmbedderExtensionMessagingForOpenPort,
        EmbedderExtensionSentMessageToCachedFrame,
        EmbedderExtensionFrame,
        EmbedderPrivilegedWebContents,
        RequestedByWebViewClient,
        PostMessageByWebViewClient,
        CacheControlNoStoreDeviceBoundSessionTerminated,
        CacheLimitPrunedOnModerateMemoryPressure,
        CacheLimitPrunedOnCriticalMemoryPressure,
    }

    impl BackForwardCacheNotRestoredReason {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::NotPrimaryMainFrame => "NotPrimaryMainFrame",
                Self::BackForwardCacheDisabled => "BackForwardCacheDisabled",
                Self::RelatedActiveContentsExist => "RelatedActiveContentsExist",
                Self::HTTPStatusNotOK => "HTTPStatusNotOK",
                Self::SchemeNotHTTPOrHTTPS => "SchemeNotHTTPOrHTTPS",
                Self::Loading => "Loading",
                Self::WasGrantedMediaAccess => "WasGrantedMediaAccess",
                Self::DisableForRenderFrameHostCalled => "DisableForRenderFrameHostCalled",
                Self::DomainNotAllowed => "DomainNotAllowed",
                Self::HTTPMethodNotGET => "HTTPMethodNotGET",
                Self::SubframeIsNavigating => "SubframeIsNavigating",
                Self::Timeout => "Timeout",
                Self::CacheLimit => "CacheLimit",
                Self::JavaScriptExecution => "JavaScriptExecution",
                Self::RendererProcessKilled => "RendererProcessKilled",
                Self::RendererProcessCrashed => "RendererProcessCrashed",
                Self::SchedulerTrackedFeatureUsed => "SchedulerTrackedFeatureUsed",
                Self::ConflictingBrowsingInstance => "ConflictingBrowsingInstance",
                Self::CacheFlushed => "CacheFlushed",
                Self::ServiceWorkerVersionActivation => "ServiceWorkerVersionActivation",
                Self::SessionRestored => "SessionRestored",
                Self::ServiceWorkerPostMessage => "ServiceWorkerPostMessage",
                Self::EnteredBackForwardCacheBeforeServiceWorkerHostAdded => "EnteredBackForwardCacheBeforeServiceWorkerHostAdded",
                Self::RenderFrameHostReusedSameSite => "RenderFrameHostReused_SameSite",
                Self::RenderFrameHostReusedCrossSite => "RenderFrameHostReused_CrossSite",
                Self::ServiceWorkerClaim => "ServiceWorkerClaim",
                Self::IgnoreEventAndEvict => "IgnoreEventAndEvict",
                Self::HaveInnerContents => "HaveInnerContents",
                Self::TimeoutPuttingInCache => "TimeoutPuttingInCache",
                Self::BackForwardCacheDisabledByLowMemory => "BackForwardCacheDisabledByLowMemory",
                Self::BackForwardCacheDisabledByCommandLine => "BackForwardCacheDisabledByCommandLine",
                Self::NetworkRequestDatapipeDrainedAsBytesConsumer => "NetworkRequestDatapipeDrainedAsBytesConsumer",
                Self::NetworkRequestRedirected => "NetworkRequestRedirected",
                Self::NetworkRequestTimeout => "NetworkRequestTimeout",
                Self::NetworkExceedsBufferLimit => "NetworkExceedsBufferLimit",
                Self::NavigationCancelledWhileRestoring => "NavigationCancelledWhileRestoring",
                Self::NotMostRecentNavigationEntry => "NotMostRecentNavigationEntry",
                Self::BackForwardCacheDisabledForPrerender => "BackForwardCacheDisabledForPrerender",
                Self::UserAgentOverrideDiffers => "UserAgentOverrideDiffers",
                Self::ForegroundCacheLimit => "ForegroundCacheLimit",
                Self::ForwardCacheDisabled => "ForwardCacheDisabled",
                Self::BrowsingInstanceNotSwapped => "BrowsingInstanceNotSwapped",
                Self::BackForwardCacheDisabledForDelegate => "BackForwardCacheDisabledForDelegate",
                Self::UnloadHandlerExistsInMainFrame => "UnloadHandlerExistsInMainFrame",
                Self::UnloadHandlerExistsInSubFrame => "UnloadHandlerExistsInSubFrame",
                Self::ServiceWorkerUnregistration => "ServiceWorkerUnregistration",
                Self::CacheControlNoStore => "CacheControlNoStore",
                Self::CacheControlNoStoreCookieModified => "CacheControlNoStoreCookieModified",
                Self::CacheControlNoStoreHTTPOnlyCookieModified => "CacheControlNoStoreHTTPOnlyCookieModified",
                Self::NoResponseHead => "NoResponseHead",
                Self::Unknown => "Unknown",
                Self::ActivationNavigationsDisallowedForBug1234857 => "ActivationNavigationsDisallowedForBug1234857",
                Self::ErrorDocument => "ErrorDocument",
                Self::FencedFramesEmbedder => "FencedFramesEmbedder",
                Self::CookieDisabled => "CookieDisabled",
                Self::HTTPAuthRequired => "HTTPAuthRequired",
                Self::CookieFlushed => "CookieFlushed",
                Self::BroadcastChannelOnMessage => "BroadcastChannelOnMessage",
                Self::WebViewSettingsChanged => "WebViewSettingsChanged",
                Self::WebViewJavaScriptObjectChanged => "WebViewJavaScriptObjectChanged",
                Self::WebViewMessageListenerInjected => "WebViewMessageListenerInjected",
                Self::WebViewSafeBrowsingAllowlistChanged => "WebViewSafeBrowsingAllowlistChanged",
                Self::WebViewDocumentStartJavascriptChanged => "WebViewDocumentStartJavascriptChanged",
                Self::WebSocket => "WebSocket",
                Self::WebTransport => "WebTransport",
                Self::WebRTC => "WebRTC",
                Self::MainResourceHasCacheControlNoStore => "MainResourceHasCacheControlNoStore",
                Self::MainResourceHasCacheControlNoCache => "MainResourceHasCacheControlNoCache",
                Self::SubresourceHasCacheControlNoStore => "SubresourceHasCacheControlNoStore",
                Self::SubresourceHasCacheControlNoCache => "SubresourceHasCacheControlNoCache",
                Self::ContainsPlugins => "ContainsPlugins",
                Self::DocumentLoaded => "DocumentLoaded",
                Self::OutstandingNetworkRequestOthers => "OutstandingNetworkRequestOthers",
                Self::RequestedMIDIPermission => "RequestedMIDIPermission",
                Self::RequestedAudioCapturePermission => "RequestedAudioCapturePermission",
                Self::RequestedVideoCapturePermission => "RequestedVideoCapturePermission",
                Self::RequestedBackForwardCacheBlockedSensors => "RequestedBackForwardCacheBlockedSensors",
                Self::RequestedBackgroundWorkPermission => "RequestedBackgroundWorkPermission",
                Self::BroadcastChannel => "BroadcastChannel",
                Self::WebXR => "WebXR",
                Self::SharedWorker => "SharedWorker",
                Self::SharedWorkerMessage => "SharedWorkerMessage",
                Self::SharedWorkerWithNoActiveClient => "SharedWorkerWithNoActiveClient",
                Self::WebLocks => "WebLocks",
                Self::WebLocksContention => "WebLocksContention",
                Self::WebHID => "WebHID",
                Self::WebBluetooth => "WebBluetooth",
                Self::WebShare => "WebShare",
                Self::RequestedStorageAccessGrant => "RequestedStorageAccessGrant",
                Self::WebNfc => "WebNfc",
                Self::OutstandingNetworkRequestFetch => "OutstandingNetworkRequestFetch",
                Self::OutstandingNetworkRequestXHR => "OutstandingNetworkRequestXHR",
                Self::AppBanner => "AppBanner",
                Self::Printing => "Printing",
                Self::WebDatabase => "WebDatabase",
                Self::PictureInPicture => "PictureInPicture",
                Self::SpeechRecognizer => "SpeechRecognizer",
                Self::IdleManager => "IdleManager",
                Self::PaymentManager => "PaymentManager",
                Self::SpeechSynthesis => "SpeechSynthesis",
                Self::KeyboardLock => "KeyboardLock",
                Self::WebOTPService => "WebOTPService",
                Self::OutstandingNetworkRequestDirectSocket => "OutstandingNetworkRequestDirectSocket",
                Self::InjectedJavascript => "InjectedJavascript",
                Self::InjectedStyleSheet => "InjectedStyleSheet",
                Self::KeepaliveRequest => "KeepaliveRequest",
                Self::IndexedDBEvent => "IndexedDBEvent",
                Self::Dummy => "Dummy",
                Self::JsNetworkRequestReceivedCacheControlNoStoreResource => "JsNetworkRequestReceivedCacheControlNoStoreResource",
                Self::WebRTCUsedWithCCNS => "WebRTCUsedWithCCNS",
                Self::WebTransportUsedWithCCNS => "WebTransportUsedWithCCNS",
                Self::WebSocketUsedWithCCNS => "WebSocketUsedWithCCNS",
                Self::SmartCard => "SmartCard",
                Self::LiveMediaStreamTrack => "LiveMediaStreamTrack",
                Self::UnloadHandler => "UnloadHandler",
                Self::ParserAborted => "ParserAborted",
                Self::ContentSecurityHandler => "ContentSecurityHandler",
                Self::ContentWebAuthenticationAPI => "ContentWebAuthenticationAPI",
                Self::ContentFileChooser => "ContentFileChooser",
                Self::ContentSerial => "ContentSerial",
                Self::ContentFileSystemAccess => "ContentFileSystemAccess",
                Self::ContentMediaDevicesDispatcherHost => "ContentMediaDevicesDispatcherHost",
                Self::ContentWebBluetooth => "ContentWebBluetooth",
                Self::ContentWebUSB => "ContentWebUSB",
                Self::ContentMediaSessionService => "ContentMediaSessionService",
                Self::ContentScreenReader => "ContentScreenReader",
                Self::ContentDiscarded => "ContentDiscarded",
                Self::EmbedderPopupBlockerTabHelper => "EmbedderPopupBlockerTabHelper",
                Self::EmbedderSafeBrowsingTriggeredPopupBlocker => "EmbedderSafeBrowsingTriggeredPopupBlocker",
                Self::EmbedderSafeBrowsingThreatDetails => "EmbedderSafeBrowsingThreatDetails",
                Self::EmbedderAppBannerManager => "EmbedderAppBannerManager",
                Self::EmbedderDomDistillerViewerSource => "EmbedderDomDistillerViewerSource",
                Self::EmbedderDomDistillerSelfDeletingRequestDelegate => "EmbedderDomDistillerSelfDeletingRequestDelegate",
                Self::EmbedderOomInterventionTabHelper => "EmbedderOomInterventionTabHelper",
                Self::EmbedderOfflinePage => "EmbedderOfflinePage",
                Self::EmbedderChromePasswordManagerClientBindCredentialManager => "EmbedderChromePasswordManagerClientBindCredentialManager",
                Self::EmbedderPermissionRequestManager => "EmbedderPermissionRequestManager",
                Self::EmbedderModalDialog => "EmbedderModalDialog",
                Self::EmbedderExtensions => "EmbedderExtensions",
                Self::EmbedderExtensionMessaging => "EmbedderExtensionMessaging",
                Self::EmbedderExtensionMessagingForOpenPort => "EmbedderExtensionMessagingForOpenPort",
                Self::EmbedderExtensionSentMessageToCachedFrame => "EmbedderExtensionSentMessageToCachedFrame",
                Self::EmbedderExtensionFrame => "EmbedderExtensionFrame",
                Self::EmbedderPrivilegedWebContents => "EmbedderPrivilegedWebContents",
                Self::RequestedByWebViewClient => "RequestedByWebViewClient",
                Self::PostMessageByWebViewClient => "PostMessageByWebViewClient",
                Self::CacheControlNoStoreDeviceBoundSessionTerminated => "CacheControlNoStoreDeviceBoundSessionTerminated",
                Self::CacheLimitPrunedOnModerateMemoryPressure => "CacheLimitPrunedOnModerateMemoryPressure",
                Self::CacheLimitPrunedOnCriticalMemoryPressure => "CacheLimitPrunedOnCriticalMemoryPressure",
            }
        }
    }

    impl AsRef<str> for BackForwardCacheNotRestoredReason {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BackForwardCacheNotRestoredReason {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "NotPrimaryMainFrame" => Ok(Self::NotPrimaryMainFrame),
                "BackForwardCacheDisabled" => Ok(Self::BackForwardCacheDisabled),
                "RelatedActiveContentsExist" => Ok(Self::RelatedActiveContentsExist),
                "HTTPStatusNotOK" => Ok(Self::HTTPStatusNotOK),
                "SchemeNotHTTPOrHTTPS" => Ok(Self::SchemeNotHTTPOrHTTPS),
                "Loading" => Ok(Self::Loading),
                "WasGrantedMediaAccess" => Ok(Self::WasGrantedMediaAccess),
                "DisableForRenderFrameHostCalled" => Ok(Self::DisableForRenderFrameHostCalled),
                "DomainNotAllowed" => Ok(Self::DomainNotAllowed),
                "HTTPMethodNotGET" => Ok(Self::HTTPMethodNotGET),
                "SubframeIsNavigating" => Ok(Self::SubframeIsNavigating),
                "Timeout" => Ok(Self::Timeout),
                "CacheLimit" => Ok(Self::CacheLimit),
                "JavaScriptExecution" => Ok(Self::JavaScriptExecution),
                "RendererProcessKilled" => Ok(Self::RendererProcessKilled),
                "RendererProcessCrashed" => Ok(Self::RendererProcessCrashed),
                "SchedulerTrackedFeatureUsed" => Ok(Self::SchedulerTrackedFeatureUsed),
                "ConflictingBrowsingInstance" => Ok(Self::ConflictingBrowsingInstance),
                "CacheFlushed" => Ok(Self::CacheFlushed),
                "ServiceWorkerVersionActivation" => Ok(Self::ServiceWorkerVersionActivation),
                "SessionRestored" => Ok(Self::SessionRestored),
                "ServiceWorkerPostMessage" => Ok(Self::ServiceWorkerPostMessage),
                "EnteredBackForwardCacheBeforeServiceWorkerHostAdded" => Ok(Self::EnteredBackForwardCacheBeforeServiceWorkerHostAdded),
                "RenderFrameHostReused_SameSite" => Ok(Self::RenderFrameHostReusedSameSite),
                "RenderFrameHostReused_CrossSite" => Ok(Self::RenderFrameHostReusedCrossSite),
                "ServiceWorkerClaim" => Ok(Self::ServiceWorkerClaim),
                "IgnoreEventAndEvict" => Ok(Self::IgnoreEventAndEvict),
                "HaveInnerContents" => Ok(Self::HaveInnerContents),
                "TimeoutPuttingInCache" => Ok(Self::TimeoutPuttingInCache),
                "BackForwardCacheDisabledByLowMemory" => Ok(Self::BackForwardCacheDisabledByLowMemory),
                "BackForwardCacheDisabledByCommandLine" => Ok(Self::BackForwardCacheDisabledByCommandLine),
                "NetworkRequestDatapipeDrainedAsBytesConsumer" => Ok(Self::NetworkRequestDatapipeDrainedAsBytesConsumer),
                "NetworkRequestRedirected" => Ok(Self::NetworkRequestRedirected),
                "NetworkRequestTimeout" => Ok(Self::NetworkRequestTimeout),
                "NetworkExceedsBufferLimit" => Ok(Self::NetworkExceedsBufferLimit),
                "NavigationCancelledWhileRestoring" => Ok(Self::NavigationCancelledWhileRestoring),
                "NotMostRecentNavigationEntry" => Ok(Self::NotMostRecentNavigationEntry),
                "BackForwardCacheDisabledForPrerender" => Ok(Self::BackForwardCacheDisabledForPrerender),
                "UserAgentOverrideDiffers" => Ok(Self::UserAgentOverrideDiffers),
                "ForegroundCacheLimit" => Ok(Self::ForegroundCacheLimit),
                "ForwardCacheDisabled" => Ok(Self::ForwardCacheDisabled),
                "BrowsingInstanceNotSwapped" => Ok(Self::BrowsingInstanceNotSwapped),
                "BackForwardCacheDisabledForDelegate" => Ok(Self::BackForwardCacheDisabledForDelegate),
                "UnloadHandlerExistsInMainFrame" => Ok(Self::UnloadHandlerExistsInMainFrame),
                "UnloadHandlerExistsInSubFrame" => Ok(Self::UnloadHandlerExistsInSubFrame),
                "ServiceWorkerUnregistration" => Ok(Self::ServiceWorkerUnregistration),
                "CacheControlNoStore" => Ok(Self::CacheControlNoStore),
                "CacheControlNoStoreCookieModified" => Ok(Self::CacheControlNoStoreCookieModified),
                "CacheControlNoStoreHTTPOnlyCookieModified" => Ok(Self::CacheControlNoStoreHTTPOnlyCookieModified),
                "NoResponseHead" => Ok(Self::NoResponseHead),
                "Unknown" => Ok(Self::Unknown),
                "ActivationNavigationsDisallowedForBug1234857" => Ok(Self::ActivationNavigationsDisallowedForBug1234857),
                "ErrorDocument" => Ok(Self::ErrorDocument),
                "FencedFramesEmbedder" => Ok(Self::FencedFramesEmbedder),
                "CookieDisabled" => Ok(Self::CookieDisabled),
                "HTTPAuthRequired" => Ok(Self::HTTPAuthRequired),
                "CookieFlushed" => Ok(Self::CookieFlushed),
                "BroadcastChannelOnMessage" => Ok(Self::BroadcastChannelOnMessage),
                "WebViewSettingsChanged" => Ok(Self::WebViewSettingsChanged),
                "WebViewJavaScriptObjectChanged" => Ok(Self::WebViewJavaScriptObjectChanged),
                "WebViewMessageListenerInjected" => Ok(Self::WebViewMessageListenerInjected),
                "WebViewSafeBrowsingAllowlistChanged" => Ok(Self::WebViewSafeBrowsingAllowlistChanged),
                "WebViewDocumentStartJavascriptChanged" => Ok(Self::WebViewDocumentStartJavascriptChanged),
                "WebSocket" => Ok(Self::WebSocket),
                "WebTransport" => Ok(Self::WebTransport),
                "WebRTC" => Ok(Self::WebRTC),
                "MainResourceHasCacheControlNoStore" => Ok(Self::MainResourceHasCacheControlNoStore),
                "MainResourceHasCacheControlNoCache" => Ok(Self::MainResourceHasCacheControlNoCache),
                "SubresourceHasCacheControlNoStore" => Ok(Self::SubresourceHasCacheControlNoStore),
                "SubresourceHasCacheControlNoCache" => Ok(Self::SubresourceHasCacheControlNoCache),
                "ContainsPlugins" => Ok(Self::ContainsPlugins),
                "DocumentLoaded" => Ok(Self::DocumentLoaded),
                "OutstandingNetworkRequestOthers" => Ok(Self::OutstandingNetworkRequestOthers),
                "RequestedMIDIPermission" => Ok(Self::RequestedMIDIPermission),
                "RequestedAudioCapturePermission" => Ok(Self::RequestedAudioCapturePermission),
                "RequestedVideoCapturePermission" => Ok(Self::RequestedVideoCapturePermission),
                "RequestedBackForwardCacheBlockedSensors" => Ok(Self::RequestedBackForwardCacheBlockedSensors),
                "RequestedBackgroundWorkPermission" => Ok(Self::RequestedBackgroundWorkPermission),
                "BroadcastChannel" => Ok(Self::BroadcastChannel),
                "WebXR" => Ok(Self::WebXR),
                "SharedWorker" => Ok(Self::SharedWorker),
                "SharedWorkerMessage" => Ok(Self::SharedWorkerMessage),
                "SharedWorkerWithNoActiveClient" => Ok(Self::SharedWorkerWithNoActiveClient),
                "WebLocks" => Ok(Self::WebLocks),
                "WebLocksContention" => Ok(Self::WebLocksContention),
                "WebHID" => Ok(Self::WebHID),
                "WebBluetooth" => Ok(Self::WebBluetooth),
                "WebShare" => Ok(Self::WebShare),
                "RequestedStorageAccessGrant" => Ok(Self::RequestedStorageAccessGrant),
                "WebNfc" => Ok(Self::WebNfc),
                "OutstandingNetworkRequestFetch" => Ok(Self::OutstandingNetworkRequestFetch),
                "OutstandingNetworkRequestXHR" => Ok(Self::OutstandingNetworkRequestXHR),
                "AppBanner" => Ok(Self::AppBanner),
                "Printing" => Ok(Self::Printing),
                "WebDatabase" => Ok(Self::WebDatabase),
                "PictureInPicture" => Ok(Self::PictureInPicture),
                "SpeechRecognizer" => Ok(Self::SpeechRecognizer),
                "IdleManager" => Ok(Self::IdleManager),
                "PaymentManager" => Ok(Self::PaymentManager),
                "SpeechSynthesis" => Ok(Self::SpeechSynthesis),
                "KeyboardLock" => Ok(Self::KeyboardLock),
                "WebOTPService" => Ok(Self::WebOTPService),
                "OutstandingNetworkRequestDirectSocket" => Ok(Self::OutstandingNetworkRequestDirectSocket),
                "InjectedJavascript" => Ok(Self::InjectedJavascript),
                "InjectedStyleSheet" => Ok(Self::InjectedStyleSheet),
                "KeepaliveRequest" => Ok(Self::KeepaliveRequest),
                "IndexedDBEvent" => Ok(Self::IndexedDBEvent),
                "Dummy" => Ok(Self::Dummy),
                "JsNetworkRequestReceivedCacheControlNoStoreResource" => Ok(Self::JsNetworkRequestReceivedCacheControlNoStoreResource),
                "WebRTCUsedWithCCNS" => Ok(Self::WebRTCUsedWithCCNS),
                "WebTransportUsedWithCCNS" => Ok(Self::WebTransportUsedWithCCNS),
                "WebSocketUsedWithCCNS" => Ok(Self::WebSocketUsedWithCCNS),
                "SmartCard" => Ok(Self::SmartCard),
                "LiveMediaStreamTrack" => Ok(Self::LiveMediaStreamTrack),
                "UnloadHandler" => Ok(Self::UnloadHandler),
                "ParserAborted" => Ok(Self::ParserAborted),
                "ContentSecurityHandler" => Ok(Self::ContentSecurityHandler),
                "ContentWebAuthenticationAPI" => Ok(Self::ContentWebAuthenticationAPI),
                "ContentFileChooser" => Ok(Self::ContentFileChooser),
                "ContentSerial" => Ok(Self::ContentSerial),
                "ContentFileSystemAccess" => Ok(Self::ContentFileSystemAccess),
                "ContentMediaDevicesDispatcherHost" => Ok(Self::ContentMediaDevicesDispatcherHost),
                "ContentWebBluetooth" => Ok(Self::ContentWebBluetooth),
                "ContentWebUSB" => Ok(Self::ContentWebUSB),
                "ContentMediaSessionService" => Ok(Self::ContentMediaSessionService),
                "ContentScreenReader" => Ok(Self::ContentScreenReader),
                "ContentDiscarded" => Ok(Self::ContentDiscarded),
                "EmbedderPopupBlockerTabHelper" => Ok(Self::EmbedderPopupBlockerTabHelper),
                "EmbedderSafeBrowsingTriggeredPopupBlocker" => Ok(Self::EmbedderSafeBrowsingTriggeredPopupBlocker),
                "EmbedderSafeBrowsingThreatDetails" => Ok(Self::EmbedderSafeBrowsingThreatDetails),
                "EmbedderAppBannerManager" => Ok(Self::EmbedderAppBannerManager),
                "EmbedderDomDistillerViewerSource" => Ok(Self::EmbedderDomDistillerViewerSource),
                "EmbedderDomDistillerSelfDeletingRequestDelegate" => Ok(Self::EmbedderDomDistillerSelfDeletingRequestDelegate),
                "EmbedderOomInterventionTabHelper" => Ok(Self::EmbedderOomInterventionTabHelper),
                "EmbedderOfflinePage" => Ok(Self::EmbedderOfflinePage),
                "EmbedderChromePasswordManagerClientBindCredentialManager" => Ok(Self::EmbedderChromePasswordManagerClientBindCredentialManager),
                "EmbedderPermissionRequestManager" => Ok(Self::EmbedderPermissionRequestManager),
                "EmbedderModalDialog" => Ok(Self::EmbedderModalDialog),
                "EmbedderExtensions" => Ok(Self::EmbedderExtensions),
                "EmbedderExtensionMessaging" => Ok(Self::EmbedderExtensionMessaging),
                "EmbedderExtensionMessagingForOpenPort" => Ok(Self::EmbedderExtensionMessagingForOpenPort),
                "EmbedderExtensionSentMessageToCachedFrame" => Ok(Self::EmbedderExtensionSentMessageToCachedFrame),
                "EmbedderExtensionFrame" => Ok(Self::EmbedderExtensionFrame),
                "EmbedderPrivilegedWebContents" => Ok(Self::EmbedderPrivilegedWebContents),
                "RequestedByWebViewClient" => Ok(Self::RequestedByWebViewClient),
                "PostMessageByWebViewClient" => Ok(Self::PostMessageByWebViewClient),
                "CacheControlNoStoreDeviceBoundSessionTerminated" => Ok(Self::CacheControlNoStoreDeviceBoundSessionTerminated),
                "CacheLimitPrunedOnModerateMemoryPressure" => Ok(Self::CacheLimitPrunedOnModerateMemoryPressure),
                "CacheLimitPrunedOnCriticalMemoryPressure" => Ok(Self::CacheLimitPrunedOnCriticalMemoryPressure),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BackForwardCacheNotRestoredReason",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BackForwardCacheNotRestoredReasonType {
        SupportPending,
        PageSupportNeeded,
        Circumstantial,
    }

    impl BackForwardCacheNotRestoredReasonType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SupportPending => "SupportPending",
                Self::PageSupportNeeded => "PageSupportNeeded",
                Self::Circumstantial => "Circumstantial",
            }
        }
    }

    impl AsRef<str> for BackForwardCacheNotRestoredReasonType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BackForwardCacheNotRestoredReasonType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SupportPending" => Ok(Self::SupportPending),
                "PageSupportNeeded" => Ok(Self::PageSupportNeeded),
                "Circumstantial" => Ok(Self::Circumstantial),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BackForwardCacheNotRestoredReasonType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BackForwardCacheBlockingDetails {
        pub url: Option<String>,
        pub function: Option<String>,
        pub line_number: i64,
        pub column_number: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BackForwardCacheNotRestoredExplanation {
        pub type_: crate::generated::page::BackForwardCacheNotRestoredReasonType,
        pub reason: crate::generated::page::BackForwardCacheNotRestoredReason,
        pub context: Option<String>,
        pub details: Option<Vec<Box<crate::generated::page::BackForwardCacheBlockingDetails>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BackForwardCacheNotRestoredExplanationTree {
        pub url: String,
        pub explanations: Vec<Box<crate::generated::page::BackForwardCacheNotRestoredExplanation>>,
        pub children: Vec<Box<crate::generated::page::BackForwardCacheNotRestoredExplanationTree>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScriptToEvaluateOnLoadParams {
            pub script_source: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScriptToEvaluateOnLoadResult {
            pub identifier: crate::generated::page::ScriptIdentifier,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScriptToEvaluateOnNewDocumentParams {
            pub source: String,
            pub world_name: Option<String>,
            pub include_command_line_api: Option<bool>,
            pub run_immediately: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddScriptToEvaluateOnNewDocumentResult {
            pub identifier: crate::generated::page::ScriptIdentifier,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BringToFrontParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct BringToFrontResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum CaptureScreenshotFormatParamEnum {
            Jpeg,
            Png,
            Webp,
        }

        impl CaptureScreenshotFormatParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Jpeg => "jpeg",
                    Self::Png => "png",
                    Self::Webp => "webp",
                }
            }
        }

        impl AsRef<str> for CaptureScreenshotFormatParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for CaptureScreenshotFormatParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "jpeg" => Ok(Self::Jpeg),
                    "png" => Ok(Self::Png),
                    "webp" => Ok(Self::Webp),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "CaptureScreenshotFormatParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureScreenshotParams {
            pub format: Option<crate::generated::page::commands::CaptureScreenshotFormatParamEnum>,
            pub quality: Option<i64>,
            pub clip: Option<Box<crate::generated::page::Viewport>>,
            pub from_surface: Option<bool>,
            pub capture_beyond_viewport: Option<bool>,
            pub optimize_for_speed: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureScreenshotResult {
            pub data: String,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum CaptureSnapshotFormatParamEnum {
            Mhtml,
        }

        impl CaptureSnapshotFormatParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Mhtml => "mhtml",
                }
            }
        }

        impl AsRef<str> for CaptureSnapshotFormatParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for CaptureSnapshotFormatParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mhtml" => Ok(Self::Mhtml),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "CaptureSnapshotFormatParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureSnapshotParams {
            pub format: Option<crate::generated::page::commands::CaptureSnapshotFormatParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CaptureSnapshotResult {
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceMetricsOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceMetricsOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceOrientationOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDeviceOrientationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearGeolocationOverrideParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearGeolocationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateIsolatedWorldParams {
            pub frame_id: crate::generated::page::FrameId,
            pub world_name: Option<String>,
            pub grant_univeral_access: Option<bool>,
            pub content_security_policy: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateIsolatedWorldResult {
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCookieParams {
            pub cookie_name: String,
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteCookieResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub enable_file_chooser_opened_event: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAppManifestParams {
            pub manifest_id: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAppManifestResult {
            pub url: String,
            pub errors: Vec<Box<crate::generated::page::AppManifestError>>,
            pub data: Option<String>,
            pub parsed: Option<Box<crate::generated::page::AppManifestParsedProperties>>,
            pub manifest: Box<crate::generated::page::WebAppManifest>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInstallabilityErrorsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInstallabilityErrorsResult {
            pub installability_errors: Vec<Box<crate::generated::page::InstallabilityError>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetManifestIconsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetManifestIconsResult {
            pub primary_icon: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAppIdParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAppIdResult {
            pub app_id: Option<String>,
            pub recommended_id: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAdScriptAncestryParams {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAdScriptAncestryResult {
            pub ad_script_ancestry: Option<Box<crate::generated::network::AdAncestry>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFrameTreeParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFrameTreeResult {
            pub frame_tree: Box<crate::generated::page::FrameTree>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLayoutMetricsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetLayoutMetricsResult {
            pub layout_viewport: Box<crate::generated::page::LayoutViewport>,
            pub visual_viewport: Box<crate::generated::page::VisualViewport>,
            pub content_size: Box<crate::generated::dom::Rect>,
            pub css_layout_viewport: Box<crate::generated::page::LayoutViewport>,
            pub css_visual_viewport: Box<crate::generated::page::VisualViewport>,
            pub css_content_size: Box<crate::generated::dom::Rect>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNavigationHistoryParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetNavigationHistoryResult {
            pub current_index: i64,
            pub entries: Vec<Box<crate::generated::page::NavigationEntry>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetNavigationHistoryParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetNavigationHistoryResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResourceContentParams {
            pub frame_id: crate::generated::page::FrameId,
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResourceContentResult {
            pub content: String,
            pub base64_encoded: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResourceTreeParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetResourceTreeResult {
            pub frame_tree: Box<crate::generated::page::FrameResourceTree>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HandleJavaScriptDialogParams {
            pub accept: bool,
            pub prompt_text: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HandleJavaScriptDialogResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct NavigateParams {
            pub url: String,
            pub referrer: Option<String>,
            pub transition_type: Option<crate::generated::page::TransitionType>,
            pub frame_id: Option<crate::generated::page::FrameId>,
            pub referrer_policy: Option<crate::generated::page::ReferrerPolicy>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NavigateResult {
            pub frame_id: crate::generated::page::FrameId,
            pub loader_id: Option<crate::generated::network::LoaderId>,
            pub error_text: Option<String>,
            pub is_download: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NavigateToHistoryEntryParams {
            pub entry_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NavigateToHistoryEntryResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum PrintToPDFTransferModeParamEnum {
            ReturnAsBase64,
            ReturnAsStream,
        }

        impl PrintToPDFTransferModeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::ReturnAsBase64 => "ReturnAsBase64",
                    Self::ReturnAsStream => "ReturnAsStream",
                }
            }
        }

        impl AsRef<str> for PrintToPDFTransferModeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for PrintToPDFTransferModeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "ReturnAsBase64" => Ok(Self::ReturnAsBase64),
                    "ReturnAsStream" => Ok(Self::ReturnAsStream),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "PrintToPDFTransferModeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrintToPDFParams {
            pub landscape: Option<bool>,
            pub display_header_footer: Option<bool>,
            pub print_background: Option<bool>,
            pub scale: Option<f64>,
            pub paper_width: Option<f64>,
            pub paper_height: Option<f64>,
            pub margin_top: Option<f64>,
            pub margin_bottom: Option<f64>,
            pub margin_left: Option<f64>,
            pub margin_right: Option<f64>,
            pub page_ranges: Option<String>,
            pub header_template: Option<String>,
            pub footer_template: Option<String>,
            pub prefer_css_page_size: Option<bool>,
            pub transfer_mode: Option<crate::generated::page::commands::PrintToPDFTransferModeParamEnum>,
            pub generate_tagged_pdf: Option<bool>,
            pub generate_document_outline: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrintToPDFResult {
            pub data: String,
            pub stream: Option<crate::generated::io::StreamHandle>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReloadParams {
            pub ignore_cache: Option<bool>,
            pub script_to_evaluate_on_load: Option<String>,
            pub loader_id: Option<crate::generated::network::LoaderId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReloadResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScriptToEvaluateOnLoadParams {
            pub identifier: crate::generated::page::ScriptIdentifier,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScriptToEvaluateOnLoadResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScriptToEvaluateOnNewDocumentParams {
            pub identifier: crate::generated::page::ScriptIdentifier,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveScriptToEvaluateOnNewDocumentResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreencastFrameAckParams {
            pub session_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreencastFrameAckResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInResourceParams {
            pub frame_id: crate::generated::page::FrameId,
            pub url: String,
            pub query: String,
            pub case_sensitive: Option<bool>,
            pub is_regex: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInResourceResult {
            pub result: Vec<Box<crate::generated::debugger::SearchMatch>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAdBlockingEnabledParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAdBlockingEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBypassCSPParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBypassCSPResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPermissionsPolicyStateParams {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPermissionsPolicyStateResult {
            pub states: Vec<Box<crate::generated::page::PermissionsPolicyFeatureState>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOriginTrialsParams {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetOriginTrialsResult {
            pub origin_trials: Vec<Box<crate::generated::page::OriginTrial>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceMetricsOverrideParams {
            pub width: i64,
            pub height: i64,
            pub device_scale_factor: f64,
            pub mobile: bool,
            pub scale: Option<f64>,
            pub screen_width: Option<i64>,
            pub screen_height: Option<i64>,
            pub position_x: Option<i64>,
            pub position_y: Option<i64>,
            pub dont_set_visible_size: Option<bool>,
            pub screen_orientation: Option<Box<crate::generated::emulation::ScreenOrientation>>,
            pub viewport: Option<Box<crate::generated::page::Viewport>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceMetricsOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceOrientationOverrideParams {
            pub alpha: f64,
            pub beta: f64,
            pub gamma: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDeviceOrientationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFontFamiliesParams {
            pub font_families: Box<crate::generated::page::FontFamilies>,
            pub for_scripts: Option<Vec<Box<crate::generated::page::ScriptFontFamilies>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFontFamiliesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFontSizesParams {
            pub font_sizes: Box<crate::generated::page::FontSizes>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetFontSizesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDocumentContentParams {
            pub frame_id: crate::generated::page::FrameId,
            pub html: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDocumentContentResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetDownloadBehaviorBehaviorParamEnum {
            Deny,
            Allow,
            Default,
        }

        impl SetDownloadBehaviorBehaviorParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Deny => "deny",
                    Self::Allow => "allow",
                    Self::Default => "default",
                }
            }
        }

        impl AsRef<str> for SetDownloadBehaviorBehaviorParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetDownloadBehaviorBehaviorParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "deny" => Ok(Self::Deny),
                    "allow" => Ok(Self::Allow),
                    "default" => Ok(Self::Default),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetDownloadBehaviorBehaviorParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDownloadBehaviorParams {
            pub behavior: crate::generated::page::commands::SetDownloadBehaviorBehaviorParamEnum,
            pub download_path: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDownloadBehaviorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetGeolocationOverrideParams {
            pub latitude: Option<f64>,
            pub longitude: Option<f64>,
            pub accuracy: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetGeolocationOverrideResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLifecycleEventsEnabledParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetLifecycleEventsEnabledResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetTouchEmulationEnabledConfigurationParamEnum {
            Mobile,
            Desktop,
        }

        impl SetTouchEmulationEnabledConfigurationParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Mobile => "mobile",
                    Self::Desktop => "desktop",
                }
            }
        }

        impl AsRef<str> for SetTouchEmulationEnabledConfigurationParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetTouchEmulationEnabledConfigurationParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "mobile" => Ok(Self::Mobile),
                    "desktop" => Ok(Self::Desktop),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetTouchEmulationEnabledConfigurationParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTouchEmulationEnabledParams {
            pub enabled: bool,
            pub configuration: Option<crate::generated::page::commands::SetTouchEmulationEnabledConfigurationParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTouchEmulationEnabledResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum StartScreencastFormatParamEnum {
            Jpeg,
            Png,
        }

        impl StartScreencastFormatParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Jpeg => "jpeg",
                    Self::Png => "png",
                }
            }
        }

        impl AsRef<str> for StartScreencastFormatParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for StartScreencastFormatParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "jpeg" => Ok(Self::Jpeg),
                    "png" => Ok(Self::Png),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "StartScreencastFormatParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartScreencastParams {
            pub format: Option<crate::generated::page::commands::StartScreencastFormatParamEnum>,
            pub quality: Option<i64>,
            pub max_width: Option<i64>,
            pub max_height: Option<i64>,
            pub every_nth_frame: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartScreencastResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartScreenRecordingParams {
            pub audio: Option<bool>,
            pub max_width: Option<i64>,
            pub max_height: Option<i64>,
            pub frame_rate: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartScreenRecordingResult {
            pub stream: crate::generated::io::StreamHandle,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopScreenRecordingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopScreenRecordingResult {
            pub stream: crate::generated::io::StreamHandle,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopLoadingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopLoadingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CrashResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetWebLifecycleStateStateParamEnum {
            Frozen,
            Active,
        }

        impl SetWebLifecycleStateStateParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Frozen => "frozen",
                    Self::Active => "active",
                }
            }
        }

        impl AsRef<str> for SetWebLifecycleStateStateParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetWebLifecycleStateStateParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "frozen" => Ok(Self::Frozen),
                    "active" => Ok(Self::Active),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetWebLifecycleStateStateParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetWebLifecycleStateParams {
            pub state: crate::generated::page::commands::SetWebLifecycleStateStateParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetWebLifecycleStateResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopScreencastParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopScreencastResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ProduceCompilationCacheParams {
            pub scripts: Vec<Box<crate::generated::page::CompilationCacheParams>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ProduceCompilationCacheResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCompilationCacheParams {
            pub url: String,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCompilationCacheResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCompilationCacheParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCompilationCacheResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetSPCTransactionModeModeParamEnum {
            None,
            AutoAccept,
            AutoChooseToAuthAnotherWay,
            AutoReject,
            AutoOptOut,
        }

        impl SetSPCTransactionModeModeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::None => "none",
                    Self::AutoAccept => "autoAccept",
                    Self::AutoChooseToAuthAnotherWay => "autoChooseToAuthAnotherWay",
                    Self::AutoReject => "autoReject",
                    Self::AutoOptOut => "autoOptOut",
                }
            }
        }

        impl AsRef<str> for SetSPCTransactionModeModeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetSPCTransactionModeModeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "none" => Ok(Self::None),
                    "autoAccept" => Ok(Self::AutoAccept),
                    "autoChooseToAuthAnotherWay" => Ok(Self::AutoChooseToAuthAnotherWay),
                    "autoReject" => Ok(Self::AutoReject),
                    "autoOptOut" => Ok(Self::AutoOptOut),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetSPCTransactionModeModeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSPCTransactionModeParams {
            pub mode: crate::generated::page::commands::SetSPCTransactionModeModeParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSPCTransactionModeResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetRPHRegistrationModeModeParamEnum {
            None,
            AutoAccept,
            AutoReject,
        }

        impl SetRPHRegistrationModeModeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::None => "none",
                    Self::AutoAccept => "autoAccept",
                    Self::AutoReject => "autoReject",
                }
            }
        }

        impl AsRef<str> for SetRPHRegistrationModeModeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetRPHRegistrationModeModeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "none" => Ok(Self::None),
                    "autoAccept" => Ok(Self::AutoAccept),
                    "autoReject" => Ok(Self::AutoReject),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetRPHRegistrationModeModeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRPHRegistrationModeParams {
            pub mode: crate::generated::page::commands::SetRPHRegistrationModeModeParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRPHRegistrationModeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GenerateTestReportParams {
            pub message: String,
            pub group: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GenerateTestReportResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct WaitForDebuggerParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct WaitForDebuggerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInterceptFileChooserDialogParams {
            pub enabled: bool,
            pub cancel: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInterceptFileChooserDialogResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPrerenderingAllowedParams {
            pub is_allowed: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPrerenderingAllowedResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnnotatedPageContentParams {
            pub include_actionable_information: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAnnotatedPageContentResult {
            pub content: String,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DomContentEventFiredEvent {
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum FileChooserOpenedModeEventEnum {
            SelectSingle,
            SelectMultiple,
        }

        impl FileChooserOpenedModeEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::SelectSingle => "selectSingle",
                    Self::SelectMultiple => "selectMultiple",
                }
            }
        }

        impl AsRef<str> for FileChooserOpenedModeEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for FileChooserOpenedModeEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "selectSingle" => Ok(Self::SelectSingle),
                    "selectMultiple" => Ok(Self::SelectMultiple),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "FileChooserOpenedModeEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FileChooserOpenedEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub mode: crate::generated::page::events::FileChooserOpenedModeEventEnum,
            pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameAttachedEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub parent_frame_id: crate::generated::page::FrameId,
            pub stack: Option<Box<crate::generated::runtime::StackTrace>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameClearedScheduledNavigationEvent {
            pub frame_id: crate::generated::page::FrameId,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum FrameDetachedReasonEventEnum {
            Remove,
            Swap,
        }

        impl FrameDetachedReasonEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Remove => "remove",
                    Self::Swap => "swap",
                }
            }
        }

        impl AsRef<str> for FrameDetachedReasonEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for FrameDetachedReasonEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "remove" => Ok(Self::Remove),
                    "swap" => Ok(Self::Swap),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "FrameDetachedReasonEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameDetachedEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub reason: crate::generated::page::events::FrameDetachedReasonEventEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameSubtreeWillBeDetachedEvent {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameNavigatedEvent {
            pub frame: Box<crate::generated::page::Frame>,
            pub type_: crate::generated::page::NavigationType,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DocumentOpenedEvent {
            pub frame: Box<crate::generated::page::Frame>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameResizedEvent;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum FrameStartedNavigatingNavigationTypeEventEnum {
            Reload,
            ReloadBypassingCache,
            Restore,
            RestoreWithPost,
            HistorySameDocument,
            HistoryDifferentDocument,
            SameDocument,
            DifferentDocument,
        }

        impl FrameStartedNavigatingNavigationTypeEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Reload => "reload",
                    Self::ReloadBypassingCache => "reloadBypassingCache",
                    Self::Restore => "restore",
                    Self::RestoreWithPost => "restoreWithPost",
                    Self::HistorySameDocument => "historySameDocument",
                    Self::HistoryDifferentDocument => "historyDifferentDocument",
                    Self::SameDocument => "sameDocument",
                    Self::DifferentDocument => "differentDocument",
                }
            }
        }

        impl AsRef<str> for FrameStartedNavigatingNavigationTypeEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for FrameStartedNavigatingNavigationTypeEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "reload" => Ok(Self::Reload),
                    "reloadBypassingCache" => Ok(Self::ReloadBypassingCache),
                    "restore" => Ok(Self::Restore),
                    "restoreWithPost" => Ok(Self::RestoreWithPost),
                    "historySameDocument" => Ok(Self::HistorySameDocument),
                    "historyDifferentDocument" => Ok(Self::HistoryDifferentDocument),
                    "sameDocument" => Ok(Self::SameDocument),
                    "differentDocument" => Ok(Self::DifferentDocument),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "FrameStartedNavigatingNavigationTypeEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameStartedNavigatingEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub url: String,
            pub loader_id: crate::generated::network::LoaderId,
            pub navigation_type: crate::generated::page::events::FrameStartedNavigatingNavigationTypeEventEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameRequestedNavigationEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub reason: crate::generated::page::ClientNavigationReason,
            pub url: String,
            pub disposition: crate::generated::page::ClientNavigationDisposition,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameScheduledNavigationEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub delay: f64,
            pub reason: crate::generated::page::ClientNavigationReason,
            pub url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameStartedLoadingEvent {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct FrameStoppedLoadingEvent {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DownloadWillBeginEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub guid: String,
            pub url: String,
            pub suggested_filename: String,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum DownloadProgressStateEventEnum {
            InProgress,
            Completed,
            Canceled,
        }

        impl DownloadProgressStateEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::InProgress => "inProgress",
                    Self::Completed => "completed",
                    Self::Canceled => "canceled",
                }
            }
        }

        impl AsRef<str> for DownloadProgressStateEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for DownloadProgressStateEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "inProgress" => Ok(Self::InProgress),
                    "completed" => Ok(Self::Completed),
                    "canceled" => Ok(Self::Canceled),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "DownloadProgressStateEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DownloadProgressEvent {
            pub guid: String,
            pub total_bytes: f64,
            pub received_bytes: f64,
            pub state: crate::generated::page::events::DownloadProgressStateEventEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InterstitialHiddenEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct InterstitialShownEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct JavascriptDialogClosedEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub result: bool,
            pub user_input: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct JavascriptDialogOpeningEvent {
            pub url: String,
            pub frame_id: crate::generated::page::FrameId,
            pub message: String,
            pub type_: crate::generated::page::DialogType,
            pub has_browser_handler: bool,
            pub default_prompt: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LifecycleEventEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub loader_id: crate::generated::network::LoaderId,
            pub name: String,
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BackForwardCacheNotUsedEvent {
            pub loader_id: crate::generated::network::LoaderId,
            pub frame_id: crate::generated::page::FrameId,
            pub not_restored_explanations: Vec<Box<crate::generated::page::BackForwardCacheNotRestoredExplanation>>,
            pub not_restored_explanations_tree: Option<Box<crate::generated::page::BackForwardCacheNotRestoredExplanationTree>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LoadEventFiredEvent {
            pub timestamp: crate::generated::network::MonotonicTime,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum NavigatedWithinDocumentNavigationTypeEventEnum {
            Fragment,
            HistoryApi,
            Other,
        }

        impl NavigatedWithinDocumentNavigationTypeEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Fragment => "fragment",
                    Self::HistoryApi => "historyApi",
                    Self::Other => "other",
                }
            }
        }

        impl AsRef<str> for NavigatedWithinDocumentNavigationTypeEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for NavigatedWithinDocumentNavigationTypeEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "fragment" => Ok(Self::Fragment),
                    "historyApi" => Ok(Self::HistoryApi),
                    "other" => Ok(Self::Other),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "NavigatedWithinDocumentNavigationTypeEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NavigatedWithinDocumentEvent {
            pub frame_id: crate::generated::page::FrameId,
            pub url: String,
            pub navigation_type: crate::generated::page::events::NavigatedWithinDocumentNavigationTypeEventEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreencastFrameEvent {
            pub data: String,
            pub metadata: Box<crate::generated::page::ScreencastFrameMetadata>,
            pub session_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScreencastVisibilityChangedEvent {
            pub visible: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WindowOpenEvent {
            pub url: String,
            pub window_name: String,
            pub window_features: Vec<String>,
            pub user_gesture: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CompilationCacheProducedEvent {
            pub url: String,
            pub data: String,
        }
    }
}

pub mod performance {
    #[derive(Clone, Debug, PartialEq)]
    pub struct Metric {
        pub name: String,
        pub value: f64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum EnableTimeDomainParamEnum {
            TimeTicks,
            ThreadTicks,
        }

        impl EnableTimeDomainParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::TimeTicks => "timeTicks",
                    Self::ThreadTicks => "threadTicks",
                }
            }
        }

        impl AsRef<str> for EnableTimeDomainParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for EnableTimeDomainParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "timeTicks" => Ok(Self::TimeTicks),
                    "threadTicks" => Ok(Self::ThreadTicks),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "EnableTimeDomainParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub time_domain: Option<crate::generated::performance::commands::EnableTimeDomainParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetTimeDomainTimeDomainParamEnum {
            TimeTicks,
            ThreadTicks,
        }

        impl SetTimeDomainTimeDomainParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::TimeTicks => "timeTicks",
                    Self::ThreadTicks => "threadTicks",
                }
            }
        }

        impl AsRef<str> for SetTimeDomainTimeDomainParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetTimeDomainTimeDomainParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "timeTicks" => Ok(Self::TimeTicks),
                    "threadTicks" => Ok(Self::ThreadTicks),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetTimeDomainTimeDomainParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimeDomainParams {
            pub time_domain: crate::generated::performance::commands::SetTimeDomainTimeDomainParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetTimeDomainResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMetricsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetMetricsResult {
            pub metrics: Vec<Box<crate::generated::performance::Metric>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct MetricsEvent {
            pub metrics: Vec<Box<crate::generated::performance::Metric>>,
            pub title: String,
        }
    }
}

pub mod performance_timeline {
    #[derive(Clone, Debug, PartialEq)]
    pub struct LargestContentfulPaint {
        pub render_time: crate::generated::network::TimeSinceEpoch,
        pub load_time: crate::generated::network::TimeSinceEpoch,
        pub size: f64,
        pub element_id: Option<String>,
        pub url: Option<String>,
        pub node_id: Option<crate::generated::dom::BackendNodeId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LayoutShiftAttribution {
        pub previous_rect: Box<crate::generated::dom::Rect>,
        pub current_rect: Box<crate::generated::dom::Rect>,
        pub node_id: Option<crate::generated::dom::BackendNodeId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LayoutShift {
        pub value: f64,
        pub had_recent_input: bool,
        pub last_input_time: crate::generated::network::TimeSinceEpoch,
        pub sources: Vec<Box<crate::generated::performance_timeline::LayoutShiftAttribution>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct TimelineEvent {
        pub frame_id: crate::generated::page::FrameId,
        pub type_: String,
        pub name: String,
        pub time: crate::generated::network::TimeSinceEpoch,
        pub duration: Option<f64>,
        pub lcp_details: Option<Box<crate::generated::performance_timeline::LargestContentfulPaint>>,
        pub layout_shift_details: Option<Box<crate::generated::performance_timeline::LayoutShift>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub event_types: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct TimelineEventAddedEvent {
            pub event: Box<crate::generated::performance_timeline::TimelineEvent>,
        }
    }
}

pub mod preload {
    pub type RuleSetId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct RuleSet {
        pub id: crate::generated::preload::RuleSetId,
        pub loader_id: crate::generated::network::LoaderId,
        pub source_text: String,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub url: Option<String>,
        pub request_id: Option<crate::generated::network::RequestId>,
        pub error_type: Option<crate::generated::preload::RuleSetErrorType>,
        pub error_message: Option<String>,
        pub tag: Option<String>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RuleSetErrorType {
        SourceIsNotJsonObject,
        InvalidRulesSkipped,
        InvalidRulesetLevelTag,
    }

    impl RuleSetErrorType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SourceIsNotJsonObject => "SourceIsNotJsonObject",
                Self::InvalidRulesSkipped => "InvalidRulesSkipped",
                Self::InvalidRulesetLevelTag => "InvalidRulesetLevelTag",
            }
        }
    }

    impl AsRef<str> for RuleSetErrorType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RuleSetErrorType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SourceIsNotJsonObject" => Ok(Self::SourceIsNotJsonObject),
                "InvalidRulesSkipped" => Ok(Self::InvalidRulesSkipped),
                "InvalidRulesetLevelTag" => Ok(Self::InvalidRulesetLevelTag),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RuleSetErrorType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SpeculationAction {
        Prefetch,
        Prerender,
        PrerenderUntilScript,
    }

    impl SpeculationAction {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Prefetch => "Prefetch",
                Self::Prerender => "Prerender",
                Self::PrerenderUntilScript => "PrerenderUntilScript",
            }
        }
    }

    impl AsRef<str> for SpeculationAction {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SpeculationAction {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Prefetch" => Ok(Self::Prefetch),
                "Prerender" => Ok(Self::Prerender),
                "PrerenderUntilScript" => Ok(Self::PrerenderUntilScript),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SpeculationAction",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SpeculationTargetHint {
        Blank,
        ValueSelf,
    }

    impl SpeculationTargetHint {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Blank => "Blank",
                Self::ValueSelf => "Self",
            }
        }
    }

    impl AsRef<str> for SpeculationTargetHint {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SpeculationTargetHint {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Blank" => Ok(Self::Blank),
                "Self" => Ok(Self::ValueSelf),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SpeculationTargetHint",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PreloadingAttemptKey {
        pub loader_id: crate::generated::network::LoaderId,
        pub action: crate::generated::preload::SpeculationAction,
        pub url: String,
        pub form_submission: Option<bool>,
        pub target_hint: Option<crate::generated::preload::SpeculationTargetHint>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PreloadingAttemptSource {
        pub key: Box<crate::generated::preload::PreloadingAttemptKey>,
        pub rule_set_ids: Vec<crate::generated::preload::RuleSetId>,
        pub node_ids: Vec<crate::generated::dom::BackendNodeId>,
    }
    pub type PreloadPipelineId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PrerenderFinalStatus {
        Activated,
        Destroyed,
        LowEndDevice,
        InvalidSchemeRedirect,
        InvalidSchemeNavigation,
        NavigationRequestBlockedByCsp,
        MojoBinderPolicy,
        RendererProcessCrashed,
        RendererProcessKilled,
        Download,
        TriggerDestroyed,
        NavigationNotCommitted,
        NavigationBadHttpStatus,
        ClientCertRequested,
        NavigationRequestNetworkError,
        CancelAllHostsForTesting,
        DidFailLoad,
        Stop,
        SslCertificateError,
        LoginAuthRequested,
        UaChangeRequiresReload,
        BlockedByClient,
        AudioOutputDeviceRequested,
        MixedContent,
        TriggerBackgrounded,
        MemoryLimitExceeded,
        DataSaverEnabled,
        TriggerUrlHasEffectiveUrl,
        ActivatedBeforeStarted,
        InactivePageRestriction,
        StartFailed,
        TimeoutBackgrounded,
        CrossSiteRedirectInInitialNavigation,
        CrossSiteNavigationInInitialNavigation,
        SameSiteCrossOriginRedirectNotOptInInInitialNavigation,
        SameSiteCrossOriginNavigationNotOptInInInitialNavigation,
        ActivationNavigationParameterMismatch,
        ActivatedInBackground,
        EmbedderHostDisallowed,
        ActivationNavigationDestroyedBeforeSuccess,
        TabClosedByUserGesture,
        TabClosedWithoutUserGesture,
        PrimaryMainFrameRendererProcessCrashed,
        PrimaryMainFrameRendererProcessKilled,
        ActivationFramePolicyNotCompatible,
        PreloadingDisabled,
        BatterySaverEnabled,
        ActivatedDuringMainFrameNavigation,
        PreloadingUnsupportedByWebContents,
        CrossSiteRedirectInMainFrameNavigation,
        CrossSiteNavigationInMainFrameNavigation,
        SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation,
        SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation,
        MemoryPressureOnTrigger,
        MemoryPressureAfterTriggered,
        PrerenderingDisabledByDevTools,
        SpeculationRuleRemoved,
        ActivatedWithAuxiliaryBrowsingContexts,
        MaxNumOfRunningEagerPrerendersExceeded,
        MaxNumOfRunningNonEagerPrerendersExceeded,
        MaxNumOfRunningEmbedderPrerendersExceeded,
        PrerenderingUrlHasEffectiveUrl,
        RedirectedPrerenderingUrlHasEffectiveUrl,
        ActivationUrlHasEffectiveUrl,
        JavaScriptInterfaceAdded,
        JavaScriptInterfaceRemoved,
        AllPrerenderingCanceled,
        WindowClosed,
        SlowNetwork,
        OtherPrerenderedPageActivated,
        V8OptimizerDisabled,
        PrerenderFailedDuringPrefetch,
        BrowsingDataRemoved,
        PrerenderHostReused,
        FormSubmitWhenPrerendering,
        CrossDocumentRestart,
    }

    impl PrerenderFinalStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Activated => "Activated",
                Self::Destroyed => "Destroyed",
                Self::LowEndDevice => "LowEndDevice",
                Self::InvalidSchemeRedirect => "InvalidSchemeRedirect",
                Self::InvalidSchemeNavigation => "InvalidSchemeNavigation",
                Self::NavigationRequestBlockedByCsp => "NavigationRequestBlockedByCsp",
                Self::MojoBinderPolicy => "MojoBinderPolicy",
                Self::RendererProcessCrashed => "RendererProcessCrashed",
                Self::RendererProcessKilled => "RendererProcessKilled",
                Self::Download => "Download",
                Self::TriggerDestroyed => "TriggerDestroyed",
                Self::NavigationNotCommitted => "NavigationNotCommitted",
                Self::NavigationBadHttpStatus => "NavigationBadHttpStatus",
                Self::ClientCertRequested => "ClientCertRequested",
                Self::NavigationRequestNetworkError => "NavigationRequestNetworkError",
                Self::CancelAllHostsForTesting => "CancelAllHostsForTesting",
                Self::DidFailLoad => "DidFailLoad",
                Self::Stop => "Stop",
                Self::SslCertificateError => "SslCertificateError",
                Self::LoginAuthRequested => "LoginAuthRequested",
                Self::UaChangeRequiresReload => "UaChangeRequiresReload",
                Self::BlockedByClient => "BlockedByClient",
                Self::AudioOutputDeviceRequested => "AudioOutputDeviceRequested",
                Self::MixedContent => "MixedContent",
                Self::TriggerBackgrounded => "TriggerBackgrounded",
                Self::MemoryLimitExceeded => "MemoryLimitExceeded",
                Self::DataSaverEnabled => "DataSaverEnabled",
                Self::TriggerUrlHasEffectiveUrl => "TriggerUrlHasEffectiveUrl",
                Self::ActivatedBeforeStarted => "ActivatedBeforeStarted",
                Self::InactivePageRestriction => "InactivePageRestriction",
                Self::StartFailed => "StartFailed",
                Self::TimeoutBackgrounded => "TimeoutBackgrounded",
                Self::CrossSiteRedirectInInitialNavigation => "CrossSiteRedirectInInitialNavigation",
                Self::CrossSiteNavigationInInitialNavigation => "CrossSiteNavigationInInitialNavigation",
                Self::SameSiteCrossOriginRedirectNotOptInInInitialNavigation => "SameSiteCrossOriginRedirectNotOptInInInitialNavigation",
                Self::SameSiteCrossOriginNavigationNotOptInInInitialNavigation => "SameSiteCrossOriginNavigationNotOptInInInitialNavigation",
                Self::ActivationNavigationParameterMismatch => "ActivationNavigationParameterMismatch",
                Self::ActivatedInBackground => "ActivatedInBackground",
                Self::EmbedderHostDisallowed => "EmbedderHostDisallowed",
                Self::ActivationNavigationDestroyedBeforeSuccess => "ActivationNavigationDestroyedBeforeSuccess",
                Self::TabClosedByUserGesture => "TabClosedByUserGesture",
                Self::TabClosedWithoutUserGesture => "TabClosedWithoutUserGesture",
                Self::PrimaryMainFrameRendererProcessCrashed => "PrimaryMainFrameRendererProcessCrashed",
                Self::PrimaryMainFrameRendererProcessKilled => "PrimaryMainFrameRendererProcessKilled",
                Self::ActivationFramePolicyNotCompatible => "ActivationFramePolicyNotCompatible",
                Self::PreloadingDisabled => "PreloadingDisabled",
                Self::BatterySaverEnabled => "BatterySaverEnabled",
                Self::ActivatedDuringMainFrameNavigation => "ActivatedDuringMainFrameNavigation",
                Self::PreloadingUnsupportedByWebContents => "PreloadingUnsupportedByWebContents",
                Self::CrossSiteRedirectInMainFrameNavigation => "CrossSiteRedirectInMainFrameNavigation",
                Self::CrossSiteNavigationInMainFrameNavigation => "CrossSiteNavigationInMainFrameNavigation",
                Self::SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation => "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation",
                Self::SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation => "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation",
                Self::MemoryPressureOnTrigger => "MemoryPressureOnTrigger",
                Self::MemoryPressureAfterTriggered => "MemoryPressureAfterTriggered",
                Self::PrerenderingDisabledByDevTools => "PrerenderingDisabledByDevTools",
                Self::SpeculationRuleRemoved => "SpeculationRuleRemoved",
                Self::ActivatedWithAuxiliaryBrowsingContexts => "ActivatedWithAuxiliaryBrowsingContexts",
                Self::MaxNumOfRunningEagerPrerendersExceeded => "MaxNumOfRunningEagerPrerendersExceeded",
                Self::MaxNumOfRunningNonEagerPrerendersExceeded => "MaxNumOfRunningNonEagerPrerendersExceeded",
                Self::MaxNumOfRunningEmbedderPrerendersExceeded => "MaxNumOfRunningEmbedderPrerendersExceeded",
                Self::PrerenderingUrlHasEffectiveUrl => "PrerenderingUrlHasEffectiveUrl",
                Self::RedirectedPrerenderingUrlHasEffectiveUrl => "RedirectedPrerenderingUrlHasEffectiveUrl",
                Self::ActivationUrlHasEffectiveUrl => "ActivationUrlHasEffectiveUrl",
                Self::JavaScriptInterfaceAdded => "JavaScriptInterfaceAdded",
                Self::JavaScriptInterfaceRemoved => "JavaScriptInterfaceRemoved",
                Self::AllPrerenderingCanceled => "AllPrerenderingCanceled",
                Self::WindowClosed => "WindowClosed",
                Self::SlowNetwork => "SlowNetwork",
                Self::OtherPrerenderedPageActivated => "OtherPrerenderedPageActivated",
                Self::V8OptimizerDisabled => "V8OptimizerDisabled",
                Self::PrerenderFailedDuringPrefetch => "PrerenderFailedDuringPrefetch",
                Self::BrowsingDataRemoved => "BrowsingDataRemoved",
                Self::PrerenderHostReused => "PrerenderHostReused",
                Self::FormSubmitWhenPrerendering => "FormSubmitWhenPrerendering",
                Self::CrossDocumentRestart => "CrossDocumentRestart",
            }
        }
    }

    impl AsRef<str> for PrerenderFinalStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PrerenderFinalStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Activated" => Ok(Self::Activated),
                "Destroyed" => Ok(Self::Destroyed),
                "LowEndDevice" => Ok(Self::LowEndDevice),
                "InvalidSchemeRedirect" => Ok(Self::InvalidSchemeRedirect),
                "InvalidSchemeNavigation" => Ok(Self::InvalidSchemeNavigation),
                "NavigationRequestBlockedByCsp" => Ok(Self::NavigationRequestBlockedByCsp),
                "MojoBinderPolicy" => Ok(Self::MojoBinderPolicy),
                "RendererProcessCrashed" => Ok(Self::RendererProcessCrashed),
                "RendererProcessKilled" => Ok(Self::RendererProcessKilled),
                "Download" => Ok(Self::Download),
                "TriggerDestroyed" => Ok(Self::TriggerDestroyed),
                "NavigationNotCommitted" => Ok(Self::NavigationNotCommitted),
                "NavigationBadHttpStatus" => Ok(Self::NavigationBadHttpStatus),
                "ClientCertRequested" => Ok(Self::ClientCertRequested),
                "NavigationRequestNetworkError" => Ok(Self::NavigationRequestNetworkError),
                "CancelAllHostsForTesting" => Ok(Self::CancelAllHostsForTesting),
                "DidFailLoad" => Ok(Self::DidFailLoad),
                "Stop" => Ok(Self::Stop),
                "SslCertificateError" => Ok(Self::SslCertificateError),
                "LoginAuthRequested" => Ok(Self::LoginAuthRequested),
                "UaChangeRequiresReload" => Ok(Self::UaChangeRequiresReload),
                "BlockedByClient" => Ok(Self::BlockedByClient),
                "AudioOutputDeviceRequested" => Ok(Self::AudioOutputDeviceRequested),
                "MixedContent" => Ok(Self::MixedContent),
                "TriggerBackgrounded" => Ok(Self::TriggerBackgrounded),
                "MemoryLimitExceeded" => Ok(Self::MemoryLimitExceeded),
                "DataSaverEnabled" => Ok(Self::DataSaverEnabled),
                "TriggerUrlHasEffectiveUrl" => Ok(Self::TriggerUrlHasEffectiveUrl),
                "ActivatedBeforeStarted" => Ok(Self::ActivatedBeforeStarted),
                "InactivePageRestriction" => Ok(Self::InactivePageRestriction),
                "StartFailed" => Ok(Self::StartFailed),
                "TimeoutBackgrounded" => Ok(Self::TimeoutBackgrounded),
                "CrossSiteRedirectInInitialNavigation" => Ok(Self::CrossSiteRedirectInInitialNavigation),
                "CrossSiteNavigationInInitialNavigation" => Ok(Self::CrossSiteNavigationInInitialNavigation),
                "SameSiteCrossOriginRedirectNotOptInInInitialNavigation" => Ok(Self::SameSiteCrossOriginRedirectNotOptInInInitialNavigation),
                "SameSiteCrossOriginNavigationNotOptInInInitialNavigation" => Ok(Self::SameSiteCrossOriginNavigationNotOptInInInitialNavigation),
                "ActivationNavigationParameterMismatch" => Ok(Self::ActivationNavigationParameterMismatch),
                "ActivatedInBackground" => Ok(Self::ActivatedInBackground),
                "EmbedderHostDisallowed" => Ok(Self::EmbedderHostDisallowed),
                "ActivationNavigationDestroyedBeforeSuccess" => Ok(Self::ActivationNavigationDestroyedBeforeSuccess),
                "TabClosedByUserGesture" => Ok(Self::TabClosedByUserGesture),
                "TabClosedWithoutUserGesture" => Ok(Self::TabClosedWithoutUserGesture),
                "PrimaryMainFrameRendererProcessCrashed" => Ok(Self::PrimaryMainFrameRendererProcessCrashed),
                "PrimaryMainFrameRendererProcessKilled" => Ok(Self::PrimaryMainFrameRendererProcessKilled),
                "ActivationFramePolicyNotCompatible" => Ok(Self::ActivationFramePolicyNotCompatible),
                "PreloadingDisabled" => Ok(Self::PreloadingDisabled),
                "BatterySaverEnabled" => Ok(Self::BatterySaverEnabled),
                "ActivatedDuringMainFrameNavigation" => Ok(Self::ActivatedDuringMainFrameNavigation),
                "PreloadingUnsupportedByWebContents" => Ok(Self::PreloadingUnsupportedByWebContents),
                "CrossSiteRedirectInMainFrameNavigation" => Ok(Self::CrossSiteRedirectInMainFrameNavigation),
                "CrossSiteNavigationInMainFrameNavigation" => Ok(Self::CrossSiteNavigationInMainFrameNavigation),
                "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation" => Ok(Self::SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation),
                "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation" => Ok(Self::SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation),
                "MemoryPressureOnTrigger" => Ok(Self::MemoryPressureOnTrigger),
                "MemoryPressureAfterTriggered" => Ok(Self::MemoryPressureAfterTriggered),
                "PrerenderingDisabledByDevTools" => Ok(Self::PrerenderingDisabledByDevTools),
                "SpeculationRuleRemoved" => Ok(Self::SpeculationRuleRemoved),
                "ActivatedWithAuxiliaryBrowsingContexts" => Ok(Self::ActivatedWithAuxiliaryBrowsingContexts),
                "MaxNumOfRunningEagerPrerendersExceeded" => Ok(Self::MaxNumOfRunningEagerPrerendersExceeded),
                "MaxNumOfRunningNonEagerPrerendersExceeded" => Ok(Self::MaxNumOfRunningNonEagerPrerendersExceeded),
                "MaxNumOfRunningEmbedderPrerendersExceeded" => Ok(Self::MaxNumOfRunningEmbedderPrerendersExceeded),
                "PrerenderingUrlHasEffectiveUrl" => Ok(Self::PrerenderingUrlHasEffectiveUrl),
                "RedirectedPrerenderingUrlHasEffectiveUrl" => Ok(Self::RedirectedPrerenderingUrlHasEffectiveUrl),
                "ActivationUrlHasEffectiveUrl" => Ok(Self::ActivationUrlHasEffectiveUrl),
                "JavaScriptInterfaceAdded" => Ok(Self::JavaScriptInterfaceAdded),
                "JavaScriptInterfaceRemoved" => Ok(Self::JavaScriptInterfaceRemoved),
                "AllPrerenderingCanceled" => Ok(Self::AllPrerenderingCanceled),
                "WindowClosed" => Ok(Self::WindowClosed),
                "SlowNetwork" => Ok(Self::SlowNetwork),
                "OtherPrerenderedPageActivated" => Ok(Self::OtherPrerenderedPageActivated),
                "V8OptimizerDisabled" => Ok(Self::V8OptimizerDisabled),
                "PrerenderFailedDuringPrefetch" => Ok(Self::PrerenderFailedDuringPrefetch),
                "BrowsingDataRemoved" => Ok(Self::BrowsingDataRemoved),
                "PrerenderHostReused" => Ok(Self::PrerenderHostReused),
                "FormSubmitWhenPrerendering" => Ok(Self::FormSubmitWhenPrerendering),
                "CrossDocumentRestart" => Ok(Self::CrossDocumentRestart),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PrerenderFinalStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PreloadingStatus {
        Pending,
        Running,
        Ready,
        Success,
        Failure,
        NotSupported,
    }

    impl PreloadingStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Pending => "Pending",
                Self::Running => "Running",
                Self::Ready => "Ready",
                Self::Success => "Success",
                Self::Failure => "Failure",
                Self::NotSupported => "NotSupported",
            }
        }
    }

    impl AsRef<str> for PreloadingStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PreloadingStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Pending" => Ok(Self::Pending),
                "Running" => Ok(Self::Running),
                "Ready" => Ok(Self::Ready),
                "Success" => Ok(Self::Success),
                "Failure" => Ok(Self::Failure),
                "NotSupported" => Ok(Self::NotSupported),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PreloadingStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PrefetchStatus {
        PrefetchAllowed,
        PrefetchFailedIneligibleRedirect,
        PrefetchFailedInvalidRedirect,
        PrefetchFailedMIMENotSupported,
        PrefetchFailedNetError,
        PrefetchFailedNon2XX,
        PrefetchEvictedAfterBrowsingDataRemoved,
        PrefetchEvictedAfterCandidateRemoved,
        PrefetchEvictedForNewerPrefetch,
        PrefetchHeldback,
        PrefetchIneligibleRetryAfter,
        PrefetchIsPrivacyDecoy,
        PrefetchIsStale,
        PrefetchNotEligibleBlockedByConnectionAllowlist,
        PrefetchNotEligibleBrowserContextOffTheRecord,
        PrefetchNotEligibleDataSaverEnabled,
        PrefetchNotEligibleExistingProxy,
        PrefetchNotEligibleHostIsNonUnique,
        PrefetchNotEligibleNonDefaultStoragePartition,
        PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy,
        PrefetchNotEligibleSchemeIsNotHttps,
        PrefetchNotEligibleUserHasCookies,
        PrefetchNotEligibleUserHasServiceWorker,
        PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler,
        PrefetchNotEligibleRedirectFromServiceWorker,
        PrefetchNotEligibleRedirectToServiceWorker,
        PrefetchNotEligibleBatterySaverEnabled,
        PrefetchNotEligiblePreloadingDisabled,
        PrefetchNotFinishedInTime,
        PrefetchNotStarted,
        PrefetchNotUsedCookiesChanged,
        PrefetchProxyNotAvailable,
        PrefetchResponseUsed,
        PrefetchSuccessfulButNotUsed,
        PrefetchNotUsedProbeFailed,
        PrefetchCancelledOnUserNavigation,
    }

    impl PrefetchStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::PrefetchAllowed => "PrefetchAllowed",
                Self::PrefetchFailedIneligibleRedirect => "PrefetchFailedIneligibleRedirect",
                Self::PrefetchFailedInvalidRedirect => "PrefetchFailedInvalidRedirect",
                Self::PrefetchFailedMIMENotSupported => "PrefetchFailedMIMENotSupported",
                Self::PrefetchFailedNetError => "PrefetchFailedNetError",
                Self::PrefetchFailedNon2XX => "PrefetchFailedNon2XX",
                Self::PrefetchEvictedAfterBrowsingDataRemoved => "PrefetchEvictedAfterBrowsingDataRemoved",
                Self::PrefetchEvictedAfterCandidateRemoved => "PrefetchEvictedAfterCandidateRemoved",
                Self::PrefetchEvictedForNewerPrefetch => "PrefetchEvictedForNewerPrefetch",
                Self::PrefetchHeldback => "PrefetchHeldback",
                Self::PrefetchIneligibleRetryAfter => "PrefetchIneligibleRetryAfter",
                Self::PrefetchIsPrivacyDecoy => "PrefetchIsPrivacyDecoy",
                Self::PrefetchIsStale => "PrefetchIsStale",
                Self::PrefetchNotEligibleBlockedByConnectionAllowlist => "PrefetchNotEligibleBlockedByConnectionAllowlist",
                Self::PrefetchNotEligibleBrowserContextOffTheRecord => "PrefetchNotEligibleBrowserContextOffTheRecord",
                Self::PrefetchNotEligibleDataSaverEnabled => "PrefetchNotEligibleDataSaverEnabled",
                Self::PrefetchNotEligibleExistingProxy => "PrefetchNotEligibleExistingProxy",
                Self::PrefetchNotEligibleHostIsNonUnique => "PrefetchNotEligibleHostIsNonUnique",
                Self::PrefetchNotEligibleNonDefaultStoragePartition => "PrefetchNotEligibleNonDefaultStoragePartition",
                Self::PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy => "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy",
                Self::PrefetchNotEligibleSchemeIsNotHttps => "PrefetchNotEligibleSchemeIsNotHttps",
                Self::PrefetchNotEligibleUserHasCookies => "PrefetchNotEligibleUserHasCookies",
                Self::PrefetchNotEligibleUserHasServiceWorker => "PrefetchNotEligibleUserHasServiceWorker",
                Self::PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler => "PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler",
                Self::PrefetchNotEligibleRedirectFromServiceWorker => "PrefetchNotEligibleRedirectFromServiceWorker",
                Self::PrefetchNotEligibleRedirectToServiceWorker => "PrefetchNotEligibleRedirectToServiceWorker",
                Self::PrefetchNotEligibleBatterySaverEnabled => "PrefetchNotEligibleBatterySaverEnabled",
                Self::PrefetchNotEligiblePreloadingDisabled => "PrefetchNotEligiblePreloadingDisabled",
                Self::PrefetchNotFinishedInTime => "PrefetchNotFinishedInTime",
                Self::PrefetchNotStarted => "PrefetchNotStarted",
                Self::PrefetchNotUsedCookiesChanged => "PrefetchNotUsedCookiesChanged",
                Self::PrefetchProxyNotAvailable => "PrefetchProxyNotAvailable",
                Self::PrefetchResponseUsed => "PrefetchResponseUsed",
                Self::PrefetchSuccessfulButNotUsed => "PrefetchSuccessfulButNotUsed",
                Self::PrefetchNotUsedProbeFailed => "PrefetchNotUsedProbeFailed",
                Self::PrefetchCancelledOnUserNavigation => "PrefetchCancelledOnUserNavigation",
            }
        }
    }

    impl AsRef<str> for PrefetchStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PrefetchStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "PrefetchAllowed" => Ok(Self::PrefetchAllowed),
                "PrefetchFailedIneligibleRedirect" => Ok(Self::PrefetchFailedIneligibleRedirect),
                "PrefetchFailedInvalidRedirect" => Ok(Self::PrefetchFailedInvalidRedirect),
                "PrefetchFailedMIMENotSupported" => Ok(Self::PrefetchFailedMIMENotSupported),
                "PrefetchFailedNetError" => Ok(Self::PrefetchFailedNetError),
                "PrefetchFailedNon2XX" => Ok(Self::PrefetchFailedNon2XX),
                "PrefetchEvictedAfterBrowsingDataRemoved" => Ok(Self::PrefetchEvictedAfterBrowsingDataRemoved),
                "PrefetchEvictedAfterCandidateRemoved" => Ok(Self::PrefetchEvictedAfterCandidateRemoved),
                "PrefetchEvictedForNewerPrefetch" => Ok(Self::PrefetchEvictedForNewerPrefetch),
                "PrefetchHeldback" => Ok(Self::PrefetchHeldback),
                "PrefetchIneligibleRetryAfter" => Ok(Self::PrefetchIneligibleRetryAfter),
                "PrefetchIsPrivacyDecoy" => Ok(Self::PrefetchIsPrivacyDecoy),
                "PrefetchIsStale" => Ok(Self::PrefetchIsStale),
                "PrefetchNotEligibleBlockedByConnectionAllowlist" => Ok(Self::PrefetchNotEligibleBlockedByConnectionAllowlist),
                "PrefetchNotEligibleBrowserContextOffTheRecord" => Ok(Self::PrefetchNotEligibleBrowserContextOffTheRecord),
                "PrefetchNotEligibleDataSaverEnabled" => Ok(Self::PrefetchNotEligibleDataSaverEnabled),
                "PrefetchNotEligibleExistingProxy" => Ok(Self::PrefetchNotEligibleExistingProxy),
                "PrefetchNotEligibleHostIsNonUnique" => Ok(Self::PrefetchNotEligibleHostIsNonUnique),
                "PrefetchNotEligibleNonDefaultStoragePartition" => Ok(Self::PrefetchNotEligibleNonDefaultStoragePartition),
                "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy" => Ok(Self::PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy),
                "PrefetchNotEligibleSchemeIsNotHttps" => Ok(Self::PrefetchNotEligibleSchemeIsNotHttps),
                "PrefetchNotEligibleUserHasCookies" => Ok(Self::PrefetchNotEligibleUserHasCookies),
                "PrefetchNotEligibleUserHasServiceWorker" => Ok(Self::PrefetchNotEligibleUserHasServiceWorker),
                "PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler" => Ok(Self::PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler),
                "PrefetchNotEligibleRedirectFromServiceWorker" => Ok(Self::PrefetchNotEligibleRedirectFromServiceWorker),
                "PrefetchNotEligibleRedirectToServiceWorker" => Ok(Self::PrefetchNotEligibleRedirectToServiceWorker),
                "PrefetchNotEligibleBatterySaverEnabled" => Ok(Self::PrefetchNotEligibleBatterySaverEnabled),
                "PrefetchNotEligiblePreloadingDisabled" => Ok(Self::PrefetchNotEligiblePreloadingDisabled),
                "PrefetchNotFinishedInTime" => Ok(Self::PrefetchNotFinishedInTime),
                "PrefetchNotStarted" => Ok(Self::PrefetchNotStarted),
                "PrefetchNotUsedCookiesChanged" => Ok(Self::PrefetchNotUsedCookiesChanged),
                "PrefetchProxyNotAvailable" => Ok(Self::PrefetchProxyNotAvailable),
                "PrefetchResponseUsed" => Ok(Self::PrefetchResponseUsed),
                "PrefetchSuccessfulButNotUsed" => Ok(Self::PrefetchSuccessfulButNotUsed),
                "PrefetchNotUsedProbeFailed" => Ok(Self::PrefetchNotUsedProbeFailed),
                "PrefetchCancelledOnUserNavigation" => Ok(Self::PrefetchCancelledOnUserNavigation),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PrefetchStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PrerenderMismatchedHeaders {
        pub header_name: String,
        pub initial_value: Option<String>,
        pub activation_value: Option<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct RuleSetUpdatedEvent {
            pub rule_set: Box<crate::generated::preload::RuleSet>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RuleSetRemovedEvent {
            pub id: crate::generated::preload::RuleSetId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PreloadEnabledStateUpdatedEvent {
            pub disabled_by_preference: bool,
            pub disabled_by_data_saver: bool,
            pub disabled_by_battery_saver: bool,
            pub disabled_by_holdback_prefetch_speculation_rules: bool,
            pub disabled_by_holdback_prerender_speculation_rules: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrefetchStatusUpdatedEvent {
            pub key: Box<crate::generated::preload::PreloadingAttemptKey>,
            pub pipeline_id: crate::generated::preload::PreloadPipelineId,
            pub initiating_frame_id: crate::generated::page::FrameId,
            pub prefetch_url: String,
            pub status: crate::generated::preload::PreloadingStatus,
            pub prefetch_status: crate::generated::preload::PrefetchStatus,
            pub request_id: crate::generated::network::RequestId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PrerenderStatusUpdatedEvent {
            pub key: Box<crate::generated::preload::PreloadingAttemptKey>,
            pub pipeline_id: crate::generated::preload::PreloadPipelineId,
            pub status: crate::generated::preload::PreloadingStatus,
            pub prerender_status: Option<crate::generated::preload::PrerenderFinalStatus>,
            pub disallowed_mojo_interface: Option<String>,
            pub mismatched_headers: Option<Vec<Box<crate::generated::preload::PrerenderMismatchedHeaders>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PreloadingAttemptSourcesUpdatedEvent {
            pub loader_id: crate::generated::network::LoaderId,
            pub preloading_attempt_sources: Vec<Box<crate::generated::preload::PreloadingAttemptSource>>,
        }
    }
}

pub mod security {
    pub type CertificateId = i64;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum MixedContentType {
        Blockable,
        OptionallyBlockable,
        None,
    }

    impl MixedContentType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Blockable => "blockable",
                Self::OptionallyBlockable => "optionally-blockable",
                Self::None => "none",
            }
        }
    }

    impl AsRef<str> for MixedContentType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for MixedContentType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "blockable" => Ok(Self::Blockable),
                "optionally-blockable" => Ok(Self::OptionallyBlockable),
                "none" => Ok(Self::None),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "MixedContentType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SecurityState {
        Unknown,
        Neutral,
        Insecure,
        Secure,
        Info,
        InsecureBroken,
    }

    impl SecurityState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Unknown => "unknown",
                Self::Neutral => "neutral",
                Self::Insecure => "insecure",
                Self::Secure => "secure",
                Self::Info => "info",
                Self::InsecureBroken => "insecure-broken",
            }
        }
    }

    impl AsRef<str> for SecurityState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SecurityState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "unknown" => Ok(Self::Unknown),
                "neutral" => Ok(Self::Neutral),
                "insecure" => Ok(Self::Insecure),
                "secure" => Ok(Self::Secure),
                "info" => Ok(Self::Info),
                "insecure-broken" => Ok(Self::InsecureBroken),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SecurityState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CertificateSecurityState {
        pub protocol: String,
        pub key_exchange: String,
        pub key_exchange_group: Option<String>,
        pub cipher: String,
        pub mac: Option<String>,
        pub certificate: Vec<String>,
        pub subject_name: String,
        pub issuer: String,
        pub valid_from: crate::generated::network::TimeSinceEpoch,
        pub valid_to: crate::generated::network::TimeSinceEpoch,
        pub certificate_network_error: Option<String>,
        pub certificate_has_weak_signature: bool,
        pub certificate_has_sha1_signature: bool,
        pub modern_ssl: bool,
        pub obsolete_ssl_protocol: bool,
        pub obsolete_ssl_key_exchange: bool,
        pub obsolete_ssl_cipher: bool,
        pub obsolete_ssl_signature: bool,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SafetyTipStatus {
        BadReputation,
        Lookalike,
    }

    impl SafetyTipStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::BadReputation => "badReputation",
                Self::Lookalike => "lookalike",
            }
        }
    }

    impl AsRef<str> for SafetyTipStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SafetyTipStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "badReputation" => Ok(Self::BadReputation),
                "lookalike" => Ok(Self::Lookalike),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SafetyTipStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SafetyTipInfo {
        pub safety_tip_status: crate::generated::security::SafetyTipStatus,
        pub safe_url: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct VisibleSecurityState {
        pub security_state: crate::generated::security::SecurityState,
        pub certificate_security_state: Option<Box<crate::generated::security::CertificateSecurityState>>,
        pub safety_tip_info: Option<Box<crate::generated::security::SafetyTipInfo>>,
        pub security_state_issue_ids: Vec<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SecurityStateExplanation {
        pub security_state: crate::generated::security::SecurityState,
        pub title: String,
        pub summary: String,
        pub description: String,
        pub mixed_content_type: crate::generated::security::MixedContentType,
        pub certificate: Vec<String>,
        pub recommendations: Option<Vec<String>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InsecureContentStatus {
        pub ran_mixed_content: bool,
        pub displayed_mixed_content: bool,
        pub contained_mixed_form: bool,
        pub ran_content_with_cert_errors: bool,
        pub displayed_content_with_cert_errors: bool,
        pub ran_insecure_content_style: crate::generated::security::SecurityState,
        pub displayed_insecure_content_style: crate::generated::security::SecurityState,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum CertificateErrorAction {
        Continue,
        Cancel,
    }

    impl CertificateErrorAction {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Continue => "continue",
                Self::Cancel => "cancel",
            }
        }
    }

    impl AsRef<str> for CertificateErrorAction {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for CertificateErrorAction {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "continue" => Ok(Self::Continue),
                "cancel" => Ok(Self::Cancel),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "CertificateErrorAction",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIgnoreCertificateErrorsParams {
            pub ignore: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetIgnoreCertificateErrorsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct HandleCertificateErrorParams {
            pub event_id: i64,
            pub action: crate::generated::security::CertificateErrorAction,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HandleCertificateErrorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetOverrideCertificateErrorsParams {
            pub override_: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetOverrideCertificateErrorsResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CertificateErrorEvent {
            pub event_id: i64,
            pub error_type: String,
            pub request_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct VisibleSecurityStateChangedEvent {
            pub visible_security_state: Box<crate::generated::security::VisibleSecurityState>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SecurityStateChangedEvent {
            pub security_state: crate::generated::security::SecurityState,
            pub scheme_is_cryptographic: bool,
            pub explanations: Vec<Box<crate::generated::security::SecurityStateExplanation>>,
            pub insecure_content_status: Box<crate::generated::security::InsecureContentStatus>,
            pub summary: Option<String>,
        }
    }
}

pub mod service_worker {
    pub type RegistrationID = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct ServiceWorkerRegistration {
        pub registration_id: crate::generated::service_worker::RegistrationID,
        pub scope_url: String,
        pub is_deleted: bool,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ServiceWorkerVersionRunningStatus {
        Stopped,
        Starting,
        Running,
        Stopping,
    }

    impl ServiceWorkerVersionRunningStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Stopped => "stopped",
                Self::Starting => "starting",
                Self::Running => "running",
                Self::Stopping => "stopping",
            }
        }
    }

    impl AsRef<str> for ServiceWorkerVersionRunningStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ServiceWorkerVersionRunningStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "stopped" => Ok(Self::Stopped),
                "starting" => Ok(Self::Starting),
                "running" => Ok(Self::Running),
                "stopping" => Ok(Self::Stopping),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ServiceWorkerVersionRunningStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ServiceWorkerVersionStatus {
        New,
        Installing,
        Installed,
        Activating,
        Activated,
        Redundant,
    }

    impl ServiceWorkerVersionStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::New => "new",
                Self::Installing => "installing",
                Self::Installed => "installed",
                Self::Activating => "activating",
                Self::Activated => "activated",
                Self::Redundant => "redundant",
            }
        }
    }

    impl AsRef<str> for ServiceWorkerVersionStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ServiceWorkerVersionStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "new" => Ok(Self::New),
                "installing" => Ok(Self::Installing),
                "installed" => Ok(Self::Installed),
                "activating" => Ok(Self::Activating),
                "activated" => Ok(Self::Activated),
                "redundant" => Ok(Self::Redundant),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ServiceWorkerVersionStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ServiceWorkerVersion {
        pub version_id: String,
        pub registration_id: crate::generated::service_worker::RegistrationID,
        pub script_url: String,
        pub running_status: crate::generated::service_worker::ServiceWorkerVersionRunningStatus,
        pub status: crate::generated::service_worker::ServiceWorkerVersionStatus,
        pub script_last_modified: Option<f64>,
        pub script_response_time: Option<f64>,
        pub controlled_clients: Option<Vec<crate::generated::target::TargetID>>,
        pub target_id: Option<crate::generated::target::TargetID>,
        pub router_rules: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ServiceWorkerErrorMessage {
        pub error_message: String,
        pub registration_id: crate::generated::service_worker::RegistrationID,
        pub version_id: String,
        pub source_url: String,
        pub line_number: i64,
        pub column_number: i64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeliverPushMessageParams {
            pub origin: String,
            pub registration_id: crate::generated::service_worker::RegistrationID,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeliverPushMessageResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchSyncEventParams {
            pub origin: String,
            pub registration_id: crate::generated::service_worker::RegistrationID,
            pub tag: String,
            pub last_chance: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchSyncEventResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchPeriodicSyncEventParams {
            pub origin: String,
            pub registration_id: crate::generated::service_worker::RegistrationID,
            pub tag: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DispatchPeriodicSyncEventResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetForceUpdateOnPageLoadParams {
            pub force_update_on_page_load: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetForceUpdateOnPageLoadResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SkipWaitingParams {
            pub scope_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SkipWaitingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartWorkerParams {
            pub scope_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartWorkerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopAllWorkersParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopAllWorkersResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopWorkerParams {
            pub version_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopWorkerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UnregisterParams {
            pub scope_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UnregisterResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UpdateRegistrationParams {
            pub scope_url: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UpdateRegistrationResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct WorkerErrorReportedEvent {
            pub error_message: Box<crate::generated::service_worker::ServiceWorkerErrorMessage>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WorkerRegistrationUpdatedEvent {
            pub registrations: Vec<Box<crate::generated::service_worker::ServiceWorkerRegistration>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct WorkerVersionUpdatedEvent {
            pub versions: Vec<Box<crate::generated::service_worker::ServiceWorkerVersion>>,
        }
    }
}

pub mod smart_card_emulation {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ResultCode {
        Success,
        RemovedCard,
        ResetCard,
        UnpoweredCard,
        UnresponsiveCard,
        UnsupportedCard,
        ReaderUnavailable,
        SharingViolation,
        NotTransacted,
        NoSmartcard,
        ProtoMismatch,
        SystemCancelled,
        NotReady,
        Cancelled,
        InsufficientBuffer,
        InvalidHandle,
        InvalidParameter,
        InvalidValue,
        NoMemory,
        Timeout,
        UnknownReader,
        UnsupportedFeature,
        NoReadersAvailable,
        ServiceStopped,
        NoService,
        CommError,
        InternalError,
        ServerTooBusy,
        Unexpected,
        Shutdown,
        UnknownCard,
        Unknown,
    }

    impl ResultCode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Success => "success",
                Self::RemovedCard => "removed-card",
                Self::ResetCard => "reset-card",
                Self::UnpoweredCard => "unpowered-card",
                Self::UnresponsiveCard => "unresponsive-card",
                Self::UnsupportedCard => "unsupported-card",
                Self::ReaderUnavailable => "reader-unavailable",
                Self::SharingViolation => "sharing-violation",
                Self::NotTransacted => "not-transacted",
                Self::NoSmartcard => "no-smartcard",
                Self::ProtoMismatch => "proto-mismatch",
                Self::SystemCancelled => "system-cancelled",
                Self::NotReady => "not-ready",
                Self::Cancelled => "cancelled",
                Self::InsufficientBuffer => "insufficient-buffer",
                Self::InvalidHandle => "invalid-handle",
                Self::InvalidParameter => "invalid-parameter",
                Self::InvalidValue => "invalid-value",
                Self::NoMemory => "no-memory",
                Self::Timeout => "timeout",
                Self::UnknownReader => "unknown-reader",
                Self::UnsupportedFeature => "unsupported-feature",
                Self::NoReadersAvailable => "no-readers-available",
                Self::ServiceStopped => "service-stopped",
                Self::NoService => "no-service",
                Self::CommError => "comm-error",
                Self::InternalError => "internal-error",
                Self::ServerTooBusy => "server-too-busy",
                Self::Unexpected => "unexpected",
                Self::Shutdown => "shutdown",
                Self::UnknownCard => "unknown-card",
                Self::Unknown => "unknown",
            }
        }
    }

    impl AsRef<str> for ResultCode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ResultCode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "success" => Ok(Self::Success),
                "removed-card" => Ok(Self::RemovedCard),
                "reset-card" => Ok(Self::ResetCard),
                "unpowered-card" => Ok(Self::UnpoweredCard),
                "unresponsive-card" => Ok(Self::UnresponsiveCard),
                "unsupported-card" => Ok(Self::UnsupportedCard),
                "reader-unavailable" => Ok(Self::ReaderUnavailable),
                "sharing-violation" => Ok(Self::SharingViolation),
                "not-transacted" => Ok(Self::NotTransacted),
                "no-smartcard" => Ok(Self::NoSmartcard),
                "proto-mismatch" => Ok(Self::ProtoMismatch),
                "system-cancelled" => Ok(Self::SystemCancelled),
                "not-ready" => Ok(Self::NotReady),
                "cancelled" => Ok(Self::Cancelled),
                "insufficient-buffer" => Ok(Self::InsufficientBuffer),
                "invalid-handle" => Ok(Self::InvalidHandle),
                "invalid-parameter" => Ok(Self::InvalidParameter),
                "invalid-value" => Ok(Self::InvalidValue),
                "no-memory" => Ok(Self::NoMemory),
                "timeout" => Ok(Self::Timeout),
                "unknown-reader" => Ok(Self::UnknownReader),
                "unsupported-feature" => Ok(Self::UnsupportedFeature),
                "no-readers-available" => Ok(Self::NoReadersAvailable),
                "service-stopped" => Ok(Self::ServiceStopped),
                "no-service" => Ok(Self::NoService),
                "comm-error" => Ok(Self::CommError),
                "internal-error" => Ok(Self::InternalError),
                "server-too-busy" => Ok(Self::ServerTooBusy),
                "unexpected" => Ok(Self::Unexpected),
                "shutdown" => Ok(Self::Shutdown),
                "unknown-card" => Ok(Self::UnknownCard),
                "unknown" => Ok(Self::Unknown),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ResultCode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ShareMode {
        Shared,
        Exclusive,
        Direct,
    }

    impl ShareMode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Shared => "shared",
                Self::Exclusive => "exclusive",
                Self::Direct => "direct",
            }
        }
    }

    impl AsRef<str> for ShareMode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ShareMode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "shared" => Ok(Self::Shared),
                "exclusive" => Ok(Self::Exclusive),
                "direct" => Ok(Self::Direct),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ShareMode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum Disposition {
        LeaveCard,
        ResetCard,
        UnpowerCard,
        EjectCard,
    }

    impl Disposition {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::LeaveCard => "leave-card",
                Self::ResetCard => "reset-card",
                Self::UnpowerCard => "unpower-card",
                Self::EjectCard => "eject-card",
            }
        }
    }

    impl AsRef<str> for Disposition {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for Disposition {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "leave-card" => Ok(Self::LeaveCard),
                "reset-card" => Ok(Self::ResetCard),
                "unpower-card" => Ok(Self::UnpowerCard),
                "eject-card" => Ok(Self::EjectCard),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "Disposition",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ConnectionState {
        Absent,
        Present,
        Swallowed,
        Powered,
        Negotiable,
        Specific,
    }

    impl ConnectionState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Absent => "absent",
                Self::Present => "present",
                Self::Swallowed => "swallowed",
                Self::Powered => "powered",
                Self::Negotiable => "negotiable",
                Self::Specific => "specific",
            }
        }
    }

    impl AsRef<str> for ConnectionState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ConnectionState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "absent" => Ok(Self::Absent),
                "present" => Ok(Self::Present),
                "swallowed" => Ok(Self::Swallowed),
                "powered" => Ok(Self::Powered),
                "negotiable" => Ok(Self::Negotiable),
                "specific" => Ok(Self::Specific),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ConnectionState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ReaderStateFlags {
        pub unaware: Option<bool>,
        pub ignore: Option<bool>,
        pub changed: Option<bool>,
        pub unknown: Option<bool>,
        pub unavailable: Option<bool>,
        pub empty: Option<bool>,
        pub present: Option<bool>,
        pub exclusive: Option<bool>,
        pub inuse: Option<bool>,
        pub mute: Option<bool>,
        pub unpowered: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ProtocolSet {
        pub t0: Option<bool>,
        pub t1: Option<bool>,
        pub raw: Option<bool>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum Protocol {
        T0,
        T1,
        Raw,
    }

    impl Protocol {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::T0 => "t0",
                Self::T1 => "t1",
                Self::Raw => "raw",
            }
        }
    }

    impl AsRef<str> for Protocol {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for Protocol {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "t0" => Ok(Self::T0),
                "t1" => Ok(Self::T1),
                "raw" => Ok(Self::Raw),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "Protocol",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ReaderStateIn {
        pub reader: String,
        pub current_state: Box<crate::generated::smart_card_emulation::ReaderStateFlags>,
        pub current_insertion_count: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ReaderStateOut {
        pub reader: String,
        pub event_state: Box<crate::generated::smart_card_emulation::ReaderStateFlags>,
        pub event_count: i64,
        pub atr: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportEstablishContextResultParams {
            pub request_id: String,
            pub context_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportEstablishContextResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportReleaseContextResultParams {
            pub request_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportReleaseContextResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportListReadersResultParams {
            pub request_id: String,
            pub readers: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportListReadersResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportGetStatusChangeResultParams {
            pub request_id: String,
            pub reader_states: Vec<Box<crate::generated::smart_card_emulation::ReaderStateOut>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportGetStatusChangeResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportBeginTransactionResultParams {
            pub request_id: String,
            pub handle: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportBeginTransactionResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportPlainResultParams {
            pub request_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportPlainResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportConnectResultParams {
            pub request_id: String,
            pub handle: i64,
            pub active_protocol: Option<crate::generated::smart_card_emulation::Protocol>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportConnectResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportDataResultParams {
            pub request_id: String,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportDataResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportStatusResultParams {
            pub request_id: String,
            pub reader_name: String,
            pub state: crate::generated::smart_card_emulation::ConnectionState,
            pub atr: String,
            pub protocol: Option<crate::generated::smart_card_emulation::Protocol>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportStatusResultResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportErrorParams {
            pub request_id: String,
            pub result_code: crate::generated::smart_card_emulation::ResultCode,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportErrorResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EstablishContextRequestedEvent {
            pub request_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseContextRequestedEvent {
            pub request_id: String,
            pub context_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ListReadersRequestedEvent {
            pub request_id: String,
            pub context_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStatusChangeRequestedEvent {
            pub request_id: String,
            pub context_id: i64,
            pub reader_states: Vec<Box<crate::generated::smart_card_emulation::ReaderStateIn>>,
            pub timeout: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelRequestedEvent {
            pub request_id: String,
            pub context_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConnectRequestedEvent {
            pub request_id: String,
            pub context_id: i64,
            pub reader: String,
            pub share_mode: crate::generated::smart_card_emulation::ShareMode,
            pub preferred_protocols: Box<crate::generated::smart_card_emulation::ProtocolSet>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisconnectRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub disposition: crate::generated::smart_card_emulation::Disposition,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TransmitRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub data: String,
            pub protocol: Option<crate::generated::smart_card_emulation::Protocol>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ControlRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub control_code: i64,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetAttribRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub attrib_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAttribRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub attrib_id: i64,
            pub data: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StatusRequestedEvent {
            pub request_id: String,
            pub handle: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BeginTransactionRequestedEvent {
            pub request_id: String,
            pub handle: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EndTransactionRequestedEvent {
            pub request_id: String,
            pub handle: i64,
            pub disposition: crate::generated::smart_card_emulation::Disposition,
        }
    }
}

pub mod storage {
    pub type SerializedStorageKey = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StorageType {
        Cookies,
        FileSystems,
        Indexeddb,
        LocalStorage,
        ShaderCache,
        Websql,
        ServiceWorkers,
        CacheStorage,
        SharedStorage,
        StorageBuckets,
        All,
        Other,
    }

    impl StorageType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Cookies => "cookies",
                Self::FileSystems => "file_systems",
                Self::Indexeddb => "indexeddb",
                Self::LocalStorage => "local_storage",
                Self::ShaderCache => "shader_cache",
                Self::Websql => "websql",
                Self::ServiceWorkers => "service_workers",
                Self::CacheStorage => "cache_storage",
                Self::SharedStorage => "shared_storage",
                Self::StorageBuckets => "storage_buckets",
                Self::All => "all",
                Self::Other => "other",
            }
        }
    }

    impl AsRef<str> for StorageType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StorageType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "cookies" => Ok(Self::Cookies),
                "file_systems" => Ok(Self::FileSystems),
                "indexeddb" => Ok(Self::Indexeddb),
                "local_storage" => Ok(Self::LocalStorage),
                "shader_cache" => Ok(Self::ShaderCache),
                "websql" => Ok(Self::Websql),
                "service_workers" => Ok(Self::ServiceWorkers),
                "cache_storage" => Ok(Self::CacheStorage),
                "shared_storage" => Ok(Self::SharedStorage),
                "storage_buckets" => Ok(Self::StorageBuckets),
                "all" => Ok(Self::All),
                "other" => Ok(Self::Other),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StorageType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct UsageForType {
        pub storage_type: crate::generated::storage::StorageType,
        pub usage: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct TrustTokens {
        pub issuer_origin: String,
        pub count: f64,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SharedStorageAccessScope {
        Window,
        SharedStorageWorklet,
        Header,
    }

    impl SharedStorageAccessScope {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Window => "window",
                Self::SharedStorageWorklet => "sharedStorageWorklet",
                Self::Header => "header",
            }
        }
    }

    impl AsRef<str> for SharedStorageAccessScope {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SharedStorageAccessScope {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "window" => Ok(Self::Window),
                "sharedStorageWorklet" => Ok(Self::SharedStorageWorklet),
                "header" => Ok(Self::Header),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SharedStorageAccessScope",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SharedStorageAccessMethod {
        AddModule,
        CreateWorklet,
        SelectURL,
        Run,
        BatchUpdate,
        Set,
        Append,
        Delete,
        Clear,
        Get,
        Keys,
        Values,
        Entries,
        Length,
        RemainingBudget,
    }

    impl SharedStorageAccessMethod {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::AddModule => "addModule",
                Self::CreateWorklet => "createWorklet",
                Self::SelectURL => "selectURL",
                Self::Run => "run",
                Self::BatchUpdate => "batchUpdate",
                Self::Set => "set",
                Self::Append => "append",
                Self::Delete => "delete",
                Self::Clear => "clear",
                Self::Get => "get",
                Self::Keys => "keys",
                Self::Values => "values",
                Self::Entries => "entries",
                Self::Length => "length",
                Self::RemainingBudget => "remainingBudget",
            }
        }
    }

    impl AsRef<str> for SharedStorageAccessMethod {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SharedStorageAccessMethod {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "addModule" => Ok(Self::AddModule),
                "createWorklet" => Ok(Self::CreateWorklet),
                "selectURL" => Ok(Self::SelectURL),
                "run" => Ok(Self::Run),
                "batchUpdate" => Ok(Self::BatchUpdate),
                "set" => Ok(Self::Set),
                "append" => Ok(Self::Append),
                "delete" => Ok(Self::Delete),
                "clear" => Ok(Self::Clear),
                "get" => Ok(Self::Get),
                "keys" => Ok(Self::Keys),
                "values" => Ok(Self::Values),
                "entries" => Ok(Self::Entries),
                "length" => Ok(Self::Length),
                "remainingBudget" => Ok(Self::RemainingBudget),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SharedStorageAccessMethod",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStorageEntry {
        pub key: String,
        pub value: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStorageMetadata {
        pub creation_time: crate::generated::network::TimeSinceEpoch,
        pub length: i64,
        pub remaining_budget: f64,
        pub bytes_used: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStoragePrivateAggregationConfig {
        pub aggregation_coordinator_origin: Option<String>,
        pub context_id: Option<String>,
        pub filtering_id_max_bytes: i64,
        pub max_contributions: Option<i64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStorageReportingMetadata {
        pub event_type: String,
        pub reporting_url: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStorageUrlWithMetadata {
        pub url: String,
        pub reporting_metadata: Vec<Box<crate::generated::storage::SharedStorageReportingMetadata>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SharedStorageAccessParams {
        pub script_source_url: Option<String>,
        pub data_origin: Option<String>,
        pub operation_name: Option<String>,
        pub operation_id: Option<String>,
        pub keep_alive: Option<bool>,
        pub private_aggregation_config: Option<Box<crate::generated::storage::SharedStoragePrivateAggregationConfig>>,
        pub serialized_data: Option<String>,
        pub urls_with_metadata: Option<Vec<Box<crate::generated::storage::SharedStorageUrlWithMetadata>>>,
        pub urn_uuid: Option<String>,
        pub key: Option<String>,
        pub value: Option<String>,
        pub ignore_if_present: Option<bool>,
        pub worklet_ordinal: Option<i64>,
        pub worklet_target_id: Option<crate::generated::target::TargetID>,
        pub with_lock: Option<String>,
        pub batch_update_id: Option<String>,
        pub batch_size: Option<i64>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StorageBucketsDurability {
        Relaxed,
        Strict,
    }

    impl StorageBucketsDurability {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Relaxed => "relaxed",
                Self::Strict => "strict",
            }
        }
    }

    impl AsRef<str> for StorageBucketsDurability {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StorageBucketsDurability {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "relaxed" => Ok(Self::Relaxed),
                "strict" => Ok(Self::Strict),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StorageBucketsDurability",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StorageBucket {
        pub storage_key: crate::generated::storage::SerializedStorageKey,
        pub name: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StorageBucketInfo {
        pub bucket: Box<crate::generated::storage::StorageBucket>,
        pub id: String,
        pub expiration: crate::generated::network::TimeSinceEpoch,
        pub quota: f64,
        pub persistent: bool,
        pub durability: crate::generated::storage::StorageBucketsDurability,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RelatedWebsiteSet {
        pub primary_sites: Vec<String>,
        pub associated_sites: Vec<String>,
        pub service_sites: Vec<String>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageKeyForFrameParams {
            pub frame_id: crate::generated::page::FrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageKeyForFrameResult {
            pub storage_key: crate::generated::storage::SerializedStorageKey,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageKeyParams {
            pub frame_id: Option<crate::generated::page::FrameId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStorageKeyResult {
            pub storage_key: crate::generated::storage::SerializedStorageKey,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDataForOriginParams {
            pub origin: String,
            pub storage_types: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDataForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDataForStorageKeyParams {
            pub storage_key: String,
            pub storage_types: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearDataForStorageKeyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCookiesParams {
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCookiesResult {
            pub cookies: Vec<Box<crate::generated::network::Cookie>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookiesParams {
            pub cookies: Vec<Box<crate::generated::network::CookieParam>>,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCookiesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCookiesParams {
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCookiesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetUsageAndQuotaParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetUsageAndQuotaResult {
            pub usage: f64,
            pub quota: f64,
            pub override_active: bool,
            pub usage_breakdown: Vec<Box<crate::generated::storage::UsageForType>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OverrideQuotaForOriginParams {
            pub origin: String,
            pub quota_size: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OverrideQuotaForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackCacheStorageForOriginParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackCacheStorageForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackCacheStorageForStorageKeyParams {
            pub storage_key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackCacheStorageForStorageKeyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackIndexedDBForOriginParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackIndexedDBForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackIndexedDBForStorageKeyParams {
            pub storage_key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TrackIndexedDBForStorageKeyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackCacheStorageForOriginParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackCacheStorageForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackCacheStorageForStorageKeyParams {
            pub storage_key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackCacheStorageForStorageKeyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackIndexedDBForOriginParams {
            pub origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackIndexedDBForOriginResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackIndexedDBForStorageKeyParams {
            pub storage_key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UntrackIndexedDBForStorageKeyResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTrustTokensParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTrustTokensResult {
            pub tokens: Vec<Box<crate::generated::storage::TrustTokens>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearTrustTokensParams {
            pub issuer_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearTrustTokensResult {
            pub did_delete_tokens: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSharedStorageMetadataParams {
            pub owner_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSharedStorageMetadataResult {
            pub metadata: Box<crate::generated::storage::SharedStorageMetadata>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSharedStorageEntriesParams {
            pub owner_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSharedStorageEntriesResult {
            pub entries: Vec<Box<crate::generated::storage::SharedStorageEntry>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSharedStorageEntryParams {
            pub owner_origin: String,
            pub key: String,
            pub value: String,
            pub ignore_if_present: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSharedStorageEntryResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteSharedStorageEntryParams {
            pub owner_origin: String,
            pub key: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteSharedStorageEntryResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearSharedStorageEntriesParams {
            pub owner_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearSharedStorageEntriesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetSharedStorageBudgetParams {
            pub owner_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetSharedStorageBudgetResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSharedStorageTrackingParams {
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSharedStorageTrackingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStorageBucketTrackingParams {
            pub storage_key: String,
            pub enable: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetStorageBucketTrackingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteStorageBucketParams {
            pub bucket: Box<crate::generated::storage::StorageBucket>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DeleteStorageBucketResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunBounceTrackingMitigationsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunBounceTrackingMitigationsResult {
            pub deleted_sites: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRelatedWebsiteSetsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRelatedWebsiteSetsResult {
            pub sets: Vec<Box<crate::generated::storage::RelatedWebsiteSet>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CacheStorageContentUpdatedEvent {
            pub origin: String,
            pub storage_key: String,
            pub bucket_id: String,
            pub cache_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CacheStorageListUpdatedEvent {
            pub origin: String,
            pub storage_key: String,
            pub bucket_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct IndexedDBContentUpdatedEvent {
            pub origin: String,
            pub storage_key: String,
            pub bucket_id: String,
            pub database_name: String,
            pub object_store_name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct IndexedDBListUpdatedEvent {
            pub origin: String,
            pub storage_key: String,
            pub bucket_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SharedStorageAccessedEvent {
            pub access_time: crate::generated::network::TimeSinceEpoch,
            pub scope: crate::generated::storage::SharedStorageAccessScope,
            pub method: crate::generated::storage::SharedStorageAccessMethod,
            pub main_frame_id: crate::generated::page::FrameId,
            pub owner_origin: String,
            pub owner_site: String,
            pub params: Box<crate::generated::storage::SharedStorageAccessParams>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SharedStorageWorkletOperationExecutionFinishedEvent {
            pub finished_time: crate::generated::network::TimeSinceEpoch,
            pub execution_time: i64,
            pub method: crate::generated::storage::SharedStorageAccessMethod,
            pub operation_id: String,
            pub worklet_target_id: crate::generated::target::TargetID,
            pub main_frame_id: crate::generated::page::FrameId,
            pub owner_origin: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StorageBucketCreatedOrUpdatedEvent {
            pub bucket_info: Box<crate::generated::storage::StorageBucketInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StorageBucketDeletedEvent {
            pub bucket_id: String,
        }
    }
}

pub mod system_info {
    #[derive(Clone, Debug, PartialEq)]
    pub struct GPUDevice {
        pub vendor_id: f64,
        pub device_id: f64,
        pub sub_sys_id: Option<f64>,
        pub revision: Option<f64>,
        pub vendor_string: String,
        pub device_string: String,
        pub driver_vendor: String,
        pub driver_version: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Size {
        pub width: i64,
        pub height: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct VideoDecodeAcceleratorCapability {
        pub profile: String,
        pub max_resolution: Box<crate::generated::system_info::Size>,
        pub min_resolution: Box<crate::generated::system_info::Size>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct VideoEncodeAcceleratorCapability {
        pub profile: String,
        pub max_resolution: Box<crate::generated::system_info::Size>,
        pub max_framerate_numerator: i64,
        pub max_framerate_denominator: i64,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SubsamplingFormat {
        Yuv420,
        Yuv422,
        Yuv444,
    }

    impl SubsamplingFormat {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Yuv420 => "yuv420",
                Self::Yuv422 => "yuv422",
                Self::Yuv444 => "yuv444",
            }
        }
    }

    impl AsRef<str> for SubsamplingFormat {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SubsamplingFormat {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "yuv420" => Ok(Self::Yuv420),
                "yuv422" => Ok(Self::Yuv422),
                "yuv444" => Ok(Self::Yuv444),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SubsamplingFormat",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ImageType {
        Jpeg,
        Webp,
        Unknown,
    }

    impl ImageType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Jpeg => "jpeg",
                Self::Webp => "webp",
                Self::Unknown => "unknown",
            }
        }
    }

    impl AsRef<str> for ImageType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ImageType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "jpeg" => Ok(Self::Jpeg),
                "webp" => Ok(Self::Webp),
                "unknown" => Ok(Self::Unknown),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ImageType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct GPUInfo {
        pub devices: Vec<Box<crate::generated::system_info::GPUDevice>>,
        pub aux_attributes: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
        pub feature_status: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
        pub driver_bug_workarounds: Vec<String>,
        pub video_decoding: Vec<Box<crate::generated::system_info::VideoDecodeAcceleratorCapability>>,
        pub video_encoding: Vec<Box<crate::generated::system_info::VideoEncodeAcceleratorCapability>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ProcessInfo {
        pub type_: String,
        pub id: i64,
        pub cpu_time: f64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInfoParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetInfoResult {
            pub gpu: Box<crate::generated::system_info::GPUInfo>,
            pub model_name: String,
            pub model_version: String,
            pub command_line: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFeatureStateParams {
            pub feature_state: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetFeatureStateResult {
            pub feature_enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetProcessInfoParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetProcessInfoResult {
            pub process_info: Vec<Box<crate::generated::system_info::ProcessInfo>>,
        }
    }

    pub mod events {
    }
}

pub mod target {
    pub type TargetID = String;
    pub type SessionID = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct TargetInfo {
        pub target_id: crate::generated::target::TargetID,
        pub type_: String,
        pub title: String,
        pub url: String,
        pub attached: bool,
        pub parent_id: Option<crate::generated::target::TargetID>,
        pub opener_id: Option<crate::generated::target::TargetID>,
        pub can_access_opener: bool,
        pub opener_frame_id: Option<crate::generated::page::FrameId>,
        pub parent_frame_id: Option<crate::generated::page::FrameId>,
        pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        pub subtype: Option<String>,
        pub embedder_data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FilterEntry {
        pub exclude: Option<bool>,
        pub type_: Option<String>,
    }
    pub type TargetFilter = Vec<Box<crate::generated::target::FilterEntry>>;
    #[derive(Clone, Debug, PartialEq)]
    pub struct RemoteLocation {
        pub host: String,
        pub port: i64,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum WindowState {
        Normal,
        Minimized,
        Maximized,
        Fullscreen,
    }

    impl WindowState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Normal => "normal",
                Self::Minimized => "minimized",
                Self::Maximized => "maximized",
                Self::Fullscreen => "fullscreen",
            }
        }
    }

    impl AsRef<str> for WindowState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for WindowState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "normal" => Ok(Self::Normal),
                "minimized" => Ok(Self::Minimized),
                "maximized" => Ok(Self::Maximized),
                "fullscreen" => Ok(Self::Fullscreen),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "WindowState",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ActivateTargetParams {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ActivateTargetResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttachToTargetParams {
            pub target_id: crate::generated::target::TargetID,
            pub flatten: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttachToTargetResult {
            pub session_id: crate::generated::target::SessionID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttachToBrowserTargetParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttachToBrowserTargetResult {
            pub session_id: crate::generated::target::SessionID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseTargetParams {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CloseTargetResult {
            pub success: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExposeDevToolsProtocolParams {
            pub target_id: crate::generated::target::TargetID,
            pub binding_name: Option<String>,
            pub inherit_permissions: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExposeDevToolsProtocolResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateBrowserContextParams {
            pub dispose_on_detach: Option<bool>,
            pub proxy_server: Option<String>,
            pub proxy_bypass_list: Option<String>,
            pub origins_with_universal_network_access: Option<Vec<String>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateBrowserContextResult {
            pub browser_context_id: crate::generated::browser::BrowserContextID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserContextsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBrowserContextsResult {
            pub browser_context_ids: Vec<crate::generated::browser::BrowserContextID>,
            pub default_browser_context_id: Option<crate::generated::browser::BrowserContextID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateTargetParams {
            pub url: String,
            pub left: Option<i64>,
            pub top: Option<i64>,
            pub width: Option<i64>,
            pub height: Option<i64>,
            pub window_state: Option<crate::generated::target::WindowState>,
            pub browser_context_id: Option<crate::generated::browser::BrowserContextID>,
            pub enable_begin_frame_control: Option<bool>,
            pub new_window: Option<bool>,
            pub background: Option<bool>,
            pub for_tab: Option<bool>,
            pub hidden: Option<bool>,
            pub focus: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CreateTargetResult {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DetachFromTargetParams {
            pub session_id: Option<crate::generated::target::SessionID>,
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DetachFromTargetResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisposeBrowserContextParams {
            pub browser_context_id: crate::generated::browser::BrowserContextID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisposeBrowserContextResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTargetInfoParams {
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTargetInfoResult {
            pub target_info: Box<crate::generated::target::TargetInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTargetsParams {
            pub filter: Option<crate::generated::target::TargetFilter>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTargetsResult {
            pub target_infos: Vec<Box<crate::generated::target::TargetInfo>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SendMessageToTargetParams {
            pub message: String,
            pub session_id: Option<crate::generated::target::SessionID>,
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SendMessageToTargetResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutoAttachParams {
            pub auto_attach: bool,
            pub wait_for_debugger_on_start: bool,
            pub flatten: Option<bool>,
            pub filter: Option<crate::generated::target::TargetFilter>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutoAttachResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AutoAttachRelatedParams {
            pub target_id: crate::generated::target::TargetID,
            pub wait_for_debugger_on_start: bool,
            pub filter: Option<crate::generated::target::TargetFilter>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AutoAttachRelatedResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDiscoverTargetsParams {
            pub discover: bool,
            pub filter: Option<crate::generated::target::TargetFilter>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetDiscoverTargetsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRemoteLocationsParams {
            pub locations: Vec<Box<crate::generated::target::RemoteLocation>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetRemoteLocationsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDevToolsTargetParams {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDevToolsTargetResult {
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenDevToolsParams {
            pub target_id: crate::generated::target::TargetID,
            pub panel_id: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct OpenDevToolsResult {
            pub target_id: crate::generated::target::TargetID,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AttachedToTargetEvent {
            pub session_id: crate::generated::target::SessionID,
            pub target_info: Box<crate::generated::target::TargetInfo>,
            pub waiting_for_debugger: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DetachedFromTargetEvent {
            pub session_id: crate::generated::target::SessionID,
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReceivedMessageFromTargetEvent {
            pub session_id: crate::generated::target::SessionID,
            pub message: String,
            pub target_id: Option<crate::generated::target::TargetID>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetCreatedEvent {
            pub target_info: Box<crate::generated::target::TargetInfo>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetDestroyedEvent {
            pub target_id: crate::generated::target::TargetID,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetCrashedEvent {
            pub target_id: crate::generated::target::TargetID,
            pub status: String,
            pub error_code: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TargetInfoChangedEvent {
            pub target_info: Box<crate::generated::target::TargetInfo>,
        }
    }
}

pub mod tethering {

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct BindParams {
            pub port: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct BindResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct UnbindParams {
            pub port: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct UnbindResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AcceptedEvent {
            pub port: i64,
            pub connection_id: String,
        }
    }
}

pub mod tracing {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TraceConfigRecordModePropertyEnum {
        RecordUntilFull,
        RecordContinuously,
        RecordAsMuchAsPossible,
        EchoToConsole,
    }

    impl TraceConfigRecordModePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::RecordUntilFull => "recordUntilFull",
                Self::RecordContinuously => "recordContinuously",
                Self::RecordAsMuchAsPossible => "recordAsMuchAsPossible",
                Self::EchoToConsole => "echoToConsole",
            }
        }
    }

    impl AsRef<str> for TraceConfigRecordModePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TraceConfigRecordModePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "recordUntilFull" => Ok(Self::RecordUntilFull),
                "recordContinuously" => Ok(Self::RecordContinuously),
                "recordAsMuchAsPossible" => Ok(Self::RecordAsMuchAsPossible),
                "echoToConsole" => Ok(Self::EchoToConsole),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TraceConfigRecordModePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type MemoryDumpConfig = std::collections::BTreeMap<String, crate::generated::JsonValue>;
    #[derive(Clone, Debug, PartialEq)]
    pub struct TraceConfig {
        pub record_mode: Option<crate::generated::tracing::TraceConfigRecordModePropertyEnum>,
        pub trace_buffer_size_in_kb: Option<f64>,
        pub enable_sampling: Option<bool>,
        pub enable_systrace: Option<bool>,
        pub enable_argument_filter: Option<bool>,
        pub included_categories: Option<Vec<String>>,
        pub excluded_categories: Option<Vec<String>>,
        pub synthetic_delays: Option<Vec<String>>,
        pub memory_dump_config: Option<Box<crate::generated::tracing::MemoryDumpConfig>>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StreamFormat {
        Json,
        Proto,
    }

    impl StreamFormat {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Json => "json",
                Self::Proto => "proto",
            }
        }
    }

    impl AsRef<str> for StreamFormat {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StreamFormat {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "json" => Ok(Self::Json),
                "proto" => Ok(Self::Proto),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StreamFormat",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum StreamCompression {
        None,
        Gzip,
    }

    impl StreamCompression {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::None => "none",
                Self::Gzip => "gzip",
            }
        }
    }

    impl AsRef<str> for StreamCompression {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for StreamCompression {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "none" => Ok(Self::None),
                "gzip" => Ok(Self::Gzip),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "StreamCompression",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum MemoryDumpLevelOfDetail {
        Background,
        Light,
        Detailed,
    }

    impl MemoryDumpLevelOfDetail {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Background => "background",
                Self::Light => "light",
                Self::Detailed => "detailed",
            }
        }
    }

    impl AsRef<str> for MemoryDumpLevelOfDetail {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for MemoryDumpLevelOfDetail {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "background" => Ok(Self::Background),
                "light" => Ok(Self::Light),
                "detailed" => Ok(Self::Detailed),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "MemoryDumpLevelOfDetail",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum TracingBackend {
        Auto,
        Chrome,
        System,
    }

    impl TracingBackend {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Auto => "auto",
                Self::Chrome => "chrome",
                Self::System => "system",
            }
        }
    }

    impl AsRef<str> for TracingBackend {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for TracingBackend {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "auto" => Ok(Self::Auto),
                "chrome" => Ok(Self::Chrome),
                "system" => Ok(Self::System),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "TracingBackend",
                    value: value.to_owned(),
                }),
            }
        }
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EndParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EndResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCategoriesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCategoriesResult {
            pub categories: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTrackEventDescriptorParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetTrackEventDescriptorResult {
            pub descriptor: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RecordClockSyncMarkerParams {
            pub sync_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RecordClockSyncMarkerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestMemoryDumpParams {
            pub deterministic: Option<bool>,
            pub level_of_detail: Option<crate::generated::tracing::MemoryDumpLevelOfDetail>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RequestMemoryDumpResult {
            pub dump_guid: String,
            pub success: bool,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum StartTransferModeParamEnum {
            ReportEvents,
            ReturnAsStream,
        }

        impl StartTransferModeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::ReportEvents => "ReportEvents",
                    Self::ReturnAsStream => "ReturnAsStream",
                }
            }
        }

        impl AsRef<str> for StartTransferModeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for StartTransferModeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "ReportEvents" => Ok(Self::ReportEvents),
                    "ReturnAsStream" => Ok(Self::ReturnAsStream),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "StartTransferModeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartParams {
            pub categories: Option<String>,
            pub options: Option<String>,
            pub buffer_usage_reporting_interval: Option<f64>,
            pub transfer_mode: Option<crate::generated::tracing::commands::StartTransferModeParamEnum>,
            pub stream_format: Option<crate::generated::tracing::StreamFormat>,
            pub stream_compression: Option<crate::generated::tracing::StreamCompression>,
            pub trace_config: Option<Box<crate::generated::tracing::TraceConfig>>,
            pub perfetto_config: Option<String>,
            pub tracing_backend: Option<crate::generated::tracing::TracingBackend>,
            pub screenshot_max_size: Option<i64>,
            pub screenshot_max_count: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct BufferUsageEvent {
            pub percent_full: Option<f64>,
            pub event_count: Option<f64>,
            pub value: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DataCollectedEvent {
            pub value: Vec<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TracingCompleteEvent {
            pub data_loss_occurred: bool,
            pub stream: Option<crate::generated::io::StreamHandle>,
            pub trace_format: Option<crate::generated::tracing::StreamFormat>,
            pub stream_compression: Option<crate::generated::tracing::StreamCompression>,
        }
    }
}

pub mod web_audio {
    pub type GraphObjectId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ContextType {
        Realtime,
        Offline,
    }

    impl ContextType {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Realtime => "realtime",
                Self::Offline => "offline",
            }
        }
    }

    impl AsRef<str> for ContextType {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ContextType {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "realtime" => Ok(Self::Realtime),
                "offline" => Ok(Self::Offline),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ContextType",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ContextState {
        Suspended,
        Running,
        Closed,
        Interrupted,
    }

    impl ContextState {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Suspended => "suspended",
                Self::Running => "running",
                Self::Closed => "closed",
                Self::Interrupted => "interrupted",
            }
        }
    }

    impl AsRef<str> for ContextState {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ContextState {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "suspended" => Ok(Self::Suspended),
                "running" => Ok(Self::Running),
                "closed" => Ok(Self::Closed),
                "interrupted" => Ok(Self::Interrupted),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ContextState",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type NodeType = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ChannelCountMode {
        ClampedMax,
        Explicit,
        Max,
    }

    impl ChannelCountMode {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ClampedMax => "clamped-max",
                Self::Explicit => "explicit",
                Self::Max => "max",
            }
        }
    }

    impl AsRef<str> for ChannelCountMode {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ChannelCountMode {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "clamped-max" => Ok(Self::ClampedMax),
                "explicit" => Ok(Self::Explicit),
                "max" => Ok(Self::Max),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ChannelCountMode",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ChannelInterpretation {
        Discrete,
        Speakers,
    }

    impl ChannelInterpretation {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Discrete => "discrete",
                Self::Speakers => "speakers",
            }
        }
    }

    impl AsRef<str> for ChannelInterpretation {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ChannelInterpretation {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "discrete" => Ok(Self::Discrete),
                "speakers" => Ok(Self::Speakers),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ChannelInterpretation",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type ParamType = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AutomationRate {
        ARate,
        KRate,
    }

    impl AutomationRate {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::ARate => "a-rate",
                Self::KRate => "k-rate",
            }
        }
    }

    impl AsRef<str> for AutomationRate {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AutomationRate {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "a-rate" => Ok(Self::ARate),
                "k-rate" => Ok(Self::KRate),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AutomationRate",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ContextRealtimeData {
        pub current_time: f64,
        pub render_capacity: f64,
        pub callback_interval_mean: f64,
        pub callback_interval_variance: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BaseAudioContext {
        pub context_id: crate::generated::web_audio::GraphObjectId,
        pub context_type: crate::generated::web_audio::ContextType,
        pub context_state: crate::generated::web_audio::ContextState,
        pub realtime_data: Option<Box<crate::generated::web_audio::ContextRealtimeData>>,
        pub callback_buffer_size: f64,
        pub max_output_channel_count: f64,
        pub sample_rate: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AudioListener {
        pub listener_id: crate::generated::web_audio::GraphObjectId,
        pub context_id: crate::generated::web_audio::GraphObjectId,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AudioNode {
        pub node_id: crate::generated::web_audio::GraphObjectId,
        pub context_id: crate::generated::web_audio::GraphObjectId,
        pub node_type: crate::generated::web_audio::NodeType,
        pub number_of_inputs: f64,
        pub number_of_outputs: f64,
        pub channel_count: f64,
        pub channel_count_mode: crate::generated::web_audio::ChannelCountMode,
        pub channel_interpretation: crate::generated::web_audio::ChannelInterpretation,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct AudioParam {
        pub param_id: crate::generated::web_audio::GraphObjectId,
        pub node_id: crate::generated::web_audio::GraphObjectId,
        pub context_id: crate::generated::web_audio::GraphObjectId,
        pub param_type: crate::generated::web_audio::ParamType,
        pub rate: crate::generated::web_audio::AutomationRate,
        pub default_value: f64,
        pub min_value: f64,
        pub max_value: f64,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRealtimeDataParams {
            pub context_id: crate::generated::web_audio::GraphObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetRealtimeDataResult {
            pub realtime_data: Box<crate::generated::web_audio::ContextRealtimeData>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContextCreatedEvent {
            pub context: Box<crate::generated::web_audio::BaseAudioContext>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContextWillBeDestroyedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContextChangedEvent {
            pub context: Box<crate::generated::web_audio::BaseAudioContext>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioListenerCreatedEvent {
            pub listener: Box<crate::generated::web_audio::AudioListener>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioListenerWillBeDestroyedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub listener_id: crate::generated::web_audio::GraphObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioNodeCreatedEvent {
            pub node: Box<crate::generated::web_audio::AudioNode>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioNodeWillBeDestroyedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub node_id: crate::generated::web_audio::GraphObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioParamCreatedEvent {
            pub param: Box<crate::generated::web_audio::AudioParam>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AudioParamWillBeDestroyedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub node_id: crate::generated::web_audio::GraphObjectId,
            pub param_id: crate::generated::web_audio::GraphObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodesConnectedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub source_id: crate::generated::web_audio::GraphObjectId,
            pub destination_id: crate::generated::web_audio::GraphObjectId,
            pub source_output_index: Option<f64>,
            pub destination_input_index: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodesDisconnectedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub source_id: crate::generated::web_audio::GraphObjectId,
            pub destination_id: crate::generated::web_audio::GraphObjectId,
            pub source_output_index: Option<f64>,
            pub destination_input_index: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodeParamConnectedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub source_id: crate::generated::web_audio::GraphObjectId,
            pub destination_id: crate::generated::web_audio::GraphObjectId,
            pub source_output_index: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NodeParamDisconnectedEvent {
            pub context_id: crate::generated::web_audio::GraphObjectId,
            pub source_id: crate::generated::web_audio::GraphObjectId,
            pub destination_id: crate::generated::web_audio::GraphObjectId,
            pub source_output_index: Option<f64>,
        }
    }
}

pub mod web_authn {
    pub type AuthenticatorId = String;
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthenticatorProtocol {
        U2f,
        Ctap2,
    }

    impl AuthenticatorProtocol {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::U2f => "u2f",
                Self::Ctap2 => "ctap2",
            }
        }
    }

    impl AsRef<str> for AuthenticatorProtocol {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthenticatorProtocol {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "u2f" => Ok(Self::U2f),
                "ctap2" => Ok(Self::Ctap2),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthenticatorProtocol",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum Ctap2Version {
        Ctap20,
        Ctap21,
        Ctap22,
    }

    impl Ctap2Version {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Ctap20 => "ctap2_0",
                Self::Ctap21 => "ctap2_1",
                Self::Ctap22 => "ctap2_2",
            }
        }
    }

    impl AsRef<str> for Ctap2Version {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for Ctap2Version {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "ctap2_0" => Ok(Self::Ctap20),
                "ctap2_1" => Ok(Self::Ctap21),
                "ctap2_2" => Ok(Self::Ctap22),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "Ctap2Version",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum AuthenticatorTransport {
        Usb,
        Nfc,
        Ble,
        Cable,
        Hybrid,
        SmartCard,
        Internal,
    }

    impl AuthenticatorTransport {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Usb => "usb",
                Self::Nfc => "nfc",
                Self::Ble => "ble",
                Self::Cable => "cable",
                Self::Hybrid => "hybrid",
                Self::SmartCard => "smart-card",
                Self::Internal => "internal",
            }
        }
    }

    impl AsRef<str> for AuthenticatorTransport {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for AuthenticatorTransport {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "usb" => Ok(Self::Usb),
                "nfc" => Ok(Self::Nfc),
                "ble" => Ok(Self::Ble),
                "cable" => Ok(Self::Cable),
                "hybrid" => Ok(Self::Hybrid),
                "smart-card" => Ok(Self::SmartCard),
                "internal" => Ok(Self::Internal),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "AuthenticatorTransport",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct VirtualAuthenticatorOptions {
        pub protocol: crate::generated::web_authn::AuthenticatorProtocol,
        pub ctap2_version: Option<crate::generated::web_authn::Ctap2Version>,
        pub transport: crate::generated::web_authn::AuthenticatorTransport,
        pub has_resident_key: Option<bool>,
        pub has_user_verification: Option<bool>,
        pub has_large_blob: Option<bool>,
        pub has_cred_blob: Option<bool>,
        pub has_min_pin_length: Option<bool>,
        pub has_prf: Option<bool>,
        pub has_hmac_secret: Option<bool>,
        pub has_hmac_secret_mc: Option<bool>,
        pub has_cmtg_key: Option<bool>,
        pub automatic_presence_simulation: Option<bool>,
        pub is_user_verified: Option<bool>,
        pub default_backup_eligibility: Option<bool>,
        pub default_backup_state: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Credential {
        pub credential_id: String,
        pub is_resident_credential: bool,
        pub rp_id: Option<String>,
        pub private_key: String,
        pub user_handle: Option<String>,
        pub sign_count: i64,
        pub large_blob: Option<String>,
        pub backup_eligibility: Option<bool>,
        pub backup_state: Option<bool>,
        pub user_name: Option<String>,
        pub user_display_name: Option<String>,
        pub cmtg_keys: Option<Vec<String>>,
        pub active_cmtg_key_index: Option<i64>,
        pub generate_cmtg_key_on_next_operation: Option<bool>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub enable_ui: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddVirtualAuthenticatorParams {
            pub options: Box<crate::generated::web_authn::VirtualAuthenticatorOptions>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddVirtualAuthenticatorResult {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetResponseOverrideBitsParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub is_bogus_signature: Option<bool>,
            pub is_bad_uv: Option<bool>,
            pub is_bad_up: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetResponseOverrideBitsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveVirtualAuthenticatorParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveVirtualAuthenticatorResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCredentialParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential: Box<crate::generated::web_authn::Credential>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddCredentialResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCredentialParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCredentialResult {
            pub credential: Box<crate::generated::web_authn::Credential>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCredentialsParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetCredentialsResult {
            pub credentials: Vec<Box<crate::generated::web_authn::Credential>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveCredentialParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveCredentialResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCredentialsParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearCredentialsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserVerifiedParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub is_user_verified: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetUserVerifiedResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutomaticPresenceSimulationParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAutomaticPresenceSimulationResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCredentialPropertiesParams {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential_id: String,
            pub backup_eligibility: Option<bool>,
            pub backup_state: Option<bool>,
            pub active_cmtg_key_index: Option<i64>,
            pub generate_cmtg_key_on_next_operation: Option<bool>,
            pub sign_count: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCredentialPropertiesResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct CredentialAddedEvent {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential: Box<crate::generated::web_authn::Credential>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CredentialDeletedEvent {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CredentialUpdatedEvent {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential: Box<crate::generated::web_authn::Credential>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CredentialAssertedEvent {
            pub authenticator_id: crate::generated::web_authn::AuthenticatorId,
            pub credential: Box<crate::generated::web_authn::Credential>,
        }
    }
}

pub mod web_mcp {
    #[derive(Clone, Debug, PartialEq)]
    pub struct Annotation {
        pub read_only: Option<bool>,
        pub untrusted_content: Option<bool>,
        pub autosubmit: Option<bool>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum InvocationStatus {
        Completed,
        Canceled,
        Error,
    }

    impl InvocationStatus {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Completed => "Completed",
                Self::Canceled => "Canceled",
                Self::Error => "Error",
            }
        }
    }

    impl AsRef<str> for InvocationStatus {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for InvocationStatus {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "Completed" => Ok(Self::Completed),
                "Canceled" => Ok(Self::Canceled),
                "Error" => Ok(Self::Error),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "InvocationStatus",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Tool {
        pub name: String,
        pub description: String,
        pub input_schema: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
        pub annotations: Option<Box<crate::generated::web_mcp::Annotation>>,
        pub frame_id: crate::generated::page::FrameId,
        pub backend_node_id: Option<crate::generated::dom::BackendNodeId>,
        pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct RemovedTool {
        pub name: String,
        pub frame_id: crate::generated::page::FrameId,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct InvokeToolParams {
            pub frame_id: crate::generated::page::FrameId,
            pub tool_name: String,
            pub input: std::collections::BTreeMap<String, crate::generated::JsonValue>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct InvokeToolResult {
            pub invocation_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelInvocationParams {
            pub invocation_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CancelInvocationResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ToolsAddedEvent {
            pub tools: Vec<Box<crate::generated::web_mcp::Tool>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ToolsRemovedEvent {
            pub tools: Vec<Box<crate::generated::web_mcp::RemovedTool>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ToolInvokedEvent {
            pub tool_name: String,
            pub frame_id: crate::generated::page::FrameId,
            pub invocation_id: String,
            pub input: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ToolRespondedEvent {
            pub invocation_id: String,
            pub status: crate::generated::web_mcp::InvocationStatus,
            pub output: Option<crate::generated::JsonValue>,
            pub error_text: Option<String>,
            pub exception: Option<Box<crate::generated::runtime::RemoteObject>>,
        }
    }
}

pub mod console {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ConsoleMessageSourcePropertyEnum {
        Xml,
        Javascript,
        Network,
        ConsoleApi,
        Storage,
        Appcache,
        Rendering,
        Security,
        Other,
        Deprecation,
        Worker,
    }

    impl ConsoleMessageSourcePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Xml => "xml",
                Self::Javascript => "javascript",
                Self::Network => "network",
                Self::ConsoleApi => "console-api",
                Self::Storage => "storage",
                Self::Appcache => "appcache",
                Self::Rendering => "rendering",
                Self::Security => "security",
                Self::Other => "other",
                Self::Deprecation => "deprecation",
                Self::Worker => "worker",
            }
        }
    }

    impl AsRef<str> for ConsoleMessageSourcePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ConsoleMessageSourcePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "xml" => Ok(Self::Xml),
                "javascript" => Ok(Self::Javascript),
                "network" => Ok(Self::Network),
                "console-api" => Ok(Self::ConsoleApi),
                "storage" => Ok(Self::Storage),
                "appcache" => Ok(Self::Appcache),
                "rendering" => Ok(Self::Rendering),
                "security" => Ok(Self::Security),
                "other" => Ok(Self::Other),
                "deprecation" => Ok(Self::Deprecation),
                "worker" => Ok(Self::Worker),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ConsoleMessageSourcePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ConsoleMessageLevelPropertyEnum {
        Log,
        Warning,
        Error,
        Debug,
        Info,
    }

    impl ConsoleMessageLevelPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Log => "log",
                Self::Warning => "warning",
                Self::Error => "error",
                Self::Debug => "debug",
                Self::Info => "info",
            }
        }
    }

    impl AsRef<str> for ConsoleMessageLevelPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ConsoleMessageLevelPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "log" => Ok(Self::Log),
                "warning" => Ok(Self::Warning),
                "error" => Ok(Self::Error),
                "debug" => Ok(Self::Debug),
                "info" => Ok(Self::Info),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ConsoleMessageLevelPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ConsoleMessage {
        pub source: crate::generated::console::ConsoleMessageSourcePropertyEnum,
        pub level: crate::generated::console::ConsoleMessageLevelPropertyEnum,
        pub text: String,
        pub url: Option<String>,
        pub line: Option<i64>,
        pub column: Option<i64>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearMessagesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ClearMessagesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct MessageAddedEvent {
            pub message: Box<crate::generated::console::ConsoleMessage>,
        }
    }
}

pub mod debugger {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScopeTypePropertyEnum {
        Global,
        Local,
        With,
        Closure,
        Catch,
        Block,
        Script,
        Eval,
        Module,
        WasmExpressionStack,
    }

    impl ScopeTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Global => "global",
                Self::Local => "local",
                Self::With => "with",
                Self::Closure => "closure",
                Self::Catch => "catch",
                Self::Block => "block",
                Self::Script => "script",
                Self::Eval => "eval",
                Self::Module => "module",
                Self::WasmExpressionStack => "wasm-expression-stack",
            }
        }
    }

    impl AsRef<str> for ScopeTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScopeTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "global" => Ok(Self::Global),
                "local" => Ok(Self::Local),
                "with" => Ok(Self::With),
                "closure" => Ok(Self::Closure),
                "catch" => Ok(Self::Catch),
                "block" => Ok(Self::Block),
                "script" => Ok(Self::Script),
                "eval" => Ok(Self::Eval),
                "module" => Ok(Self::Module),
                "wasm-expression-stack" => Ok(Self::WasmExpressionStack),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScopeTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum BreakLocationTypePropertyEnum {
        DebuggerStatement,
        Call,
        Return,
    }

    impl BreakLocationTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::DebuggerStatement => "debuggerStatement",
                Self::Call => "call",
                Self::Return => "return",
            }
        }
    }

    impl AsRef<str> for BreakLocationTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for BreakLocationTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "debuggerStatement" => Ok(Self::DebuggerStatement),
                "call" => Ok(Self::Call),
                "return" => Ok(Self::Return),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "BreakLocationTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DebugSymbolsTypePropertyEnum {
        SourceMap,
        EmbeddedDWARF,
        ExternalDWARF,
    }

    impl DebugSymbolsTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::SourceMap => "SourceMap",
                Self::EmbeddedDWARF => "EmbeddedDWARF",
                Self::ExternalDWARF => "ExternalDWARF",
            }
        }
    }

    impl AsRef<str> for DebugSymbolsTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DebugSymbolsTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "SourceMap" => Ok(Self::SourceMap),
                "EmbeddedDWARF" => Ok(Self::EmbeddedDWARF),
                "ExternalDWARF" => Ok(Self::ExternalDWARF),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DebugSymbolsTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type BreakpointId = String;
    pub type CallFrameId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct Location {
        pub script_id: crate::generated::runtime::ScriptId,
        pub line_number: i64,
        pub column_number: Option<i64>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScriptPosition {
        pub line_number: i64,
        pub column_number: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct LocationRange {
        pub script_id: crate::generated::runtime::ScriptId,
        pub start: Box<crate::generated::debugger::ScriptPosition>,
        pub end: Box<crate::generated::debugger::ScriptPosition>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CallFrame {
        pub call_frame_id: crate::generated::debugger::CallFrameId,
        pub function_name: String,
        pub function_location: Option<Box<crate::generated::debugger::Location>>,
        pub location: Box<crate::generated::debugger::Location>,
        pub url: String,
        pub scope_chain: Vec<Box<crate::generated::debugger::Scope>>,
        pub this: Box<crate::generated::runtime::RemoteObject>,
        pub return_value: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub can_be_restarted: Option<bool>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Scope {
        pub type_: crate::generated::debugger::ScopeTypePropertyEnum,
        pub object: Box<crate::generated::runtime::RemoteObject>,
        pub name: Option<String>,
        pub start_location: Option<Box<crate::generated::debugger::Location>>,
        pub end_location: Option<Box<crate::generated::debugger::Location>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SearchMatch {
        pub line_number: f64,
        pub line_content: String,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct BreakLocation {
        pub script_id: crate::generated::runtime::ScriptId,
        pub line_number: i64,
        pub column_number: Option<i64>,
        pub type_: Option<crate::generated::debugger::BreakLocationTypePropertyEnum>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct WasmDisassemblyChunk {
        pub lines: Vec<String>,
        pub bytecode_offsets: Vec<i64>,
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ScriptLanguage {
        JavaScript,
        WebAssembly,
    }

    impl ScriptLanguage {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::JavaScript => "JavaScript",
                Self::WebAssembly => "WebAssembly",
            }
        }
    }

    impl AsRef<str> for ScriptLanguage {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ScriptLanguage {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "JavaScript" => Ok(Self::JavaScript),
                "WebAssembly" => Ok(Self::WebAssembly),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ScriptLanguage",
                    value: value.to_owned(),
                }),
            }
        }
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DebugSymbols {
        pub type_: crate::generated::debugger::DebugSymbolsTypePropertyEnum,
        pub external_url: Option<String>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ResolvedBreakpoint {
        pub breakpoint_id: crate::generated::debugger::BreakpointId,
        pub location: Box<crate::generated::debugger::Location>,
    }

    pub mod commands {
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum ContinueToLocationTargetCallFramesParamEnum {
            Any,
            Current,
        }

        impl ContinueToLocationTargetCallFramesParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Any => "any",
                    Self::Current => "current",
                }
            }
        }

        impl AsRef<str> for ContinueToLocationTargetCallFramesParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for ContinueToLocationTargetCallFramesParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "any" => Ok(Self::Any),
                    "current" => Ok(Self::Current),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "ContinueToLocationTargetCallFramesParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueToLocationParams {
            pub location: Box<crate::generated::debugger::Location>,
            pub target_call_frames: Option<crate::generated::debugger::commands::ContinueToLocationTargetCallFramesParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ContinueToLocationResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams {
            pub max_scripts_cache_size: Option<f64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult {
            pub debugger_id: crate::generated::runtime::UniqueDebuggerId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EvaluateOnCallFrameParams {
            pub call_frame_id: crate::generated::debugger::CallFrameId,
            pub expression: String,
            pub object_group: Option<String>,
            pub include_command_line_api: Option<bool>,
            pub silent: Option<bool>,
            pub return_by_value: Option<bool>,
            pub generate_preview: Option<bool>,
            pub throw_on_side_effect: Option<bool>,
            pub timeout: Option<crate::generated::runtime::TimeDelta>,
            pub scope_number: Option<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EvaluateOnCallFrameResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPossibleBreakpointsParams {
            pub start: Box<crate::generated::debugger::Location>,
            pub end: Option<Box<crate::generated::debugger::Location>>,
            pub restrict_to_function: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPossibleBreakpointsResult {
            pub locations: Vec<Box<crate::generated::debugger::BreakLocation>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetScriptSourceParams {
            pub script_id: crate::generated::runtime::ScriptId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetScriptSourceResult {
            pub script_source: String,
            pub bytecode: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisassembleWasmModuleParams {
            pub script_id: crate::generated::runtime::ScriptId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisassembleWasmModuleResult {
            pub stream_id: Option<String>,
            pub total_number_of_lines: i64,
            pub function_body_offsets: Vec<i64>,
            pub chunk: Box<crate::generated::debugger::WasmDisassemblyChunk>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NextWasmDisassemblyChunkParams {
            pub stream_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct NextWasmDisassemblyChunkResult {
            pub chunk: Box<crate::generated::debugger::WasmDisassemblyChunk>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWasmBytecodeParams {
            pub script_id: crate::generated::runtime::ScriptId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetWasmBytecodeResult {
            pub bytecode: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStackTraceParams {
            pub stack_trace_id: Box<crate::generated::runtime::StackTraceId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetStackTraceResult {
            pub stack_trace: Box<crate::generated::runtime::StackTrace>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PauseParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct PauseResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct PauseOnAsyncCallParams {
            pub parent_stack_trace_id: Box<crate::generated::runtime::StackTraceId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PauseOnAsyncCallResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveBreakpointParams {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveBreakpointResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum RestartFrameModeParamEnum {
            StepInto,
        }

        impl RestartFrameModeParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::StepInto => "StepInto",
                }
            }
        }

        impl AsRef<str> for RestartFrameModeParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for RestartFrameModeParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "StepInto" => Ok(Self::StepInto),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "RestartFrameModeParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RestartFrameParams {
            pub call_frame_id: crate::generated::debugger::CallFrameId,
            pub mode: Option<crate::generated::debugger::commands::RestartFrameModeParamEnum>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RestartFrameResult {
            pub call_frames: Vec<Box<crate::generated::debugger::CallFrame>>,
            pub async_stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub async_stack_trace_id: Option<Box<crate::generated::runtime::StackTraceId>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResumeParams {
            pub terminate_on_resume: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResumeResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInContentParams {
            pub script_id: crate::generated::runtime::ScriptId,
            pub query: String,
            pub case_sensitive: Option<bool>,
            pub is_regex: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SearchInContentResult {
            pub result: Vec<Box<crate::generated::debugger::SearchMatch>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAsyncCallStackDepthParams {
            pub max_depth: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAsyncCallStackDepthResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxExecutionContextsParams {
            pub unique_ids: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxExecutionContextsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxPatternsParams {
            pub patterns: Vec<String>,
            pub skip_anonymous: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxPatternsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxedRangesParams {
            pub script_id: crate::generated::runtime::ScriptId,
            pub positions: Vec<Box<crate::generated::debugger::ScriptPosition>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBlackboxedRangesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointParams {
            pub location: Box<crate::generated::debugger::Location>,
            pub condition: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointResult {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
            pub actual_location: Box<crate::generated::debugger::Location>,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetInstrumentationBreakpointInstrumentationParamEnum {
            BeforeScriptExecution,
            BeforeScriptWithSourceMapExecution,
        }

        impl SetInstrumentationBreakpointInstrumentationParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::BeforeScriptExecution => "beforeScriptExecution",
                    Self::BeforeScriptWithSourceMapExecution => "beforeScriptWithSourceMapExecution",
                }
            }
        }

        impl AsRef<str> for SetInstrumentationBreakpointInstrumentationParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetInstrumentationBreakpointInstrumentationParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "beforeScriptExecution" => Ok(Self::BeforeScriptExecution),
                    "beforeScriptWithSourceMapExecution" => Ok(Self::BeforeScriptWithSourceMapExecution),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetInstrumentationBreakpointInstrumentationParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointParams {
            pub instrumentation: crate::generated::debugger::commands::SetInstrumentationBreakpointInstrumentationParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetInstrumentationBreakpointResult {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointByUrlParams {
            pub line_number: i64,
            pub url: Option<String>,
            pub url_regex: Option<String>,
            pub script_hash: Option<String>,
            pub column_number: Option<i64>,
            pub condition: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointByUrlResult {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
            pub locations: Vec<Box<crate::generated::debugger::Location>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointOnFunctionCallParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
            pub condition: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointOnFunctionCallResult {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointsActiveParams {
            pub active: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetBreakpointsActiveResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetPauseOnExceptionsStateParamEnum {
            None,
            Caught,
            Uncaught,
            All,
        }

        impl SetPauseOnExceptionsStateParamEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::None => "none",
                    Self::Caught => "caught",
                    Self::Uncaught => "uncaught",
                    Self::All => "all",
                }
            }
        }

        impl AsRef<str> for SetPauseOnExceptionsStateParamEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetPauseOnExceptionsStateParamEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "none" => Ok(Self::None),
                    "caught" => Ok(Self::Caught),
                    "uncaught" => Ok(Self::Uncaught),
                    "all" => Ok(Self::All),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetPauseOnExceptionsStateParamEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPauseOnExceptionsParams {
            pub state: crate::generated::debugger::commands::SetPauseOnExceptionsStateParamEnum,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetPauseOnExceptionsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetReturnValueParams {
            pub new_value: Box<crate::generated::runtime::CallArgument>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetReturnValueResult;
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum SetScriptSourceStatusResultEnum {
            Ok,
            CompileError,
            BlockedByActiveGenerator,
            BlockedByActiveFunction,
            BlockedByTopLevelEsModuleChange,
        }

        impl SetScriptSourceStatusResultEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Ok => "Ok",
                    Self::CompileError => "CompileError",
                    Self::BlockedByActiveGenerator => "BlockedByActiveGenerator",
                    Self::BlockedByActiveFunction => "BlockedByActiveFunction",
                    Self::BlockedByTopLevelEsModuleChange => "BlockedByTopLevelEsModuleChange",
                }
            }
        }

        impl AsRef<str> for SetScriptSourceStatusResultEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for SetScriptSourceStatusResultEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "Ok" => Ok(Self::Ok),
                    "CompileError" => Ok(Self::CompileError),
                    "BlockedByActiveGenerator" => Ok(Self::BlockedByActiveGenerator),
                    "BlockedByActiveFunction" => Ok(Self::BlockedByActiveFunction),
                    "BlockedByTopLevelEsModuleChange" => Ok(Self::BlockedByTopLevelEsModuleChange),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "SetScriptSourceStatusResultEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScriptSourceParams {
            pub script_id: crate::generated::runtime::ScriptId,
            pub script_source: String,
            pub dry_run: Option<bool>,
            pub allow_top_frame_editing: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetScriptSourceResult {
            pub call_frames: Option<Vec<Box<crate::generated::debugger::CallFrame>>>,
            pub stack_changed: Option<bool>,
            pub async_stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub async_stack_trace_id: Option<Box<crate::generated::runtime::StackTraceId>>,
            pub status: crate::generated::debugger::commands::SetScriptSourceStatusResultEnum,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSkipAllPausesParams {
            pub skip: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSkipAllPausesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVariableValueParams {
            pub scope_number: i64,
            pub variable_name: String,
            pub new_value: Box<crate::generated::runtime::CallArgument>,
            pub call_frame_id: crate::generated::debugger::CallFrameId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetVariableValueResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepIntoParams {
            pub break_on_async_call: Option<bool>,
            pub skip_list: Option<Vec<Box<crate::generated::debugger::LocationRange>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepIntoResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepOutParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepOutResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepOverParams {
            pub skip_list: Option<Vec<Box<crate::generated::debugger::LocationRange>>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StepOverResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct BreakpointResolvedEvent {
            pub breakpoint_id: crate::generated::debugger::BreakpointId,
            pub location: Box<crate::generated::debugger::Location>,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum PausedReasonEventEnum {
            Ambiguous,
            Assert,
            CSPViolation,
            DebugCommand,
            DOM,
            EventListener,
            Exception,
            Instrumentation,
            OOM,
            Other,
            PromiseRejection,
            XHR,
            Step,
        }

        impl PausedReasonEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Ambiguous => "ambiguous",
                    Self::Assert => "assert",
                    Self::CSPViolation => "CSPViolation",
                    Self::DebugCommand => "debugCommand",
                    Self::DOM => "DOM",
                    Self::EventListener => "EventListener",
                    Self::Exception => "exception",
                    Self::Instrumentation => "instrumentation",
                    Self::OOM => "OOM",
                    Self::Other => "other",
                    Self::PromiseRejection => "promiseRejection",
                    Self::XHR => "XHR",
                    Self::Step => "step",
                }
            }
        }

        impl AsRef<str> for PausedReasonEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for PausedReasonEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "ambiguous" => Ok(Self::Ambiguous),
                    "assert" => Ok(Self::Assert),
                    "CSPViolation" => Ok(Self::CSPViolation),
                    "debugCommand" => Ok(Self::DebugCommand),
                    "DOM" => Ok(Self::DOM),
                    "EventListener" => Ok(Self::EventListener),
                    "exception" => Ok(Self::Exception),
                    "instrumentation" => Ok(Self::Instrumentation),
                    "OOM" => Ok(Self::OOM),
                    "other" => Ok(Self::Other),
                    "promiseRejection" => Ok(Self::PromiseRejection),
                    "XHR" => Ok(Self::XHR),
                    "step" => Ok(Self::Step),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "PausedReasonEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PausedEvent {
            pub call_frames: Vec<Box<crate::generated::debugger::CallFrame>>,
            pub reason: crate::generated::debugger::events::PausedReasonEventEnum,
            pub data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
            pub hit_breakpoints: Option<Vec<String>>,
            pub async_stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub async_stack_trace_id: Option<Box<crate::generated::runtime::StackTraceId>>,
            pub async_call_stack_trace_id: Option<Box<crate::generated::runtime::StackTraceId>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResumedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScriptFailedToParseEvent {
            pub script_id: crate::generated::runtime::ScriptId,
            pub url: String,
            pub start_line: i64,
            pub start_column: i64,
            pub end_line: i64,
            pub end_column: i64,
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
            pub hash: String,
            pub build_id: String,
            pub execution_context_aux_data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
            pub source_map_url: Option<String>,
            pub has_source_url: Option<bool>,
            pub is_module: Option<bool>,
            pub length: Option<i64>,
            pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub code_offset: Option<i64>,
            pub script_language: Option<crate::generated::debugger::ScriptLanguage>,
            pub embedder_name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ScriptParsedEvent {
            pub script_id: crate::generated::runtime::ScriptId,
            pub url: String,
            pub start_line: i64,
            pub start_column: i64,
            pub end_line: i64,
            pub end_column: i64,
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
            pub hash: String,
            pub build_id: String,
            pub execution_context_aux_data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
            pub is_live_edit: Option<bool>,
            pub source_map_url: Option<String>,
            pub has_source_url: Option<bool>,
            pub is_module: Option<bool>,
            pub length: Option<i64>,
            pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub code_offset: Option<i64>,
            pub script_language: Option<crate::generated::debugger::ScriptLanguage>,
            pub debug_symbols: Option<Vec<Box<crate::generated::debugger::DebugSymbols>>>,
            pub embedder_name: Option<String>,
            pub resolved_breakpoints: Option<Vec<Box<crate::generated::debugger::ResolvedBreakpoint>>>,
        }
    }
}

pub mod heap_profiler {
    pub type HeapSnapshotObjectId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct SamplingHeapProfileNode {
        pub call_frame: Box<crate::generated::runtime::CallFrame>,
        pub self_size: f64,
        pub id: i64,
        pub children: Vec<Box<crate::generated::heap_profiler::SamplingHeapProfileNode>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SamplingHeapProfileSample {
        pub size: f64,
        pub node_id: i64,
        pub ordinal: f64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct SamplingHeapProfile {
        pub head: Box<crate::generated::heap_profiler::SamplingHeapProfileNode>,
        pub samples: Vec<Box<crate::generated::heap_profiler::SamplingHeapProfileSample>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddInspectedHeapObjectParams {
            pub heap_object_id: crate::generated::heap_profiler::HeapSnapshotObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddInspectedHeapObjectResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectGarbageParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct CollectGarbageResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHeapObjectIdParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHeapObjectIdResult {
            pub heap_snapshot_object_id: crate::generated::heap_profiler::HeapSnapshotObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetObjectByHeapObjectIdParams {
            pub object_id: crate::generated::heap_profiler::HeapSnapshotObjectId,
            pub object_group: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetObjectByHeapObjectIdResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSamplingProfileParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetSamplingProfileResult {
            pub profile: Box<crate::generated::heap_profiler::SamplingHeapProfile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartSamplingParams {
            pub sampling_interval: Option<f64>,
            pub stack_depth: Option<f64>,
            pub include_objects_collected_by_major_gc: Option<bool>,
            pub include_objects_collected_by_minor_gc: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartSamplingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartTrackingHeapObjectsParams {
            pub track_allocations: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartTrackingHeapObjectsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopSamplingParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopSamplingResult {
            pub profile: Box<crate::generated::heap_profiler::SamplingHeapProfile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopTrackingHeapObjectsParams {
            pub report_progress: Option<bool>,
            pub treat_global_objects_as_roots: Option<bool>,
            pub capture_numeric_value: Option<bool>,
            pub expose_internals: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopTrackingHeapObjectsResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeHeapSnapshotParams {
            pub report_progress: Option<bool>,
            pub treat_global_objects_as_roots: Option<bool>,
            pub capture_numeric_value: Option<bool>,
            pub expose_internals: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakeHeapSnapshotResult;
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddHeapSnapshotChunkEvent {
            pub chunk: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct HeapStatsUpdateEvent {
            pub stats_update: Vec<i64>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct LastSeenObjectIdEvent {
            pub last_seen_object_id: i64,
            pub timestamp: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReportHeapSnapshotProgressEvent {
            pub done: i64,
            pub total: i64,
            pub finished: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ResetProfilesEvent;
    }
}

pub mod profiler {
    #[derive(Clone, Debug, PartialEq)]
    pub struct ProfileNode {
        pub id: i64,
        pub call_frame: Box<crate::generated::runtime::CallFrame>,
        pub hit_count: Option<i64>,
        pub children: Option<Vec<i64>>,
        pub deopt_reason: Option<String>,
        pub position_ticks: Option<Vec<Box<crate::generated::profiler::PositionTickInfo>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct Profile {
        pub nodes: Vec<Box<crate::generated::profiler::ProfileNode>>,
        pub start_time: f64,
        pub end_time: f64,
        pub samples: Option<Vec<i64>>,
        pub time_deltas: Option<Vec<i64>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PositionTickInfo {
        pub line: i64,
        pub ticks: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CoverageRange {
        pub start_offset: i64,
        pub end_offset: i64,
        pub count: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct FunctionCoverage {
        pub function_name: String,
        pub ranges: Vec<Box<crate::generated::profiler::CoverageRange>>,
        pub is_block_coverage: bool,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ScriptCoverage {
        pub script_id: crate::generated::runtime::ScriptId,
        pub url: String,
        pub functions: Vec<Box<crate::generated::profiler::FunctionCoverage>>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBestEffortCoverageParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetBestEffortCoverageResult {
            pub result: Vec<Box<crate::generated::profiler::ScriptCoverage>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSamplingIntervalParams {
            pub interval: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetSamplingIntervalResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartPreciseCoverageParams {
            pub call_count: Option<bool>,
            pub detailed: Option<bool>,
            pub allow_triggered_updates: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StartPreciseCoverageResult {
            pub timestamp: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopResult {
            pub profile: Box<crate::generated::profiler::Profile>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopPreciseCoverageParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct StopPreciseCoverageResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakePreciseCoverageParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TakePreciseCoverageResult {
            pub result: Vec<Box<crate::generated::profiler::ScriptCoverage>>,
            pub timestamp: f64,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConsoleProfileFinishedEvent {
            pub id: String,
            pub location: Box<crate::generated::debugger::Location>,
            pub profile: Box<crate::generated::profiler::Profile>,
            pub title: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConsoleProfileStartedEvent {
            pub id: String,
            pub location: Box<crate::generated::debugger::Location>,
            pub title: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct PreciseCoverageDeltaUpdateEvent {
            pub timestamp: f64,
            pub occasion: String,
            pub result: Vec<Box<crate::generated::profiler::ScriptCoverage>>,
        }
    }
}

pub mod runtime {
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum SerializationOptionsSerializationPropertyEnum {
        Deep,
        Json,
        IdOnly,
    }

    impl SerializationOptionsSerializationPropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Deep => "deep",
                Self::Json => "json",
                Self::IdOnly => "idOnly",
            }
        }
    }

    impl AsRef<str> for SerializationOptionsSerializationPropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for SerializationOptionsSerializationPropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "deep" => Ok(Self::Deep),
                "json" => Ok(Self::Json),
                "idOnly" => Ok(Self::IdOnly),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "SerializationOptionsSerializationPropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum DeepSerializedValueTypePropertyEnum {
        Undefined,
        Null,
        String,
        Number,
        Boolean,
        Bigint,
        Regexp,
        Date,
        Symbol,
        Array,
        Object,
        Function,
        Map,
        Set,
        Weakmap,
        Weakset,
        Error,
        Proxy,
        Promise,
        Typedarray,
        Arraybuffer,
        Node,
        Window,
        Generator,
    }

    impl DeepSerializedValueTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Undefined => "undefined",
                Self::Null => "null",
                Self::String => "string",
                Self::Number => "number",
                Self::Boolean => "boolean",
                Self::Bigint => "bigint",
                Self::Regexp => "regexp",
                Self::Date => "date",
                Self::Symbol => "symbol",
                Self::Array => "array",
                Self::Object => "object",
                Self::Function => "function",
                Self::Map => "map",
                Self::Set => "set",
                Self::Weakmap => "weakmap",
                Self::Weakset => "weakset",
                Self::Error => "error",
                Self::Proxy => "proxy",
                Self::Promise => "promise",
                Self::Typedarray => "typedarray",
                Self::Arraybuffer => "arraybuffer",
                Self::Node => "node",
                Self::Window => "window",
                Self::Generator => "generator",
            }
        }
    }

    impl AsRef<str> for DeepSerializedValueTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for DeepSerializedValueTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "undefined" => Ok(Self::Undefined),
                "null" => Ok(Self::Null),
                "string" => Ok(Self::String),
                "number" => Ok(Self::Number),
                "boolean" => Ok(Self::Boolean),
                "bigint" => Ok(Self::Bigint),
                "regexp" => Ok(Self::Regexp),
                "date" => Ok(Self::Date),
                "symbol" => Ok(Self::Symbol),
                "array" => Ok(Self::Array),
                "object" => Ok(Self::Object),
                "function" => Ok(Self::Function),
                "map" => Ok(Self::Map),
                "set" => Ok(Self::Set),
                "weakmap" => Ok(Self::Weakmap),
                "weakset" => Ok(Self::Weakset),
                "error" => Ok(Self::Error),
                "proxy" => Ok(Self::Proxy),
                "promise" => Ok(Self::Promise),
                "typedarray" => Ok(Self::Typedarray),
                "arraybuffer" => Ok(Self::Arraybuffer),
                "node" => Ok(Self::Node),
                "window" => Ok(Self::Window),
                "generator" => Ok(Self::Generator),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "DeepSerializedValueTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RemoteObjectTypePropertyEnum {
        Object,
        Function,
        Undefined,
        String,
        Number,
        Boolean,
        Symbol,
        Bigint,
    }

    impl RemoteObjectTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Object => "object",
                Self::Function => "function",
                Self::Undefined => "undefined",
                Self::String => "string",
                Self::Number => "number",
                Self::Boolean => "boolean",
                Self::Symbol => "symbol",
                Self::Bigint => "bigint",
            }
        }
    }

    impl AsRef<str> for RemoteObjectTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RemoteObjectTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "object" => Ok(Self::Object),
                "function" => Ok(Self::Function),
                "undefined" => Ok(Self::Undefined),
                "string" => Ok(Self::String),
                "number" => Ok(Self::Number),
                "boolean" => Ok(Self::Boolean),
                "symbol" => Ok(Self::Symbol),
                "bigint" => Ok(Self::Bigint),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RemoteObjectTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum RemoteObjectSubtypePropertyEnum {
        Array,
        Null,
        Node,
        Regexp,
        Date,
        Map,
        Set,
        Weakmap,
        Weakset,
        Iterator,
        Generator,
        Error,
        Proxy,
        Promise,
        Typedarray,
        Arraybuffer,
        Dataview,
        Webassemblymemory,
        Wasmvalue,
        Trustedtype,
    }

    impl RemoteObjectSubtypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Array => "array",
                Self::Null => "null",
                Self::Node => "node",
                Self::Regexp => "regexp",
                Self::Date => "date",
                Self::Map => "map",
                Self::Set => "set",
                Self::Weakmap => "weakmap",
                Self::Weakset => "weakset",
                Self::Iterator => "iterator",
                Self::Generator => "generator",
                Self::Error => "error",
                Self::Proxy => "proxy",
                Self::Promise => "promise",
                Self::Typedarray => "typedarray",
                Self::Arraybuffer => "arraybuffer",
                Self::Dataview => "dataview",
                Self::Webassemblymemory => "webassemblymemory",
                Self::Wasmvalue => "wasmvalue",
                Self::Trustedtype => "trustedtype",
            }
        }
    }

    impl AsRef<str> for RemoteObjectSubtypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for RemoteObjectSubtypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "array" => Ok(Self::Array),
                "null" => Ok(Self::Null),
                "node" => Ok(Self::Node),
                "regexp" => Ok(Self::Regexp),
                "date" => Ok(Self::Date),
                "map" => Ok(Self::Map),
                "set" => Ok(Self::Set),
                "weakmap" => Ok(Self::Weakmap),
                "weakset" => Ok(Self::Weakset),
                "iterator" => Ok(Self::Iterator),
                "generator" => Ok(Self::Generator),
                "error" => Ok(Self::Error),
                "proxy" => Ok(Self::Proxy),
                "promise" => Ok(Self::Promise),
                "typedarray" => Ok(Self::Typedarray),
                "arraybuffer" => Ok(Self::Arraybuffer),
                "dataview" => Ok(Self::Dataview),
                "webassemblymemory" => Ok(Self::Webassemblymemory),
                "wasmvalue" => Ok(Self::Wasmvalue),
                "trustedtype" => Ok(Self::Trustedtype),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "RemoteObjectSubtypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ObjectPreviewTypePropertyEnum {
        Object,
        Function,
        Undefined,
        String,
        Number,
        Boolean,
        Symbol,
        Bigint,
    }

    impl ObjectPreviewTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Object => "object",
                Self::Function => "function",
                Self::Undefined => "undefined",
                Self::String => "string",
                Self::Number => "number",
                Self::Boolean => "boolean",
                Self::Symbol => "symbol",
                Self::Bigint => "bigint",
            }
        }
    }

    impl AsRef<str> for ObjectPreviewTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ObjectPreviewTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "object" => Ok(Self::Object),
                "function" => Ok(Self::Function),
                "undefined" => Ok(Self::Undefined),
                "string" => Ok(Self::String),
                "number" => Ok(Self::Number),
                "boolean" => Ok(Self::Boolean),
                "symbol" => Ok(Self::Symbol),
                "bigint" => Ok(Self::Bigint),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ObjectPreviewTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum ObjectPreviewSubtypePropertyEnum {
        Array,
        Null,
        Node,
        Regexp,
        Date,
        Map,
        Set,
        Weakmap,
        Weakset,
        Iterator,
        Generator,
        Error,
        Proxy,
        Promise,
        Typedarray,
        Arraybuffer,
        Dataview,
        Webassemblymemory,
        Wasmvalue,
        Trustedtype,
    }

    impl ObjectPreviewSubtypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Array => "array",
                Self::Null => "null",
                Self::Node => "node",
                Self::Regexp => "regexp",
                Self::Date => "date",
                Self::Map => "map",
                Self::Set => "set",
                Self::Weakmap => "weakmap",
                Self::Weakset => "weakset",
                Self::Iterator => "iterator",
                Self::Generator => "generator",
                Self::Error => "error",
                Self::Proxy => "proxy",
                Self::Promise => "promise",
                Self::Typedarray => "typedarray",
                Self::Arraybuffer => "arraybuffer",
                Self::Dataview => "dataview",
                Self::Webassemblymemory => "webassemblymemory",
                Self::Wasmvalue => "wasmvalue",
                Self::Trustedtype => "trustedtype",
            }
        }
    }

    impl AsRef<str> for ObjectPreviewSubtypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for ObjectPreviewSubtypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "array" => Ok(Self::Array),
                "null" => Ok(Self::Null),
                "node" => Ok(Self::Node),
                "regexp" => Ok(Self::Regexp),
                "date" => Ok(Self::Date),
                "map" => Ok(Self::Map),
                "set" => Ok(Self::Set),
                "weakmap" => Ok(Self::Weakmap),
                "weakset" => Ok(Self::Weakset),
                "iterator" => Ok(Self::Iterator),
                "generator" => Ok(Self::Generator),
                "error" => Ok(Self::Error),
                "proxy" => Ok(Self::Proxy),
                "promise" => Ok(Self::Promise),
                "typedarray" => Ok(Self::Typedarray),
                "arraybuffer" => Ok(Self::Arraybuffer),
                "dataview" => Ok(Self::Dataview),
                "webassemblymemory" => Ok(Self::Webassemblymemory),
                "wasmvalue" => Ok(Self::Wasmvalue),
                "trustedtype" => Ok(Self::Trustedtype),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "ObjectPreviewSubtypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PropertyPreviewTypePropertyEnum {
        Object,
        Function,
        Undefined,
        String,
        Number,
        Boolean,
        Symbol,
        Accessor,
        Bigint,
    }

    impl PropertyPreviewTypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Object => "object",
                Self::Function => "function",
                Self::Undefined => "undefined",
                Self::String => "string",
                Self::Number => "number",
                Self::Boolean => "boolean",
                Self::Symbol => "symbol",
                Self::Accessor => "accessor",
                Self::Bigint => "bigint",
            }
        }
    }

    impl AsRef<str> for PropertyPreviewTypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PropertyPreviewTypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "object" => Ok(Self::Object),
                "function" => Ok(Self::Function),
                "undefined" => Ok(Self::Undefined),
                "string" => Ok(Self::String),
                "number" => Ok(Self::Number),
                "boolean" => Ok(Self::Boolean),
                "symbol" => Ok(Self::Symbol),
                "accessor" => Ok(Self::Accessor),
                "bigint" => Ok(Self::Bigint),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PropertyPreviewTypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    // Protocol enum
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
    pub enum PropertyPreviewSubtypePropertyEnum {
        Array,
        Null,
        Node,
        Regexp,
        Date,
        Map,
        Set,
        Weakmap,
        Weakset,
        Iterator,
        Generator,
        Error,
        Proxy,
        Promise,
        Typedarray,
        Arraybuffer,
        Dataview,
        Webassemblymemory,
        Wasmvalue,
        Trustedtype,
    }

    impl PropertyPreviewSubtypePropertyEnum {
        pub const fn as_str(self) -> &'static str {
            match self {
                Self::Array => "array",
                Self::Null => "null",
                Self::Node => "node",
                Self::Regexp => "regexp",
                Self::Date => "date",
                Self::Map => "map",
                Self::Set => "set",
                Self::Weakmap => "weakmap",
                Self::Weakset => "weakset",
                Self::Iterator => "iterator",
                Self::Generator => "generator",
                Self::Error => "error",
                Self::Proxy => "proxy",
                Self::Promise => "promise",
                Self::Typedarray => "typedarray",
                Self::Arraybuffer => "arraybuffer",
                Self::Dataview => "dataview",
                Self::Webassemblymemory => "webassemblymemory",
                Self::Wasmvalue => "wasmvalue",
                Self::Trustedtype => "trustedtype",
            }
        }
    }

    impl AsRef<str> for PropertyPreviewSubtypePropertyEnum {
        fn as_ref(&self) -> &str {
            self.as_str()
        }
    }

    impl TryFrom<&str> for PropertyPreviewSubtypePropertyEnum {
        type Error = crate::generated::UnknownEnumValue;

        fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
            match value {
                "array" => Ok(Self::Array),
                "null" => Ok(Self::Null),
                "node" => Ok(Self::Node),
                "regexp" => Ok(Self::Regexp),
                "date" => Ok(Self::Date),
                "map" => Ok(Self::Map),
                "set" => Ok(Self::Set),
                "weakmap" => Ok(Self::Weakmap),
                "weakset" => Ok(Self::Weakset),
                "iterator" => Ok(Self::Iterator),
                "generator" => Ok(Self::Generator),
                "error" => Ok(Self::Error),
                "proxy" => Ok(Self::Proxy),
                "promise" => Ok(Self::Promise),
                "typedarray" => Ok(Self::Typedarray),
                "arraybuffer" => Ok(Self::Arraybuffer),
                "dataview" => Ok(Self::Dataview),
                "webassemblymemory" => Ok(Self::Webassemblymemory),
                "wasmvalue" => Ok(Self::Wasmvalue),
                "trustedtype" => Ok(Self::Trustedtype),
                _ => Err(crate::generated::UnknownEnumValue {
                    enum_name: "PropertyPreviewSubtypePropertyEnum",
                    value: value.to_owned(),
                }),
            }
        }
    }
    pub type ScriptId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct SerializationOptions {
        pub serialization: crate::generated::runtime::SerializationOptionsSerializationPropertyEnum,
        pub max_depth: Option<i64>,
        pub additional_parameters: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct DeepSerializedValue {
        pub type_: crate::generated::runtime::DeepSerializedValueTypePropertyEnum,
        pub value: Option<crate::generated::JsonValue>,
        pub object_id: Option<String>,
        pub weak_local_object_reference: Option<i64>,
    }
    pub type RemoteObjectId = String;
    pub type UnserializableValue = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct RemoteObject {
        pub type_: crate::generated::runtime::RemoteObjectTypePropertyEnum,
        pub subtype: Option<crate::generated::runtime::RemoteObjectSubtypePropertyEnum>,
        pub class_name: Option<String>,
        pub value: Option<crate::generated::JsonValue>,
        pub unserializable_value: Option<crate::generated::runtime::UnserializableValue>,
        pub description: Option<String>,
        pub deep_serialized_value: Option<Box<crate::generated::runtime::DeepSerializedValue>>,
        pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
        pub preview: Option<Box<crate::generated::runtime::ObjectPreview>>,
        pub custom_preview: Option<Box<crate::generated::runtime::CustomPreview>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CustomPreview {
        pub header: String,
        pub body_getter_id: Option<crate::generated::runtime::RemoteObjectId>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ObjectPreview {
        pub type_: crate::generated::runtime::ObjectPreviewTypePropertyEnum,
        pub subtype: Option<crate::generated::runtime::ObjectPreviewSubtypePropertyEnum>,
        pub description: Option<String>,
        pub overflow: bool,
        pub properties: Vec<Box<crate::generated::runtime::PropertyPreview>>,
        pub entries: Option<Vec<Box<crate::generated::runtime::EntryPreview>>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PropertyPreview {
        pub name: String,
        pub type_: crate::generated::runtime::PropertyPreviewTypePropertyEnum,
        pub value: Option<String>,
        pub value_preview: Option<Box<crate::generated::runtime::ObjectPreview>>,
        pub subtype: Option<crate::generated::runtime::PropertyPreviewSubtypePropertyEnum>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct EntryPreview {
        pub key: Option<Box<crate::generated::runtime::ObjectPreview>>,
        pub value: Box<crate::generated::runtime::ObjectPreview>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PropertyDescriptor {
        pub name: String,
        pub value: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub writable: Option<bool>,
        pub get: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub set: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub configurable: bool,
        pub enumerable: bool,
        pub was_thrown: Option<bool>,
        pub is_own: Option<bool>,
        pub symbol: Option<Box<crate::generated::runtime::RemoteObject>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct InternalPropertyDescriptor {
        pub name: String,
        pub value: Option<Box<crate::generated::runtime::RemoteObject>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct PrivatePropertyDescriptor {
        pub name: String,
        pub value: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub get: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub set: Option<Box<crate::generated::runtime::RemoteObject>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct CallArgument {
        pub value: Option<crate::generated::JsonValue>,
        pub unserializable_value: Option<crate::generated::runtime::UnserializableValue>,
        pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
    }
    pub type ExecutionContextId = i64;
    #[derive(Clone, Debug, PartialEq)]
    pub struct ExecutionContextDescription {
        pub id: crate::generated::runtime::ExecutionContextId,
        pub origin: String,
        pub name: String,
        pub unique_id: String,
        pub aux_data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct ExceptionDetails {
        pub exception_id: i64,
        pub text: String,
        pub line_number: i64,
        pub column_number: i64,
        pub script_id: Option<crate::generated::runtime::ScriptId>,
        pub url: Option<String>,
        pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
        pub exception: Option<Box<crate::generated::runtime::RemoteObject>>,
        pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
        pub exception_meta_data: Option<std::collections::BTreeMap<String, crate::generated::JsonValue>>,
    }
    pub type Timestamp = f64;
    pub type TimeDelta = f64;
    #[derive(Clone, Debug, PartialEq)]
    pub struct CallFrame {
        pub function_name: String,
        pub script_id: crate::generated::runtime::ScriptId,
        pub url: String,
        pub line_number: i64,
        pub column_number: i64,
    }
    #[derive(Clone, Debug, PartialEq)]
    pub struct StackTrace {
        pub description: Option<String>,
        pub call_frames: Vec<Box<crate::generated::runtime::CallFrame>>,
        pub parent: Option<Box<crate::generated::runtime::StackTrace>>,
        pub parent_id: Option<Box<crate::generated::runtime::StackTraceId>>,
    }
    pub type UniqueDebuggerId = String;
    #[derive(Clone, Debug, PartialEq)]
    pub struct StackTraceId {
        pub id: String,
        pub debugger_id: Option<crate::generated::runtime::UniqueDebuggerId>,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct AwaitPromiseParams {
            pub promise_object_id: crate::generated::runtime::RemoteObjectId,
            pub return_by_value: Option<bool>,
            pub generate_preview: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AwaitPromiseResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CallFunctionOnParams {
            pub function_declaration: String,
            pub object_id: Option<crate::generated::runtime::RemoteObjectId>,
            pub arguments: Option<Vec<Box<crate::generated::runtime::CallArgument>>>,
            pub silent: Option<bool>,
            pub return_by_value: Option<bool>,
            pub generate_preview: Option<bool>,
            pub user_gesture: Option<bool>,
            pub await_promise: Option<bool>,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
            pub object_group: Option<String>,
            pub throw_on_side_effect: Option<bool>,
            pub unique_context_id: Option<String>,
            pub serialization_options: Option<Box<crate::generated::runtime::SerializationOptions>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CallFunctionOnResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CompileScriptParams {
            pub expression: String,
            pub source_url: String,
            pub persist_script: bool,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct CompileScriptResult {
            pub script_id: Option<crate::generated::runtime::ScriptId>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DisableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DiscardConsoleEntriesParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct DiscardConsoleEntriesResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EnableResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct EvaluateParams {
            pub expression: String,
            pub object_group: Option<String>,
            pub include_command_line_api: Option<bool>,
            pub silent: Option<bool>,
            pub context_id: Option<crate::generated::runtime::ExecutionContextId>,
            pub return_by_value: Option<bool>,
            pub generate_preview: Option<bool>,
            pub user_gesture: Option<bool>,
            pub await_promise: Option<bool>,
            pub throw_on_side_effect: Option<bool>,
            pub timeout: Option<crate::generated::runtime::TimeDelta>,
            pub disable_breaks: Option<bool>,
            pub repl_mode: Option<bool>,
            pub allow_unsafe_eval_blocked_by_csp: Option<bool>,
            pub unique_context_id: Option<String>,
            pub serialization_options: Option<Box<crate::generated::runtime::SerializationOptions>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct EvaluateResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetIsolateIdParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetIsolateIdResult {
            pub id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHeapUsageParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetHeapUsageResult {
            pub used_size: f64,
            pub total_size: f64,
            pub embedder_heap_used_size: f64,
            pub backing_storage_size: f64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPropertiesParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
            pub own_properties: Option<bool>,
            pub accessor_properties_only: Option<bool>,
            pub generate_preview: Option<bool>,
            pub non_indexed_properties_only: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetPropertiesResult {
            pub result: Vec<Box<crate::generated::runtime::PropertyDescriptor>>,
            pub internal_properties: Option<Vec<Box<crate::generated::runtime::InternalPropertyDescriptor>>>,
            pub private_properties: Option<Vec<Box<crate::generated::runtime::PrivatePropertyDescriptor>>>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GlobalLexicalScopeNamesParams {
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GlobalLexicalScopeNamesResult {
            pub names: Vec<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QueryObjectsParams {
            pub prototype_object_id: crate::generated::runtime::RemoteObjectId,
            pub object_group: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct QueryObjectsResult {
            pub objects: Box<crate::generated::runtime::RemoteObject>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseObjectParams {
            pub object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseObjectResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseObjectGroupParams {
            pub object_group: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ReleaseObjectGroupResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunIfWaitingForDebuggerParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunIfWaitingForDebuggerResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunScriptParams {
            pub script_id: crate::generated::runtime::ScriptId,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
            pub object_group: Option<String>,
            pub silent: Option<bool>,
            pub include_command_line_api: Option<bool>,
            pub return_by_value: Option<bool>,
            pub generate_preview: Option<bool>,
            pub await_promise: Option<bool>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RunScriptResult {
            pub result: Box<crate::generated::runtime::RemoteObject>,
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAsyncCallStackDepthParams {
            pub max_depth: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetAsyncCallStackDepthResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCustomObjectFormatterEnabledParams {
            pub enabled: bool,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetCustomObjectFormatterEnabledResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetMaxCallStackSizeToCaptureParams {
            pub size: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct SetMaxCallStackSizeToCaptureResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TerminateExecutionParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct TerminateExecutionResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddBindingParams {
            pub name: String,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
            pub execution_context_name: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct AddBindingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveBindingParams {
            pub name: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct RemoveBindingResult;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetExceptionDetailsParams {
            pub error_object_id: crate::generated::runtime::RemoteObjectId,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetExceptionDetailsResult {
            pub exception_details: Option<Box<crate::generated::runtime::ExceptionDetails>>,
        }
    }

    pub mod events {
        #[derive(Clone, Debug, PartialEq)]
        pub struct BindingCalledEvent {
            pub name: String,
            pub payload: String,
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
        }
        // Protocol enum
        #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
        pub enum ConsoleAPICalledTypeEventEnum {
            Log,
            Debug,
            Info,
            Error,
            Warning,
            Dir,
            Dirxml,
            Table,
            Trace,
            Clear,
            StartGroup,
            StartGroupCollapsed,
            EndGroup,
            Assert,
            Profile,
            ProfileEnd,
            Count,
            TimeEnd,
        }

        impl ConsoleAPICalledTypeEventEnum {
            pub const fn as_str(self) -> &'static str {
                match self {
                    Self::Log => "log",
                    Self::Debug => "debug",
                    Self::Info => "info",
                    Self::Error => "error",
                    Self::Warning => "warning",
                    Self::Dir => "dir",
                    Self::Dirxml => "dirxml",
                    Self::Table => "table",
                    Self::Trace => "trace",
                    Self::Clear => "clear",
                    Self::StartGroup => "startGroup",
                    Self::StartGroupCollapsed => "startGroupCollapsed",
                    Self::EndGroup => "endGroup",
                    Self::Assert => "assert",
                    Self::Profile => "profile",
                    Self::ProfileEnd => "profileEnd",
                    Self::Count => "count",
                    Self::TimeEnd => "timeEnd",
                }
            }
        }

        impl AsRef<str> for ConsoleAPICalledTypeEventEnum {
            fn as_ref(&self) -> &str {
                self.as_str()
            }
        }

        impl TryFrom<&str> for ConsoleAPICalledTypeEventEnum {
            type Error = crate::generated::UnknownEnumValue;

            fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {
                match value {
                    "log" => Ok(Self::Log),
                    "debug" => Ok(Self::Debug),
                    "info" => Ok(Self::Info),
                    "error" => Ok(Self::Error),
                    "warning" => Ok(Self::Warning),
                    "dir" => Ok(Self::Dir),
                    "dirxml" => Ok(Self::Dirxml),
                    "table" => Ok(Self::Table),
                    "trace" => Ok(Self::Trace),
                    "clear" => Ok(Self::Clear),
                    "startGroup" => Ok(Self::StartGroup),
                    "startGroupCollapsed" => Ok(Self::StartGroupCollapsed),
                    "endGroup" => Ok(Self::EndGroup),
                    "assert" => Ok(Self::Assert),
                    "profile" => Ok(Self::Profile),
                    "profileEnd" => Ok(Self::ProfileEnd),
                    "count" => Ok(Self::Count),
                    "timeEnd" => Ok(Self::TimeEnd),
                    _ => Err(crate::generated::UnknownEnumValue {
                        enum_name: "ConsoleAPICalledTypeEventEnum",
                        value: value.to_owned(),
                    }),
                }
            }
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ConsoleAPICalledEvent {
            pub type_: crate::generated::runtime::events::ConsoleAPICalledTypeEventEnum,
            pub args: Vec<Box<crate::generated::runtime::RemoteObject>>,
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
            pub timestamp: crate::generated::runtime::Timestamp,
            pub stack_trace: Option<Box<crate::generated::runtime::StackTrace>>,
            pub context: Option<String>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExceptionRevokedEvent {
            pub reason: String,
            pub exception_id: i64,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExceptionThrownEvent {
            pub timestamp: crate::generated::runtime::Timestamp,
            pub exception_details: Box<crate::generated::runtime::ExceptionDetails>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExecutionContextCreatedEvent {
            pub context: Box<crate::generated::runtime::ExecutionContextDescription>,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExecutionContextDestroyedEvent {
            pub execution_context_id: crate::generated::runtime::ExecutionContextId,
            pub execution_context_unique_id: String,
        }
        #[derive(Clone, Debug, PartialEq)]
        pub struct ExecutionContextsClearedEvent;
        #[derive(Clone, Debug, PartialEq)]
        pub struct InspectRequestedEvent {
            pub object: Box<crate::generated::runtime::RemoteObject>,
            pub hints: std::collections::BTreeMap<String, crate::generated::JsonValue>,
            pub execution_context_id: Option<crate::generated::runtime::ExecutionContextId>,
        }
    }
}

pub mod schema {
    #[derive(Clone, Debug, PartialEq)]
    pub struct Domain {
        pub name: String,
        pub version: String,
    }

    pub mod commands {
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDomainsParams;
        #[derive(Clone, Debug, PartialEq)]
        pub struct GetDomainsResult {
            pub domains: Vec<Box<crate::generated::schema::Domain>>,
        }
    }

    pub mod events {
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct CommandDescriptor {
    pub method: &'static str,
    pub has_params: bool,
    pub has_result: bool,
}

pub static COMMAND_DESCRIPTORS: &[CommandDescriptor] = &[
    CommandDescriptor { method: "Accessibility.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Accessibility.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Accessibility.getPartialAXTree", has_params: true, has_result: true },
    CommandDescriptor { method: "Accessibility.getFullAXTree", has_params: true, has_result: true },
    CommandDescriptor { method: "Accessibility.getRootAXNode", has_params: true, has_result: true },
    CommandDescriptor { method: "Accessibility.getAXNodeAndAncestors", has_params: true, has_result: true },
    CommandDescriptor { method: "Accessibility.getChildAXNodes", has_params: true, has_result: true },
    CommandDescriptor { method: "Accessibility.queryAXTree", has_params: true, has_result: true },
    CommandDescriptor { method: "Ads.getAdMetrics", has_params: false, has_result: true },
    CommandDescriptor { method: "Animation.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Animation.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Animation.getCurrentTime", has_params: true, has_result: true },
    CommandDescriptor { method: "Animation.getPlaybackRate", has_params: false, has_result: true },
    CommandDescriptor { method: "Animation.releaseAnimations", has_params: true, has_result: false },
    CommandDescriptor { method: "Animation.resolveAnimation", has_params: true, has_result: true },
    CommandDescriptor { method: "Animation.seekAnimations", has_params: true, has_result: false },
    CommandDescriptor { method: "Animation.setPaused", has_params: true, has_result: false },
    CommandDescriptor { method: "Animation.setPlaybackRate", has_params: true, has_result: false },
    CommandDescriptor { method: "Animation.setTiming", has_params: true, has_result: false },
    CommandDescriptor { method: "Audits.getEncodedResponse", has_params: true, has_result: true },
    CommandDescriptor { method: "Audits.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Audits.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Audits.checkFormsIssues", has_params: false, has_result: true },
    CommandDescriptor { method: "Autofill.trigger", has_params: true, has_result: false },
    CommandDescriptor { method: "Autofill.setAddresses", has_params: true, has_result: false },
    CommandDescriptor { method: "Autofill.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Autofill.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "BackgroundService.startObserving", has_params: true, has_result: false },
    CommandDescriptor { method: "BackgroundService.stopObserving", has_params: true, has_result: false },
    CommandDescriptor { method: "BackgroundService.setRecording", has_params: true, has_result: false },
    CommandDescriptor { method: "BackgroundService.clearEvents", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.setSimulatedCentralState", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulatePreconnectedPeripheral", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulateAdvertisement", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulateGATTOperationResponse", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulateCharacteristicOperationResponse", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulateDescriptorOperationResponse", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.addService", has_params: true, has_result: true },
    CommandDescriptor { method: "BluetoothEmulation.removeService", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.addCharacteristic", has_params: true, has_result: true },
    CommandDescriptor { method: "BluetoothEmulation.removeCharacteristic", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.addDescriptor", has_params: true, has_result: true },
    CommandDescriptor { method: "BluetoothEmulation.removeDescriptor", has_params: true, has_result: false },
    CommandDescriptor { method: "BluetoothEmulation.simulateGATTDisconnection", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.setPermission", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.grantPermissions", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.resetPermissions", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.setDownloadBehavior", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.cancelDownload", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.close", has_params: false, has_result: false },
    CommandDescriptor { method: "Browser.crash", has_params: false, has_result: false },
    CommandDescriptor { method: "Browser.crashGpuProcess", has_params: false, has_result: false },
    CommandDescriptor { method: "Browser.getVersion", has_params: false, has_result: true },
    CommandDescriptor { method: "Browser.getBrowserCommandLine", has_params: false, has_result: true },
    CommandDescriptor { method: "Browser.getHistograms", has_params: true, has_result: true },
    CommandDescriptor { method: "Browser.getHistogram", has_params: true, has_result: true },
    CommandDescriptor { method: "Browser.getWindowBounds", has_params: true, has_result: true },
    CommandDescriptor { method: "Browser.getWindowForTarget", has_params: true, has_result: true },
    CommandDescriptor { method: "Browser.setWindowBounds", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.setContentsSize", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.setDockTile", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.executeBrowserCommand", has_params: true, has_result: false },
    CommandDescriptor { method: "Browser.addPrivacySandboxEnrollmentOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.addRule", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.collectClassNames", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.createStyleSheet", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "CSS.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "CSS.forcePseudoState", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.forceStartingStyle", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.getBackgroundColors", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getComputedStyleForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.resolveValues", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getLonghandProperties", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getInlineStylesForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getAnimatedStylesForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getMatchedStylesForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getEnvironmentVariables", has_params: false, has_result: true },
    CommandDescriptor { method: "CSS.getMediaQueries", has_params: false, has_result: true },
    CommandDescriptor { method: "CSS.getPlatformFontsForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getStyleSheetText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getLayersForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.getLocationForSelector", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.trackComputedStyleUpdatesForNode", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.trackComputedStyleUpdates", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.takeComputedStyleUpdates", has_params: false, has_result: true },
    CommandDescriptor { method: "CSS.setEffectivePropertyValueForNode", has_params: true, has_result: false },
    CommandDescriptor { method: "CSS.setPropertyRulePropertyName", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setKeyframeKey", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setMediaText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setContainerQueryText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setContainerQueryConditionText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setSupportsText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setNavigationText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setScopeText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setRuleSelector", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setStyleSheetText", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.setStyleTexts", has_params: true, has_result: true },
    CommandDescriptor { method: "CSS.startRuleUsageTracking", has_params: false, has_result: false },
    CommandDescriptor { method: "CSS.stopRuleUsageTracking", has_params: false, has_result: true },
    CommandDescriptor { method: "CSS.takeCoverageDelta", has_params: false, has_result: true },
    CommandDescriptor { method: "CSS.setLocalFontsEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "CacheStorage.deleteCache", has_params: true, has_result: false },
    CommandDescriptor { method: "CacheStorage.deleteEntry", has_params: true, has_result: false },
    CommandDescriptor { method: "CacheStorage.requestCacheNames", has_params: true, has_result: true },
    CommandDescriptor { method: "CacheStorage.requestCachedResponse", has_params: true, has_result: true },
    CommandDescriptor { method: "CacheStorage.requestEntries", has_params: true, has_result: true },
    CommandDescriptor { method: "Cast.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Cast.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Cast.setSinkToUse", has_params: true, has_result: false },
    CommandDescriptor { method: "Cast.startDesktopMirroring", has_params: true, has_result: false },
    CommandDescriptor { method: "Cast.startTabMirroring", has_params: true, has_result: false },
    CommandDescriptor { method: "Cast.stopCasting", has_params: true, has_result: false },
    CommandDescriptor { method: "CrashReportContext.getEntries", has_params: false, has_result: true },
    CommandDescriptor { method: "DOM.collectClassNamesFromSubtree", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.copyTo", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.describeNode", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.scrollIntoViewIfNeeded", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.discardSearchResults", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.focus", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.getAttributes", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getBoxModel", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getContentQuads", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getDocument", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getFlattenedDocument", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getNodesForSubtreeByStyle", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getNodeForLocation", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getOuterHTML", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getRelayoutBoundary", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getSearchResults", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.hideHighlight", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.highlightNode", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.highlightRect", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.markUndoableState", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.moveTo", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.performSearch", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.pushNodeByPathToFrontend", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.pushNodesByBackendIdsToFrontend", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.querySelector", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.querySelectorAll", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getTopLayerElements", has_params: false, has_result: true },
    CommandDescriptor { method: "DOM.getElementByRelation", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.redo", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.removeAttribute", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.removeNode", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.requestChildNodes", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.requestNode", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.resolveNode", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.setAttributeValue", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.setAttributesAsText", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.setFileInputFiles", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.setNodeStackTracesEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.getNodeStackTraces", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getFileInfo", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getDetachedDomNodes", has_params: false, has_result: true },
    CommandDescriptor { method: "DOM.setInspectedNode", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.setNodeName", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.setNodeValue", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.setOuterHTML", has_params: true, has_result: false },
    CommandDescriptor { method: "DOM.undo", has_params: false, has_result: false },
    CommandDescriptor { method: "DOM.getFrameOwner", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getContainerForNode", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getQueryingDescendantsForContainer", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.getAnchorElement", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.forceShowPopover", has_params: true, has_result: true },
    CommandDescriptor { method: "DOM.forceShowInterest", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.getEventListeners", has_params: true, has_result: true },
    CommandDescriptor { method: "DOMDebugger.removeDOMBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.removeEventListenerBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.removeInstrumentationBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.removeXHRBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.setBreakOnCSPViolation", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.setDOMBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.setEventListenerBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.setInstrumentationBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMDebugger.setXHRBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMSnapshot.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "DOMSnapshot.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "DOMSnapshot.getSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "DOMSnapshot.captureSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "DOMStorage.clear", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMStorage.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "DOMStorage.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "DOMStorage.getDOMStorageItems", has_params: true, has_result: true },
    CommandDescriptor { method: "DOMStorage.removeDOMStorageItem", has_params: true, has_result: false },
    CommandDescriptor { method: "DOMStorage.setDOMStorageItem", has_params: true, has_result: false },
    CommandDescriptor { method: "DeviceAccess.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "DeviceAccess.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "DeviceAccess.selectPrompt", has_params: true, has_result: false },
    CommandDescriptor { method: "DeviceAccess.cancelPrompt", has_params: true, has_result: false },
    CommandDescriptor { method: "DeviceOrientation.clearDeviceOrientationOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "DeviceOrientation.setDeviceOrientationOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "DigitalCredentials.setVirtualWalletBehavior", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.canEmulate", has_params: false, has_result: true },
    CommandDescriptor { method: "Emulation.clearDeviceMetricsOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.clearGeolocationOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.resetPageScaleFactor", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.setFocusEmulationEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setAutoDarkModeOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setCPUThrottlingRate", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDefaultBackgroundColorOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setSafeAreaInsetsOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setVirtualKeyboardGeometryOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDeviceMetricsOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDevicePostureOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.clearDevicePostureOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.setDisplayFeaturesOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.clearDisplayFeaturesOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.setScrollbarsHidden", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDocumentCookieDisabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setEmitTouchEventsForMouse", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setEmulatedMedia", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setEmulatedVisionDeficiency", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setEmulatedOSTextScale", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setGeolocationOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.getOverriddenSensorInformation", has_params: true, has_result: true },
    CommandDescriptor { method: "Emulation.setSensorOverrideEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setSensorOverrideReadings", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setPressureSourceOverrideEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setPressureStateOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setIdleOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.clearIdleOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Emulation.setNavigatorOverrides", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setPageScaleFactor", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setScriptExecutionDisabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setTouchEmulationEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setVirtualTimePolicy", has_params: true, has_result: true },
    CommandDescriptor { method: "Emulation.setLocaleOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setTimezoneOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setVisibleSize", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDisabledImageTypes", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setDataSaverOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setHardwareConcurrencyOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setUserAgentOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setAutomationOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setSmallViewportHeightDifferenceOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.getScreenInfos", has_params: false, has_result: true },
    CommandDescriptor { method: "Emulation.addScreen", has_params: true, has_result: true },
    CommandDescriptor { method: "Emulation.updateScreen", has_params: true, has_result: true },
    CommandDescriptor { method: "Emulation.removeScreen", has_params: true, has_result: false },
    CommandDescriptor { method: "Emulation.setPrimaryScreen", has_params: true, has_result: false },
    CommandDescriptor { method: "EventBreakpoints.setInstrumentationBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "EventBreakpoints.removeInstrumentationBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "EventBreakpoints.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Extensions.triggerAction", has_params: true, has_result: false },
    CommandDescriptor { method: "Extensions.loadUnpacked", has_params: true, has_result: true },
    CommandDescriptor { method: "Extensions.getExtensions", has_params: false, has_result: true },
    CommandDescriptor { method: "Extensions.uninstall", has_params: true, has_result: false },
    CommandDescriptor { method: "Extensions.getStorageItems", has_params: true, has_result: true },
    CommandDescriptor { method: "Extensions.removeStorageItems", has_params: true, has_result: false },
    CommandDescriptor { method: "Extensions.clearStorageItems", has_params: true, has_result: false },
    CommandDescriptor { method: "Extensions.setStorageItems", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "FedCm.selectAccount", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.clickDialogButton", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.openUrl", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.dismissDialog", has_params: true, has_result: false },
    CommandDescriptor { method: "FedCm.resetCooldown", has_params: false, has_result: false },
    CommandDescriptor { method: "Fetch.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Fetch.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.failRequest", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.fulfillRequest", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.continueRequest", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.continueWithAuth", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.continueResponse", has_params: true, has_result: false },
    CommandDescriptor { method: "Fetch.getResponseBody", has_params: true, has_result: true },
    CommandDescriptor { method: "Fetch.takeResponseBodyAsStream", has_params: true, has_result: true },
    CommandDescriptor { method: "FileSystem.getDirectory", has_params: true, has_result: true },
    CommandDescriptor { method: "HeadlessExperimental.beginFrame", has_params: true, has_result: true },
    CommandDescriptor { method: "HeadlessExperimental.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "HeadlessExperimental.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "IO.close", has_params: true, has_result: false },
    CommandDescriptor { method: "IO.read", has_params: true, has_result: true },
    CommandDescriptor { method: "IO.resolveBlob", has_params: true, has_result: true },
    CommandDescriptor { method: "IndexedDB.clearObjectStore", has_params: true, has_result: false },
    CommandDescriptor { method: "IndexedDB.deleteDatabase", has_params: true, has_result: false },
    CommandDescriptor { method: "IndexedDB.deleteObjectStoreEntries", has_params: true, has_result: false },
    CommandDescriptor { method: "IndexedDB.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "IndexedDB.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "IndexedDB.requestData", has_params: true, has_result: true },
    CommandDescriptor { method: "IndexedDB.getMetadata", has_params: true, has_result: true },
    CommandDescriptor { method: "IndexedDB.requestDatabase", has_params: true, has_result: true },
    CommandDescriptor { method: "IndexedDB.requestDatabaseNames", has_params: true, has_result: true },
    CommandDescriptor { method: "Input.dispatchDragEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.dispatchKeyEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.insertText", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.imeSetComposition", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.dispatchMouseEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.dispatchTouchEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.cancelDragging", has_params: false, has_result: false },
    CommandDescriptor { method: "Input.emulateTouchFromMouseEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.setIgnoreInputEvents", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.setInterceptDrags", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.synthesizePinchGesture", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.synthesizeScrollGesture", has_params: true, has_result: false },
    CommandDescriptor { method: "Input.synthesizeTapGesture", has_params: true, has_result: false },
    CommandDescriptor { method: "Inspector.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Inspector.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "LayerTree.compositingReasons", has_params: true, has_result: true },
    CommandDescriptor { method: "LayerTree.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "LayerTree.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "LayerTree.loadSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "LayerTree.makeSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "LayerTree.profileSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "LayerTree.releaseSnapshot", has_params: true, has_result: false },
    CommandDescriptor { method: "LayerTree.replaySnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "LayerTree.snapshotCommandLog", has_params: true, has_result: true },
    CommandDescriptor { method: "Log.clear", has_params: false, has_result: false },
    CommandDescriptor { method: "Log.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Log.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Log.startViolationsReport", has_params: true, has_result: false },
    CommandDescriptor { method: "Log.stopViolationsReport", has_params: false, has_result: false },
    CommandDescriptor { method: "Media.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Media.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Memory.getDOMCounters", has_params: false, has_result: true },
    CommandDescriptor { method: "Memory.getDOMCountersForLeakDetection", has_params: false, has_result: true },
    CommandDescriptor { method: "Memory.prepareForLeakDetection", has_params: false, has_result: false },
    CommandDescriptor { method: "Memory.forciblyPurgeJavaScriptMemory", has_params: false, has_result: false },
    CommandDescriptor { method: "Memory.setPressureNotificationsSuppressed", has_params: true, has_result: false },
    CommandDescriptor { method: "Memory.simulatePressureNotification", has_params: true, has_result: false },
    CommandDescriptor { method: "Memory.startSampling", has_params: true, has_result: false },
    CommandDescriptor { method: "Memory.stopSampling", has_params: false, has_result: false },
    CommandDescriptor { method: "Memory.getAllTimeSamplingProfile", has_params: false, has_result: true },
    CommandDescriptor { method: "Memory.getBrowserSamplingProfile", has_params: false, has_result: true },
    CommandDescriptor { method: "Memory.getSamplingProfile", has_params: false, has_result: true },
    CommandDescriptor { method: "Network.canClearBrowserCache", has_params: false, has_result: true },
    CommandDescriptor { method: "Network.canClearBrowserCookies", has_params: false, has_result: true },
    CommandDescriptor { method: "Network.canEmulateNetworkConditions", has_params: false, has_result: true },
    CommandDescriptor { method: "Network.clearBrowserCache", has_params: false, has_result: false },
    CommandDescriptor { method: "Network.clearBrowserCookies", has_params: false, has_result: false },
    CommandDescriptor { method: "Network.deleteCookies", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Network.emulateNetworkConditions", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.emulateNetworkConditionsByRule", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.overrideNetworkState", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.configureDurableMessages", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.getAllCookies", has_params: false, has_result: true },
    CommandDescriptor { method: "Network.getCertificate", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.getCookies", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.getResponseBody", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.getRequestPostData", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.replayXHR", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.searchInResponseBody", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.setBlockedURLs", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setBypassServiceWorker", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setCacheDisabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setCookie", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.setCookies", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setExtraHTTPHeaders", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setAttachDebugStack", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.setUserAgentOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.streamResourceContent", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.getSecurityIsolationStatus", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.enableReportingApi", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.enableDeviceBoundSessions", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.deleteDeviceBoundSession", has_params: true, has_result: false },
    CommandDescriptor { method: "Network.fetchSchemefulSite", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.loadNetworkResource", has_params: true, has_result: true },
    CommandDescriptor { method: "Network.setCookieControls", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Overlay.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Overlay.getHighlightObjectForTest", has_params: true, has_result: true },
    CommandDescriptor { method: "Overlay.getGridHighlightObjectsForTest", has_params: true, has_result: true },
    CommandDescriptor { method: "Overlay.getSourceOrderHighlightObjectForTest", has_params: true, has_result: true },
    CommandDescriptor { method: "Overlay.hideHighlight", has_params: false, has_result: false },
    CommandDescriptor { method: "Overlay.highlightFrame", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.highlightNode", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.highlightQuad", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.highlightRect", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.highlightSourceOrder", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setInspectMode", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowAdHighlights", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setPausedInDebuggerMessage", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowDebugBorders", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowFPSCounter", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowGridOverlays", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowFlexOverlays", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowScrollSnapOverlays", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowContainerQueryOverlays", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowInspectedElementAnchor", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowPaintRects", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowLayoutShiftRegions", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowScrollBottleneckRects", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowHitTestBorders", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowWebVitals", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowViewportSizeOnResize", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowHinge", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowDisplayCutout", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowIsolatedElements", has_params: true, has_result: false },
    CommandDescriptor { method: "Overlay.setShowWindowControlsOverlay", has_params: true, has_result: false },
    CommandDescriptor { method: "PWA.getOsAppState", has_params: true, has_result: true },
    CommandDescriptor { method: "PWA.install", has_params: true, has_result: false },
    CommandDescriptor { method: "PWA.uninstall", has_params: true, has_result: false },
    CommandDescriptor { method: "PWA.launch", has_params: true, has_result: true },
    CommandDescriptor { method: "PWA.launchFilesInApp", has_params: true, has_result: true },
    CommandDescriptor { method: "PWA.openCurrentPageInApp", has_params: true, has_result: false },
    CommandDescriptor { method: "PWA.changeAppUserSettings", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.addScriptToEvaluateOnLoad", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.addScriptToEvaluateOnNewDocument", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.bringToFront", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.captureScreenshot", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.captureSnapshot", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.clearDeviceMetricsOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.clearDeviceOrientationOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.clearGeolocationOverride", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.createIsolatedWorld", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.deleteCookie", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.getAppManifest", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.getInstallabilityErrors", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.getManifestIcons", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.getAppId", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.getAdScriptAncestry", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.getFrameTree", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.getLayoutMetrics", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.getNavigationHistory", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.resetNavigationHistory", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.getResourceContent", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.getResourceTree", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.handleJavaScriptDialog", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.navigate", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.navigateToHistoryEntry", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.printToPDF", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.reload", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.removeScriptToEvaluateOnLoad", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.removeScriptToEvaluateOnNewDocument", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.screencastFrameAck", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.searchInResource", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.setAdBlockingEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setBypassCSP", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.getPermissionsPolicyState", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.getOriginTrials", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.setDeviceMetricsOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setDeviceOrientationOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setFontFamilies", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setFontSizes", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setDocumentContent", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setDownloadBehavior", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setGeolocationOverride", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setLifecycleEventsEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setTouchEmulationEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.startScreencast", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.startScreenRecording", has_params: true, has_result: true },
    CommandDescriptor { method: "Page.stopScreenRecording", has_params: false, has_result: true },
    CommandDescriptor { method: "Page.stopLoading", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.crash", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.close", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.setWebLifecycleState", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.stopScreencast", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.produceCompilationCache", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.addCompilationCache", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.clearCompilationCache", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.setSPCTransactionMode", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setRPHRegistrationMode", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.generateTestReport", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.waitForDebugger", has_params: false, has_result: false },
    CommandDescriptor { method: "Page.setInterceptFileChooserDialog", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.setPrerenderingAllowed", has_params: true, has_result: false },
    CommandDescriptor { method: "Page.getAnnotatedPageContent", has_params: true, has_result: true },
    CommandDescriptor { method: "Performance.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Performance.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Performance.setTimeDomain", has_params: true, has_result: false },
    CommandDescriptor { method: "Performance.getMetrics", has_params: false, has_result: true },
    CommandDescriptor { method: "PerformanceTimeline.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "Preload.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Preload.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Security.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Security.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Security.setIgnoreCertificateErrors", has_params: true, has_result: false },
    CommandDescriptor { method: "Security.handleCertificateError", has_params: true, has_result: false },
    CommandDescriptor { method: "Security.setOverrideCertificateErrors", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.deliverPushMessage", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "ServiceWorker.dispatchSyncEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.dispatchPeriodicSyncEvent", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "ServiceWorker.setForceUpdateOnPageLoad", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.skipWaiting", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.startWorker", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.stopAllWorkers", has_params: false, has_result: false },
    CommandDescriptor { method: "ServiceWorker.stopWorker", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.unregister", has_params: true, has_result: false },
    CommandDescriptor { method: "ServiceWorker.updateRegistration", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportEstablishContextResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportReleaseContextResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportListReadersResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportGetStatusChangeResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportBeginTransactionResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportPlainResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportConnectResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportDataResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportStatusResult", has_params: true, has_result: false },
    CommandDescriptor { method: "SmartCardEmulation.reportError", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.getStorageKeyForFrame", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.getStorageKey", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.clearDataForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.clearDataForStorageKey", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.getCookies", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.setCookies", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.clearCookies", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.getUsageAndQuota", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.overrideQuotaForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.trackCacheStorageForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.trackCacheStorageForStorageKey", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.trackIndexedDBForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.trackIndexedDBForStorageKey", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.untrackCacheStorageForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.untrackCacheStorageForStorageKey", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.untrackIndexedDBForOrigin", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.untrackIndexedDBForStorageKey", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.getTrustTokens", has_params: false, has_result: true },
    CommandDescriptor { method: "Storage.clearTrustTokens", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.getSharedStorageMetadata", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.getSharedStorageEntries", has_params: true, has_result: true },
    CommandDescriptor { method: "Storage.setSharedStorageEntry", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.deleteSharedStorageEntry", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.clearSharedStorageEntries", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.resetSharedStorageBudget", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.setSharedStorageTracking", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.setStorageBucketTracking", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.deleteStorageBucket", has_params: true, has_result: false },
    CommandDescriptor { method: "Storage.runBounceTrackingMitigations", has_params: false, has_result: true },
    CommandDescriptor { method: "Storage.getRelatedWebsiteSets", has_params: false, has_result: true },
    CommandDescriptor { method: "SystemInfo.getInfo", has_params: false, has_result: true },
    CommandDescriptor { method: "SystemInfo.getFeatureState", has_params: true, has_result: true },
    CommandDescriptor { method: "SystemInfo.getProcessInfo", has_params: false, has_result: true },
    CommandDescriptor { method: "Target.activateTarget", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.attachToTarget", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.attachToBrowserTarget", has_params: false, has_result: true },
    CommandDescriptor { method: "Target.closeTarget", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.exposeDevToolsProtocol", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.createBrowserContext", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.getBrowserContexts", has_params: false, has_result: true },
    CommandDescriptor { method: "Target.createTarget", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.detachFromTarget", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.disposeBrowserContext", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.getTargetInfo", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.getTargets", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.sendMessageToTarget", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.setAutoAttach", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.autoAttachRelated", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.setDiscoverTargets", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.setRemoteLocations", has_params: true, has_result: false },
    CommandDescriptor { method: "Target.getDevToolsTarget", has_params: true, has_result: true },
    CommandDescriptor { method: "Target.openDevTools", has_params: true, has_result: true },
    CommandDescriptor { method: "Tethering.bind", has_params: true, has_result: false },
    CommandDescriptor { method: "Tethering.unbind", has_params: true, has_result: false },
    CommandDescriptor { method: "Tracing.end", has_params: false, has_result: false },
    CommandDescriptor { method: "Tracing.getCategories", has_params: false, has_result: true },
    CommandDescriptor { method: "Tracing.getTrackEventDescriptor", has_params: false, has_result: true },
    CommandDescriptor { method: "Tracing.recordClockSyncMarker", has_params: true, has_result: false },
    CommandDescriptor { method: "Tracing.requestMemoryDump", has_params: true, has_result: true },
    CommandDescriptor { method: "Tracing.start", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAudio.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "WebAudio.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "WebAudio.getRealtimeData", has_params: true, has_result: true },
    CommandDescriptor { method: "WebAuthn.enable", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "WebAuthn.addVirtualAuthenticator", has_params: true, has_result: true },
    CommandDescriptor { method: "WebAuthn.setResponseOverrideBits", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.removeVirtualAuthenticator", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.addCredential", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.getCredential", has_params: true, has_result: true },
    CommandDescriptor { method: "WebAuthn.getCredentials", has_params: true, has_result: true },
    CommandDescriptor { method: "WebAuthn.removeCredential", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.clearCredentials", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.setUserVerified", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.setAutomaticPresenceSimulation", has_params: true, has_result: false },
    CommandDescriptor { method: "WebAuthn.setCredentialProperties", has_params: true, has_result: false },
    CommandDescriptor { method: "WebMCP.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "WebMCP.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "WebMCP.invokeTool", has_params: true, has_result: true },
    CommandDescriptor { method: "WebMCP.cancelInvocation", has_params: true, has_result: false },
    CommandDescriptor { method: "Console.clearMessages", has_params: false, has_result: false },
    CommandDescriptor { method: "Console.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Console.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Debugger.continueToLocation", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Debugger.enable", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.evaluateOnCallFrame", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.getPossibleBreakpoints", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.getScriptSource", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.disassembleWasmModule", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.nextWasmDisassemblyChunk", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.getWasmBytecode", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.getStackTrace", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.pause", has_params: false, has_result: false },
    CommandDescriptor { method: "Debugger.pauseOnAsyncCall", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.removeBreakpoint", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.restartFrame", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.resume", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.searchInContent", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setAsyncCallStackDepth", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setBlackboxExecutionContexts", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setBlackboxPatterns", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setBlackboxedRanges", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setBreakpoint", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setInstrumentationBreakpoint", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setBreakpointByUrl", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setBreakpointOnFunctionCall", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setBreakpointsActive", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setPauseOnExceptions", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setReturnValue", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setScriptSource", has_params: true, has_result: true },
    CommandDescriptor { method: "Debugger.setSkipAllPauses", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.setVariableValue", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.stepInto", has_params: true, has_result: false },
    CommandDescriptor { method: "Debugger.stepOut", has_params: false, has_result: false },
    CommandDescriptor { method: "Debugger.stepOver", has_params: true, has_result: false },
    CommandDescriptor { method: "HeapProfiler.addInspectedHeapObject", has_params: true, has_result: false },
    CommandDescriptor { method: "HeapProfiler.collectGarbage", has_params: false, has_result: false },
    CommandDescriptor { method: "HeapProfiler.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "HeapProfiler.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "HeapProfiler.getHeapObjectId", has_params: true, has_result: true },
    CommandDescriptor { method: "HeapProfiler.getObjectByHeapObjectId", has_params: true, has_result: true },
    CommandDescriptor { method: "HeapProfiler.getSamplingProfile", has_params: false, has_result: true },
    CommandDescriptor { method: "HeapProfiler.startSampling", has_params: true, has_result: false },
    CommandDescriptor { method: "HeapProfiler.startTrackingHeapObjects", has_params: true, has_result: false },
    CommandDescriptor { method: "HeapProfiler.stopSampling", has_params: false, has_result: true },
    CommandDescriptor { method: "HeapProfiler.stopTrackingHeapObjects", has_params: true, has_result: false },
    CommandDescriptor { method: "HeapProfiler.takeHeapSnapshot", has_params: true, has_result: false },
    CommandDescriptor { method: "Profiler.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Profiler.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Profiler.getBestEffortCoverage", has_params: false, has_result: true },
    CommandDescriptor { method: "Profiler.setSamplingInterval", has_params: true, has_result: false },
    CommandDescriptor { method: "Profiler.start", has_params: false, has_result: false },
    CommandDescriptor { method: "Profiler.startPreciseCoverage", has_params: true, has_result: true },
    CommandDescriptor { method: "Profiler.stop", has_params: false, has_result: true },
    CommandDescriptor { method: "Profiler.stopPreciseCoverage", has_params: false, has_result: false },
    CommandDescriptor { method: "Profiler.takePreciseCoverage", has_params: false, has_result: true },
    CommandDescriptor { method: "Runtime.awaitPromise", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.callFunctionOn", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.compileScript", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.disable", has_params: false, has_result: false },
    CommandDescriptor { method: "Runtime.discardConsoleEntries", has_params: false, has_result: false },
    CommandDescriptor { method: "Runtime.enable", has_params: false, has_result: false },
    CommandDescriptor { method: "Runtime.evaluate", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.getIsolateId", has_params: false, has_result: true },
    CommandDescriptor { method: "Runtime.getHeapUsage", has_params: false, has_result: true },
    CommandDescriptor { method: "Runtime.getProperties", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.globalLexicalScopeNames", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.queryObjects", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.releaseObject", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.releaseObjectGroup", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.runIfWaitingForDebugger", has_params: false, has_result: false },
    CommandDescriptor { method: "Runtime.runScript", has_params: true, has_result: true },
    CommandDescriptor { method: "Runtime.setAsyncCallStackDepth", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.setCustomObjectFormatterEnabled", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.setMaxCallStackSizeToCapture", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.terminateExecution", has_params: false, has_result: false },
    CommandDescriptor { method: "Runtime.addBinding", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.removeBinding", has_params: true, has_result: false },
    CommandDescriptor { method: "Runtime.getExceptionDetails", has_params: true, has_result: true },
    CommandDescriptor { method: "Schema.getDomains", has_params: false, has_result: true },
];

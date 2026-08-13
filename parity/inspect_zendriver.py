#!/usr/bin/env python3
"""Inspect the installed Zendriver package through its public runtime surface."""

from __future__ import annotations

import importlib
import inspect
import json
import re
import sys
from enum import Enum
from types import ModuleType
from typing import Any


CORE_MODULES = (
    "browser",
    "cloudflare",
    "config",
    "connection",
    "element",
    "expect",
    "intercept",
    "keys",
    "tab",
    "util",
)

BEHAVIOR_DUNDERS = {
    "__aenter__",
    "__aexit__",
    "__aiter__",
    "__anext__",
    "__await__",
    "__bool__",
    "__bytes__",
    "__call__",
    "__contains__",
    "__del__",
    "__enter__",
    "__eq__",
    "__exit__",
    "__format__",
    "__ge__",
    "__getattr__",
    "__getitem__",
    "__gt__",
    "__hash__",
    "__iter__",
    "__le__",
    "__len__",
    "__lt__",
    "__next__",
    "__repr__",
    "__reversed__",
    "__setattr__",
    "__setitem__",
    "__str__",
}


def stable_repr(value: Any) -> str:
    if value is inspect.Parameter.empty or value is inspect.Signature.empty:
        return ""
    if isinstance(value, ModuleType):
        return value.__name__
    rendered = repr(value)
    return re.sub(r"0x[0-9a-fA-F]+", "0x…", rendered)


def annotation_text(value: Any) -> str | None:
    if value is inspect.Parameter.empty or value is inspect.Signature.empty:
        return None
    if isinstance(value, str):
        return value
    return inspect.formatannotation(value)


def signature_data(value: Any) -> dict[str, Any] | None:
    try:
        signature = inspect.signature(value)
    except (TypeError, ValueError):
        return None
    return {
        "text": str(signature),
        "parameters": [
            {
                "name": parameter.name,
                "kind": parameter.kind.name,
                "annotation": annotation_text(parameter.annotation),
                "hasDefault": parameter.default is not inspect.Parameter.empty,
                "default": (
                    stable_repr(parameter.default)
                    if parameter.default is not inspect.Parameter.empty
                    else None
                ),
            }
            for parameter in signature.parameters.values()
        ],
        "returnAnnotation": annotation_text(signature.return_annotation),
    }


def first_doc_line(value: Any) -> str | None:
    doc = inspect.getdoc(value)
    return doc.splitlines()[0] if doc else None


def member_data(
    name: str,
    value: Any,
    annotations: dict[str, Any],
    owner: type[Any],
    origin: type[Any],
) -> dict[str, Any]:
    provenance = {
        "declaredOn": f"{origin.__module__}.{origin.__qualname__}",
        "inherited": origin is not owner,
    }
    if isinstance(value, property):
        annotation = annotations.get(name, inspect.Parameter.empty)
        if annotation is inspect.Parameter.empty and value.fget is not None:
            try:
                annotation = inspect.signature(value.fget).return_annotation
            except (TypeError, ValueError):
                pass
        return {
            "name": name,
            "kind": "property",
            "annotation": annotation_text(annotation),
            "doc": first_doc_line(value),
            **provenance,
        }
    if isinstance(value, (staticmethod, classmethod)):
        function = value.__func__
        return {
            "name": name,
            "kind": "staticmethod" if isinstance(value, staticmethod) else "classmethod",
            "signature": signature_data(function),
            "doc": first_doc_line(function),
            **provenance,
        }
    if inspect.isfunction(value) or inspect.ismethoddescriptor(value):
        return {
            "name": name,
            "kind": "method",
            "signature": signature_data(value),
            "doc": first_doc_line(value),
            **provenance,
        }
    if isinstance(value, Enum):
        return {
            "name": name,
            "kind": "enum-member",
            "value": stable_repr(value.value),
            **provenance,
        }
    return {
        "name": name,
        "kind": "attribute",
        "annotation": annotation_text(annotations.get(name, inspect.Parameter.empty)),
        "valueType": type(value).__name__,
        "default": stable_repr(value),
        **provenance,
    }


def class_data(name: str, value: type[Any]) -> dict[str, Any]:
    members = []
    seen_names: set[str] = set()
    public_mro = [origin for origin in value.__mro__ if origin is not object]
    for origin in public_mro:
        annotations = dict(getattr(origin, "__annotations__", {}))
        for member_name, member_value in origin.__dict__.items():
            if member_name in seen_names:
                continue
            if member_name.startswith("_") and member_name not in BEHAVIOR_DUNDERS:
                continue
            members.append(
                member_data(member_name, member_value, annotations, value, origin)
            )
            seen_names.add(member_name)
        for annotation_name, annotation in annotations.items():
            if not annotation_name.startswith("_") and annotation_name not in seen_names:
                members.append(
                    {
                        "name": annotation_name,
                        "kind": "annotated-attribute",
                        "annotation": annotation_text(annotation),
                        "declaredOn": f"{origin.__module__}.{origin.__qualname__}",
                        "inherited": origin is not value,
                    }
                )
                seen_names.add(annotation_name)
    bases = [
        f"{base.__module__}.{base.__qualname__}"
        for base in value.__bases__
        if base is not object
    ]
    return {
        "name": name,
        "kind": "exception" if issubclass(value, BaseException) else "class",
        "module": value.__module__,
        "bases": bases,
        "mro": [f"{origin.__module__}.{origin.__qualname__}" for origin in value.__mro__],
        "signature": signature_data(value),
        "doc": first_doc_line(value),
        "members": sorted(members, key=lambda item: item["name"]),
        "exceptionSemantics": (
            "UNKNOWN_UNTIL_EXECUTABLE_BEHAVIOR_CHECK"
            if issubclass(value, BaseException)
            else None
        ),
    }


def callable_data(name: str, value: Any) -> dict[str, Any]:
    return {
        "name": name,
        "kind": "function",
        "module": getattr(value, "__module__", None),
        "signature": signature_data(value),
        "doc": first_doc_line(value),
    }


def root_export(name: str, value: Any) -> dict[str, Any]:
    if inspect.isclass(value):
        kind = "class"
    elif callable(value):
        kind = "function"
    elif isinstance(value, ModuleType):
        kind = "module"
    else:
        kind = "value"
    result: dict[str, Any] = {
        "name": name,
        "kind": kind,
        "module": getattr(value, "__module__", getattr(value, "__name__", None)),
    }
    if inspect.isclass(value) or callable(value):
        result["signature"] = signature_data(value)
    return result


def main() -> None:
    import zendriver

    root = [
        root_export(name, getattr(zendriver, name))
        for name in sorted(dir(zendriver))
        if not name.startswith("_")
    ]

    modules = []
    for short_name in CORE_MODULES:
        module_name = f"zendriver.core.{short_name}"
        module = importlib.import_module(module_name)
        symbols = []
        for name, value in inspect.getmembers(module):
            if name.startswith("_") or getattr(value, "__module__", None) != module_name:
                continue
            if inspect.isclass(value):
                symbols.append(class_data(name, value))
            elif inspect.isfunction(value):
                symbols.append(callable_data(name, value))
        modules.append({"name": module_name, "symbols": symbols})

    json.dump(
        {
            "python": sys.version.split()[0],
            "zendriverVersion": getattr(zendriver, "__version__", None),
            "rootExports": root,
            "coreModules": modules,
        },
        sys.stdout,
        indent=2,
        sort_keys=True,
    )
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()

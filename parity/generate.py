#!/usr/bin/env python3
"""Generate and validate the Zendriver v0.15.5 parity baseline."""

from __future__ import annotations

import ast
import copy
import hashlib
import json
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


EXPECTED_COMMIT = "f0bd943853a35b9394289ba80027ca26c8bd4d16"
EXPECTED_TAG = "v0.15.5"
EXPECTED_VERSION = "0.15.5"
EXPECTED_TEST_COUNT = 101
EXPECTED_ROOT_EXPORT_COUNT = 16
EXPECTED_CORE_SYMBOL_COUNT = 45
EXPECTED_CORE_MEMBER_COUNT = 472
EXPECTED_CATEGORY_COUNTS = {"bot_detection": 2, "core": 81, "docs": 18}
EXPECTED_PARAMETERIZATION_COUNTS = {"<none>": 3, "headless0": 49, "headless1": 49}
EXPECTED_INVENTORY_FINGERPRINTS = {
    "coreMembers": "0c24b69ae84b1f3d982660b4646b9baf51c1e0cbd436f8b76f0de39de79caea9",
    "coreSymbols": "8c200eb1e8f7cd1432a466770b258c0dbc0a2838f4ee50ff72b01502a393cf2b",
    "referenceObservations": "05e6b97725477bb0c863627a1b4488eba6ec49b4c5e12848895600d9305a4557",
    "rootExports": "f1542412b091090c4b847006530bef971818316c7c406d67154818daa857cd5e",
    "testCases": "29b7154ec1e524a5222f85e3eeee4bb206091265ecd08015dbf54f204a7c665e",
    "testCategories": "37ca44131fd1e807e3992065648bec6c05e93a1ff22b8de52b89e1f862e7db1d",
    "testExternalDependencies": "61f541dfbe429283b3dc4abe176a25c194fe38db0444b9b9159fd61a9114b7f3",
    "testParameterization": "894a854a2c56e6917b385a84a4dbee3dd7c0ac2eea8b6ffc4fedfbb172cb2b54",
}
ROOT = Path(__file__).resolve().parent.parent
PARITY = ROOT / "parity"
UPSTREAM = ROOT / ".tmp" / "zendriver-upstream"
REFERENCE = ROOT / ".tmp" / "zendriver-ref"
NODE_TEST_MAPPINGS = PARITY / "node-test-mappings.json"
API_SEMANTIC_MAPPINGS = PARITY / "api-semantic-mappings.json"


def run(command: list[str], cwd: Path = ROOT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=cwd, text=True, capture_output=True, check=False)


def require_success(result: subprocess.CompletedProcess[str], label: str) -> str:
    if result.returncode != 0:
        raise RuntimeError(
            f"{label} failed with exit code {result.returncode}:\n{result.stdout}{result.stderr}"
        )
    return result.stdout


def write_json(name: str, value: Any) -> None:
    (PARITY / name).write_text(
        json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf8"
    )


def canonical_fingerprint(value: Any) -> str:
    payload = json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf8")).hexdigest()


def inventory_fingerprints(
    api_inventory: dict[str, Any],
    test_inventory: dict[str, Any],
    reference_observations: dict[str, Any],
) -> dict[str, str]:
    upstream = api_inventory["upstream"]
    root_contract = [
        {
            "name": item.get("name"),
            "kind": item.get("kind"),
            "module": item.get("module"),
            "signature": item.get("signature"),
        }
        for item in upstream["rootExports"]
    ]
    symbol_contract = []
    member_contract = []
    for module in upstream["coreModules"]:
        for symbol in module["symbols"]:
            symbol_contract.append(
                {
                    "module": module["name"],
                    "name": symbol.get("name"),
                    "kind": symbol.get("kind"),
                    "signature": symbol.get("signature"),
                    "bases": symbol.get("bases"),
                    "mro": symbol.get("mro"),
                    "exceptionSemantics": symbol.get("exceptionSemantics"),
                }
            )
            for member in symbol.get("members", []):
                member_contract.append(
                    {
                        "module": module["name"],
                        "symbol": symbol.get("name"),
                        "name": member.get("name"),
                        "kind": member.get("kind"),
                        "annotation": member.get("annotation"),
                        "default": member.get("default"),
                        "value": member.get("value"),
                        "signature": member.get("signature"),
                        "declaredOn": member.get("declaredOn"),
                        "inherited": member.get("inherited"),
                    }
                )
    cases = test_inventory["cases"]
    return {
        "rootExports": canonical_fingerprint(root_contract),
        "coreSymbols": canonical_fingerprint(symbol_contract),
        "coreMembers": canonical_fingerprint(member_contract),
        "testCases": canonical_fingerprint(
            [(case.get("id"), case.get("upstreamNodeId")) for case in cases]
        ),
        "testParameterization": canonical_fingerprint(
            [(case.get("id"), case.get("parameterization")) for case in cases]
        ),
        "testCategories": canonical_fingerprint(
            [(case.get("id"), case.get("category")) for case in cases]
        ),
        "testExternalDependencies": canonical_fingerprint(
            [(case.get("id"), case.get("externalDependencies")) for case in cases]
        ),
        "referenceObservations": canonical_fingerprint(reference_observations),
    }


def mutation_probes(
    api_inventory: dict[str, Any],
    test_inventory: dict[str, Any],
    reference_observations: dict[str, Any],
) -> dict[str, str]:
    baseline = inventory_fingerprints(
        api_inventory, test_inventory, reference_observations
    )
    scenarios: list[tuple[str, str, dict[str, Any], dict[str, Any]]] = []

    mutated_api = copy.deepcopy(api_inventory)
    mutated_api["upstream"]["rootExports"].pop()
    scenarios.append(("removedRootExport", "rootExports", mutated_api, test_inventory))

    mutated_api = copy.deepcopy(api_inventory)
    mutated_api["upstream"]["coreModules"][0]["symbols"].pop()
    scenarios.append(("removedCoreSymbol", "coreSymbols", mutated_api, test_inventory))

    mutated_api = copy.deepcopy(api_inventory)
    class_with_members = next(
        symbol
        for module in mutated_api["upstream"]["coreModules"]
        for symbol in module["symbols"]
        if symbol.get("members")
    )
    class_with_members["members"].pop()
    scenarios.append(("removedCoreMember", "coreMembers", mutated_api, test_inventory))

    mutated_tests = copy.deepcopy(test_inventory)
    mutated_tests["cases"][0]["parameterization"] = "corrupted"
    scenarios.append(
        ("corruptedParameterization", "testParameterization", api_inventory, mutated_tests)
    )

    mutated_tests = copy.deepcopy(test_inventory)
    mutated_tests["cases"][0]["category"] = "corrupted"
    scenarios.append(("corruptedCategory", "testCategories", api_inventory, mutated_tests))

    mutated_tests = copy.deepcopy(test_inventory)
    mutated_tests["cases"][0]["externalDependencies"].append(
        {"kind": "corrupted", "value": "corrupted"}
    )
    scenarios.append(
        (
            "corruptedExternalDependency",
            "testExternalDependencies",
            api_inventory,
            mutated_tests,
        )
    )

    results = {}
    for name, fingerprint_name, candidate_api, candidate_tests in scenarios:
        candidate = inventory_fingerprints(
            candidate_api, candidate_tests, reference_observations
        )
        results[name] = (
            "PASS"
            if candidate[fingerprint_name] != baseline[fingerprint_name]
            else "FAIL"
        )
    return results


def node_mapping_errors(cases: list[dict[str, Any]], mappings: dict[str, Any]) -> list[str]:
    errors = []
    inventory_ids = {case["id"] for case in cases}
    unknown_mapping_ids = sorted(set(mappings) - inventory_ids)
    if unknown_mapping_ids:
        errors.append(f"Node test mappings contain unknown IDs: {unknown_mapping_ids}")
    mapped_cases: dict[str, str] = {}
    for case_id, mapping in mappings.items():
        if set(mapping) != {"status", "case", "result", "note"}:
            errors.append(f"Node test mapping schema is invalid for {case_id}")
            continue
        if mapping["status"] != "MAPPED" or mapping["result"] != "PASS":
            continue
        case_name = mapping["case"]
        if not isinstance(case_name, str) or "::" not in case_name:
            errors.append(f"passing Node test mapping case is invalid for {case_id}")
            continue
        source_name, source_test_id = case_name.rsplit("::", 1)
        if source_test_id != case_id:
            errors.append(f"Node test mapping case ID does not match key for {case_id}")
        other_id = mapped_cases.get(case_name)
        if other_id is not None:
            errors.append(f"Node test mapping case is duplicated by {other_id} and {case_id}")
        mapped_cases[case_name] = case_id
        source_path = ROOT / source_name
        if not source_path.is_file():
            errors.append(f"Node test mapping source does not exist for {case_id}: {source_name}")
        elif case_id not in source_path.read_text(encoding="utf8"):
            errors.append(f"Node test mapping source does not contain {case_id}: {source_name}")
    return errors


def node_mapping_mutation_probes(cases: list[dict[str, Any]], mappings: dict[str, Any]) -> dict[str, str]:
    case_ids = list(mappings)
    first_id, second_id = case_ids[:2]
    duplicate = copy.deepcopy(mappings)
    duplicate[second_id]["case"] = duplicate[first_id]["case"]
    mismatched = copy.deepcopy(mappings)
    mismatched[first_id]["case"] = mismatched[first_id]["case"].rsplit("::", 1)[0] + f"::{second_id}"
    nonexistent = copy.deepcopy(mappings)
    nonexistent[first_id]["case"] = f"packages/api/test/does-not-exist.test.ts::{first_id}"
    return {
        "duplicateNodeCase": "PASS" if node_mapping_errors(cases, duplicate) else "FAIL",
        "mismatchedNodeCaseId": "PASS" if node_mapping_errors(cases, mismatched) else "FAIL",
        "nonexistentNodeCaseSource": "PASS" if node_mapping_errors(cases, nonexistent) else "FAIL",
    }


def git_value(*arguments: str) -> str:
    return require_success(
        run(["git", "-C", str(UPSTREAM), *arguments]), f"git {' '.join(arguments)}"
    ).strip()


def inspect_reference() -> dict[str, Any]:
    output = require_success(
        run([str(REFERENCE / "bin" / "python"), str(PARITY / "inspect_zendriver.py")]),
        "Zendriver runtime introspection",
    )
    return json.loads(output)


def inspect_nodriver() -> dict[str, Any]:
    output = require_success(
        run(["node", str(PARITY / "inspect_nodriver.mjs")]),
        "@nodriver/api runtime introspection",
    )
    return json.loads(output)


def collect_tests() -> tuple[subprocess.CompletedProcess[str], list[str], str]:
    command = [str(UPSTREAM / ".venv" / "bin" / "pytest"), "--collect-only", "-q", "tests"]
    result = run(command, UPSTREAM)
    require_success(result, "upstream pytest collection")
    node_ids = [line for line in result.stdout.splitlines() if line.startswith("tests/") and "::" in line]
    summary_lines = [line for line in result.stdout.splitlines() if re.fullmatch(r"\d+ tests? collected in .+", line)]
    if len(summary_lines) != 1:
        raise RuntimeError("Could not identify the exact pytest collection summary")
    return result, node_ids, summary_lines[0]


def function_node(source: str, function_name: str) -> ast.AsyncFunctionDef | ast.FunctionDef | None:
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if isinstance(node, (ast.AsyncFunctionDef, ast.FunctionDef)) and node.name == function_name:
            return node
    return None


def string_literals(node: ast.AST | None) -> list[str]:
    if node is None:
        return []
    return [
        child.value
        for child in ast.walk(node)
        if isinstance(child, ast.Constant) and isinstance(child.value, str)
    ]


def dependency_data(test_file: Path, function_name: str) -> dict[str, Any]:
    source = test_file.read_text(encoding="utf8")
    node = function_node(source, function_name)
    literals = string_literals(node)
    fixture_names: set[str] = set()
    hosts: set[str] = set()
    chrome = False

    if node is not None:
        argument_names = {argument.arg for argument in [*node.args.args, *node.args.kwonlyargs]}
        chrome = bool(argument_names & {"browser", "create_browser", "mock_start"})
        for child in ast.walk(node):
            if not isinstance(child, ast.Call):
                continue
            called_name = getattr(child.func, "id", None) or getattr(child.func, "attr", None)
            if called_name == "sample_file" and child.args:
                argument = child.args[0]
                if isinstance(argument, ast.Constant) and isinstance(argument.value, str):
                    fixture_names.add(f"tests/sample_data/{argument.value}")

    tutorial_paths = [literal for literal in literals if literal.endswith(".py") and literal.startswith("docs/")]
    for tutorial_path in tutorial_paths:
        resolved = UPSTREAM / tutorial_path
        if resolved.is_file():
            literals.extend(string_literals(ast.parse(resolved.read_text(encoding="utf8"))))

    for literal in literals:
        if not literal.startswith(("http://", "https://")):
            continue
        parsed = urlparse(literal)
        if parsed.scheme in {"http", "https"} and parsed.hostname:
            hosts.add(parsed.hostname)

    if "tests/sample_data/profile.html" in fixture_names:
        hosts.add("cdpdriver.github.io")

    dependencies = []
    if chrome:
        dependencies.append({"kind": "browser", "value": "local Chrome/Chromium"})
    dependencies.extend({"kind": "network-host", "value": host} for host in sorted(hosts))
    dependencies.extend({"kind": "repository-fixture", "value": fixture} for fixture in sorted(fixture_names))
    dependencies.extend({"kind": "tutorial-module", "value": path} for path in sorted(tutorial_paths))
    return {"externalDependencies": dependencies}


def snake_to_camel(name: str) -> str:
    head, *tail = name.split("_")
    return head + "".join(part[:1].upper() + part[1:] for part in tail)


def nodriver_indexes(
    inventory: dict[str, Any],
) -> tuple[dict[str, Any], dict[str, Any], dict[str, dict[str, list[dict[str, Any]]]]]:
    runtime = {item["name"]: item for item in inventory["runtimeExports"]}
    declared = inventory["declaredSymbols"]
    classes = {
        name: {
            member_name: [member for member in data["members"] if member["name"] == member_name]
            for member_name in {member["name"] for member in data["members"]}
        }
        for name, data in inventory["declaredClasses"].items()
    }
    return runtime, declared, classes


CLASS_ALIASES = {
    "BaseFetchInterception": "FetchInterception",
    "DownloadExpectation": "expectDownload",
    "RequestExpectation": "expectRequest",
    "ResponseExpectation": "expectResponse",
}

DUNDER_MEMBER_ALIASES = {
    "__iter__": "[Symbol.iterator]",
    "__aiter__": "[Symbol.asyncIterator]",
}


def compatible_symbol_kind(upstream_kind: str, node_kind: str) -> bool:
    if upstream_kind in {"class", "exception"}:
        return node_kind in {"class", "interface", "enum", "type", "const"}
    if upstream_kind == "function":
        return node_kind in {"function", "const"}
    return False


def member_signature_compatible(
    upstream_member: dict[str, Any], node_declaration: dict[str, Any]
) -> bool:
    if upstream_member["kind"] in {
        "property",
        "attribute",
        "annotated-attribute",
        "enum-member",
    }:
        return node_declaration["kind"] == "property"
    if upstream_member["kind"] in {"classmethod", "staticmethod"} and not node_declaration.get(
        "static", False
    ):
        return False
    if upstream_member["kind"] == "method" and node_declaration.get("static", False):
        return False
    upstream_signature = upstream_member.get("signature")
    if upstream_signature is None or node_declaration["kind"] != "method":
        return False
    upstream_parameters = [
        parameter
        for parameter in upstream_signature["parameters"]
        if parameter["name"] not in {"self", "cls"}
        and parameter["kind"] not in {"VAR_POSITIONAL", "VAR_KEYWORD"}
    ]
    upstream_required = sum(
        not parameter["hasDefault"] for parameter in upstream_parameters
    )
    node_parameters = [
        parameter
        for parameter in node_declaration.get("parameters", [])
        if not parameter["rest"]
    ]
    node_required = sum(
        not parameter["optional"] and not parameter["hasDeclaredDefault"]
        for parameter in node_parameters
    )
    return upstream_required == node_required


def map_symbol(
    name: str,
    upstream_kind: str,
    runtime: dict[str, Any],
    declared: dict[str, Any],
) -> dict[str, Any]:
    candidates = [name, snake_to_camel(name)]
    if name in CLASS_ALIASES:
        candidates.insert(0, CLASS_ALIASES[name])
    for candidate in candidates:
        declaration = declared.get(candidate)
        if declaration and compatible_symbol_kind(upstream_kind, declaration["kind"]):
            return {
                "status": "CANDIDATE",
                "nodeSymbol": candidate,
                "nodeKind": declaration["kind"],
                "runtimeExport": candidate in runtime,
                "evidence": "compatible TypeScript AST declaration",
                "signatureComparison": "UNVERIFIED",
                "semanticsVerified": False,
            }
        if declaration or candidate in runtime:
            return {
                "status": "UNKNOWN",
                "nodeSymbol": candidate,
                "nodeKind": declaration["kind"] if declaration else None,
                "runtimeExport": candidate in runtime,
                "evidence": "name exists but declaration kind is not a compatible structural match",
                "signatureComparison": "UNVERIFIED",
                "semanticsVerified": False,
            }
    return {
        "status": "MISSING",
        "nodeSymbol": None,
        "evidence": "no root runtime export or public TypeScript declaration with an equivalent name",
        "signatureComparison": "UNVERIFIED",
        "semanticsVerified": False,
    }


def add_api_mappings(upstream: dict[str, Any], nodriver: dict[str, Any]) -> dict[str, dict[str, int]]:
    runtime, declared, classes = nodriver_indexes(nodriver)
    root_counts: Counter[str] = Counter()
    symbol_counts: Counter[str] = Counter()
    member_counts: Counter[str] = Counter()
    for export in upstream["rootExports"]:
        export["nodeMapping"] = map_symbol(
            export["name"], export["kind"], runtime, declared
        )
        root_counts[export["nodeMapping"]["status"]] += 1

    for module in upstream["coreModules"]:
        for symbol in module["symbols"]:
            mapping = map_symbol(symbol["name"], symbol["kind"], runtime, declared)
            symbol["nodeMapping"] = mapping
            symbol_counts[mapping["status"]] += 1
            node_class = mapping["nodeSymbol"] if mapping["nodeSymbol"] in classes else None
            for member in symbol.get("members", []):
                candidates = [
                    DUNDER_MEMBER_ALIASES.get(member["name"]),
                    member["name"],
                    snake_to_camel(member["name"]),
                ]
                candidates = [candidate for candidate in candidates if candidate]
                expected_kind = (
                    "property"
                    if member["kind"]
                    in {"property", "attribute", "annotated-attribute", "enum-member"}
                    else "method"
                )
                matched = None
                node_declarations: list[dict[str, Any]] = []
                named_declarations: list[dict[str, Any]] = []
                named_candidate = None
                if node_class is not None:
                    for candidate in candidates:
                        declarations = classes[node_class].get(candidate, [])
                        compatible = [
                            declaration
                            for declaration in declarations
                            if declaration["kind"] == expected_kind
                        ]
                        if compatible and not named_declarations:
                            named_declarations = compatible
                            named_candidate = candidate
                        signature_compatible = [
                            declaration
                            for declaration in compatible
                            if member_signature_compatible(member, declaration)
                        ]
                        if signature_compatible:
                            matched = candidate
                            node_declarations = signature_compatible
                            break
                if matched is not None:
                    member_mapping = {
                        "status": "CANDIDATE",
                        "nodeMember": f"{node_class}.{matched}",
                        "nodeDeclarations": node_declarations,
                        "evidence": "compatible member kind in TypeScript AST declaration",
                        "signatureComparison": (
                            "PROPERTY_KIND_ONLY"
                            if expected_kind == "property"
                            else "COMPATIBLE_REQUIRED_ARITY"
                        ),
                        "semanticsVerified": False,
                    }
                elif named_declarations:
                    member_mapping = {
                        "status": "UNKNOWN",
                        "nodeMember": f"{node_class}.{named_candidate}",
                        "nodeDeclarations": named_declarations,
                        "evidence": "name and member kind match, but required arity differs",
                        "signatureComparison": "INCOMPATIBLE_REQUIRED_ARITY",
                        "semanticsVerified": False,
                    }
                elif node_class is None:
                    member_mapping = {
                        "status": "UNKNOWN",
                        "nodeMember": None,
                        "evidence": "no mechanically matched Node class; an equivalent may exist elsewhere",
                        "signatureComparison": "UNVERIFIED",
                        "semanticsVerified": False,
                    }
                else:
                    member_mapping = {
                        "status": "MISSING",
                        "nodeMember": None,
                        "evidence": f"no equivalent member name declared on {node_class}",
                        "signatureComparison": "UNVERIFIED",
                        "semanticsVerified": False,
                    }
                member["nodeMapping"] = member_mapping
                member_counts[member_mapping["status"]] += 1
    add_api_semantic_mappings(upstream)
    root_counts = Counter(item["nodeMapping"]["status"] for item in upstream["rootExports"])
    symbol_counts = Counter(
        symbol["nodeMapping"]["status"]
        for module in upstream["coreModules"]
        for symbol in module["symbols"]
    )
    member_counts = Counter(
        member["nodeMapping"]["status"]
        for module in upstream["coreModules"]
        for symbol in module["symbols"]
        for member in symbol.get("members", [])
    )
    total_counts = root_counts + symbol_counts + member_counts
    return {
        "rootExports": dict(sorted(root_counts.items())),
        "coreSymbols": dict(sorted(symbol_counts.items())),
        "coreMembers": dict(sorted(member_counts.items())),
        "total": dict(sorted(total_counts.items())),
    }


def add_api_semantic_mappings(upstream: dict[str, Any]) -> None:
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    targets: dict[str, dict[str, Any]] = {}
    for module in upstream["coreModules"]:
        for symbol in module["symbols"]:
            symbol_path = f"{module['name']}.{symbol['name']}"
            targets[symbol_path] = symbol
            for member in symbol.get("members", []):
                targets[f"{symbol_path}.{member['name']}"] = member
    for semantic in semantic_mappings:
        target = targets.get(semantic["upstream"])
        if target is None:
            raise RuntimeError(f"Unknown upstream semantic mapping: {semantic['upstream']}")
        target["nodeMapping"] = {
            **target["nodeMapping"],
            "status": "VERIFIED",
            "nodeMember": semantic["nodeMember"],
            "evidence": "independent passing Node parity cases",
            "evidenceTestIds": semantic["testIds"],
            "signatureComparison": target["nodeMapping"].get("signatureComparison", "UNVERIFIED"),
            "semanticsVerified": True,
        }


def build_test_inventory(node_ids: list[str]) -> dict[str, Any]:
    mappings = json.loads(NODE_TEST_MAPPINGS.read_text(encoding="utf8"))
    cases = []
    for index, node_id in enumerate(node_ids, start=1):
        file_name, function_with_parameter = node_id.split("::", 1)
        match = re.fullmatch(r"([^[]+)(?:\[(.*)\])?", function_with_parameter)
        if not match:
            raise RuntimeError(f"Unexpected pytest node ID: {node_id}")
        function_name, parameterization = match.groups()
        category = file_name.split("/")[1]
        case = {
            "id": f"ZDTEST-{index:04d}",
            "upstreamNodeId": node_id,
            "file": file_name,
            "category": category,
            "testFunction": function_name,
            "parameterization": parameterization,
            **dependency_data(UPSTREAM / file_name, function_name),
            "nodeParity": {
                "status": "UNMAPPED",
                "case": None,
                "result": "NOT_RUN",
                "note": "No independently expressed one-to-one Node parity case has been verified yet.",
            },
        }
        if case["id"] in mappings:
            case["nodeParity"] = mappings[case["id"]]
        cases.append(case)
    return {"schemaVersion": 1, "caseCount": len(cases), "cases": cases}


def validate(
    baseline: dict[str, Any],
    api_inventory: dict[str, Any],
    test_inventory: dict[str, Any],
    reference_observations: dict[str, Any],
) -> tuple[list[str], dict[str, str], dict[str, str]]:
    errors = []
    if baseline["upstream"]["commit"] != EXPECTED_COMMIT:
        errors.append("upstream commit does not match the fixed parity baseline")
    if baseline["upstream"]["tag"] != EXPECTED_TAG:
        errors.append("upstream tag does not match the fixed parity baseline")
    if baseline["upstream"]["zendriverVersion"] != EXPECTED_VERSION:
        errors.append("installed Zendriver version does not match the fixed parity baseline")
    cases = test_inventory["cases"]
    if baseline["pytestCollect"]["collected"] != len(cases):
        errors.append("pytest collection count and test inventory count differ")
    if len(cases) != EXPECTED_TEST_COUNT:
        errors.append(
            f"expected {EXPECTED_TEST_COUNT} collected cases at the fixed tag, got {len(cases)}"
        )
    if len({case["id"] for case in cases}) != len(cases):
        errors.append("test inventory stable IDs are not unique")
    if len({case["upstreamNodeId"] for case in cases}) != len(cases):
        errors.append("test inventory pytest node IDs are not unique")
    required_case_fields = {
        "id",
        "upstreamNodeId",
        "file",
        "category",
        "testFunction",
        "parameterization",
        "externalDependencies",
        "nodeParity",
    }
    if any(set(case) != required_case_fields for case in cases):
        errors.append("one or more test inventory records do not match the required schema")
    category_counts = Counter(case.get("category") for case in cases)
    if dict(sorted(category_counts.items())) != EXPECTED_CATEGORY_COUNTS:
        errors.append(
            f"test category counts changed: {dict(sorted(category_counts.items()))}"
        )
    parameterization_counts = Counter(
        case.get("parameterization") if case.get("parameterization") is not None else "<none>"
        for case in cases
    )
    if dict(sorted(parameterization_counts.items())) != EXPECTED_PARAMETERIZATION_COUNTS:
        errors.append(
            "test parameterization counts changed: "
            f"{dict(sorted(parameterization_counts.items()))}"
        )
    for case in cases:
        case_id = case.get("id", "<missing-id>")
        file_name = case.get("file")
        node_id = case.get("upstreamNodeId")
        if not isinstance(file_name, str) or len(file_name.split("/")) < 2:
            errors.append(f"file path is invalid for {case_id}")
            continue
        path_category = file_name.split("/")[1]
        if case.get("category") != path_category:
            errors.append(f"category does not match path for {case_id}")
        if not isinstance(node_id, str) or "::" not in node_id:
            errors.append(f"pytest node ID is invalid for {case_id}")
            continue
        suffix_match = re.fullmatch(r"[^[]+(?:\[(.*)\])?", node_id.split("::", 1)[1])
        expected_parameterization = suffix_match.group(1) if suffix_match else None
        if case.get("parameterization") != expected_parameterization:
            errors.append(f"parameterization does not match node ID for {case_id}")
        dependencies = case.get("externalDependencies")
        if not isinstance(dependencies, list) or any(
            not isinstance(dependency, dict)
            or set(dependency) != {"kind", "value"}
            for dependency in dependencies or []
        ):
            errors.append(f"external dependency schema is invalid for {case_id}")
    mappings = json.loads(NODE_TEST_MAPPINGS.read_text(encoding="utf8"))
    inventory_by_id = {case["id"]: case["nodeParity"] for case in cases}
    errors.extend(node_mapping_errors(cases, mappings))
    for case_id, mapping in mappings.items():
        if inventory_by_id.get(case_id) != mapping:
            errors.append(f"generated Node test mapping differs from overlay for {case_id}")
    mapping_probes = node_mapping_mutation_probes(cases, mappings)
    failed_mapping_probes = [name for name, status in mapping_probes.items() if status != "PASS"]
    if failed_mapping_probes:
        errors.append(f"Node test mapping mutation probes failed: {failed_mapping_probes}")
    if not api_inventory["upstream"]["rootExports"]:
        errors.append("Zendriver root API inventory is empty")
    if not api_inventory["upstream"]["coreModules"]:
        errors.append("Zendriver core API inventory is empty")
    root_names = [item.get("name") for item in api_inventory["upstream"]["rootExports"]]
    if len(root_names) != EXPECTED_ROOT_EXPORT_COUNT:
        errors.append(
            f"expected {EXPECTED_ROOT_EXPORT_COUNT} root exports, got {len(root_names)}"
        )
    if len(root_names) != len(set(root_names)):
        errors.append("Zendriver root export names are not unique")
    modules = api_inventory["upstream"]["coreModules"]
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    known_api_members = set(api_inventory["nodriver"]["declaredSymbols"])
    known_api_members.update(
        f"{class_name}.{member['name']}"
        for class_name, declared_class in api_inventory["nodriver"]["declaredClasses"].items()
        for member in declared_class["members"]
    )
    known_api_members.update(
        f"{class_name}.{member['name']}"
        for class_name, declared_class in api_inventory["nodriver"].get("declaredSupportingClasses", {}).items()
        for member in declared_class["members"]
    )
    upstream_targets: dict[str, dict[str, Any]] = {}
    for module in modules:
        for symbol in module["symbols"]:
            symbol_path = f"{module['name']}.{symbol['name']}"
            upstream_targets[symbol_path] = symbol
            for member in symbol.get("members", []):
                upstream_targets[f"{symbol_path}.{member['name']}"] = member
    if len({entry["upstream"] for entry in semantic_mappings}) != len(semantic_mappings):
        errors.append("API semantic mappings contain duplicate upstream targets")
    for entry in semantic_mappings:
        if set(entry) != {"upstream", "nodeMember", "testIds"}:
            errors.append(f"API semantic mapping schema is invalid: {entry}")
            continue
        target = upstream_targets.get(entry["upstream"])
        if target is None:
            errors.append(f"API semantic mapping has unknown upstream target: {entry['upstream']}")
            continue
        if entry["nodeMember"] not in known_api_members:
            errors.append(f"API semantic mapping has unknown Node API member: {entry['nodeMember']}")
        if not entry["testIds"]:
            errors.append(f"API semantic mapping has no evidence tests: {entry['upstream']}")
        for test_id in entry["testIds"]:
            parity = inventory_by_id.get(test_id)
            if parity is None or parity["status"] != "MAPPED" or parity["result"] != "PASS":
                errors.append(f"API semantic evidence is not a passing mapped test: {entry['upstream']} -> {test_id}")
        mapping = target["nodeMapping"]
        if not mapping.get("semanticsVerified") or mapping.get("status") != "VERIFIED":
            errors.append(f"API semantic target is not marked verified: {entry['upstream']}")
        if mapping.get("nodeMember") != entry["nodeMember"] or mapping.get("evidenceTestIds") != entry["testIds"]:
            errors.append(f"generated API semantic mapping differs from overlay: {entry['upstream']}")
    core_symbol_count = sum(len(module["symbols"]) for module in modules)
    core_member_count = sum(
        len(symbol.get("members", []))
        for module in modules
        for symbol in module["symbols"]
    )
    if core_symbol_count != EXPECTED_CORE_SYMBOL_COUNT:
        errors.append(
            f"expected {EXPECTED_CORE_SYMBOL_COUNT} core symbols, got {core_symbol_count}"
        )
    if core_member_count != EXPECTED_CORE_MEMBER_COUNT:
        errors.append(
            f"expected {EXPECTED_CORE_MEMBER_COUNT} core members, got {core_member_count}"
        )
    for module in modules:
        symbol_names = [symbol.get("name") for symbol in module["symbols"]]
        if len(symbol_names) != len(set(symbol_names)):
            errors.append(f"core symbols are not unique in {module['name']}")
        for symbol in module["symbols"]:
            member_names = [member.get("name") for member in symbol.get("members", [])]
            if len(member_names) != len(set(member_names)):
                errors.append(f"core members are not unique on {module['name']}.{symbol['name']}")

    symbol_index = {
        symbol.get("name"): symbol
        for module in modules
        for symbol in module["symbols"]
        if symbol.get("kind") in {"class", "exception"}
    }
    required_members = {
        "Tab": {"send", "add_handler", "remove_handlers", "aclose", "wait", "__await__"},
        "RequestExpectation": {"request", "response", "response_body", "reset", "__aenter__", "__aexit__"},
        "ResponseExpectation": {"request", "response", "response_body", "reset"},
        "Browser": {"__aenter__", "__aexit__", "__iter__", "__reversed__", "__next__"},
    }
    for class_name, required in required_members.items():
        symbol = symbol_index.get(class_name)
        if symbol is None:
            errors.append(f"required core class is missing: {class_name}")
            continue
        actual = {member.get("name") for member in symbol["members"]}
        missing = sorted(required - actual)
        if missing:
            errors.append(f"{class_name} is missing inherited/dunder members: {missing}")

    actual_mapping_counts = {
        "rootExports": dict(
            sorted(
                Counter(
                    item["nodeMapping"]["status"]
                    for item in api_inventory["upstream"]["rootExports"]
                ).items()
            )
        ),
        "coreSymbols": dict(
            sorted(
                Counter(
                    symbol["nodeMapping"]["status"]
                    for module in modules
                    for symbol in module["symbols"]
                ).items()
            )
        ),
        "coreMembers": dict(
            sorted(
                Counter(
                    member["nodeMapping"]["status"]
                    for module in modules
                    for symbol in module["symbols"]
                    for member in symbol.get("members", [])
                ).items()
            )
        ),
    }
    actual_mapping_counts["total"] = dict(
        sorted(
            (
                Counter(actual_mapping_counts["rootExports"])
                + Counter(actual_mapping_counts["coreSymbols"])
                + Counter(actual_mapping_counts["coreMembers"])
            ).items()
        )
    )
    if api_inventory["mappingCounts"] != actual_mapping_counts:
        errors.append("stored API mapping counts do not match item-level mappings")
    for module in modules:
        for symbol in module["symbols"]:
            for member in symbol.get("members", []):
                mapping = member["nodeMapping"]
                if mapping["status"] == "CANDIDATE":
                    declarations = mapping.get("nodeDeclarations")
                    if not declarations:
                        errors.append(
                            f"candidate mapping lacks parsed declarations: {module['name']}.{symbol['name']}.{member['name']}"
                        )

    node_browser_members = {
        member["name"]: member
        for member in api_inventory["nodriver"]["declaredClasses"]["Browser"]["members"]
    }
    get_parameters = node_browser_members.get("get", {}).get("parameters", [])
    if [parameter["name"] for parameter in get_parameters] != ["url", "options"]:
        errors.append("Browser.get declaration parameters were not parsed structurally")
    for method_name in ("newTab", "newWindow"):
        parsed = node_browser_members.get(method_name)
        if not parsed or parsed["kind"] != "method" or not parsed["declaration"].startswith(
            f"{method_name}("
        ):
            errors.append(f"Browser.{method_name} was not parsed as its real method declaration")

    fingerprints = inventory_fingerprints(
        api_inventory, test_inventory, reference_observations
    )
    for name, expected in EXPECTED_INVENTORY_FINGERPRINTS.items():
        if fingerprints.get(name) != expected:
            errors.append(
                f"{name} fingerprint mismatch: expected {expected}, got {fingerprints.get(name)}"
            )
    probes = mutation_probes(api_inventory, test_inventory, reference_observations)
    probes.update(mapping_probes)
    failed_probes = [name for name, status in probes.items() if status != "PASS"]
    if failed_probes:
        errors.append(f"mutation probes failed: {failed_probes}")
    return errors, fingerprints, probes


def validate_existing() -> None:
    baseline = json.loads((PARITY / "baseline.json").read_text(encoding="utf8"))
    api_inventory = json.loads((PARITY / "api-inventory.json").read_text(encoding="utf8"))
    test_inventory = json.loads((PARITY / "test-inventory.json").read_text(encoding="utf8"))
    reference_observations = json.loads(
        (PARITY / "reference-observations.json").read_text(encoding="utf8")
    )
    errors, fingerprints, probes = validate(
        baseline, api_inventory, test_inventory, reference_observations
    )
    print(f"Validation-only: {'PASS' if not errors else 'FAIL'}")
    print(f"Fingerprints: {json.dumps(fingerprints, sort_keys=True)}")
    print(f"Mutation probes: {json.dumps(probes, sort_keys=True)}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)


def report_markdown(
    baseline: dict[str, Any],
    api_counts: dict[str, dict[str, int]],
    test_inventory: dict[str, Any],
    reference_observations: dict[str, Any],
) -> str:
    categories = Counter(case["category"] for case in test_inventory["cases"])
    external_cases = sum(
        any(dep["kind"] == "network-host" for dep in case["externalDependencies"])
        for case in test_inventory["cases"]
    )
    unmapped_cases = sum(
        case["nodeParity"]["status"] == "UNMAPPED" for case in test_inventory["cases"]
    )
    not_run_cases = sum(
        case["nodeParity"]["result"] == "NOT_RUN" for case in test_inventory["cases"]
    )
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    lines = [
        "# Zendriver v0.15.5 Parity Gap Report",
        "",
        "This is an inventory baseline, not a parity completion claim.",
        "",
        "## Fixed baseline",
        "",
        f"- Tag: `{baseline['upstream']['tag']}`",
        f"- Commit: `{baseline['upstream']['commit']}`",
        f"- Installed reference: `{baseline['upstream']['zendriverVersion']}`",
        f"- Pytest collection: `{baseline['pytestCollect']['summary']}`",
        "",
        "## Current gaps",
        "",
        f"- Upstream parametrized cases: {test_inventory['caseCount']}",
        f"- Unmapped Node parity cases: {unmapped_cases}",
        f"- Not-run Node parity cases: {not_run_cases}",
        f"- Cases requiring a live network host: {external_cases}",
        f"- API mappings by structural status: {json.dumps(api_counts, sort_keys=True)}",
        f"- Semantically verified API mappings: {len(semantic_mappings)}",
        "",
        "## Reference environment observations",
        "",
        f"- Environment: `{reference_observations['environment']['browser']}`; platform `{reference_observations['environment']['platform']}`",
        "- Exact headless core reference: 41 passed, 1 failed in 265.01 seconds; process exit code 1.",
        "- The only failure was `test_visible_events[headless0]`: upstream expected 4 children after keyboard operations and observed 2 on Chromium 145.",
        "- This upstream environment failure remains a parity case; it is not counted as a nodriver pass or used to weaken the inventory.",
        "- Exact command and structured provenance are recorded in `reference-observations.json`.",
        "",
        "## Test categories",
        "",
        *[f"- `{name}`: {count}" for name, count in sorted(categories.items())],
        "",
        "## Interpretation",
        "",
        "`CANDIDATE` means only that a runtime export or public TypeScript declaration has an equivalent name. It does not claim compatible defaults, state changes, return values, or exceptions. `UNKNOWN`, `MISSING`, `UNMAPPED`, and `NOT_RUN` remain blocking gaps for PAR-001/PAR-002.",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    if sys.argv[1:] == ["--validate-only"]:
        validate_existing()
        return
    if sys.argv[1:]:
        raise SystemExit("Usage: parity/generate.py [--validate-only]")
    commit = git_value("rev-parse", "HEAD")
    tag = git_value("describe", "--tags", "--exact-match")
    upstream_api = inspect_reference()
    nodriver_api = inspect_nodriver()
    collect_result, node_ids, summary = collect_tests()
    reference_observations = json.loads(
        (PARITY / "reference-observations.json").read_text(encoding="utf8")
    )

    summary_count_match = re.match(r"(\d+) tests? collected", summary)
    if not summary_count_match:
        raise RuntimeError(f"Unexpected pytest summary: {summary}")
    collected_count = int(summary_count_match.group(1))
    stable_summary = f"{collected_count} tests collected"
    stable_stdout = "\n".join([*node_ids, "", stable_summary]) + "\n"

    baseline = {
        "schemaVersion": 1,
        "upstream": {
            "repository": ".tmp/zendriver-upstream",
            "tag": tag,
            "commit": commit,
            "zendriverVersion": upstream_api["zendriverVersion"],
            "referenceEnvironment": ".tmp/zendriver-ref",
        },
        "pytestCollect": {
            "command": ".tmp/zendriver-upstream/.venv/bin/pytest --collect-only -q tests",
            "workingDirectory": ".tmp/zendriver-upstream",
            "exitCode": collect_result.returncode,
            "collected": collected_count,
            "summary": stable_summary,
            "stdout": stable_stdout,
            "stderr": collect_result.stderr,
        },
    }
    test_inventory = build_test_inventory(node_ids)
    api_counts = add_api_mappings(upstream_api, nodriver_api)
    api_inventory = {
        "schemaVersion": 1,
        "scope": {
            "root": "all non-underscore zendriver runtime names",
            "core": "classes and functions declared by the ten core modules in the public MkDocs reference",
            "memberRule": "all non-underscore members across the full runtime MRO plus an explicit allowlist of behavior-bearing dunders; compiler/runtime metadata dunders are excluded",
            "semanticStatus": "structural candidates are not treated as verified parity",
            "behaviorSpecSources": [
                "installed Zendriver 0.15.5 public runtime metadata",
                "public docstrings exposed by runtime objects",
                ".tmp/zendriver-upstream/mkdocs.yml public core reference declarations",
                ".tmp/zendriver-upstream/docs public tutorials",
            ],
        },
        "mappingCounts": api_counts,
        "upstream": upstream_api,
        "nodriver": nodriver_api,
    }

    errors, fingerprints, probes = validate(
        baseline, api_inventory, test_inventory, reference_observations
    )
    validation = {
        "status": "PASS" if not errors else "FAIL",
        "errors": errors,
        "testCases": test_inventory["caseCount"],
        "unmappedTestCases": sum(
            case["nodeParity"]["status"] == "UNMAPPED" for case in test_inventory["cases"]
        ),
        "notRunTestCases": sum(
            case["nodeParity"]["result"] == "NOT_RUN" for case in test_inventory["cases"]
        ),
        "apiMappingCounts": api_counts,
        "semanticallyVerifiedApiMappings": len(
            json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
        ),
        "referenceObservationCount": len(reference_observations["observations"]),
        "fingerprints": fingerprints,
        "mutationProbes": probes,
    }

    write_json("baseline.json", baseline)
    write_json("test-inventory.json", test_inventory)
    write_json("api-inventory.json", api_inventory)
    write_json("validation.json", validation)
    (PARITY / "gap-report.md").write_text(
        report_markdown(baseline, api_counts, test_inventory, reference_observations),
        encoding="utf8",
    )

    print(f"Upstream: {tag} {commit}")
    print(f"Pytest: {stable_summary}")
    print(
        "Test mapping: "
        f"{validation['unmappedTestCases']} UNMAPPED, "
        f"{validation['notRunTestCases']} NOT_RUN"
    )
    semantic_count = len(json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8")))
    print(f"API mapping: {json.dumps(api_counts, sort_keys=True)}; {semantic_count} semantically verified")
    print(f"Validation: {validation['status']}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()

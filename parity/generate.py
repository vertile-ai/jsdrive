#!/usr/bin/env python3
"""Generate and validate the Zendriver v0.15.5 parity baseline."""

from __future__ import annotations

import ast
import copy
import hashlib
import json
import re
import shlex
import shutil
import subprocess
import sys
from collections import Counter
from functools import lru_cache
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any
from urllib.parse import urlparse


EXPECTED_COMMIT = "f0bd943853a35b9394289ba80027ca26c8bd4d16"
EXPECTED_TAG = "v0.15.5"
EXPECTED_VERSION = "0.15.5"
EXPECTED_TEST_COUNT = 101
EXPECTED_ROOT_EXPORT_COUNT = 16
EXPECTED_CORE_SYMBOL_COUNT = 45
EXPECTED_CORE_MEMBER_COUNT = 472
EXPECTED_API_MAPPING_COUNT = 533
API_SEMANTIC_DIMENSIONS = {"defaults", "errors", "return", "signature", "state"}
API_MAPPING_EVIDENCE = "execution-gated Node behavior evidence for the listed semantic dimensions"
API_SEMANTIC_STATUS = "VERIFIED claims only the explicitly listed semanticsCoverage dimensions backed by registered phase-aware execution-gated behavior evidence; structural candidates and unlisted dimensions are not verified parity"
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
TEST_CASE_INSPECTOR = PARITY / "inspect_test_cases.mjs"
TRANSPORT_MATRIX_HELPER = ROOT / "packages/api/test/support/transport-matrix.ts"
TRANSPORT_MATRIX_REPORT = PARITY / "transport-matrix-report.json"
TEST_CASE_TEXT_ONLY_FIXTURE = PARITY / "test-fixtures" / "zdtest-text-only.test.ts"
TEST_CASE_LOCAL_NOOP_FIXTURE = PARITY / "test-fixtures" / "zdtest-local-noop.test.ts"
TEST_CASE_MUTABLE_BINDING_FIXTURE = PARITY / "test-fixtures" / "zdtest-mutable-binding.test.ts"
TEST_CASE_ALIAS_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdtest-alias-mutation.test.ts"
TEST_CASE_DESTRUCTURING_ASSIGNMENT_FIXTURE = PARITY / "test-fixtures" / "zdtest-destructuring-assignment.test.ts"
TEST_CASE_DESTRUCTURED_ALIAS_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdtest-destructured-alias-mutation.test.ts"
TEST_CASE_FOR_OF_ALIAS_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdtest-for-of-alias-mutation.test.ts"
TEST_CASE_UNKNOWN_CALL_FIXTURE = PARITY / "test-fixtures" / "zdtest-unknown-call.test.ts"
TEST_CASE_HOOK_CALLBACK_FIXTURE = PARITY / "test-fixtures" / "zdtest-hook-callback.test.ts"
TEST_CASE_HOOK_FACTORY_FIXTURE = PARITY / "test-fixtures" / "zdtest-hook-factory.test.ts"
TEST_CASE_HOOK_EXTRA_ARGUMENT_FIXTURE = PARITY / "test-fixtures" / "zdtest-hook-extra-argument.test.ts"
TEST_CASE_IMPURE_SKIP_REASON_FIXTURE = PARITY / "test-fixtures" / "zdtest-impure-skip-reason.test.ts"
TEST_CASE_SHADOWED_TEST_FIXTURE = PARITY / "test-fixtures" / "zdtest-shadowed-test.test.ts"
TEST_CASE_UNRESOLVED_TITLE_FIXTURE = PARITY / "test-fixtures" / "zdtest-unresolved-title.test.ts"
TEST_CASE_TYPE_ONLY_IMPORT_FIXTURE = PARITY / "test-fixtures" / "zdtest-type-only-import.test.ts"
TEST_CASE_ALL_SOURCES_FIXTURE = PARITY / "test-fixtures" / "all-test-sources"
TRANSPORT_UNAWAITED_MATRIX_FIXTURE = PARITY / "test-fixtures" / "zdtest-transport-unawaited.test.ts"
TRANSPORT_MATRIX_SHADOW_FIXTURE = PARITY / "test-fixtures" / "zdtest-transport-matrix-shadow.test.ts"
TRANSPORT_EXCLUSION_SHADOW_FIXTURE = PARITY / "test-fixtures" / "zdtest-transport-exclusion-shadow.test.ts"
TRANSPORT_WRONG_CASE_ID_FIXTURE = PARITY / "test-fixtures" / "zdtest-transport-wrong-id.test.ts"
API_PERMANENT_SKIP_FIXTURE = PARITY / "test-fixtures" / "zdapi-permanent-skip.test.ts"
TEST_ID_PERMANENT_SKIP_FIXTURE = PARITY / "test-fixtures" / "zdtest-permanent-skip.test.ts"
API_UNKNOWN_SHORTHAND_SKIP_FIXTURE = PARITY / "test-fixtures" / "zdapi-unknown-shorthand-skip.test.ts"
API_COMPUTED_SKIP_FIXTURE = PARITY / "test-fixtures" / "zdapi-computed-skip.test.ts"
API_SPREAD_OPTIONS_FIXTURE = PARITY / "test-fixtures" / "zdapi-spread-options.test.ts"
API_GENERIC_UNKNOWN_OPTIONS_FIXTURE = PARITY / "test-fixtures" / "zdapi-generic-unknown-options.test.ts"
API_MUTATED_OPTIONS_FIXTURE = PARITY / "test-fixtures" / "zdapi-mutated-options.test.ts"
API_ALIAS_MUTATED_OPTIONS_FIXTURE = PARITY / "test-fixtures" / "zdapi-alias-mutated-options.test.ts"
API_MUTATED_PHASE_FIXTURE = PARITY / "test-fixtures" / "zdapi-mutated-phase.test.ts"
API_TODO_OPTIONS_FIXTURE = PARITY / "test-fixtures" / "zdapi-todo-options.test.ts"
API_IF_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdapi-if-mutation.test.ts"
API_WRAPPED_CALL_FIXTURE = PARITY / "test-fixtures" / "zdapi-wrapped-call.test.ts"
API_UNSUPPORTED_STATEMENT_FIXTURE = PARITY / "test-fixtures" / "zdapi-unsupported-statement.test.ts"
API_NESTED_LOOP_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdapi-nested-loop-mutation.test.ts"
API_NESTED_PHASE_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdapi-nested-phase-mutation.test.ts"
API_UNKNOWN_CONST_INITIALIZER_FIXTURE = PARITY / "test-fixtures" / "zdapi-unknown-const-initializer.test.ts"
API_POST_EVIDENCE_LOOP_SOURCE = ROOT / "packages/api/test/element-api-parity.test.ts"
API_POST_EVIDENCE_CALL_FIXTURE = PARITY / "test-fixtures" / "zdapi-post-evidence-call.test.ts"
API_POST_EVIDENCE_DUPLICATE_FIXTURE = PARITY / "test-fixtures" / "zdapi-post-evidence-duplicate.test.ts"
API_SPLIT_TEMPLATE_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdapi-split-template-mutation.test.ts"
API_SPLIT_TEMPLATE_PHASE_FIXTURE = PARITY / "test-fixtures" / "zdapi-split-template-phase.test.ts"
API_FAKE_JSON_IMPORT_FIXTURE = PARITY / "test-fixtures" / "zdapi-fake-json-import.test.ts"
API_FAKE_STRING_IMPORT_FIXTURE = PARITY / "test-fixtures" / "zdapi-fake-string-import.test.ts"
API_ITERABLE_EXIT_FIXTURE = PARITY / "test-fixtures" / "zdapi-iterable-exit.test.ts"
API_ITERABLE_MUTATION_FIXTURE = PARITY / "test-fixtures" / "zdapi-iterable-mutation.test.ts"
API_POST_EVIDENCE_LOOP_EXIT_FIXTURE = PARITY / "test-fixtures" / "zdapi-post-loop-exit.test.ts"
API_POST_EVIDENCE_LOOP_DUPLICATE_FIXTURE = PARITY / "test-fixtures" / "zdapi-post-loop-duplicate.test.ts"
NODE_TEST_ID_PATTERN = re.compile(r"^(ZDTEST-\d{4})(?:\s|$)")
EXPECTED_TRANSPORT_QUADRANTS = [
    {"backend": "js", "connectionMode": "direct"},
    {"backend": "js", "connectionMode": "flattened"},
    {"backend": "native", "connectionMode": "direct"},
    {"backend": "native", "connectionMode": "flattened"},
]
EXPECTED_TRANSPORT_BACKEND_FACTORIES = {
    "js": "@vertile-ai/jsdriver-runtime-js#CdpConnection",
    "native": "@vertile-ai/jsdriver-runtime-native#NativeConnection",
}
EXPECTED_TRANSPORT_HELPER_MODULE_FINGERPRINT = "0ec2e94444bf734632554d2e0e7ffab9ef47f70d6817d7813daca73adafaeee1"
EXPECTED_TRANSPORT_HELPER_BODY_FINGERPRINT = "de0719bd2c7cc93d30c7e92e7322144579b7c8314cd3ebfc678e5c5d90b7b737"
EXPECTED_TRANSPORT_CALLBACK_COUNT = 99
EXPECTED_TRANSPORT_CALLBACK_FINGERPRINT = "5255a27ba9b23e10c0da0a0d3fd99325adf5c2a367e792d3209249b1486a8456"
EXPECTED_TRANSPORT_NON_APPLICABLE = {
    "ZDTEST-0003": {
        "code": "controlled-backend-failure",
        "detail": "The assertion injects one intentionally failing backend, so substituting transport quadrants would change the behavior under test.",
    },
    "ZDTEST-0020": {
        "code": "managed-process-isolation",
        "detail": "The assertion covers serial Chrome process, port, and profile isolation; transport routing is not part of its observable result.",
    },
}
EVIDENCE_EXECUTION_GATES = (
    (
        "root:test:runtime-js",
        "root",
        "test",
        "packages/runtime-js/package.json",
        "test",
    ),
    ("root:test:api", "root", "test", "packages/api/package.json", "test"),
    (
        "root:test:parity:headless",
        "headless",
        "test:parity:headless",
        "packages/api/package.json",
        "test:parity:headless",
    ),
    (
        "api:test:parity:headful",
        "headful",
        None,
        "packages/api/package.json",
        "test:parity:headful",
    ),
)


def run(command: list[str], cwd: Path = ROOT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=cwd, text=True, capture_output=True, check=False)


def require_success(result: subprocess.CompletedProcess[str], label: str) -> str:
    if result.returncode != 0:
        raise RuntimeError(
            f"{label} failed with exit code {result.returncode}:\n{result.stdout}{result.stderr}"
        )
    return result.stdout


def write_json(name: str, value: Any) -> None:
    (PARITY / name).write_text(canonical_json_text(value), encoding="utf8")


def canonical_json_text(value: Any) -> str:
    return json.dumps(value, indent=2, sort_keys=True) + "\n"


def canonical_fingerprint(value: Any) -> str:
    payload = json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return hashlib.sha256(payload.encode("utf8")).hexdigest()


@lru_cache(maxsize=None)
def typescript_test_registrations(source_path: Path) -> list[dict[str, Any]]:
    result = run(["node", str(TEST_CASE_INSPECTOR), str(source_path), "--details"])
    return json.loads(require_success(result, f"inspect test cases in {source_path}"))


@lru_cache(maxsize=None)
def typescript_test_titles(source_path: Path) -> list[str]:
    return [registration["title"] for registration in typescript_test_registrations(source_path)]


@lru_cache(maxsize=None)
def typescript_test_source_rejected(source_path: Path) -> bool:
    return run(["node", str(TEST_CASE_INSPECTOR), str(source_path)]).returncode != 0


def inspect_transport_helper(source_path: Path) -> dict[str, Any]:
    result = run(
        [
            "node",
            str(TEST_CASE_INSPECTOR),
            "--transport-helper",
            str(source_path),
        ]
    )
    return json.loads(require_success(result, "inspect transport matrix helper"))


@lru_cache(maxsize=None)
def transport_helper_spec() -> dict[str, Any]:
    return inspect_transport_helper(TRANSPORT_MATRIX_HELPER)


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


def node_test_id(title: str) -> str | None:
    match = NODE_TEST_ID_PATTERN.match(title)
    return match.group(1) if match else None


def node_test_titles_by_source(root: Path = ROOT) -> dict[str, list[str]]:
    excluded_directories = {"dist", "generated", "node_modules"}
    sources = sorted(
        path
        for path in root.glob("packages/*/test/**/*.test.ts")
        if not excluded_directories.intersection(path.relative_to(root).parts)
    )
    return {
        path.relative_to(root).as_posix(): typescript_test_titles(path)
        for path in sources
    }


def node_test_registrations_by_source(
    root: Path = ROOT,
) -> dict[str, list[dict[str, Any]]]:
    excluded_directories = {"dist", "generated", "node_modules"}
    sources = sorted(
        path
        for path in root.glob("packages/*/test/**/*.test.ts")
        if not excluded_directories.intersection(path.relative_to(root).parts)
    )
    return {
        path.relative_to(root).as_posix(): typescript_test_registrations(path)
        for path in sources
    }


def node_test_registration_phases_by_source(
    root: Path = ROOT,
) -> dict[str, dict[str, list[str | None]]]:
    excluded_directories = {"dist", "generated", "node_modules"}
    sources = sorted(
        path
        for path in root.glob("packages/*/test/**/*.test.ts")
        if not excluded_directories.intersection(path.relative_to(root).parts)
    )
    return {
        path.relative_to(root).as_posix(): {
            title: [
                registration["phase"]
                for registration in typescript_test_registrations(path)
                if registration["title"] == title
            ]
            for title in typescript_test_titles(path)
        }
        for path in sources
    }


def bounded_script_commands(script: Any, label: str) -> tuple[list[list[str]], list[str]]:
    if not isinstance(script, str) or not script.strip():
        return [], [f"API evidence execution script is missing: {label}"]
    forbidden_fragments = ("#", ";", "||", "\n", "\r", "`", "$(", "${", "\\", "<", ">")
    if any(fragment in script for fragment in forbidden_fragments):
        return [], [f"API evidence execution script uses unsupported shell syntax: {label}"]
    without_chains = script.replace("&&", "")
    if "&" in without_chains or "|" in without_chains:
        return [], [f"API evidence execution script uses unsupported shell syntax: {label}"]

    commands = []
    for command in script.split("&&"):
        if not command.strip():
            return [], [f"API evidence execution script has an empty command: {label}"]
        try:
            arguments = shlex.split(command, posix=True)
        except ValueError:
            return [], [f"API evidence execution script cannot be parsed: {label}"]
        if any(
            argument in {"if", "then", "else", "elif", "fi", "for", "while", "until", "case", "esac", "do", "done", "!"}
            for argument in arguments
        ):
            return [], [f"API evidence execution script uses control flow: {label}"]
        commands.append(arguments)
    return commands, []


def root_execution_commands(script: Any, label: str) -> tuple[list[list[str]], list[str]]:
    commands, errors = bounded_script_commands(script, label)
    if errors:
        return [], errors
    for arguments in commands:
        is_workspace_run = (
            len(arguments) == 4
            and arguments[:2] == ["npm", "run"]
            and arguments[2]
            and arguments[3].startswith("--workspace=")
            and len(arguments[3]) > len("--workspace=")
        )
        is_inventory_validation = arguments == [
            "python3",
            "parity/generate.py",
            "--validate-only",
        ]
        if not is_workspace_run and not is_inventory_validation:
            return [], [f"API evidence root script has an unsupported command: {label}"]
    return commands, []


def workspace_execution_sources(
    script: Any, label: str, package_directory: Path, phase: str
) -> tuple[set[str], list[str]]:
    commands, errors = bounded_script_commands(script, label)
    if errors:
        return set(), errors
    compiled_sources = []
    for arguments in commands:
        if arguments == ["tsc", "-p", "tsconfig.test.json"]:
            continue
        if not arguments or arguments[0] != "node":
            return set(), [f"API evidence workspace script has an unsupported command: {label}"]
        if len(arguments) >= 2 and arguments[1] == "--test":
            test_arguments = arguments[2:]
            if "--headful" in test_arguments or "--expect-failure" in test_arguments:
                return set(), [f"API evidence workspace script has invalid runner flags: {label}"]
            if test_arguments[:1] == ["--test-concurrency=1"]:
                test_arguments = test_arguments[1:]
        elif len(arguments) >= 2 and arguments[1] in {
            "dist-test/test/support/run-persistent-tests.js",
            "dist-test/test/support/run-exclusive-tests.js",
        }:
            test_arguments = arguments[2:]
            if "--expect-failure" in test_arguments:
                return set(), [f"API evidence workspace script has invalid runner flags: {label}"]
            if phase == "headful":
                if test_arguments.count("--headful") != 1 or test_arguments[:1] != ["--headful"]:
                    return set(), [f"API evidence headful gate requires one leading --headful: {label}"]
                test_arguments = test_arguments[1:]
            elif "--headful" in test_arguments:
                return set(), [f"API evidence non-headful gate contains --headful: {label}"]
        else:
            return set(), [f"API evidence workspace script has an unsupported node command: {label}"]
        if not test_arguments or any(
            not argument.startswith("dist-test/test/")
            or not argument.endswith(".test.js")
            for argument in test_arguments
        ):
            return set(), [f"API evidence workspace script has invalid test argv: {label}"]
        compiled_sources.extend(test_arguments)
    return {
        (package_directory / Path(source).relative_to("dist-test"))
        .with_suffix(".ts")
        .as_posix()
        for source in compiled_sources
    }, []


def evidence_execution_gates(
    root_package: dict[str, Any] | None = None,
    workspace_packages: dict[str, dict[str, Any]] | None = None,
) -> tuple[dict[str, set[str]], list[str]]:
    if root_package is None:
        root_package = json.loads((ROOT / "package.json").read_text(encoding="utf8"))
    if workspace_packages is None:
        workspace_packages = {
            manifest: json.loads((ROOT / manifest).read_text(encoding="utf8"))
            for _, _, _, manifest, _ in EVIDENCE_EXECUTION_GATES
        }

    sources_by_gate: dict[str, set[str]] = {}
    errors = []
    for gate_name, phase, root_script, manifest, workspace_script in EVIDENCE_EXECUTION_GATES:
        workspace_package = workspace_packages[manifest]
        workspace_name = workspace_package["name"]
        if root_script is not None:
            root_commands, root_errors = root_execution_commands(
                root_package.get("scripts", {}).get(root_script),
                f"package.json#{root_script}",
            )
            errors.extend(root_errors)
            delegation = [
                "npm",
                "run",
                workspace_script,
                f"--workspace={workspace_name}",
            ]
            if delegation not in root_commands:
                errors.append(f"API evidence execution gate is missing root delegation: {gate_name}")
                sources_by_gate[gate_name] = set()
                continue
        workspace_sources, workspace_errors = workspace_execution_sources(
            workspace_package.get("scripts", {}).get(workspace_script),
            f"{manifest}#{workspace_script}",
            Path(manifest).parent,
            phase,
        )
        errors.extend(workspace_errors)
        sources_by_gate[gate_name] = workspace_sources
        if not workspace_sources:
            errors.append(f"API evidence execution gate has no explicit test files: {gate_name}")
    return sources_by_gate, errors


def execution_gates_by_source(sources_by_gate: dict[str, set[str]]) -> dict[str, list[str]]:
    gates_by_source: dict[str, list[str]] = {}
    for gate_name, sources in sources_by_gate.items():
        for source in sources:
            gates_by_source.setdefault(source, []).append(gate_name)
    return {
        source: sorted(gates)
        for source, gates in sorted(gates_by_source.items())
    }


def execution_gate_for_parameterization(parameterization: Any) -> str:
    return (
        "api:test:parity:headful"
        if parameterization == "headless1"
        else "root:test:parity:headless"
    )


def transport_callback_contract(
    registrations_by_source: dict[str, list[dict[str, Any]]] | None = None,
) -> dict[str, Any]:
    if registrations_by_source is None:
        registrations_by_source = node_test_registrations_by_source()
    entries = []
    for source_name, registrations in registrations_by_source.items():
        for registration in registrations:
            case_id = node_test_id(registration["title"])
            declaration = registration.get("transport")
            if (
                case_id is not None
                and isinstance(declaration, dict)
                and declaration.get("applicability") == "applicable"
            ):
                entries.append(
                    {
                        "id": case_id,
                        "source": source_name,
                        "callbackFingerprint": declaration.get(
                            "callbackFingerprint"
                        ),
                    }
                )
    entries.sort(key=lambda entry: (entry["id"], entry["source"]))
    return {
        "count": len(entries),
        "fingerprint": canonical_fingerprint(entries),
    }


def transport_matrix_report(test_inventory: dict[str, Any]) -> dict[str, Any]:
    registrations_by_source = node_test_registrations_by_source()
    registrations: dict[str, list[tuple[str, dict[str, Any]]]] = {}
    for source_name, source_registrations in registrations_by_source.items():
        for registration in source_registrations:
            case_id = node_test_id(registration["title"])
            if case_id is not None:
                registrations.setdefault(case_id, []).append(
                    (source_name, registration)
                )

    cases = []
    for inventory_case in test_inventory["cases"]:
        case_id = inventory_case["id"]
        case_registrations = registrations.get(case_id, [])
        source_name = (
            case_registrations[0][0] if len(case_registrations) == 1 else None
        )
        registration = (
            case_registrations[0][1] if len(case_registrations) == 1 else None
        )
        declaration = registration.get("transport") if registration else None
        case = {
            "id": case_id,
            "source": source_name,
            "title": registration.get("title") if registration else None,
            "parameterization": inventory_case.get("parameterization"),
            "executionGate": execution_gate_for_parameterization(
                inventory_case.get("parameterization")
            ),
        }
        if isinstance(declaration, dict) and declaration.get("applicability") == "applicable":
            case.update(
                {
                    "applicability": "applicable",
                    "quadrants": copy.deepcopy(EXPECTED_TRANSPORT_QUADRANTS),
                }
            )
        elif isinstance(declaration, dict) and declaration.get("applicability") == "not-applicable":
            case.update(
                {
                    "applicability": "not-applicable",
                    "quadrants": [],
                    "reason": declaration.get("reason"),
                }
            )
        else:
            case.update({"applicability": "undeclared", "quadrants": []})
        cases.append(case)

    applicable = sum(case["applicability"] == "applicable" for case in cases)
    not_applicable = sum(
        case["applicability"] == "not-applicable" for case in cases
    )
    return {
        "schemaVersion": 1,
        "status": "PASS",
        "evidenceKind": "executable-source-declarations",
        "quadrants": copy.deepcopy(EXPECTED_TRANSPORT_QUADRANTS),
        "summary": {
            "cases": len(cases),
            "applicable": applicable,
            "notApplicable": not_applicable,
            "declaredQuadrantExecutions": applicable
            * len(EXPECTED_TRANSPORT_QUADRANTS),
        },
        "cases": cases,
    }


def transport_matrix_errors(
    test_inventory: dict[str, Any],
    report: dict[str, Any],
    helper_spec: dict[str, Any],
    callback_contract: dict[str, Any] | None = None,
) -> list[str]:
    errors = []
    if helper_spec.get("moduleFingerprint") != EXPECTED_TRANSPORT_HELPER_MODULE_FINGERPRINT:
        errors.append(
            "transport helper module fingerprint does not match the fixed trusted contract"
        )
    if helper_spec.get("bodyFingerprint") != EXPECTED_TRANSPORT_HELPER_BODY_FINGERPRINT:
        errors.append(
            "transport helper body does not match the fixed sequential matrix contract"
        )
    helper_quadrants = helper_spec.get("quadrants")
    normalized_helper_quadrants = [
        {
            "backend": quadrant.get("backend"),
            "connectionMode": quadrant.get("connectionMode"),
        }
        for quadrant in helper_quadrants
        if isinstance(quadrant, dict)
    ] if isinstance(helper_quadrants, list) else []
    if normalized_helper_quadrants != EXPECTED_TRANSPORT_QUADRANTS:
        errors.append("transport helper does not declare the exact four JS/native direct/flattened quadrants")
    if isinstance(helper_quadrants, list):
        for quadrant in helper_quadrants:
            if not isinstance(quadrant, dict):
                continue
            backend = quadrant.get("backend")
            if quadrant.get("backendFactory") != EXPECTED_TRANSPORT_BACKEND_FACTORIES.get(backend):
                errors.append(f"transport helper backend factory is missing or implicit for {backend!r}")
    explicit_start = helper_spec.get("explicitBrowserStart")
    if not isinstance(explicit_start, dict) or explicit_start.get("backend") is not True:
        errors.append("transport helper Browser.start must pass an explicit backend")
    if not isinstance(explicit_start, dict) or explicit_start.get("connectionMode") is not True:
        errors.append("transport helper Browser.start must pass an explicit connection mode")

    if callback_contract is None:
        callback_contract = transport_callback_contract()
    if callback_contract.get("count") != EXPECTED_TRANSPORT_CALLBACK_COUNT:
        errors.append(
            "transport applicable callback contract count changed: "
            f"expected {EXPECTED_TRANSPORT_CALLBACK_COUNT}, got {callback_contract.get('count')}"
        )
    if callback_contract.get("fingerprint") != EXPECTED_TRANSPORT_CALLBACK_FINGERPRINT:
        errors.append(
            "transport applicable callback contract fingerprint mismatch: "
            f"expected {EXPECTED_TRANSPORT_CALLBACK_FINGERPRINT}, got {callback_contract.get('fingerprint')}"
        )

    expected_ids = [case["id"] for case in test_inventory["cases"]]
    report_cases = report.get("cases")
    if not isinstance(report_cases, list):
        return [*errors, "transport matrix report cases must be a list"]
    report_ids = [case.get("id") for case in report_cases if isinstance(case, dict)]
    if report_ids != expected_ids:
        errors.append("transport matrix report cases do not exactly match the fixed inventory order")
    by_id = {
        case.get("id"): case for case in report_cases if isinstance(case, dict)
    }
    for case_id in expected_ids:
        case = by_id.get(case_id)
        if case is None:
            continue
        expected_reason = EXPECTED_TRANSPORT_NON_APPLICABLE.get(case_id)
        if expected_reason is None:
            if case.get("applicability") != "applicable":
                errors.append(f"transport-applicable case lacks an executable matrix declaration: {case_id}")
            if case.get("quadrants") != EXPECTED_TRANSPORT_QUADRANTS:
                errors.append(f"transport-applicable case lacks an exact quadrant: {case_id}")
            for quadrant in case.get("quadrants", []):
                if not isinstance(quadrant, dict) or quadrant.get("backend") not in {"js", "native"}:
                    errors.append(f"transport-applicable case has an implicit backend: {case_id}")
                if not isinstance(quadrant, dict) or quadrant.get("connectionMode") not in {"direct", "flattened"}:
                    errors.append(f"transport-applicable case has an implicit connection mode: {case_id}")
        else:
            if case.get("applicability") != "not-applicable":
                errors.append(f"transport non-applicable case is not declared per case: {case_id}")
            if case.get("quadrants") != []:
                errors.append(f"transport non-applicable case must not claim quadrants: {case_id}")
            if case.get("reason") != expected_reason:
                errors.append(f"transport non-applicable case lacks its executable reason: {case_id}")

    expected_summary = {
        "cases": len(expected_ids),
        "applicable": len(expected_ids) - len(EXPECTED_TRANSPORT_NON_APPLICABLE),
        "notApplicable": len(EXPECTED_TRANSPORT_NON_APPLICABLE),
        "declaredQuadrantExecutions": (
            len(expected_ids) - len(EXPECTED_TRANSPORT_NON_APPLICABLE)
        ) * len(EXPECTED_TRANSPORT_QUADRANTS),
    }
    if report.get("summary") != expected_summary:
        errors.append("transport matrix report summary does not match case-level declarations")
    if report.get("quadrants") != EXPECTED_TRANSPORT_QUADRANTS:
        errors.append("transport matrix report does not declare the exact four quadrants")
    return errors


def transport_helper_source_mutation_rejected(
    test_inventory: dict[str, Any],
    report: dict[str, Any],
    old: str,
    new: str,
) -> bool:
    source = TRANSPORT_MATRIX_HELPER.read_text(encoding="utf8")
    if source.count(old) != 1:
        raise RuntimeError(f"transport helper mutation anchor must occur exactly once: {old!r}")
    with TemporaryDirectory(prefix="nodriver-transport-probe-") as directory:
        source_path = Path(directory) / "transport-matrix.ts"
        source_path.write_text(source.replace(old, new, 1), encoding="utf8")
        try:
            helper_spec = inspect_transport_helper(source_path)
        except RuntimeError:
            return True
        return bool(transport_matrix_errors(test_inventory, report, helper_spec))


def transport_callback_source_mutation_rejected(
    source_name: str,
    old: str,
    new: str,
) -> bool:
    source_path = ROOT / source_name
    source = source_path.read_text(encoding="utf8")
    if source.count(old) != 1:
        raise RuntimeError(f"transport callback mutation anchor must occur exactly once: {old!r}")
    with TemporaryDirectory(prefix="nodriver-transport-probe-") as directory:
        mutated_path = Path(directory) / source_path.name
        mutated_path.write_text(source.replace(old, new, 1), encoding="utf8")
        try:
            mutated_registrations = typescript_test_registrations(mutated_path)
        except RuntimeError:
            return True
        registrations_by_source = node_test_registrations_by_source()
        registrations_by_source[source_name] = mutated_registrations
        callback_contract = transport_callback_contract(registrations_by_source)
        return (
            callback_contract.get("count") == EXPECTED_TRANSPORT_CALLBACK_COUNT
            and callback_contract.get("fingerprint")
            != EXPECTED_TRANSPORT_CALLBACK_FINGERPRINT
        )


def isolated_transport_refresh_mutation_probes() -> dict[str, str]:
    names = (
        "transportRefreshRejectsHelperTopLevelPop",
        "transportRefreshRejectsCallbackEarlyReturn",
    )
    with TemporaryDirectory(prefix="nodriver-transport-refresh-probe-") as directory:
        isolated_root = Path(directory) / "repo"
        shutil.copytree(
            PARITY,
            isolated_root / "parity",
            ignore=shutil.ignore_patterns("__pycache__"),
        )
        shutil.copytree(
            ROOT / "packages",
            isolated_root / "packages",
            ignore=shutil.ignore_patterns("dist", "generated", "node_modules"),
        )
        shutil.copy2(ROOT / "package.json", isolated_root / "package.json")
        (isolated_root / "node_modules").symlink_to(
            ROOT / "node_modules",
            target_is_directory=True,
        )
        artifacts = (
            isolated_root / "parity" / "validation.json",
            isolated_root / "parity" / "transport-matrix-report.json",
            isolated_root / "parity" / "gap-report.md",
        )

        def rejected_without_refresh(
            source_name: str,
            old: str,
            new: str,
            expected_error: str,
        ) -> bool:
            source_path = isolated_root / source_name
            source = source_path.read_text(encoding="utf8")
            if source.count(old) != 1:
                raise RuntimeError(
                    f"isolated refresh mutation anchor must occur exactly once: {old!r}"
                )
            before = {path: path.read_bytes() for path in artifacts}
            source_path.write_text(source.replace(old, new, 1), encoding="utf8")
            result = subprocess.run(
                [
                    sys.executable,
                    str(isolated_root / "parity" / "generate.py"),
                    "--refresh-derived",
                ],
                cwd=isolated_root,
                text=True,
                capture_output=True,
                check=False,
            )
            source_path.write_text(source, encoding="utf8")
            return (
                result.returncode != 0
                and expected_error in f"{result.stdout}{result.stderr}"
                and "Derived parity artifacts: refreshed" not in result.stdout
                and all(path.read_bytes() == before[path] for path in artifacts)
            )

        helper_rejected = rejected_without_refresh(
            "packages/api/test/support/transport-matrix.ts",
            "] as const satisfies readonly TransportQuadrant[];\n",
            "] as const satisfies readonly TransportQuadrant[];\n\n"
            "(TRANSPORT_QUADRANTS as unknown as TransportQuadrant[]).pop();\n",
            "transport helper module fingerprint does not match the fixed trusted contract",
        )
        callback_rejected = rejected_without_refresh(
            "packages/api/test/tab-selector-evaluate-parity.test.ts",
            '  await runTransportMatrix("ZDTEST-0037",',
            '  return;\n  await runTransportMatrix("ZDTEST-0037",',
            "transport applicable callback contract fingerprint mismatch",
        )
        return {
            names[0]: "PASS" if helper_rejected else "FAIL",
            names[1]: "PASS" if callback_rejected else "FAIL",
        }


def transport_matrix_mutation_probes(
    test_inventory: dict[str, Any],
    report: dict[str, Any],
    helper_spec: dict[str, Any],
) -> dict[str, str]:
    probe_names = (
        "transportCaseMissingQuadrant",
        "transportCaseImplicitBackend",
        "transportCaseImplicitConnectionMode",
        "transportCaseMissingExecutableReason",
        "transportCaseMissingApplicability",
        "transportHelperMissingQuadrant",
        "transportHelperDefaultBackend",
        "transportHelperDefaultConnectionMode",
        "transportHelperVoidAction",
        "transportHelperOmittedAction",
        "transportHelperConditionalContinue",
        "transportHelperOmittedStop",
        "transportHelperUnawaitedStop",
        "transportHelperUnawaitedStart",
        "transportHelperTopLevelPop",
        "transportCallbackEarlyReturn",
        "transportUnawaitedMatrixCallRejected",
        "transportMatrixLocalShadowRejected",
        "transportExclusionLocalShadowRejected",
        "transportWrongCaseIdRejected",
    )
    applicable_index = next((
        index
        for index, case in enumerate(report["cases"])
        if case["applicability"] == "applicable"
    ), None)
    not_applicable_index = next((
        index
        for index, case in enumerate(report["cases"])
        if case["applicability"] == "not-applicable"
    ), None)
    if applicable_index is None or not_applicable_index is None:
        return {name: "FAIL" for name in probe_names}

    missing_quadrant = copy.deepcopy(report)
    missing_quadrant["cases"][applicable_index]["quadrants"].pop()
    implicit_backend = copy.deepcopy(report)
    implicit_backend["cases"][applicable_index]["quadrants"][0]["backend"] = None
    implicit_mode = copy.deepcopy(report)
    implicit_mode["cases"][applicable_index]["quadrants"][0]["connectionMode"] = None
    missing_reason = copy.deepcopy(report)
    del missing_reason["cases"][not_applicable_index]["reason"]["detail"]
    undeclared = copy.deepcopy(report)
    undeclared["cases"][applicable_index]["applicability"] = "undeclared"

    candidates = {
        "transportCaseMissingQuadrant": missing_quadrant,
        "transportCaseImplicitBackend": implicit_backend,
        "transportCaseImplicitConnectionMode": implicit_mode,
        "transportCaseMissingExecutableReason": missing_reason,
        "transportCaseMissingApplicability": undeclared,
    }
    probes = {
        name: "PASS"
        if transport_matrix_errors(test_inventory, candidate_report, helper_spec)
        else "FAIL"
        for name, candidate_report in candidates.items()
    }
    helper_mutations = {
        "transportHelperMissingQuadrant": (
            '  { backend: "native", connectionMode: "flattened", backendFactory: NativeConnection },\n',
            "",
        ),
        "transportHelperDefaultBackend": (
            "      backend: quadrant.backendFactory,\n",
            "",
        ),
        "transportHelperDefaultConnectionMode": (
            "      connectionMode: quadrant.connectionMode,\n",
            "",
        ),
        "transportHelperVoidAction": (
            "      await action(browser, quadrant);",
            "      void action(browser, quadrant);",
        ),
        "transportHelperOmittedAction": (
            "      await action(browser, quadrant);\n",
            "",
        ),
        "transportHelperConditionalContinue": (
            "    const browser = await Browser.start({",
            '    if (quadrant.backend === "native" && quadrant.connectionMode === "flattened") continue;\n'
            "    const browser = await Browser.start({",
        ),
        "transportHelperOmittedStop": (
            "      await browser.stop();\n",
            "",
        ),
        "transportHelperUnawaitedStop": (
            "      await browser.stop();",
            "      void browser.stop();",
        ),
        "transportHelperUnawaitedStart": (
            "    const browser = await Browser.start({",
            "    const browser = Browser.start({",
        ),
        "transportHelperTopLevelPop": (
            "] as const satisfies readonly TransportQuadrant[];\n",
            "] as const satisfies readonly TransportQuadrant[];\n\n"
            "(TRANSPORT_QUADRANTS as unknown as TransportQuadrant[]).pop();\n",
        ),
    }
    probes.update(
        {
            name: "PASS"
            if transport_helper_source_mutation_rejected(
                test_inventory, report, old, new
            )
            else "FAIL"
            for name, (old, new) in helper_mutations.items()
        }
    )
    probes["transportCallbackEarlyReturn"] = (
        "PASS"
        if transport_callback_source_mutation_rejected(
            "packages/api/test/tab-selector-evaluate-parity.test.ts",
            '  await runTransportMatrix("ZDTEST-0037",',
            '  return;\n  await runTransportMatrix("ZDTEST-0037",',
        )
        else "FAIL"
    )
    source_probes = {
        "transportUnawaitedMatrixCallRejected": TRANSPORT_UNAWAITED_MATRIX_FIXTURE,
        "transportMatrixLocalShadowRejected": TRANSPORT_MATRIX_SHADOW_FIXTURE,
        "transportExclusionLocalShadowRejected": TRANSPORT_EXCLUSION_SHADOW_FIXTURE,
        "transportWrongCaseIdRejected": TRANSPORT_WRONG_CASE_ID_FIXTURE,
    }
    probes.update(
        {
            name: "PASS" if typescript_test_source_rejected(source) else "FAIL"
            for name, source in source_probes.items()
        }
    )
    return probes


def bound_node_test_ids(
    mappings: dict[str, Any], titles_by_source: dict[str, list[str]]
) -> set[str]:
    registrations: dict[str, list[str]] = {}
    for source_name, titles in titles_by_source.items():
        for title in titles:
            registration_id = node_test_id(title)
            if registration_id is not None:
                registrations.setdefault(registration_id, []).append(source_name)
    bound = set()
    for case_id, mapping in mappings.items():
        case_name = mapping.get("case") if isinstance(mapping, dict) else None
        if not isinstance(case_name, str) or "::" not in case_name:
            continue
        source_name = case_name.rsplit("::", 1)[0]
        if registrations.get(case_id) == [source_name]:
            bound.add(case_id)
    return bound


def node_mapping_errors(
    cases: list[dict[str, Any]],
    mappings: dict[str, Any],
    titles_by_source: dict[str, list[str]] | None = None,
) -> list[str]:
    errors = []
    inventory_ids = {case["id"] for case in cases}
    unknown_mapping_ids = sorted(set(mappings) - inventory_ids)
    if unknown_mapping_ids:
        errors.append(f"Node test mappings contain unknown IDs: {unknown_mapping_ids}")
    missing_mapping_ids = sorted(inventory_ids - set(mappings))
    if missing_mapping_ids:
        errors.append(f"Node test mappings are missing IDs: {missing_mapping_ids}")
    if titles_by_source is None:
        titles_by_source = node_test_titles_by_source()
    registrations: dict[str, list[tuple[str, str]]] = {}
    for source_name, titles in titles_by_source.items():
        for title in titles:
            registration_id = node_test_id(title)
            if registration_id is not None:
                registrations.setdefault(registration_id, []).append((source_name, title))
    unknown_registration_ids = sorted(set(registrations) - inventory_ids)
    if unknown_registration_ids:
        errors.append(
            f"Node tests register unknown parity IDs: {unknown_registration_ids}"
        )
    mapped_cases: dict[str, str] = {}
    for case_id, mapping in mappings.items():
        if set(mapping) != {"status", "case", "result", "note"}:
            errors.append(f"Node test mapping schema is invalid for {case_id}")
            continue
        if mapping["status"] != "MAPPED" or mapping["result"] != "PASS":
            errors.append(f"Node test mapping is not passing for {case_id}")
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
        source_parts = Path(source_name).parts
        valid_source = (
            len(source_parts) >= 4
            and source_parts[0] == "packages"
            and source_parts[2] == "test"
            and source_name.endswith(".test.ts")
            and ".." not in source_parts
            and source_path.resolve().is_relative_to(
                (ROOT / source_parts[0] / source_parts[1] / source_parts[2]).resolve()
            )
        )
        if not valid_source:
            errors.append(f"Node test mapping source is outside packages/*/test for {case_id}: {source_name}")
        elif not source_path.is_file():
            errors.append(f"Node test mapping source does not exist for {case_id}: {source_name}")
        source_registrations = [
            title
            for registered_source, title in registrations.get(case_id, [])
            if registered_source == source_name
        ]
        if len(source_registrations) != 1:
            errors.append(
                f"Node test mapping source must register {case_id} exactly once: "
                f"{source_name} registered {len(source_registrations)}"
            )
        if len(registrations.get(case_id, [])) != 1:
            errors.append(
                f"Node parity ID must be registered exactly once across mapped sources: "
                f"{case_id} registered {len(registrations.get(case_id, []))}"
            )
    return errors


def node_mapping_mutation_probes(
    cases: list[dict[str, Any]],
    mappings: dict[str, Any],
    titles_by_source: dict[str, list[str]],
) -> dict[str, str]:
    case_ids = list(mappings)
    first_id, second_id = case_ids[:2]
    first_source = mappings[first_id]["case"].rsplit("::", 1)[0]
    second_source = next(
        mapping["case"].rsplit("::", 1)[0]
        for mapping in mappings.values()
        if mapping["case"].rsplit("::", 1)[0] != first_source
    )
    first_title = next(
        title for title in titles_by_source[first_source] if node_test_id(title) == first_id
    )
    duplicate = copy.deepcopy(mappings)
    duplicate[second_id]["case"] = duplicate[first_id]["case"]
    mismatched = copy.deepcopy(mappings)
    mismatched[first_id]["case"] = mismatched[first_id]["case"].rsplit("::", 1)[0] + f"::{second_id}"
    nonexistent = copy.deepcopy(mappings)
    nonexistent[first_id]["case"] = f"packages/api/test/does-not-exist.test.ts::{first_id}"
    wrong_source = copy.deepcopy(mappings)
    wrong_source[first_id]["case"] = f"{second_source}::{first_id}"
    duplicate_registration = copy.deepcopy(titles_by_source)
    duplicate_registration[first_source] = [
        *duplicate_registration[first_source],
        first_title,
    ]
    missing_registration = copy.deepcopy(titles_by_source)
    missing_registration[first_source] = [
        title
        for title in missing_registration[first_source]
        if node_test_id(title) != first_id
    ]
    text_only_rejected = typescript_test_source_rejected(TEST_CASE_TEXT_ONLY_FIXTURE)
    text_only_titles = (
        [] if text_only_rejected else typescript_test_titles(TEST_CASE_TEXT_ONLY_FIXTURE)
    )
    permanent_skip_titles = typescript_test_titles(TEST_ID_PERMANENT_SKIP_FIXTURE)
    hook_callback_titles = typescript_test_titles(TEST_CASE_HOOK_CALLBACK_FIXTURE)
    duplicate_in_unmapped_source = copy.deepcopy(titles_by_source)
    duplicate_in_unmapped_source.update(
        node_test_titles_by_source(TEST_CASE_ALL_SOURCES_FIXTURE)
    )
    single_case = [next(case for case in cases if case["id"] == first_id)]
    single_mapping = {first_id: mappings[first_id]}
    return {
        "commentOrStringOnlyNodeCase": "PASS"
        if text_only_rejected
        or node_mapping_errors(single_case, single_mapping, {first_source: text_only_titles})
        else "FAIL",
        "permanentlySkippedZdtestIsNotRegistration": "PASS"
        if not permanent_skip_titles
        and node_mapping_errors(
            single_case, single_mapping, {first_source: permanent_skip_titles}
        )
        else "FAIL",
        "hookCallbackIsNotNodeTestRegistration": "PASS"
        if node_mapping_errors(
            single_case, single_mapping, {first_source: hook_callback_titles}
        )
        else "FAIL",
        "hookFactoryIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_HOOK_FACTORY_FIXTURE)
        else "FAIL",
        "hookExtraArgumentIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_HOOK_EXTRA_ARGUMENT_FIXTURE)
        else "FAIL",
        "localNoopIsNotNodeTestRegistration": "PASS"
        if typescript_test_source_rejected(TEST_CASE_LOCAL_NOOP_FIXTURE)
        else "FAIL",
        "impureSkipReasonArgumentIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_IMPURE_SKIP_REASON_FIXTURE)
        else "FAIL",
        "shadowedNodeTestBindingIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_SHADOWED_TEST_FIXTURE)
        else "FAIL",
        "aliasedMutationIsNotNodeTestRegistration": "PASS"
        if typescript_test_source_rejected(TEST_CASE_ALIAS_MUTATION_FIXTURE)
        else "FAIL",
        "destructuredAliasMutationIsRejected": "PASS"
        if typescript_test_source_rejected(
            TEST_CASE_DESTRUCTURED_ALIAS_MUTATION_FIXTURE
        )
        else "FAIL",
        "destructuringAssignmentIsRejected": "PASS"
        if typescript_test_source_rejected(
            TEST_CASE_DESTRUCTURING_ASSIGNMENT_FIXTURE
        )
        else "FAIL",
        "forOfAliasMutationIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_FOR_OF_ALIAS_MUTATION_FIXTURE)
        else "FAIL",
        "duplicateNodeCase": "PASS"
        if node_mapping_errors(cases, duplicate, titles_by_source)
        else "FAIL",
        "duplicateNodeRegistration": "PASS"
        if node_mapping_errors(cases, mappings, duplicate_registration)
        else "FAIL",
        "mismatchedNodeCaseId": "PASS"
        if node_mapping_errors(cases, mismatched, titles_by_source)
        else "FAIL",
        "missingNodeRegistration": "PASS"
        if node_mapping_errors(cases, mappings, missing_registration)
        else "FAIL",
        "mutableBindingIsNotNodeTestRegistration": "PASS"
        if typescript_test_source_rejected(TEST_CASE_MUTABLE_BINDING_FIXTURE)
        else "FAIL",
        "typeOnlyImportIsNotNodeTestRegistration": "PASS"
        if typescript_test_source_rejected(TEST_CASE_TYPE_ONLY_IMPORT_FIXTURE)
        else "FAIL",
        "unknownSideEffectCallIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_UNKNOWN_CALL_FIXTURE)
        else "FAIL",
        "unresolvedNodeTestTitleIsRejected": "PASS"
        if typescript_test_source_rejected(TEST_CASE_UNRESOLVED_TITLE_FIXTURE)
        else "FAIL",
        "nonexistentNodeCaseSource": "PASS"
        if node_mapping_errors(cases, nonexistent, titles_by_source)
        else "FAIL",
        "wrongNodeCaseSource": "PASS"
        if node_mapping_errors(cases, wrong_source, titles_by_source)
        else "FAIL",
        "duplicateRegistrationInUnmappedSource": "PASS"
        if node_mapping_errors(cases, mappings, duplicate_in_unmapped_source)
        else "FAIL",
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
        "jsdriver runtime introspection",
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


CLASS_ALIASES: dict[str, str] = {}

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
                "semanticsCoverage": [],
            }
        if declaration or candidate in runtime:
            return {
                "status": "UNKNOWN",
                "nodeSymbol": candidate,
                "nodeKind": declaration["kind"] if declaration else None,
                "runtimeExport": candidate in runtime,
                "evidence": "name exists but declaration kind is not a compatible structural match",
                "signatureComparison": "UNVERIFIED",
                "semanticsCoverage": [],
            }
    return {
        "status": "MISSING",
        "nodeSymbol": None,
        "evidence": "no root runtime export or public TypeScript declaration with an equivalent name",
        "signatureComparison": "UNVERIFIED",
        "semanticsCoverage": [],
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
                        "semanticsCoverage": [],
                    }
                elif named_declarations:
                    member_mapping = {
                        "status": "UNKNOWN",
                        "nodeMember": f"{node_class}.{named_candidate}",
                        "nodeDeclarations": named_declarations,
                        "evidence": "name and member kind match, but required arity differs",
                        "signatureComparison": "INCOMPATIBLE_REQUIRED_ARITY",
                        "semanticsCoverage": [],
                    }
                elif node_class is None:
                    member_mapping = {
                        "status": "UNKNOWN",
                        "nodeMember": None,
                        "evidence": "no mechanically matched Node class; an equivalent may exist elsewhere",
                        "signatureComparison": "UNVERIFIED",
                        "semanticsCoverage": [],
                    }
                else:
                    member_mapping = {
                        "status": "MISSING",
                        "nodeMember": None,
                        "evidence": f"no equivalent member name declared on {node_class}",
                        "signatureComparison": "UNVERIFIED",
                        "semanticsCoverage": [],
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
    targets: dict[str, dict[str, Any]] = {
        f"zendriver.{item['name']}": item for item in upstream["rootExports"]
    }
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
        verified_semantics = semantic.get("verifiedSemantics")
        if (
            not isinstance(verified_semantics, list)
            or not verified_semantics
            or verified_semantics != sorted(set(verified_semantics))
            or any(item not in API_SEMANTIC_DIMENSIONS for item in verified_semantics)
        ):
            raise RuntimeError(
                f"Invalid API semantic coverage: {semantic['upstream']}"
            )
        evidence = (
            {"evidenceTestIds": semantic["testIds"]}
            if "testIds" in semantic
            else {"evidenceCases": semantic["testCases"]}
        )
        target["nodeMapping"] = {
            **target["nodeMapping"],
            "status": "VERIFIED",
            "nodeMember": semantic["nodeMember"],
            "evidence": API_MAPPING_EVIDENCE,
            **evidence,
            "semanticsCoverage": verified_semantics,
            "signatureComparison": target["nodeMapping"].get("signatureComparison", "UNVERIFIED"),
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


def api_semantic_mapping_errors(
    semantic_mappings: Any,
    upstream_targets: dict[str, dict[str, Any]],
    known_api_members: set[str],
    inventory_by_id: dict[str, dict[str, Any]],
    node_mappings: dict[str, Any],
    titles_by_source: dict[str, list[str]],
    gates_by_source: dict[str, list[str]],
) -> list[str]:
    if not isinstance(semantic_mappings, list):
        return ["API semantic mappings must be a list"]

    errors = []
    registration_phases_by_source = node_test_registration_phases_by_source()
    if len(semantic_mappings) != EXPECTED_API_MAPPING_COUNT:
        errors.append(
            f"expected {EXPECTED_API_MAPPING_COUNT} API semantic mappings, got {len(semantic_mappings)}"
        )

    upstream_names = [
        entry.get("upstream")
        for entry in semantic_mappings
        if isinstance(entry, dict)
    ]
    duplicate_upstreams = sorted(
        name
        for name, count in Counter(upstream_names).items()
        if isinstance(name, str) and count > 1
    )
    if duplicate_upstreams:
        errors.append(f"API semantic mappings contain duplicate upstream targets: {duplicate_upstreams}")
    missing_upstreams = sorted(set(upstream_targets) - set(upstream_names))
    if missing_upstreams:
        errors.append(f"API semantic mappings are missing upstream targets: {missing_upstreams}")

    case_registrations: dict[str, list[str]] = {}
    id_registrations: dict[str, list[tuple[str, str]]] = {}
    for source_name, titles in titles_by_source.items():
        for title in titles:
            case_registrations.setdefault(title, []).append(source_name)
            registration_id = node_test_id(title)
            if registration_id is not None:
                id_registrations.setdefault(registration_id, []).append((source_name, title))

    for entry in semantic_mappings:
        if not isinstance(entry, dict):
            errors.append(f"API semantic mapping is not an object: {entry!r}")
            continue
        upstream = entry.get("upstream", "<missing-upstream>")
        evidence_keys = {key for key in ("testIds", "testCases") if key in entry}
        required_keys = {"upstream", "nodeMember", "verifiedSemantics"} | evidence_keys
        if set(entry) != required_keys or len(evidence_keys) != 1:
            errors.append(f"API semantic mapping schema is invalid: {upstream}")

        verified_semantics = entry.get("verifiedSemantics")
        if "verifiedSemantics" not in entry:
            errors.append(f"API semantic coverage is missing: {upstream}")
        elif not isinstance(verified_semantics, list) or not verified_semantics:
            errors.append(f"API semantic coverage is empty or invalid: {upstream}")
        elif verified_semantics != sorted(set(verified_semantics)):
            errors.append(f"API semantic coverage must be sorted and unique: {upstream}")
        elif any(semantic not in API_SEMANTIC_DIMENSIONS for semantic in verified_semantics):
            errors.append(f"API semantic coverage contains an unknown dimension: {upstream}")

        if upstream not in upstream_targets:
            errors.append(f"API semantic mapping has unknown upstream target: {upstream}")
        node_member = entry.get("nodeMember")
        if not isinstance(node_member, str) or node_member not in known_api_members:
            errors.append(f"API semantic mapping has unknown Node API member: {upstream} -> {node_member}")

        if len(evidence_keys) != 1:
            continue
        evidence_key = next(iter(evidence_keys))
        evidence_items = entry[evidence_key]
        if not isinstance(evidence_items, list) or not evidence_items:
            errors.append(f"API semantic mapping has no evidence tests: {upstream}")
            continue

        if evidence_key == "testIds":
            if (
                any(not isinstance(test_id, str) for test_id in evidence_items)
                or evidence_items != sorted(set(evidence_items))
            ):
                errors.append(f"API semantic evidence IDs must be sorted and unique: {upstream}")
                continue
            for test_id in evidence_items:
                inventory_case = inventory_by_id.get(test_id)
                parity = inventory_case.get("nodeParity") if inventory_case is not None else None
                if parity is None or parity.get("status") != "MAPPED" or parity.get("result") != "PASS":
                    errors.append(f"API semantic evidence is not a passing mapped test: {upstream} -> {test_id}")
                    continue
                node_mapping = node_mappings.get(test_id)
                case_name = node_mapping.get("case") if isinstance(node_mapping, dict) else None
                if not isinstance(case_name, str) or "::" not in case_name:
                    errors.append(f"API semantic evidence has no registered Node test: {upstream} -> {test_id}")
                    continue
                source_name = case_name.rsplit("::", 1)[0]
                registrations = id_registrations.get(test_id, [])
                if len(registrations) != 1 or registrations[0][0] != source_name:
                    errors.append(f"API semantic evidence ID must be uniquely registered: {upstream} -> {test_id}")
                else:
                    parameterization = inventory_case.get("parameterization")
                    registered_title = registrations[0][1]
                    registered_phases = re.findall(
                        r"\[(headless[01])\]", registered_title
                    )
                    expected_phases = (
                        [parameterization]
                        if parameterization in {"headless0", "headless1"}
                        else []
                    )
                    if registered_phases != expected_phases:
                        errors.append(f"API semantic evidence phase does not match its registered case: {upstream} -> {test_id}")
                    expected_execution_phase = (
                        parameterization
                        if parameterization in {"headless0", "headless1"}
                        else "headless0"
                    )
                    options_phases = registration_phases_by_source.get(
                        source_name, {}
                    ).get(registered_title, [])
                    if options_phases != [expected_execution_phase]:
                        errors.append(f"API semantic evidence options phase does not match its registered case: {upstream} -> {test_id}")
                required_gate = execution_gate_for_parameterization(
                    inventory_case.get("parameterization")
                )
                if required_gate not in gates_by_source.get(source_name, []):
                    errors.append(f"API semantic evidence is not in its required execution phase: {upstream} -> {test_id} -> {required_gate}")
            continue

        normalized_cases = []
        valid_case_schema = True
        for evidence_case in evidence_items:
            if not isinstance(evidence_case, dict) or set(evidence_case) != {"file", "case"}:
                errors.append(f"API semantic test case schema is invalid: {upstream}")
                valid_case_schema = False
                continue
            source_name = evidence_case["file"]
            case_name = evidence_case["case"]
            if not isinstance(source_name, str) or not isinstance(case_name, str):
                errors.append(f"API semantic test case schema is invalid: {upstream}")
                valid_case_schema = False
                continue
            normalized_cases.append((source_name, case_name))
        if not valid_case_schema:
            continue
        if normalized_cases != sorted(set(normalized_cases)):
            errors.append(f"API semantic test cases must be sorted and unique: {upstream}")
        for source_name, case_name in normalized_cases:
            relative_parts = Path(source_name).parts
            source_path = (ROOT / source_name).resolve()
            valid_location = (
                len(relative_parts) >= 4
                and relative_parts[0] == "packages"
                and relative_parts[2] == "test"
                and source_name.endswith(".test.ts")
                and ".." not in relative_parts
                and source_path.is_relative_to(
                    (ROOT / relative_parts[0] / relative_parts[1] / relative_parts[2]).resolve()
                )
            )
            if not valid_location or not case_name.startswith("ZDAPI-"):
                errors.append(f"API semantic test case is invalid: {upstream} -> {source_name}::{case_name}")
                continue
            if not source_path.is_file():
                errors.append(f"API semantic test source does not exist: {upstream} -> {source_name}")
                continue
            if case_registrations.get(case_name) != [source_name]:
                errors.append(f"API semantic test case must be uniquely registered: {upstream} -> {case_name}")
            if source_name not in gates_by_source:
                errors.append(f"API semantic evidence is not in an execution gate: {upstream} -> {case_name}")
    return errors


def api_semantic_dimension_counts(
    semantic_mappings: list[dict[str, Any]],
) -> dict[str, int]:
    return dict(
        sorted(
            Counter(
                dimension
                for entry in semantic_mappings
                for dimension in entry.get("verifiedSemantics", [])
            ).items()
        )
    )


def api_semantic_evidence_sources(
    semantic_mappings: list[dict[str, Any]], node_mappings: dict[str, Any]
) -> set[str]:
    sources = {
        evidence_case["file"]
        for entry in semantic_mappings
        for evidence_case in entry.get("testCases", [])
        if isinstance(evidence_case, dict) and isinstance(evidence_case.get("file"), str)
    }
    for entry in semantic_mappings:
        for test_id in entry.get("testIds", []):
            node_mapping = node_mappings.get(test_id)
            case_name = node_mapping.get("case") if isinstance(node_mapping, dict) else None
            if isinstance(case_name, str) and "::" in case_name:
                sources.add(case_name.rsplit("::", 1)[0])
    return sources


def api_semantic_test_id_phase_counts(
    semantic_mappings: list[dict[str, Any]], test_inventory: dict[str, Any]
) -> dict[str, int]:
    cases_by_id = {case["id"]: case for case in test_inventory["cases"]}
    evidence_ids = {
        test_id
        for entry in semantic_mappings
        for test_id in entry.get("testIds", [])
    }
    return dict(
        sorted(
            Counter(
                cases_by_id[test_id].get("parameterization") or "<none>"
                for test_id in evidence_ids
            ).items()
        )
    )


def api_semantic_mutation_probes(
    semantic_mappings: list[dict[str, Any]],
    upstream_targets: dict[str, dict[str, Any]],
    known_api_members: set[str],
    inventory_by_id: dict[str, dict[str, Any]],
    node_mappings: dict[str, Any],
    titles_by_source: dict[str, list[str]],
    gates_by_source: dict[str, list[str]],
) -> dict[str, str]:
    def rejected(
        candidate: list[dict[str, Any]],
        expected: str,
        *,
        candidate_titles: dict[str, list[str]] | None = None,
        candidate_gates: dict[str, list[str]] | None = None,
    ) -> str:
        candidate_errors = api_semantic_mapping_errors(
            candidate,
            upstream_targets,
            known_api_members,
            inventory_by_id,
            node_mappings,
            titles_by_source if candidate_titles is None else candidate_titles,
            gates_by_source if candidate_gates is None else candidate_gates,
        )
        return "PASS" if any(expected in error for error in candidate_errors) else "FAIL"

    first_case_index = next(
        index for index, entry in enumerate(semantic_mappings) if "testCases" in entry
    )
    first_id_index = next(
        index for index, entry in enumerate(semantic_mappings) if "testIds" in entry
    )
    first_case = semantic_mappings[first_case_index]["testCases"][0]

    missing_mapping = copy.deepcopy(semantic_mappings)
    missing_mapping.pop()
    missing_coverage = copy.deepcopy(semantic_mappings)
    missing_coverage[0].pop("verifiedSemantics")
    empty_coverage = copy.deepcopy(semantic_mappings)
    empty_coverage[0]["verifiedSemantics"] = []
    unknown_coverage = copy.deepcopy(semantic_mappings)
    unknown_coverage[0]["verifiedSemantics"] = ["unknown"]
    unknown_member = copy.deepcopy(semantic_mappings)
    unknown_member[0]["nodeMember"] = "Missing.member"
    unknown_case = copy.deepcopy(semantic_mappings)
    unknown_case[first_case_index]["testCases"][0]["case"] = "ZDAPI-DOES-NOT-EXIST"
    unknown_id = copy.deepcopy(semantic_mappings)
    unknown_id[first_id_index]["testIds"] = ["ZDTEST-9999"]
    ungated = copy.deepcopy(gates_by_source)
    ungated.pop(first_case["file"], None)
    duplicate_titles = copy.deepcopy(titles_by_source)
    duplicate_titles.setdefault("packages/api/test/duplicate-probe.test.ts", []).append(
        first_case["case"]
    )
    permanent_skip_api_titles = typescript_test_titles(API_PERMANENT_SKIP_FIXTURE)
    unknown_shorthand_skip_titles = typescript_test_titles(
        API_UNKNOWN_SHORTHAND_SKIP_FIXTURE
    )
    computed_skip_titles = typescript_test_titles(API_COMPUTED_SKIP_FIXTURE)
    spread_options_titles = typescript_test_titles(API_SPREAD_OPTIONS_FIXTURE)
    generic_unknown_options_rejected = typescript_test_source_rejected(
        API_GENERIC_UNKNOWN_OPTIONS_FIXTURE
    )
    generic_unknown_options_titles = (
        []
        if generic_unknown_options_rejected
        else typescript_test_titles(API_GENERIC_UNKNOWN_OPTIONS_FIXTURE)
    )
    todo_options_titles = typescript_test_titles(API_TODO_OPTIONS_FIXTURE)
    permanently_skipped_api_case = copy.deepcopy(titles_by_source)
    permanently_skipped_api_case[first_case["file"]] = [
        title
        for title in permanently_skipped_api_case[first_case["file"]]
        if title != first_case["case"]
    ]

    def ineligible_options_are_rejected(fixture_titles: list[str]) -> bool:
        candidate_titles = copy.deepcopy(titles_by_source)
        candidate_titles[first_case["file"]] = [
            title
            for title in candidate_titles[first_case["file"]]
            if title != first_case["case"]
        ]
        return (
            not fixture_titles
            and rejected(
                semantic_mappings,
                "API semantic test case must be uniquely registered",
                candidate_titles=candidate_titles,
            )
            == "PASS"
        )
    root_package = json.loads((ROOT / "package.json").read_text(encoding="utf8"))
    workspace_packages = {
        manifest: json.loads((ROOT / manifest).read_text(encoding="utf8"))
        for _, _, _, manifest, _ in EVIDENCE_EXECUTION_GATES
    }
    removed_root_delegation = copy.deepcopy(root_package)
    removed_root_delegation["scripts"]["test"] = removed_root_delegation["scripts"]["test"].replace(
        "npm run test --workspace=@vertile-ai/jsdriver-runtime-js", ""
    )
    removed_root_sources, removed_root_errors = evidence_execution_gates(
        removed_root_delegation, workspace_packages
    )
    removed_root_semantic_errors = api_semantic_mapping_errors(
        semantic_mappings,
        upstream_targets,
        known_api_members,
        inventory_by_id,
        node_mappings,
        titles_by_source,
        execution_gates_by_source(removed_root_sources),
    )
    removed_workspace_file = copy.deepcopy(workspace_packages)
    removed_workspace_file["packages/runtime-js/package.json"]["scripts"]["test"] = (
        removed_workspace_file["packages/runtime-js/package.json"]["scripts"]["test"].replace(
            "dist-test/test/connection-compat.test.js", ""
        )
    )
    removed_workspace_sources, removed_workspace_errors = evidence_execution_gates(
        root_package, removed_workspace_file
    )
    removed_workspace_semantic_errors = api_semantic_mapping_errors(
        semantic_mappings,
        upstream_targets,
        known_api_members,
        inventory_by_id,
        node_mappings,
        titles_by_source,
        execution_gates_by_source(removed_workspace_sources),
    )
    fake_workspace = copy.deepcopy(root_package)
    fake_workspace["scripts"]["test"] = fake_workspace["scripts"]["test"].replace(
        "--workspace=@vertile-ai/jsdriver-runtime-js",
        "--workspace=@vertile-ai/jsdriver-runtime-js-fake",
    )
    _, fake_workspace_errors = evidence_execution_gates(fake_workspace, workspace_packages)
    commented_delegation = copy.deepcopy(root_package)
    commented_delegation["scripts"]["test"] = "# " + commented_delegation["scripts"]["test"]
    _, commented_delegation_errors = evidence_execution_gates(
        commented_delegation, workspace_packages
    )
    conditional_delegation = copy.deepcopy(root_package)
    conditional_delegation["scripts"]["test"] = (
        "if false; then " + conditional_delegation["scripts"]["test"]
    )
    _, conditional_delegation_errors = evidence_execution_gates(
        conditional_delegation, workspace_packages
    )
    headless_with_headful = copy.deepcopy(workspace_packages)
    headless_with_headful["packages/api/package.json"]["scripts"]["test:parity:headless"] = (
        headless_with_headful["packages/api/package.json"]["scripts"]["test:parity:headless"].replace(
            "node dist-test/test/support/run-persistent-tests.js ",
            "node dist-test/test/support/run-persistent-tests.js --headful ",
            1,
        )
    )
    _, headless_with_headful_errors = evidence_execution_gates(
        root_package, headless_with_headful
    )
    headful_without_headful = copy.deepcopy(workspace_packages)
    headful_without_headful["packages/api/package.json"]["scripts"]["test:parity:headful"] = (
        headful_without_headful["packages/api/package.json"]["scripts"]["test:parity:headful"].replace(
            " --headful ", " ", 1
        )
    )
    _, headful_without_headful_errors = evidence_execution_gates(
        root_package, headful_without_headful
    )
    headful_with_misplaced_flag = copy.deepcopy(workspace_packages)
    headful_with_misplaced_flag["packages/api/package.json"]["scripts"]["test:parity:headful"] = (
        headful_with_misplaced_flag["packages/api/package.json"]["scripts"]["test:parity:headful"].replace(
            "run-persistent-tests.js --headful dist-test/test/handlers-domain-parity.test.js",
            "run-persistent-tests.js dist-test/test/handlers-domain-parity.test.js --headful",
            1,
        )
    )
    _, headful_with_misplaced_flag_errors = evidence_execution_gates(
        root_package, headful_with_misplaced_flag
    )
    headful_with_duplicate_flag = copy.deepcopy(workspace_packages)
    headful_with_duplicate_flag["packages/api/package.json"]["scripts"]["test:parity:headful"] = (
        headful_with_duplicate_flag["packages/api/package.json"]["scripts"]["test:parity:headful"].replace(
            "run-persistent-tests.js --headful",
            "run-persistent-tests.js --headful --headful",
            1,
        )
    )
    _, headful_with_duplicate_flag_errors = evidence_execution_gates(
        root_package, headful_with_duplicate_flag
    )
    gate_with_expect_failure = copy.deepcopy(workspace_packages)
    gate_with_expect_failure["packages/api/package.json"]["scripts"]["test:parity:headless"] = (
        gate_with_expect_failure["packages/api/package.json"]["scripts"]["test:parity:headless"].replace(
            "node dist-test/test/support/run-persistent-tests.js ",
            "node dist-test/test/support/run-persistent-tests.js --expect-failure ",
            1,
        )
    )
    _, gate_with_expect_failure_errors = evidence_execution_gates(
        root_package, gate_with_expect_failure
    )
    commented_test_file = copy.deepcopy(workspace_packages)
    commented_test_file["packages/runtime-js/package.json"]["scripts"]["test"] = (
        commented_test_file["packages/runtime-js/package.json"]["scripts"]["test"].replace(
            "dist-test/test/connection-compat.test.js",
            "# dist-test/test/connection-compat.test.js",
        )
    )
    _, commented_test_file_errors = evidence_execution_gates(
        root_package, commented_test_file
    )
    removed_headful_file = copy.deepcopy(workspace_packages)
    removed_headful_file["packages/api/package.json"]["scripts"]["test:parity:headful"] = (
        removed_headful_file["packages/api/package.json"]["scripts"]["test:parity:headful"].replace(
            "dist-test/test/browser-core-parity.test.js", ""
        )
    )
    removed_headful_sources, removed_headful_errors = evidence_execution_gates(
        root_package, removed_headful_file
    )
    removed_headful_semantic_errors = api_semantic_mapping_errors(
        semantic_mappings,
        upstream_targets,
        known_api_members,
        inventory_by_id,
        node_mappings,
        titles_by_source,
        execution_gates_by_source(removed_headful_sources),
    )
    misassigned_phase_inventory = copy.deepcopy(inventory_by_id)
    phase_test_id = next(
        test_id
        for entry in semantic_mappings
        for test_id in entry.get("testIds", [])
        if inventory_by_id[test_id].get("parameterization") == "headless0"
    )
    misassigned_phase_inventory[phase_test_id]["parameterization"] = "headless1"
    misassigned_phase_errors = api_semantic_mapping_errors(
        semantic_mappings,
        upstream_targets,
        known_api_members,
        misassigned_phase_inventory,
        node_mappings,
        titles_by_source,
        gates_by_source,
    )

    return {
        "removedApiSemanticMapping": rejected(
            missing_mapping, f"expected {EXPECTED_API_MAPPING_COUNT} API semantic mappings"
        ),
        "missingApiSemanticCoverage": rejected(missing_coverage, "API semantic coverage is missing"),
        "emptyApiSemanticCoverage": rejected(empty_coverage, "API semantic coverage is empty or invalid"),
        "unknownApiSemanticCoverage": rejected(unknown_coverage, "API semantic coverage contains an unknown dimension"),
        "unknownApiSemanticMember": rejected(unknown_member, "API semantic mapping has unknown Node API member"),
        "unknownApiSemanticCase": rejected(unknown_case, "API semantic test case must be uniquely registered"),
        "unknownApiSemanticTestId": rejected(unknown_id, "API semantic evidence is not a passing mapped test"),
        "duplicateApiSemanticCaseRegistration": rejected(
            semantic_mappings,
            "API semantic test case must be uniquely registered",
            candidate_titles=duplicate_titles,
        ),
        "permanentlySkippedZdapiIsNotEvidence": "PASS"
        if not permanent_skip_api_titles
        and rejected(
            semantic_mappings,
            "API semantic test case must be uniquely registered",
            candidate_titles=permanently_skipped_api_case,
        )
        == "PASS"
        else "FAIL",
        "unknownShorthandSkipIsNotEvidence": "PASS"
        if ineligible_options_are_rejected(unknown_shorthand_skip_titles)
        else "FAIL",
        "computedSkipPropertyIsNotEvidence": "PASS"
        if ineligible_options_are_rejected(computed_skip_titles)
        else "FAIL",
        "spreadOptionsAreNotEvidence": "PASS"
        if ineligible_options_are_rejected(spread_options_titles)
        else "FAIL",
        "genericUnknownOptionsAreNotEvidence": "PASS"
        if ineligible_options_are_rejected(generic_unknown_options_titles)
        else "FAIL",
        "mutatedZdapiOptionsAreRejected": "PASS"
        if typescript_test_source_rejected(API_MUTATED_OPTIONS_FIXTURE)
        else "FAIL",
        "aliasMutatedZdapiOptionsAreRejected": "PASS"
        if typescript_test_source_rejected(API_ALIAS_MUTATED_OPTIONS_FIXTURE)
        else "FAIL",
        "mutatedPhaseSkipIsRejected": "PASS"
        if typescript_test_source_rejected(API_MUTATED_PHASE_FIXTURE)
        else "FAIL",
        "ifWrappedOptionsMutationIsRejected": "PASS"
        if typescript_test_source_rejected(API_IF_MUTATION_FIXTURE)
        else "FAIL",
        "voidWrappedMutationCallIsRejected": "PASS"
        if typescript_test_source_rejected(API_WRAPPED_CALL_FIXTURE)
        else "FAIL",
        "genericUnsupportedEvidenceStatementIsRejected": "PASS"
        if typescript_test_source_rejected(API_UNSUPPORTED_STATEMENT_FIXTURE)
        else "FAIL",
        "nestedLoopOptionsMutationIsRejected": "PASS"
        if typescript_test_source_rejected(API_NESTED_LOOP_MUTATION_FIXTURE)
        else "FAIL",
        "nestedLoopPhaseMutationIsRejected": "PASS"
        if typescript_test_source_rejected(API_NESTED_PHASE_MUTATION_FIXTURE)
        else "FAIL",
        "unknownConstInitializerIsRejected": "PASS"
        if typescript_test_source_rejected(API_UNKNOWN_CONST_INITIALIZER_FIXTURE)
        else "FAIL",
        "postEvidenceNonEvidenceLoopRemainsAccepted": "PASS"
        if "ZDAPI-ELEMENT-ACTIONS-001" in typescript_test_titles(
            API_POST_EVIDENCE_LOOP_SOURCE
        )
        else "FAIL",
        "postEvidenceUnknownCallIsRejected": "PASS"
        if typescript_test_source_rejected(API_POST_EVIDENCE_CALL_FIXTURE)
        else "FAIL",
        "postEvidenceHiddenDuplicateIsRejected": "PASS"
        if typescript_test_source_rejected(API_POST_EVIDENCE_DUPLICATE_FIXTURE)
        else "FAIL",
        "splitTemplateOptionsMutationIsRejected": "PASS"
        if typescript_test_source_rejected(API_SPLIT_TEMPLATE_MUTATION_FIXTURE)
        else "FAIL",
        "splitTemplatePhaseMutationIsRejected": "PASS"
        if typescript_test_source_rejected(API_SPLIT_TEMPLATE_PHASE_FIXTURE)
        else "FAIL",
        "fakeJsonBuiltinImportIsRejected": "PASS"
        if typescript_test_source_rejected(API_FAKE_JSON_IMPORT_FIXTURE)
        else "FAIL",
        "fakeStringBuiltinImportIsRejected": "PASS"
        if typescript_test_source_rejected(API_FAKE_STRING_IMPORT_FIXTURE)
        else "FAIL",
        "runtimeCallIterableIsRejected": "PASS"
        if typescript_test_source_rejected(API_ITERABLE_EXIT_FIXTURE)
        else "FAIL",
        "mutatingCallIterableIsRejected": "PASS"
        if typescript_test_source_rejected(API_ITERABLE_MUTATION_FIXTURE)
        else "FAIL",
        "postEvidenceLoopRuntimeCallIsRejected": "PASS"
        if typescript_test_source_rejected(API_POST_EVIDENCE_LOOP_EXIT_FIXTURE)
        else "FAIL",
        "postEvidenceLoopHiddenDuplicateIsRejected": "PASS"
        if typescript_test_source_rejected(
            API_POST_EVIDENCE_LOOP_DUPLICATE_FIXTURE
        )
        else "FAIL",
        "todoTrueIsNotEvidence": "PASS"
        if "ZDAPI-TODO-TRUE" not in todo_options_titles
        else "FAIL",
        "todoStringIsNotEvidence": "PASS"
        if "ZDAPI-TODO-STRING" not in todo_options_titles
        else "FAIL",
        "phaseSkippedTodoIsNotEvidence": "PASS"
        if "ZDAPI-PHASE-TODO-TRUE" not in todo_options_titles
        else "FAIL",
        "unknownTodoIsNotEvidence": "PASS"
        if "ZDAPI-TODO-UNKNOWN" not in todo_options_titles
        else "FAIL",
        "todoFalseRemainsEvidenceEligible": "PASS"
        if todo_options_titles == ["ZDAPI-TODO-FALSE"]
        else "FAIL",
        "apiSemanticEvidenceOutsideExecutionGate": rejected(
            semantic_mappings,
            "API semantic evidence is not in an execution gate",
            candidate_gates=ungated,
        ),
        "removedApiEvidenceRootDelegation": "PASS"
        if any("missing root delegation" in error for error in removed_root_errors)
        and any("not in an execution gate" in error for error in removed_root_semantic_errors)
        else "FAIL",
        "removedApiEvidenceWorkspaceFile": "PASS"
        if not removed_workspace_errors
        and any("not in an execution gate" in error for error in removed_workspace_semantic_errors)
        else "FAIL",
        "fakeWorkspaceDelegationIsRejected": "PASS"
        if any("missing root delegation" in error for error in fake_workspace_errors)
        else "FAIL",
        "commentedWorkspaceDelegationIsRejected": "PASS"
        if any("unsupported shell syntax" in error for error in commented_delegation_errors)
        else "FAIL",
        "conditionalWorkspaceDelegationIsRejected": "PASS"
        if any("unsupported shell syntax" in error for error in conditional_delegation_errors)
        else "FAIL",
        "headlessGateRejectsHeadfulFlag": "PASS"
        if any("non-headful gate contains --headful" in error for error in headless_with_headful_errors)
        else "FAIL",
        "headfulGateRequiresHeadfulFlag": "PASS"
        if any("requires one leading --headful" in error for error in headful_without_headful_errors)
        else "FAIL",
        "headfulGateRejectsMisplacedHeadfulFlag": "PASS"
        if any("requires one leading --headful" in error for error in headful_with_misplaced_flag_errors)
        else "FAIL",
        "headfulGateRejectsDuplicateHeadfulFlag": "PASS"
        if any("requires one leading --headful" in error for error in headful_with_duplicate_flag_errors)
        else "FAIL",
        "evidenceGateRejectsExpectFailureFlag": "PASS"
        if any("invalid runner flags" in error for error in gate_with_expect_failure_errors)
        else "FAIL",
        "commentedWorkspaceTestFileIsRejected": "PASS"
        if any("unsupported shell syntax" in error for error in commented_test_file_errors)
        else "FAIL",
        "removedHeadfulApiEvidenceSource": "PASS"
        if not removed_headful_errors
        and any("required execution phase" in error for error in removed_headful_semantic_errors)
        else "FAIL",
        "misassignedApiEvidencePhase": "PASS"
        if any("phase does not match" in error for error in misassigned_phase_errors)
        else "FAIL",
    }


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
    inventory_cases_by_id = {case["id"]: case for case in cases}
    titles_by_source = node_test_titles_by_source()
    errors.extend(node_mapping_errors(cases, mappings, titles_by_source))
    for case_id, mapping in mappings.items():
        if inventory_by_id.get(case_id) != mapping:
            errors.append(f"generated Node test mapping differs from overlay for {case_id}")
    mapping_probes = node_mapping_mutation_probes(cases, mappings, titles_by_source)
    failed_mapping_probes = [name for name, status in mapping_probes.items() if status != "PASS"]
    if failed_mapping_probes:
        errors.append(f"Node test mapping mutation probes failed: {failed_mapping_probes}")
    matrix_report = transport_matrix_report(test_inventory)
    helper_spec = transport_helper_spec()
    errors.extend(transport_matrix_errors(test_inventory, matrix_report, helper_spec))
    matrix_probes = transport_matrix_mutation_probes(
        test_inventory, matrix_report, helper_spec
    )
    failed_matrix_probes = [
        name for name, status in matrix_probes.items() if status != "PASS"
    ]
    if failed_matrix_probes:
        errors.append(f"transport matrix mutation probes failed: {failed_matrix_probes}")
    if not api_inventory["upstream"]["rootExports"]:
        errors.append("Zendriver root API inventory is empty")
    if not api_inventory["upstream"]["coreModules"]:
        errors.append("Zendriver core API inventory is empty")
    if api_inventory.get("scope", {}).get("semanticStatus") != API_SEMANTIC_STATUS:
        errors.append("API inventory semantic status wording is not dimension-scoped")
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
    upstream_targets: dict[str, dict[str, Any]] = {
        f"zendriver.{item['name']}": item
        for item in api_inventory["upstream"]["rootExports"]
    }
    for module in modules:
        for symbol in module["symbols"]:
            symbol_path = f"{module['name']}.{symbol['name']}"
            upstream_targets[symbol_path] = symbol
            for member in symbol.get("members", []):
                upstream_targets[f"{symbol_path}.{member['name']}"] = member
    sources_by_gate, execution_gate_errors = evidence_execution_gates()
    errors.extend(execution_gate_errors)
    gates_by_source = execution_gates_by_source(sources_by_gate)
    errors.extend(
        api_semantic_mapping_errors(
            semantic_mappings,
            upstream_targets,
            known_api_members,
            inventory_cases_by_id,
            mappings,
            titles_by_source,
            gates_by_source,
        )
    )
    semantic_probes = api_semantic_mutation_probes(
        semantic_mappings,
        upstream_targets,
        known_api_members,
        inventory_cases_by_id,
        mappings,
        titles_by_source,
        gates_by_source,
    )
    failed_semantic_probes = [
        name for name, status in semantic_probes.items() if status != "PASS"
    ]
    if failed_semantic_probes:
        errors.append(f"API semantic mapping mutation probes failed: {failed_semantic_probes}")

    for entry in semantic_mappings:
        if not isinstance(entry, dict):
            continue
        upstream = entry.get("upstream")
        target = upstream_targets.get(upstream)
        evidence_keys = {key for key in ("testIds", "testCases") if key in entry}
        if target is None or len(evidence_keys) != 1:
            continue
        mapping = target["nodeMapping"]
        if mapping.get("status") != "VERIFIED":
            errors.append(f"API semantic target is not marked dimension-verified: {upstream}")
        if (
            mapping.get("evidence") != API_MAPPING_EVIDENCE
            or "semanticsVerified" in mapping
        ):
            errors.append(f"generated API semantic status wording is not dimension-scoped: {upstream}")
        expected_evidence = (
            {"evidenceTestIds": entry["testIds"]}
            if "testIds" in entry
            else {"evidenceCases": entry["testCases"]}
        )
        actual_evidence_keys = {
            key for key in ("evidenceTestIds", "evidenceCases") if key in mapping
        }
        if (
            mapping.get("nodeMember") != entry.get("nodeMember")
            or actual_evidence_keys != set(expected_evidence)
            or any(mapping.get(key) != value for key, value in expected_evidence.items())
        ):
            errors.append(f"generated API semantic mapping differs from overlay: {upstream}")
        if mapping.get("semanticsCoverage") != entry.get("verifiedSemantics"):
            errors.append(f"generated API semantic coverage differs from overlay: {upstream}")
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
    probes.update(matrix_probes)
    probes.update(semantic_probes)
    failed_probes = [name for name, status in probes.items() if status != "PASS"]
    if failed_probes:
        errors.append(f"mutation probes failed: {failed_probes}")
    return errors, fingerprints, probes


def validation_artifact(
    api_counts: dict[str, dict[str, int]],
    test_inventory: dict[str, Any],
    reference_observations: dict[str, Any],
    fingerprints: dict[str, str],
    probes: dict[str, str],
) -> dict[str, Any]:
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    node_mappings = json.loads(NODE_TEST_MAPPINGS.read_text(encoding="utf8"))
    sources_by_gate, _ = evidence_execution_gates()
    gates_by_source = execution_gates_by_source(sources_by_gate)
    evidence_sources = api_semantic_evidence_sources(semantic_mappings, node_mappings)
    matrix_report = transport_matrix_report(test_inventory)
    return {
        "status": "PASS",
        "errors": [],
        "testCases": test_inventory["caseCount"],
        "unmappedTestCases": sum(
            case["nodeParity"]["status"] == "UNMAPPED"
            for case in test_inventory["cases"]
        ),
        "notRunTestCases": sum(
            case["nodeParity"]["result"] == "NOT_RUN"
            for case in test_inventory["cases"]
        ),
        "transportMatrix": matrix_report["summary"],
        "apiMappingCounts": api_counts,
        "apiMappingsWithDeclaredSemanticDimensions": len(semantic_mappings),
        "apiSemanticDimensionCounts": api_semantic_dimension_counts(semantic_mappings),
        "apiSemanticEvidenceTestIdPhases": api_semantic_test_id_phase_counts(
            semantic_mappings, test_inventory
        ),
        "apiEvidenceSources": len(evidence_sources),
        "executionGatedApiEvidenceSources": len(
            evidence_sources.intersection(gates_by_source)
        ),
        "apiEvidenceExecutionGates": {
            source: gates_by_source.get(source, [])
            for source in sorted(evidence_sources)
        },
        "referenceObservationCount": len(reference_observations["observations"]),
        "fingerprints": fingerprints,
        "mutationProbes": probes,
    }


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
    expected_validation = validation_artifact(
        api_inventory["mappingCounts"],
        test_inventory,
        reference_observations,
        fingerprints,
        probes,
    )
    stored_validation = (PARITY / "validation.json").read_text(encoding="utf8")
    expected_report = report_markdown(
        baseline,
        api_inventory["mappingCounts"],
        test_inventory,
        reference_observations,
    )
    stored_report = (PARITY / "gap-report.md").read_text(encoding="utf8")
    expected_matrix_report = canonical_json_text(
        transport_matrix_report(test_inventory)
    )
    stored_matrix_report = (
        TRANSPORT_MATRIX_REPORT.read_text(encoding="utf8")
        if TRANSPORT_MATRIX_REPORT.is_file()
        else ""
    )
    errors.extend(
        generated_artifact_errors(
            stored_validation,
            stored_report,
            canonical_json_text(expected_validation),
            expected_report,
        )
    )
    if stored_matrix_report != expected_matrix_report:
        errors.append(
            "checked-in transport-matrix-report.json does not match recomputed executable declarations"
        )
    forged_validation = copy.deepcopy(expected_validation)
    forged_validation["status"] = "FORGED"
    forged_validation_text = canonical_json_text(forged_validation)
    whitespace_forged_validation = canonical_json_text(expected_validation).replace(
        "{\n", "{ \n", 1
    )
    forged_report = expected_report.replace(
        "it is not a claim of complete semantic equivalence",
        "it claims complete semantic equivalence",
    )
    artifact_probes = {
        "forgedValidationStatusArtifact": "PASS"
        if generated_artifact_errors(
            forged_validation_text,
            expected_report,
            canonical_json_text(expected_validation),
            expected_report,
        )
        else "FAIL",
        "forgedGenericReportClaim": "PASS"
        if generated_artifact_errors(
            canonical_json_text(expected_validation),
            forged_report,
            canonical_json_text(expected_validation),
            expected_report,
        )
        else "FAIL",
        "whitespaceOnlyValidationArtifactMutation": "PASS"
        if generated_artifact_errors(
            whitespace_forged_validation,
            expected_report,
            canonical_json_text(expected_validation),
            expected_report,
        )
        else "FAIL",
    }
    failed_artifact_probes = [
        name for name, status in artifact_probes.items() if status != "PASS"
    ]
    if failed_artifact_probes:
        errors.append(f"generated artifact mutation probes failed: {failed_artifact_probes}")
    refresh_probes = isolated_transport_refresh_mutation_probes()
    failed_refresh_probes = [
        name for name, status in refresh_probes.items() if status != "PASS"
    ]
    if failed_refresh_probes:
        errors.append(
            f"transport refresh mutation probes failed: {failed_refresh_probes}"
        )
    mappings = json.loads(NODE_TEST_MAPPINGS.read_text(encoding="utf8"))
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    titles_by_source = node_test_titles_by_source()
    registered_ids = bound_node_test_ids(mappings, titles_by_source)
    sources_by_gate, _ = evidence_execution_gates()
    gates_by_source = execution_gates_by_source(sources_by_gate)
    evidence_sources = api_semantic_evidence_sources(semantic_mappings, mappings)
    gated_evidence_sources = evidence_sources.intersection(gates_by_source)
    declared_coverage = sum(
        isinstance(entry.get("verifiedSemantics"), list)
        and bool(entry["verifiedSemantics"])
        for entry in semantic_mappings
    )
    print(f"Validation-only: {'PASS' if not errors else 'FAIL'}")
    print(f"Node test registrations: {len(registered_ids)}/{EXPECTED_TEST_COUNT}")
    print(f"Node test sources scanned: {len(titles_by_source)}")
    print(
        "Transport matrix: "
        f"{expected_validation['transportMatrix']['applicable']} applicable, "
        f"{expected_validation['transportMatrix']['notApplicable']} not applicable, "
        f"{expected_validation['transportMatrix']['declaredQuadrantExecutions']} declared quadrant executions"
    )
    print(
        "API semantic coverage declarations: "
        f"{declared_coverage}/{EXPECTED_API_MAPPING_COUNT}; "
        f"dimensions {json.dumps(api_semantic_dimension_counts(semantic_mappings), sort_keys=True)}"
    )
    print(
        "API evidence sources in execution gates: "
        f"{len(gated_evidence_sources)}/{len(evidence_sources)}"
    )
    print(
        "API semantic ZDTEST evidence phases: "
        f"{json.dumps(api_semantic_test_id_phase_counts(semantic_mappings, test_inventory), sort_keys=True)}"
    )
    print(f"Fingerprints: {json.dumps(fingerprints, sort_keys=True)}")
    print(f"Mutation probes: {json.dumps(probes, sort_keys=True)}")
    print(f"Artifact mutation probes: {json.dumps(artifact_probes, sort_keys=True)}")
    print(f"Transport refresh mutation probes: {json.dumps(refresh_probes, sort_keys=True)}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)


def generated_artifact_errors(
    stored_validation: str,
    stored_report: str,
    expected_validation: str,
    expected_report: str,
) -> list[str]:
    errors = []
    if stored_validation != expected_validation:
        errors.append("checked-in validation.json does not match recomputed validation")
    if stored_report != expected_report:
        errors.append("checked-in gap-report.md does not match recomputed report")
    return errors


def refresh_derived_artifacts() -> None:
    baseline = json.loads((PARITY / "baseline.json").read_text(encoding="utf8"))
    api_inventory = json.loads((PARITY / "api-inventory.json").read_text(encoding="utf8"))
    test_inventory = json.loads((PARITY / "test-inventory.json").read_text(encoding="utf8"))
    reference_observations = json.loads(
        (PARITY / "reference-observations.json").read_text(encoding="utf8")
    )
    errors, fingerprints, probes = validate(
        baseline, api_inventory, test_inventory, reference_observations
    )
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
    write_json("transport-matrix-report.json", transport_matrix_report(test_inventory))
    write_json(
        "validation.json",
        validation_artifact(
            api_inventory["mappingCounts"],
            test_inventory,
            reference_observations,
            fingerprints,
            probes,
        ),
    )
    (PARITY / "gap-report.md").write_text(
        report_markdown(
            baseline,
            api_inventory["mappingCounts"],
            test_inventory,
            reference_observations,
        ),
        encoding="utf8",
    )
    print("Derived parity artifacts: refreshed")


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
    dimension_counts = api_semantic_dimension_counts(semantic_mappings)
    node_mappings = json.loads(NODE_TEST_MAPPINGS.read_text(encoding="utf8"))
    sources_by_gate, _ = evidence_execution_gates()
    gates_by_source = execution_gates_by_source(sources_by_gate)
    evidence_sources = api_semantic_evidence_sources(semantic_mappings, node_mappings)
    test_id_phase_counts = api_semantic_test_id_phase_counts(
        semantic_mappings, test_inventory
    )
    matrix_summary = transport_matrix_report(test_inventory)["summary"]
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
        f"- API mapping statuses: {json.dumps(api_counts, sort_keys=True)}",
        f"- API mappings with execution-gated evidence for explicitly listed dimensions: {len(semantic_mappings)}/{EXPECTED_API_MAPPING_COUNT}",
        f"- Listed semantic dimension counts: {json.dumps(dimension_counts, sort_keys=True)}",
        f"- API evidence source files present in root/parity execution gates: {len(evidence_sources.intersection(gates_by_source))}/{len(evidence_sources)}",
        f"- Phase-bound ZDTEST evidence IDs: {json.dumps(test_id_phase_counts, sort_keys=True)}",
        f"- Transport-applicable cases with explicit JS/native × direct/flattened declarations: {matrix_summary['applicable']}",
        f"- Transport non-applicable cases with executable per-case reasons: {matrix_summary['notApplicable']}",
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
        "`VERIFIED` on an API mapping claims only the exact dimensions in that mapping's `semanticsCoverage`; it is not a claim of complete semantic equivalence. `CANDIDATE` means only that a runtime export or public TypeScript declaration has an equivalent name. `UNKNOWN`, `MISSING`, `UNMAPPED`, and `NOT_RUN` remain blocking gaps for PAR-001/PAR-002.",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    if sys.argv[1:] == ["--validate-only"]:
        validate_existing()
        return
    if sys.argv[1:] == ["--refresh-derived"]:
        refresh_derived_artifacts()
        return
    if sys.argv[1:]:
        raise SystemExit("Usage: parity/generate.py [--validate-only|--refresh-derived]")
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
            "semanticStatus": API_SEMANTIC_STATUS,
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
    if errors:
        print("Validation: FAIL")
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
    semantic_mappings = json.loads(API_SEMANTIC_MAPPINGS.read_text(encoding="utf8"))
    validation = validation_artifact(
        api_counts,
        test_inventory,
        reference_observations,
        fingerprints,
        probes,
    )

    write_json("baseline.json", baseline)
    write_json("test-inventory.json", test_inventory)
    write_json("api-inventory.json", api_inventory)
    write_json("transport-matrix-report.json", transport_matrix_report(test_inventory))
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
    semantic_count = len(semantic_mappings)
    print(
        f"API mapping: {json.dumps(api_counts, sort_keys=True)}; "
        f"{semantic_count}/{EXPECTED_API_MAPPING_COUNT} mappings have dimension-scoped evidence"
    )
    print(f"Validation: {validation['status']}")


if __name__ == "__main__":
    main()

# Modernization handoff package

Build a compact package that lets another reviewer or agent continue without reconstructing the conversation.

## Required contents

```text
00-summary
01-selected-mode-and-decisions
02-source-target-and-excluded-boundaries
03-contract-and-truth-matrix
04-readiness-and-parity-status
05-changed-modules-or-artifacts
06-tests-gates-and-latest-logs
07-external-blockers
08-rollback-or-removal
09-continuation-prompt
manifest-and-hashes
```

Use existing project-native names and locations when they already provide the same information. Do not duplicate a second truth source only to match this list.

## Include

- selected modernization mode and target readiness
- accepted scope, non-goals, and approved breaks
- current architecture and contract decisions
- changed source, tests, migrations, scripts, and docs
- latest passing and failing evidence
- skipped or not-run checks
- current readiness per slice
- external dependencies and exact unblock condition
- rollback, cleanup, and removal instructions
- a copy-ready continuation prompt with current state and constraints

## Exclude

- credentials, tokens, private keys, or secret values
- real customer or production data unless a separately protected transfer is authorized
- dependency caches and the full build-output tree
- unrelated source modules
- stale logs that no longer represent the candidate
- private history or internal identifiers in a public extraction

Keep source/review material separate from a protected credential package. Give each package its own audience, permissions, manifest, and lifecycle.

## Manifest

Record:

- package name and purpose
- source version, snapshot, or file baseline
- creation time and timezone
- included and excluded paths
- evidence freshness
- known incomplete areas
- file count and archive size
- archive digest
- intended recipient and confidentiality level

Verify archive integrity after creation and verify the digest again after transfer or remote download.

## Continuation prompt

The prompt should state:

```text
Outcome and selected mode
Writable workspace
Read-only and excluded workspaces
Truth and contract sources to read first
Current readiness and target readiness
Completed batches
Current failure buckets
Commands or evidence entry points
Actions that require new approval
Explicitly canceled or abandoned objectives
Expected final output
```

## Proof without Git

When the workspace is not a Git repository, use:

- deterministic file inventory
- content hashes
- source maps or module manifests
- test and gate logs
- build artifact identity
- archive manifest and digest
- runtime or API readback when authorized

State that Git diff evidence is unavailable; do not imply a clean branch or commit boundary.

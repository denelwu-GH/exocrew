# Extraction scope matrix

Use this reference when turning a private or application-specific system into a reusable core, public starter, library, plugin, template, or framework.

## Classify every capability

| Decision | Meaning | Acceptance rule |
|---|---|---|
| Keep | The capability is broadly useful and its invariant belongs in the reusable core | Preserve the observable invariant and prove it with public tests |
| Simplify | The outcome is useful but the private implementation or compatibility burden is not | Define the smaller public contract and make the approved break explicit |
| Pluginize | The capability is valuable only for some adopters or requires private/provider-specific integration | Publish a stable extension boundary plus one synthetic example |
| Exclude | The capability, data, history, or infrastructure is private, unsafe, or outside the public promise | Remove it from code, docs, fixtures, history, and acceptance claims |

Do not leave a source capability unclassified. “Not copied yet” is not a scope decision.

## Build the module boundary table

| Source module or responsibility | Retained capability | Simplified capability | Plugin interface | Excluded scope | States and actions | Reverse or cancel path | Audit need | UI surface | Acceptance evidence |
|---|---|---|---|---|---|---|---|---|---|
| Example capability | Core invariant | Approved smaller contract | Optional adapter seam | Private provider and data | Allowed and blocked transitions | Undo, disable, or removal path | Actor, reason, time | Public entry point or none | Contract test plus synthetic workflow |

Replace the example with one row per source responsibility. Record “none” explicitly rather than leaving a cell ambiguous.

## Protect the publication boundary

- Start from a clean target without private Git history.
- Use synthetic names, identifiers, fixtures, screenshots, domains, and examples.
- Remove credentials, internal endpoints, account identifiers, infrastructure paths, customer data, and operational topology.
- Scan code, documentation, assets, generated files, package metadata, and release artifacts.
- Keep extension interfaces generic; do not disguise a private integration with renamed constants.
- Do not claim parity for Simplify or Exclude decisions. Prove the declared public contract instead.

## Close extraction

Require all of the following before calling the extraction publishable:

- every source responsibility is classified;
- retained invariants have public tests;
- simplified contracts and excluded scope are documented;
- plugin boundaries have a minimal synthetic example;
- install or bootstrap works in a clean directory;
- public-boundary scanning returns no private identity, data, path, credential, or history leak;
- the release artifact matches the reviewed target commit.

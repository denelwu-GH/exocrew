# Release checklist

## Before the window

- Candidate commit is clean and identified.
- Change class and affected modules are declared.
- Required tests and gates are green.
- Configuration and migration readiness are checked.
- Acceptance slice and rollback are written down.
- Operator and target account/environment are confirmed.

## During the window

- Execute only preflight, deploy, post-verification, and declared acceptance.
- Record artifact identity and timestamps.
- Stop on gate failure or version mismatch.
- Do not add code fixes, data repairs, or unrelated investigations.

## After deploy

- Verify health and artifact identity.
- Verify migration state and critical dependencies.
- Run the declared acceptance slice.
- Check logs or monitoring for the affected path.
- Decide accept or rollback.
- Record residual risk and follow-up separately.

## Publication release

- Public tree passes secret and private-identifier scans.
- License, version, description, and installation instructions agree.
- Tag and release point to the intended commit.
- A clean clone can repeat validation and installation.

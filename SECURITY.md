# Security policy

ExoCrew contains governance instructions, templates, and local scripts. It does not require network credentials and should never collect project secrets.

## Report a vulnerability

Open a private GitHub security advisory for vulnerabilities involving unsafe file writes, path traversal, accidental secret exposure, destructive defaults, or misleading validation.

Do not include real credentials or private production data in reports. Use synthetic examples.

## Safety defaults

- Installation and bootstrap scripts default to dry-run.
- Existing files are not overwritten without explicit `--force`.
- Forced replacements are backed up before write.
- Operational guidance requires explicit scope, rollback, and post-verification.
- Templates never grant an AI agent production credentials or unsupervised write authority.

# Security Policy

## Supported Versions

Security fixes are accepted for the current default branch and the latest deployed frontend release derived from it. Older experimental branches, forks, generated build artifacts, and abandoned preview deployments are not covered unless a maintainer explicitly marks them as supported.

## Reporting a Vulnerability

Please do not open a public issue for a suspected vulnerability before the maintainers have had time to review it.

Preferred reporting channels:

- Use GitHub private vulnerability reporting when it is enabled for this repository.
- If private reporting is unavailable, contact the project maintainers through the organization profile and include a clear security subject line.

A useful report should include:

- Affected page, component, API integration, wallet flow, or deployment environment.
- Impact assessment, including whether user funds, wallet signing, authentication, or private data can be affected.
- Reproduction steps, browser and wallet details, and a minimal proof of concept when possible.
- Whether the issue has been disclosed anywhere else.
- Suggested remediation if you have one.

## Response Timeline

The maintainers aim to acknowledge valid reports within 3 business days and provide an initial triage update within 10 business days. Public disclosure should wait until a fix is merged and users have had reasonable time to upgrade, redeploy, or refresh the affected frontend unless active exploitation requires a faster coordinated notice.

## Scope

In scope:

- Wallet connection, signing prompts, transaction construction, and C-address funding flows.
- Frontend handling of quotes, bridge requests, provider redirects, and webhook-visible statuses.
- Authentication, session handling, API key exposure, and environment configuration that can affect production users.
- UI defects that could mislead users into sending funds to the wrong destination or signing an unintended transaction.

Out of scope:

- Social engineering, spam, denial-of-service against third-party infrastructure, or physical attacks.
- Vulnerabilities that require leaked private keys, compromised maintainer accounts, malicious browser extensions, or malicious forks.
- Reports based only on automated scanner output without a concrete exploit path.
- Issues in dependencies that do not affect this repository's deployed behavior.

## Safe Harbor

Good-faith research that stays within the scope above, avoids privacy violations, and does not move or lock user funds without permission will be treated as authorized security research. Stop testing and report immediately if you encounter live funds, secrets, or personal data.

## Bug Bounty Information

This repository may use issue-specific rewards or external bounty programs. Unless a bounty is explicitly attached to an issue or announced by maintainers, submitting a report does not guarantee payment.

## Recognition

Reporters who provide actionable, coordinated disclosures may be credited in release notes, advisories, or the related pull request unless they request anonymity.

# Agent Note: Fork Git market publication

Status: implemented

## Problem

The earlier fork release-channel decision used a GitHub Release artifact and a
separate package branch. DSH installs Git
packages through pnpm, which blocks package build scripts until each exact Git
source is added to the profile's `allowBuilds` list. A direct source install
must therefore include the built files and run no install-time build.

## Decision

Commit `packages/dsh-plugin/lib` with its source, publish the source commit
under an append-only `v<version>` tag, and list that commit with the package
path in the market index. DSH installs the package directly from that Git
subdirectory without running build scripts. Main-branch CI and
`pnpm verify:release` remain the quality gates; no separate package branch,
tarball, GitHub Release, or npm publication is used.

## Alternatives considered

- Keep a separate release branch and tarball: that duplicates files and gives
  market installation a different commit from the maintained source.
- Install source with a `prepack` build: pnpm 11 blocks the Git package until a
  version-specific build-script allowlist entry is added to the profile.

## Consequences

The source commit and installable package are the same. Every market entry
records the immutable commit and `packages/dsh-plugin` path. Maintainers rebuild
and review `lib/` with source changes; the Git install needs no build approval.
The publication no longer provides a tarball checksum or release manifest;
installation integrity comes from the Git commit and the market's fixed SHA.

## Verification

The `v0.1.30` source passed `pnpm verify:release`; its GitHub Release workflow
was cancelled before publication. A temporary pnpm project installed its Git
subdirectory after the version-specific `allowBuilds` entry was added, proving
that relying on an install-time build would require profile changes. The
`0.1.31` source-tag install is checked separately before updating the market.

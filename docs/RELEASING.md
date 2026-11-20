# Release process

`@winterhuan/oh-story-dsh` is distributed as a prebuilt tarball through GitHub
Releases. npm is an optional channel, enabled by the repository variable
`PUBLISH_NPM=true` after its credentials are configured. A release is created
only from a `v<package-version>` tag.

## Upstream update issues

`.github/workflows/upstream-updates.yml` runs daily and opens one
`upstream-update` issue per new release of a bundled Skill suite (any GitHub
release ahead of the pinned manifest commit) or of DeepSeek Harness (any npm
dist-tag outside the plugin's declared range). Each issue includes the sync
checklist. Closing an issue declines that version permanently without reopening
it. Run `pnpm upstream:updates` locally for a dry run.

## One-time npm setup

Leave `PUBLISH_NPM` unset for GitHub-only releases. To enable npm, the account
used for the first publication must be allowed to publish the
public `@winterhuan/oh-story-dsh` package. Store a granular publish token as the repository
secret `NPM_TOKEN`; never commit it or put it in an issue, workflow file, or
release note. Then set the repository variable `PUBLISH_NPM=true`.

After the first publication, configure npm Trusted Publishing for:

- repository: `winterhuan/oh-story-dsh`
- workflow: `release.yml`

The release workflow requests an OpenID Connect token and publishes with
provenance. Once Trusted Publishing is verified, remove the long-lived
`NPM_TOKEN` secret.

## Cut a release

1. Update the root and package versions, installation examples, and
   `CHANGELOG.md`.
2. Run `pnpm verify:release` locally. Keep fresh packaged Chrome E2E runs on
   the default DSH `0.2.2-rc.1` line, the `0.2.0-rc.2` compatibility line, and
   the `0.2.2` trial line (`0.2.2-rc.3` via `pnpm test:dsh:next`, included in
   local `verify:release`); never claim support for a host line from peer
   ranges or unit tests alone.
3. Merge the release PR into `main` once all four required CI checks pass, then
   wait for the `main` push CI run on that exact merge commit to pass all four
   jobs.
4. Create and push the matching `v<package-version>` tag on that verified
   commit.

`release.yml` then:

1. repeats the complete verification suite;
2. builds and inspects a clean installable tarball;
3. checks that the tag and package version match;
4. uploads the tarball and SHA-256 checksum to a GitHub Release;
5. when `PUBLISH_NPM=true`, publishes the identical tarball to npm with provenance.

`RELEASE-MANIFEST.json` records the source commit, tool versions, tarball byte
size, SHA-256, and npm SHA-512 `dist.integrity`. Separate CI and promotion
proofs bind the CI run/attempt and release run/attempt to that manifest and
artifact name so retries never alter the published tarball bytes. Downstream
publisher jobs download the exact `artifact-id` from `verify` and compare
independent SHA-256 job outputs for the manifest, promotion proof, and CI proof
before exposing any write credential, blocking coordinated artifact replacement.

Both channels are append-only:

- **GitHub Releases**: missing assets upload cleanly, byte-identical assets are
  accepted on retry, and byte mismatches fail the job (`--clobber` is never
  used and partial releases are never deleted).
- **npm**: unpublished versions publish, matching `dist.integrity` skips cleanly
  on retry, and integrity mismatches fail. HTTP `401`/`403`/`429`/`5xx` and
  network errors fail immediately rather than being treated as missing versions.

Before either publisher writes, the source gate re-resolves the tag, verifies the public `winterhuan/oh-story-dsh` repository and protected `main`, checks source ancestry and the newest exact-SHA main CI, then re-fetches the selected run to reject concurrent reruns.

After publication, the workflow anonymously downloads and checks the GitHub
assets and installs the public tarball with lifecycle scripts disabled. When
npm is enabled, it also waits a bounded time for registry propagation, compares
`dist.integrity`, and installs the exact public npm version instead. A timeout
or enabled-channel mismatch leaves the workflow red.

## Dry-run and failure outcomes

Manual `workflow_dispatch` runs are allowed only on `main`. They execute the
source/CI checks, full verification suite, and artifact build without running
the GitHub or npm publish jobs. Pull requests never receive release write or
OIDC permissions.

Tag builds check all release invariants up front: a stable `vX.Y.Z` tag,
matching root and plugin versions, a dated `CHANGELOG.md` heading, ancestry on
`main`, and a green latest-attempt `CI` push run for that exact SHA across all
four required jobs.

If one channel succeeds and the other fails transiently, do not delete or
overwrite the published channel. Fix the transient issue or credential and
re-run the failed workflow: the completed channel verifies byte identity and
skips while the remaining channel finishes. Any moved tag, altered tarball,
changed npm integrity, missing CI job, or superseded CI attempt is a hard stop
that requires investigation rather than overwriting published artifacts.

## Verify the public installation

For GitHub-only releases, use the public tarball installation below. When npm
is enabled, do not announce npm availability until the registry reports the
exact version:

```bash
VERSION=0.1.30
npm view "@winterhuan/oh-story-dsh@$VERSION" version dist.integrity
npx -y --package pnpm@11.7.0 --package @deepseek-ai/dsh@0.2.2-rc.1 dsh plugin --profile web add "@winterhuan/oh-story-dsh@$VERSION"
```

After the default `0.2.2-rc.1` smoke passes, repeat the isolated install and
browser check on `@deepseek-ai/dsh@0.2.0-rc.2` and
`@deepseek-ai/dsh@0.2.2-rc.3`; never mix DSH versions inside a single profile.

The GitHub Release tarball provides a registry-independent install path:

```bash
npx -y --package pnpm@11.7.0 --package @deepseek-ai/dsh@0.2.2-rc.1 dsh plugin --profile web add "https://github.com/winterhuan/oh-story-dsh/releases/download/v$VERSION/winterhuan-oh-story-dsh-$VERSION.tgz"
```

## Plugin market Git package

The DSH market accepts npm or fixed Git commits. For GitHub-only releases,
create the installable `dsh-release` branch from the verified public tarball,
with the package at its root. Keep every runtime file byte-identical; remove
source-only `scripts`, `devDependencies` and `repository.directory` from the
package manifest so a Git install needs no build toolchain. Include the public
`RELEASE-MANIFEST.json` to identify the source commit and original tarball.

Commit the package, push the append-only `dsh-v<version>` tag, and test a remote
Git install in an isolated DSH home before adding that exact Git commit to the
plugin market. The source `v<version>` tag remains at the CI-verified main
commit; neither tag moves after publication.

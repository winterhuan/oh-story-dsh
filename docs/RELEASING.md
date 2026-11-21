# Release process

`@winterhuan/oh-story-dsh` is installed from the source repository. The
`packages/dsh-plugin/lib` build output is committed with the source, so DSH can
install the package directory without running a build script. The plugin market
records the exact source commit and package path. This fork does not publish an
independent package, GitHub Release, or npm version.

## Upstream update issues

`.github/workflows/upstream-updates.yml` runs daily and opens one
`upstream-update` issue per new release of a bundled Skill suite or of
DeepSeek Harness. Each issue includes the sync checklist. Closing an issue
declines that version permanently without reopening it. Run
`pnpm upstream:updates` locally for a dry run.

## Cut a release

1. Update the root and package versions, installation examples, and
   `CHANGELOG.md`.
2. Run `pnpm verify:release`, which builds the plugin and runs the deterministic
   checks and packaged DSH Web integration on the supported host lines. Review
   the generated `packages/dsh-plugin/lib` changes.
3. Commit the source and `lib/` together. Merge the PR into `main` after its
   required CI passes, then wait for the exact main commit's CI to pass.
4. Create and push the append-only tag `v<package-version>` on that main commit.
5. Install the exact tag in an isolated DSH profile:

   ```bash
   dsh plugin --profile release-check add \
     "git+https://github.com/winterhuan/oh-story-dsh.git#v<package-version>&path:/packages/dsh-plugin"
   ```

   Check the synthesized plugin configuration and the DSH Web smoke before
   publishing the market entry.
6. Add the version to the market `index.json` with the source commit, package
   path, DSH engine range, and UTC publish timestamp. Commit and push the market
   `gh-pages` worktree.

Never move a published tag or point the market at a branch name when a commit
SHA is available. The source tag and market entry must refer to the same commit.

## Remote installation

The fixed Git package can be installed directly without the market:

```bash
dsh plugin --profile web add \
  "git+https://github.com/winterhuan/oh-story-dsh.git#v<package-version>&path:/packages/dsh-plugin"
```

Use the same DSH version for installation and startup. The default supported
line is `@deepseek-ai/dsh@0.2.2-rc.1`; compatibility checks also cover
`0.2.0-rc.2` and `0.2.2-rc.3`. Keep each DSH version in its own profile when
testing compatibility.

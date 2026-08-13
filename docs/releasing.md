# Releasing Guanine and jsdriver

Guanine uses Changesets to turn unreleased changes on `dev` into version and
changelog updates. After those changes reach `main`,
`.github/workflows/release.yml` selects one of two paths:

- when changesets are present, it creates or updates the Version PR;
- after the Version PR is merged, it packs the versioned packages and publishes
  the exact tarballs to npm, then creates matching Git tags and GitHub Releases.

CI runs typecheck, tests, build, and package-content checks on pull requests and
pushes to `dev` or `main`. Publishing uses GitHub-hosted runners because npm
Trusted Publishing does not support self-hosted runners.

## One-time owner setup

The first version of each package must be published by an npm owner before a
Trusted Publisher can be attached. Publish the supporting packages first, then
`guanine`, and finally the `jsdriver` compatibility package because it depends
on `guanine`. Configure every package on npmjs.com with these values:

| npm field | Value |
| --- | --- |
| Publisher | GitHub Actions |
| Organization or user | `vertile-ai` |
| Repository | `jsdrive` |
| Workflow filename | `release.yml` |
| Environment name | Leave empty |
| Allowed actions | `npm publish` |

Enter only `release.yml`, not `.github/workflows/release.yml`. A repository
administrator must also enable **Allow GitHub Actions to create and approve
pull requests** under **Settings -> Actions -> General**.

## Preparing a change

Add one changeset for a user-visible package change:

```sh
npm run changeset
```

Commit the generated `.changeset/*.md` file with the change. Merge completed
development from `dev` to `main`, review and merge the Version PR, and let the
next `main` run publish. Do not edit package versions or generated changelog
entries by hand before the Version PR.

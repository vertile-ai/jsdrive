# Changesets

Add one changeset for every user-visible change to a published package:

```sh
npm run changeset
```

Development lands on `dev` and is merged to `main`. The release workflow turns
pending changesets on `main` into a Version PR. Merging that PR publishes the
exact packed packages to npm and creates matching Git tags and GitHub Releases.

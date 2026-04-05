# Nubium Community Plugins

Plugin registry for the [Nubium](https://github.com/nth-chile/nubium) music notation editor.

## Submitting a plugin

Open a PR that adds a directory under `plugins/` with:

```
plugins/your-plugin-id/
  plugin.json    # manifest
  src/           # source code
  dist/
    index.js     # bundled plugin
```

See `CLAUDE.md` for the full spec. All submissions are automatically reviewed before merging.

## Updating a plugin

Submit a PR that bumps the `version` in your plugin's `plugin.json` and updates the `dist/` bundle. The same automated review runs on every update — version bumps are required.

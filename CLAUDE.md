# Nubium Plugin Registry

This repo is the community plugin registry for [Nubium](https://github.com/nth-chile/nubium), a music notation editor. Plugins are submitted as PRs and automatically reviewed before merging.

## Plugin structure

Each plugin lives in `plugins/<plugin-id>/` with this layout:

```
plugins/my-plugin/
  plugin.json       # required — manifest
  src/
    index.ts        # required — plugin source (TypeScript)
  dist/
    index.js        # required — bundled output (single file, no external imports)
```

## plugin.json manifest

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "What the plugin does",
  "author": "Your Name",
  "minAppVersion": "0.1.0",
  "main": "dist/index.js",
  "permissions": []
}
```

Fields:
- `id` — unique identifier, lowercase with hyphens, must match directory name
- `name` — display name
- `version` — semver, must be bumped on every update
- `description` — one-line description
- `author` — author name or GitHub username
- `minAppVersion` — minimum Nubium version required
- `main` — path to the bundled entry point
- `permissions` — array of permissions the plugin requires: `["score-read", "score-write", "network", "storage"]`

## Plugin API

Plugins implement the `NubiumPlugin` interface and receive a `PluginAPI` when activated:

```typescript
interface NubiumPlugin {
  id: string;
  name: string;
  version: string;
  description?: string;
  activate(api: PluginAPI): void;
  deactivate?(): void;
}
```

### Available API methods

**Score access (read-only):**
- `getScore()` — returns a clone of the current score
- `getSelection()` — current selection or null
- `getCursorPosition()` — current cursor position

**Score mutation:**
- `applyScore(newScore)` — replace the score document (supports undo/redo)

**Commands & shortcuts:**
- `registerCommand(id, label, handler)` — add to the command palette
- `registerShortcut(keys, commandId)` — bind a keyboard shortcut

**UI:**
- `registerPanel(id, config)` — add a panel (sidebar-left, sidebar-right, toolbar, bottom)
- `registerView(id, config)` — add a custom view mode
- `registerSettings(component)` — add plugin settings UI
- `showNotification(message, type?)` — show a toast (info, error, success)

**Import/export:**
- `registerImporter(id, config)` — register a file format importer
- `registerExporter(id, config)` — register a file format exporter

**Playback & storage:**
- `registerPlaybackService(service)` — replace the default playback engine
- `serialize(score)` / `deserialize(text)` — JSON conversion helpers
- `getStorage<T>(key)` / `setStorage<T>(key, value)` — plugin-scoped persistent storage

## Architecture context

Nubium is document-driven. The entire score is a single serializable object. `applyScore()` replaces the document and goes through the command system for undo/redo. Plugins cannot directly modify app state (cursor, settings, view mode) — only the score document.

The app is built with React, TypeScript, Tauri v2, Zustand, and VexFlow 5.

## Submitting a plugin

1. Create `plugins/<your-plugin-id>/` with the structure above
2. Source must be included in `src/` — the review process reads source, not the bundle
3. `dist/index.js` must be a single self-contained bundle (no external imports)
4. Open a PR — automated review will check for:
   - Valid manifest
   - No `eval()`, `Function()`, or dynamic code execution
   - No undeclared network requests
   - No access to localStorage keys outside plugin scope
   - No credential harvesting patterns
   - Source and bundle consistency

## Updating a plugin

- Bump `version` in `plugin.json` (required — same version will be rejected)
- Update source and bundle
- Open a PR — the review runs on the diff, checking that changes match the stated update

## Rules

- Plugins must not access user data beyond what their declared permissions allow
- Plugins must not make network requests unless they declare the `network` permission
- Plugins must not interfere with other plugins or core app functionality
- Malicious plugins will be removed and the author banned

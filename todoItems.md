# Todo Items

Deferred items to address before / after the v1.0 release.

## Docs site

- [ ] Fix GitHub links in footer and navbar — replace placeholder `https://github.com` with actual repo URL once published
- [ ] Set up SPA routing fallback for the docs-site deployment (e.g. Vercel `verw.json` rewrite or Netlify `_redirects`) so hard-refreshing a `/docs/*` route doesn't 404
- [ ] Confirm CDN URL in "Installation" section once package is published to npm and available on unpkg/jsDelivr
- [ ] Audit all internal `<Link to="/docs/...">` targets in the footer — several point to pages that don't exist yet (compatibility, performance, dynamic-dom)
- [ ] Add OpenGraph image (`og:image`) meta tag to docs-site for rich link previews

## Package / distribution

- [ ] Update `repository.url`, `homepage`, and `bugs.url` in `package.json` with the real GitHub repo URL after creating it
- [ ] Set up GitHub Actions CI: lint + test on push/PR
- [ ] Add a CHANGELOG.md before the first public release
- [ ] Evaluate whether `dotenv` dependency in root `package.json` is actually needed at runtime or should move to devDependencies

## Library features

- [ ] `peer` variant for peer-based state (`:peer-hover`, `:peer-focus`)
- [ ] `before:` / `after:` pseudo-element utilities
- [ ] `container` utility with per-breakpoint max-widths
- [ ] Programmatic `purge()` API to reset all registered entries (responsive, dark, group) without a full page reload
- [ ] Support `prefers-reduced-motion` via a `motion-safe:` / `motion-reduce:` modifier

## Testing

- [ ] Add end-to-end browser tests (Playwright) for state/hover/dark-mode interactions
- [ ] Add test coverage for `structural.ts` modifiers (`disabled:`, `first:`, `last:`, etc.)

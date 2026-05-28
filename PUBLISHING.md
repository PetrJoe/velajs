# Publishing to npmjs

## Requirements
- An npm account with publish access to this package name.
- Either:
  - npm login on this machine, or
  - a granular `NPM_TOKEN` with publish permission and 2FA bypass enabled.

## Local publish
```bash
npm login
npm publish --tag latest
```

## CI / token-based publish
1. Create a granular access token on npmjs.
2. Enable publish access and 2FA bypass if required.
3. Set `NPM_TOKEN` in your CI secret store.
4. Copy `.npmrc.example` to `.npmrc` or inject the token directly in CI.
5. Run:
```bash
npm publish --tag latest
```

## Notes
- The package is configured as `public` in `publishConfig`.
- The tarball excludes `.env`, build output, and archive files through `.npmignore` and the `files` allowlist.

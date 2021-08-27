# license-checker-action

This package scans your repository with [license-checker](https://www.npmjs.com/package/license-checker). It accepts
a whitelist of package names and license names and exits with a non-zero exit code in case a license does not match either.

## Usage

Create a new job in your GitHub actions workflow and include the action like this:
```yaml
name: licenses
on:
  pull_request:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install node
        uses: actions/setup-node@v1

      - uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm install --production

      - name: Check licenses
        uses: steffen911/license-checker-action@main
        with:
          packagePatternWhitelist: '@your-organization'
          licenseWhitelist: 'MIT,ISC,Apache-2.0'
          packageWhitelist: '@actions/core@1.5.0'
```

All parameters are optional.

const core = require('@actions/core');
const checker = require('license-checker-rseidelsohn');

try {
    const licenseWhitelist = core.getInput('licenseWhitelist');
    const packageWhitelist = core.getInput('packageWhitelist').split(',');
    const packagePatternWhitelist = core.getInput('packagePatternWhitelist').split(',');

    checker.init({
        start: '.',
        excludeLicenses: licenseWhitelist,
    }, (err, packages) => {
        if (err) {
            throw err;
        }
        const unexpectedPackages = Object.keys(packages)
            .filter((packageName) => !packageWhitelist.includes(packageName))
            .filter((packageName) => !packagePatternWhitelist.some((pattern) => packageName.includes(pattern)))
            .map((name) => ({ name, ...packages[name] }));
        if (unexpectedPackages.length > 0) {
            core.setFailed(`packages with non-whitelisted versions: ${JSON.stringify(unexpectedPackages, null, 2)}`);
        }
    });
} catch (error) {
    core.setFailed(error.message);
}

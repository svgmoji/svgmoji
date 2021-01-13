/**
 * @explanation
 *
 * This file is used by pnpm to add hooks to the installation [process][1]. You
 * can use it to perform the same functionality as found in yarn resolutions and
 * other similar environments.
 */

module.exports = {
  hooks: {
    readPackage,
  },
};

/**
 * @param {import('type-fest').PackageJson} pkg
 */
function readPackage(pkg) {
  const setDependency = createSetDependency(pkg);

  setDependency('serialize-javascript', '^4.0.0 || ^5.0.0');
  return pkg;
}

/**
 * @typedef {(name: string, version: string, includePeer?: boolean) => void} SetDependency
 */

/**
 * A factory method which is used to create dependency setters for a provided
 * package.json file.
 *
 * @param {import('type-fest').PackageJson} pkg
 * @returns {SetDependency}
 */
function createSetDependency(pkg) {
  return function (name, version, peer = false) {
    if (pkg.dependencies && pkg.dependencies[name]) {
      pkg.dependencies[name] = version;
    }

    if (pkg.devDependencies && pkg.devDependencies[name]) {
      pkg.devDependencies[name] = version;
    }

    if (peer && pkg.peerDependencies && pkg.peerDependencies[name]) {
      pkg.peerDependencies[name] = version;
    }
  };
}

/**
 * [1]: https://pnpm.js.org/en/pnpmfile
 */

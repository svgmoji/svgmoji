const config = require('../base.babel');

module.exports = {
  ...config,
  babelrcRoots: ['.', 'packages/@*/*', 'packages/*'],
  sourceType: 'unambiguous',
};

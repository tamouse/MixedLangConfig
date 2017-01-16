/**
 * Configuration collator for Node.js environments
 */

const defaultConfig = eval(require.resolve('./default.json'));
const env = process.env.NODE_ENV || 'development';
const envConfig = eval(require.resolve('./' + env + '.json'));
const CONFIG = Object.assign({}, defaultConfig, envConfig);

module.exports = CONFIG;

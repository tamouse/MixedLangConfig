/**
 * Configuration collator for Node.js environments
 */

const fs = require('fs');

const defaultConfigFile = require.resolve('./default.json');
const env = process.env.NODE_ENV || 'development';
const envConfigFile = require.resolve('./' + env + '.json');

var defaultConfig = fs.readFileSync(defaultConfigFile).toString();
defaultConfig = JSON.parse(defaultConfig);

var envConfig = fs.readFileSync(envConfigFile).toString();
envConfig = JSON.parse(envConfig);

const CONFIG = Object.assign({}, defaultConfig, envConfig);

module.exports = CONFIG;

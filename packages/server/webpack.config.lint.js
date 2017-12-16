const path = require('path');
const createWebpackConfig = require('spinjs').createWebpackConfig;

const config = createWebpackConfig(path.join(__dirname, '.spinrc.json'), 'server');

module.exports = config;

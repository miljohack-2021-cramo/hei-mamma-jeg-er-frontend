/* config-overrides.js */

const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("react-app-rewire-babel-loader");
const webpackConfig = require("react-scripts/config/webpack.config");
 
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
    config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/@react-leaflet")
    );
    config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/react-leaflet")
    );
    config.module.rules.push({
        resolve:{
            alias: {
                ...config.resolve.alias,
                'mapbox-gl': 'maplibre-gl'
            }
        }
    })

    return config
};
const commonConfig = require("./webpack.config.cjs")

module.exports = {
    ...commonConfig,
    mode: 'development',
    devtool: 'eval-cheap-source-map'
}

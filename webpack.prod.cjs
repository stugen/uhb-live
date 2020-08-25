const commonConfig = require("./webpack.config.cjs")

module.exports = {
    ...commonConfig,
    mode: 'production'
}

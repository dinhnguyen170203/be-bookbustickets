const { environment } = require('@rails/webpacker')
// ... other code

const webpack = require('webpack')

environment.plugins.append('DefinePlugin', new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
}))

// ... other code
module.exports = environment
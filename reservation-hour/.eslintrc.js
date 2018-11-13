/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
    'es6': true,
  },
  'rules': {
     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],  
  },
}

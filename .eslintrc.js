module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "react/prop-types": "off",
    'max-len': ["error", { "code": 150 }],
    'max-lines': ["warn", {"max": 200, "skipBlankLines": false}]
  },
};

module.exports = {
  // !.eslintrc.js
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "jsx-a11y/anchor-is-valid": "off",
    "no-invalid-regexp": "off",
    "no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ]
  },
  "eslint": {
    "enable": false
  }
}

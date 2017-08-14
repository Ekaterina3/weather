module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "jquery": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "window": true,
    "global": true,
    "__dirname": true
  },
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ],
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": 0
  }
}

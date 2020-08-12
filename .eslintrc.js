module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier'],
  globals: {
    Atomics: 'readonly',
    uni: true,
    plus: true,
    SharedArrayBuffer: 'readonly',
    wx: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier', 'vue'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
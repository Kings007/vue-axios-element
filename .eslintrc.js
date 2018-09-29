module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 'off',
    'no-param-reassign': 'off', // 适应 vue 语法
    'no-use-before-define': ['error', {'functions': false, 'classes': true}],
    'import/no-named-as-default-member': 'off',
    // 代码风格重置
    'max-len': ['error', {
      'code': 120,
      'ignoreComments': true, 'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true, 'ignoreUrls': true, 'ignoreStrings': true
    }],
    'object-curly-spacing': 'off',
    'padded-blocks': 'off',
    'object-curly-newline': 'off',
    'prefer-template': 'off',
    'prefer-destructuring': 'off',
    'func-names': 'off',
    'no-else-return': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-alert': 'warn',
    'no-plusplus': 'off',
    'no-mixed-operators': 'off',
    'no-lonely-if': 'off',
    'import/extensions': 'off',
    // 额外兼容
    // 解决新版 eslint，未计算 script tag 额外缩进问题 https://github.com/vuejs/eslint-plugin-vue/issues/118
    "indent": "off",
    "indent-legacy": ["error", 2],
    // 统一换行符，"\n" unix(for LF) and "\r\n" for windows(CRLF)，默认unix
    // off或0: 禁用规则
    'linebreak-style': 'off',
    'arrow-parens': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

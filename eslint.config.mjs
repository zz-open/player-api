import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: false,
  vue: false,
}, {
  rules: {
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
}, {
  ignores: [
    '**/test',
    '**/koa-starter',
    '**/tecent-sign-bk.js',
  ],
})

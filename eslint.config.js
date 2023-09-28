// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({}, {
  rules: {
    'semi': ['error', 'always'],
    'no-new': 'off',
    'no-console': 'warn',
    'node/prefer-global/process': 'off',
  },
});

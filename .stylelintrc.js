module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-scss', 'stylelint-config-recess-order'],
    plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
    rules: {
        'scss/dollar-variable-empty-line-before': null,
    },
};

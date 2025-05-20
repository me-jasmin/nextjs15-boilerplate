module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "selector-class-pattern": null, // Allow any class name pattern
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "color-hex-length": null,
    "color-function-notation": null,
    "custom-property-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "media-feature-range-notation": null
  },
};

const plugin = require("tailwindcss/plugin");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = plugin(
  ({ addBase, addComponents, matchUtilities, theme }) => {
    addBase({
      ":root": {
        "--ts-text-shadow-color": "black",
        "--ts-text-shadow-x": "1px",
        "--ts-text-shadow-y": "1px",
        "--ts-text-shadow-blur": "1px",
      },
    });

    addComponents({
      ".text-shadow": {
        textShadow:
          "var(--ts-text-shadow-x) var(--ts-text-shadow-y) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)",
      },
    });

    matchUtilities(
      {
        "text-shadow-x": (value) => ({
          "--ts-text-shadow-x": value,
        }),
        "text-shadow-y": (value) => ({
          "--ts-text-shadow-y": value,
        }),
        "text-shadow-blur": (value) => ({
          "--ts-text-shadow-blur": value,
        }),
      },
      {
        values: theme("textShadowSteps"),
        type: "length",
        supportsNegativeValues: true,
      }
    );

    matchUtilities(
      {
        "text-shadow": (value) => ({
          "--ts-text-shadow-color": value,
        }),
      },
      {
        values: flattenColorPalette(theme("colors")),
        type: "color",
      }
    );
  },
  {
    theme: {
      textShadowSteps: {
        xs: "1px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "5px",
        0: "0",
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
        7: "7px",
        8: "8px",
        9: "9px",
        10: "10px",
      },
    },
  }
);

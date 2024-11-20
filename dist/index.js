var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { comment } from "postcss";
var require_index = __commonJS({
  "index.js"(exports, module) {
    function generateShadows(steps = 1) {
      const classes = [];
      for (let x = 0; x < steps; x++) {
        classes.push(`calc(var(--ts-text-shadow-x) * ${x}) calc(var(--ts-text-shadow-y) * ${x}) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`);
      }
      return classes.toString();
    }
    const version = "2.1.6";
    function getDefaultExportFromCjs(x) {
      return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
    }
    var createPlugin$2 = {};
    var createPlugin$1 = {};
    (function(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      Object.defineProperty(exports2, "default", {
        enumerable: true,
        get: function() {
          return _default;
        }
      });
      function createPlugin2(plugin2, config) {
        return {
          handler: plugin2,
          config
        };
      }
      createPlugin2.withOptions = function(pluginFunction, configFunction = () => ({})) {
        const optionsFunction = function(options) {
          return {
            __options: options,
            handler: pluginFunction(options),
            config: configFunction(options)
          };
        };
        optionsFunction.__isOptionsFunction = true;
        optionsFunction.__pluginFunction = pluginFunction;
        optionsFunction.__configFunction = configFunction;
        return optionsFunction;
      };
      const _default = createPlugin2;
    })(createPlugin$1);
    (function(exports2) {
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      Object.defineProperty(exports2, "default", {
        enumerable: true,
        get: function() {
          return _default;
        }
      });
      const _createPlugin = /* @__PURE__ */ _interop_require_default(createPlugin$1);
      function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      const _default = _createPlugin.default;
    })(createPlugin$2);
    let createPlugin = createPlugin$2;
    var plugin = (createPlugin.__esModule ? createPlugin : { default: createPlugin }).default;
    const plugin$1 = /* @__PURE__ */ getDefaultExportFromCjs(plugin);
    const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");
    module.exports = plugin$1.withOptions(
      function(options = {}) {
        const prefix = options.prefix || "text-shadow";
        return function({ addBase, addComponents, matchUtilities, matchComponents, theme }) {
          addBase([
            comment({
              text: `!  tailwindcss-text-shadow v${version} | MIT License | https://designbycode.co.za`
            })
          ]);
          addBase({
            ":root": {
              "--ts-text-shadow-color": options.shadowColor || "rgba(0, 0,0,0.45)",
              "--ts-text-shadow-x": options.shadowOffsetX || "1px",
              "--ts-text-shadow-y": options.shadowOffsetY || "1px",
              "--ts-text-shadow-blur": options.shadowBlur || "2px"
            }
          });
          addComponents({
            [`.${prefix}`]: {
              textShadow: `var(--ts-text-shadow-x) var(--ts-text-shadow-y) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`
            }
          });
          matchUtilities(
            {
              [`${prefix}-x`]: (value) => ({
                "--ts-text-shadow-x": value
              }),
              [`${prefix}-y`]: (value) => ({
                "--ts-text-shadow-y": value
              }),
              [`${prefix}-blur`]: (value) => ({
                "--ts-text-shadow-blur": value
              })
            },
            {
              values: theme("textShadowSteps"),
              type: "length",
              supportsNegativeValues: true
            }
          );
          matchUtilities(
            {
              [`${prefix}`]: (value) => ({
                "--ts-text-shadow-color": value
              })
            },
            {
              values: flattenColorPalette(theme("colors")),
              type: "color"
            }
          );
          addComponents({
            [`.${prefix}-sm`]: {
              textShadow: generateShadows(theme("textShadowSteps")[0])
            }
          });
          matchComponents(
            {
              [`${prefix}`]: (value) => ({
                textShadow: generateShadows(value)
              })
            },
            {
              type: "number",
              values: theme("textShadowLong")
            }
          );
        };
      },
      function() {
        return {
          theme: {
            experimental: false,
            textShadowLong: {
              sm: 4,
              md: 8,
              lg: 12,
              xl: 16
            },
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
              10: "10px"
            }
          }
        };
      }
    );
  }
});
export default require_index();

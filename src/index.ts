const plugin = require("tailwindcss/plugin")
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")
const { default: toColorValue } = require("tailwindcss/lib/util/toColorValue.js")

interface StepProps {
  [key: string]: string
}

interface OptionsProps {
  enableLongShadow?: boolean
  shadowColor?: string
  shadowOffsetX?: string
  shadowOffsetY?: string
  shadowBlur?: string
}

module.exports = plugin.withOptions(
  function (options: OptionsProps = {}) {
    return function ({ addBase, addComponents, matchUtilities, matchComponents, theme }): void {
      addBase({
        ":root": {
          "--ts-text-shadow-color": options.shadowColor || "rgba(0, 0,0,0.45)",
          "--ts-text-shadow-x": options.shadowOffsetX || "1px",
          "--ts-text-shadow-y": options.shadowOffsetY || "1px",
          "--ts-text-shadow-blur": options.shadowBlur || "2px",
        },
      })

      // function setShadows(steps: number = 1) {
      //   let classes = []
      //   for (let x = 0; x < steps; x++) {
      //     classes.push(`calc(var(--ts-text-shadow-x) + ${x}px) calc(var(--ts-text-shadow-y) + ${x}px) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`)
      //   }
      //   return classes.toString()
      // }

      function setShadows(steps = 1) {
        let classes = []
        let directionX = "var(--ts-text-shadow-x)"
        let directionY = "var(--ts-text-shadow-y)"

        for (let x = 0; x < steps; x++) {
          const xValue = `calc(${directionX} ${directionX ? "+" : "-"}  ${x}px)`
          const yValue = `calc(${directionY} ${directionX ? "+" : "-"} ${x}px)`
          classes.push(`${xValue} ${yValue} var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`)
        }
        return classes.toString()
      }

      addComponents({
        ".text-shadow": {
          textShadow: `var(--ts-text-shadow-x) var(--ts-text-shadow-y) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`,
        },
      })

      matchUtilities(
        {
          "text-shadow-x": (value: StepProps) => ({
            "--ts-text-shadow-x": value,
          }),
          "text-shadow-y": (value: StepProps) => ({
            "--ts-text-shadow-y": value,
          }),
          "text-shadow-blur": (value: StepProps) => ({
            "--ts-text-shadow-blur": value,
          }),
        },
        {
          values: theme("textShadowSteps"),
          type: "length",
          supportsNegativeValues: true,
        }
      )
      matchUtilities(
        {
          "text-shadow": (value: StepProps) => ({
            "--ts-text-shadow-color": value,
          }),
        },
        {
          respectPrefix: "dbc",
          values: flattenColorPalette(theme("colors")),
          type: "color",
        }
      )

      if (!options.enableLongShadow) return

      addComponents({
        ".text-shadow-long": {
          textShadow: setShadows(6),
        },
      })

      matchComponents(
        {
          "text-shadow-long": (value: number) => ({
            textShadow: setShadows(value),
          }),
        },
        {
          type: "number",
          values: theme("textShadowLong"),
        }
      )
    }
  },
  function (options: OptionsProps) {
    return {
      theme: {
        textShadowLong: {
          sm: 4,
          md: 8,
          lg: 12,
          xl: 16,
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
          10: "10px",
        },
      },
    }
  }
)

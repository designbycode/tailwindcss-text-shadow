import { comment } from "postcss"
import generateShadows from "./generateShadows"

import { version } from "../package.json"

import plugin from "tailwindcss/plugin"

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

interface StepProps {
  [key: string]: string
}

interface OptionsProps {
  experimental?: boolean
  shadowColor?: string
  shadowOffsetX?: string
  shadowOffsetY?: string
  shadowBlur?: string
  prefix?: string
}

module.exports = plugin.withOptions(
  function (options: OptionsProps = {}) {
    const prefix = options.prefix || "text-shadow"

    return function ({ addBase, addComponents, matchUtilities, matchComponents, theme }: any): void {
      addBase([
        comment({
          text: `!  tailwindcss-text-shadow v${version} | MIT License | https://designbycode.co.za`,
        }),
      ])

      addBase({
        ":root": {
          "--ts-text-shadow-color": options.shadowColor || "rgba(0, 0,0,0.45)",
          "--ts-text-shadow-x": options.shadowOffsetX || "1px",
          "--ts-text-shadow-y": options.shadowOffsetY || "1px",
          "--ts-text-shadow-blur": options.shadowBlur || "2px",
        },
      })

      addComponents({
        [`.${prefix}`]: {
          textShadow: `var(--ts-text-shadow-x) var(--ts-text-shadow-y) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`,
        },
      })

      matchUtilities(
        {
          [`${prefix}-x`]: (value: StepProps) => ({
            "--ts-text-shadow-x": value,
          }),
          [`${prefix}-y`]: (value: StepProps) => ({
            "--ts-text-shadow-y": value,
          }),
          [`${prefix}-blur`]: (value: StepProps) => ({
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
          [`${prefix}`]: (value: StepProps) => ({
            "--ts-text-shadow-color": value,
          }),
        },
        {
          values: flattenColorPalette(theme("colors")),
          type: "color",
        }
      )

      addComponents({
        [`.${prefix}-sm`]: {
          textShadow: generateShadows(theme("textShadowSteps")[0]),
        },
      })

      matchComponents(
        {
          [`${prefix}`]: (value: number) => ({
            textShadow: generateShadows(value),
          }),
        },
        {
          type: "number",
          values: theme("textShadowLong"),
        }
      )
    }
  },
  function () {
    return {
      theme: {
        experimental: false,
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

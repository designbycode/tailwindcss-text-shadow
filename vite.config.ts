import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "Tailwindcss Text Shadow",
      // the proper extensions will be added
      fileName: "index",
      formats: ["cjs", "umd"],

    },
    minify: "terser",
  },
  plugins: [dts({ insertTypesEntry: true })],
})

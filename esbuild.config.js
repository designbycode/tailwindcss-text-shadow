const { Generator } = require("npm-dts")

require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    sourcemap: true,
    // target: ["chrome58", "firefox57", "safari11", "edge16"],
    minify: true,
    splitting: false,
    platform: "node",
    watch: false,
    format: "cjs",
    outdir: "dist",
    tsconfig: "./tsconfig.json", // Specify the path to your tsconfig.json
    // outfile: 'build/index.js',
  })
  .catch(() => process.exit(1))

new Generator({
  entry: "src/index.ts",
  output: "dist/index.d.ts",
}).generate()

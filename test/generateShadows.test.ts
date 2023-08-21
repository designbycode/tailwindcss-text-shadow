import { describe, it, expect } from "vitest"
import generateShadows from "../src/generateShadows"

describe("# Generate shadow", () => {
  const singleLine = `calc(var(--ts-text-shadow-x) * 0) calc(var(--ts-text-shadow-y) * 0) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`

  const doubleLine = `calc(var(--ts-text-shadow-x) * 0) calc(var(--ts-text-shadow-y) * 0) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 1) calc(var(--ts-text-shadow-y) * 1) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`

  const tenSteps = `calc(var(--ts-text-shadow-x) * 0) calc(var(--ts-text-shadow-y) * 0) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 1) calc(var(--ts-text-shadow-y) * 1) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 2) calc(var(--ts-text-shadow-y) * 2) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 3) calc(var(--ts-text-shadow-y) * 3) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 4) calc(var(--ts-text-shadow-y) * 4) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 5) calc(var(--ts-text-shadow-y) * 5) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 6) calc(var(--ts-text-shadow-y) * 6) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 7) calc(var(--ts-text-shadow-y) * 7) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 8) calc(var(--ts-text-shadow-y) * 8) var(--ts-text-shadow-blur) var(--ts-text-shadow-color),calc(var(--ts-text-shadow-x) * 9) calc(var(--ts-text-shadow-y) * 9) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`

  it("should be 1 shadow line", () => {
    expect(generateShadows(1)).toEqual(singleLine)
  })

  it("should be 2 shadow line", () => {
    expect(generateShadows(2)).toEqual(doubleLine)
  })

  it("should be 10 shadow line", () => {
    expect(generateShadows(10)).toEqual(tenSteps)
  })
})

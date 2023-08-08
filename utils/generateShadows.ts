export default function generateShadows(steps: number = 1) {
  let classes = []
  for (let x = 0; x < steps; x++) {
    classes.push(`calc(var(--ts-text-shadow-x) * ${x}) calc(var(--ts-text-shadow-y) * ${x}) var(--ts-text-shadow-blur) var(--ts-text-shadow-color)`)
  }
  return classes.toString()
}

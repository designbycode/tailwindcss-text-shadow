declare module '@designbycode/tailwindcss-text-shadow/index' {
  const plugin: any;
  const flattenColorPalette: any;
  const toColorValue: any;
  interface StepProps {
      [key: string]: string;
  }
  interface OptionsProps {
      experimental?: boolean;
      shadowColor?: string;
      shadowOffsetX?: string;
      shadowOffsetY?: string;
      shadowBlur?: string;
  }

}
declare module '@designbycode/tailwindcss-text-shadow' {
  import main = require('@designbycode/tailwindcss-text-shadow/src/index');
  export = main;
}
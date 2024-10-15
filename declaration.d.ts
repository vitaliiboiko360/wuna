declare module '*.scss' {
  const css: { [className: string]: string };
  export = css;
}

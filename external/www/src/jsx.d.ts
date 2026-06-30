import "astro/astro-jsx"

declare global {
  namespace JSX {
    // We want to use this, but it is defined as any.
    // type Element = astroHTML.JSX.Element

    type Element = HTMLElement
  }
}

declare module "*.astro" {
  import { type AstroComponentFactory } from "astro/runtime/server"

  const component: AstroComponentFactory
  export default component
}

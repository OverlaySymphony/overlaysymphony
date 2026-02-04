import fonts from "@fontsource/montserrat/latin-400.css"

import styles from "./theme.css"

if (fonts instanceof CSSStyleSheet) {
  document.adoptedStyleSheets.push(fonts)
}

if (styles instanceof CSSStyleSheet) {
  document.adoptedStyleSheets.push(styles)
}

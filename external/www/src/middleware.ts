import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware((context, next) => {
  context.locals.breadcrumbs = []

  return next()
})

// This file was automatically added by edgio deploy.
// You should commit this file to source control.
import { nextRoutes } from '@edgio/next'
import { Router } from '@edgio/core/router'
import { edgioRoutes } from '@edgio/core'

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)
  .match('/edgio-api/:path*', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-api/:path*',
          syntax: 'path-to-regexp',
          destination: '/:path*',
        },
      ],
    },
    origin: { set_origin: 'api' },
  })
  .if(
    // if not in the list of routes that NextJS uses and if the files don't have extensions, then use wordpress as the origin
    {
      edgeControlCriteria: {
        and: [
          { "!~": [{ request: "path" }, "(?i)^(/|/about)$"] },
          { "=~": [{ request: "path" }, "^\/[^.]*$"] },
          // { "=~": [{ "request.path": "extension" }, "^$"] },
          // { "=~": [{ "request.path": "filename" }, "^$"] },
          // { "=~": [{ "request.path": "filename" }, "^$"] },
        ],
      },
    },
    {
      origin: { set_origin: "wordpress" }
    }
  )
  // WP specific routes
  .match(
    {
      path: /^\/(_static\/|wp-).*/,
    },
    {
    origin: { set_origin: "wordpress" } 
    }
  )
  

  
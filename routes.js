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
  .match(
    {
      path: {
        not: /^(\/|\/about)$/i
        // not: ["/","/about"]
      },
    }, 
    {
      origin: { set_origin: 'echo' },
    }
  )
  

  
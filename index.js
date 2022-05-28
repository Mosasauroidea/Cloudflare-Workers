import { NotFoundError } from './errors'
import createResponse from './createResponse'

import routeActors from './routes/actors'
import routeSearch from './routes/search'

function main() {
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
}

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    switch (url.pathname) {
      case '/search':
        return await routeSearch(request)
      case '/actors':
        return await routeActors(request)
      default:
        throw new NotFoundError()
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      return createResponse({ status: 404 })
    } else {
      console.log(err.stack)
      return createResponse({ body: { error: err.message }})
    }
  }
}

main()
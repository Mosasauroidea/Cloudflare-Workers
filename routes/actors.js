import { NotFoundError } from '../errors'
import createResponse from '../createResponse'
import fetchSubjectSuggest from '../douban/fetchSubjectSuggest'
import fetchCelebrities from '../douban/fetchCelebrities'

export default async function routeActors(request) {
  const url = new URL(request.url)
  const imdbId = url.searchParams.get('imdb-id')
  if (!imdbId) {
    throw new NotFoundError()
  }

  const suggest = await fetchSubjectSuggest({ imdbId })
  const id = suggest.id
  const actors = await fetchCelebrities({ id })

  const body = {
    data: {
      imdb: {
        id: imdbId,
      },
      douban: {
        id
      },
      actors
    }
  }
  return createResponse({ body })
}
import { NotFoundError } from '../errors'
import createResponse from '../createResponse'
import fetchSubjectSuggest from '../douban/fetchSubjectSuggest'
import fetchSubject  from '../douban/fetchSubject'

export default async function routeSearch(request) {
  const url = new URL(request.url)
  const imdbId = url.searchParams.get('imdb-id')
  let doubanId = url.searchParams.get('douban-id')
  if (!(imdbId || doubanId)) {
    throw new NotFoundError()
  }

  if (imdbId) {
    const suggest = await fetchSubjectSuggest({ imdbId })
    doubanId = suggest.id
  }
  const { imdbId: imdbId2, ...douban } = await fetchSubject({ id: doubanId })

  const body = {
    data: {
      imdb: {
        id: imdbId2,
      },
      douban,
    }
  }
  return createResponse({ body })
}
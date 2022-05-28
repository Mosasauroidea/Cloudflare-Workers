import fetchDouban from './fetchDouban'

export default async function fetchSubjectSuggest({ imdbId }) {
  const body = await fetchDouban(`https://movie.douban.com/j/subject_suggest?q=${imdbId}`, { json: true })
  if (!body[0]) {
    throw new Error(`找不到IMDB ID: ${imdbId}`)
  }
  return body[0]
}
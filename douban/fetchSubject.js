import { get } from 'lodash'
import cheerio from 'cheerio'
import fetchDouban from './fetchDouban'

export default async function fetchSubject({ id }) {
  const body = await fetchDouban(`https://movie.douban.com/subject/${id}`)

  const $ = cheerio.load(body)
  const data = JSON.parse($('head > script[type="application/ld+json"]').html().replace(/(\r\n|\n|\r|\t)/gm, ''))

  // Copy from https://github.com/Rhilip/pt-gen-cfworker/blob/6d3b0547608fcd68da9afcfd761659d05e606f9f/lib/douban.js#L129
  let description = $('#link-report > span.all.hidden, #link-report > [property="v:summary"]')
  if (description.length > 0) {
    description = description.text().split('\n').map(a => a.trim()).filter(a => a.length > 0).join('\n')
  } else {
    description = data.description
  }
  const rating = get(data, 'aggregateRating.ratingValue', 0)
  const votes = get(data, 'aggregateRating.ratingCount', 0)
  const imdbId = $('#info span:contains("IMDb:")')[0].nextSibling.nodeValue.trim()

  return {
    id,
    rating,
    votes,
    imdbId,
    name: data.name,
    image: data.image,
    description: description
  }
}
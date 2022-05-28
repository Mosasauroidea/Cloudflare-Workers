import cheerio from 'cheerio'
import fetchDouban from './fetchDouban'

export default async function fetchCelebrities({ id }) {
  const body = await fetchDouban(`https://movie.douban.com/subject/${id}/celebrities`)

  const $ = cheerio.load(body)
  return $('.celebrity').map(function() {
    const [nameCn, ...nameEns] = $(this).find('a.name').attr('title').split(/ /)
    const found = $(this).find('span.role')
    let role
    if (found.length) {
      role = found.attr('title').split(/ /)[0]
    } else {
      role = $(this).closest('.list-wrapper').find('> h2').text().split(/ /)[0]
    }
    return {
      name: nameCn,
      nameEn: nameEns.join(' '),
      role
    }
  }).toArray()
}
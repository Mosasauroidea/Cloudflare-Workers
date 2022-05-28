export default async function fetchDouban(url, options = {}) {
  const text = await (await fetch(url, options)).text()

  if (text.match(/检测到有异常请求/)) {
    throw new Error('检测到有异常请求')
  }

  if (text.match(/你想访问的页面不存在/)) {
    throw new Error('你想访问的页面不存在')
  }

  if (options.json) {
    return JSON.parse(text)
  } else {
    return text
  }
}

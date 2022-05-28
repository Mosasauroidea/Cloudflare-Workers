
export default function createResponse({ body = {}, status = 200 } = {}) {
	return new Response(JSON.stringify(body), {
    status, 
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

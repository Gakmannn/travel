export default defineEventHandler(async (event) => {
  if (event.path=='/.well-known/appspecific/com.chrome.devtools.json') {
    return ''
  }  
  if (event.method === 'POST'||event.method === 'PUT') {
    const contentType = getRequestHeader(event, "content-type")
    if (!contentType?.includes('application/json') || !contentType?.includes('multipart/form-data;')) return
  }
})

export default (url, data, func, method = 'POST', contentType) => {

  let errorFunc

  if (func instanceof Array) {
    func = func[0]
    errorFunc = func[1]
  }

  console.log(url, data, method)
  
  const request = new XMLHttpRequest()

  request.open(method, url, true)
  if (contentType !== false) {
    request.setRequestHeader('Content-Type', contentType || 'application/json; charset=UTF-8')
  }
  //request.setRequestHeader(document.querySelector('meta[name="_csrf_header"]').getAttribute('content'), document.querySelector('meta[name="_csrf"]').getAttribute('content'))
  

  request.onload = () => {

    let response = request.responseText

    try {
      response = JSON.parse(response)
    } catch (e) {}

    console.log('Response: by ' + url , response)

    if (request.status == 200 && func) {
      func(response)
    } else if (request.status >= 400) {
      if (request.status == 400) {
        if (func) {
          func(response)
        }
      } else {
        if (func) {
          func('error')
        }
      }
      if (errorFunc) {
        errorFunc(response)
      }
    }

  }

  request.send((typeof data === 'object' && contentType !== false) ? JSON.stringify(data) : data)

}
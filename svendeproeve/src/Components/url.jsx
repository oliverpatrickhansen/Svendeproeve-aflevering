export default (url, params = {}) => (
    url + '?' + Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
  )
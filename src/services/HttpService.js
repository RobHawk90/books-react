class HttpService {

  static get(url) {
    return fetch(url).then(res => this._handleErrors(res))
  }

  static post(url, data) {
    return fetch(url, {
      headers: new Headers({ 'Content-type': 'application/json' })
      , method: 'post'
      , body: JSON.stringify(data)
    }).then(res => this._handleErrors(res))
  }

  static _handleErrors(res) {
    if (res.ok || res.status === 400) return res.json()
    throw new Error('This response was rejected.')
  }

}

export default HttpService

import Http from './HttpService'

class AuthorService {

  static listAll() {
    return Http.get('http://localhost:8080/api/autores')
  }

  static save(author) {
    return Http.post('http://localhost:8080/api/autores', author)
  }

}

export default AuthorService

import Http from './HttpService'

class BookService {

  static listAll() {
    return Http.get('http://localhost:8080/api/livros')
  }

  static save(book) {
    return Http.post('http://localhost:8080/api/livros', book)
  }

}

export default BookService

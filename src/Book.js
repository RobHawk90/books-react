import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import ValidationHandler from './ValidationHandler'
import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'

class BookForm extends Component {

  constructor() {
    super()

    this.state = { title: '', price: '', authorId: '' }

    this.setAuthorId = this.setAuthorId.bind(this)
    this.setPrice = this.setPrice.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.saveBook = this.saveBook.bind(this)
  }

  setAuthorId(event) {
    this.setState({ authorId: event.target.value })
  }

  setTitle(event) {
    this.setState({ title: event.target.value })
  }

  setPrice(event) {
    this.setState({ price: event.target.value })
  }

  saveBook(event) {
    event.preventDefault()

    PubSub.publish('clear-validations')

    fetch('http://localhost:8080/api/livros', {
      headers: new Headers({ 'Content-type': 'application/json' })
      , method: 'post'
      , body: JSON.stringify({ titulo: this.state.title, preco: this.state.price, autorId: this.state.authorId })
    })
      .then(res => {
        if (res.ok)
          res.json().then(livros => {
            PubSub.publish('update-livros', livros)
            this.setState({ title: '', price: '', authorId: '' })
          })
        else
          res.json().then(json => {
            if (res.status === 400) ValidationHandler.publishMessages(json.errors)
          })
      })
  }

  /* @Override from Component */
  render() {
    return (
      <div className="content-subhead">
        <form className="pure-form pure-form-aligned" onSubmit={this.saveBook}>
          <CustomInput type="text" name="titulo" id="title" label="Title" value={this.state.title} onChange={this.setTitle} />
          <CustomInput type="text" name="preco" id="price" label="Price" value={this.state.price} onChange={this.setPrice} />
          <div className="pure-control-group">
            <label htmlFor="authorId">Author</label>
            <select id="authorId" name="autorId" value={this.state.authorId} onChange={this.setAuthorId}>
              <option key="0">SELECT AN AUTHOR</option>
              {this.props.authors.map(author => (
                <option key={author.id} value={author.id}>{author.nome}</option>
              ))}
            </select>
            <span className="error"></span>
          </div>
          <CustomButton label="Save" />
        </form>
      </div>
    )
  }

}

class BookList extends Component {

  /* @Override from Component */
  render() {
    return (
      <div className="content-subhead">
        <table className="pure-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Author</th>
            </tr>
          </thead>

          <tbody>
            {this.props.books.map(book => (
              <tr key={book.id}>
                <td>{book.titulo}</td>
                <td>{book.preco}</td>
                <td>{book.autor.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

class BookBox extends Component {

  constructor() {
    super()

    this.state = { authors: [], books: [] }
  }

  /* @Override from Component */
  render() {
    return (
      <div>
        <div className="header">
          <h1>Books</h1>
        </div>

        <div className="content" id="content">
          <BookForm authors={this.state.authors} />
          <BookList books={this.state.books} />
        </div>
      </div>
    )
  }

  /* @Override from Component */
  componentDidMount() {
    fetch('http://localhost:8080/api/autores')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not OK')
      })
      .then(authors => this.setState({ authors: authors }))
      .catch(err => console.log(err));

    fetch('http://localhost:8080/api/livros')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not OK')
      })
      .then(books => this.setState({ books: books }))
      .catch(err => console.log(err))

    PubSub.subscribe('update-livros', (topic, books) => this.setState({ books: books }))
  }

}

export default BookBox

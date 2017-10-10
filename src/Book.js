import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import AuthorService from './services/AuthorService'
import BookService from './services/BookService'
import ValidationHandler from './ValidationHandler'
import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'
import CustomSelect from './components/CustomSelect'

class BookForm extends Component {

  constructor() {
    super()

    this.state = { title: '', price: '', authorId: '' }

    this.saveBook = this.saveBook.bind(this)
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value })
  }

  saveBook(event) {
    event.preventDefault()

    PubSub.publish('clear-validations')

    BookService.save({ titulo: this.state.title, preco: this.state.price, autorId: this.state.authorId })
      .then(books => {
        if (books.errors) {
          ValidationHandler.publishMessages(books.errors)
          return
        }

        PubSub.publish('update-books', books)
        this.setState({ title: '', price: '', authorId: '' })
      })
  }

  /* @Override from Component */
  render() {
    return (
      <div className="content-subhead">
        <form className="pure-form pure-form-aligned" onSubmit={this.saveBook}>
          <CustomInput type="text" name="titulo" id="title" label="Title" value={this.state.title} onChange={this.onChange.bind(this, 'title')} />
          <CustomInput type="text" name="preco" id="price" label="Price" value={this.state.price} onChange={this.onChange.bind(this, 'price')} />
          <CustomSelect name="autorId" id="authorId" label="Author" value={this.state.authorId} onChange={this.onChange.bind(this, 'authorId')}
            options={this.props.authors.map(author => {
              return { value: author.id, label: author.nome }
            })}
          />
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
    AuthorService.listAll()
      .then(authors => this.setState({ authors: authors }))

    BookService.listAll()
      .then(books => this.setState({ books: books }))

    PubSub.subscribe('update-books', (topic, books) => this.setState({ books: books }))
  }

}

export default BookBox

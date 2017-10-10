import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import AuthorService from './services/AuthorService'
import ValidationHandler from './ValidationHandler'
import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'

class AuthorForm extends Component {

  constructor() {
    super()

    this.state = { name: '', email: '', password: '' }

    this.saveAuthor = this.saveAuthor.bind(this)
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value })
  }

  saveAuthor(event) {
    event.preventDefault()

    PubSub.publish('clear-validations')

    AuthorService.save({ nome: this.state.name, email: this.state.email, senha: this.state.password })
      .then(authors => {
        if (authors.errors) {
          ValidationHandler.publishMessages(authors.errors)
          return
        }

        PubSub.publish('update-authors', authors)
        this.setState({ name: '', email: '', password: '' })
      })
  }

  /* @Override from Component */
  render() {
    return (
      <div className="content-subhead">
        <form className="pure-form pure-form-aligned" onSubmit={this.saveAuthor}>
          <CustomInput type="text" name="nome" id="name" value={this.state.name} label="Name" onChange={this.onChange.bind(this, 'name')} />
          <CustomInput type="email" name="email" id="email" value={this.state.email} label="Email" onChange={this.onChange.bind(this, 'email')} />
          <CustomInput type="password" name="senha" id="password" value={this.state.password} label="Password" onChange={this.onChange.bind(this, 'password')} />
          <CustomButton label="Save" />
        </form>
      </div>
    )
  }

}

class AuthorList extends Component {

  /* @Override from Component */
  render() {
    return (
      <div className="content-subhead">
        <table className="pure-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.authors.map(author => (
                <tr key={author.id}>
                  <td>{author.nome}</td>
                  <td>{author.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

}

class AuthorBox extends Component {

  constructor() {
    super()

    this.state = { authors: [] }
  }

  /* @Override from Component */
  render() {
    return (
      <div>
        <div className="header">
          <h1>Authors</h1>
        </div>

        <div className="content" id="content">
          <AuthorForm />
          <AuthorList authors={this.state.authors} />
        </div>
      </div>
    )
  }

  /* @Override from Component */
  componentDidMount() {
    AuthorService.listAll()
      .then(authors => this.setState({ authors: authors }))

    PubSub.subscribe('update-authors', (topic, authors) => this.setState({ authors: authors }))
  }

}

export default AuthorBox

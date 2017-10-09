import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import ValidationHandler from './ValidationHandler'
import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'

class AuthorForm extends Component {

  constructor() {
    super()

    this.state = { name: '', email: '', password: '' }

    this.setName = this.setName.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.saveAuthor = this.saveAuthor.bind(this)
  }

  setName(event) {
    this.setState({ name: event.target.value })
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  saveAuthor(event) {
    event.preventDefault()

    PubSub.publish('clear-validations')

    fetch('http://localhost:8080/api/autores', {
      headers: new Headers({ 'Content-type': 'application/json' })
      , method: 'post'
      , body: JSON.stringify({ nome: this.state.name, email: this.state.email, senha: this.state.password })
    })
      .then(res => {
        if (res.ok)
          res.json().then(authors => {
            PubSub.publish('update-authors', authors)
            this.setState({ name: '', email: '', password: '' })
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
        <form className="pure-form pure-form-aligned" onSubmit={this.saveAuthor}>
          <CustomInput type="text" name="nome" id="name" value={this.state.name} label="Name" onChange={this.setName} />
          <CustomInput type="email" name="email" id="email" value={this.state.email} label="Email" onChange={this.setEmail} />
          <CustomInput type="password" name="senha" id="password" value={this.state.password} label="Password" onChange={this.setPassword} />
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
    fetch('http://localhost:8080/api/autores')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not OK')
      })
      .then(authors => this.setState({ authors: authors }))
      .catch(err => console.log(err))

    PubSub.subscribe('update-authors', (topic, authors) => this.setState({ authors: authors }))
  }

}

export default AuthorBox

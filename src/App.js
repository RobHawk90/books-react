import React, { Component } from 'react'

import './css/pure-min.css'
import './css/side-menu.css'

import CustomInput from './components/CustomInput'
import CustomButton from './components/CustomButton'

class App extends Component {

  constructor() {
    super()

    this.state = { authors: [], name: '', email: '', password: '' }

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

    fetch('http://localhost:8080/api/autores', {
      headers: new Headers({ 'Content-type': 'application/json' })
      , method: 'post'
      , body: JSON.stringify({ nome: this.state.name, email: this.state.email, senha: this.state.password })
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error(res.body)
      })
      .then(authors => this.setState({ authors: authors }))
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
  }

  /* @Override from Component */
  render() {
    return (
      <div id="layout">
        <a href="jsx-a11y/href-no-hash" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="jsx-a11y/href-no-hash">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="jsx-a11y/href-no-hash" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="jsx-a11y/href-no-hash" className="pure-menu-link">Authors</a></li>
              <li className="pure-menu-item"><a href="jsx-a11y/href-no-hash" className="pure-menu-link">Books</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Authors</h1>
          </div>

          <div className="content" id="content">
            <div className="content-subhead">
              <form className="pure-form pure-form-aligned" onSubmit={this.saveAuthor}>
                <CustomInput type="text" name="name" id="name" value={this.state.name} label="Name" onChange={this.setName} />
                <CustomInput type="email" name="email" id="email" value={this.state.email} label="Email" onChange={this.setEmail} />
                <CustomInput type="password" name="password" id="password" value={this.state.password} label="Password" onChange={this.setPassword} />
                <CustomButton type="submit" label="Save" />
              </form>
            </div>

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
                    this.state.authors.map(author => (
                      <tr key={author.id}>
                        <td>{author.nome}</td>
                        <td>{author.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default App

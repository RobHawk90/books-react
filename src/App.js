import React, { Component } from 'react'
import './css/pure-min.css'
import './css/side-menu.css'

class App extends Component {

  constructor() {
    super()
    this.state = { authors: [] }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/autores')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Not OK')
      })
      .then(authors => this.setState({ authors: authors }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Authors</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Books</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Authors</h1>
          </div>

          <div className="content" id="content">
            <div className="content-subhead">
              <form className="pure-form pure-form-aligned">
                <div className="pure-control-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" name="name" value="" />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value="" />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" name="password" />
                </div>

                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Save</button>
                </div>
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
                    this.state.authors.map(author => {
                      return (
                        <tr key={author.id}>
                          <td>{author.nome}</td>
                          <td>{author.email}</td>
                        </tr>
                      )
                    })
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

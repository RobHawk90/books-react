import React, { Component } from 'react'

import './css/pure-min.css'
import './css/side-menu.css'

import AuthorBox from './Author'

class App extends Component {

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
            <AuthorBox />
          </div>
        </div>
      </div>
    )
  }

}

export default App

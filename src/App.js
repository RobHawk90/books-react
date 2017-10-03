import React, { Component } from 'react'
import { Link } from 'react-router'

import './css/pure-min.css'
import './css/side-menu.css'

class App extends Component {

  /* @Override from Component */
  render() {
    return (
      <div id="layout">
        <Link to="/" id="menuLink" className="menu-link">
          <span></span>
        </Link>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="jsx-a11y/href-no-hash">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
              <li className="pure-menu-item"><Link to="/authors" className="pure-menu-link">Authors</Link></li>
              <li className="pure-menu-item"><Link to="/books" className="pure-menu-link">Books</Link></li>
            </ul>
          </div>
        </div>

        <div id="main">
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default App

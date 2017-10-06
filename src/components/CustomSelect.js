import React, { Component } from 'react'

class CustomSelect extends Component {

  constructor() {
    super()

    this.state = { validationError: '', options: [] }
  }

  render() {
    return (
      <div className="pure-control-group">
        <label for={this.props.id}>{this.props.label}</label>
        <select id={this.props.id}>
          {this.state.options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="error">{this.state.validationError}</span>
      </div>
    )
  }

}

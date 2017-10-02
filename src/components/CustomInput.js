import React, { Component } from 'react'
import PubSub from 'pubsub-js'

class CustomInput extends Component {

  constructor() {
    super()

    this.state = { validationMessage: '' }
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
        <span className="error">{this.state.validationMessage}</span>
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('validation-error', (topic, error) => {
      if (error.field === this.props.name)
        this.setState({ validationMessage: error.defaultMessage })
    })

    PubSub.subscribe('clear-validations', () => this.setState({ validationMessage: '' }))
  }

}

export default CustomInput

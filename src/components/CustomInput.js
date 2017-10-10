import React, { Component } from 'react'
import PubSub from 'pubsub-js'

class CustomInput extends Component {

  constructor() {
    super()

    this.state = { validationMessage: '' }
  }

  /* @Override from Component */
  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {/*a shorthand declaration of props, but preffer to declare declare each prop rather using spread operators*/}
        <input {...this.props} />
        <span className="error">{this.state.validationMessage}</span>
      </div>
    )
  }

  /* @Override from Component */
  componentDidMount() {
    PubSub.subscribe('validation-error', (topic, error) => {
      if (error.field === this.props.name)
        this.setState({ validationMessage: error.defaultMessage })
    })

    PubSub.subscribe('clear-validations', () => this.setState({ validationMessage: '' }))
  }

}

export default CustomInput

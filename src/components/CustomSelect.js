import React from 'react'

import CustomInput from './CustomInput'

class CustomSelect extends CustomInput {

  /* @Override from Component */
  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
          <option key="0">{this.props.firstOption || 'SELECT...'}</option>
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {/*validationMessage is a state inheritance from CustomInput */}
        <span className="error">{this.state.validationMessage}</span>
      </div>
    )
  }

}

export default CustomSelect

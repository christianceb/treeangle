import React, { Component } from "react"

class Range extends Component {
  constructor(props) {
    super(props)

    // Set default value
    this.value = this.props.min

    // In the event when value prop is available, use that as default value.
    if ( this.props.value ) {
      this.value = this.props.value
    }

    // Set state
    this.state = { value: this.value }

    // Bind this as parameter on events
    this.stepChange = this.stepChange.bind(this)
  }
  stepChange( event ) {
    // Set State and let parent know of change in value here.
    this.setState( { value : event.target.value }, () => this.props.onChange( { name: this.props.name, value: this.state.value } ) )
  }
  render() {
    return (
      <div className="control" data-value={this.state.value} data-max={this.props.max}>
        <label>{this.props.label} (default: {this.value})</label>

        <input
          type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          onChange={this.stepChange}
          name={this.props.name}
        />
      </div>
    )
  }
}

export default Range
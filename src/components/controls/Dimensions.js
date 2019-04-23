import React, { Component } from "react"
import Range from "./Range"

class Dimensions extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      x: this.props.xmin,
      y: this.props.ymin
    }

    this.setDimensions = this.setDimensions.bind(this)
  }
  setDimensions ( dimension ) {
    if ( dimension.name === "x" ) {
      this.setState( { x: dimension.value } )
    } else if ( dimension.name === "y" ) {
      this.setState( { y: dimension.value } )
    }

    this.props.onChange( {
      x: this.state.x,
      y: this.state.y
    } )
  }
  lockToggle(event) {
    this.setState({ lock: event.target.checked })
  }
  render() {
    return (
      <div className="dimensions">
        <Range
          min={this.props.xmin}
          max={this.props.xmax}
          step="1"
          label="Set Width"
          name="x"
          value={this.state.x}
          onChange={this.setDimensions}
        />
        <Range
          min={this.props.ymin}
          max={this.props.ymax}
          step="1"
          label="Set Height"
          name="y"
          value={this.state.y}
          onChange={this.setDimensions}
        />
      </div>
    )
  }
}

export default Dimensions
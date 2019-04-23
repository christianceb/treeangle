import React, { Component } from "react"
import Range from "./controls/Range"
import Dimensions from "./controls/Dimensions"

class Controls extends Component {
  constructor( props ) {
    super( props )

    this.onStepChange = this.onStepChange.bind( this )
    this.onDimensionChange = this.onDimensionChange.bind( this )
  }
  onStepChange( data ) {
    this.props.onChange( {
      steps: data.value
    } );
  }
  onDimensionChange( data ) {
    this.props.onChange( {
      x: data.x,
      y: data.y
    } );
  }
  render() {
    return (
      <div className="controls">
        <Range
          min="1" 
          max="256" 
          value="8" 
          label="Number of steps apart each color" 
          name="steps"
          onChange={this.onStepChange}
        />
        <Dimensions xmin="256" xmax="768" ymin="128" ymax="384" onChange={this.onDimensionChange} />
      </div>
    )
  }
}

export default Controls
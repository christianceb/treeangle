import React, { Component } from "react"
import Basic from "./algorithms/Basic"
import Download from "./Download"
import Controls from "./Controls"

class RenderAlgorithm extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      title: "Algorithm",
      description: "Description",
      x: 256,
      y: 128,
      steps: 8
    }

    this.image = {
      data: null,
      duration: 0,
      totalColors: 0
    }

    this.download = React.createRef()
    this.canvasContainer = React.createRef()

    this.onCanvasUpdate = this.onCanvasUpdate.bind( this )
    this.onControlChange = this.onControlChange.bind( this )

    this.downloadMeta = {
      title: "Download Generated Image",
      filename: "discrete-colors.png"
    }
    this.downloadTitle = "Download Generated Image"
  }
  onCanvasUpdate( data ) {
    if ( data.title && data.description ) {
      this.setState( {
        title: data.title,
        description: data.description
      } )
    } else if ( data.duration && data.imageData && data.totalColors ) {
      /**
       * Semi-cheating here as the source of data of this change will cause an infinite loop if
       * we're to use setState().
       * 
       * To determine implications of doing this (one being meta described here may not render on
       * first load, which is not the case on tests done earlier.)
       */
      this.image = {
        duration: data.duration,
        data: data.imageData,
        totalColors: data.totalColors
      }
    }
  }
  onControlChange( data ) {
    if ( data.steps ) {
      this.setState( { steps: parseInt( data.steps ) } )
    } else {
      // Dimensions change
      this.setState( {
        x: data.x,
        y: data.y
      } )
    }
  }
  render() {
    let algorithm

    if ( this.props.run === "basic" ) {
      algorithm = <Basic x={this.state.x} y={this.state.y} steps={this.state.steps} onChange={this.onCanvasUpdate} />
    }
    
    return (
      <section>
        <h2>Running Algorithm: {this.state.title}</h2>
        <p>{this.state.description}</p>
        <Controls onChange={this.onControlChange} />
        <div ref={this.canvasContainer} data-duration={this.image.duration} data-total-colors={this.image.totalColors} className="canvas">
            {algorithm}
        </div>
        <Download title={this.downloadMeta.title} image={this.image.data} filename={this.downloadMeta.filename}>{this.downloadTitle}</Download>
      </section>
    )
  }
}

export default RenderAlgorithm
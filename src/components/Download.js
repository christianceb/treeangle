import React, { Component } from "react"

class Download extends Component {
  render () {
    return ( <a href={this.props.image} title={this.props.children.toString()} download={this.props.filename}>{this.props.children.toString()}</a> )
  }
}

export default Download
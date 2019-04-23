import React, {Component} from "react"

class Basic extends Component {
  constructor ( props ) {
    super( props )
    this.state = {
      x: this.props.x,
      y: this.props.y,
      steps: this.props.steps
    }
    this.canvas = React.createRef()
    
    const title = "Basic"
    const description = "This is a basic algorithm and perhaps the simplest way to iterate through all colors without duplicates. It uses three loops nested together and draws on-the-fly. You may control parameters such as steps, width and height of the image."

    this.props.onChange( {
      title: title,
      description: description
    } )
  }

  componentDidMount() {
    this.draw()
  }

  shouldComponentUpdate(nextProp, nextState) {
    if ( nextProp === this.props ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setState({
      x: this.props.x,
      y: this.props.y,
      steps: this.props.steps
    });
    this.draw()
  }

  resetColors() {
    const baseColor = this.props.steps - 1;

    this.totalColors = 0
    this.lastColor = null
    this.color = { r: baseColor, g: baseColor, b: baseColor } // Safely ignore 0 as starting number.
    this.pos = { x: 0, y: 0 } // pos = (pos)ition
  }

  draw() {
    // Ensure that we don't have an existing dataset of colors
    this.resetColors();

    this.ctx = this.canvas.current.getContext("2d") // ctx = (c)anvas con(t)e(x)t
    
    // Clear canvas just to be sure
    this.ctx.clearRect( 0, 0, this.canvas.current.width, this.canvas.current.height )
    
    this.canvas.current.width = this.props.x
    this.canvas.current.height = this.props.y

    // Keep start atomic time for benchmark
    let then = performance.now()

    this.loopColors( "r" )
    this.props.onChange( {
      duration: performance.now() - then, // Benchmark algorithm duration
      imageData: this.canvas.current.toDataURL(), // Draw data in base64
      totalColors: this.totalColors
    } )
  }

  resetColor( target ) {
    this.color[target] = this.props.steps - 1
  }

  loopColors( target ) {
    this.resetColor( target )

    while ( this.color[target] <= 255 ) {
      if ( target === "r" ) {
        this.loopColors("g")
      }
      else if ( target === "g" ) {
        this.loopColors("b")
      }

      this.drawPixel()

      
      if ( this.color[target] < 255 ) {
        this.color[target] += this.state.steps
        if ( this.totalColors > this.state.x * this.state.y ) {
          console.log("reached max colors");
          // No point continuing search for more colors if we have reached canvas pixels max
          return
        }
      } else {
        break
      }
    }
  }
  
  drawPixel() {
    let hex = `#${[this.convertToHex(this.color.r), this.convertToHex(this.color.g), this.convertToHex(this.color.b)].join("")}`

    // Prevent printing the same color recently printed.
    if ( hex === this.lastColor ) {
      return
    }
    this.lastColor = hex

    this.ctx.fillStyle = hex
    this.ctx.fillRect( this.pos.x++, this.pos.y, 1, 1 )
    
    // Go to the next line
    if ( this.pos.x >= this.state.x ) {
      this.pos.y++
      this.pos.x = 0
    }
    this.totalColors++
  }

  convertToHex( base10 ) {
    // Convert to base 16 and cast to string
    let stringHex = Number( base10 ).toString(16)
    
    /**
     * Pad zero to lonely numbers including hexadecimals and cast them to string.
     * 
     * 0xf is a simple way to determine when the number is converted to hex, it still needs leading
     * zeroes.
     * 
     * e.g.:
     *  9 = 09
     *  a (10) = 0a
     *  f (15) = 0f
     */
    if ( base10 <= 0xf ) {
      stringHex = "0" + stringHex
    }
    
    return stringHex
  }

  render() {
    return ( <canvas ref={this.canvas} /> )
  }
}

export default Basic
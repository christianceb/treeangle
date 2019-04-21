"use strict";
(function($){
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d"); // ctx = (c)anvas con(t)e(x)t
  
  const dimensions = { x: 256, y: 128 };
  const steps = 8;
  const color = { r: 7, g: 7, b: 7 }; // Safely ignore 0 as starting number.
  const pos = { x: 0, y: 0 }; // pos = (pos)ition

  const anchor = $.querySelector("a");
  const div = $.querySelector("div"); // Since canvas can't render ::before/::after pseudo, let's use a parent container.

  let total_colors = 0;
  let last_color;

  canvas.width = dimensions.x;
  canvas.height = dimensions.y;
  
  let then = performance.now();
  loopColors("r");
  div.dataset.duration = performance.now() - then; // Benchmark algorithm duration

  anchor.href = canvas.toDataURL();
  anchor.download = "discrete-colors.png";

  function loopColors( target ) {
    color[target] = 7;

    while ( color[target] <= 255 ) {
      if ( target == "r" ) {
        loopColors("g");
      }
      else if ( target == "g" ) {
        loopColors("b");
      }

      drawPixel();

      if ( color[target] < 255 ) {
        color[target] += steps;
      } else {
        break;
      }
    }
  }

  function convertToHex( base10 ) {
    // Convert to base 16 and cast to string
    var stringHex = Number( base10 ).toString(16);
    
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
      stringHex = "0" + stringHex;
    }
    
    return stringHex;
  }
  
  function drawPixel() {
    var hex = `#${[convertToHex(color.r), convertToHex(color.g), convertToHex(color.b)].join("")}`;

    // Prevent printing the same color recently printed.
    if ( hex == last_color ) {
      return;
    }
    last_color = hex;

    ctx.fillStyle = hex;
    ctx.fillRect( pos.x++, pos.y, 1, 1 );
    
    if ( pos.x == dimensions.x ) {
      pos.y++;
      pos.x = 0;
    }
    total_colors++;
  }
})(document);
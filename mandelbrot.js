

const canvas = document.getElementById('fractal-drawing');

if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  console.log('ok');

  canvas.height = 400;
  canvas.width = 400;

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, 400, 400);

  for (let x = -2; x < 2; x = x + 0.005 ) {
    for (let y = -2; y < 2; y = y + 0.005 ) {
        let color = calculatePixel( x , y );
        drawPixel( x, y, color );
    }
  }

  function calculatePixel( x , y ) {

    let result = true;

    if ( calculateDistanceAfterIterations( x, y, 100 ) < 2 ) {
        result = false;
    }
    return result;
  }

  function calculateDistanceAfterIterations( x, y, n ) {

    let z = calculateIteration( 0, 0, x, y );

    for ( let i = 0; i < n; i++ ) {
        z = calculateIteration( z[0], z[1], x, y );
    }

    let result = calcAbsValue( z[0], z[1] );
    return result;
  }

  /**
   * Calculates Z^2 + C, where Z and C are complex number
   * @param {float} z_r real part of Z
   * @param {float} z_im imaginary part of Z
   * @param {float} c_r real part of C
   * @param {float} c_im imaginary part of C
   * @returns array
   */
  function calculateIteration( z_r, z_im, c_r, c_im ) {

    // (z_r + z_im * i)^2 = (z_r + z_im * i) * (z_r + z_im * i) 
    // = z_r * (z_r + z_im * i) + z_im * (z_r + z_im * i) 
    // = z_r ^2 + 2 ( z_r * z_im * i ) + ( z_im * i ) ^2
    // real part: z_r^2 - z_im^2 
    // imaginary part: 2 * z_r * z_im

    let new_z_r = ( z_r * z_r ) - ( z_im * z_im );
    let new_z_im =  2 * z_r * z_im;

    return [new_z_r + c_r, new_z_im + c_im];
  }

  function calcAbsValue( x, y ) {
    return Math.sqrt( (x * x) + (y * y) );
  }

  function drawPixel( x, y, color ) {

    if ( color ) {
      ctx.fillStyle = 'rgb(200, 200, 200)';
    }
    else {
      ctx.fillStyle = 'rgb(0, 0, 0)';
    }
    
    ctx.fillRect(200*x + 300, 200*y + 200, 1, 1);
   
  }
} 
else {
  // canvas-unsupported code here
  console.log('oops');
}

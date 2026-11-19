const sharp = require('sharp');

sharp('public/campus-hero-right-exact.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    console.log(`Analyzing diagonal transition in 604x341 crop:`);

    // Sample at y = 10, 50, 100, 150, 200, 250, 300
    [10, 50, 100, 150, 200, 250, 300].forEach(y => {
      // Find where blue stripe or yellow stripe is:
      // In Screenshot 2, the blue stripe has high blue and cyan: b > 200, r < 180, or similar
      // Or let's print color changes along row y
      let transitionStart = -1;
      for (let x = 0; x < 200; x++) {
        const i = (y * width + x) * 3;
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r < 235 || g < 235 || b < 235) {
          transitionStart = x;
          console.log(`y=${y}: transition starts at x=${x}, RGB=(${r},${g},${b})`);
          break;
        }
      }
    });
  });


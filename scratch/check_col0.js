const sharp = require('sharp');

sharp('public/campus-hero-ref2.jpg')
  .extract({ left: 435, top: 60, width: 589, height: 341 })
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    console.log(`Extracted: ${width}x${height}`);
    // Check first column x=0
    let nonWhiteInCol0 = 0;
    for (let y = 0; y < height; y++) {
      const idx = (y * width + 0) * 3;
      if (data[idx] < 250 || data[idx+1] < 250 || data[idx+2] < 250) {
        nonWhiteInCol0++;
      }
    }
    console.log(`Non-white in col 0: ${nonWhiteInCol0} / ${height}`);
  });


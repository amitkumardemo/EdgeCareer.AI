const sharp = require('sharp');

sharp('public/campus-hero-ref2.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    console.log(`Dimensions: ${width}x${height}`);

    // Scan horizontal line across hero at y = 150, 200, 250, 300, 350
    // To find where white left ends and where the diagonal image / stripe starts
    const testYs = [80, 120, 160, 200, 240, 280, 320, 360, 390];
    testYs.forEach(y => {
      let firstNonWhiteX = -1;
      for (let x = 300; x < width; x++) {
        const idx = (y * width + x) * 3;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        // if not almost white:
        if (r < 245 || g < 245 || b < 245) {
          firstNonWhiteX = x;
          break;
        }
      }
      console.log(`At y=${y}, first non-white x=${firstNonWhiteX}`);
    });
  });


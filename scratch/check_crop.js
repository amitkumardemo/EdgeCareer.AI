const sharp = require('sharp');

sharp('public/campus-hero-right-exact.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    // Let's inspect column by column from x=0 to 100
    // In original, x=420 was start. Let's see if there are any dark text pixels in x=0 to 100:
    for (let x = 0; x < 100; x += 10) {
      let darkCount = 0;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 3;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r < 80 && g < 80 && b < 80) darkCount++;
      }
      console.log(`Cropped x=${x} (orig ${420+x}): dark pixels count = ${darkCount}`);
    }
  });


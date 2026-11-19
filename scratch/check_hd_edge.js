const sharp = require('sharp');

sharp('public/campus-hero-students-banner-hd.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log(`Dimensions: ${info.width}x${info.height}`);
    // Check at y = 100, 500, 900 where the transition starts:
    [100, 500, 900].forEach(y => {
      for (let x = 0; x < 500; x += 10) {
        const i = (y * info.width + x) * 3;
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r < 245 || g < 245 || b < 245) {
          console.log(`y=${y}: starts at x=${x}, RGB=(${r},${g},${b})`);
          break;
        }
      }
    });
  });


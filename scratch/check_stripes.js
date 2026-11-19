const sharp = require('sharp');

sharp('public/campus-hero-ref2.jpg')
  .extract({ left: 455, top: 60, width: 569, height: 341 })
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    console.log(`Checking colors across diagonal transition in crop (left=455):`);
    // Sample across x at y = 100, 150, 200
    [60, 100, 140].forEach(y => {
      console.log(`--- Row y=${y} ---`);
      for (let x = 20; x < 90; x += 5) {
        const i = (y * width + x) * 3;
        const r = data[i], g = data[i+1], b = data[i+2];
        console.log(`  x=${x}: RGB=(${r},${g},${b})`);
      }
    });
  });


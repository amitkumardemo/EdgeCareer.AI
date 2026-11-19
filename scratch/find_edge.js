const sharp = require('sharp');

sharp('public/campus-hero-ref2.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;

    // Check navbar boundary: row where full width (x: 100 to 900) is white or light border
    for (let y = 50; y < 90; y++) {
      let isLine = true;
      for (let x = 200; x < 800; x++) {
        const idx = (y * width + x) * 3;
        if (data[idx] < 240) { isLine = false; break; }
      }
      if (isLine) {
        console.log(`Clean white navbar line at y=${y}`);
      }
    }

    // Check the diagonal line:
    // In Screenshot 2, the photograph starts around x=480..580.
    // Let's find where the building / tree / student starts by looking for photo pixels (e.g. saturation > 15 or tree greenery or building tone)
    for (let y = 70; y < 400; y += 30) {
      for (let x = 450; x < 650; x++) {
        const idx = (y * width + x) * 3;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        // not white and not text: photo pixels
        if (r < 235 || g < 235 || b < 235) {
          // let's check next 5 pixels
          let solid = true;
          for (let dx = 0; dx < 10; dx++) {
            const i2 = (y * width + (x + dx)) * 3;
            if (data[i2] > 250 && data[i2+1] > 250 && data[i2+2] > 250) solid = false;
          }
          if (solid) {
            console.log(`Photo/accent edge at y=${y}: x=${x}, color=rgb(${r},${g},${b})`);
            break;
          }
        }
      }
    }
  });


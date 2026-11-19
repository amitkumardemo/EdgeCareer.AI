const sharp = require('sharp');

sharp('public/campus-hero-students-banner.jpg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log(`campus-hero-students-banner.jpg: ${info.width}x${info.height}`);
    // Check corners
    console.log(`Top-left: RGB(${data[0]}, ${data[1]}, ${data[2]})`);
    const tr = (info.width - 1) * 3;
    console.log(`Top-right: RGB(${data[tr]}, ${data[tr+1]}, ${data[tr+2]})`);
    const bl = ((info.height - 1) * info.width) * 3;
    console.log(`Bottom-left: RGB(${data[bl]}, ${data[bl+1]}, ${data[bl+2]})`);
    const br = ((info.height - 1) * info.width + info.width - 1) * 3;
    console.log(`Bottom-right: RGB(${data[br]}, ${data[br+1]}, ${data[br+2]})`);
  });


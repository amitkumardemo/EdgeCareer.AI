const sharp = require('sharp');

// Let's crop from y=60 to 401 (height = 341) and x=420 to 1024 (width = 604)
sharp('public/campus-hero-ref2.jpg')
  .extract({ left: 420, top: 60, width: 604, height: 341 })
  .toFile('public/campus-hero-right-exact.jpg')
  .then(info => {
    console.log('Created campus-hero-right-exact.jpg:', info);
  });


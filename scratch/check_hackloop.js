const sharp = require('sharp');

sharp('public/hero-slides/hackloop_awards.jpg')
  .metadata()
  .then(meta => {
    console.log('hackloop_awards metadata:', meta.width, meta.height);
  });


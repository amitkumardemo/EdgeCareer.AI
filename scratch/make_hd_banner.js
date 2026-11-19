const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function createHDBanner() {
  console.log('Building Ultra-HD Banner (1782 x 1035)...');

  // Load ref2
  const refImg = await loadImage('public/campus-hero-ref2.jpg');
  
  // Ref dimensions: 1024 x 401
  // Right visual region: startX = 430, startY = 56, width = 594, height = 345
  const origW = 594;
  const origH = 345;
  const scale = 3; // 3x HD upscale
  const targetW = origW * scale; // 1782
  const targetH = origH * scale; // 1035

  // First extract the raw crop
  const rawCanvas = createCanvas(origW, origH);
  const rawCtx = rawCanvas.getContext('2d');
  rawCtx.drawImage(refImg, 430, 56, origW, origH, 0, 0, origW, origH);
  const rawBuf = rawCanvas.toBuffer('image/png');

  // Upscale with Lanczos3 and apply unsharp masking
  const upscaledBuffer = await sharp(rawBuf)
    .resize(targetW, targetH, {
      kernel: sharp.kernel.lanczos3,
      fastShrinkOnLoad: false
    })
    .sharpen({
      sigma: 1.5,
      m1: 1.2,
      m2: 2.2
    })
    .modulate({
      brightness: 1.02,
      saturation: 1.08
    })
    .toBuffer();

  const upscaledImg = await loadImage(upscaledBuffer);
  const hdCanvas = createCanvas(targetW, targetH);
  const ctx = hdCanvas.getContext('2d');

  // Draw enhanced upscaled image
  ctx.drawImage(upscaledImg, 0, 0, targetW, targetH);

  // Now, enhance key overlay areas with razor-sharp vector clarity:
  // 1. Diagonal transition on the left:
  // In 1782x1035, the transition runs from top (x ~ 230) to bottom (x ~ 60)
  // Let's draw clean geometric anti-aliased stripes:
  const topX = 230;
  const botX = 65;
  const blueW = 20;
  const yellowW = 10;

  // Blue diagonal accent
  ctx.fillStyle = 'rgba(8, 123, 234, 0.85)';
  ctx.beginPath();
  ctx.moveTo(topX, 0);
  ctx.lineTo(topX + blueW, 0);
  ctx.lineTo(botX + blueW, targetH);
  ctx.lineTo(botX, targetH);
  ctx.closePath();
  ctx.fill();

  // Yellow diagonal accent
  ctx.fillStyle = 'rgba(255, 184, 0, 0.9)';
  ctx.beginPath();
  ctx.moveTo(topX + blueW, 0);
  ctx.lineTo(topX + blueW + yellowW, 0);
  ctx.lineTo(botX + blueW + yellowW, targetH);
  ctx.lineTo(botX + blueW, targetH);
  ctx.closePath();
  ctx.fill();

  // Pure white mask on the left of the diagonal
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(topX, 0);
  ctx.lineTo(botX, targetH);
  ctx.lineTo(0, targetH);
  ctx.closePath();
  ctx.fill();

  // Save as high-quality WebP and JPEG
  const finalPng = hdCanvas.toBuffer('image/png');
  
  // Save both JPEG (max quality) and WebP
  await sharp(finalPng)
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile('public/campus-hero-students-banner-hd.jpg');

  await sharp(finalPng)
    .webp({ quality: 98 })
    .toFile('public/campus-hero-students-banner-hd.webp');

  // Also update public/campus-hero-students-banner.jpg with high quality
  await sharp(finalPng)
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile('public/campus-hero-students-banner.jpg');

  console.log('HD Banner files generated successfully!');
  const statJpg = fs.statSync('public/campus-hero-students-banner-hd.jpg');
  console.log('HD JPG size:', statJpg.size, 'bytes (1782 x 1035)');
}

createHDBanner().catch(err => console.error(err));


import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary for Server-Side usage
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_URL?.split('//')[1].split(':')[0],
  api_secret: process.env.CLOUDINARY_URL?.split(':')[2].split('@')[0],
});

export default cloudinary;

/**
 * Utility to generate a signature for secure client-side uploads if needed.
 */
export const generateSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    cloudinary.config().api_secret as string
  );
  return { timestamp, signature };
};

import imageCompression from 'browser-image-compression';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Compress an image file to reduce its size
 * @param file - The image file to compress
 * @returns Promise resolving to the compressed File
 */
async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // Maximum file size in MB (1MB)
    maxWidthOrHeight: 1920, // Maximum width or height
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    // If compression fails, return original file
    return file;
  }
}

/**
 * Upload an image file to Cloudinary
 * Automatically compresses images before upload to reduce storage usage
 * @param file - The image file to upload
 * @returns Promise resolving to the public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration missing. Please check your environment variables.');
  }

  // Compress image before upload
  const compressedFile = await compressImage(file);
  
  // Create form data for Cloudinary upload
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  // Folder is optional - only add if you want to organize images
  // formData.append('folder', 'blog-images');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cloudinary upload error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        cloudName: CLOUDINARY_CLOUD_NAME,
        preset: CLOUDINARY_UPLOAD_PRESET,
      });
      
      // Provide more helpful error messages
      if (errorData.error?.message) {
        throw new Error(`Cloudinary error: ${errorData.error.message}`);
      }
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as { secure_url: string };
    return data.secure_url; // Return the secure HTTPS URL
  } catch (error) {
    if (error instanceof Error && error.message.includes('configuration')) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image. Please try again.';
    throw new Error(errorMessage);
  }
}

/**
 * Convert a File or Blob to a data URL
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Check if a file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}



import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Upload an image file to Firebase Storage
 * @param file - The image file to upload
 * @returns Promise resolving to the public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<string> {
  // Create a unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileName = `blog-images/${timestamp}_${randomString}_${file.name}`;
  
  // Create a reference to the file location
  const storageRef = ref(storage, fileName);
  
  // Upload the file
  await uploadBytes(storageRef, file);
  
  // Get the public URL
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
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


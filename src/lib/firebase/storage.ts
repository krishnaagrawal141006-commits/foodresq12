// ==========================================
// Firebase Storage Service
// ==========================================

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export async function uploadFoodImage(file: File, donorId: string): Promise<string> {
  const timestamp = Date.now();
  const path = `donations/${donorId}/${timestamp}_${file.name}`;
  return uploadImage(file, path);
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const path = `avatars/${userId}/${file.name}`;
  return uploadImage(file, path);
}

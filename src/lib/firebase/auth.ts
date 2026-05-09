// ==========================================
// Firebase Auth Service
// ==========================================

import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  type ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import type { UserRole } from '@/lib/types';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export function setupRecaptcha(elementId: string) {
  const recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
    size: 'invisible',
  });
  return recaptchaVerifier;
}

export async function sendOTP(phone: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
  return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function createUserProfile(uid: string, data: {
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  organization?: string;
  address?: string;
}) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    ...data,
    verified: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

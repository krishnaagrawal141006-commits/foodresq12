// ==========================================
// Firebase Firestore Service
// ==========================================

import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD helpers

export async function addDocument(collectionName: string, data: DocumentData): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function setDocument(collectionName: string, docId: string, data: DocumentData): Promise<void> {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getDocument(collectionName: string, docId: string): Promise<DocumentData | null> {
  const snap = await getDoc(doc(db, collectionName, docId));
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

export async function queryDocuments(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<DocumentData[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateDocument(collectionName: string, docId: string, data: DocumentData): Promise<void> {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, docId));
}

// Realtime listeners

export function subscribeToCollection(
  collectionName: string,
  callback: (docs: DocumentData[]) => void,
  ...constraints: QueryConstraint[]
): Unsubscribe {
  const q = query(collection(db, collectionName), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(docs);
  });
}

export function subscribeToDocument(
  collectionName: string,
  docId: string,
  callback: (doc: DocumentData | null) => void
): Unsubscribe {
  return onSnapshot(doc(db, collectionName, docId), (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  });
}

// Donation-specific helpers
export { where, orderBy, limit, serverTimestamp };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAG_EBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

export const getAvatarFileRef = (userID, fileType) =>
  ref(storage, `avatars/${userID}.${fileType}`);
export const getUserMemesFileRef = (userID, fileName) =>
  ref(storage, `memes/${userID}/${fileName}`);

export const usersCollection = collection(db, 'users');
export const memesCollection = collection(db, 'memes');

export default auth;

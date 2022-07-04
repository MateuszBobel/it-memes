import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREVASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREVASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREVASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREVASE_STORAG_EBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREVASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREVASE_APP_ID,
});

const auth = getAuth(app);

export default auth;

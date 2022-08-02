import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  setUser,
  fetchUserLoading,
  fetchUserError,
  loginUserLoading,
  loginUserError,
  registerUserLoading,
  registerUserError,
  resetPasswordLoading,
  resetPasswordError,
  logoutUserLoading,
  logoutUserError,
  removeUserLoading,
  removeUserError,
} from './auth.slice';

import { setProfileInfo } from '../profileSlice/profile.slice';

import auth, { usersCollection } from '../../firebase';

export const fetchUser = () => (dispatch) => {
  dispatch(fetchUserLoading(true));
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(usersCollection, user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(setProfileInfo(docSnap.data()));
        dispatch(setUser(user));
        dispatch(fetchUserLoading(false));
      } else {
        dispatch(setUser(null));
        dispatch(fetchUserLoading(false));
      }
    });
  } catch (err) {
    dispatch(fetchUserError(err.code));
    dispatch(fetchUserLoading(false));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginUserLoading(true));
  try {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginUserLoading(false));
  } catch (err) {
    dispatch(loginUserError(err.code));
    dispatch(loginUserLoading(false));
  }
};

export const registerUser = (email, password, name) => async (dispatch) => {
  dispatch(registerUserLoading(true));
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = doc(usersCollection, resp.user.uid);
    await setDoc(docRef, {
      uid: resp.user.uid,
      createdAt: new Date(),
      name,
      jobPosition: '',
      city: '',
      profilImage: '',
    });
    dispatch(registerUserLoading(false));
  } catch (err) {
    dispatch(registerUserError(err.code));
    dispatch(registerUserLoading(false));
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch(resetPasswordLoading(true));
  try {
    await sendPasswordResetEmail(auth, email);
    dispatch(resetPasswordLoading(false));
  } catch (err) {
    dispatch(resetPasswordError(err.code));
    dispatch(resetPasswordLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUserLoading(true));
  try {
    await signOut(auth);
    dispatch(logoutUserLoading(false));
  } catch (err) {
    dispatch(logoutUserError(err.code));
    dispatch(logoutUserLoading(false));
  }
};

export const removeUser = () => async (dispatch) => {
  dispatch(removeUserLoading(true));
  try {
    await deleteUser(auth.getAuth().currentUser);
    dispatch(removeUserLoading(false));
  } catch (err) {
    dispatch(removeUserError(err.code));
    dispatch(removeUserLoading(false));
  }
};

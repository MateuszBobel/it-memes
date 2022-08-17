/* eslint-disable import/prefer-default-export */
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  setUserInfo,
  userInfoLoading,
  userInfoError,
  userMemesLoading,
  userMemesError,
} from './content.slice';
import {
  memesCollection,
  usersCollection,
  getUserMemesFileRef,
} from '../../firebase';

export const uploadMeme = (meme) => async (dispatch, getState) => {
  dispatch(userMemesLoading(true));
  try {
    const profileID = getState().auth.user.uid;
    const ref = getUserMemesFileRef(profileID, meme.file.name);
    const uploadedFile = await uploadBytes(ref, meme.file);
    const fileUrl = await getDownloadURL(uploadedFile.ref);
    const memeDocRef = doc(memesCollection);
    await setDoc(memeDocRef, { ...meme, authorId: profileID, file: fileUrl });
    dispatch(userMemesLoading(false));
  } catch (err) {
    dispatch(userMemesError(err.code));
    dispatch(userMemesLoading(false));
  }
};

export const getUserInfo = (uid) => async (dispatch) => {
  dispatch(userInfoLoading(true));
  try {
    const docRef = doc(usersCollection, uid);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    if (!userInfo) {
      throw new Error('User not found');
    }
    dispatch(setUserInfo(userInfo));
    dispatch(userInfoLoading(false));
  } catch (err) {
    dispatch(userInfoError(err.message));
    dispatch(userInfoLoading(false));
  }
};

/* eslint-disable import/prefer-default-export */
import { setDoc, doc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { userMemesLoading, userMemesError } from './content.slice';
import { memesCollection, getUserMemesFileRef } from '../../firebase';

export const uploadMeme = (meme) => async (dispatch, getState) => {
  dispatch(userMemesLoading(true));
  try {
    const profileID = getState().auth.user.uid;
    const ref = getUserMemesFileRef(profileID, meme.file.name);
    const uploadedFile = await uploadBytes(ref, meme.file);
    const fileUrl = await getDownloadURL(uploadedFile.ref);
    const memeDocRef = doc(memesCollection, profileID);
    await setDoc(memeDocRef, { ...meme, file: fileUrl });
    dispatch(userMemesLoading(false));
  } catch (err) {
    dispatch(userMemesError(err.code));
    dispatch(userMemesLoading(false));
  }
};

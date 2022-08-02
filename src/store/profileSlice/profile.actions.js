/* eslint-disable import/prefer-default-export */
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  setProfileInfo,
  profileInfoLoading,
  profileInfoError,
  setProfileAvatar,
  profileAvatarLoading,
  profileAvatarError,
} from './profile.slice';
import { usersCollection, getAvatarFileRef } from '../../firebase';
import { extractFileExtention } from '../../helpers';

export const updateProfileInfo =
  (name, jobPosition, city) => async (dispatch, getState) => {
    dispatch(profileInfoLoading(true));
    try {
      const profileID = getState().auth.user.uid;
      const userDocRef = doc(usersCollection, profileID);
      await updateDoc(userDocRef, {
        name,
        jobPosition,
        city,
      });
      const profile = await getDoc(userDocRef);
      dispatch(setProfileInfo(profile.data()));
      dispatch(profileInfoLoading(false));
    } catch (err) {
      dispatch(profileInfoError(err.code));
      dispatch(profileInfoLoading(false));
    }
  };

export const updateProfileAvatar = (file) => async (dispatch, getState) => {
  dispatch(profileAvatarLoading(true));
  try {
    const profileID = getState().auth.user.uid;
    const fileExtention = extractFileExtention(file.name);
    const ref = getAvatarFileRef(profileID, fileExtention);
    const uploadedFile = await uploadBytes(ref, file);
    const fileUrl = await getDownloadURL(uploadedFile.ref);
    const userDocRef = doc(usersCollection, profileID);
    await updateDoc(userDocRef, {
      avatar: fileUrl,
    });

    dispatch(setProfileAvatar(fileUrl));
    dispatch(profileAvatarLoading(false));
  } catch (err) {
    dispatch(profileAvatarError(err.code));
    dispatch(profileAvatarLoading(false));
  }
};

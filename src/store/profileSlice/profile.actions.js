/* eslint-disable import/prefer-default-export */
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import {
  setProfileInfo,
  profileInfoLoading,
  profileInfoError,
} from './profile.slice';

import { usersCollection } from '../../firebase';

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

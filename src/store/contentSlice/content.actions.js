import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  setViewedUser,
  viewedUserLoading,
  viewedUserError,
  setViewedUserMemes,
  viewedUserMemesLoading,
  viewedUserMemesError,
  setDashboardMemes,
  dashboardMemesLoading,
  dashboardMemesError,
  setViewedMeme,
  setViewedMemeLoading,
  setViewedMemeError,
  uploadMemeLoading,
  uploadMemeError,
} from './content.slice';
import {
  memesCollection,
  usersCollection,
  getUserMemesFileRef,
} from '../../firebase';

export const uploadMeme = (meme) => async (dispatch, getState) => {
  dispatch(uploadMemeLoading(true));
  try {
    const profileID = getState().auth.user.uid;
    const ref = getUserMemesFileRef(profileID, meme.file.name);
    const uploadedFile = await uploadBytes(ref, meme.file);
    const fileUrl = await getDownloadURL(uploadedFile.ref);
    const memeDocRef = doc(memesCollection);
    await setDoc(memeDocRef, {
      ...meme,
      authorId: profileID,
      createdAt: new Date(),
      file: fileUrl,
    });
    dispatch(uploadMemeLoading(false));
  } catch (err) {
    dispatch(uploadMemeError(err.code));
    dispatch(uploadMemeLoading(false));
  }
};

export const getUserInfo = (uid) => async (dispatch) => {
  dispatch(viewedUserLoading(true));
  try {
    const docRef = doc(usersCollection, uid);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    if (!userInfo) {
      throw new Error('User not found');
    }
    dispatch(setViewedUser(userInfo));
    dispatch(viewedUserLoading(false));
  } catch (err) {
    dispatch(viewedUserError(err.message));
    dispatch(viewedUserLoading(false));
  }
};

export const getMemeInfo = (id) => async (dispatch) => {
  dispatch(setViewedMemeLoading(true));
  try {
    const memeDocRef = doc(memesCollection, id);
    const memeDocSnap = await getDoc(memeDocRef);
    const memeInfo = memeDocSnap.data();
    if (!memeInfo) {
      throw new Error('Meme not found');
    }
    const docRef = doc(usersCollection, memeInfo.authorId);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    dispatch(
      setViewedMeme({
        id,
        authorAvatar: userInfo.avatar,
        ...memeInfo,
      })
    );
    dispatch(setViewedMemeLoading(false));
  } catch (err) {
    dispatch(setViewedMemeError(err.message));
    dispatch(setViewedMemeLoading(false));
  }
};

export const getMemes = () => async (dispatch) => {
  dispatch(dashboardMemesLoading(true));
  try {
    const memes = [];
    let lastKey = null;
    const q = query(memesCollection, orderBy('createdAt', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((el) => {
      memes.push({ id: el.id, authorAvatar: '', ...el.data() });
      lastKey = el.data().createdAt;
    });
    const memesWithUsersAvatar = await Promise.all(
      memes.map(async (meme) => {
        const docRef = doc(usersCollection, meme.authorId);
        const docSnap = await getDoc(docRef);
        return { ...meme, authorAvatar: docSnap.data().avatar };
      })
    );
    dispatch(setDashboardMemes({ memes: memesWithUsersAvatar, lastKey }));
    dispatch(dashboardMemesLoading(false));
  } catch (err) {
    dispatch(dashboardMemesError(err.code));
    dispatch(dashboardMemesLoading(false));
  }
};

export const loadMoreMemes = (key) => async (dispatch, getState) => {
  dispatch(dashboardMemesLoading(true));
  try {
    const loadedMemes = getState().content.dashboardMemes;
    const memes = [];
    let lastKey = null;
    const q = query(
      memesCollection,
      orderBy('createdAt', 'desc'),
      startAfter(key),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((el) => {
      memes.push({ id: el.id, authorAvatar: '', ...el.data() });
      lastKey = el.data().createdAt;
    });
    const memesWithUsersAvatar = await Promise.all(
      memes.map(async (meme) => {
        const docRef = doc(usersCollection, meme.authorId);
        const docSnap = await getDoc(docRef);
        return { ...meme, authorAvatar: docSnap.data().avatar };
      })
    );
    const allMemes = [...loadedMemes, ...memesWithUsersAvatar];
    dispatch(setDashboardMemes({ memes: allMemes, lastKey }));
    dispatch(dashboardMemesLoading(false));
  } catch (err) {
    dispatch(dashboardMemesError(err.code));
    dispatch(dashboardMemesLoading(false));
  }
};

export const getUserMemes = (uid) => async (dispatch) => {
  dispatch(viewedUserMemesLoading(true));
  try {
    const memes = [];
    let lastKey = null;
    const q = query(
      memesCollection,
      where('authorId', '==', uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const docRef = doc(usersCollection, uid);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    querySnapshot.forEach((el) => {
      memes.push({ id: el.id, authorAvatar: userInfo.avatar, ...el.data() });
      lastKey = el.data().createdAt;
    });
    dispatch(setViewedUserMemes({ memes, lastKey }));
    dispatch(viewedUserMemesLoading(false));
  } catch (err) {
    dispatch(viewedUserMemesError(err.code));
    dispatch(viewedUserMemesLoading(false));
  }
};

export const loadMoreUserMemes = (uid, key) => async (dispatch, getState) => {
  dispatch(viewedUserMemesLoading(true));
  try {
    const loadedMemes = getState().content.viewedUserMemes;
    const memes = [...loadedMemes];
    let lastKey = null;
    const q = query(
      memesCollection,
      where('authorId', '==', uid),
      orderBy('createdAt', 'desc'),
      startAfter(key),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const docRef = doc(usersCollection, uid);
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    querySnapshot.forEach((el) => {
      memes.push({ id: el.id, authorAvatar: userInfo.avatar, ...el.data() });
      lastKey = el.data().createdAt;
    });
    dispatch(setViewedUserMemes({ memes, lastKey }));
    dispatch(viewedUserMemesLoading(false));
  } catch (err) {
    dispatch(viewedUserMemesError(err.code));
    dispatch(viewedUserMemesLoading(false));
  }
};

import auth from '../firebase';

export default [
  {
    name: 'My Profile',
    isLink: true,
    link: `/profile/${auth.currentUser.uid}`,
  },
  { name: 'Settings', isLink: true, link: '/settings' },
  { name: 'Logout', isLink: false, link: null },
];

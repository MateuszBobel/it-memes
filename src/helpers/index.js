export const emailValidation = (emailValue) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailValue) {
    return 'Email is required';
  }
  if (!re.test(emailValue)) {
    return 'This is not valid email';
  }
  return '';
};

export const passwordValidation = (passwordValue) => {
  if (!passwordValue) {
    return 'Password is required';
  }
  if (passwordValue.length < 6) {
    return 'Minimum of 6 characters required';
  }
  return '';
};

export const nameValidation = (nameValue) => {
  if (!nameValue) {
    return 'Name is required';
  }
  return '';
};

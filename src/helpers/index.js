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

export const basicInputValidation = (value, name) => {
  if (!value) {
    return `${name} is required`;
  }
  return '';
};

export const extractFileExtention = (fileName, defaultExtention = 'jpg') => {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(fileName)[1];
  if (ext) {
    return ext;
  }
  return defaultExtention;
};

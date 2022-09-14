import {
  emailValidation,
  passwordValidation,
  basicInputValidation,
  extractFileExtention,
  toDateTime,
} from './index';

it('should return validation message if empty string passed', () => {
  const expectedValidationMessage = 'Email is required';
  const validationResult = emailValidation('');
  expect(validationResult).toBe(expectedValidationMessage);
});

it('should return validation message if not email passed', () => {
  const expectedValidationMessage = 'This is not valid email';
  const randomTextThatIsNotAnEmail = (Math.random() + 1)
    .toString(36)
    .substring(7);
  const validationResult = emailValidation(randomTextThatIsNotAnEmail);
  expect(validationResult).toBe(expectedValidationMessage);
});

it('should return empty validation message if valid email passed', () => {
  const validEmail = 'test-email@gmail.com';
  const validationResult = emailValidation(validEmail);
  expect(validationResult).toBe('');
});

it('should return validation message if empty string passed', () => {
  const expectedValidationMessage = 'Password is required';
  const password = '';
  const validationResult = passwordValidation(password);
  expect(validationResult).toBe(expectedValidationMessage);
});

it('should return validation message if password is not 6 character long', () => {
  const expectedValidationMessage = 'Minimum of 6 characters required';
  const fiveCharacterPassword = 'abcde';
  const validationResult = passwordValidation(fiveCharacterPassword);
  expect(validationResult).toBe(expectedValidationMessage);
});

it('should return empty validation message if password is at least 6 character long', () => {
  const sixCharacterPassword = 'abcdef';
  const validationResult = passwordValidation(sixCharacterPassword);
  expect(validationResult).toBe('');
});

it('should return validation message if empty string passed', () => {
  const value = '';
  const inputName = 'test input';
  const validationResult = basicInputValidation(value, inputName);
  const expectedValidationMessage = `${inputName} is required`;
  expect(validationResult).toBe(expectedValidationMessage);
});

it('should extract file extention from file name', () => {
  const fileName = 'test-file-name.png';
  const fileExtension = extractFileExtention(fileName);
  expect(fileExtension).toBe('png');
});

it('should return jpg as defualt file extension if file name does not have one', () => {
  const fileNameWithoutExtension = 'test-file-name';
  const fileExtension = extractFileExtention(fileNameWithoutExtension);
  expect(fileExtension).toBe('jpg');
});

it('should convert seconds into the string date', () => {
  const sec = 1661847847;
  expect(toDateTime(sec)).toBe('Aug 30 2022');
});

it('should convert seconds as string into the string date', () => {
  const sec = '1661847847';
  expect(toDateTime(sec)).toBe('Aug 30 2022');
});

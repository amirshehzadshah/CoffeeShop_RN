import * as Yup from 'yup';

const validationSchemaSignUp = Yup.object().shape({
  username: Yup.string()
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default validationSchemaSignUp;


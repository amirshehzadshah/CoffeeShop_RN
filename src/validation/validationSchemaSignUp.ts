import * as Yup from 'yup';

const validationSchemaSignUp = Yup.object().shape({
  username: Yup.string()
    .required('*Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('*Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('*Password is required'),
});

export default validationSchemaSignUp;

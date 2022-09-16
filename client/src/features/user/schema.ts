import * as yup from 'yup';

// Error message constants
const EMAIL_MESSAGE = 'Email must be a valid email.';
const LETTERS_ONLY_MESSAGE = 'Must only contain letters.';
const requiredMessage = (field: string) => `${field} is a required field.`;
const minLengthMessage = (field: string, length: number) =>
    `${field} must be at least ${length} characters.`;
const maxLengthMessage = (field: string, length: number) =>
    `${field} can't exceed ${length} characters.`;

// Regex patterns
// - only letters
const letters = /^[A-Za-z' ']+$/;

// Regex for password
// - must include at least a number and one special character
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

// Login Schema
export const loginSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email(EMAIL_MESSAGE)
            .required(requiredMessage('Email')),
        password: yup.string().required(requiredMessage('Password')),
    })
    .required();

// Register schema
export const registerSchema = yup
    .object()
    .shape({
        firstName: yup
            .string()
            .required(requiredMessage('First name'))
            .matches(letters, LETTERS_ONLY_MESSAGE),
        lastName: yup
            .string()
            .required(requiredMessage('Last name'))
            .matches(letters, LETTERS_ONLY_MESSAGE),
        email: yup
            .string()
            .email(EMAIL_MESSAGE)
            .required(requiredMessage('Email')),
        password: yup
            .string()
            .required(requiredMessage('Password'))
            .min(8, minLengthMessage('Password', 8))
            .max(16, maxLengthMessage('Password', 16))
            .matches(
                passwordRegex,
                'Password must include at least a number and one special character.'
            ),
    })
    .required();

export const updateSchema = yup
    .object()
    .shape({
        firstName: yup
            .string()
            .required(requiredMessage('First name'))
            .matches(letters, LETTERS_ONLY_MESSAGE),
        lastName: yup
            .string()
            .required(requiredMessage('Last name'))
            .matches(letters, LETTERS_ONLY_MESSAGE),
        email: yup
            .string()
            .email(EMAIL_MESSAGE)
            .required(requiredMessage('Email')),
    })
    .required();

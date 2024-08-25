import * as yup from 'yup';

const userSchema = yup.object().shape({
    firstName: yup
        .string()
        .max(50, 'First name cannot be longer than 50 characters'),
    
    lastName: yup
        .string()
        .max(50, 'Last name cannot be longer than 50 characters'),
    
    email: yup
        .string()
        .email('Must be a valid email'),
    
    userType: yup
        .string()
        .oneOf(['admin', 'doctor', 'patient'], 'Invalid user type'),
    
    role: yup
        .string()
        .max(30, 'Role cannot be longer than 30 characters'),
    
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long'),
    
    status: yup
        .boolean()
        .default(true)
});


export default userSchema;
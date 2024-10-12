import * as yup from 'yup';

const staffSchema = yup.object({
    staffId: yup.string().min(8),
    userId: yup.string().min(8),
    fName: yup.string().min(2).max(50),
    lName: yup.string().min(2).max(50),
    phone: yup.string().matches(
        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,10}$/,
        'Phone number is not valid'
    ),
    address: yup.object({
        street: yup.string(),
        city: yup.string(),
        state: yup.string()
    }),
    gender: yup.string().oneOf(['male', 'female', 'other']),
    dob: yup.date(),
    email: yup.string().email(),
    status: yup.string(),
    profilePic: yup.string().url(),
    JoinedDate: yup.date(),
    jobRole: yup.boolean(),
    baseSalary: yup.number().positive().integer(),
})

export default staffSchema;
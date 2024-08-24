import * as yup from 'yup';

const doctorSchema = yup.object({
    doctorId: yup.string().max(8).min(8),
    userId: yup.string().max(8).min(8),
    fName: yup.string().max(50).min(2),
    lName: yup.string().max(50).min(2),
    phone: yup.string().matches(
        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,10}$/,
        'Phone number is not valid'
      ),
    email: yup.string().email(),
    address: yup.object({
        street: yup.string(),
        city: yup.string(),
        state: yup.string()
    }),
    gender: yup.string().oneOf(['male', 'female', 'other']),
    specialization: yup.array().of(yup.string()),
    description: yup.string().max(1000),
    experience: yup.number().positive().integer(),
    availability: yup.boolean(),
    treatments: yup.array().of(yup.string()),
    status: yup.boolean(),
    appointmentPrice: yup.string(),
    profilePic: yup.string().url(),
});


export default doctorSchema;
const yup = require('yup');

const patientSchema = yup.object({
    patientId: yup.string().max(8).min(8),
    userId: yup.string().max(8).min(8),
    fName: yup.string().max(50).min(2),
    lName: yup.string().max(50).min(2),
    dob: yup.date(),
    gender: yup.string().oneOf(["male", "female", "other"]),
    phone: yup.string().matches(
        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{7,10}$/,
        'Phone number is not valid'
    ),
    address: yup.object({
        street: yup.string(),
        city: yup.string(),
        state: yup.string()
    }),
    bloodGroup: yup.string(),
    allergies: yup.array().of(yup.string()),
    familyHistory: yup.array().of(yup.object({
        sickness: yup.string(),
        relationship: yup.string()
    })),
    currentMedications: yup.array().of(yup.object({
        name: yup.string(),
        dosage: yup.string(),
        frequency: yup.string(),
        reason: yup.string()
    })),
    surgicalHistory: yup.array().of(yup.object({
        name: yup.string(),
        date: yup.date(),
    })),
    //appointments
    prescriptions: yup.object({
        doctorId: yup.string(),
        medications: yup.array().of(yup.object({
            name: yup.string(),
            dosage: yup.string(),
            frequency: yup.string(),
        })),
        date: yup.date(),
        instructions: yup.string(),
        disease: yup.string(),
    }),
    //vitals
    bloodPressure: yup.object({
        systolic: yup.number(),
        diastolic: yup.number(),
        date: yup.date(),
    }),
    height: yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),
    weight: yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),
    temperature: yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),
    bloodSugar:yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),
    pulseRate: yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),
    respiratoryRate: yup.object({
        value: yup.number().min(0),
        date: yup.date(), 
    }),

})

module.exports = patientSchema;
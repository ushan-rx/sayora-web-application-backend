const Yup = require('yup');

const prescriptionSchema = Yup.object().shape({
    patientId: Yup.string(),
    doctorId: Yup.string(),
    doctorName: Yup.string(),
    medications: Yup.array().of(
        Yup.object().shape({
            medication: Yup.string().required('Medication name is required'),
            dosage: Yup.string().required('Dosage is required'),
            frequency: Yup.string()
        })
    ),
    sickness: Yup.string(),
    instructions: Yup.string(),
    date: Yup.date()
});

module.exports = prescriptionSchema;

import * as Yup from 'yup';
import objectIdValidation from './mongoIdVAlidation.js';

const prescriptionSchema = Yup.object().shape({
    id: objectIdValidation,
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

export default prescriptionSchema;
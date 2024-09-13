import yup from 'yup';
import objectIdValidation from './mongoIdValidation.js';

const requisitionValidationSchema = yup.object().shape({
    id: objectIdValidation,
    patientId: yup.string()
        .optional(),
    doctorId: yup.string()
        .optional(),
    testName: yup.string()
        .optional(),
    date: yup.date()
        .default(() => new Date())
        .optional(),
    documentURL: yup.string()
        .url('Must be a valid URL')
        .optional(),
});


export default requisitionValidationSchema;
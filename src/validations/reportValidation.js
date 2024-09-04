import * as Yup from 'yup';
import objectIdValidation from './mongoIdValidation.js';

const reportValidationSchema = Yup.object().shape({
  id: objectIdValidation,
  patientId: Yup.string()
    .optional(),
  testName: Yup.string()
    .optional(),
  date: Yup.date()
    .default(() => new Date())
    .optional(),
  documentURL: Yup.string()
    .url('Must be a valid URL')
    .optional(),
});

export default reportValidationSchema;

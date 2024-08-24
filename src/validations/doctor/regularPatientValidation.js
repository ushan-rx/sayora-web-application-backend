import * as yup from 'yup';

const regularPatientSchema = yup.object({
    patient: yup.string(),
    doctorId: yup.string(),
    status: yup.boolean(),
});

export default regularPatientSchema;
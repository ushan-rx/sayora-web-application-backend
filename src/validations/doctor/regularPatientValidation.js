const yup = require('yup');

const regularPatientSchema = yup.object({
    patient: yup.string(),
    doctorId: yup.string(),
    status: yup.boolean(),
});

module.exports = regularPatientSchema;

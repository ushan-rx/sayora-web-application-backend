const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator')
const patientSchema = require('../../../validations/patientValidation');
const sanitizeMiddleware  = require('../../../middlewares/requestSanitizer');

const { createPatient,
        getPatient,
        getPatients,
        updatePatient, 
        deletePatient } = require('../../../controllers/patient.controller');

router.route('/').post(sanitizeMiddleware, validate(patientSchema), createPatient)
.get(sanitizeMiddleware, validate(patientSchema), getPatients);      // 'v1/patient/'

router.route('/:id').get(sanitizeMiddleware, validate(patientSchema), getPatient)      // 'v1/patient/PAT00001'
        .put(sanitizeMiddleware, validate(patientSchema), updatePatient)
        .delete(sanitizeMiddleware, validate(patientSchema), deletePatient);

module.exports = router;
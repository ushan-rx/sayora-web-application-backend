const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator')
const doctorSchema = require('../../../validations/doctorValidation');
const sanitizeMiddleware  = require('../../../middlewares/requestSanitizer');

const { createDoctor,
        getDoctor,
        getDoctors,
        updateDoctor, 
        deleteDoctor } = require('../../../controllers/doctor.controller');

router.route('/').post(sanitizeMiddleware, validate(doctorSchema), createDoctor).get(sanitizeMiddleware, validate(doctorSchema), getDoctors);      // 'v1/doctor/'

router.route('/:id').get(sanitizeMiddleware, validate(doctorSchema), getDoctor)      // 'v1/doctor/DOC00001'
        .put(sanitizeMiddleware, validate(doctorSchema), updateDoctor)
        .delete(sanitizeMiddleware, validate(doctorSchema), deleteDoctor);

module.exports = router;
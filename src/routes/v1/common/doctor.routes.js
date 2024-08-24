import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import doctorSchema from '../../../validations/doctor/doctorValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createDoctor, getDoctor, getDoctors, updateDoctor, deleteDoctor } from '../../../controllers/doctor.controller.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(doctorSchema), createDoctor)
    .get(sanitizeMiddleware, validate(doctorSchema), getDoctors); // 'v1/doctor/'

router.route('/:id')
    .get(sanitizeMiddleware, validate(doctorSchema), getDoctor) // 'v1/doctor/DOC00001'
    .put(sanitizeMiddleware, validate(doctorSchema), updateDoctor)
    .delete(sanitizeMiddleware, validate(doctorSchema), deleteDoctor);

export default router;

// import express from 'express';
// import validate from '../../../middlewares/requestValidator.js';
// // import staffSchema from '../../../validations/staffValidation.js';
// import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
// import { createStaff, getStaff, getStaffs, updateStaff, deleteStaff } from '../../../controllers/staff.controller.js';

// const router = express.Router();

// router.route('/')
//     .post(sanitizeMiddleware, validate(staffSchema), createStaff)
//     .get(sanitizeMiddleware, validate(staffSchema), getStaffs); // 'v1/staff/'

// router.route('/:id')
//     .get(sanitizeMiddleware, validate(staffSchema), getStaff) // 'v1/staff/STF00001'
//     .put(sanitizeMiddleware, validate(staffSchema), updateStaff)
//     .delete(sanitizeMiddleware, validate(staffSchema), deleteStaff);

// export default router;

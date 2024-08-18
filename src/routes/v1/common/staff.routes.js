const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator')
const staffSchema = require('../../../validations/staffValidation');
const sanitizeMiddleware  = require('../../../middlewares/requestSanitizer');

const { createStaff,
        getStaff,
        getStaffs,
        updateStaff, 
        deleteStaff } = require('../../../controllers/staff.controller');

router.route('/').post(sanitizeMiddleware, validate(staffSchema), createStaff)
.get(sanitizeMiddleware, validate(staffSchema), getStaffs);      // 'v1/staff/'

router.route('/:id').get(sanitizeMiddleware, validate(staffSchema), getStaff)      // 'v1/staff/STF00001'
        .put(sanitizeMiddleware, validate(staffSchema), updateStaff)
        .delete(sanitizeMiddleware, validate(staffSchema), deleteStaff);

module.exports = router;

import Router from 'express';
import {
    getRequisitions,
    getRequisition,
    createRequisition,
    deleteRequisition
} from '../../../controllers/requisition.controller.js';
import requisitionValidationSchema from '../../../validations/requisition.validation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import validate from '../../../middlewares/requestValidator.js';
import methodNotAllowed from '../../../middlewares/invalidRouteHandler.js';


const router = Router();

router.route('/')
    .post(sanitizeMiddleware, validate(requisitionValidationSchema), createRequisition)
    .get(sanitizeMiddleware, validate(requisitionValidationSchema), getRequisitions)
    .all(methodNotAllowed());

router.route('/:id')
    .get(sanitizeMiddleware, validate(requisitionValidationSchema), getRequisition)
    .delete(sanitizeMiddleware, validate(requisitionValidationSchema), deleteRequisition)
    .all(methodNotAllowed());

export default router;
import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import reportSchema from '../../../validations/reportValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { 
    createReport, 
    getReport, 
    getReports, 
    updateReport, 
    deleteReport } from '../../../controllers/report.controller.js';
import methodNotAllowed from '../../../middlewares/invalidRouteHandler.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(reportSchema), createReport)
    .get(sanitizeMiddleware, validate(reportSchema), getReports)
    .all(methodNotAllowed());

router.route('/:id')
    .get(sanitizeMiddleware, validate(reportSchema), getReport)
    .put(sanitizeMiddleware, validate(reportSchema), updateReport)
    .delete(sanitizeMiddleware, validate(reportSchema), deleteReport)
    .all(methodNotAllowed());

export default router;
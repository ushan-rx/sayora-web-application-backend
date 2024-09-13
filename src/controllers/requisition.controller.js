import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import {
    getRequisitionsService,
    createRequisitionService,
    getRequisitionService,
    updateRequisitionService,
    deleteRequisitionService
} from '../services/requisition.service.js';
import getPaginationData from '../utils/queryString.js';
import { validatePatient } from './patient.controller.js';

const buildQuery = (filters) => {
    let query = {};

    if (filters.patientId) 
        query.patientId = filters.patientId;
    if (filters.doctorId) 
        query.doctorId = filters.doctorId;
    if (filters.testName) 
        query.testName = { $regex: filters.testName, $options: 'i' };
    if (filters.reqDate) 
        query.reqDate = filters.reqDate;
    if(filters.is_uploaded)
        query.is_uploaded = filters.is_uploaded;

    return query;
}

const getRequisitions = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query);
        const pagination = getPaginationData(req.query);
        const {data, count} = await getRequisitionsService({ filters, pagination });
        if (!data || data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No requisitions found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data,
                totalItems: count,
                currentPage: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(count / pagination.limit)
            });
        }
    } catch (error) {
        next(error);
    }
}

const getRequisition = async (req, res, next) => {
    try {
        const requisitionId = req.params.id;
        const requisition = await getRequisitionService(requisitionId);
        if (!requisition) {
            throw new CustomError.NotFoundError(`Requisition with id ${requisitionId} not found`);
        } else {
            res.status(StatusCodes.OK).json({ data: requisition });
        }
    } catch (error) {
        next(error);
    }
}

const createRequisition = async (req, res, next) => {
    try {
        const { patientId } = req.body;
        const patient = await validatePatient(patientId);
        if (!patient) {
            throw new CustomError.NotFoundError(`Patient with id ${req.body.patientId} not found`);
        }
        const requisition = await createRequisitionService(req.body);
        res.status(StatusCodes.CREATED).json({ data: requisition });
    } catch (error) {
        next(error);
    }
}

const deleteRequisition = async (req, res, next) => {
    try {
        const requisitionId = req.params.id;
        const requisition = await deleteRequisitionService(requisitionId);
        if (!requisition) {
            throw new CustomError.NotFoundError(`Requisition with id ${requisitionId} not found`);
        } else {
            res.status(StatusCodes.OK).json({ message: 'Requisition deleted successfully' });
        }
    } catch (error) {
        next(error);
    }
}

export {
    getRequisitions,
    getRequisition,
    createRequisition,
    deleteRequisition
}
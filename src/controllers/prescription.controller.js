import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { 
    getPrescriptionsService,
    createPrescriptionService,
    getPrescriptionService,
    updatePrescriptionService,
    deletePrescriptionService 
} from '../services/prescription.service.js';
import getPaginationData from '../utils/queryString.js';

const buildQuery = (filters) => {
    let query = {};

    if (filters.patientId) 
        query.patientId = filters.patientId;
    if (filters.doctorId) 
        query.doctorId = filters.doctorId;
    if (filters.sickness) 
        query.sickness = { $regex: filters.sickness, $options: 'i' };
    if (filters.date) 
        query.date = filters.date;

    query.status = filters.status || true;

    return query;
};

export const getPrescriptions = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query);
        const pagination = getPaginationData(req.query);

        const prescriptions = await getPrescriptionsService({ filters, pagination });

        if (!prescriptions.data || prescriptions.data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No prescriptions found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data: prescriptions.data,
                totalItems: prescriptions.count,
                currentPage: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(prescriptions.count / pagination.limit)
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getPrescription = async (req, res, next) => {
    try {
        const prescriptionId = req.params.id;
        const prescription = await getPrescriptionService(prescriptionId);
        if (!prescription) {
            throw new CustomError.NotFoundError(`Prescription with id ${prescriptionId} not found`);
        } else {
            res.status(StatusCodes.OK).json({ data: prescription });
        }
    } catch (error) {
        next(error);
    }
};

export const createPrescription = async (req, res, next) => {
    try {
        const prescription = await createPrescriptionService(req.body);
        if (!prescription) {
            throw new CustomError.InternalServerError(`Error creating prescription`);
        }
        res.status(StatusCodes.CREATED).json({ data: prescription });
    } catch (error) {
        next(error);
    }
};

export const updatePrescription = async (req, res, next) => {
    try {
        const prescriptionId = req.params.id;
        const updatedPrescription = await updatePrescriptionService(prescriptionId, req.body);
        if (!updatedPrescription) {
            throw new CustomError.NotFoundError(`Prescription with id ${prescriptionId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({ data: updatedPrescription });
    } catch (error) {
        next(error);
    }
};

export const deletePrescription = async (req, res, next) => {
    try {
        const prescriptionId = req.params.id;
        const prescription = await deletePrescriptionService(prescriptionId);
        if (!prescription) {
            throw new CustomError.NotFoundError(`Prescription not found with id ${prescriptionId}`);
        }
        res.status(StatusCodes.OK).json({ message: 'Prescription deleted successfully', data: prescription });
    } catch (error) {
        next(error);
    }
};

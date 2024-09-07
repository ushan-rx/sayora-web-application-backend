import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import {
    getPatientService,
    updatePatientService } from '../services/patient.service.js';
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
        console.log(filters)
        const {data, count} = await getPrescriptionsService({ filters, pagination });
        if (!data || data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No prescriptions found', data: [] });
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
        const patientId = req.body.patientId;
        await validatePatient(patientId);
        const prescription = await createPrescriptionService(req.body);
        if (!prescription) {
            throw new CustomError.InternalServerError(`Error creating prescription`);
        }
        const updatePatient = await updatePatientService(patientId, 
            { $push: { prescriptions: { prescriptionRecord: prescription._id } } });
        if (!updatePatient) {
            throw new CustomError.InternalServerError(`Error creating prescription`);
        }
        res.status(StatusCodes.CREATED).json({ data: prescription });
    } catch (error) {
        next(error);
    }
};

const validatePatient = async (patientId) => {
    if (!patientId) {
        throw new CustomError.BadRequestError(`Patient is required`);
    }
    const patient = await getPatientService(patientId);
        if (!patient) {
            throw new CustomError.NotFoundError(`Patient not found with id ${patientId}`);
    }
    return patient;
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
        const updatedPatient = await updatePatientService(prescription.patientId, 
            { $pull: { prescriptions: { prescriptionRecord: prescriptionId } } });
        if (!updatedPatient) {
            throw new CustomError.InternalServerError(`Error deleting prescription`);
        }
        res.status(StatusCodes.OK).json({ message: 'Prescription deleted successfully', data: prescription });
    } catch (error) {
        next(error);
    }
};

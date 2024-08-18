const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const {
    getPrescriptionsService,
    createPrescriptionService,
    getPrescriptionService,
    updatePrescriptionService,
    deletePrescriptionService
} = require('../services/prescription.service');
const getPaginationData = require('../services/common/queryString.service');

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

    filters.status ? query.status = filters.status : query.status = true;

    return query;
}

const getPrescriptions = async (req, res, next) => {
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
}

const getPrescription = async (req, res, next) => {
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
}

const createPrescription = async (req, res, next) => {
    try {
        const prescription = await createPrescriptionService(req.body);
        if (!prescription) {
            throw new CustomError.InternalServerError(`Error creating prescription`);
        }
        res.status(StatusCodes.CREATED).json({ data: prescription });
    } catch (error) {
        next(error);
    }
}

const updatePrescription = async (req, res, next) => {
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
}

const deletePrescription = async (req, res, next) => {
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
}

module.exports = {
    getPrescription,
    getPrescriptions,
    createPrescription,
    updatePrescription,
    deletePrescription,
}

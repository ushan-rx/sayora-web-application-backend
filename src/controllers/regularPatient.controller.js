import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { 
    getRegularPatientsService,
    createRegularPatientService,
    deleteRegularPatientService 
} from '../services/regularPatient.service.js';
import getPaginationData from '../utils/queryString.js';

const buildQuery = (filters) => {
    let query = {};

    if (filters.doctorId)
        query.doctorId = filters.doctorId;
    if (filters.patient)
        query.patient = filters.patient;
    query.status = filters.status || true;

    return query;
};

export const getRegularPatients = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query);
        const pagination = getPaginationData(req.query);

        const regularPatients = await getRegularPatientsService({ filters, pagination });

        if (!regularPatients.data || regularPatients.data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No regular patients found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data: regularPatients.data,
                totalItems: regularPatients.count,
                currentPage: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(regularPatients.count / pagination.limit)
            });
        }
    } catch (error) {
        next(error);
    }
};

export const createRegularPatient = async (req, res, next) => {
    try {
        const regularPatient = await createRegularPatientService(req.body);
        if (!regularPatient) {
            throw new CustomError.InternalServerError(`Error creating regular patient`);
        }
        res.status(StatusCodes.CREATED).json({ data: regularPatient });
    } catch (error) {
        next(error);
    }
};

export const deleteRegularPatient = async (req, res, next) => {
    try {
        const regularPatientId = req.params.id;
        const regularPatient = await deleteRegularPatientService(regularPatientId);
        if (!regularPatient) {
            throw new CustomError.NotFoundError(`Regular patient not found with id ${regularPatientId}`);
        }
        res.status(StatusCodes.OK).json({ message: 'Regular patient deleted successfully', data: regularPatient });
    } catch (error) {
        next(error);
    }
};

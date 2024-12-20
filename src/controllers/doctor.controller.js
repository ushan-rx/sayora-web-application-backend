import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { 
    getDoctorsService,
    createDoctorService,
    getDoctorService,
    updateDoctorService, 
    deleteDoctorService 
} from '../services/doctor.service.js';
import getPaginationData from '../utils/queryString.js';

const buildQuery = (filters) => {
    let query = {};

    if (filters.fName) query.fName = { $regex: filters.fName, $options: 'i' };
    if (filters.lName) query.lName = { $regex: filters.lName, $options: 'i' };
    if (filters.specialization) query.specialization = filters.specialization;
    if (filters.availability) query.availability = filters.availability;
    if (filters.treatments) query.treatments = filters.treatments;
    if (filters.minExperience) query.experience = { $gte: filters.minExperience };
    if (filters.gender) query.gender = filters.gender;
    if (filters.email) query.email = filters.email;
    if (filters.sort) query.sort = filters.sort;

    query.status = filters.status || true;
    
    return query;
};

export const getDoctors = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query); // returns constraints for query
        const pagination = getPaginationData(req.query); // returns {sort, limit, page, skip }

        const doctors = await getDoctorsService({ filters, pagination });

        if (!doctors.data || doctors.data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No doctors found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data: doctors.data,
                totalItems: doctors.count,
                currentPage: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(doctors.count / pagination.limit)
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await getDoctorService(doctorId);
        if (!doctor) {
            throw new CustomError.NotFoundError(`Doctor with id ${doctorId} not found`);
        } else {
            res.status(StatusCodes.OK).json({ data: doctor });
        }
    } catch (error) {
        next(error);
    }
};

export const createDoctor = async (req, res, next) => {
    try {
        const doctor = await createDoctorService(req.body);
        if (!doctor) {
            throw new CustomError.InternalServerError(`Error creating doctor`);
        }
        res.status(StatusCodes.CREATED).json({ data: doctor });
    } catch (error) {
        next(error);
    }
};

export const updateDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const newDoctor = await updateDoctorService(doctorId, req.body);
        if (!newDoctor) {
            throw new CustomError.NotFoundError(`Doctor with id ${doctorId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({ data: newDoctor });
    } catch (error) {
        next(error);
    }
};

export const deleteDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await deleteDoctorService(doctorId);
        if (!doctor) {
            throw new CustomError.NotFoundError(`Doctor not found with id ${doctorId}`);
        }
        res.status(StatusCodes.OK).json({ message: 'Doctor deleted successfully', data: doctor });
    } catch (error) {
        next(error);
    }
};

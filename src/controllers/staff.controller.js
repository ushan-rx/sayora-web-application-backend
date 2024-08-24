import CustomError from '../errors/custom-api.js';
import { StatusCodes } from 'http-status-codes';
import { 
    getStaffsService,
    createStaffService,
    getStaffService,
    updateStaffService,
    deleteStaffService 
} from '../services/staff.service.js';
import getPaginationData from '../services/common/queryString.service.js';

const buildQuery = (filters) => {
    let query = {};

    if (filters.fName)
        query.fName = { $regex: filters.fName, $options: 'i' };
    if (filters.lName)
        query.lName = { $regex: filters.lName, $options: 'i' };
    if (filters.phone)
        query.phone = filters.phone;
    if (filters.gender)
        query.gender = filters.gender;
    if (filters.email)
        query.email = filters.email;
    if (filters.jobRole)
        query.jobRole = filters.jobRole;
    if (filters.baseSalary)
        query.baseSalary = { $gte: filters.baseSalary };
    query.status = filters.status || true;

    return query;
};

export const getStaffs = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query); // returns constraints for query
        const pagination = getPaginationData(req.query); // returns {sort, limit, page, skip }

        const { data, count } = await getStaffsService({ filters, pagination });

        if (!data || data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No staff found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data,
                totalItems: count,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(count / pagination.limit)
            });
        }
    } catch (err) {
        next(err);
    }
};

export const getStaff = async (req, res, next) => {
    try {
        const staffId = req.params.staffId;
        const staff = await getStaffService(staffId);
        if (!staff) {
            throw new CustomError.NotFoundError(`Staff with id ${staffId} not found`);
        }
        res.status(StatusCodes.OK).json({ data: staff });
    } catch (err) {
        next(err);
    }
};

export const createStaff = async (req, res, next) => {
    try {
        const newStaff = await createStaffService(req.body);
        if (!newStaff) {
            throw new CustomError.InternalServerError(`Error creating staff`);
        }
        res.status(StatusCodes.CREATED).json({ data: newStaff });
    } catch (err) {
        next(err);
    }
};

export const updateStaff = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const updatedStaff = await updateStaffService(staffId, req.body);
        if (!updatedStaff) {
            throw new CustomError.NotFoundError(`Staff with id ${staffId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({ data: updatedStaff });
    } catch (err) {
        next(err);
    }
};

export const deleteStaff = async (req, res, next) => {
    try {
        const staffId = req.params.id;
        const deletedStaff = await deleteStaffService(staffId);
        if (!deletedStaff) {
            throw new CustomError.NotFoundError(`Staff with id ${staffId} not found or could not be deleted`);
        }
        res.status(StatusCodes.OK).json({ message: 'Staff deleted successfully', data: deletedStaff });
    } catch (err) {
        next(err);
    }
};

export const getStaffById = async (req, res, next) => {
    // Add your implementation here if needed
};

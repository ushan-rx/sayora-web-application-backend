import CustomError from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { 
    getUsersService, 
    createUserService, 
    getUserService, 
    updateUserService, 
    deleteUserService 
} from '../services/user.service.js';
import getPaginationData from '../utils/queryString.js';

const buildQuery = (filters) => {
    let query = {};
    if (filters.email) query.email = filters.email;
    if (filters.userType) query.userType = filters.userType;
    if (filters.role) query.role = filters.role;
    query.status = filters.status || true;
    return query;
};

export const getUsers = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query);
        const pagination = getPaginationData(req.query);
        const users = await getUsersService({ filters, pagination });
        if (!users.data || users.data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No users found', data: [] });
        } else {
            res.status(StatusCodes.OK).json({
                data: users.data,
                totalItems: users.count,
                currentPage: pagination.page,
                totalPages: Math.ceil(users.count / pagination.limit)
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await getUserService(userId);
        if (!user) {
            throw new CustomError.NotFoundError(`User with id ${userId} not found`);
        } else {
            res.status(StatusCodes.OK).json({ data: user });
        }
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body);
        res.status(StatusCodes.CREATED).json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await updateUserService(userId, req.body);
        if (!user) {
            throw new CustomError.NotFoundError(`User with id ${userId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await deleteUserService(userId);
        if (!user) {
            throw new CustomError.NotFoundError(`User not found with id ${userId} or could not be deleted`);
        }
        res.status(StatusCodes.OK).json({ message: 'User deleted successfully', data: user });
    } catch (error) {
        next(error);
    }
};

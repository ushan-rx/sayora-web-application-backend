const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { getUsersService, createUserService, getUserService, updateUserService, deleteUserService } = require('../services/user.service');
const getPaginationData = require('../services/common/queryString.service');

const buildQuery = (filters) => {
    let query = {};
    if (filters.email) query.email = filters.email;
    if (filters.userType) query.userType = filters.userType;
    if (filters.role) query.role = filters.role;
    filters.status ? query.status = filters.status : query.status = true;
    return query;
};

const getUsers = async (req, res, next) => {
    try {
        const filters = buildQuery(req.query);
        const pagination = getPaginationData(req.query);
        const users = await getUsersService({ filters, pagination });
        if (!users.data || users.data.length === 0) {
            res.status(StatusCodes.OK).json({ message: 'No users found', data: [] });
        }
        res.status(StatusCodes.OK).json({
            data: users.data,
            totalItems: users.count,
            currentPage: pagination.page,
            totalPages: Math.ceil(users.count / pagination.limit)
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
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

const createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body);
        res.status(StatusCodes.CREATED).json({ data: user });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
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

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await deleteUserService(userId);
        if (!user) {
            throw new CustomError.NotFoundError(`User not found with id ${userId} or could not be deleted`);
        }
        res.status(StatusCodes.OK).json({ message: 'User deleted successfully', data: user});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};

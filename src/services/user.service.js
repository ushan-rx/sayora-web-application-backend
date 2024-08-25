import User from '../models/user.model.js';

const getUsersService = async ({ filters, pagination }) => {
    const count = await User.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await User.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
};

const createUserService = async (data) => {
    return await new User(data).save();
};

const getUserService = async (userId) => {
    return await User.findOne({ userId }).lean();
};

const getUserByEmailService = async (email) => {
    return await User.findOne({ email }).lean();
};

const updateUserService = async (id, data) => {
    return await User.findOneAndUpdate({ userId: id }, data, { new: true, runValidators: true }).lean();
};

const deleteUserService = async (id) => {
    return await User.findOneAndDelete({ userId: id }).lean();
};

export{
    getUsersService,
    createUserService,
    getUserService,
    getUserByEmailService,
    updateUserService,
    deleteUserService
};

const Staff = require('../models/staff.model');

const getStaffsService = async ({ filters, pagination }) => {
    const count = await Staff.countDocuments(filters);
    if(pagination.limit > count) pagination.limit = count;
    const data = await Staff.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return {data, count};
}


const createStaffService = async (data) => {
    return await new Staff(data).save();
}

const getStaffService = async (staffId) => {
    return await Staff.findOne({staffId: staffId}).lean();
}

const getStaffByIDService = async (id) => {
    return await Staff.findById(id).lean();
}


const updateStaffService = async (id, data) => {
    return await Staff.findOneAndUpdate({ staffId: id }, data,
            {new: true, runValidators: true}).lean();
}

const deleteStaffService = async (id) =>{
    return await Staff.findOneAndDelete({staffId: id}).lean();
}

module.exports = {
    getStaffsService,
    createStaffService,
    getStaffService,
    getStaffByIDService,
    updateStaffService,
    deleteStaffService
}
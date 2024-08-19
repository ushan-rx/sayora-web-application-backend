const RegularPatient = require('../models/regularPatient.model');

const getRegularPatientsService = async ({ filters, pagination }) => {
    const count = await RegularPatient.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await RegularPatient.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
}

const createRegularPatientService = async (data) => {
    return await new RegularPatient(data).save();
}

const getRegularPatientService = async (regularPatientId) => {
    return await RegularPatient.findById(regularPatientId).lean();
}

const updateRegularPatientService = async (id, data) => {
    return await RegularPatient.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true }).lean();
}

const deleteRegularPatientService = async (id) => {
    return await RegularPatient.findOneAndDelete({ _id: id }).lean();
}

module.exports = {
    getRegularPatientsService,
    createRegularPatientService,
    getRegularPatientService,
    updateRegularPatientService,
    deleteRegularPatientService
}

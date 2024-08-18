const Prescription = require('../models/prescription.model');

const getPrescriptionsService = async ({ filters, pagination }) => {
    const count = await Prescription.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Prescription.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
}

const createPrescriptionService = async (data) => {
    return await new Prescription(data).save();
}

const getPrescriptionService = async (prescriptionId) => {
    return await Prescription.findOne({ _id: prescriptionId }).lean();
}

const updatePrescriptionService = async (prescriptionId, data) => {
    return await Prescription.findOneAndUpdate({ _id: prescriptionId }, data, {
        new: true,
        runValidators: true
    }).lean();
}

const deletePrescriptionService = async (prescriptionId) => {
    return await Prescription.findOneAndDelete({ _id: prescriptionId }).lean();
}

module.exports = {
    getPrescriptionsService,
    createPrescriptionService,
    getPrescriptionService,
    updatePrescriptionService,
    deletePrescriptionService
}

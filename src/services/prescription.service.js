import Prescription from '../models/prescription.model.js';

/**
 * Retrieves prescriptions based on provided filters and pagination options.
 * @param {Object} options - The options for filtering and pagination.
 * @param {Object} options.filters - The filters to apply when querying prescriptions.
 * @param {Object} options.pagination - The pagination options.
 * @param {Object} options.pagination.sort - The sorting criteria.
 * @param {number} options.pagination.skip - The number of documents to skip.
 * @param {number} options.pagination.limit - The maximum number of documents to retrieve.
 * @returns {Promise<Object>} The retrieved prescriptions and the total count.
 */
export const getPrescriptionsService = async ({ filters, pagination }) => {
    const count = await Prescription.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Prescription.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
};

export const createPrescriptionService = async (data) => {
    return await new Prescription(data).save();
};

export const getPrescriptionService = async (prescriptionId) => {
    return await Prescription.findById(prescriptionId).lean();
};  

export const updatePrescriptionService = async (prescriptionId, data) => {
    return await Prescription.findOneAndUpdate({ _id: prescriptionId }, data, {
        new: true,
        runValidators: true
    }).lean();
};

export const deletePrescriptionService = async (prescriptionId) => {
    return await Prescription.findOneAndDelete({ _id: prescriptionId }).lean();
};

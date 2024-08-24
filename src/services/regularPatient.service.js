import RegularPatient from '../models/regularPatient.model.js';

/**
 * Retrieves regular patients based on provided filters and pagination options.
 * @param {Object} options - The options for filtering and pagination.
 * @param {Object} options.filters - The filters to apply when querying regular patients.
 * @param {Object} options.pagination - The pagination options.
 * @param {number} options.pagination.limit - The maximum number of regular patients to retrieve.
 * @param {number} options.pagination.skip - The number of regular patients to skip.
 * @param {string} options.pagination.sort - The field to sort the regular patients by.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the retrieved regular patients and the total count.
 */
export const getRegularPatientsService = async ({ filters, pagination }) => {
    const count = await RegularPatient.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await RegularPatient.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
};

export const createRegularPatientService = async (data) => {
    return await new RegularPatient(data).save();
};

export const getRegularPatientService = async (regularPatientId) => {
    return await RegularPatient.findById(regularPatientId).lean();
};

export const updateRegularPatientService = async (id, data) => {
    return await RegularPatient.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true }).lean();
};

export const deleteRegularPatientService = async (id) => {
    return await RegularPatient.findOneAndDelete({ _id: id }).lean();
};

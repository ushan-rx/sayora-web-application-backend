import Patient from '../models/patient.model.js';

/**
 * Retrieves a list of patients based on the provided filters and pagination options.
 * @param {Object} options - The options for filtering and pagination.
 * @param {Object} options.filters - The filters to apply when querying the patients.
 * @param {Object} options.pagination - The pagination options.
 * @param {number} options.pagination.limit - The maximum number of patients to retrieve.
 * @param {number} options.pagination.skip - The number of patients to skip.
 * @param {string} options.pagination.sort - The field to sort the patients by.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the retrieved patients and the total count.
 */
export const getPatientsService = async ({ filters, pagination }) => {
    const count = await Patient.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Patient.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
};

export const createPatientService = async (data) => {
    return await new Patient(data).save();
};

export const getPatientService = async (patientId) => {
    return await Patient.findOne({ patientId }).lean();
};

export const getPatientByIDService = async (id) => {
    return await Patient.findById(id).lean();
};

export const updatePatientService = async (id, data) => {
    return await Patient.findOneAndUpdate({ patientId: id }, data, 
        { new: true, runValidators: true }).lean();
};

export const deletePatientService = async (id) => {
    return await Patient.findOneAndDelete({ patientId: id }).lean();
};

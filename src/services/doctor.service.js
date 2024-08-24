import Doctor from '../models/doctor.model.js';

/**
 * Retrieves doctors based on provided filters and pagination options.
 * @param {Object} options - The options for filtering and pagination.
 * @param {Object} options.filters - The filters to apply when querying doctors.
 * @param {Object} options.pagination - The pagination options.
 * @param {Object} options.pagination.sort - The sorting criteria.
 * @param {number} options.pagination.skip - The number of documents to skip.
 * @param {number} options.pagination.limit - The maximum number of documents to retrieve.
 * @returns {Promise<Object>} The retrieved doctors and the total count.
 */
const getDoctorsService = async ({ filters, pagination }) => {
    const count = await Doctor.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Doctor.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
}

const createDoctorService = async (data) => {
    return await new Doctor(data).save();
}

const getDoctorService = async (doctorId) => {
    return await Doctor.findOne({ doctorId: doctorId }).lean();
}

const getDoctorByIDService = async (id) => {
    return await Doctor.findById(id).lean();
}

const updateDoctorService = async (id, data) => {
    return await Doctor.findOneAndUpdate({ doctorId: id }, data, { new: true, runValidators: true }).lean();
}

const deleteDoctorService = async (id) => {
    return await Doctor.findOneAndDelete({ doctorId: id }).lean();
}

export {
    getDoctorsService,
    createDoctorService,
    getDoctorService,
    getDoctorByIDService,
    updateDoctorService,
    deleteDoctorService
}

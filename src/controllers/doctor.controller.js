// Desc: Controller for doctor routes
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { getDoctorsService,
        createDoctorService,
        getDoctorService,
        getDoctorByIDService, 
        updateDoctorService, 
        deleteDoctorService } = require('../services/doctor.service');
const getPaginationData = require('../services/common/queryString.service');


const buildQuery = (filters)=>{
    let query = {};

    if(filters.fName){
        query.fName = {$regex: filters.fName, $options: 'i'};
    }
    if(filters.lName){
        query.lName = {$regex: filters.lName, $options: 'i'};
    }
    if(filters.specialization){
        query.specialization = filters.specialization;
    }
    if(filters.availability){
        query.availability = filters.availability;
    }
    if(filters.treatments){
        query.treatments = filters.treatments;
    }
    if(filters.minExperience){
        query.experience = {$gte: filters.minExperience};
    }
    if(filters.gender){
        query.gender = filters.gender;
    }
    if(filters.email){
        query.email = filters.email;
    }
    if(filters.sort){
        query.sort = filters.sort;
    }

    filters.status ? query.status = filters.status : query.status = true;
    
    return query;
}

/**
 * Get doctors with filters and pagination.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the doctors are retrieved.
 */
const getDoctors = async (req, res, next) =>{
    try{
        const filters = buildQuery(req.query); // returns constraints for query
        const pagination = getPaginationData(req.query);  // returns {sort, limit, page, skip }

        /**
         * Retrieves a list of doctors based on the provided filters and pagination options.
         *
         * @param {Object} filters - The filters to apply when querying for doctors.
         * @param {Object} pagination - The pagination options for the query.
         * @returns {Array} An array of doctors and total count matching the provided filters and pagination options.
         */
        const doctors = await getDoctorsService({filters, pagination}); 

        if(!doctors.data || doctors.data.length === 0){
            res.status(StatusCodes.OK).json({message: 'No doctors found', data: []});
        }else{
            res.status(StatusCodes.OK).json({
                    data: doctors.data,
                    totalItems: doctors.count,
                    currentPage: pagination.page,
                    totalPages: Math.ceil(doctors.count/pagination.limit)
                });
        }
    }catch(error){
        next(error);
    }
}

const getDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await getDoctorService(doctorId);
        if(!doctor){
            throw new CustomError.NotFoundError(`Doctor with id ${doctorId} not found`);
        } else {
            res.status(StatusCodes.OK).json({data: doctor});
        }
    } catch (error) {
        next(error);
    }
} 

const createDoctor = async (req, res, next) =>{
    try {
        const doctor = await createDoctorService(req.body);
        if(!doctor){
            throw new CustomError.InternalServerError(`Error creating doctor`)
        }
        res.status(StatusCodes.CREATED).json({data: doctor});
    } catch (error) {
        next(error);
    }
}

const updateDoctor = async (req, res, next) =>{
    try {
        const doctorId = req.params.id;
        const newDoctor = await updateDoctorService(doctorId, req.body);
        if(!newDoctor){
            throw new CustomError.NotFoundError(`Doctor with id ${doctorId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({data: newDoctor});
    } catch (error) {
        next(error);
    }
}

const deleteDoctor = async (req, res, next) =>{
    try {
        const doctorId = req.params.id;
        const doctor = await deleteDoctorService(doctorId);
        if(!doctor){
            throw new CustomError.NotFoundError(`Doctor not found with id ${doctorId}`);
        }
        res.status(StatusCodes.OK).json({message: 'Doctor deleted successfully', data: doctor});
    } catch (error) {
        next(error);
    }
}

const getDoctorByID = async (req, res) => {
    
}


module.exports = {
    getDoctor,
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { getPatientsService,
        createPatientService,
        getPatientService,
        getPatientByIDService, 
        updatePatientService, 
        deletePatientService } = require('../services/patient.service');
const getPaginationData = require('../services/common/queryString.service');

const buildQuery = (filters)=>{
    let query = {};

    if(filters.fName)
        query.fName = {$regex: filters.fName, $options: 'i'};
    if(filters.lName)
        query.lName = {$regex: filters.lName, $options: 'i'};
    if(filters.gender)
        query.gender = filters.gender;
    if(filters.phone)
        query.phone = filters.phone;
    filters.status ? query.status = filters.status : query.status = true;

    return query;
};


const getPatients = async (req, res, next) =>{
    try{
        const filters = buildQuery(req.query); // returns constraints for query
        const pagination = getPaginationData(req.query); // returns {sort, limit, page, skip }

        /**
         * Retrieves patients based on provided filters and pagination options.
         * @param {Object} options.filters - The filters to apply when querying patients.
         * @param {Object} options.pagination - The pagination options.
         */
        const {data, count} = await getPatientsService({filters, pagination});

        if(!data || data.length === 0){
            res.status(StatusCodes.OK).json({message: 'No patients found', data: []});
        }else{
            res.status(StatusCodes.OK).json({
                data: data,
                totalItems: count,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(count/pagination.limit)
            });
        }
    }catch(err){
        next(err);
    }
}

const getPatient = async (req, res, next) =>{
    try{
        const patientId = req.params.id;
        const patient = await getPatientService(patientId);
        if(!patient){
            throw new CustomError.NotFoundError(`Patient with id ${patientId} not found`);
        }
        res.status(StatusCodes.OK).json({data: patient});
    }catch(err){
        next(err);
    }
}

const createPatient = async (req, res, next) =>{
    try{
        const patient = await createPatientService(req.body);
        if(!patient){
            throw new CustomError.InternalServerError(`Error creating patient`);
        }
        res.status(StatusCodes.CREATED).json({data: patient});
    }catch(err){
        next(err);
    }
}

const updatePatient = async (req, res, next) =>{
    try{
        const patientId = req.params.id;
        const newPatient = await updatePatientService(patientId, req.body);
        if(!newPatient){
            throw new CustomError.NotFoundError(`Patient with id ${patientId} not found or could not be updated`);
        }
        res.status(StatusCodes.OK).json({data: newPatient});
    }catch(err){
        next(err);
    }
}

const deletePatient = async (req, res, next) =>{
    try{
        const patientId = req.params.id;
        const deletedPatient = await deletePatientService(patientId);
        if(!deletedPatient){
            throw new CustomError.NotFoundError(`Patient not found with id ${patientId}`);
        }
        res.status(StatusCodes.OK).json({message: 'Patient deleted successfully', data: deletedPatient});
    }catch(err){
        next(err);
    }
}

const getPatientByID = async (req, res, next) =>{

}

module.exports = {
    getPatients,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient
}

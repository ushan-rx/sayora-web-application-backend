const Doctor = require('../models/doctor.model');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const {body, validationResult, query} = require('express-validator');
const { getDoctorsService,
        createDoctorService,
        getDoctorService,
        getDoctorByIDService, 
        updateDoctorService, 
        deleteDoctorService } = require('../services/doctor.service');


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
}

const getDoctors = async (req, res) =>{
    try{
        const filters = buildQuery(req.query);
        const doctors = await getDoctorsService(filters);
        if(doctors.length === 0){
            throw new CustomError.NotFoundError('No doctors found');
        }else{
            res.status(StatusCodes.OK).json({doctors, count: doctors.length});
        }
    }catch(error){
        res.status(error.statusCode).json({message: error.message});
    }
}

const getDoctor = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await getDoctorService(doctorId);
        if(!doctor){
            throw new CustomError.NotFoundError('Doctor not found');
        } else {
            res.status(StatusCodes.OK).json(doctor);
        }
    } catch (error) {
        next(error);
    }
} 

const createDoctor = async (req, res, next) =>{
    try {
        const doctor = await createDoctorService(req.body);
        res.status(StatusCodes.CREATED).json(doctor);
    } catch (error) {
        next(new CustomError.InternalServerError(`Error creating doctor \n ${error.message}`));
    }
}

const updateDoctor = async (req, res, next) =>{
    try {
        const doctorId = req.params.id;
        const newDoctor = await updateDoctorService(doctorId, req.body);
        if(!newDoctor){
            throw new CustomError.NotFoundError('Doctor not found');
        }
        res.status(StatusCodes.OK).json(newDoctor);
    } catch (error) {
        next(new CustomError.InternalServerError(`Error updating doctor \n\t ${error.message}`));
    }
}

const deleteDoctor = async (req, res) =>{
    
}

const getDoctorByID = async (req, res) => {

}


module.exports = {
    getDoctor,
    getDoctors,
    getDoctorByID,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}
const Doctor = require('../models/doctor.model');

const getDoctorsService = async (filters) => {
    return await Doctor.find(filters);
}

const createDoctorService = async (data) => {
    return await new Doctor(data).save();
}

const getDoctorService = async (doctorId) => {
    return await Doctor.findOne({doctorId: doctorId}).lean();
}

const getDoctorByIDService = async (id) => {
    return await Doctor.findById(id).lean();
}

const updateDoctorService = async (id, data) => {
    return await Doctor.findOneAndUpdate({ doctorId: id }, data,
         {new: true, runValidators: true});
}

const deleteDoctorService = async (id) =>{
    return await Doctor.findOneAndDelete({doctorId: id});
}


module.exports = {
    getDoctorsService,
    createDoctorService,
    getDoctorService,
    getDoctorByIDService,
    updateDoctorService,
    deleteDoctorService
}

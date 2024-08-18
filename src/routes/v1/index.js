const Router = require('express').Router;

const doctorRoutes =  require('./common/doctor.routes');
const patientRoutes = require('./common/patient.routes');

const routesV1 = Router();

routesV1.use('/api/v1/doctor', doctorRoutes);
routesV1.use('/api/v1/patient', patientRoutes);

module.exports = routesV1;




const doctorRoutes =  require('./doctor/doctor.routes');
const Router = require('express').Router;


const routesV1 = Router();

routesV1.use('/api/v1/doctor', doctorRoutes);

module.exports = routesV1;




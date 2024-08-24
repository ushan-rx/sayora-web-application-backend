import { Router } from 'express';
import doctorRoutes from './common/doctor.routes.js';
import patientRoutes from './common/patient.routes.js';
// import staffRoutes from './common/staff.routes.js';
import prescriptionRoutes from './common/prescription.routes.js';

const routesV1 = Router();

routesV1.use('/api/v1/doctor', doctorRoutes);
routesV1.use('/api/v1/patient', patientRoutes);
// routesV1.use('/api/v1/staff', staffRoutes);
routesV1.use('/api/v1/prescription', prescriptionRoutes);

export default routesV1;

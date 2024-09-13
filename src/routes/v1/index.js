import { Router } from 'express';
import doctorRoutes from './common/doctor.routes.js';
import patientRoutes from './common/patient.routes.js';
// import staffRoutes from './common/staff.routes.js';
import prescriptionRoutes from './common/prescription.routes.js';
import userRoutes from './common/user.routes.js';
import reportRoutes from './common/report.routes.js'
import requisitionRoutes from './common/requisition.routes.js';

const routesV1 = Router();

routesV1.use('/api/v1/doctor', doctorRoutes);
routesV1.use('/api/v1/patient', patientRoutes);
// routesV1.use('/api/v1/staff', staffRoutes);
routesV1.use('/api/v1/prescription', prescriptionRoutes);
routesV1.use('/api/v1/user', userRoutes);
routesV1.use('/api/v1/report', reportRoutes);
routesV1.use('/api/v1/requisition', requisitionRoutes);

export default routesV1;

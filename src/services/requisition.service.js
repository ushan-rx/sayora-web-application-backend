import Requisition from '../models/requisition.model.js';

const getRequisitionsService = async ({ filters, pagination }) => {
    const count = await Requisition.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Requisition.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
};

const createRequisitionService = async (data) => {
    return await new Requisition(data).save();
};

const getRequisitionService = async (requisitionId) => {
    return await Requisition.findById(requisitionId).lean();
};

const updateRequisitionService = async (requisitionId, data) => {
    return await Requisition.findByIdAndUpdate(requisitionId, data, { new: true, runValidators: true }).lean();
}

const deleteRequisitionService = async (requisitionId) => {
    return await Requisition.findByIdAndDelete(requisitionId).lean();
};

export { 
    getRequisitionsService, 
    createRequisitionService, 
    getRequisitionService, 
    updateRequisitionService, 
    deleteRequisitionService 
};

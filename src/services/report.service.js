import Report from "../models/report.model";


const getReportsService = async ({ filters, pagination }) => {
    const count = await Report.countDocuments(filters);
    if (pagination.limit > count) pagination.limit = count;
    const data = await Report.find(filters)
        .sort(pagination.sort)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean();
    return { data, count };
}


const createReportService = async (data) => {
    return await new Report(data).save();
}

const getReportService = async (reportId) => {
    return await Report.findById(reportId).lean();
}


const updateReportService = async (id, data) => {
    return await Report.findByIdAndUpdate(id, data, 
        { new: true, runValidators: true }).lean();
}

const deleteReportService = async (id) => {
    return await Report.findByIdAndDelete(id).lean();
}

export {
    getReportsService,
    createReportService,
    getReportService,
    updateReportService,
    deleteReportService
}


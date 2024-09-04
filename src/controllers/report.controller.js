import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import {
  getReportsService,
  createReportService,
  getReportService,
  updateReportService,
  deleteReportService,
} from "../services/report.service.js";

import getPaginationData from "../utils/queryString.js";

const buildQuery = (filters) => {
  let query = {};

  if (filters.patientId) query.patientId = filters.patientId;
  if (filters.testName) query.testName = filters.testName;
  if (filters.date) query.date = filters.date;
  if (filters.sort) query.sort = filters.sort;

  query.status = filters.status || true;

  return query;
}

const getReports = async (req, res, next) => {
  try {
    const filters = buildQuery(req.query); // returns constraints for query
    const pagination = getPaginationData(req.query); // returns {sort, limit, page, skip }

    const reports = await getReportsService({ filters, pagination });

    if (!reports.data || reports.data.length === 0) {
      res.status(StatusCodes.OK).json({ message: "No reports found", data: [] });
    } else {
      res.status(StatusCodes.OK).json({
        data: reports.data,
        totalItems: reports.count,
        currentPage: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(reports.count / pagination.limit),
      });
    }
  } catch (error) {
    next(error);
  }
};

const getReport = async (req, res, next) => {
  try {
    const reportId = req.params.id;
    const report = await getReportService(reportId);
    if (!report) {
      throw new CustomError.NotFoundError(`Report with id ${reportId} not found`);
    } else {
      res.status(StatusCodes.OK).json({ data: report });
    }
  } catch (error) {
    next(error);
  }
};

const createReport = async (req, res, next) => {
  try {
    const report = req.body;
    const newReport = await createReportService(report);
    if(!newReport){
        throw new CustomError.InternalServerError('Report could not be created');
    }
    res.status(StatusCodes.CREATED).json({ message: 'Report created successfully', data: newReport });
  } catch (error) {
    next(error);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const reportId = req.params.id;
    const report = req.body;
    const updatedReport = await updateReportService(reportId, report);
    if (!updatedReport) {
      throw new CustomError.NotFoundError(`Report with id ${reportId} not found`);
    }
    res.status(StatusCodes.OK).json({ message: 'Report updated successfully', data: updatedReport });
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const reportId = req.params.id;
    const report = await deleteReportService(reportId);
    if(!report){
        throw new CustomError.NotFoundError(`Report with id ${reportId} not found`);
    }
    res.status(StatusCodes.OK).json({ message: 'Report deleted successfully', data: report });
  } catch (error) {
    next(error);
  }
};


export {
  getReports,
  createReport,
  getReport,
  updateReport,
  deleteReport,
};
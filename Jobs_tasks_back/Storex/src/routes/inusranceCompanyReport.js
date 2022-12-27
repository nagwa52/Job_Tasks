
const express = require("express")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const InsuranceReportService = require("../services/insuranceReportService");
const auth = require("../middlewares/auth")
const restricted = require("../middlewares/restriction")

const router = express.Router()

router.post("/createPdfReport", auth , restricted(1,3,4) , catchAsync(async (req, res, next) => {
    const { InsuranceCompanyId, carId, pdfReport } = req.body;
    const insuranceReportService = new InsuranceReportService();
    let report = await insuranceReportService.createPdfReport({ InsuranceCompanyId, carId, pdfReport });
    if (report.statusCode) return next(new AppError(report.message, report.statusCode))
    res.status(200).json({
        status: "success",
        report
    })
}));

router.get("/getPdfReports",auth , restricted(1,3,4), catchAsync(async (req, res, next) => {
    const { insuranceCompanyId } = req.body;
    const insuranceReportService = new InsuranceReportService();
    let reports = await insuranceReportService.getPdfReports(insuranceCompanyId);
    if (reports.statusCode) return next(new AppError(reports.message, reports.statusCode))
    res.status(200).json({
        status: "success",
        reports
    })
}));

module.exports = router

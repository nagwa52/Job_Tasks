const InsuranceCompanyReport = require("../models/InsuranceCompanyReport");
const AppError = require("../utils/AppError")

class InsuranceReportService {

  async createPdfReport(report) {
    const { InsuranceCompanyId, carId, pdfReport } = report;
    try {
      const reportsLength = (await InsuranceCompanyReport.findAll({})).length;
      var base64Data = pdfReport.replace(/^data:application\/pdf;base64,/, "");
      let filename = `/public/${reportsLength + 1}-${carId}-${InsuranceCompanyId}.pdf`;
      require("fs").writeFile(`.${filename}`, base64Data, 'base64', function (err) {
        if (err)
          console.log(err);
      });
      const createdReport = await InsuranceCompanyReport.create({
        report: filename,
        id: reportsLength + 1,
        insuranceCompanyId: InsuranceCompanyId,
        CarId: carId
      })

      return createdReport;
    } catch (error) {
      return new AppError(error.message, 400)
    }
  }
  async getPdfReports(InsuranceCompanyId) {
    try {
      const reports = await InsuranceCompanyReport.findAll({
        where: {
          insuranceCompanyId: InsuranceCompanyId
        }
      })
      return reports;
    } catch (error) {
      return new AppError(error.message, 400)
    }
  }
}

module.exports = InsuranceReportService;

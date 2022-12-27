
const AccidentReportModel = require("../models/AccidentReport");
class AccidentReport {
  async listAccidentReportsByInsComp(insuranceCompanyId) {
    // const insuranceCompanyId = req.query.insCompId;
    const listAccidentReportsByInsComp = await AccidentReportModel.findAll({
      where: { insuranceCompanyId },
    });
    return listAccidentReportsByInsComp;
  }

  async listAccidentReports() {
    const listAccidentReportsByInsComp = await AccidentReportModel.findAll({});
    return listAccidentReportsByInsComp;
  }
}
module.exports = AccidentReport;


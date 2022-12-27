const express = require("express")
const catchAsync = require("../utils/catchAsync")
const AccidentReport = require("../services/AccidentReport");
const auth = require('../middlewares/auth')

const router = express.Router()



router.get('/', auth , catchAsync(async (req, res) => {
    const insuranceCompanyId = req.body.insCompId
    const accidentReport = new AccidentReport()
    const accReports = await accidentReport.listAccidentReportsByInsComp(Number(insuranceCompanyId));
    res.status(200).json({
        status: "success",
        accidentReports: accReports
    })
}))
// router.get('/', catchAsync(async (req, res) => {
//     const accidentReport = new AccidentReport()
//     const accReports = await accidentReport.listAccidentReports();
//     res.status(200).send(accReports)
// }))





module.exports = router
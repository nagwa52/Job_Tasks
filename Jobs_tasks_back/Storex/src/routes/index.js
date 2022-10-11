module.exports = function ({ app }) {
    const userRoute = require('./userRoute')
    const roleRoute = require('./roleRoute')
    const carRoute = require('./carRoute')
    const accidentReports = require('./AccidentReportRoutes')
    const insuranceCompanies = require('./InsuranceCompanyRoutes')
    const insuranceCompanyReport = require('./inusranceCompanyReport')
    const smsRoute = require("./smsRoutes")
    
    app.use("/api/v2/users", userRoute)
    app.use("/api/v2/roles", roleRoute)
    app.use("/api/v2/cars", carRoute)
    app.use("/api/v2/accidentReports", accidentReports)
    app.use("/api/v2/insuranceCompanies", insuranceCompanies)
    app.use("/api/v2/insuranceCompanyReport", insuranceCompanyReport)
    app.use("/api/v2/sms",smsRoute)
}
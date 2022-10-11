const insuranceCompanyModel = require("../models/InsuranceCompany");
class InsuranceCompany {
  async listInsuranceCompanies() {
    const listInsuranceCompanies = await insuranceCompanyModel.findAll({});
    return listInsuranceCompanies;
  }
}

module.exports = InsuranceCompany;

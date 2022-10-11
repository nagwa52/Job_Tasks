
const express = require("express")
const catchAsync = require("../utils/catchAsync")
const InsuranceCompany = require("../services/InsuranceCompany");
const auth = require("../middlewares/auth")

const router = express.Router()
  router.get("/", auth,catchAsync( async (req, res) => {
    const insuranceCompany = new InsuranceCompany();
    const insCompanies = await insuranceCompany.listInsuranceCompanies();
    res.status(200).send({
      status: "success",
      insuranceCompanies: insCompanies
    });
  }));
module.exports = router
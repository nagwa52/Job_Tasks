const AccidentType = require("./AccidentType");
const InsuranceCompany = require("./InsuranceCompany");
const Insurance = require("./Insurance");
const User = require("./User");
const Broker = require("./Broker");
const Client = require("./Client");
const Driver = require("./Driver");
const Roles = require("./Roles");
const Car = require("./Car");
const Vehicle = require("./Vehicle");
const CarModel = require("./CarModel");
const CarAccidentReports = require("./CarAccidentReports");
const Manufacturer = require("./Manufacturer");
const AccidentReport = require("./AccidentReport");
const InsuranceCompanyReport = require("./InsuranceCompanyReport");
const Package = require("./Package");
const ClientPackage = require("./ClientPackage");
const ServiceRequest = require("./ServiceRequest");
const CarServiceType = require("./CarServiceType");
const Corporate = require("./Corporate");
const CorporateCompany = require("./CorporateCompany")
const PromoCode = require ("./PromoCode")
const VehicleType = require("./VehicleType");
const ServiceRequestDriver = require("./ServiceRequestDriver");

AccidentType.hasMany(AccidentReport, { foreignKey: "accidentTypeId" });
AccidentReport.belongsToMany(Car, { through: CarAccidentReports });
AccidentReport.belongsTo(InsuranceCompany, { foreignKey: "accidentReportId" });

Broker.belongsTo(User);

Client.belongsTo(PromoCode, { foreignKey: "promoCodeId" });

Car.belongsToMany(AccidentReport, { through: CarAccidentReports });
Car.belongsTo(Manufacturer);

Car.belongsTo(Client);

Car.belongsToMany(Client, { through: "Members" });
Car.belongsTo(CarModel);
Car.belongsTo(InsuranceCompany, {
  foreignKey: {
    allowNull: true,
  },
});

CarModel.belongsTo(Manufacturer);

Client.belongsTo(User);
Client.hasMany(Car, { as: "cars" });

Driver.belongsTo(User);
Vehicle.belongsTo(Driver, {
  foreignKey: { name: 'Active_Driver', allowNull: true }
});


Insurance.belongsTo(User);
Insurance.belongsTo(InsuranceCompany);

InsuranceCompany.hasMany(Insurance, { foreignKey: "insuranceCompanyId" });
InsuranceCompany.hasMany(AccidentReport, { foreignKey: "insuranceCompanyId" });
InsuranceCompany.hasMany(Car, { foreignKey: "insuranceCompanyId" });

Manufacturer.hasMany(CarModel, { as: "models" });
Manufacturer.hasMany(Car);

Roles.hasMany(User);
User.belongsTo(Roles);

InsuranceCompanyReport.belongsTo(InsuranceCompany);
InsuranceCompanyReport.belongsTo(Car);

Package.belongsToMany(Client, { through: ClientPackage });
ServiceRequest.belongsTo(ClientPackage, { allowNull: true });

Corporate.belongsTo(User);
Corporate.belongsTo(CorporateCompany);
CorporateCompany.hasMany(Corporate);

ServiceRequest.belongsTo(CorporateCompany, { allowNull: true });
ServiceRequest.belongsTo(CarServiceType);
ServiceRequest.belongsTo(Car);
ServiceRequest.belongsTo(User, { foreignKey: "createdByUser" });
ServiceRequest.belongsTo(Client, { foreignKey: "clientId" });

Driver.belongsToMany(ServiceRequest, { through: ServiceRequestDriver });
// Driver.belongsTo(CarServiceType)


module.exports = async function (db) {
  db.sync({ alter: true })
    .then((result) => {
      console.log("result");
    })
    .catch((err) => {
      console.log(err);
    });
};
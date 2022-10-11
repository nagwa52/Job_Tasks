const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");
const AccidentReport = db.define(
  "AccidentReport",
  {
     // Model attributes are defined here
     id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ref: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    required_images_list: {
      type: DataTypes.STRING,
    },
    police_report_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    repair_report_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    comment_user: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    ai_ref: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.JSONB,
    },
    billDeliveryDate: {
      type: DataTypes.DATE,
    },
    billDeliveryTimeRange: {
      type: DataTypes.STRING,
    },
    billDeliveryNotes: {
      type: DataTypes.STRING,
    },
    billDeliveruLocation: {
      type: DataTypes.STRING,
    },
    img1: {
      type: DataTypes.STRING,
    },
    img2: {
      type: DataTypes.STRING,
    },
    img3: {
      type: DataTypes.STRING,
    },
    img4: {
      type: DataTypes.STRING,
    },
    img5: {
      type: DataTypes.STRING,
    },
    img6: {
      type: DataTypes.STRING,
    },
    img7: {
      type: DataTypes.STRING,
    },
    img8: {
      type: DataTypes.STRING,
    },
    img9: {
      type: DataTypes.STRING,
    },
    img10: {
      type: DataTypes.STRING,
    },
    img11: {
      type: DataTypes.STRING,
    },
    img12: {
      type: DataTypes.STRING,
    },
    img13: {
      type: DataTypes.STRING,
    },
    img14: {
      type: DataTypes.STRING,
    },
    img15: {
      type: DataTypes.STRING,
    },
    img16: {
      type: DataTypes.STRING,
    },
    img17: {
      type: DataTypes.STRING,
    },
    img18: {
      type: DataTypes.STRING,
    },
    img19: {
      type: DataTypes.STRING,
    },
    img20: {
      type: DataTypes.STRING,
    },
    img21: {
      type: DataTypes.STRING,
    },
    img22: {
      type: DataTypes.STRING,
    },
    img23: {
      type: DataTypes.STRING,
    },
    img24: {
      type: DataTypes.STRING,
    },
    internal_img1: {
      type: DataTypes.STRING,
    },
    internal_img2: {
      type: DataTypes.STRING,
    },
    internal_img3: {
      type: DataTypes.STRING,
    },
    internal_img4: {
      type: DataTypes.STRING,
    },
    internal_img5: {
      type: DataTypes.STRING,
    },
    internal_img6: {
      type: DataTypes.STRING,
    },
    id_img1: {
      type: DataTypes.STRING,
    },
    id_img2: {
      type: DataTypes.STRING,
    },
    id_img3: {
      type: DataTypes.STRING,
    },
    id_img4: {
      type: DataTypes.STRING,
    },
    id_img5: {
      type: DataTypes.STRING,
    },
    id_img6: {
      type: DataTypes.STRING,
    },
    air_bag_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    glass_img1: {
      type: DataTypes.STRING,
    },
    glass_img2: {
      type: DataTypes.STRING,
    },
    glass_img3: {
      type: DataTypes.STRING,
    },
    glass_img4: {
      type: DataTypes.STRING,
    },
    glass_img5: {
      type: DataTypes.STRING,
    },
    ab_img1: {
      type: DataTypes.STRING,
    },
    ab_img2: {
      type: DataTypes.STRING,
    },
    ab_img3: {
      type: DataTypes.STRING,
    },
    ab_img4: {
      type: DataTypes.STRING,
    },
    ab_img5: {
      type: DataTypes.STRING,
    },
    ab_img6: {
      type: DataTypes.STRING,
    },
    tires_img1: {
      type: DataTypes.STRING,
    },
    tires_img2: {
      type: DataTypes.STRING,
    },
    tires_img3: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    report: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);
db.sync()
module.exports = AccidentReport;
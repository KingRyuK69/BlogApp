const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Please enter a id"],
  },
  emp_role: {
    type: String,
    required: [true, "Please enter a role"],
  },
  panNo: {
    type: String,
    required: [true, "Please enter a PAN number"],
    default: "Verified",
  },
  GSTIN: {
    type: String,
    required: [true, "Please enter a GSTN number"],
    default: "Verified",
  },
});

const Emp = mongoose.model("emp_detail", EmployeeSchema);

module.exports = Emp;

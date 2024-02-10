const { addEmp, getAllEmp } = require("../controller/empContoller"); // emp controller

//add PAN and GSTIN validation middleware
const {
  add_GSTIN_PanValidation,
} = require("../middleware/pan_gstinValidation");

const router = require("express").Router();

router.post("/addEmp", add_GSTIN_PanValidation, addEmp); //emp add

router.get("/getAllEmp", getAllEmp); //emp get all

module.exports = router;

const Emp = require("../models/Mongoose/empModel");

// emp registration
const addEmp = async (req, res) => {
  // Extracting emp details from the request body and storing them in a 'data' object.
  const data = {
    emp_role: req.body.emp_role,
    panNo: req.body.panNo,
    GSTIN: req.body.GSTIN,
  };

  try {
    // Checking if a emp with the same email already exists in the database.
    const existingEmp = await Emp.findOne({ emp_role: data.emp_role });

    // If emp exists, return an error message.
    if (existingEmp) {
      return res.status(400).json({
        error: true,
        result: null,
        msg: "Emp already exists",
      });
    } else {
      // Create a new emp
      const emp = new Emp({
        user_id: req.body.user_id,
        emp_role: data.emp_role,
        panNo: data.panNo,
        GSTIN: data.GSTIN,
      });

      // Save the new emp to the database.
      await emp.save();

      // Return the emp data
      return res.status(200).json({
        error: false,
        result: emp,
        msg: "New Emp created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, result: null, message: error.message });
  }
};

//show all emp
const getAllEmp = async (req, res) => {
  try {
    const emp = await Emp.find({});
    res.status(200).json({ error: false, result: emp, msg: "All Emp Details" });
  } catch (error) {
    res.status(500).json({ error: true, result: null, msg: error.message });
  }
};

module.exports = { addEmp, getAllEmp };

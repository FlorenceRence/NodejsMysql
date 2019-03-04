const express = require("express");
const router = express.Router();

const EmployeesController = require("../controllers/employees");

//new Date().toISOString()
//const upload = multer({ dest: "uploads/" }); by doing this the folder uploads automatically created

router.get("/", EmployeesController.employees_get_all);
router.get("/:EmpID", EmployeesController.employees_get_product);
router.delete("/:EmpID", EmployeesController.employees_delete_product);
router.post("/", EmployeesController.employees_create_product);
router.put("/", EmployeesController.employees_update_product);

module.exports = router;

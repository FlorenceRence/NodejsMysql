const Employee = require("../models/employees"); //we use .. coz product is in a parent folder models
const mongoose = require("mongoose");

exports.employees_get_all = (req, res, next) => {
  Employee.find()
    .select()
    .exec()
    .then(docs => {
      //   const response = {
      //     employees: docs.map(doc => {
      //       return {
      //         EmpID: doc.EmpID,
      //         Name: doc.Name,
      //         EmpCode: doc.EmpCode,
      //         Salary: doc.Salary
      //       };
      //     })
      //   };
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.employees_get_product = (req, res, next) => {
  const id = req.params.EmpID; //USING UNIQUE IDENTIFICATION BY MONGOSE
  Employee.findById(id)
    //Employee.find({ EmpID: empid })
    .select()
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(
          //employee: doc
          doc
        );
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.employees_delete_product = (req, res, next) => {
  const id = req.params.EmpID;
  Employee.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Employee deleted"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.employees_update_product = (req, res, next) => {
  const modelId = req.body.EmpID;
  //const newName = req.body.Name;
  const allObj = {
    Name: req.body.Name,
    EmpCode: req.body.EmpCode,
    Salary: req.body.Salary
  };

  Employee.findById(modelId)
    .then(model => {
      //   return Object.assign(model, { Name: newName });
      return Object.assign(model, allObj);
    })
    .then(model => {
      return model.save();
    })
    .then(updatedModel => {
      res.json({
        msg: "model updated"
        //updatedModel
      });
    })
    .catch(err => {
      res.send(err);
    });
  /////////////////////////////
  //   const id = req.params.EmpID;
  //   const updateOps = {};
  //   for (const ops of req.body) {
  //     updateOps[ops.propName] = ops.value;
  //   }
  //   Employee.update({ _id: id }, { $set: updateOps })
  //     .exec()
  //     .then(result => {
  //       res.status(200).json({
  //         message: "Employee Updated"
  //       });
  //     })
  //     .catch(err => {
  //       res.status(500).json({ error: err });
  //     });
  /////////////////////////////
  //   const emp = new Employee({
  //     EmpID: req.body.EmpID,
  //     Name: req.body.Name,
  //     EmpCode: req.body.EmpCode,
  //     Salary: req.body.Salary
  //   });
  //   emp
  //     .update()
  //     .then(result => {
  //       res.status(201).json({
  //         message: "Employee updated"
  //       });
  //     })
  //     .catch(error => {
  //       res.status(500).json({ error: error });
  //     });
};

exports.employees_create_product = (req, res, next) => {
  const emp = new Employee({
    EmpID: new mongoose.Types.ObjectId(),
    Name: req.body.Name,
    EmpCode: req.body.EmpCode,
    Salary: req.body.Salary
  });
  emp
    .save()
    .then(result => {
      res.status(201).json({
        message: "Employee added"
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

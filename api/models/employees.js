const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    //EmpID: mongoose.Schema.Types.ObjectId,
    //EmpID: { type: String, required: true },
    Name: { type: String, required: true },
    EmpCode: { type: String, required: true },
    Salary: { type: String, required: true }
  },
  {
    toObject: {
      transform: function(doc, ret) {
        //ret.EmpID = ret._id;
        delete ret.__v;
        delete ret._id;
      }
    },
    toJSON: {
      transform: function(doc, ret) {
        ret.EmpID = ret._id;
        delete ret.__v;
        delete ret._id;
      }
    }
  }
);

module.exports = mongoose.model("Employee", employeeSchema);

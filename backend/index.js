const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/employee.model");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ninja2004:nazanaza@nodetuts.fzqms.mongodb.net/"
);

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  // connect();
  console.log("server is running");
});

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };


// const validate = (data) => {
  //   const schema = joi.object({
    //     firstName: joi.string().min(3).max(255).required().label("First Name"),
    //     lastName: joi.string().min(3).max(255).required().label("Last Name"),
    //     email: joi.string().min(6).max(255).required().email().label("Email"),
    //     password: passwordComplexity().required().label("Password"),
    //   });
    //   return schema.validate(data);
    // };
    
const User = mongoose.model("User", userSchema);
module.exports = { User };

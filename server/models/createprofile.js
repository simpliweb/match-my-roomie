const mongoose = require("mongoose");

const createProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  Gender: {
    type: String,
  },
  age: {
    type: String,
  },
  about: {
    type: String,
  },
  photo: {
    type: String,
  },
});

const Profile = mongoose.model("User Profiles", createProfileSchema);

module.exports = Profile;

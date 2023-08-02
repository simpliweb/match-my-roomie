const mongoose = require("mongoose");

const tutSchema = new mongoose.Schema({
  genderPreference: {
    type: String,
  },
  accommodationType: {
    type: String,
  },
  preferredAge: {
    type: String,
  },
  topPreference: {
    type: String,
  },
});

const UserPreference = new mongoose.model("User Preference", tutSchema);

module.exports = UserPreference;

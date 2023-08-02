const create_router = require("express").Router();
const cors = require("cors");
create_router.use(cors());
const bodyParser = require("body-parser");
const Profile = require("../models/createprofile");
const preference = require("../models/addpreference");
create_router.use(bodyParser.json());
create_router.use(cors());

// Dashboard route to search for profiles based on user's preferred gender
create_router.route("/dashboard").get((req, res) => {
  const { genderPreference } = req.query;

  if (!genderPreference) {
    // If no gender preference provided, return all profiles
    Profile.find({})
      .then((profiles) => {
        if (profiles.length === 0) {
          return res.json("No profiles found");
        }
        res.json(profiles);
      })
      .catch((err) => res.status(500).json("Error: " + err));
  } else {
    // If gender preference is provided, filter profiles based on the top preference
    preference
      .findOne({ genderPreference })
      .then((preferenceData) => {
        if (!preferenceData) {
          return res.status(404).json("Preferences not found");
        }
        const { topPreference } = preferenceData;

        Profile.find({ Gender: topPreference })
          .then((profiles) => {
            if (profiles.length === 0) {
              return res.json("No matching profiles found");
            }
            res.json(profiles);
          })
          .catch((err) => res.status(500).json("Error: " + err));
      })
      .catch((err) => res.status(500).json("Error: " + err));
  }
});

module.exports = create_router;

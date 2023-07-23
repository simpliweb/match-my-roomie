const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
const moongose = require("mongoose");
const userRoutes = require("./routes/user");
// const authRoutes = require("./routes/auth");

// env config
env.config();
const url = process.env.ATLAS_URI;
// db connection
moongose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));


// middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/user", userRoutes);
// app.use("/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

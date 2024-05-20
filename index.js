const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MongoDB Atlas connection URL
const mongoURL = process.env.CONNECT_DB;

const dbName = "database";

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURL, {
    dbName: dbName,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1);
  });

const dataSchema = new mongoose.Schema({
  work_year: Number,
  experience_level: String,
  employment_type: String,
  job_title: String,
  salary: Number,
  salary_currency: String,
  salary_in_usd: Number,
  employee_residence: String,
  remote_ratio: Number,
  company_location: String,
  company_size: String,
});

const Data = mongoose.model("Data", dataSchema);

app.get("/", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

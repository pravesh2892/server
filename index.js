const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MongoDB Atlas connection URL
const mongoURL =
  "mongodb+srv://praveshmeena2892:vcdNBO1e0QbOlOD5@cluster0.jn6q6dr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB database name
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

//  Mongoose schema
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

// Start the server
const PORT = 5014;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jsDateToMysqlDateTime = require("./utils");
require("dotenv").config();

const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// API Endpoint to save scanned QR codes
app.post("/api/qrcodes", (req, res) => {
  const { data, dateTime } = req.body;

  if (!data || !dateTime) {
    return res.status(400).send("Missing data or dateTime in request body");
  }

  const insertQuery = `INSERT INTO scanned_qr_codes (data, scan_time) VALUES (?, ?)`;

  const formattedDateTime = jsDateToMysqlDateTime(new Date(dateTime));

  db.query(insertQuery, [data, formattedDateTime], (error, results) => {
    if (error) {
      console.error("Error saving data to MySQL:", error);
      return res.status(500).send("Error saving data");
    }
    console.log("Data saved to MySQL:", results);
    res.status(200).send("Data saved successfully");
  });
});

// API Endpoint to retrieve all scanned QR codes
app.get("/api/qrcodes", (req, res) => {
  const selectQuery = `SELECT * FROM scanned_qr_codes`;

  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Error fetching data from MySQL:", error);
      return res.status(500).send("Error fetching data");
    }
    res.status(200).json(results);
  });
});

// API Endpoint to delete a scanned QR code by its ID
app.delete("/api/qrcodes/:id", (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM scanned_qr_codes WHERE id = ?`;

  db.query(deleteQuery, [id], (error, results) => {
    if (error) {
      console.error("Error deleting data from MySQL:", error);
      return res.status(500).send("Error deleting data");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("No record found with the given ID");
    }
    console.log(`Data with ID ${id} deleted from MySQL`);
    res.status(200).send("Data deleted successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

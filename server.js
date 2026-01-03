import cors from "cors";
import mysql from "mysql";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database connection
const db = mysql.createPool({
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mobile_project",
});

// Test DB connection
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/products", (req, res) => {
  const q = "SELECT * FROM product";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No products found");
      }
      return res.status(200).json(data);
    }
  });
});

app.post("/customers", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { name, email, phone, address, nb_of_items, item_to_buy, price, payment_method } = req.body;

  const errors = [];
  if (!name) {
    errors.push(" name is required");
  }
  if (!email) {
    errors.push(" email is required");
  }
  if (!phone) {
    errors.push(" phone is required");
  }
    if (!address) {
    errors.push(" address is required");
  }
  if (!nb_of_items) {
    errors.push(" number of items is required");
    }
    if (!item_to_buy) {
    errors.push(" item to buy is required");
  }
  if (!price) {
    errors.push(" price is required");
  }
  if (!payment_method) {
    errors.push(" payment method is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  const q =
    "INSERT INTO customer (name, email, phone, address, nb_of_items, item_to_buy, price, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(q, [name, email, phone, address, nb_of_items, item_to_buy, price, payment_method], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Customer added successfully",
     
      });
    }
  });
});


import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import morgan from "morgan";
const app = express();

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.use(express());
app.use(cors());
app.use(morgan());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// create a book ->
app.post("/books", (req, res) => {
  const { title, desc, cover } = req.body;
  if (!title || !desc || !cover) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)";
  const values = [title, desc, cover];
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error creating book:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(201).json({ message: "Book created successfully", data });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookID], (err, data) => {
    res.json({ message: "Books have been deleted!" });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

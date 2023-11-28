import express from "express";
import dotenv from "dotenv";
import mysql from 'mysql'
const app = express();

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/",(req,res)=>{
    res.json("hello this")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

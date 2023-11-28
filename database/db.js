import mysql from "mysql";

export const connectDB = async () => {
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
};

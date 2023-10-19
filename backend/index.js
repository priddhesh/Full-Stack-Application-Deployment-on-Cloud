require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const { getData } = require("./database.js");

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

app.route("/data").get(async (req, res) => {
  let data = await getData();
  res.send(data);
});

app.route("/addData").post(async (req,res) =>{
    let data = req.body.newData;
    pool.query(
      `INSERT INTO data(info) VALUES ("${data}")`,
      (err, rows) => {
        if (err) throw err;
      }
    );
    res.send(`Added data`);
  });

app.route("/deleteData/:id").delete(async (req,res) =>{
  let id = parseInt(req.params.id);
  pool.query(
    `DELETE FROM data WHERE id = '${id}'`,
    (err, rows) => {
      if (err) throw err;
    }
  );
  res.send(`Deleted data with id ${id}`);
});

app.route("/updateData/:id").patch(async (req,res) =>{
    let id = parseInt(req.params.id);
    let updatedData = req.body.data;

    pool.query(
      `UPDATE data SET data = '${updatedData}' WHERE id = '${id}'`,
      (err, rows) => {
        if (err) throw err;
      }
    );
    res.send(`Updated data with id ${id}`);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

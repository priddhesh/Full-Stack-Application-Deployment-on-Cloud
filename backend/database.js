const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  })
  .promise();

const getData = async () => {
  try {
    const [data] = await pool.execute(`SELECT * from  data`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getData,
};

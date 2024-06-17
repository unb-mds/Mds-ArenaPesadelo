const express = require ("express");
const app = express();
const mysql = require('mysql2') 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "182110",
  database: "login",
});

app.listen(3001,()=>{
  console.log("Sistema Online");
 })
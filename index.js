const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movies_database",
  timezone: "+00:00",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `CREATE TABLE movies (movie_name VARCHAR(255), actor VARCHAR(255), actress VARCHAR(255), relyr VARCHAR(255), director VARCHAR(255), PRIMARY KEY(movie))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  sql = `INSERT INTO movies (movie_name, actor, actress, relyr, director) VALUES ?`;
  var values = [
    
['Harry Potter', 'Daniel Radcliff', 'Hermione', '2001','chris columbus'],  
['shershah', 'Sidharth', 'kiara', '2021','vishnuvardhan'],  
['rrr', 'Ram Charan', 'alia bhatt','2022', 'S. S. Rajamouli']  

  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM movies", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});

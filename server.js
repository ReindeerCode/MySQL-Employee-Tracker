// Dependencies
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var mysql = require("mysql2");
var connection = mysql.createConnection({ multipleStatements: true });
// require('dotenv').config()
// console.log(process.env.DB_PASSWORD)
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "top_songsDB",
});
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//     let search = process.argv[2];
//     connection.query(`select * from top5000 where artist="${search}"`, function(err, res){
//         if (err) throw err;
//         console.table(res);
//         connection.end();
//     });
// });
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//   //   afterConnection();
//       let startYear = process.argv[2];
//       let endYear = process.argv[3];
//       connection.query(`select * from top5000 where year between "${startYear}" and "${endYear}"`, function(err, res){
//           if (err) throw err;
//           console.table(res);
//           connection.end();
//       });
//   });

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen

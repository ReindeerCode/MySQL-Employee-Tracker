// Dependencies
const express = require("express");
const inquirer = require("inquirer");
const path = require("path");
const cTable = require("console.table");
const fs = require("fs");
const mysql2 = require("mysql2");
const questions = require("./questions");
const { request } = require("http");
const app = express();
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const tableUpdates = [];

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_trackerdb",
});

// function add () {
//   inquirer.prompt(questions.add).then((answers) => {
//     const add = new Add(
//       answers.department,
//       answers.role,
//       answers.employee,
//     )
//   });
//  tableUpdates.push(add);
//  //call next function here
// }

//will need to get information from database first
// function view () {
//   inquirer.prompt(questions.view).then((answers) => {
//     const view = new View(
//       answers.department,
//       answers.role,
//       answers.employee,
//     )
//   });
//  tableUpdates.push(view);
//  //call next function here
// }

//will need to get information from database first
// function update () {
//   inquirer.prompt(questions.update).then((answers) => {
//     const update = new Update(
//       answers.employee,
//     )
//   });
//  tableUpdates.push(update);
//  //call next function here
// }

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  connection.end();
});

function afterConnection() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen

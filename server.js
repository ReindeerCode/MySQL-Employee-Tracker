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

//questions functions
//initial questions function
// function starter() {
//   inquirer.prompt(questions.starter).then((answers) => {
//     if (answers.starterQuestion === "Add department, role, or employee.")
//       add();
//     } else if (
//       answers.starterQuestion === "View departments, roles, or employees."
//     ) {
//       view();
//     } else if (answers.starterQuestion === "Update an employee's role.") {
//       update();
//     } else {
//       afterConnection();
//     }
//   });
// }
// starter();
//end initial questions function

//user wants to add to tables function
// function add () {
//     if (answers.addSomething === "Add new department.")
//       create function to add to department table();
//     } else if (
//       answers.addSomething === "Add new role."
//     ) {
//       create function to add to role table();
//     } else if (answers.addSomething === "Add new employee.") {
//       create function to add to employee table();
//     } else {
//       afterConnection();
//     }
//   });
//end user wants to add to tables function

//user wants to view table data function
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
//end user wants to view table data function

//user wants to update role table data function
// function update () {
//   inquirer.prompt(questions.update).then((answers) => {
//     const update = new Update(
//       answers.employee,
//     )
//   });
//  tableUpdates.push(update);
//  //call next function here
// }
//end user wants to update role table data function
//end questions functions

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  connection.end();
});

function afterConnection() {
  connection.query(
    `select * from employee
  inner join role on employee.role_id = role.id
  inner join department on role.department_id = department.id;`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen

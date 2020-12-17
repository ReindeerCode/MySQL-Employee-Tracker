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

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_trackerdb",
});

//inquirer questions functions___________________________
//initial questions function___________________________
function starter() {
  inquirer.prompt(questions.starter).then((answers) => {
    if (answers.starterQuestion === "Add department, role, or employee.") {
      add();
    } else if (
      answers.starterQuestion === "View departments, roles, or employees."
    ) {
      view();
    } else if (answers.starterQuestion === "Update an employee's role.") {
      update();
    } else {
      afterConnection();
    }
  });
}
//end initial questions function___________________________

//user wants to add to tables function___________________________
function add() {
  inquirer.prompt(questions.add).then((answers) => {
    if (answers.addSomething === "Add new department.") {
      inquirer.prompt(questions.newDepartName).then((answers) => {
        if (answers.newDepartName !== "") {
          addNewDepartName(answers);
        } else {
          console.log("Error entering new department name");
        }
      });
    } else if (answers.addSomething === "Add new role.") {
      inquirer.prompt(questions.newRoleInfo).then((answers) => {
        if (answers.newRoleInfo !== "") {
          addNewRoleInfo(answers);
        } else {
          console.log("Error entering new role info");
        }
      });
    } else if (answers.addSomething === "Add new employee.") {
      inquirer.prompt(questions.newEmployeeInfo).then((answers) => {
        if (answers.newEmployeeInfo !== "") {
          addNewEmployee(answers);
        } else {
          console.log("Error entering new employee info");
        }
      });
    }
  });
}

function addNewDepartName(answers) {
  connection.query(
    `USE employee_trackerDB;
    insert into department(name)
    value ("${newDepartName}");`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}
function addNewRoleInfo(answers) {
  connection.query(
    `USE employee_trackerDB;
    insert into role(title, salary, department_id)
    value ("${newRoleTitle}","${newRoleSalary}", "${newRoleDepartment_ID}");`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}

function addNewEmployee(answers) {
  connection.query(
    `USE employee_trackerDB;
    insert into employee(first_name, last_name, manager_id)
    value ("${newFirstName}","${newLastName}", "${newEmployeeID}", "${newEmployeeManager_ID}");`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}
//end user wants to add to tables function___________________________

//user wants to view table data function___________________________
// function view () {
// inquirer.prompt(questions.view).then((answers) => {
//     if (answers.viewSomething === "View departments.") {
//     //   console.table(`SELECT * FROM department`);
//     } else if (
//       answers.viewSomething === "View roles."
//     ) {
//       // console.table(`select * from role`);
//     } else if (answers.viewSomething === "View employees.") {
//       // console.table(`select * from employee`);
//     } else {
//       afterConnection();
//     }
//   });
// }
//end user wants to view table data function___________________________

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
//end user wants to update role table data function_______________________
//end inquirer questions functions___________________________

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
// // initialize starter function
// starter();
// // end initialize starter function

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen

// Dependencies
const express = require("express");
const inquirer = require("inquirer");
const path = require("path");
const cTable = require("console.table");
const fs = require("fs");
const mysql2 = require("mysql2");
const questions = require("./questions");
const { request, get } = require("http");
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
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  starter();
});

function starter() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "starterQuestion",
        message: "What would you like to do?",
        choices: [
          "View departments.",
          "View Roles.",
          "View Employees.",
          "Add department.",
          "Add Role.",
          "Add Employee.",
          "Update an employee's role.",
          "I'm done.",
        ],
      },
    ])
    .then((answers) => {
      if (answers.starterQuestion === "View departments.") {
        getDepartment();
      } else if (answers.starterQuestion === "View Roles.") {
        getRoles();
      } else if (answers.starterQuestion === "View Employees.") {
        getEmployees();
      } else {
        connection.end();
      }
    });
}

function getDepartment() {
  const query = "SELECT name FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    starter();
  });
}

function getRoles() {
  const query =
    "select role.title, role.salary, department.name from role inner JOIN department on role.department_id = department.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    starter();
  });
}

function getEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    let table = [];
    res.forEach((employee) => {
      table.push({
        ID: `${employee.id}`,
        NAME: `${employee.first_name} ${employee.last_name}`,
        ROLE_ID: `${employee.role_id}`,
        MANAGER_ID: `${employee.manager_id}`,
      });
    });
    console.table(table);
    starter();
  });
}

// function addNewDepartName(answers) {
//   connection.query(
//     `USE employee_trackerDB;
//     insert into department(name)
//     value ("${answers.newDepartName}");`,
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
// }
// function addNewRoleInfo(answers) {
//   connection.query(
//     `USE employee_trackerDB;
//     insert into role(title, salary, department_id)
//     value ("${answers.newRoleTitle}","${answers.newRoleSalary}", "${answers.newRoleDepartment_ID}");`,
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
// }

// function addNewEmployee(answers) {
//   connection.query(
//     `USE employee_trackerDB;
//     insert into employee(first_name, last_name, manager_id)
//     value ("${answers.newFirstName}","${answers.newLastName}", "${answers.newEmployeeID}", "${answers.newEmployeeManager_ID}");`,
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
// }
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

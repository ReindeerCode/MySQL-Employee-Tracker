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
  inquirer.prompt(questions.starterQ).then((answers) => {
    if (answers.starterQuestion === "View departments.") {
      getDepartment();
    } else if (answers.starterQuestion === "View Roles.") {
      getRoles();
    } else if (answers.starterQuestion === "View Employees.") {
      getEmployees();
    } else if (answers.starterQuestion === "Add Department.") {
      addDepartment();
    } else if (answers.starterQuestion === "Add Role.") {
      addRole();
    } else if (answers.starterQuestion === "Add Employee.") {
      addEmployee();
    } else if (answers.starterQuestion === "Update an employee's role.") {
      updateRole();
    } else {
      connection.end();
    }
  });
}

function addDepartment() {
  inquirer.prompt(questions.newDepartName).then((answers) => {
    if (answers.newDepartName !== "") {
      console.log(answers.body);
      // function addDepartment(answer) {
      //   connection.query(
      //     "UPDATE department SET name = ? WHERE id = ?",
      //     [product.stock_quantity + quantity, id],
      //     function (err, res) {
      //       // Let the user know the purchase was successful, re-run loadProducts
      //       console.log(
      //         "\nSuccessfully added " +
      //           quantity +
      //           " " +
      //           product.product_name +
      //           "'s!\n"
      //       );
      //       loadManagerMenu();
      //     }
      //   );
      // }
      // // Gets all departments, then gets the new product info, then inserts the new product into the db
      // function addNewProduct() {
      //   getDepartments(function (err, departments) {
      //     getProductInfo(departments).then(insertNewProduct);
      //   });
      // }
    } else {
      console.log("something went wrong adding new department");
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

// function afterConnection() {
//   connection.query(
//     `select * from employee
//   inner join role on employee.role_id = role.id
//   inner join department on role.department_id = department.id;`,
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//     }
//   );
// }

// listen
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// end listen

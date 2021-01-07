// Dependencies
const inquirer = require("inquirer");
const path = require("path");
const cTable = require("console.table");
const fs = require("fs");
const mysql2 = require("mysql2");
const questions = require("./questions");
const PORT = process.env.PORT || 8080;

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
  // updateRole();
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
      console.log("Good work, ending app now.");
      afterConnection();
    }
  });
}

function getDepartment(cb) {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    // if (cb !== null) {
    //   cb(res);
    //   return;
    // }
    console.table(res);
    starter();
  });
}

function getRoles(cb) {
  const query = "select * from role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    // if (cb !== null) {
    //   cb(res);
    //   return;
    // }
    console.table(res);
    starter();
  });
}

function getEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    let table = res.map((employee) => {
      return {
        ID: employee.id,
        NAME: `${employee.first_name} ${employee.last_name}`,
        ROLE_ID: employee.role_id,
        MANAGER_ID: employee.manager_id,
      };
    });
    console.table(table);
    starter();
  });
}

function addDepartment() {
  inquirer.prompt(questions.newDepartName).then((answers) => {
    connection.query(
      `INSERT INTO department (name) VALUES ("${answers.newDepartName}");`,
      function (err) {
        if (err) throw err;
        const query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log(`-------------------------
          Your department name was created successfully!
          -------------------------`);
          console.table(res);
          starter();
        });
      }
    );
  });
}

function addRole() {
  getDepartment((res) => {
    let names = res.map((name) => {
      return { value: name.id, name: name.name };
    });
    inquirer.prompt(questions.newRoleInfo(names)).then((answers) => {
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${answers.newRoleTitle}", ${answers.newRoleSalary}, ${answers.newRoleDepartment_ID});`,
        function (err) {
          if (err) throw err;
          console.log(`-------------------------
          Your new role was created successfully!
          -------------------------`);
          console.table(res);
          starter();
        }
      );
    });
  });
}

function addEmployee() {
  inquirer.prompt(questions.newEmployeeInfo).then((answers) => {
    if (answers.newEmployeeManager_ID !== "") {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newFirstName}", "${answers.newLastName}", ${answers.newEmployeeID}, ${answers.newEmployeeManager_ID});`,
        function (err) {
          if (err) throw err;
          console.log(`Your new employee was created successfully!
          -------------------------`);
          starter();
        }
      );
    } else {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answers.newFirstName}", "${answers.newLastName}", ${answers.newEmployeeID});`,
        function (err) {
          if (err) throw err;
          console.log(`Your new employee was created successfully!
          -------------------------`);
          starter();
        }
      );
    }
  });
}

function updateRole() {
  let query = "SELECT * FROM employee";
  let employees = [];
  connection.query(query, (err, res) => {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      employees.push({
        name: res[i].first_name + " " + res[i].last_name,
        value: res[i].id,
      });
    }

    let roles = [];
    let query =
      "select role.id, role.title, role.salary, department.name from role inner JOIN department on role.department_id = department.id";
    connection.query(query, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roles.push({
          name: res[i].title,
          value: res[i].id,
        });
      }
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmployee",
          message: "Which employee would you like to update?",
          choices: employees,
        },
        {
          type: "list",
          name: "updateRole",
          message: "Which role would you like to assign?",
          choices: roles,
        },
      ])
      .then((answers) => {
        console.log(answers);
        let query = "UPDATE employee SET ? WHERE ?";
        connection.query(
          query,
          [
            {
              role_id: answers.updateRole,
            },
            {
              id: answers.updateEmployee,
            },
          ],

          function (err, res) {
            if (err) throw err;
            console.log(res);
            starter();
          }
        );
      });
  });
}

function afterConnection() {
  connection.query(
    `select * from employee
  left join role on employee.role_id = role.id;`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    }
  );
}

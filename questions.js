const entryValidate = (answer) => {
  if (answer === "") {
    return "Cannot be blank.";
  }
  return true;
};
const numberValidate = (answer) => {
  if (isNaN(answer) === false) {
    return true;
  }
  return "Must be a number.";
};

const starterQ = [
  {
    type: "list",
    name: "starterQuestion",
    message: "What would you like to do?",
    choices: [
      "View departments.",
      "View Roles.",
      "View Employees.",
      "Add Department.",
      "Add Role.",
      "Add Employee.",
      "Update an employee's role.",
      "I'm done.",
    ],
  },
];

const add = [
  {
    type: "list",
    name: "addSomething",
    message: "What would you like to add?",
    choices: [
      "Add new department.",
      "Add new role.",
      "Add new employee.",
      "I'm done, show me the master table.",
    ],
  },
];

const newDepartName = [
  {
    type: "input",
    name: "newDepartName",
    message: "What is the new department's name?",
    validate: entryValidate,
  },
];
const newRoleInfo = [
  {
    type: "input",
    name: "newRoleTitle",
    message: "What is the new role's title?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "newRoleSalary",
    message: "What is the new role's salary?",
    validate: numberValidate,
  },
  {
    type: "input",
    name: "newRoleDepartment_ID",
    message: "What is the new role's Department ID number?",
    validate: numberValidate,
  },
];

const newEmployeeInfo = [
  {
    type: "input",
    name: "newFirstName",
    message: "What is the employee's first name?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "newLastName",
    message: "What is the employee's last name?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "newEmployeeID",
    message: "What is the new employee's id number?",
    validate: numberValidate,
  },
  {
    type: "input",
    name: "newEmployeeManager_ID",
    message:
      "What is the new employee's manager ID number? (Can be left blank.)",
  },
];

const view = [
  {
    type: "list",
    name: "viewSomething",
    message: "What would you like to view?",
    choices: [
      "View departments.",
      "View roles.",
      "View employees.",
      "I'm done, show me the master table.",
    ],
  },
];

const update = [
  {
    type: "list",
    name: "updateEmployee",
    message: "Which employee's role would you like to update?",
    choices: "",
  },
  {
    type: "list",
    name: "updateRole",
    message: "Which employee's role would you like to update?",
    choices: "",
  },
];

module.exports = {
  add,
  view,
  update,
  starterQ,
  newRoleInfo,
  newDepartName,
  newEmployeeInfo,
};

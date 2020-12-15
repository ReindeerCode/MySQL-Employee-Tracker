const entryValidate = (answer) => {
  if (answer === "") {
    return "This field cannot be empty";
  }
  return true;
};

const add = [
  {
    type: "input",
    name: "department",
    message: "Add new department?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "role",
    message: "Add new role?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "employee",
    message: "Add new employee?",
    validate: entryValidate,
  },
];

const view = [
  {
    type: "input",
    name: "department",
    message: "Add a department?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "role",
    message: "View a role?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "employee",
    message: "View an employee?",
    validate: entryValidate,
  },
];

const update = [
  {
    type: "input",
    name: "employee",
    message: "Would you like to update an employees role?",
    validate: entryValidate,
  },
];

module.exports = {
  add,
  view,
  update,
};

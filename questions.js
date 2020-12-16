const entryValidate = (answer) => {
  if (answer === "") {
    return "Type First and Last name of employee.";
  }
  return true;
};

const starter = [
  {
    type: "list",
    name: "starterQuestion",
    message: "Would you like to add, view, or update something?",
    choices: [
      "Add department, role, or employee.",
      "View departments, roles, or employees.",
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
      "I'm done.",
    ],
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
      "I'm done.",
    ],
  },
];

const update = [
  {
    type: "input",
    name: "updateRole",
    message: "Who's role would you like to update?",
    validate: entryValidate,
  },
];

module.exports = {
  add,
  view,
  update,
  starter,
};

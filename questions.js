const entryValidate = (answer) => {
  if (answer === "") {
    return "This field cannot be empty";
  }
  return true;
};

const emailValidate = function (email) {
  valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  if (valid) {
    return true;
  } else {
    return "Please enter a valid email";
  }
};

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the Manager's name?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "id",
    message: "What is the Manager's ID?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "email",
    message: "What is the Manager's email address?",
    validate: emailValidate,
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the Manager's office number?",
    validate: function (answer) {
      if (isNaN(answer)) {
        return "Please enter a number";
      }
      return true;
    },
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "id",
    message: "What is the engineer's ID?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email address?",
    validate: emailValidate,
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub name?",
    validate: entryValidate,
  },
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "id",
    message: "What is the intern's ID?",
    validate: entryValidate,
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email address?",
    validate: emailValidate,
  },
  {
    type: "input",
    name: "school",
    message: "Where did the intern go to school?",
    validate: entryValidate,
  },
];

module.exports = {
  internQuestions,
  managerQuestions,
  engineerQuestions,
};

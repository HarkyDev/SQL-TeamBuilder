const { clear } = require("console");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

//passes through the information needed to connect to the sql db
const connection = mysql.createConnection({
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.LOCATION,
  port: 3306,
});
// connects to the sql server we have set up
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id: ${connection.threadId}`);
});

//view roles
const viewEmployees = () => {
  console.log("THESE ARE ALL THE Employees CURRENTLY AS FOLLOWS");
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(
      "SELECT * FROM employee_manager_db.employee",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
    mainMenu()
  });
};


//view roles
const viewRoles = () => {
  console.log("THESE ARE ALL THE ROLES CURRENTLY AS FOLLOWS");
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(
      "SELECT title FROM employee_manager_db.role",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
    mainMenu()
  });
};


//view departments
const viewDepartment = () => {
  console.log("THESE ARE ALL THE DEPARTMENTS CURRENTLY ASS FOLLOWS");
  connection.connect(function (err) {
    if (err) throw err;
    connection.query(
      "SELECT department FROM employee_manager_db.department",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
    mainMenu()
  });
};

//add dep function
const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "add department",
    })
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO department SET ?",
        answer,

        (err, res) => {
          if (err) throw err;
          console.log(`${answer.department} has been added`);
        }
        );
      });
      mainMenu();
};

// runs the main prompt to start the app
const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          //   view all roles x , view all employees x, add a department, x add a role x, add an employee, and update an employee role
          "view all roles",
          "view all employees",
          "view departments",
          "add a department",
          "add role",
          "add an employee",
        ],
      },
    ])
    .then((data) => {
      if (data.mainMenu == "view all roles") {
        console.log("the answer was view all roles");
        viewRoles()
      } else if (data.mainMenu == "view all employees") {
        console.log("user selected all employees");
        viewEmployees()
      } else if (data.mainMenu == "add a department") {
        console.log("user selected add dep");
        addDepartment();
      } else if (data.mainMenu == "add role") {
        console.log("user selected add role");
      } else if (data.mainMenu == "add an employee") {
        console.log("user selected add an employee");
      } else if (data.mainMenu == "view departments") {
        console.log("user selected view departments");
        viewDepartment();
      }
    });
};

mainMenu();

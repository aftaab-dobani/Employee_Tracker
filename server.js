const mysql = require("mysql");
const inquirer = require("inquirer");
var consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Ayham0736!",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

function init() {
  inquirer
    .prompt([
      {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Department",
      ],
     
    },
    ])
      .then((answer) => {
      switch (answer.action) {
        case "View all Employees":
          viewAllEmployees();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add an employee":
          viewEmployee();
          break;

        case "Remove an employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateEmployee();
          break;

        case "Update employee department":
          updateEmployeeDepartment();
          break;

        case "Quit":
          connection.exit();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// ------------------- VIEW -------------------

// View All Roles
const viewAllRoles = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

// View All Employees 
const viewAllEmployees = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

// View All Departments 
const viewAllDepartments = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};


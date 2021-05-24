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
        "View all employees by department",
        "View all employees by manager",
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

        case "View All Employees By Department": 
          viewAllEmpByDep();
          break;

          case "View All Employees By Manager": 
          viewAllEmpByMan();
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

const viewAllEmpByDep = () => {
  connection.query("SELECT department_name FROM department", 
  (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "departments",
          type: "rawlist",
          choices() {
            let departmentArray = [];
            results.forEach(({ department_name }) => {
              departmentArray.push(department_name);
            });
              return departmentArray;
          },
          message: "Choose a department",
        },
      ])
      .then((answer) => {
        let query = 
        "SELECT employee.first_Name, employee.last_Name, department.department_name, role.title, role.salary FROM employee LEFT JOIN role ON (employee.role.id = role.id) LEFT JOIN department ON (role.department_id = department.id) WHERE (department.department_name =?)";

        connection.query(query, [answer.department], (err, res) => {
          if (err) throw err;
          res.forEach(
            ({ first_Name, last_Name, department_name, title, salary }) => {
              console.table({
                first_Name,
                last_Name,
                department_name,
                title,
                salary,
              });

            }
          );
          start();
        });
      });
  })
}

const viewEmpByManager = () => {
  connection.query(
    "SELECT id, first_name, last_name, manager_id FROM employee",
    (err, results) => {
      if (err) throw err;
      inquirer
          .prompt([
            {
              name: "manager",
              type: "rawlist",
              choices() {
                const managerArray = [];
                results.forEach((e) => {
                  managerArray.push({
                    name: e.first_name + " " + e.last_name,
                    value: e.id,
                  });
                });
                return managerArray;
              },
              message: "Choose a Manager",
            },
          ])
          .then((answer) => {
            let manager = answer.manager;
            console.log(manager);
            let query =
              "SELECT first_Name, last_Name FROM employee WHERE manager_id = ?";

            connection.query(query, [answer.manager], (err, res) => {
              if (err) throw err;
              if (res.length != 0) {
                res.forEach(({ first_Name, last_Name }) => {
                  console.log(`Employee: ${first_Name} ${last_Name} `);
                });
              } else {
                console.table("Not a manager");
              }
              start();
            });
          });
      }
    );
  };

  
  const addRole = () => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "input",
            name: "newRole",
            message: "What is the name of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
          },
          {
            name: "department",
            type: "rawlist",
            choices() {
              let departmentArray = [];
              results.forEach(({ department_name, id }) => {
                departmentArray.push({ name: department_name, value: id });
              });
              return departmentArray;
            },
            message: "Choose a department",
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.newRole,
              salary: parseInt(answer.salary),
              department_id: answer.department,
            },
            (err) => {
              if (err) throw err;
              console.table("Role was added!");
              start();
            }
            );
          });
      });
    };

    const addDepartment = () => {
      inquirer
      .prompt([
        {
          type: "input",
          name: "newDept",
          message: "What department would you like to add?",
        },
      ])
        .then((answer) => {
          connection.query(
            "INSERT INTO department SET ?",
            {
              department_name: answer.newDepartment,
            },
            (err) => {
              if (err) throw err;
              console.log("Your department was added!");
              start();
            }
          );
        });
  
    };

    const addEmployee = () => {
      connection.query(
        "SELECT * FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (role.department_id = department.id)",
        (err, results) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
              },
              {
                name: "role",
                type: "rawlist",


   



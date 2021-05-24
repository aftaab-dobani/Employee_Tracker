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
  init();
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
        "View all departments",
        "View all roles",
        "Add an employee",
        "Remove an employee",
        "Update employee role",
        "Update employee department",
      ],
     
    },
    ])
      .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all employees by department": 
          viewAllEmpByDep();
          break;

          case "View all employees by manager": 
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


const viewAllRoles = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
};

 
const viewAllEmployees = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
};

 
const viewAllDepartments = () => { 
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
};

// ---------------- Add --------------------
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
              init();
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
              init();
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
                choices() {
                  const roleArray = [];
                  results.forEach(({ title, id }) => {
                    roleArray.push({ name: title, value: id });
                  });
                  return roleArray;
                },
                message: "What is the employee's role?",
              },
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
                message: "Whats the name of the employee's manager?",
              },
            ])
            .then((answer) => {
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.firstName,
                  last_name: answer.lastName,
                  role_id: answer.role,
                  manager_id: answer.manager,
                },
                (err) => {
                  if (err) throw err;
                  console.log("Your employee was added!");
                  init();
                }
              );
            });
        }
      );
    };

    const updateEmployeeRole = () => {
      connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        connection.query("SELECT * FROM role", (err, results2) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "employeeUpdate",
                type: "rawlist",
                choices() {
                  const employeeArray = [];
                  results.forEach((e) => {
                    employeeArray.push({
                      name: e.first_name + " " + e.last_name,
                      value: e.id,
                    });
                  });
                  return employeeArray;
                },
                message: "Which employee would you like to update?",
              },
              {
                name: "newRole",
                type: "rawlist",
                choices() {
                  const roleArray = [];
                  results2.forEach(({ title, id }) => {
                    roleArray.push({ name: title, value: id });
                  });
                  return roleArray;
                },
                message: "What is the employee's new role?",
              },
            ])
            .then((answer) => {
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    role_id: answer.newRole,
                  },
                  {
                    id: answer.employeeUpdate,
                  },
                ],
                (err, res) => {
                  if (err) throw err;
                  console.log(`${res.affectedRows} updated!`);
                  init();
                }
              );
            });
        });
      });
    };
  
  
  


   



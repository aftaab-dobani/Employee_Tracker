USE employees_db;

INSERT INTO department (id, department_name)
VALUES (1, "BEDDING"), (2, "Sneakers"), (3, "MENS"), (4, "WOMENS"); 

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "MANAGER", 100000, 3),
(2, "SALES MANAER", 90000, 2), 
(3, "SALES REP", 60000, 1); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id);
VALUES (1, "Jimmy", "Land", 3, 3),
(2, "Larry", "Bird", 2, )
(3, "Alex", "Lane", 3, 1), 

SELECT * FROM employee;
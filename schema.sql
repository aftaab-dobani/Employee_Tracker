DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INTEGER(11) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER(30) INT NOT NULL,
    PRIMARY KEY (id)
); 

CREATE TABLE employee(
    id INTEGER(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(11) INT NOT NULL,
    manager_id INTEGER(30) INT NOT NULL,
    PRIMARY KEY(id)
);
SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee; 


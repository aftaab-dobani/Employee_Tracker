DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INTEGER(11) NOT NULL,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER(11),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER(30)
); 

CREATE TABLE employee(
    id INTEGER(11),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(30) 
    PRIMARY KEY(id)
);


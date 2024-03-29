DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT,
   department VARCHAR(30) NULL,
   PRIMARY KEY(id)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL (10,2)  NULL,
    department_id INT(10) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30)  NULL,
    last_name VARCHAR(30) NULL,
    role_id INTEGER(10) NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCEs role(id) ON DELETE CASCADE,
    manager_id INTEGER(10) NULL,
    PRIMARY Key(id)
);
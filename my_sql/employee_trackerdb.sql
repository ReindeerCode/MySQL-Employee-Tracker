DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

CREATE TABLE role (
	id INT auto_increment Not NULL Primary Key,
	title VARCHAR(30) not NULL,
	salary decimal not NULL,
	department_id INT not NULL
);

CREATE TABLE employee (
  id INT auto_increment Not NULL Primary Key,
  first_name VARCHAR(30) not NULL,
  last_name VARCHAR(30) not NULL,
  role_id INT not NULL,
  manager_id INT
  );

SELECT * FROM department;
select * from role;
select * from employee;

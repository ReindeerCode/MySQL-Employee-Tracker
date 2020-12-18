use employee_trackerdb;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 10000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 85000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 65000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accoutant", 55000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 65000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 75000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Bartek", 3, 1 );
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mazin", "Abed", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Vlad", "Dimitrov", 5, 3 );
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Joe", "Han",4 , 4 );

select * from employee
inner join role on employee.role_id = role.id
inner join department on role.department_id = department.id;


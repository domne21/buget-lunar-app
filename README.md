#  Buget Lunar APP


A simple app helping to manage your monthly money.


## Content


**CRUD** operations:
    - **A**dd your money in the table
    - **R**ead transactions from DB
    - **U**pdate transactions in DB
    - **D**elete dates


## Setup

```
git clone https://github.com/domne21/buget-lunar-app.git
cd buget-lunar-app
npm install
```


## Running app

```
npm run devstart
```

open 

## MAC db setup - only once
CREATE DATABASE buget_lunar;
USE buget_lunar;
CREATE TABLE transactions(id INT AUTO_INCREMENT, date TEXT, categories TEXT, ammount TEXT, PRIMARY KEY (ID));
SHOW TABLES;
INSERT INTO transactions (date,categories,ammount) VALUES("28-02-2019","Rent","100");

##only once: 
1.   mysql.server start
2.  mysql -u root -p
3. grant all privileges on node.* to root@localhost;
4. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

## MAC run db:
Starting and connecting to mariaDb:
1. mysql.server stop
2. mysql.server start
3. mysql -u root
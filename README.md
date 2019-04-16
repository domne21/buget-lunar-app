#  Buget Lunar APP


A simple app helping to manage your monthly money.

## Live Preview

Open [buget app](https://domne21.github.io/buget-lunar-app/public/index.html)

## Content


**CRUD** operations:
    - **C**reate transactions for expenses
    - **R**ead transactions from DB
    - **U**pdate transactions in DB
    - **D**elete transations


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
# IOT - learnings

Backend for our iot application is a simple Node server. before runnig it make sure you have installed the following.

- Mysql
- Node and (npm)

# Database part

create a schema

```sh
CREATE SCHEMA `iot_learnings` ;
```

create a table

```sh
CREATE TABLE `iot_learnings`.`room_level` (
  `id` INT NOT NULL,
  `temperature` FLOAT NULL,
  `humidity` FLOAT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`));

```

# Server part

go inside the backend folder and do following commands

```sh
cd /backend
npm install
```

after completing success full node module installation. run

```sh
node server.js
```

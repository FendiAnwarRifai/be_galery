<h1 align="center">Galery Photos - Backend</h1>


Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express-4.17.1-brightgreen)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node%20Js-14.15.4-orange)](https://nodejs.org/)
[![Sequelize ORM](https://img.shields.io/badge/Sequelize-6.0.0-red)](https://sequelize.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://www.getpostman.com/">Postman</a>
3. [Xampp](https://www.apachefriends.org/download.html)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type 
```npm install```
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Apache and MYSQL Server using xampp, etc.
5. Create a database with the name **galery** then  set config file [here](#set-config) in directory src/config/config.json
6. migration table with sequelize [here](#table-migratiton)
8. run seeder with sequelize [here](#seeder)
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.
10. You can see all the end point [here](#api-request-example)


### set config
```
src/config/config.json
    
"username": "your username",
"password": "your password",
"database": "name databases",
"host": "127.0.0.1",
"dialect": "mysql"

```

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_PORT=5000
BASE_URL=http://localhost:5000

```
### table migratiton
```
before doing the migration, please create a database in your local
Open app's directory in CMD or Terminal

cd src
Sequelize db:migrate

```
### seeder
```
Open app's directory in CMD or Terminal

cd src
sequelize db:seed:all

```

### fix problem Sequelize cannot run
```
Open app's directory in CMD or Terminal

cd src
npm install --save sequelize
npm install --save-dev sequelize-cli
```


### Compiles and hot-reloads for development
```
npm run dev
```

## API Request Example 
[View Documentaion](https://documenter.getpostman.com/view/13525105/TzXumKGi)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/126aa7c3569576df78f6?action=collection%2Fimport)

## Related Project

- [Galery Frontend](https://github.com/FendiAnwarRifai/fe_galery)

<!-- CONTACT -->
## Contact

- Email - fendianwar36@gmail.com
- LinkedIn - [Fendi Anwar Rifa'i](https://www.linkedin.com/in/fendi-anwar-rifai/)
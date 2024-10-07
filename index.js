//index.js
const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to database
const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: "19514",
  });

//refactor: Update data insertion logic to use parameterized query with static values

let q= "INSERT INTO user (id,username,email,password) VALUE (?,?,?,?)";


let user =["123","123_newuser","abc@gmail.com","abc"];



try{
connection.query(q,user,(err,results) =>{
    if(err) throw err;
    console.log(results);
});
}
catch(err){
    console.log(err);
}


connection.end();

let getRandomUser= ()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
};




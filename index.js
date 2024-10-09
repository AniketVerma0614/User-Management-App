// index.js

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");

//EJS TEMPALTE
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));





// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '19514',
});

// Updated query to handle multiple rows of data
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// Function to generate random user data in array format
let getRandomUser = () => {
  return [
    faker.string.uuid(),              // Generate a unique ID
    faker.internet.userName(),        // Generate a random username
    faker.internet.email(),           // Generate a random email
    faker.internet.password(),         // Generate a random password
  ];
};


// try {
//   connection.query(q, [data], (err, results) => {
//     if (err) throw err;
//     console.log('Data inserted successfully:', results);
//   });
// } catch (err) {
//   console.log('Error inserting data:', err);
// }

// // Close the database connection
// connection.end();


//Now Creating a home-route
app.get("/",(req,res)=>{
    let q=`SELECT count(*) FROM user`;
    try {
  connection.query(q,(err, results) => {
    if (err) throw err;
    let count=results[0]["count(*)"];
    res.render("home.ejs",{count});
  });
} catch (err) {
  console.log(err);
  res.send("some error in the DB");
}

});




//Here I'm going to initiate the Server !!!
app.listen("8080",()=>{
    console.log("Server is Listening to port 8080");
});
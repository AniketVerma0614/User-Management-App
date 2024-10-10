// index.js

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

//EJS TEMPALTE
app.use(methodOverride("_method"));
//So, we are patch request and we are sending the form data ==> SO, we need to PARSE it anyways !!!
app.use(express.urlencoded({extended: true})); //So, that we can parse our forms data !!!
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





//Now Creating a home-route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in the DB");
  }

});

//Show Route
app.get("/user",(req,res)=>{
  let q=`SELECT * FROM user`;
  try {
    connection.query(q, (err,users) => {
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("showusers.ejs",{users});
    });
  } catch (err) {
    console.log(err);
    res.send("some error in the DB");
  }
});


//Edit Route
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q=`SELECT * FROM user WHERE id='${id}'`;

    try
    {
      connection.query(q,(err,result) =>{
          if(err) throw err;
          let user = result[0];
          console.log(result);
          res.render("edit.ejs",{user});
      });
    } 
    catch(err) 
    {
      console.log(err);
      res.send("Some Error in the DB !!!");
    }
});

//Update(DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = ?`;

  try {
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (!formPass) {
        return res.send("Password field cannot be empty.");
      }

      if (formPass !== user.password) {
        return res.send("WRONG password");
      } else {
        let q2 = `UPDATE user SET username = ? WHERE id = ?`;
        connection.query(q2, [newUsername, id], (err, updateResult) => {
          if (err) throw err;
          res.redirect("/user"); // Redirect to the list of users after a successful update
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error in the DB !!!");
  }
});



//Here I'm going to initiate the Server !!!
app.listen("8080",()=>{
    console.log("Server is Listening to port 8080");
});

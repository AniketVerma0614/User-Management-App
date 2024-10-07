// index.js

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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

let data = [];
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser()); // Generate 100 fake users
}

try {
  connection.query(q, [data], (err, results) => {
    if (err) throw err;
    console.log('Data inserted successfully:', results);
  });
} catch (err) {
  console.log('Error inserting data:', err);
}

// Close the database connection
connection.end();


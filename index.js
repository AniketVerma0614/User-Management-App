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

// Array of multiple user data sets
let users = [
  ["901", "8989_newusers", "mn@gmail.com", "abc"],
  ["671", "7878_newusers", "eg@gmail.com", "abc"]
];

try {
  connection.query(q, [users], (err, results) => {
    if (err) throw err;
    console.log('Data inserted successfully:', results);
  });
} catch (err) {
  console.log('Error inserting data:', err);
}

// Close the database connection
connection.end();

// Function to generate random user data in array format
let getRandomUser = () => {
  return{
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

/*
PS C:\Users\HP\OneDrive\Desktop\DELTA4\SQLCLASS> node index.js
Data inserted successfully: ResultSetHeader {
  fieldCount: 0,
  affectedRows: 2,
  insertId: 0,
  info: 'Records: 2  Duplicates: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}
*/



/*
mysql> SELECT * from user;
+-----+---------------+---------------+----------+
| id  | username      | email         | password |
+-----+---------------+---------------+----------+
| 123 | 123_newuser   | abc@gmail.com | abc      |
| 671 | 7878_newusers | eg@gmail.com  | abc      |
| 677 | 56_newusers   | efg@gmail.com | abc      |
| 900 | 99_newusers   | mon@gmail.com | abc      |
| 901 | 8989_newusers | mn@gmail.com  | abc      |
+-----+---------------+---------------+----------+
5 rows in set (0.00 sec)

mysql>
*/
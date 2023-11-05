const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'fannie'
});

module.exports = db;

//const db = require('./db');
//const db = require('./db'); // Import the database connection

function insertUser(monthly_car_payment, student_loan_payment) {
  const sql = 'INSERT INTO userinfo (name, email) VALUES (?, ?)';
  const values = [monthly_car_payment, student_loan_payment];

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Usage
insertUser('John Doe', 'john@example.com')
  .then((results) => {
    console.log('User added:', results);
  })
  .catch((err) => {
    console.error('Error adding user:', err);
  });

function getUsers() {
  const sql = 'SELECT * FROM userinfo';

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Usage
getUsers()
  .then((results) => {
    console.log('Users:', results);
  })
  .catch((err) => {
    console.error('Error fetching users:', err);
  });


// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');
// });

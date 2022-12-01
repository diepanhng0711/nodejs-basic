// get the client
// const mysql = require('mysql2');
import mysql from "mysql2/promise"

console.log('Creating connection pool...')

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: '8111',
  database: 'nodejsbasic'
})



export default connection


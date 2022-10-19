import mysql from "mysql"
import * as dotenv from 'dotenv'

dotenv.config()

// export const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER_NAME,
//     password: process.env.DB_PASSWORD,
//     database: "blog",
// })
export const db = mysql.createConnection({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "Abdolrahman661",
    database: "blog",
})
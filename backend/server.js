// const express = require("express")
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json())

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'root',
//     database : '_get'
// }
// )

// app.post('/signup',(req,res) =>{
//     const sql = "INSERT INTO user ('fullame','rollno','email','password') VALUES (?,?,?,?)";
//     const values = [
//         req.body.fullname,
//         req.body.rollno,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql,[values],(err, data) =>{
//         if(err){return res.json("Error ello")}
//         return res.json(data);

//     })
// })
// app.listen(3307,()=>{
//     console.log("hi");

// })
const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
    origin : ["http://localhost:3000"],
    methods :["POST","GET"],
    credentials : true
}
  
));
app.use(express.json());
app.use(cookieParser());

// Create a connection pool instead of a single connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '_get',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check if the connection pool successfully created
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    connection.release(); // release the connection
});

// Endpoint to handle user registration
// app.post('/signup', (req, res) => {
//     const { fullname, rollno, email, password } = req.body;
//     const sql = "INSERT INTO user (fullname, rollno, email, password) VALUES (?, ?, ?, ?)";
//     db.execute(sql, [fullname, rollno, email, password], (err, result) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             return res.json({ error: "Error", details: err });
//         }
//         return res.json({ message: "User registered successfully", result });
//     });
// });
const saltRounds = 10;

app.post('/signup', (req, res) => {
    const { fullname, rollno, email, password } = req.body;

    // Input validation and sanitization should be added here

    if (!fullname || !rollno || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
        if (err) {
            console.error('Error while hashing password:', err);
            return res.status(500).json({ error: "Error while hashing password" });
        }

        const sql = "INSERT INTO user (fullname, rollno, email, password) VALUES (?, ?, ?, ?)";
        const values = [fullname, rollno, email, hash];

        db.execute(sql, values, (err, result) => { // Corrected parameters
            if (err) {
                console.error('Error during database query:', err);
                return res.status(500).json({ error: "Error during database query", details: err });
            }
            return res.status(201).json({ message: "User registered successfully", result });
        });
    });
});


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM user WHERE email =? AND password = ?";
//     db.execute(sql, [email, password], (err, result) => {
//         if (err) {
//             console.error('Error during database query:', err);
//             return res.json({ error: "Error", details: err });
//         }
//         // 
//         if(data.length>0){
//             return res.json("success");
//         }
//         else return res.json("Failure")
//     });
// });
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Input validation and sanitization should be added here

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM user WHERE email = ?";

    db.execute(sql, [email], (err, results) => {
        if (err) {
            console.error('Error during database query:', err);
            return res.status(500).json({ error: "Database query error", details: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];
        bcrypt.compare(password.toString(), user.password, (err, response) => {
            if (err) {
                console.error('Error while comparing passwords:', err);
                return res.status(500).json({ error: "Error while comparing passwords" });
            }

            if (response) {
                const rollno = user.rollno;
                const token = jwt.sign({rollno},"GET",{expiresIn : '1d'});
                res.cookie('token',token);

                return res.status(200).json({ status: "Success" });
            } else {
                return res.status(401).json({ error: "Invalid email or password" });
            }
        });
    });
});
const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Corrected to use `req.cookies`
    if (!token) {
        return res.status(401).json({ Error: "You are not authenticated" });
    } else {
        jwt.verify(token, "GET", (err, decoded) => {
            if (err) {
                return res.status(403).json({ Error: "Token is not valid" });
            } else {
                req.rollno = decoded.rollno;
                next();
            }
        });
    }
};

app.get('/check-auth', verifyUser, (req, res) => {
    return res.json({ status: "Success", rollno: req.rollno });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: "Success" });
});


app.post('/api/check-ticket', verifyUser, (req, res) => {
    const { eventName } = req.body;
    const rollno = req.rollno;

    const sql = `SELECT * FROM ${mysql.escapeId(eventName)} WHERE rollno = ?`;

    db.execute(sql, [rollno], (err, results) => {
        if (err) {
            console.error('Error during database query:', err);
            return res.status(500).json({ error: "Database query error", details: err });
        }

        if (results.length > 0) {
            return res.status(200).json({ hasTicket: true });
        } else {
            return res.status(200).json({ hasTicket: false });
        }
    });
});

// app.listen(3307, () => {
//     console.log("Server is running on port 3307");
// });


// Start the server
app.listen(3307, () => {
    console.log("Server is running on port 3307");
});


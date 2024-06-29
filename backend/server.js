const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { Cashfree } = require("cashfree-pg");
require('dotenv').config();

const app = express();
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["POST", "GET"],
//     credentials: true
// }));


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || '_get',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    connection.release();
});

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256').update(uniqueId).digest('hex');
    return hash.substr(0, 12);
}

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ error: "You are not authenticated" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET || "GET", (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: "Token is not valid" });
//         }
//         req.user = decoded;
//         next();
//     });
// };
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "You are not authenticated" });
    }
    jwt.verify(token, process.env.JWT_SECRET || "GET", (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        req.user = decoded;
        next();
    });
};


app.get('/payment', verifyUser, async (req, res) => {
    try {
        const orderId = generateOrderId();
        const { rollno } = req.user;
        
        const userQuery = "SELECT fullname, email FROM user WHERE rollno = ?";
        const [rows] = await db.promise().query(userQuery, [rollno]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];

        const request = {
            order_amount: 1.00,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: rollno,
                customer_phone: "9392582990",  // Adjust to use actual user phone number
                customer_name: user.fullname,
                customer_email: user.email
            }
        };
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({ error: "Failed to create payment order" });
    }
});

app.post('/verify', verifyUser, async (req, res) => {
    try {
        let {orderId, eventName} = req.body;
            const {rollno} = req.user
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response)=>{
            console.log(response.data)
            const insertQuery = `INSERT INTO ${mysql.escapeId(eventName)} (rollno) VALUES (?)`;
            db.execute(insertQuery, [rollno], (err, result) => {
                if (err) {
                    console.error('Error inserting user into event table:', err);
                    return res.status(500).json({ error: "Failed to insert user into event table" });
                }
                console.log(result.insertId)
                console.log('User added to event table');
                res.json({ status: "Payment verified and user added to event" });
            });
            res.json(response.data);
        }).catch((error)=>{
            console.log(error)
        })
       
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
});
// app.post('/verify', verifyUser, async (req, res) => {
//     try {
//        let{ orderId, eventName } = req.body; // Extract eventName from request body
//         const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId).
        
//         if (response.data.payment_status === 'SUCCESS') {
            

//             // Insert the user into the event table upon successful payment
//             const insertQuery = `INSERT INTO ${mysql.escapeId(eventName)} (rollno) VALUES (?)`;
//             db.execute(insertQuery, [rollno], (err, result) => {
//                 if (err) {
//                     console.error('Error inserting user into event table:', err);
//                     return res.status(500).json({ error: "Failed to insert user into event table" });
//                 }
//                 console.log('User added to event table');
//                 res.json({ status: "Payment verified and user added to event" });
//             });
//         } else {
//             res.status(400).json({ error: "Payment verification failed or payment not successful" });
//         }
//     } catch (error) {
//         console.error('Error verifying payment:', error);
//         res.status(500).json({ error: "Failed to verify payment" });
//     }
// });



app.post('/signup', async (req, res) => {
    const { fullname, rollno, email, password } = req.body;
    if (!fullname || !rollno || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hash = await bcrypt.hash(password.toString(), 10);
        const sql = "INSERT INTO user (fullname, rollno, email, password) VALUES (?, ?, ?, ?)";
        const values = [fullname, rollno, email, hash];
        db.execute(sql, values, (err, result) => {
            if (err) {
                console.error('Error during database query:', err);
                return res.status(500).json({ error: "Error during database query", details: err });
            }
            return res.status(201).json({ message: "User registered successfully", result });
        });
    } catch (err) {
        console.error('Error while hashing password:', err);
        return res.status(500).json({ error: "Error while hashing password" });
    }
});

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     try {
//         const sql = "SELECT * FROM user WHERE email = ?";
//         db.execute(sql, [email], async (err, results) => {
//             if (err) {
//                 console.error('Error during database query:', err);
//                 return res.status(500).json({ error: "Database query error", details: err });
//             }
//             if (results.length === 0) {
//                 return res.status(401).json({ error: "Invalid email or password" });
//             }

//             const user = results[0];
//             const match = await bcrypt.compare(password.toString(), user.password);
//             if (match) {
//                 const token = jwt.sign({ rollno: user.rollno }, process.env.JWT_SECRET || "GET", { expiresIn: '1d' });
//                 res.cookie('token', token);
//                 return res.status(200).json({ status: "Success" });
//             } else {
//                 return res.status(401).json({ error: "Invalid email or password" });
//             }
//         });
//     } catch (err) {
//         console.error('Error during login process:', err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const sql = "SELECT * FROM user WHERE email = ?";
        db.execute(sql, [email], async (err, results) => {
            if (err) {
                console.error('Error during database query:', err);
                return res.status(500).json({ error: "Database query error", details: err });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = results[0];
            const match = await bcrypt.compare(password.toString(), user.password);
            if (match) {
                const token = jwt.sign({ rollno: user.rollno }, process.env.JWT_SECRET || "GET", { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
                return res.status(200).json({ status: "Success" });
            } else {
                return res.status(401).json({ error: "Invalid email or password" });
            }
        });
    } catch (err) {
        console.error('Error during login process:', err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/check-auth', verifyUser, (req, res) => {
    return res.json({ status: "Success", rollno: req.user.rollno });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: "Success" });
});

app.post('/api/check-ticket', verifyUser, (req, res) => {
    const { eventName } = req.body;
    const rollno = req.user.rollno;

    const sql = `SELECT * FROM ${mysql.escapeId(eventName)} WHERE rollno = ?`;
    db.execute(sql, [rollno], (err, results) => {
        if (err) {
            console.error('Error during database query:', err);
            return res.status(500).json({ error: "Database query error", details: err });
        }
        return res.status(200).json({ hasTicket: results.length > 0 });
    });
});

const port = process.env.PORT || 3307;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

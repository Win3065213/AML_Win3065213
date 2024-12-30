const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const db = require("./database");
// console.log('DB instance in server:', db);

// const mysql = require('mysql2');
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'CRUDDB'
// });

const { jsonParseErrorHandler, generalErrorHandler } = require('./middlewares/errorHandlers');

const userRoutes = require('./Routes/user_route');
const authRoutes = require('./Routes/auth_router');
const adminRoutes = require('./Routes/admin_router');
const memberRoutes = require('./Routes/member_router');
const mediaRoutes = require('./Routes/media_router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonParseErrorHandler);

// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         return res.status(400).json({
//             error: 'Invalid JSON provided',
//             message: err.message,
//         });
//     }
//     next(err); // Pass other errors to the default handler
// });

app.use('/api_n_tier', userRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/member', memberRoutes)
app.use('/media', mediaRoutes)


app.get('/api/read', async (req, res) => {
    const sqlRead = "SELECT * FROM users";
    // db.query(sqlRead, (err, result) => {
    //     res.send(result);
    // });
    try {
        const [rows] = await db.query(sqlRead);
        res.json(rows);
    } catch (err){
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    }
});

app.post('/api/create', async (req, res) => {
    const createEmail = req.body.email;
    const createPWD = req.body.password;

    const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
    // db.query(sqlCreate, [createEmail, createPWD], (err, result) => {
    //     console.log(result);
    // });
    try {
        const [result] = await db.query(sqlCreate,[createEmail, createPWD]);
        console.log(result);
    } catch (err){
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    }
});

app.get('/', (req,res) => {
    // const sqlInsert = "INSERT INTO users (email, password) VALUES ('manual','asd123');"
    // db.query(sqlInsert, (err, result) => {
    //     res.send("Default Inserted.")
    // })
});

app.use(generalErrorHandler);

app.listen(port, () => {
    console.log(`running on port ${port}`)
});
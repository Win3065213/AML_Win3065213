const pool = require("../database");

// // if you want to reuse sql (example userID)
// // const getAllUsers = async ("put input value to use in query") => {
// const currentUser = async (id) => {
//     return pool
//       .execute("SELECT * FROM users WHERE uid = ?", [id])
//       .then(([rows]) => {
//         if (rows.length === 1) {
//           return rows[0];
//         } else {
//           return null;
//         }
//       });
// };


// exports.getUser = (req, res) => {
//     // const sqlRead = "SELECT * FROM users";
//     pool.query(sqlRead, (err, result) => {
//         res.send(result);
//     });
// }

exports.getAllUsers = async () => {
    const sqlRead = "SELECT * FROM users";
    // test with execute
    const [rows] = await pool.query(sqlRead)
    return rows
}

// exports.createUser = (req, res) => {
//     const createEmail = req.body.email;
//     const createPWD = req.body.password;

//     const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
//     user.query(sqlCreate, [createEmail, createPWD], (err, result) => {
//         console.log(result);
//     });
// }

exports.createUser = async (email, password) => {
    const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
    // test with execute
    const [result] = await pool.query(sqlCreate, [email, password])
    return result
}

exports.removeUser = async (id) => {
    const sqlDelete = "DELETE FROM users WHERE uid = ?";
    const [result] = await pool.query(sqlDelete, [id])
    return result.affectedRows > 0
}
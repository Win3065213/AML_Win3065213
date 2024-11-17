// const pool = require("../database");

// const posts = [
//     {
//         username: "User 1",
//         password: "asd123"
//     },
//     {
//         username: "User 2",
//         password: "qwerty"
//     }
// ]
const bcrypt = require('bcryptjs')

const users = []

exports.getAllPosts = async() => {
    return users;
}

exports.findUser = async (email) => {
    const user = users.find(user => user.email == email);
    return user;
}

exports.registerUser = async (email, password) => {
    try
    {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = { email , password: hashedPassword}
        users.push(user);
        return users;
    }
    catch (error) {
        throw error
    }
}

exports.checkPassword = async (user, password) => {
    const result = await bcrypt.compare(password, user.password);
    return result
}



// exports.getAllUsers = async () => {
//     const sqlRead = "SELECT * FROM users";
//     const [rows] = await pool.query(sqlRead)
//     return rows
// }

// exports.createUser = async (email, password) => {
//     const sqlCreate = "INSERT INTO users (email, password) VALUES (?,?)";
//     const [result] = await pool.query(sqlCreate, [email, password])
//     return result
// }
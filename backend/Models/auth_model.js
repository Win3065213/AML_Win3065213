const pool = require("../database");

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
    // const user = users.find(user => user.email == email);
    // return user;
    const sqlFind = "SELECT * FROM account WHERE email = ?";
    const [users] = await pool.execute(sqlFind, [email]);

    if (users.length === 1) {
        return users[0];
    } else {
        return null;
    }
}
exports.findRole = async (role, isID = false) => {
    
    const sqlFind = isID ? "SELECT * FROM role WHERE roleID = ?" : "SELECT * FROM role WHERE roleName = ?";
    const [roles] = await pool.execute(sqlFind, [role]);

    if (roles.length === 1) {
        return roles[0];
    } else {
        return null;
    }
}

exports.registerUser = async (email, password) => {
    try
    {
        const hashedPassword = await bcrypt.hash(password,10);
        // const user = { email , password: hashedPassword};
        // users.push(user);
        // return users;

        const sqlRegister = "INSERT INTO account (email, password, roleID) VALUES (?,?,?)";
        const memberRole = await this.findRole("member");
        // console.log(memberRole);
        const [result] = await pool.execute(sqlRegister, [email, hashedPassword, memberRole.roleID]);
        return result;
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
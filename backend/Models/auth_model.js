const pool = require("../database");
const bcrypt = require('bcryptjs');

exports.findUser = async (email) => {
    // const user = users.find(user => user.email == email);
    // return user;
    try {
        const sqlFind = "SELECT * FROM account WHERE email = ?";
        const [users] = await pool.execute(sqlFind, [email]);

        if (users.length === 1) {
            return users[0];
        } else {
            return null;
        }
    } catch (error) {
        // console.error("Error in finding user.");
        throw error;
    }
}

exports.findRole = async (role, isID = false) => {
    try{
        const sqlFind = isID ? "SELECT * FROM roles WHERE roleID = ?" : "SELECT * FROM roles WHERE roleName = ?";
        const [roles] = await pool.execute(sqlFind, [role]);

        if (roles.length === 1) {
            return roles[0];
        } else {
            return null;
        }
    } catch (error) {
        // console.error("Error in finding role.");
        throw error;
    }
}

exports.registerUser = async (email, password) => {
    try
    {
        const hashedPassword = await bcrypt.hash(password,10);

        const sqlRegister = "INSERT INTO account (email, password, roleID) VALUES (?,?,?)";
        const memberRole = await this.findRole("member");
        // console.log(memberRole);
        const [result] =await pool.execute(sqlRegister, [email, hashedPassword, memberRole.roleID]);
        return result.affectedRows > 0;
    }
    catch (error) {
        // console.error("Error in user registration.");
        throw error
    }
}

exports.checkPassword = async (user, password) => {
    try {
        const result = await bcrypt.compare(password, user.password);
        return result;
    }
    catch (error) {
        // console.error("Error in checking password.");
        throw error
    }
}
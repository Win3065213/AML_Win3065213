const pool = require("../database");

exports.findSysAdmin = async (email) => {
    const sqlFind = "SELECT * FROM account WHERE email = ?";
    const [users] = await pool.execute(sqlFind, [email]);

    if (users.length === 1) {
        return users[0];
    } else {
        return null;
    }
}
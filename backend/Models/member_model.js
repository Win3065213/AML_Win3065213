const pool = require("../database");

exports.findMember = async (email) => {
    const sqlFind = `SELECT 
                        acc.accountID,
                        acc.email,
                        roles.roleName
                        FROM account acc
                        JOIN roles ON acc.roleID = roles.roleID
                        WHERE email = ?`;
    const [users] = await pool.execute(sqlFind, [email]);

    if (users.length === 1) {
        return users[0];
    } else {
        return null;
    }
}
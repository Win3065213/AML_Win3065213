const pool = require("../database");

exports.findSysAdmin = async (email) => {
    const sqlFind = `SELECT 
            acc.email,
            roles.roleName,
            staff.contractType,
            staff.employmentType,
            DATE(staff.hireDate) as hireDate
            FROM account acc
            JOIN roles ON acc.roleID = roles.roleID
            JOIN staff ON acc.accountID = staff.accountID
            WHERE email = ?`;
    const [users] = await pool.execute(sqlFind, [email]);

    if (users.length === 1) {
        return users[0];
    } else {
        return null;
    }
}
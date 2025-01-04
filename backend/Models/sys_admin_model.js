const pool = require("../database");

exports.findSysAdmin = async (email) => {
    const sqlFind = `SELECT 
            acc.email,
            roles.roleName,
            con.contractType,
            emp.employmentType,
            staff.hireDate
            FROM account acc
            JOIN roles ON acc.roleID = roles.roleID
            JOIN staff ON acc.accountID = staff.accountID
            JOIN con_types con ON staff.contractID = con.contractID
            JOIN emp_types emp ON staff.empTypeID = emp.empTypeID
            WHERE email = ?`;
    const [users] = await pool.execute(sqlFind, [email]);

    if (users.length === 1) {
        return users[0];
    } else {
        return null;
    }
}
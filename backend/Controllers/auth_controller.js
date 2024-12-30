const authModel = require("../Models/auth_model");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s'});
}

// exports.getPosts = async (req, res, next) => {
//     try {
//         const posts = await authModel.getAllPosts();
//         res.json(posts);
//     } catch (error) {
//         // console.error(error)
//         // res.status(500).json({ error: 'Internal Server Error' })
//         next(error)
//     }
// }

//only for testing middleware
exports.getAccess = async (req, res, next) => {
    try {
        const userInfo = await authModel.findUser(req.user.email);
        // see userInfo if success
        res.json(userInfo);
    } catch (error) {
        // console.error(error)
        // res.status(500).json({ error: 'Internal Server Error' })
        next(error)
    }
}

//only for testing middleware
exports.getToken = async (req, res, next) => {
    try {
        const accessToken = req.body.token;
        // see userInfo if success
        res.json(accessToken);
    } catch (error) {
        // console.error(error)
        // res.status(500).json({ error: 'Internal Server Error' })
        next(error)
    }
}

//completed all testing success
exports.register = async (req, res, next) => {
    try {
        // const posts = { username: req.body.name, password: req.body.password};
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('All fields required');
        }

        const user = await authModel.findUser(email);
        if (user) {
            return res.status(400).send('User already registered');
        }

        const register = await authModel.registerUser(email, password);
        // console.log("return register function:",register);
        if(register) {
            res.status(201).send("Successfully Registered");
            // console.log(register);
        } else {
            throw error;
        };
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(email,password);
    try {
        if (!email || !password) {
            return res.status(400).send('All fields required');
        }

        // find user
        const user = await authModel.findUser(email);
        if (!user) {
            return res.status(400).send('User not found.');
        }

        // validate or check password
        const validation = await authModel.checkPassword(user, password);
        if (!validation) {
            return res.status(401).send('Email and password mismatch.');
        }

        // validation success
        // console.log(user);
        const role = await authModel.findRole(user.roleID, true);
        const accessToken = generateAccessToken({id: user.accountID, email: user.email, role: role.roleName})
        // const refreshToken = jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET)
        const successfulRes = {
            user: {
                id: user.accountID,
                email: user.email,
                role: role.roleName
            },
            token: accessToken,
        };
        // console.log(user);
        console.log(successfulRes);
        res.status(200).json(successfulRes);
        // res.status(200).json({ accessToken });

    } catch (error) {
        next(error)
    }
}
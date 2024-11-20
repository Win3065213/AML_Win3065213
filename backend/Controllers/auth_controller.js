const authModel = require("../Models/auth_model");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s'});
}

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await authModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        // console.error(error)
        // res.status(500).json({ error: 'Internal Server Error' })
        next(error)
    }
}

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

exports.getToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.token;
        // see userInfo if success
        res.json(refreshToken);
    } catch (error) {
        // console.error(error)
        // res.status(500).json({ error: 'Internal Server Error' })
        next(error)
    }
}

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
        if(register) {
            res.status(201).send("Successfully Registered");
            // console.log(register);
        };
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // find user
        const user = await authModel.findUser(email);
        if (!user) {
            return res.status(400).send('Cannot find user');
        }

        // validate or check password
        const validation = await authModel.checkPassword(user, password);
        if (!validation) {
            return res.status(401).send('Email and password mismatch');
        }

        // validation success
        // console.log(user);
        const accessToken = generateAccessToken({email: user.email})
        // const refreshToken = jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        next(error)
    }
}
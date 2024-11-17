const authModel = require("../Models/auth_model");

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
        const user = await authModel.findUser(email);
        if (!user) {
            return res.status(400).send('Cannot find user');
        }
        const validation = await authModel.checkPassword(user, password);
        if (!validation) {
            return res.status(401).send('Email and password mismatch');
        }
        res.status(200).send('Success');
    } catch (error) {
        next(error)
    }
}
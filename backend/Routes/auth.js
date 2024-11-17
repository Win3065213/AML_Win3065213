const express = require("express");
const router = express.Router();
const authController = require('../Controllers/auth_controller');

router.get("/posts", authController.getPosts);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

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

// app.get('/posts', (req, res) => {
//     res.json(posts);
// })
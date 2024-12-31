const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const db = require("./database");


const { jsonParseErrorHandler, generalErrorHandler } = require('./middlewares/errorHandlers');


const userRoutes = require('./Routes/user_route');
const authRoutes = require('./Routes/auth_router');
const sysAdminRoutes = require('./Routes/sys_admin_router');
const memberRoutes = require('./Routes/member_router');
const mediaRoutes = require('./Routes/media_router');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonParseErrorHandler);


app.use('/api_n_tier', userRoutes)
app.use('/auth', authRoutes)
app.use('/sys_admin', sysAdminRoutes)
app.use('/member', memberRoutes)
app.use('/media', mediaRoutes)


app.use(generalErrorHandler);


app.listen(port, () => {
    console.log(`running on port ${port}`)
});
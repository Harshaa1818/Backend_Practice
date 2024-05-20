import express from 'express';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
    
)
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.static('public'));

//importing routes

import {userouter} from "./Routes/user.routes.js"
import {adminrouter} from "./Routes/admin.routes.js"

//using routes
app.use('/api/v1/user',userouter)
app.use('/api/v1/admin',adminrouter)




export {app}
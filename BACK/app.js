import express from 'express';
let app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './database.js';
import user from './routes/user.js';
import post from './routes/post.js';
import auth from './routes/auth.js';
dotenv.config({path:'./.env'})
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/auth', auth);
db();
app.get('/', function (req, res) {
    res.send('Server is running...');
})
 export default app;
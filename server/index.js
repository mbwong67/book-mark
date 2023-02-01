import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js'


const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

dotenv.config();
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/bookmarks', bookmarkRoutes);
app.use("/user", userRoutes);

// serve Static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
} else {
    app.get('*', (req, res) => res.send('Please set to Production mode'));
}

const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log("Backend server is running")
});
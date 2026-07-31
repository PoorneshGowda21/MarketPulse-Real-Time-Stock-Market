import mongoose from 'mongoose';
import debug from 'debug';
import cors from 'cors';
import models from './models/index.js';
import routes from './routes/index.js'
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv' 
dotenv.config()

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, '../../Frontend/build');

import { rateLimiter } from './middleware/rateLimiter.js';

//Initialise our app by creating express object
const app = express();
// To parse JSON we use express.json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 120 }));

import fs from 'fs';

// Initialise the API routes first
routes(app);

// Enable static serving ONLY if build index.html exists
const buildIndexPath = path.join(frontendBuildPath, 'index.html');
if (fs.existsSync(buildIndexPath)) {
    app.use(express.static(frontendBuildPath));
}

// Fallback route for non-API requests
app.get('*', (req, res) => {
    if (fs.existsSync(buildIndexPath)) {
        res.sendFile(buildIndexPath);
    } else {
        res.redirect('http://localhost:3000');
    }
});
// Establish the connection with DB
async function database() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch(error) {
        console.error("Database connection failed:", error.message);
    }
}

database();

// const uri = "mongodb+srv://JAMS:NEUWebDesignJAMS@stock.7r94bfe.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://JAMS:<password>@stock.7r94bfe.mongodb.net/?retryWrites=true&w=majority
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // // client.connect(err => {
// // //     const collection = client.db("cluster0").collection("users");
// // //     // perform actions on the collection object
// // //     // client.close();
// // //   });
// client.connect();
// await listDatabases(client);

// mongoose.connect('mongodb+srv://JAMS:WebDesignJAMS@cluster0.cmrmfun.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongoose.connect('mongodb://localhost:27017/projecttestdb');
export default app;
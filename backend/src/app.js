import express from "express";

import {createServer} from "node:http";

//import {Server} from "socket.io";

import mongoose from "mongoose";

import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/user.routes.js";


const app = express ();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.port || 8000))
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));
app.use("/api/v1/users", userRoutes);


/*app.get("/home", (req, res) => {
    return res.json({ "Hello": "World" });
});
*/

const start = async () =>{
    app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://viralmehta272001:viral272001mehta@cluster0.jeluj.mongodb.net/")

    console.log(`MONGO Connected DB Host: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () =>{
        console.log("LISTENIN ON PORT 8000")
    });

}

start();
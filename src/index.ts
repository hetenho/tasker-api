import "reflect-metadata";
import { createConnection } from "typeorm";
import { Account } from "./entity/Account";
import * as express from "express";
import * as cors from "cors";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Request, Response } from "express";
import { register, checkLogin, auth } from "./components/auth";
const accounts = require('./components/accounts');
const boards = require("./components/boards");
const tasks = require("./components/tasks");
const jwt = require("jsonwebtoken");

createConnection().then(async connection => {
    const repo = connection.getRepository(Account);

    // create and setup express app
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.post("/auth/register", (req, res) => register(req.body.username, req.body.password, res));
    app.post("/auth/login", (req, res) => checkLogin(req.body.username, req.body.password, res));

    // Auth middleware
    app.use(auth);

    // register routes
    app.use("/accounts", accounts);
    app.use("/boards", boards);
    app.use("/tasks", tasks);

    // start express server
    app.listen(process.env.PORT);  
    
}).catch(error => console.log(error));
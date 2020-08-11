const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../user/user-router");
const authRouter = require("../authorization/auth-router");
const restricted = require("../authorization/restricted-middleware.js");


const server = express();

server.use(helmet());
server.use(express.json())
server.use(cors());

server.use("/api/user", restricted, userRouter)

server.use("/api/auth", authRouter)


server.get("/", (req, res) => {
    res.json({ api: "up" })
})

module.exports = server;
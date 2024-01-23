import express from "express";
import dotenv from "dotenv"
import { appRouter } from "./src/utils/app.router.js";
import {connectDB} from "./DB/connection.js"

dotenv.config()

connectDB()
const port = process.env.PORT || 3000
const app = express()
appRouter(app,express)


app.listen(port,()=>{
    console.log("listening on port " + port)
})
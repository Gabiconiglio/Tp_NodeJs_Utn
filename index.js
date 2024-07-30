const express=require("express");
const app=express();
const dotEnv = require("dotenv").config();
const db = require("./config/db.js");
const PORT= process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const articlesRouters=require("./routers/articlesRouters.js")
const userRouters=require("./routers/userRouters.js")


app.listen(PORT,(err)=>{
    console.log(err?`Error initializing server ${err.message}`
        : `The server was started successfully with the link http://localhost:${PORT} \n
        To exit press Ctrl+C`
    )
});

app.use("/api/articles", articlesRouters);
app.use("/api/users", userRouters);


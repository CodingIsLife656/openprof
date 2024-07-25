import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import path from 'path'


const app = express();
const _dirname = path.resolve();
dotenv.config({ path: path.join(_dirname, "back-end/config/config.env") })
app.use(express.json());

app.use(cors({
    // origin: [process.env.FRONT_END_URL],
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: false,
}))

mongoose.connect(process.env.MONGO_URL, {
    dbName: "CRUD"
}).then(() => {
    console.log("successfully connected to db");
}).catch(err => {
    console.log(`error connecting to db: ${err}`);
})

app.listen(process.env.PORT, () => {
    console.log(`fired at ${process.env.PORT}`)
})

app.use('/v1', userRouter);

if (process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join))
    app.use(express.static(path.join(_dirname, 'front-end/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'front-end/build/index.html'))
    })
}

app.use(errorMiddleware)

import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {urlRouter} from "./routes/urlRouter";
const cors = require('cors')

const app = express();
dotenv.config();

app.use(cors())
app.use(bodyParser.json());
app.use("/urls", urlRouter);

app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});
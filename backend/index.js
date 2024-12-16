import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import config from "./constants.js";
import http from "http";

const { PORT } = config;
const hostname = "192.168.0.103";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", router);

app.listen(PORT, hostname, () => {
	console.log(`Server is up at http://${hostname}:${PORT}`);
});

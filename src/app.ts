import express from "express";
import "./config/dbconfig";
import { responseHandler } from "./middleware/responseHandler";
import v1 from "./routes/v1/index";

const app = express();
app.use(responseHandler);
app.use(express.json());

//auth v1
app.use("/api/v1", v1);

app.use((req: express.Request, res: express.Response) => {
  res.error(`Cannot ${req.method} ${req.originalUrl}`, 404, "Not Found");
});

export default app;

import express from "express";
import "./config/dbconfig";
import { responseHandler } from "./middleware/responseHandler";
import v1 from "./routes/v1/index";

const app = express();
app.use(responseHandler);
app.use(express.json());

//auth v1
app.use("/api/v1", v1);

// auth vN (placeholder) - respond "Coming soon"
app.use("/api/v:n", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Coming soon" });
});

export default app;

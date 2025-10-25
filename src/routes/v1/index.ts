import express from "express";
import { endpoints } from "../../utils/endpoints";
import authRoutes from "./auth";

const v1 = express.Router();
v1.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    api: "Auth API",
    version: "v1",
    description: "Liste des points d'accès disponibles pour la version v1",
    baseUrl: req.baseUrl || "/v1",
    endpoints,
    docs: "https://example.com/docs/v1",
  });
});

v1.use("/auth", authRoutes);

export default v1;

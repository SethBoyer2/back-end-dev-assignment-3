import express, { Express } from "express";
import { eventRouter } from "./api/v1/routes/eventRoutes";
import morgan from "morgan";
import setupSwagger from "config/swagger";

// Initialize Express application

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());
app.use("/api/v1/", eventRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

setupSwagger(app);
export default app;

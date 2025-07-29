import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { connectMongoose } from "./config/mongoose";
import { booksRoutes } from "./controllers/book.controller";
import { borrowRouts } from "./controllers/borrow.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRouts);

// Default route
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Book-Craft Server........!");
});

const main = async () => {
  await connectMongoose();
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};
main();
 
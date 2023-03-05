import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import { validationResult } from "express-validator";
import cors from "cors";

db.sync().then(() => {
  console.log("connect to db");
});

const app = express();
const todoRouter = express.Router();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use("/todo", todoRouter);

todoRouter.post(
  "/",
  TodoValidator.checkCreateTodo(),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(69).json(error);
    }
    next();
  },
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully create todo" });
    } catch (error) {
      return res.json({ msg: error, status: 500, route: "/create" });
    }
  }
);

todoRouter.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const offset = page * limit;
  console.log("page :", page, "limit :", limit);
  const todos = await TodoInstance.findAndCountAll({ limit, offset });
  const toDoResult = todos.rows.map((item) => item.toJSON());
  const result = {
    total: todos.count,
    todos: toDoResult
  }
  return res.json(result);
});

app.listen(port, () => {
  console.log("server is running on port ", port);
});

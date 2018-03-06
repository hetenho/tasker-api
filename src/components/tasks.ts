import "reflect-metadata";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { getConnection, Repository } from "typeorm";
import { Board } from "../entity/Board";
import { Track } from "../entity/Track";
import { Task } from "../entity/Task";
const app = express();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const taskRepo = getConnection().getRepository(Task);
  const task = (await taskRepo.save(req.body)) as Task;
  return res.json({
    ok: true,
    message: `Task ${task.title} created!`,
    task
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const taskRepo = getConnection().getRepository(Task);
  const task = (await taskRepo.findOne({ id: req.params.id })) as Task;
  return res.json({
    ok: true,
    message: `Task with id ${req.params.id} fetched successfully!`,
    task
  });
});

module.exports = router;

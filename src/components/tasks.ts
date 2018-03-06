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
  let last = await taskRepo
    .createQueryBuilder("task")
    .select("max(task.orderNumber)")
    .getRawOne();
    
  last = !last.max ? 0 : last.max + 1;
  const task = (await taskRepo.save({orderNumber: last, ...req.body})) as Task;
  return res.json({
    ok: true,
    message: `Task ${task.title} created!`,
    task
  });
});

router.get("/:boardId", async (req: Request, res: Response) => {
  const taskRepo = getConnection().getRepository(Task);
  const tasks = (await taskRepo.find({ boardId: req.params.boardId })) as Task[];
  return res.json({
    ok: true,
    message: `Tasks fetched successfully!`,
    tasks
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

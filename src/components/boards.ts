import "reflect-metadata";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { getConnection, Repository } from "typeorm";
import { Board } from "../entity/Board";
import { Track } from "../entity/Track";
const app = express();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const boardRepo = getConnection().getRepository(Board);
  const board = await boardRepo.save(req.body) as Board;
  return res.json({ok: true, message: `Board ${board.title} created!`, board});
});

router.get("/:id", async (req: Request, res: Response) => {
  const boardRepo = getConnection().getRepository(Board);
  const board = await boardRepo.findOne({id: req.params.id}) as Board;
  return res.json({
    ok: true,
    message: `Board with id ${req.params.id} fetched successfully!`,
    board
  });
});

router.post("/:boardId/tracks", async (req: Request, res: Response) => {
  const trackRepo = getConnection().getRepository(Track);
  const boardRepo = getConnection().getRepository(Board);
  console.log(req.body);
  const track = (await trackRepo.save(req.body)) as Track;
  const board = (await boardRepo.findOne({ id: req.params.boardId })) as Board;
  return res.json({
    ok: true,
    message: `Track ${track.title} created!`,
    board
  });
});

module.exports = router;

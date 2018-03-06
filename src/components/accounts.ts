import "reflect-metadata";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { getConnection } from "typeorm";
import { Account } from "../entity/Account";
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  const repo = getConnection().getRepository(Account);
  repo.find();
});
router.get("/:id", (req, res) => {
  const repo = getConnection().getRepository(Account);
  repo.findOneById(req.params.id);
});
router.delete("/:id", (req, res) => {
  const repo = getConnection().getRepository(Account);
  repo.removeById(req.params.id);
});

module.exports = router;

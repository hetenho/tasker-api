import "reflect-metadata";
import * as express from 'express';
import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { getConnection } from "typeorm";
import { Account } from '../entity/Account';
import { JWT } from '../config';
const jwt = require("jsonwebtoken");
const app = express();

export const register = async (email: string, passw: string, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);
  await bcrypt.hash(passw, 10, async (err, password) => {
    const creds = { email, password };
    const account = accountRepository.create(creds);
    try {
      await accountRepository.save(account);
      const token = jwt.sign(creds, JWT.key, JWT.opts);
      return res.json({ ok: true, message: 'Registration successful!', account, token });
    } catch(e) {
      return res.json({ ok: false, error: 'Registration failed' });
    }
  });
};

export const checkLogin = async (email: string, passw: string, res: Response) => {
  const accountRepository = getConnection().getRepository(Account);
  try {
    const acc = await accountRepository.findOne({ email });
    const password = !acc ? '' : acc.password;
    const creds = { email, password };
    bcrypt.compare(passw, password, function(err, match) {
      const msg = match ? "Auth successful!" : "Could not find account";
      const token = jwt.sign(creds, JWT.key, JWT.opts);
      return res.json({ ok: match, message: msg, token });
    });
  } catch (e) {
    return res.json({ ok: false, message: "Could not find account" });
  }
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  } else {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, JWT.key);
    if (!decoded) {
      return res.json({ ok: false, message: "Token has expired" });
    }
  }
  next();
}

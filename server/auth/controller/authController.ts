import { NextFunction, Request, Response } from 'express';
import { User } from '../../typings/user';
import { promisePool } from '../../utils/db';
import { createToken, maxAge } from '../lib/tokens';
import { createLogin, createUser } from '../services/user';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { getCredentials } from '../lib/user';
import { ReplSet } from 'typeorm';
import { RSA_NO_PADDING } from 'node:constants';

export const handleSignup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);

    const token = createToken(user.uid);
    res.cookie('onebigchat', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user.uid });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await createLogin(username, password);

    const token = createToken(user.uid);
    res.cookie('onebigchat', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user.uid });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleLogout = (req: Request, res: Response) => {
  res.cookie('onebigchat', '', {
    maxAge: 1,
  });
  res.status(200).json({ user: 'helllo' });
};

export const handleUser = async (req: Request, res: Response) => {
  const token = req.cookies.onebigchat;

  if (token) {
    jwt.verify(token, 'bigchatsmallchat', async (err: any, dToken: any) => {
      res.status(200).json({ user: dToken.uid });
    });
  }
};

export const handleUsername = async (req: Request, res: Response) => {
  const { uid } = req.body;

  if (uid) {
    const username = await getCredentials(uid);
    if (username) {
      res.status(200).json({ username });
    }
  }
};

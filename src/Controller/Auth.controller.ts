import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { logger } from '../Config/Logger.config';
import { Users } from '../Entities/Users.entity';
import * as dotenv from 'dotenv';

dotenv.config();

class AuthController {
  static login = async function (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      logger.error(`${error} on AuthController`);
      res.status(401).send('User not found');
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    res.send({
      user
    });
  };

  static changePassword = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }
    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: id });
    } catch (id) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send();
      return;
    }

    user.hashPassword();

    userRepository.save(user);
    res.status(204).send();
  };
}

export default AuthController;

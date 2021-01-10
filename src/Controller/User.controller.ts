import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../Entities/Users.entity';

export class UserController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const userRepository = getRepository(Users);
    const users = await userRepository.find({
      select: ['id', 'first_name', 'last_name', 'username', 'role']
    });
    res.status(200).send(users);
  };

  static getOneById = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
  };
  static createUser = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const { first_name, last_name, username, password, role, mail } = req.body;

    if (!(first_name && last_name && username && password && role && mail)) {
      res.status(401).send();
    }

    const user = new Users();

    user.first_name = first_name;
    user.last_name = last_name;
    user.username = username;
    user.password = password;
    user.role = role;
    user.mail = mail;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(Users);
    try {
      await userRepository.save(user);
    } catch (error) {
      res.status(409).send('user name already in use');
      return;
    }

    res.status(201).send('user created');
  };
}

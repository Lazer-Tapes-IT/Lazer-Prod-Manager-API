import { validate } from 'class-validator';
import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../Entities/Users.entity';

export class UserController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const userRepository = getRepository(Users);
    const users = await userRepository.find({
      select: ['id', 'first_name', 'last_name', 'username'],
      relations: ['studios']
    });
    res.status(200).send(users);
  };

  static getOneById = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const userRepository = getRepository(Users);
    let user;
    try {
      user = userRepository.findOneOrFail(id, {
        select: [
          'id',
          'username',
          'last_name',
          'first_name',
          'mail',
          'phone_number'
        ]
      });
    } catch (error) {
      res.status(404).send();
    }
    res.status(200).send(user);
  };

  static createUser = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const { first_name, last_name, username, password, mail } = req.body;

    if (!(first_name && last_name && username && password && mail)) {
      res.status(401).send();
    }

    const user = new Users();

    user.first_name = first_name;
    user.last_name = last_name;
    user.username = username;
    user.password = password;
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

  static deleteUser = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    let id = req.params.id;
    let userRepository = getRepository(Users);
    try {
      userRepository.delete(id);
      res.status(204).send('deleted');
    } catch (error) {
      res.status(500).send();
      return;
    }
  };

  static updateUser = async function (req: Request, res: Response) {
    let id = req.params.id;
    let userRepository = getRepository(Users);
    let user;
    let newUser = new Users();
    let { first_name, last_name, username, phone_number, mail } = req.body;
    try {
      user = userRepository.findOneOrFail(id);
      newUser = user;
      if (first_name) {
        newUser.first_name = first_name;
      }
      if (last_name) {
        newUser.last_name = last_name;
      }
      if (username) {
        newUser.username = username;
      }
      if (phone_number) {
        newUser.phone_number = phone_number;
      }
      if (mail) {
        newUser.mail = mail;
      }
    } catch (error) {
      res.status(404).send();
    }

    userRepository.update(id, newUser);
    res.status(201).send({
      message: 'user Updated',
      newUser
    });
  };
}

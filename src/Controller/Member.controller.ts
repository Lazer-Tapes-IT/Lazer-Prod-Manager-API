import { getRepository } from 'typeorm';
import { Members } from '../Entities/Members.entity';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export class MemberController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const memberRepository = getRepository(Members);
    let members;
    try {
      members = await memberRepository.find({
        select: ['id', 'username', 'role'],
        relations: ['projectId']
      });
    } catch (error) {
      res.status(500).send();
      return;
    }

    res.status(200).send(members);
  };

  static getOneById = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const memberRepository = getRepository(Members);

    let member = new Members();
    try {
      member = await memberRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Member not found');
      return;
    }

    res.status(200).send(member);
  };

  static saveMember = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const { username, projectId, role } = req.body;
    const member = new Members();
    member.projectId = projectId;
    member.role = role;
    member.username = username;
    const errors = await validate(member);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const memberRepository = getRepository(Members);
    try {
      await memberRepository.save(member);
    } catch (error) {
      res.status(500).send();
      return;
    }
    res.status(201).send();
  };

  static deleteMember = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const memberRepository = getRepository(Members);
    try {
      await memberRepository.delete(id);
    } catch (error) {
      res.status(404).send('Member not found');
      return;
    }
    res.status(202).send('deleted');
  };

  static updateMember = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const memberRepository = getRepository(Members);
    const { username, projectId, role } = req.body;
    let newMember = new Members();
    if (username) {
      newMember.username = username;
    }
    if (projectId) {
      newMember.projectId = projectId;
    }
    if (role) {
      newMember.role = role;
    }

    try {
      memberRepository.update(id, newMember);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

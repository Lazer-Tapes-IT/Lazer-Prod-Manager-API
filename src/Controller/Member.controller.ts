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
        relations: ['project']
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
    const MemberRepository = getRepository(Members);

    let Member = new Members();
    try {
      Member = await MemberRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('Member not found');
      return;
    }

    res.status(200).send(Member);
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

    const MemberRepository = getRepository(Members);
    try {
      await MemberRepository.save(member);
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
    const MemberRepository = getRepository(Members);
    try {
      await MemberRepository.delete(id);
    } catch (error) {
      res.status(404).send('Member not found');
      return;
    }
    res.status(204).send('deleted');
  };
}

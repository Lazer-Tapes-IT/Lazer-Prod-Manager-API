import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Studio } from '../Entities/Studio.entity';

export class StudioController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const studioRepository = getRepository(Studio);
    let studios;
    try {
      studios = await studioRepository.find({
        select: ['id', 'name', 'creation_date', 'edition_date']
      });
    } catch (error) {
      res.status(500).send();
      return;
    }

    res.status(200).send(studios);
  };

  static getOneById = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const studioRepository = getRepository(Studio);

    let studio = new Studio();
    try {
      studio = await studioRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('studio not found');
      return;
    }

    res.status(200).send(studio);
  };

  static saveStudio = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const { name } = req.body;
    const studio = new Studio();
    studio.name = name;
    const errors = await validate(studio);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const studioRepository = getRepository(Studio);
    try {
      await studioRepository.save(studio);
    } catch (error) {
      res.status(500).send();
      return;
    }
    res.status(201).send();
  };

  static deleteStudio = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const studioRepository = getRepository(Studio);
    try {
      await studioRepository.delete(id);
    } catch (error) {
      res.status(404).send('Studio not found');
      return;
    }
    res.status(204).send('deleted');
  };
}

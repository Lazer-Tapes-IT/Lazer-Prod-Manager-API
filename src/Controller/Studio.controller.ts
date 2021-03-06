import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { logger } from '../Config/Logger.config';
import { Studio } from '../Entities/Studio.entity';

export class StudioController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const studioRepository = getRepository(Studio);
    let studios;
    try {
      studios = await studioRepository.find({
        select: ['id', 'name', 'creation_date', 'edition_date'],
        relations: ['owner']
      });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
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

    let studio;
    try {
      studio = await studioRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('studio not found');
      return;
    }

    res.status(200).send(studio);
  };

  static getOneByUserId = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const studioRepository = getRepository(Studio);

    let studios;
    try {
      studios = await studioRepository.find({
        where:[{owner:id}]
      });
    } catch (error) {
      res.status(404).send('studio not found');
      return;
    }

    res.status(200).send(studios);
  };

  static saveStudio = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const { name, owner, description } = req.body;
    const studio = new Studio();
    studio.name = name;
    studio.owner = owner;
    studio.description = description;
    let studioSaved;
    const errors = await validate(studio);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const studioRepository = getRepository(Studio);
    try {
      studioSaved = await studioRepository.save(studio);
    } catch (error) {
      res.status(500).send();
      return;
    }
    res.status(201).send({
      studio: studioSaved,
      message: "Studio Created"
    });
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

  static updateStudio = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const { name, description } = req.body;
    const studioRepository = getRepository(Studio);
    let newStudio = new Studio();
    try {
      if (name) {
        newStudio.name = name;
      }
      if (description) {
        newStudio.description;
      }
      studioRepository.update(id, newStudio);
    } catch (error) {
      res.status(404).send();
    }
    res.status(200).send('ressources updated');
  };
}

import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../Entities/Project.entity';

export class ProjectController {
  static listAll = async function (req: Request, res: Response): Promise<void> {
    const projectRepository = getRepository(Project);
    let projects;
    try {
      projects = await projectRepository.findAndCount({
        select: [
          'id',
          'name',
          'pitch',
          'type',
          'date_de_tournage',
          'date_de_publication'
        ],
        relations: ['studio', 'members']
      });
    } catch (error) {
      res.status(500).send();
      return;
    }
    res.status(200).send({
      projects
    });
  };
  static saveProject = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const {
      name,
      pitch,
      type,
      date_de_tournage,
      date_de_publication,
      studio
    } = req.body;
    const projectRepository = getRepository(Project);
    let project = new Project();
    project.name = name;
    project.pitch = pitch;
    project.type = type;
    project.date_de_tournage = date_de_tournage;
    project.date_de_publication = date_de_publication;
    project.studio = studio;

    const dataError = await validate(project);
    if (dataError.length > 0) {
      res.status(400).send(dataError);
    }
    try {
      await projectRepository.save(project);
    } catch (error) {
      res.status(500).send(error);
      return;
    }
    res.status(201).send('project created');
  };
  static uptdateProject = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const {
      name,
      pitch,
      type,
      date_de_tournage,
      date_de_publication
    } = req.body;
    let newProject = new Project();
    if (name) {
      newProject.name = name;
    }
    if (pitch) {
      newProject.pitch;
    }
    if (type) {
      newProject.type = type;
    }
    if (date_de_tournage) {
      newProject.date_de_tournage;
    }
    if (date_de_publication) {
      newProject.date_de_tournage;
    }

    const projectRepository = getRepository(Project);
    try {
      projectRepository.update(id, newProject);
    } catch (error) {
      res.status(500).send(error);
    }

    res.status(200).send('project edited');
  };
  static deleteProject = async function (
    req: Request,
    res: Response
  ): Promise<void> {
    let id = req.params.id;
    let projectRepository = getRepository(Project);
    try {
      await projectRepository.delete(id);
      res.status(204).send('deleted');
    } catch (error) {
      res.status(500).send();
      return;
    }
  };
}

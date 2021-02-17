import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Project } from "../Entities/Project.entity";

export class ProjectController {
    static listAll = async function (req: Request, res: Response) {
        let projectRepository = getRepository(Project);
        let projects;
        try {
            projects = projectRepository.find({
                select: ['id', 'name', 'pitch', 'studio', 'type'],
                relations: ['members', 'studio']
            })
        } catch(error) {
            res.status(500).send()
            return;
        }
        res.status(200).send(projects);
    };
    static createProject = async function (req: Request, res: Response) {
        
    };
    static saveProject = async function (req: Request, res: Response) {
        
    };
    static uptdateProject = async function (req: Request, res: Response) {
        
    };
    static deleteProject = async function (req: Request, res: Response) {
        
    };
}
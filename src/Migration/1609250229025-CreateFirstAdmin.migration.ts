import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { logger } from '../Config/Logger.config';
import { Members } from '../Entities/Members.entity';
import { Project } from '../Entities/Project.entity';
import { Studio } from '../Entities/Studio.entity';
import { Users } from '../Entities/Users.entity';

export class CreateFirstAdmin1609250229025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    let userRepository = getRepository(Users);
    let projectRepository = getRepository(Project);
    let studioRepository = getRepository(Studio);
    let memberRepository = getRepository(Members);

    let user = new Users();
    user.first_name = "User";
    user.last_name = "Example";
    user.mail = "mail@example.com";
    user.password =  "password";
    user.username = "testing";
    user.phone_number = 336000;
    user.hashPassword();

    let savedUser, savedStudio, savedProject, savedMember;
    try {
      savedUser = await userRepository.save(user);
    } catch (error) {
      logger.error(error)
    }

    let studio = new Studio();
    studio.name = "studio1";
    studio.owner = savedUser.id;
    studio.description = "yet another studio";
    
    try {
      savedStudio = await studioRepository.save(studio)
    } catch (error) {
      logger.error(error);
    }

    let project = new Project();
    project.name = "project example";
    project.pitch = "testing it bitch";
    project.type = "example";
    project.studio = savedStudio.id;
    project.date_de_tournage = "dating";
    project.date_de_publication = "another date"; 
    
    try {
      savedProject = await projectRepository.save(project);
    } catch (error) {
      logger.error(error);
    }

    let member = new Members();
    member.username =  "actor1";
    member.projectId = savedProject.id;
    member.role = "actor";

    try {
      let savedMember = await memberRepository.save(member);
    } catch (error) {
      logger.error(error)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}

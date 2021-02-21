import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { logger } from '../Config/Logger.config';
import { Users } from '../Entities/Users.entity';

export class CreateFirstAdmin1609250229025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let users : Users[] = [];
    let user1:Users = new Users(); 
    let user2:Users = new Users();
    let user3:Users = new Users();
    user1.first_name = "Salayna";
    user1.last_name = "DOUKOURE";
    user1.mail = "mail@mail.com" ;
    user1.password = "example1";
    user1.username = "username1";
    user1.hashPassword();

    user2.first_name = "David";
    user2.last_name = "Qui Gon ";
    user2.mail = "mail2@mail.com" ;
    user2.password = "example2";
    user2.username = "username2";
    user2.hashPassword();

    user3.first_name = "Nicolas";
    user3.last_name = "Tran";
    user3.mail = "mail3@mail.com" ;
    user3.password = "example3";
    user3.username = "username3";
    user3.hashPassword();

    
    users.push(user1, user2, user3);
    const userRepository = getRepository(Users);

    try {
      users.forEach(user => {
        userRepository.save(user)
      });
    } catch (error) {
      logger.error(error)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}

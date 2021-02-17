import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../Entities/Users.entity';

export class CreateFirstAdmin1609250229025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new Users();
    user.username = 'admin';
    user.password = 'admin';
    user.hashPassword();

    const userRepository = getRepository(Users);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}

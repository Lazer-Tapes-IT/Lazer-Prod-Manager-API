import { IsDate, IsEmail, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone_number: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(7, 100)
  password: string;

  @Column({ nullable: true })
  @IsDate()
  birth_date: Date;

  @Column({ nullable: true })
  @IsEmail()
  mail: string;

  @Column()
  role: string;

  @CreateDateColumn()
  creation_date;

  @UpdateDateColumn()
  last_updated;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): unknown {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

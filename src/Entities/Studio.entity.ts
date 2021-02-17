import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Project } from './Project.entity';
import { Users } from './Users.entity';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @CreateDateColumn()
  creation_date: Date;

  @Column()
  @UpdateDateColumn()
  edition_date: Date;

  @OneToMany(()=>Users, (user) => user.id)
  user: Users[]

  @OneToMany(() => Project, (project) => project.id)
  projects: Project[];
}

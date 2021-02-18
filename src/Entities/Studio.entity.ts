import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(()=>Users, (user) => user.id)
  owner: Users

  @OneToMany(() => Project, (project) => project.id)
  projects: Project[];
}

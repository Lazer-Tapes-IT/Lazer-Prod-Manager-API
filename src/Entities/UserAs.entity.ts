import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Project } from './Project.entity';
import { Users } from './Users.entity';

@Entity()
export class UserAs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  userId: string;

  @Column()
  role: string;

  @OneToOne(() => Project, (project) => project.id)
  @JoinColumn()
  projectId: string;
}

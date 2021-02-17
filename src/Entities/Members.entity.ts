import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Project } from './Project.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  role: string;

  @ManyToOne(() => Project, (project) => project.id)
  @JoinColumn()
  projectId: string;
}

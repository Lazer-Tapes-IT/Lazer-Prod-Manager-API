import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Studio } from './Studio.entity';
import { Members } from './Members.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  pitch: string;

  @Column()
  date_de_tournage: string;

  @Column()
  date_de_publication: string;

  @ManyToOne(() => Studio, (studio) => studio.id)
  studio: Studio;

  @OneToMany(() => Members, (member) => member.projectId)
  members: Members[];
}

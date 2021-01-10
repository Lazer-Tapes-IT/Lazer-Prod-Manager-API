import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Studio } from './Studio.entity';

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
  checklist: string;

  @Column()
  date_de_tournage: Date;

  @Column()
  date_de_publication: Date;

  @ManyToOne(() => Studio, (studio) => studio.projects)
  studio: Studio;
}

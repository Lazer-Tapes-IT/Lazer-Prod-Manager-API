import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class checklist {
  @PrimaryGeneratedColumn()
  id: number;

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
}

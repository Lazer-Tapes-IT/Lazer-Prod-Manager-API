import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
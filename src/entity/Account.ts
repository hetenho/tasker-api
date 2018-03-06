import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Board } from "./Board";

@Entity()
export class Account {
  @PrimaryGeneratedColumn() id: number;

  @Column() password: string;

  @Column() email: string;

  @ManyToMany(type => Board)
  @JoinTable()
  boards: Board[];
}

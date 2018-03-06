import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Board } from './Board';
import { Task } from "./Task";

@Entity()
export class Track {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;
  @Column() boardId: number;
  @ManyToOne(type => Board, board => board.tracks)
  @JoinColumn()
  board: Board;

  @OneToMany(type => Task, task => task.track)
  tasks: Task[];
}

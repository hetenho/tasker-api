import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Track } from "./Track";

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() description: string;
  @Column() boardId: number;
  @Column({ nullable: true }) trackId: number;

  @ManyToOne(type => Track, track => track.tasks)
  @JoinColumn()
  track: Track;
}

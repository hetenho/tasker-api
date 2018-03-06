import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Track } from "./Track";
import { Account } from "./Account";

@Entity()
export class Board {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @OneToMany(type => Track, track => track.board, {
    eager: true
  })
  @JoinTable()
  tracks: Track[];

  @ManyToMany(type => Account)
  @JoinTable()
  accounts: Account[];
}

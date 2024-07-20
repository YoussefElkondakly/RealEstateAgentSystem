// import { Sequelize } from "sequelize";
// import { sequelize } from "../server";
import { Table, Column, Model, IsFloat,BelongsTo,ForeignKey } from "sequelize-typescript";
import { User } from "./usermodel";

@Table
export class Ads extends Model {
  @Column
  title!: string;

  @IsFloat
  @Column
  price!: number;

  @Column
  area!: string;
  
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}



// import { Sequelize } from "sequelize";
// import { sequelize } from "../server";
import { Table, Column, Model, IsFloat } from "sequelize-typescript";

@Table
export class Ads extends Model {
  @Column
  title?: string;

  @IsFloat
  @Column
  price?: number;
  
  @Column
  area?: string;
 

}

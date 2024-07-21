// import { Sequelize } from "sequelize";
// import { sequelize } from "../server";
import { Table, Column, Model, IsFloat,BelongsTo,ForeignKey, DataType, BeforeValidate } from "sequelize-typescript";
import { User } from "./usermodel";

@Table
export class Ads extends Model {
  @Column({ type: DataType.STRING,
    allowNull: false,
    validate: {

      notNull: {
        msg: "Property Type is required",
      },
      isIn: {
        args: [["VILLA", "HOUSE", "LAND", "APARTMENT"]],
        msg: "Please Insert a Correct Property Type",
      },
    },})
propertyType!: string;
@Column({type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please insert the area",
      },
    },})
  area!:string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please insert a city name",
      },
    },
  },)
  city!: string;
@Column( {
    type: DataType.DOUBLE,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: "Please insert a valid price",
      },
      notNull: {
        msg: "Please Insert A Price",
      },
    },
  },)
  price!:number
  @Column( {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please Input a district name",
      },
    },
  },)
  district!:string
  @Column( {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "please Add A property Image",
      },
    },
  },
)
  photo!:string
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Property Type is required",
      },
      isIn: {
        args: [["SALE", "RENT"]],
        msg: "Please Insert a Correct Type",
      },
    },
  },)
  type!:string ;



  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BeforeValidate
static makeUpperCase(instance: Ads) {
  if (instance.propertyType)instance.propertyType = instance.propertyType.toLocaleUpperCase();
  if (instance.type) instance.type = instance.type.toLocaleUpperCase();
}
 

}



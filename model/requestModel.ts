import {
  Table,
  Column,
  Model,
  IsFloat,
  BelongsTo,
  DataType,BeforeUpdate,BeforeCreate,ForeignKey
} from "sequelize-typescript";
import { User } from "./usermodel";
@Table
export class RequestAd extends Model {
  @IsFloat
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Price is required",
      },
    },
  })
  price!: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "you Need To provide the area of the property",
      },
    },
    // required: [true, "you Need To provide the area of the property"],
  })
  area!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "you Need To provide the district of the property",
      },
    },
    // required: [true, "you Need To provide the district of the property"],
  })
  district!: string;
  //Non required with requests

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Property Type is required",
      },
      isIn: {
        args: [["VILLA", "HOUSE", "LAND", "APARTMENT"]],
        msg: "Please Insert a Correct Property Type",
      },
    },
  })
  propertyType!: string;
  description!: string;
  city!: string;
  note!: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status!: boolean;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: RequestAd) {
    instance.propertyType = instance.propertyType.toLocaleUpperCase();
  }
}

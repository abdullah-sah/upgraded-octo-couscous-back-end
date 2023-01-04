import { Optional } from "sequelize";
import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	HasMany,
} from "sequelize-typescript";
import Token from "./token";

interface UserAttributes {
	id: string;
	username: string;
	email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// User has a many-to-one relationship with Token model
// User -> many	 -> Token
@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
	@Column({
		type: DataType.STRING,
		primaryKey: true,
		unique: true,
	})
	id: string;

	@Column({
		type: DataType.STRING,
	})
	username: string;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	email: string;

	@ForeignKey(() => Token)
	// @Column
	// token: string;

	// These lines may need to be revisited, not too sure if this is doing what I'm expecting
	@HasMany(() => Token)
	tokens: Token[];
}

export default User;

import { Optional } from "sequelize";
import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import User from "./user";

interface TokenAttributes {
	id: string;
	token: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

// Token has one-to-many relationship with User model
// Token -> one -> User
@Table
class Token extends Model<TokenAttributes, TokenCreationAttributes> {
	@Column({
		type: DataType.STRING,
		primaryKey: true,
	})
	id: string;

	@Column({
		type: DataType.STRING,
	})
	token: string;

	@ForeignKey(() => User)
	@Column
	username: string;

	// These lines may need to be revisited, not too sure if this is doing what I'm expecting
	@BelongsTo(() => User)
	user: User;
}

export default Token;

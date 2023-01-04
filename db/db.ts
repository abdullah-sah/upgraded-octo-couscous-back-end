import { Sequelize } from "sequelize-typescript";
import Token from "../models/token";
import User from "../models/user";
import path from "path";

const db = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "netflix.sqlite"),
	logging: false,
});

db.addModels([Token, User]);

export { db, User, Token };

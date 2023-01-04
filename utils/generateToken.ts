import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

const JWT_SECRET: string = crypto.randomBytes(64).toString("hex");

const generateToken = (userID: string) => {
	const payload: object = {
		userID,
	};
	const token: string = jwt.sign(payload, JWT_SECRET);

	return token;
};

export default generateToken;

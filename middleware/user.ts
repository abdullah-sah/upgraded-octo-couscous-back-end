import Express, { NextFunction } from "express";
import { UserInfo } from "../types";

// Makes sure that email is in valid email format
// Also ensures that username is a string and is not empty
const validateUserInfo = (
	req: Express.Request,
	resp: Express.Response,
	next: NextFunction
) => {
	const { email, username }: UserInfo = req.body;
	const validEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const validUserName: boolean =
		username && typeof username === "string" ? true : false;

	!validEmail || !validUserName
		? resp
				.status(400)
				.send({ success: false, error: "Email or username is not valid." })
		: next();
};

export { validateUserInfo };

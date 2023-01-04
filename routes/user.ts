import { Router } from "express";
import * as crypto from "crypto";
import generateToken from "../utils/generateToken";
import throwError from "../utils/throwError";
import Express from "express";
import { User, Token } from "../db/db";
import { validateUserInfo } from "../middleware/user";
import { UserInfo } from "../types";

const userRouter: Router = Router();

// post request to generate jwt (JSON Web Token)
userRouter.put(
	"/",
	validateUserInfo,
	async (req: Express.Request, resp: Express.Response) => {
		const { email, username }: UserInfo = req.body;
		try {
			const uuid: string = crypto.randomUUID();
			const token = generateToken(uuid);

			await User.create({ email, id: uuid, username });

			resp.send({ success: true, user: { id: uuid, token } });
		} catch (error: unknown) {
			resp.status(400).send({
				error,
				message: "That email is already registered to an account.",
			});
		}
	}
);

// Get a user given a user's email address or username
userRouter.get("/", async (req: Express.Request, resp: Express.Response) => {
	const { email, username }: UserInfo = req.body;
	try {
		let user: User;
		if (email) {
			user = await User.findOne({ where: { email: email } });
			console.log(user);
		} else if (username) {
			user = await User.findOne({ where: { username: username } });
		}

		user
			? resp.send({ success: true, user: user })
			: throwError("Couldn't find that user.");
	} catch (error: unknown) {
		resp.status(404).send({
			success: false,
			error: error,
			message: "Couldn't find that user.",
		});
	}
});

export default userRouter;

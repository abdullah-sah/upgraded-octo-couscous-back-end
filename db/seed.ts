import { db, User, Token } from "../db/db";

const seed = async () => {
	await db.sync({ force: true });

	const newToken = await Token.create({
		id: "some-unique-id",
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	});

	const newUser: User = await User.create({
		username: "abs123",
		email: "abs@gmail.com",
	});

	newUser.$add("token", newToken);

	console.log("Database populated :)");
};

export default seed;

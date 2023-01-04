import express, { Express } from "express";
import userRouter from "../routes/user";
import seed from "../db/seed";

const app: Express = express();
const PORT: number = 5001;

app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT, async () => {
	await seed();
	console.log(`Listening on Port ${PORT}`);
});

import express from "express";
import {
	seeProfile,
	logout,
	edit,
	remove,
	startGithubLogin,
	finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id(\\w+)", seeProfile);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/delete", remove);

export default userRouter;

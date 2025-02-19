import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./views/middleware";

const app = express();
const logger = morgan("dev");
app.use(logger);

app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
		resave: false,
		saveUninitialized: false,
	})
);

app.use(localMiddleware);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

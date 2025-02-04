import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 8000;
const logger = morgan('dev');
const home = (req, res) => {
    res.send("Home");
}
const login = (req, res) => res.send("login");

app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);

import User from "../models/User";

const bcrypt = require("bcrypt");

export const seeProfile = (req, res) =>
	res.render("seeProfile", { pageTitle: "Profile" });

export const getLogin = (req, res) => {
	res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	const pageTitle = "Login";
	if (!user) {
		return res.status(400).render("login", {
			pageTitle,
			error: "Username does not exist",
		});
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		return res.status(400).render("login", {
			pageTitle,
			error: "Wrong password",
		});
	}

	req.session.loggedIn = true;
	req.session.user = user;

	return res.redirect("/");
};

export const githubLogin = (req, res) => {
	const baseURL = `https://github.com/login/oauth/authorize`
	const config = {
		client_id: "Ov23litGEqXXX2Sa000e",
		scope:"read:user user:email"
	}
	const params = new URLSearchParams(config).toString()
	const url = `${baseURL}?${params}`
	return res.redirect(url)

}
export const logout = (req, res) => res.send("Logout");

export const getJoin = (req, res) => {
	res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
	const { name, email, username, password, passwordConfirm, location } =
		req.body;

	const userNameExists = await User.exists({ username });
	if (userNameExists) {
		return res.status(400).render("join", {
			pageTitle: "Join",
			error: "This username is already taken",
		});
	}

	const emailExists = await User.exists({ email });
	if (emailExists) {
		return res.status(400).render("join", {
			pageTitle: "Join",
			error: "This email is already taken",
		});
	}
	if (password !== passwordConfirm) {
		return res.status(400).render("join", {
			pageTitle: "Join",
			error: "Password confirmation does not match",
		});
	}
	await User.create({
		name,
		email,
		username,
		password,
		location,
	});
	return res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");

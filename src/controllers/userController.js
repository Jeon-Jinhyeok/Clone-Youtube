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

export const startGithubLogin = (req, res) => {
	const baseURL = `https://github.com/login/oauth/authorize`;
	const config = {
		client_id: process.env.GH_CLIENT,
		scope: "read:user user:email",
	};
	const params = new URLSearchParams(config).toString();
	const url = `${baseURL}?${params}`;
	return res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
	const baseURL = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code,
	};

	const params = new URLSearchParams(config).toString();
	const finalUrl = `${baseURL}?${params}`;

	const tokenRequest = await (
		await fetch(finalUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
	).json();

	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const userRequest = await (
			await fetch("https://api.github.com/user", {
				headers: {
					Authorization: `token ${access_token}`,
				},
			})
		).json();
	} else {
		return res.redirect("/login");
	}
};

export const logout = (req, res) => {
	req.session.destroy();
	req.flash("info", "Bye Bye");
	return res.redirect("/");
};

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

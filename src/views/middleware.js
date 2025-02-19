export const localMiddleware = (req, res, next) => {
	res.locals.siteName = "Youtube";
	res.locals.loggedIn = Boolean(req.session.loggedIn);
	res.locals.user = req.session.user || {};
	console.log(res.locals);
	next();
};

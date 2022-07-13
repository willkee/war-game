const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { restoreUser, setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4, max: 30 })
		.withMessage("Please provide a username between 4 and 30 characters.")
		.custom(async (_value, { req }) => {
			const query = await User.findOne({
				where: { username: req.body.username },
			});
			if (query) {
				return await Promise.reject(
					"Username is already in use. Login instead?"
				);
			}
		}),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6, max: 256 })
		.withMessage("Password must be between 6 and 256 characters."),
	handleValidationErrors,
];

const validateLogin = [
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a valid username."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please enter a password."),
	handleValidationErrors,
];

router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.username,
		});
	} else {
		return res.json({});
	}
});

router.post(
	"/signup",
	validateSignup,
	asyncHandler(async (req, res) => {
		const { username, password } = req.body;
		console.log(username, password, "SADFSDJHFKJSDF");
		const user = await User.create({ username, password });
		await setTokenCookie(res, user);
		return res.json({ user });
	})
);

router.post(
	"/login",
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username } });

		if (!user) {
			const err = new Error("Invalid credentials.");
			err.status = 401;
			err.title = "Unauthorized";
			err.errors = ["Invalid credentials."];
			return next(err);
		}

		if (password === user.password) {
			await setTokenCookie(res, user);
			return res.json({ user: { id: user.id, username: user.username } });
		}
	})
);

// Log out
router.delete("/logout", (_req, res) => {
	res.clearCookie("token");
	return res.json({});
});

module.exports = router;

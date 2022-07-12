const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);

// const asyncHandler = require("express-async-handler");
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");

// router.get(
//     "/set-token-cookie",
//     asyncHandler(async (_req, res) => {
//         const user = await User.findOne({
//             where: {
//                 username: "lincoln",
//             },
//         });
//         setTokenCookie(res, user);
//         return res.json({ user });
//     })
// );

// const { restoreUser } = require("../../utils/auth.js");
// router.get("/restore-user", restoreUser, (req, res) => {
//     return res.json(req.user);
// });

// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
//     return res.json(req.user);
// });

// router.post("/test", (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Serve React build files in production
if (process.env.NODE_ENV === "production") {
    const path = require("path");

    // Serve frontend's index.html file at the root route
    router.get("/", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, "../../frontend", "build", "index.html")
        );
    });

    router.use(express.static(path.resolve("../frontend/build")));

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, "../../frontend", "build", "index.html")
        );
    });
}

// Add XSRF-TOKEN in development
if (process.env.NODE_ENV !== "production") {
    router.get("/api/csrf/restore", (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        return res.json({});
    });
}

// router.get("/hello/world", (req, res) => {
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     res.send("Hello World!");
// });

module.exports = router;

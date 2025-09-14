module.exports = (req, res) => {
    const sha = process.env.VERCEL_GIT_COMMIT_SHA || "unknown";
    const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
        JSON.stringify({
            ok: true,
            time: new Date().toISOString(),
            commit: sha.substring(0, 7),
            message: msg,
        })
    );
};

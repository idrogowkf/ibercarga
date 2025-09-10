module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
};
// touch Wed Sep 10 22:47:11     2025

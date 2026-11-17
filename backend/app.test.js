const test = require("node:test");
const assert = require("node:assert");
const app = require("./app");

test("GET /health returns ok", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  const res = await fetch(`http://localhost:${port}/health`);
  const data = await res.json();

  assert.strictEqual(data.status, "ok");
  server.close();
});

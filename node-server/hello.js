const http = require("http");
const fs = require("fs").promises;

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  fs.readFile("./houses.json")
    .then((contents) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});

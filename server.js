const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db/config")(server);

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/admin',express.static(__dirname + '/admin'))
server.use('/',express.static(__dirname + '/web'));
server.use("/uploads", express.static(__dirname + "/uploads"));

require("./routes/api/category")(server);
require("./routes/api/web")(server);

const multer = require("multer");

const upload = multer({ dest: __dirname + "/uploads" });

server.post("/api/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:5555/uploads/${file.filename}`;
  res.send(file);
});

const port = 5555;
server.listen(port, () => {
  console.log(`server is running at ${port}`);
});

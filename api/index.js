const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const socket = require("socket.io");
const routes = require("./routes/api");

const app = express();
const port = process.env.port || 9000;

mongoose.connect("mongodb://localhost/shoppinglist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", routes);

app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.message,
  });
});

const server = app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection");
  
  socket.on("itemadded", (item) => {
    console.log(item);
    io.sockets.emit("itemadded", item);
  });
});

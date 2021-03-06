const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const port = 3333;

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

const userBD = process.env.USER;
const passBD = process.env.PASS;

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect(
  `mongodb+srv://${userBD}:${passBD}@cluster0-exsan.mongodb.net/hudbox?retryWrites=true`,
  { useNewUrlParser: true },
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || port, () =>
  console.warn(`Example app listening on port ${port}!`),
);

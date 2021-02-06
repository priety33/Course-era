const express= require('express');
const bodyParser= require('body-parser');
const http= require('http');

const hostname= 'localhost';
const port= 3000;

const app= express();
app.use(bodyParser.json());

const dishRouter = require('./routes/dishRouter');
app.use('/dishes', dishRouter);

const leaderRouter = require('./routes/leaderRouter');
app.use('/leaders', leaderRouter);

const promoRouter = require('./routes/promoRouter');
app.use('/promotions', promoRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
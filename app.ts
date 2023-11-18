import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.json({
    message: "It's ok",
  })
})

app.listen(8080);

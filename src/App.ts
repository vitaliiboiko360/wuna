import express from 'express';


const app = express();

app.use('/data', express.static('data'));

app.get('/avatar/:avatarId', (req, res) => {
  const { avatarId } = req.params;
  console.log(`requested avatarId: ${avatarId}`);
  res.sendStatus(200);
});

export default app;
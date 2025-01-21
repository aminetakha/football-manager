import 'dotenv/config'
import express from 'express';

const app = express();
const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

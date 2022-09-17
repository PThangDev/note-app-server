import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Route
routes(app);

app.listen(PORT, () => {
  console.log(`App listen on PORT : ${PORT}`);
});

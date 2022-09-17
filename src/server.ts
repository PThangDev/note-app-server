import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import cors from 'cors';
import { connectDB } from './configs';
import routes from './routes';
import { errorHandlingMiddleware } from './middlewares';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
routes(app);

//Error handling
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`App listen on PORT : ${PORT}`);
});

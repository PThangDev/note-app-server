import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
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
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
routes(app);

//Error handling
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`App listen on PORT : ${PORT}`);
});

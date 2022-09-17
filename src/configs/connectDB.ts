import mongoose from 'mongoose';
import { logger } from '../helpers';

const connectDB = async () => {
  const URI = process.env.MONGODB_URI as string;
  try {
    await mongoose.connect(URI, {});
    logger.info('Connect to MongoDB successfully!');
  } catch (error) {
    logger.info(`Connect database has error ${error}`);
    process.exit(1);
  }
};

export default connectDB;

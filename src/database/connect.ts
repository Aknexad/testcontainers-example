import mongoose from 'mongoose';

import { NHBS_MONGODB_URL, DB_NAME } from '../config';

export async function connectToDatabase() {
  try {
    await mongoose.connect(`${NHBS_MONGODB_URL}${DB_NAME}?authSource=admin`);
    console.log('Database Connected');
  } catch (error) {
    console.error('Error no database connection');
    console.error(error);
  }
}

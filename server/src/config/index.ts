import dotenv from 'dotenv'
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const config = {
  port: process.env.PORT || 3000,
  mongoUri: MONGO_URI,
};

export default config;

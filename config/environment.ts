import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  baseUrl: process.env.BASE_URL ?? '',
  apiUrl: process.env.API_URL ?? '',
  testEnv: process.env.TEST_ENV ?? 'local',
};
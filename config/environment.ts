import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const environment = {
  baseUrl: process.env.BASE_URL ?? '',
  apiUrl: process.env.API_URL ?? '',
};

import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const environment = {
  baseUrl: process.env.BASE_URL ?? '',
  apiUrl: process.env.API_URL ?? '',
  testEnv: process.env.TEST_ENV ?? 'local',

  testUser: {
    email: process.env.TEST_USER_EMAIL ?? '',
    password: process.env.TEST_USER_PASSWORD ?? '',
  },
};

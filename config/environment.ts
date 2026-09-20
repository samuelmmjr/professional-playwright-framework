import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is not defined.`);
  }

  return value;
}

export const environment = {
  baseUrl: getRequiredEnvironmentVariable('BASE_URL'),
  apiUrl: getRequiredEnvironmentVariable('API_URL'),
};

import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 2,

  reporter: [['html']],

  use: {
    // URL padrão para testes UI
    baseURL: environment.baseUrl,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',

      testMatch: '**/*.setup.ts',
    },

    {
      name: 'api',

      testMatch: '**/api/**/*.spec.ts',

      use: {
        baseURL: environment.apiUrl,
      },
    },

    {
      name: 'chromium',

      testIgnore: '**/api/**/*.spec.ts',

      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'firefox',

      testIgnore: '**/api/**/*.spec.ts',

      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'webkit',

      testIgnore: '**/api/**/*.spec.ts',

      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth/user.json',
      },

      dependencies: ['setup'],
    },
  ],
});

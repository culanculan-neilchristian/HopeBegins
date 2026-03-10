/**
 * Application configuration
 * Handles environment-specific values for API endpoints and other settings.
 */

const getEnvironment = () => {
  if (process.env.NODE_ENV === 'production') return 'prod';
  if (process.env.NODE_ENV === 'test') return 'test';
  return 'local';
};

const ENV = getEnvironment();

const CONFIG = {
  local: {
    API_URL: 'http://localhost:3003/api',
    BASE_URL: 'http://localhost:3000',
  },
  dev: {
    API_URL: 'https://dev-api.hopebegins.today/api',
    BASE_URL: 'https://dev.hopebegins.today',
  },
  prod: {
    API_URL: 'https://api.hopebegins.today/api',
    BASE_URL: 'https://hopebegins.today',
  },
};

// Selection of config based on environment
// Defaults to local if environment not found or for local development
const baseConfig = CONFIG[ENV as keyof typeof CONFIG] || CONFIG.local;

export const config = {
  ...baseConfig,
  API_URL: process.env.NEXT_PUBLIC_API_URL || baseConfig.API_URL,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || baseConfig.BASE_URL,
};

export default config;

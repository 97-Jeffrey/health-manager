export default {
  preset: 'ts-jest/presets/default-esm',  // ESM support
  testEnvironment: 'jsdom',  // For React DOM testing
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Treat TS files as ESM
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // Mock CSS
    '^@/(.*)$': '<rootDir>/src/$1',  // Alias support (if using Vite aliases)
  },
  globals: {
    'ts-jest': {
      useESM: true,  // Enable ESM in ts-jest
    },
  },
};
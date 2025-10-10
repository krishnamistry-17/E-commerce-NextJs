import type { Config } from "jest";

const config: Config = {
  // Clear mocks before every test
  clearMocks: true,

  // Enable coverage reports
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "<rootDir>/app/**/*.{ts,tsx}",
    "<rootDir>/routes/**/*.{ts,tsx}",
    "<rootDir>/services/**/*.{ts,tsx}",
    "<rootDir>/utils/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],

  // Use jsdom for testing React components
  testEnvironment: "jsdom",

  // Setup Testing Library matchers
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Transform TypeScript using ts-jest with proper JSX configuration
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },

  // Handle path aliases, CSS, and static files
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  // Where to find tests
  testMatch: [
    "**/__tests__/**/*.(spec|test).(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)",
  ],

  // Ignore Next.js build and node_modules
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  // Module file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["core-js"],
  globalSetup: './src/tests/jest/globalSetup.ts',
  globalTeardown: './src/tests/jest/globalTeardown.ts',
}
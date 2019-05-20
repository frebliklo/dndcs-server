module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/tests/jest/globalSetup.ts',
  globalTeardown: './src/tests/jest/globalTeardown.ts',
  // verbose: false,
}
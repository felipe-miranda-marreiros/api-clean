/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest']
  }
}

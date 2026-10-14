/** @type {import("ts-jest").JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/content/**/*.ts",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|pdf|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/file_mock.ts",
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/utils.tsx",
  ],
};

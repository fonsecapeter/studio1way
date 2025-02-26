/** @type {import("ts-jest").JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "/app/frontend/src/**/*.{js,jsx,ts,tsx}",
    "!/app/frontend/src/**/*.d.ts",
    "!/app/frontend/src/content/**/*.ts",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|pdf|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "/app/frontend/src/tests/file_mock.ts",
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  setupFilesAfterEnv: [
    "/app/frontend/src/tests/utils.tsx",
  ],
};

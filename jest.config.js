module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  transform: {
    "^.+\\.tsx?$": `<rootDir>/config/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/config/loadershim.js`],

  collectCoverage: true,
  collectCoverageFrom: [
    "**/server/**/*.{ts,tsx}",
    "**/client/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!**/public/**"
  ],
  coverageThreshold: {
    "global": {
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  },
  coverageDirectory: "<rootDir>/tests/__coverage__/",
};

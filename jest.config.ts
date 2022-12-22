import type { Config } from "jest";

const config: Config = {
  rootDir: "./",
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};
export default config;

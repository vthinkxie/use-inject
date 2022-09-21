import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
const pkg = require("./lib/package.json");

export default {
  input: `src/index.ts`,
  output: [
    {
      file: `./lib/${pkg.main}`,
      name: "useInject",
      format: "umd",
      sourcemap: false,
    },
    { file: `./lib/${pkg.module}`, format: "es", sourcemap: false },
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
    commonjs(),
  ],
};

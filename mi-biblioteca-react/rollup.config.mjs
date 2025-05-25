import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

/**
 * Rollup config para @sebastian-nm/grafico-mdb
 */
export default {
  input: "src/index.ts", // punto de entrada principal de su biblioteca
  output: [
    {
      file: "dist/index.cjs", // salida CommonJS
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/index.esm.js", // salida ESModule
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(), // excluye react/react-dom del bundle
    resolve(),          // permite importar módulos de node_modules
    commonjs(),         // convierte CJS a ESM si es necesario
    typescript({
      tsconfig: "./tsconfig.json",  // usa su tsconfig principal
      declaration: true,            // genera archivos .d.ts
      declarationDir: "dist",       // coloca los .d.ts en dist/
      rootDir: "src"                // interpreta desde src/
    })
  ]
};

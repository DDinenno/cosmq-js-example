import babel from "vite-plugin-babel";

export default {
  plugins: [
    babel({
      babelConfig: {
        presets: ["babel-preset-cosmq-js"],
        plugins: ["transform-equal-chain"],
      },
    }),
  ],
  server: { port: 8080 },
  build: {
    minify: false,
    sourcemap: true,
  },
};

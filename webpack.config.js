/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require("dotenv-webpack");

module.exports = function (env, { analyze }) {
    const production = env.production || process.env.NODE_ENV === "production";
    const staging = env.staging;
    return {
        target: "web",
        mode: production ? "production" : "development",
        devtool: production ? undefined : "eval-cheap-source-map",
        entry: {
            entry: "./src/main.ts",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: production
                ? "[name].[contenthash].bundle.js"
                : "[name].bundle.js",
        },
        experiments: {
            topLevelAwait: true,
        },
        resolve: {
            extensions: [".ts", ".js"],
            modules: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "dev-app"),
                "node_modules",
            ],
            alias: production
                ? {
                      // add your production aliasing here
                  }
                : {
                      ...[
                          "fetch-client",
                          "kernel",
                          "metadata",
                          "platform",
                          "platform-browser",
                          "plugin-conventions",
                          "route-recognizer",
                          "router",
                          "router-lite",
                          "runtime",
                          "runtime-html",
                          "testing",
                          "webpack-loader",
                      ].reduce(
                          (map, pkg) => {
                              const name = `@aurelia/${pkg}`;
                              map[name] = path.resolve(
                                  __dirname,
                                  "node_modules",
                                  name,
                                  "dist/esm/index.dev.mjs"
                              );
                              return map;
                          },
                          {
                              aurelia: path.resolve(
                                  __dirname,
                                  "node_modules/aurelia/dist/esm/index.dev.mjs"
                              ),
                              // add your development aliasing here
                          }
                      ),
                  },
        },
        devServer: {
            historyApiFallback: true,
            open: !process.env.CI,
            port: 9000,
        },
        module: {
            rules: [
                { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset" },
                {
                    test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                    type: "asset",
                },
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                                sassOptions: {
                                    includePaths: [
                                        path.resolve("./node_modules"),
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.ts$/i,
                    use: ["ts-loader", "@aurelia/webpack-loader"],
                    exclude: /node_modules/,
                },
                {
                    test: /[/\\]src[/\\].+\.html$/i,
                    use: "@aurelia/webpack-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "index.html",
                favicon: "favicon.ico",
            }),
            new Dotenv({
                path: `./.env${
                    production
                        ? ""
                        : "." + (process.env.NODE_ENV || "development")
                }`,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "static",
                        to: "dist",
                        globOptions: { ignore: [".*"] },
                    },
                ],
            }), // ignore dot (hidden) files
            analyze && new BundleAnalyzerPlugin(),
        ].filter((p) => p),
    };
};

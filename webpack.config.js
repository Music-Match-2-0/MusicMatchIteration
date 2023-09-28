const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// console.log("ENVIRONMENT", process.env.NODE_ENV);

module.exports = {
    mode: 'development', //process.env.NODE_ENV, // NODE_ENV environment variable from package.json
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/', //used for base path for other assets
        filename: 'bundle.js'
    },
    // Other webpack configuration settings
    module: {
        rules: [{
                  test: /\.(js|jsx)$/,
                  exclude: /node_modules/,
                  use: {
                    loader: "babel-loader",
                    options: {
                      presets: [ 
                        "@babel/react", 
                        "@babel/env"
                      ]
                    },
                  },
                },
                {
                  test: /\.scss$/,
                  exclude: /node_modules/,
                  use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader"
                  ],
                },
               ],
        },
    devServer: {
      historyApiFallback: true,
      static: {
        publicPath: '/',
        directory: path.resolve(__dirname, 'client'),
      },
      hot: true,
      host: 'localhost',
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
        },
        // '/webs': {
        //   target: 'ws://localhost:3001/',
        //   ws: true
        // },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
        template: './client/index.html'
      })
    ]
};
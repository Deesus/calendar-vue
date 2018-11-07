const path              = require('path');
const webpack           = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin   = require('vue-loader/lib/plugin');


module.exports = {
    entry: {
        main: ['./src/index.js']
    },


    mode: 'development',


    output: {
        // name of file after webpack process and outputs:
        filename: '[name]-bundle.js',               // the `[name]` string interpolates the name in the entry object (so this will become `main-bundle.js`)

        path: path.resolve(__dirname, '../dist'),   // all of our files will end up in `dist/`

        publicPath: '/' // n.b. we can set this to other locations, like `/js`
    },


    devServer: {
        contentBase: 'dist',    // everything will be served from this directory
        overlay: true,          // console errors are displayed in browser (as well as terminal)
        stats: {
            colors: true        // adds colors to terminal text
        }
    },


    // we can use DevTools (only in Chromium) to debug both client and server Webpack code;
    // add breakpoints in your code with the keyword `debugger`:
    devtool: "source-map",      // add source-maps for bundles


    module: {
        // rules that webpack uses when it encounters various file types:
        rules: [
            // ---------- Vue: ----------
            // see <https://vue-loader.vuejs.org/options.html>
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: true
                }
            },

            // ---------- JS: ----------
            {
                test: /\.js$/,
                // folders excluded from babel transpiling:
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // n.b. everything inside `options` is exactly the same as `.babelrc` options:
                        options: {
                            presets: [
                                [
                                    "env",
                                    {
                                        targets: {
                                            browsers: ["> 1%", "last 2 versions", "not ie <= 10"]
                                        },
                                        debug: false
                                    }
                                ]
                            ],

                            plugins: ["transform-runtime"]
                        }
                    }
                ]
            },

            // ---------- CSS: ----------
            {
                // regex for file extensions we are targeting:
                test: /\.css$/,

                // specify loaders:
                use: [
                    'vue-style-loader',
                    'style-loader',         // style-loader is responsible for injecting the css into the html
                    'css-loader'
                ]
            },

            // ---------- HTML: ----------
            {
                // n.b. the `html-webpack-plugin` does the same thing as the `file-loader` and `extract-loader`; thus, we don't use them here:
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },

            // ---------- Images: ----------
            {
                // TODO: test svg for this loader:

                // tries to match any of the following file types (via regex):
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // returns the (input) image name and extension but also adds a hash to the output name:
                            name: 'images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },


        ]
    },


    resolve: {
        // see <https://vuejs.org/v2/guide/installation.html#Webpack>
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },


    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};


// ==================================================
// production specific:
// ==================================================

if (process.env.NODE_ENV === 'production') {

    console.log('---------- Running in production mode ----------');

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: true,        // TODO: should set this to false
            compress: {
                warnings: false
            }
        })
    );
}


// ==================================================
// development specific:
// ==================================================

if (process.env.NODE_ENV === 'development') {
    console.log('---------- Running in development mode ----------');
}

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        app1: path.join(__dirname, './src/app1.js')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    // sekcja plugins
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: true,
            title: 'INDEX',
            template: path.join(__dirname, "src/index.html"),
            chunks: ['app1']
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    mode: "development",
    devServer: {
        static: './dist',
        port: 3000
    }

}

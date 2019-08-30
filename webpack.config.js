var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var vueLoaderPlugin=require('vue-loader/lib/plugin')
//var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //记得要设置mode
    mode: 'development',
    entry: {
        //这里的键名要设置为入口文件的名字
        'main': './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {   test: /\.less$/,
                use: ['style-loader', 'css-loader','less-loader']
            },
            {   test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {   test: /\.(jpg|png|jpeg|gif|bmp)/,
                use: {loader:'url-loader',
                options:{limit:50000,name:'[name] aaa.[ext]'}}
            },
            {   test: /\.(eot|svg|ttf|woff|woff2)/,
                use: 'url-loader'
            },
            //已下面这种最新的为准
            {   test: /\.jsx?$/,
                use:{loader:'babel-loader'},
                 
                exclude:/node_modules/
            },
            {   
                test: /\.vue$/,
                use:{loader:'vue-loader'}
            }





        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),

        new vueLoaderPlugin()
        // new htmlWebpackPlugin({
        //     template: path.join(__dirname,'./src/index.html'),
        //     filename: 'index.html',
        //     inject: 'body'
        // })
    ],
    devServer: {

    },
    resolve:{
        alias:{
            //当导入vue包时，将vue.js设置为真正的入口文件
            "vue$":'vue/dist/vue.js'
        }
    }
}
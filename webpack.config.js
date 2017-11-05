// const webpack = reqiure('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, './dist');
const SRC_DIR = path.resolve(__dirname, './src/client');

const config = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        
    },
    module: {
       loaders: [
           {
               test: /\.js?/,
               include: SRC_DIR,
               loader: 'babel-loader',
               query: {
                   presets: ['react' , 'es2015', 'stage-2']
               }
           }
       ] 
    }
};

module.exports = config;
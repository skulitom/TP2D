const path = require('path');

module.exports = {
    entry: {
        app: './public/index.html'
    },
    output: {
        path: path.resolve(__dirname, 'build')
    }
};
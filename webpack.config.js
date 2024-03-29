const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.min.js'),
                    to: path.join(__dirname, 'dist'),
                },
            ],
        }),
    ],
};

const path = require('path');
module.exports = {
  webpack: {
    alias: {
      // '@src': path.resolve(__dirname, 'src'),
      "@features1": path.resolve(__dirname,'src')
    },
  },
};
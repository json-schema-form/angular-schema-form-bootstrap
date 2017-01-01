const config = require('./webpack.config.js');
const path = require('path');

config.entry = {
  'angular-schema-form-bootstrap': [ path.join(__dirname, 'src', 'module') ],
  'angular-schema-form-bootstrap-bundled': [ 'angular-schema-form', path.join(__dirname, 'src', 'module') ],
  'angular-schema-form-bootstrap.min': [ path.join(__dirname, 'src', 'module') ],
  'angular-schema-form-bootstrap-bundled.min': [ 'angular-schema-form', path.join(__dirname, 'src', 'module') ],
}

module.exports = config;

'use strict';

let mongoose = require('mongoose');
let CompanySchema = mongoose.Schema({
  "name": String,
  "website": String,
  "companyLogo": String,
  "email": String,
  "password": String
});

module.exports = CompanySchema;



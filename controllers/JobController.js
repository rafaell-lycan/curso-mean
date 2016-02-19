'use strict';

let JobModel = Promise.promisifyAll(require('../models/JobModel'));
let debug = require('debug')('curso-mean:controller:job');

const PAGE_SIZE = 5;
const FIRST_PAGE = 1;

let JobController = {
  byId: function(request, response, next) {
    JobModel.findOne({ _id: request.params._id })
      .then(function(data) {
        if (!data) {
          var err = new Error('Job Not found ;(');
          err.status = 404;
          throw err;
        }
        return data;
      })
      .then(function(data) {
        response.json(data);
      })
      .catch(next);
  },

  list: function(request, response, next) {
    let size = parseInt(request.query.size, 10) || PAGE_SIZE;
    let page = parseInt(request.query.page, 10) || FIRST_PAGE;
    let result = {
      _metadata: {}
    };

    JobModel.count()
      .then(function(total) {
        result._metadata.total = total;

        return JobModel
          .find()
          .limit(size)
          .skip((page - 1) * size)
      })
      .then(function(data) {
        result._metadata.size = size;
        result._metadata.page = page;
        result._metadata.count = data.length;
        result.items = data;

        response.json(result);
      })
      .catch(next);
  },
  create: function(request, response, next) {
    JobModel.create(request.body)
      .then(function(data) {
        response.json(data);
      })
      .catch(next);
  },
  update: function(request, response, next) {
    JobModel.update({ _id: request.params._id }, request.body)
      .then(function(data) {
        response.json(data);
      })
      .catch(next);
  },
  remove: function(request, response, next) {
    JobModel.remove({ _id: request.params._id })
      .then(function(data) {
        response.json(data);
      })
      .catch(next);
  },
  listByCompany: function(request, response, next) {
    JobModel.find({ _companyId: request.params._id })
      .then(function(data) {
        response.json(data);
      })
      .catch(next);
  }
};

module.exports = JobController;

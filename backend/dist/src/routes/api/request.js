"use strict";

var keystone = require('keystone');

var Request = keystone.list('Request');
/**
 * Create a Request data row
 */

exports.create = function (req, res) {
  var newRequest = new Request.model();
  var data = req.method == 'POST' ? req.body : req.query;
  newRequest.getUpdateHandler(req).process(data, function (err) {
    if (err) return res.apiError('error', err);
    res.apiResponse({
      newRequest: newRequest
    });
  });
};
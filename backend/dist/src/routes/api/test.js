"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var keystone = require('keystone');
/**
 * List Tests
 */
// Getting our test model


var Test = keystone.list('Test');
var Request = keystone.list('Request'); // Creating the API end point

exports.list = function (req, res) {
  // Querying the data this works similarly to the Mongo db.collection.find() method
  Test.model.find(function (err, items) {
    // Make sure we are handling errors
    if (err) return res.apiError('database error', err);
    res.apiResponse({
      // Filter Test by 
      test: items
    }); // Using express req.query we can limit the number of recipes returned by setting a limit property in the link
    // This is handy if we want to speed up loading times once our recipe collection grows
  }).limit(Number(req.query.limit));
};
/**
 * Get test details by testId
 */


exports.details = function (req, res) {
  var id = req.params.testId;
  Test.model.findById(id).exec(function (err, test) {
    if (err) return res.apiError('database error', err);
    res.apiResponse({
      test: test
    });
  });
};
/**
 * Create Test
 */


exports.create =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(req, res) {
    var onSuccess, onError, requestsData, items;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            onSuccess = function onSuccess(items, data, requestsArray) {
              console.log('items', items);
              var testDetails = (0, _objectSpread2.default)({}, data, {
                testData: requestsArray
              });
              var newTest = new Test.model();
              newTest.getUpdateHandler(req).process(testDetails, function (err) {
                if (err) return res.apiError('error', err);
                res.apiResponse({
                  post: newTest
                });
              });
            };

            onError = function onError(err) {
              return console.log(err);
            };

            _context2.prev = 2;
            requestsData = JSON.parse(req.body.testData); // const requestsFromDb = [];

            _context2.next = 6;
            return requestsData.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(r) {
                var newRequest, reqDbId;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        newRequest = new Request.model();
                        reqDbId = '';
                        _context.next = 5;
                        return newRequest.getUpdateHandler(req).process(r, function (err) {
                          if (err) return res.apiError('error', err); // console.log(newRequest['_id']);

                          reqDbId = ((0, _readOnlyError2.default)("reqDbId"), newRequest['_id']);
                        });

                      case 5:
                        return _context.abrupt("return", reqDbId);

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](0);
                        console.error(_context.t0);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[0, 8]]);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 6:
            items = _context2.sent;
            console.log(items);
            onSuccess(items, req.body, items);
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            onError(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
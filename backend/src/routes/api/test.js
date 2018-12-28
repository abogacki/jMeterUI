var keystone = require('keystone');

/**
 * List Tests
 */

// Getting our test model
var Test = keystone.list('Test');
var Request = keystone.list('Request');

// Creating the API end point
exports.list = function (req, res) {
  // Querying the data this works similarly to the Mongo db.collection.find() method
  Test.model.find(function (err, items) {
    // Make sure we are handling errors
    if (err) return res.apiError('database error', err);
    res.apiResponse({
      // Filter Test by 
      test: items,
    });
    // Using express req.query we can limit the number of recipes returned by setting a limit property in the link
    // This is handy if we want to speed up loading times once our recipe collection grows
  }).limit(Number(req.query.limit));
};

/**
 * Get test details by testId
 */
exports.details = function (req, res) {
  const id = req.params.testId;

  Test.model.findById(id).exec(function (err, test) {
    if (err) return res.apiError('database error', err)
    res.apiResponse({
      test
    })
  })
}


/**
 * Create Test
 */

exports.create = async function (req, res) {

  const onSuccess = (items, data, requestsArray) => {
    console.log('items', items);

    const testDetails = { ...data,
      testData: requestsArray
    }
    const newTest = new Test.model();
    newTest.getUpdateHandler(req).process(testDetails, err => {
      if (err) return res.apiError('error', err);

      res.apiResponse({
        post: newTest
      });

    });
  }

  const onError = err => console.log(err);

  try {
    const requestsData = JSON.parse(req.body.testData)
    const items = await (requestsData.forEach(r => {

      const newRequest = new Request.model();
      const requestsFromDb = [];

      newRequest.getUpdateHandler(req).process(r, (err) => {
        if (err) return res.apiError('error', err)
        requestsFromDb.push(newRequest['_id']);
      });

    }));

    onSuccess(items, req.body, requestsFromDb)


  } catch (error) {
    onError(error)
  }
}
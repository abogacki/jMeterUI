var keystone = require('keystone');
var axios = require('axios');
var Test = keystone.list('Test');

// Creating the API end point
exports.list = function (req, res) {
  // Querying the data this works similarly to the Mongo db.collection.find() method
  Test.model.find((err, items) => {
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

exports.create = async (req, res) => {

  // on create success
  const onSuccess = (data, requestsArray) => {

    const testDetails = { ...data, testData: requestsArray }
    const newTest = new Test.model();

    newTest.getUpdateHandler(req).process(testDetails, err => {
      if (err) return res.apiError('error', err);

      res.apiResponse({
        post: newTest
      });

    });
  }



  try {

    const options = {
      url: '/request/create',
      method: 'post',
      baseURL: 'http://localhost:8080/api',
      data: {testData: req.body.testData},
      
    }
    let response = await axios(options)
    const testArray = response.data
    console.log('====================================');
    console.log(response.data);
    console.log('====================================');
    onSuccess(req.body, testArray)
  } catch (error) {
    console.log(error);
    
  }
}
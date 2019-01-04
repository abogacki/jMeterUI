var keystone = require('keystone');
var mongoose = require('mongoose');
var axios = require('axios');
var Test = keystone.list('Test');
var Request = keystone.list('Request');

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

exports.details = async (req, res) => {
  const id = req.params.testId;

  let test = await Test.model.findById(id).exec()

  let testData = await Request.model.find({
    '_id': {
      $in: test.testData.map(id => mongoose.Types.ObjectId(id))
    }
  })

  const updatedTest = { ...test, testData };

  res.apiResponse(updatedTest)
}

exports.getDetailsMany = async (req, res) => {
  try {
    const ids = JSON.parse(req.query.testIds)

    let tests = await Test.model.find({
      '_id': { $in: ids.map(id => mongoose.Types.ObjectId(id)) }
    });

    let updatedTests = await Promise.all(
      tests.map(async test => {

        const testData = await Request.model.find({
          '_id': {
            $in: test.testData.map(id => mongoose.Types.ObjectId(id))
          }
        })
        return { ...test, testData }
      }))

    res.apiResponse(updatedTests)

  } catch (error) {
    console.log(error);

  }
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
      data: { testData: req.body.testData },

    }
    let requestsCreateResponse = await axios(options)
    const testArray = requestsCreateResponse.data

    onSuccess(req.body, testArray)
  } catch (error) {
    apiError(error)

  }
}
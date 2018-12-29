const keystone = require('keystone');
const Request = keystone.list('Request');

/**
 * Create a Request data row
 */
exports.create = async (req, res) => {
	
	const requestArray = JSON.parse(req.body.testData);

	try {

		let newRequests = await Request.model.insertMany(requestArray)
		
		res.apiResponse(newRequests);
		
	} catch (error) {
		console.log(error);
	}


};



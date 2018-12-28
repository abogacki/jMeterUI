const keystone = require('keystone');
const Request = keystone.list('Request');

/**
 * Create a Request data row
 */
exports.create = function(req, res) {
	
    const newRequest = new Request.model();
    
	const data = (req.method == 'POST') ? req.body : req.query;
	
	newRequest.getUpdateHandler(req).process(data, err => {
        
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			newRequest
		});
		
	});
}
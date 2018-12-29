"use strict";

var keystone = require('keystone');

var importRoutes = keystone.importer(__dirname);
var routes = {
  api: importRoutes('./api')
}; // Export our app routes

exports = module.exports = function (app) {
  app.all('/api*', keystone.middleware.cors);
  app.post('/api/test/create', keystone.middleware.api, routes.api.test.create);
  app.get('/api/test/list', keystone.middleware.api, routes.api.test.list);
  app.get('/api/test/:testId', keystone.middleware.api, routes.api.test.details); // Set up the default app route to  http://localhost:3000/index.html

  app.get('/api/', function (req, res) {
    // Render some simple boilerplate html
    function renderFullPage() {
      // Note the div class name here, we will use that as a hook for our React code
      return "\n          <!doctype html>\n          <html>\n              <head>\n                  <title>Keystone With React And Redux</title>\n              </head>\n              <body>\n                      <div class=\"react-container\">\n                      <h1> Hello World </h1>\n                      </div>\n              </body>\n          </html>\n          ";
    } // Send the html boilerplate


    res.send(renderFullPage());
  });
};
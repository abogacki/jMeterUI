var keystone = require('keystone');

var importRoutes = keystone.importer(__dirname);

var routes = {
    api: importRoutes('./api'),
};

// Export our app routes
exports = module.exports = function (app) {
    app.all('/api*', keystone.middleware.cors);
    app.post('/api/test/create', keystone.middleware.api, routes.api.test.create)
    app.get('/api/test/list', keystone.middleware.api, routes.api.test.list);
    app.get('/api/test/detailList', keystone.middleware.api, routes.api.test.getDetailsMany);
    app.get('/api/test/:testId', keystone.middleware.api, routes.api.test.details);
    app.post('/api/request/create', keystone.middleware.api, routes.api.request.create)

    // Set up the default app route to  http://localhost:3000/index.html
    app.get('/api/', function (req, res) {
        // Render some simple boilerplate html
        function renderFullPage() {
            // Note the div class name here, we will use that as a hook for our React code
            return `
          <!doctype html>
          <html>
              <head>
                  <title>Keystone With React And Redux</title>
              </head>
              <body>
                      <div class="react-container">
                      <h1> Hello World </h1>
                      </div>
              </body>
          </html>
          `;
        }
        // Send the html boilerplate
        res.send(renderFullPage());
    });
};
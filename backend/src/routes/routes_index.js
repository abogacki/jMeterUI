var keystone = require('keystone');

// Export our app routes
exports = module.exports = function (app) {
    app.all('/api*', keystone.middleware.cors)

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
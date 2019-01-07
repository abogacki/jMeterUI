
//import keystone
var keystone = require('keystone');

// Set up our keystone instance
keystone.init({
  // The name of the KeystoneJS application
  'name': 'jmeterUi',
  'port': '8080',
  // Paths to our application static files
  'static': [],
  // Keystone includes an updates framework, 
  // which you can enable by setting the auto update option to true.
  // Updates provide an easy way to seed your database, 
  // transition data when your models change, 
  // or run transformation scripts against your database.
  'auto update': true,
  // The url for your MongoDB connection
  'mongo': 'mongodb://mongodb:27017/db',
  // 'mongo': 'mongodb://localhost:27017/jmeteruidb',
  // Whether to enable built-in authentication for Keystone's Admin UI,
  'auth': true,
  // The key of the Keystone List for users, required if auth is set to true
  'user model': 'User',
  // The encryption key to use for your cookies.
  'cookie secret': '6D61822FBEAED8635A4A52241FEC3',
});

// Allow CORS reequests
keystone.set('cors allow origin', true);

// Load your project's Models
keystone.import('./models');

// Add routes 
keystone.set('routes', require('./routes/routes_index'));

// Start Keystone
keystone.start()
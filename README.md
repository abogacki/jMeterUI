# jMeterUI

This application is an interface for Apache jMeter results saved in CSV.<br>
Technologies used:

*   docker
*   node.js
*   keystoneJS
*   react
*   redux
*   mongoDB

## Available Scripts

In the root directory, you can run:

### `docker-compose build`

Builds docker images for backend, frontend and db.

### `docker-compose up`

Runs the app in the development mode.

### `docker-compose up --build`

Builds and runs the app in development mode at once.

## How to use it?

- To upload new test, log in to your account, and upload file `.csv` file by clicking UPLOAD button. 
- Explore test results, calculate median, mode, percentiles and more in the stats tab
- Analyze response success rate and request time overview with charts
- Compare tests

## Admin

To log into admin account navigate to `localhost:8080/keystone/`. Log in with default credentials listed in Database User model section. Admin panel enables basic CRUD on every resource of the app (e.g. Test, Request).

## Application schema

Application uses Docker containers to serve three images with docker-compose.

![Alt text](docs/appSchema.png?raw=true "App Schema")

User interface layer is build with contenerized CreateReactApp project. It comunicates with Node.js server to obtain data, which is stored in Mongo database. The api is a KeystoneJS CMS, with Admin panel to manage content of the application.

## Database

Database contains three tables based on Mongoose ODM models (User, Test, Request). <br> 

### User
User model contains fields such as:
* name
* email
* password
* canAccessKeystone

Name, email and password field are obtained by registration process. The "canAccessKeystone" parameter is bool variable stored for validation purposes. User can access admin application, only if this parameter is set to true. For this application migration creates admin account with credentials: 

#### name: admin 
#### password: admin


### Test
Test table consists of: 
* user
* name
* createdAt
* file
* testData

User field stores Id from User table, which is automatically added by the backend application to Test when it is uploaded.
Name field represents the name of the `.csv` file used to upload the test. TestData field is an array of id's from Request table.

### Request
Request table contains:
* id
* IdleTime
* Latency
* allThreads
* bytes
* dataType
* elapsed
* failureMessage
* label
* responseCode
* responseMessage
* sentBytes
* success
* threadName
* timeStamp

The complete database schema has been presented below:

![Alt text](docs/dbSchema.png?raw=true "DB Schema")



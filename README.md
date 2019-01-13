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

## Application schema

Application uses Docker containers to serve three images with docker-compose.

![Alt text](docs/appSchema.png?raw=true "Title")

User interface layer is build with contenerized CreateReactApp project. It comunicates with Node.js server to obtain data, which is stored in Mongo database.

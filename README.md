# Performance-api

This repository developed by nodeJS with MongoDB as database program and able to consume by any kind of clients.
Basically consist of 2 endpoints. One of them being used to store the performance metrics and the other retrieve them so on.

# Project Folder Structure

Here is the folder structure of the project.

    controllers
    ├──metricController.js
    models
    ├──metricModel.js
    routes
    ├──metricRoutes.js
    test
    |--get-metrics-api.test.js
    |--store-metrics-api.test.js
    traits
    ├──httpTrait.js
    requests
    ├──metrics
        ├──createMetricsValidations.js
        ├──getMetricsValidations.js
    app.js
    server.js
    config.env
    package.json

## Steps for read and write access (recommended)

#### Step-1 / Install npm packages.

```
npm install
```

#### Step-2 / Set up your environment.

```
PORT=XXXX
DB=YOUR_MONGO_DB_CONNECTION_SCRING // do not forget to change your password wih `<PASSOWRD> variable .`
DB_PASSWORD=YOUR_MONGO_DB_PASSWORD
```

#### Step-3 / Start server.

```
npm start //development mode
npm start:prod //production mode
```

### Available Scripts

In the project directory, you can run:

```
npm install
```

Install necessary packages. You need to run this script only once.

```
npm start
```

Runs the app in the development mode. Watches your changes. \
Open [http://localhost:4444](http://localhost:4444) to view project in the browser.

```
npm test
```

Runs a predefined tests of the project. \
Results will shown on the console.

# K6 RPS test.

![Screen Shot 2021-05-09 at 12 26 00 AM](https://user-images.githubusercontent.com/82615231/117569777-047e3c00-b0d0-11eb-8d38-931815a04b58.png)

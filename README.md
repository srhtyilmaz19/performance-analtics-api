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

![Screen Shot 2021-05-10 at 4 12 24 AM](https://user-images.githubusercontent.com/82615231/117595231-eacd0b00-b148-11eb-8cd1-e64b3148bfd7.png)

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

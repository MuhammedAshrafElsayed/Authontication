'use strict';

const express = require('express');
const app = require('./src/app');
const mongoose = require('mongoose');
const server = express();


    server.use(app);
    const port = process.env.PORT || 3000;
    server.listen(port, async () => {
      console.log('Server Started On PORT', port);
      try {
        console.log('trying to connect to', process.env.MONGODB_URI);
        mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/identityDB" , { useNewUrlParser: true });
      } catch (error) {
        console.log('error happened while trying to connect to mongodb', error);
      }
    });
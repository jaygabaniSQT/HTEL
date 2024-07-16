const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');

const app = express();
const bodyParser = require('body-parser');
const route = require('./src/routes/route');

require('./config/db');

// Determine the environment
console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
const environment = process.env.NODE_ENV || 'development';

// Build the path to the appropriate .env file
const envFilePath = `.env.${environment}`;

console.log('env: ' + envFilePath);

//require('dotenv').config();
// Load the environment variables from the appropriate file
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  console.log(
    `app.js - Using ${envFilePath} file to supply config environment variables`,
  );
} else {
  console.error(`app.js - No ${envFilePath} file found`);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(route);

app.use((req, res, next) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send({ status_code: 0, message: 'something went wrong',data:{} });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

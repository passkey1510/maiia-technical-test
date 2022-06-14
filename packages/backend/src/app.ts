import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import cors from 'cors';
import * as apiController from './controllers/api';
// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3333);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getPractitioner', apiController.getPractitioner);

export default app;

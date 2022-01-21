const awsServerlessExpress = require('aws-serverless-express');
import app from './index'
const server = awsServerlessExpress.createServer(app)
module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);
import { format } from "winston";
var winston = require('winston');
require('winston-daily-rotate-file');

var blogInfoLog = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'blog-info-%DATE%.log',
  dirname: './src/dailylog/blog-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var blogErrorLog = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'blog-error-%DATE%.log',
  dirname: './src/dailylog/blog-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var blogInfoLogger = winston.createLogger({
  level: 'info',
  transports: [
    blogInfoLog
  ]
});
var blogErrorLogger = winston.createLogger({
  transports: [
    blogErrorLog
  ]
});



var userInfoLog = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'user-info-%DATE%.log',
  dirname: './src/dailylog/user-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userErrorLog = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'user-error-%DATE%.log',
  dirname: './src/dailylog/user-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userInfoLogger = winston.createLogger({
  level: 'info',
  transports: [
    userInfoLog
  ]
});
var userErrorLogger = winston.createLogger({
  transports: [
    userErrorLog
  ]
});

module.exports = { blogInfoLogger, blogErrorLogger, userInfoLogger, userErrorLogger }
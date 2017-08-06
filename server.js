#!/usr/bin/env node

const express = require('express');
const epf = require('express-php-fpm');
const ehm = require('express-htaccess-middleware');
const path = require('path');
const socketactivation = require('systemd-socket');
const yargs = require('yargs');

const argv = yargs.demand(1).argv;

const app = express();

app.use(ehm({
  file: path.resolve(argv._[0], '.htaccess'),
  watch: true
}))

app.use(epf({
  documentRoot: path.resolve(argv._[0]),
  env: {},
  socketOptions: { port: 9000 }
}));

app.listen(socketactivation() || process.env.PORT || 8080);

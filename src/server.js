const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const CookieAuth = require('hapi-auth-cookie'); //rm


const routes = require('./routes.js');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Vision, Inert, CookieAuth], (err) => {
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'optional', {   //rm
    password: 'datagangrulesokdatagangrulesokdatagangrulesok',
    cookie: 'cookie-name',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000
  });

  server.views({
    engines: { html: Handlebars },
    path: './src/views',
    layoutPath: './src/views/layout',
    layout: 'index'
  });

  server.route(routes);
});

module.exports = server;

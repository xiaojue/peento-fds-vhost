var bouncy = require('bouncy');
module.exports = function(ns) {
  var portServer = null;

  var bouncyServer = {
    set: function(domain, port, path, openOnlineProxy) {
      ns('vhost.config').set(domain, {
        port: port,
        path: path,
        openOnlineProxy: openOnlineProxy
      });
    },
    unset: function(domain) {
      ns('vhost.config').remove(domain);
    },
    start: function(cb) {
      if (!portServer) {
        portServer = bouncy(function(req, res, bounce) {
          var config = ns('vhost.config');
          var port = config.get([req.headers.host]);
          if (port) {
            bounce(port);
          } else {
            res.statusCode = 500;
            res.end("no such host");
          }
        });
        portServer.on('error', function() {
          debug(err);
        });
        portServer.on('listening', cb);
        portServer.listen(ns('fdsConfig').webPort);
      }
    }
  };

  ns('bouncy', bouncyServer);

};


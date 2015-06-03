var nodeStatic = require('node-static').Server;
var http = require('http');
var lodash = require('lodash');
var getPort = require('get-port');
var fs = require('fs');
var async = require('async');
var os = require('os');
var sys = os.platform();

module.exports = function(ns, debug) {
  var config = ns('vhost.config');
  var bouncy = ns('bouncy');
  var serverList = [];
  var statics = [];
  var staticsSockets = [];

  var vhosts = {
    add: function(domain, path, openOnlineProxy, cb) {
      var self = this;
      getPort(function(err, port) {
        if (err) cb(err);
        else {
          bouncy.set(domain, port, path, openOnlineProxy);
          var server = {
            domain:domain,
            port: port,
            path: path,
            openOnlineProxy: openOnlineProxy
          };
          serverList.push(server);
          console.log(port);
          self.restart(cb);
        }
      });
    },
    remove: function(domain, cb) {
      lodash.remove(serverList,function(item){
        return item = domain; 
      });
      bouncy.unset(domain);
      this.restart(cb);
    },
    start: function(cb) {
      debug('start vhost');
      if (serverList.length) {
        async.each(serverList, function(item, callback) {
          var path = item.path,
          port = item.port,
          openOnlineProxy = item.openOnlineProxy,
          domain = item.domain;
          if (path && fs.existsSync(path)) {
            if (sys === 'win32') path = path.toLowerCase();
            var fileServer = new nodeStatic(path, {
              cache: 3600,
              gzip: true
            });
            var httpServer = http.createServer(function(req, res) {
              process.on('uncaughtException', function(err) {
                res.writeHeader(500, {
                  'content-type': 'text/html'
                });
                res.end(err.toString());
              });
              req.addListener('end', function() {
                fileServer.serve(req, res);
              }).resume();
            });
            httpServer.on('error', function(err) {
              debug(err);
            });
            httpServer.on('connection', function(socket) {
              staticsSockets.push(socket);
              socket.on('close', function() {
                staticsSockets.splice(staticsSockets.indexOf(socket), 1);
              });
            });
            statics.push(httpServer);
            //设置域名
            httpServer.listen(port, callback);
          } else {
            debug(path + ' 不存在');
            callback();
          }
        },
        cb);
      } else {
        cb();
      }
    },
    restart: function(cb) {
      var self = this;
      async.series([function(cb) {
        self.stop(cb);
      },
      function(cb) {
        self.start(cb);
      }], cb);
    },
    stop: function(cb) {
      debug('stop vhost');
      if (serverList.length) {
        async.each(statics, function(server, callback) {
          staticsSockets.forEach(function(socket) {
            socket.destroy();
          });
          staticsSockets = [];
          server.close(callback);
        },
        function() {
          statics = [];
          cb();
        });
      } else {
        cb();
      }
    }
  };
  ns('vhostManager', vhosts);
};


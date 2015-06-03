var config = require('../config');
module.exports = function(ns, plugin, debug) {
  plugin.load(__dirname);
  var app = ns('app');
  app.once('start', function() {

    var nav = ns('nav', []);

    app.call('nav.add', [{
      url: '/vhost',
      title: 'vhost'
    }], function() {
      console.log('vhost nav seted');
    });

    require('./lib/config')(ns, debug);
    require('./lib/bouncy')(ns, debug);
    require('./lib/vhosts')(ns, debug);

    var bouncyServer = ns('bouncy');
    var vhosts = ns('vhostManager');

    bouncyServer.init(config.webPort);

    bouncyServer.start(function() {
      console.log('bouncyServer start');
    });

    vhosts.add('www.abc.com','/Users/chenchen/fuqiang/dev/peento-fds/',true,function(){
      console.log('add abc'); 
    });
  });
};

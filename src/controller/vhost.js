module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        var vhosts = ns('vhostManager');
        var serverList = vhosts.getServerList();
        res.render('vhost',{
          serverList:serverList
        });
    }
  });
  return controller;
};

module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        var vhosts = ns('vhostManager');
        var serverList = vhosts.getServerList();
        res.setLocals('serverList',serverList);
        res.render('vhost');
    }
  });
  return controller;
};

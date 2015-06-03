module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        var vhosts = ns('vhostManager');
        res.render('vhost');
    }
  });
  return controller;
};

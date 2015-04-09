module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        res.render('vhost');
    }
  });
  return controller;
};

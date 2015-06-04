module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        var body = req.body,
            domain = body.domain;
        var vhosts = ns('vhostManager');
        vhosts.remove(domain,function(err){
          var list = vhosts.getServerList();
          if(err){
            res.json({err:err,result:list});
          }else{
            res.json({result:list});
          }
        });
    }
  });
  return controller;
};

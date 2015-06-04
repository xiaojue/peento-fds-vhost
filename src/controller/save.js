module.exports = function(ns, createController, debug) {
  var app = ns('app');
  var controller = createController({
    'name': 'vhost',
    'public': function(params, req, res, next) {
        var body = req.body,
        domain = body.domain,
        path = body.path;
        var vhosts = ns('vhostManager');
        vhosts.add(domain,path,true,function(err){
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

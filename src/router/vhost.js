module.exports = function(ns, router) {
  router.get('/vhost', function(req, res, next) {
    ns('controller.vhost').process({},req,res,next);
  });

  router.post('/vhost/save', function(req, res, next) {
    ns('controller.save').process({},req,res,next);
  });

  router.post('/vhost/delete', function(req, res, next) {
    ns('controller.delete').process({},req,res,next);
  });

  router.post('/vhost/edit', function(req, res, next) {
    ns('controller.edit').process({},req,res,next);
  });
};

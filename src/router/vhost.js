module.exports = function(ns, router) {
  router.get('/vhost', function(req, res, next) {
    ns('controller.vhost').process({},req,res,next);
  });
};

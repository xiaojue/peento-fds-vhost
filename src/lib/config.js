module.exports = function(ns){
  var configManager = ns('configManager');
  ns('vhost.config',new configManager('vhost'));
};

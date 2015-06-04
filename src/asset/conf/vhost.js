/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20150604
 * @fileoverview angular重写fds
 */
lithe.use(['$','angular','switch'], function($,angular) {
  var vhost = angular.module('vhost', []).config(['$interpolateProvider',function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  }]);
  vhost.directive('switch',function(){
    return {
      restrict:'A',
      link:function(scope,element,attrs){
        scope.$evalAsync(function(){
          $(element).wrap('<div class="switch">').parent().bootstrapSwitch();
        });
      }
    }; 
  });
  vhost.controller('vhostTable', ['$scope','$http','$window', function($scope,$http,$window) {
    $scope.serverList = $window.serverList;
    $scope.showNewline = false;
    $scope.create = function() {
      $scope.showNewline = true;
    };
    $scope.cancel = function() {
      $scope.showNewline = false;
      $scope.domain = "";
      $scope.path = "";
    };
    $scope['delete'] = function(domain) {
      $http.post('/vhost/delete',{
        domain:domain
      }).success(function(data,status,headers,config){
        console.log(data); 
      });
    };
    $scope.save = function() {
      $http.post('/vhost/save',{
        domain:$scope.domain,
        path:$scope.path
      }).success(function(data,status,headers,config){
        console.log(data); 
      });
    };
  }]);
});


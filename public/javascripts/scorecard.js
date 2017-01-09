var app = angular.module('Scorecard', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-score', {
            templateUrl: 'partials/score-form.html',
            controller: 'AddScoreCtrl'
        })
        .when('/score/:id', {
       templateUrl: 'partials/score-form.html',
       controller: 'EditScoreCtrl'
        })
        .when('/score/delete/:id', {
        templateUrl: 'partials/score-delete.html',
        controller: 'DeleteScoreCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
      var Scores = $resource('/api/scores');
        Scores.query(function(scores){
            $scope.scores = scores;
        });
    }]);

    app.controller('AddScoreCtrl', ['$scope', '$resource', '$location',
      function($scope, $resource, $location){
          $scope.save = function(){
              var Scores = $resource('/api/scores');
              Scores.save($scope.score, function(){
                  $location.path('/');
              });
        };
    }]);

    app.controller('EditScoreCtrl', ['$scope', '$resource', '$location', '$routeParams',
        function($scope, $resource, $location, $routeParams){
            var Scores = $resource('/api/scores/:id', { id: '@_id' }, {
                update: { method: 'PUT' }
            });

            Scores.get({ id: $routeParams.id }, function(score){
                $scope.score = score;
            });

            $scope.save = function(){
                Scores.update($scope.score, function(){
                    $location.path('/');
                });
            }
        }]);

    app.controller('DeleteScoreCtrl', ['$scope', '$resource', '$location', '$routeParams',
        function($scope, $resource, $location, $routeParams){
            var Scores = $resource('/api/scores/:id');

            Scores.get({ id: $routeParams.id }, function(score){
                $scope.score = score;
            })

            $scope.delete = function(){
                Scores.delete({ id: $routeParams.id }, function(score){
                    $location.path('/');
                });
            }
      }]);

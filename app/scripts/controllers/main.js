'use strict';

var myModule = angular.module('angularjsApp');


/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
  myModule.controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });

myModule.controller('adultController', function($scope){
  $scope.age = 0;
  $scope.majorOrMinorText = function(){
    return ($scope.age >= 18) ? "major" : "minor";
  };
});

myModule.controller('hideOrDisplayController', function($scope){
  $scope.showContent = true;
});

myModule.controller('helloWorldController', function($scope){
  $scope.name = "Sinan";

});


myModule.controller("calculateController", function($scope){
  $scope.articles = [{
    "name":"iPhone",
    "quantity":1,
    "price":30
  },{
    "name":"OnePlus",
    "quantity":1,
    "price":29.99
  }]

  $scope.total = function(){
    var total = 0;

    for(var i = 0; i < $scope.articles.length; i++){
      total += $scope.articles[i].price * $scope.articles[i].quantity;
    }

    return total;
  };

  function calculateDiscount(newValue, oldValue, scope){
    $scope.discount = (newValue > 100) ? newValue * 0.10 : 0;
  };

  $scope.finalTotal = function(){
    return $scope.total() - $scope.discount;
  }

  $scope.$watch($scope.total, calculateDiscount);
});


myModule.controller("myTestController", function($scope){
  $scope.title = "Title";
  $scope.text = "Content";
});

myModule.controller("SecondController", function($scope){
  $scope.expanders = [
      {title: 'Title 1',
       text: 'Content 1'},
      {title: 'Title 2',
       text: 'Content 2'},
      {title: 'Title 3',
       text: 'Content 3'}
  ];
});

myModule.directive("accordion", function(){
  return{
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: "<div ng-transclude></div>",
      controller: function(){
          var expanders = [];
          this.gotOpened = function(selectedExpander){
              expanders.forEach(function(expander){
                  // When an expander is selected the others are closed
                  if(selectedExpander != expander){
                      expander.showMe = false;
                  }
              });
          };
          this.addExpander = function(expander){
              expanders.push(expander);
          };
      }
  };
});

// restrict : 'EA' allows use to use <expander> tag in HTML file
/*replace, transclude and template works together and tells Angular that we want to replace expander directive with our template
  and that the content of the current expander tag (i.e. {{text}}) would be found where we specified 'ng-transclude' in HTML */
myModule.directive("expander", function(){
  return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^?accordion', //require here specifies that the expander directive needs the accordion directive
      scope: {title: '=expanderTitle'},
      template: '<div>' +
      '<div class="title" ng-click="toggle()">{{title}}</div>' +
      '<div class="body" ng-show="showMe" ng-transclude></div>' +
      '</div>',
      link: function(scope, element, attrs, accordionController){
          scope.showMe = false;
          accordionController.addExpander(scope);
          scope.toggle = function toggle(){
              scope.showMe = !scope.showMe;
              accordionController.gotOpened(scope);
          };
      }
  };
});


myModule.filter('reverse', function(){
  return function(input, uppercase) {
    input = input || '';
    var out = "";
    for(var i = 0; i < input.length; i++){
      out = input.charAt(i) + out;
    }
    if(uppercase){
      out = out.toUpperCase();
    }
    return out;
  };
});

myModule.controller('myFilter', function($scope){
  $scope.greeting = 'hello';
});

angular.module('portalApp')
    .controller('degTraceCtrl', ['$scope', function($scope, $http) {

        // mock data
        $scope.items = [{
            title: "hi",
            tags: ['tag A', 'tag B', 'tag C'],
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }];

        // Show main view in the first column as soon as controller loads
        $scope.portalHelpers.showView('degTraceMain.html', 1);

        // This function gets called when user clicks an item in the list
        $scope.showDetails = function(item) {
            // Make the item that user clicked available to the template
            $scope.detailsItem = item;
            $scope.portalHelpers.showView('degTraceDetails.html', 2);
        }

        
        //$scope.fetch()
		var myCourses = new Object(); //store own courses
        myCourses[0] = "CS/137";
        var courseData = new Object();
        function fetch() {
            $http.get("https://api.uwaterloo.ca/v2/courses/" + myCourses[0] + "/prerequisites.json/?key=152d64003d18c172c4d33ac35f42c28e")
                .then(function(response) {
                    $scope.details = response.data;
                });
        }

    }]);
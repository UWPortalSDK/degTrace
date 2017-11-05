angular.module('portalApp')
    .controller('degTraceCtrl', ['$scope', function($scope, $http) {

        $scope.first = 10;

        var myCourses = new Object(); //store own courses
        myCourses[0] = "CS/137";
        var courseData = new Object();

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

        function fetch() {
            $http.get("https://api.uwaterloo.ca/v2/courses/" + myCourses[0] + "/prerequisites.json/?key=152d64003d18c172c4d33ac35f42c28e")
                .then(function(response) {
                    $scope.details = response.data;
                });
        }

    }]);

/*


$http.post("/Develop/GetProxy", {
    url: "https://api.uwaterloo.ca/v2/key=152d64003d18c172c4d33ac35f42c28e"
}).success(function(response) {
    for (var k in myCourses) {
        courseData[k] = GET / courses / myCourses[k] / prerequisites.json
        $.getJSON(courseData[k], {
            subject: ,
            catalog_number: ,
            title: ,
            prerequisites: ,
            prerequisites_parsed:
        })
    }
});*/



/* G A R B A G E (probably)
        $http({
            method: 'GET',
            url: 'https://api.uwaterloo.ca/v2/courses/CS/137/prerequisites.json'
        }).then(function successCallback(response) {
            $scope.courseData[0] = response;
            window.alert(courseData[0]);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });*/
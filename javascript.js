angular.module('portalApp')
    .controller('degTraceCtrl', ['$scope', '$http', '$q', 'sampleOpenDataFactory', function($scope, $http, $q, sampleOpenDataFactory) {

        // Import variables and functions from service
        $scope.loading = sampleOpenDataFactory.loading;
        $scope.openDataExampleData = sampleOpenDataFactory.openDataExampleData;
        $scope.mockDataExampleData = sampleOpenDataFactory.mockDataExampleData;

        // initialize the service
        sampleOpenDataFactory.init($scope);

        // watch for changes in the loading variable
        $scope.$watch('loading.value', function() {
            // if loading
            if ($scope.loading.value) {
                // show loading screen in the first column, and don't append it to browser history
                $scope.portalHelpers.showView('loading.html', 1, false);
                // show loading animation in place of menu button
                $scope.portalHelpers.toggleLoading(true);
            } else {
                $scope.portalHelpers.showView('degTraceMain.html', 1);
                $scope.portalHelpers.toggleLoading(false);
            }
        });


        // Import variables and functions from service
        $scope.studentData = {};

        // Call server to fetch student data
        $scope.portalHelpers.invokeServerFunction({
                functionName: 'getData',
                uniqueNameId: 'sampleStudentData'
            })
            .then(function(result) {
                $scope.studentData = result;
                console.log(result);
            });

        $scope.numCoursesRequired = 40;
        $scope.numCoreCourses = 20;
        $scope.numBreadthCourses = 20;
        $scope.numCoreTaken = 10;
        $scope.numBreadthTaken = 15;
        $scope.first = Math.floor(+$scope.numCoreTaken / +$scope.numCoreCourses * (+$scope.numCoreCourses / +$scope.numCoursesRequired) * 100);
        $scope.second = Math.floor(+$scope.numBreadthTaken / +$scope.numBreadthCourses * (+$scope.numBreadthCourses / +$scope.numCoursesRequired) * 100);
        $scope.third = 100 - +$scope.first - +$scope.second;
        //alert($scope.first); //Core completed
        //alert($scope.second); //Breadth completed
        //alert($scope.third); // Remainder

    }])

    // Factory maintains the state of the widget
    .factory('sampleOpenDataFactory', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {
        var initialized = {
            value: false
        };

        // Your variable declarations
        var loading = {
            value: true
        };
        var openDataExampleData = {
            value: null
        };
        var mockDataExampleData = {
            value: null
        };

        var sourcesLoaded = 0;

        var init = function($scope) {
            if (initialized.value)
                return;
            initialized.value = true;

            // Place your init code here:

            // OPEN DATA API EXAMPLE
            $scope.portalHelpers.invokeServerFunction({
                functionName: 'getOpenData',
                uniqueNameId: 'sampleOpenData'
            }).then(function(result) {
                console.log('getopendata data: ', result);
                openDataExampleData.value = result.data;
                sourceLoaded();
            });

            // MOCK DATA API EXAMPLE
            $scope.portalHelpers.invokeServerFunction({
                functionName: 'getMockData',
                uniqueNameId: 'sampleOpenData'
            }).then(function(result) {
                console.log('getmockdata data: ', result);
                mockDataExampleData.value = result.data;
                sourceLoaded();
            });

        };

        function sourceLoaded() {
            sourcesLoaded++;
            if (sourcesLoaded > 1)
                loading.value = false;
        }

        return {
            init: init,
            loading: loading,
            openDataExampleData: openDataExampleData,
            mockDataExampleData: mockDataExampleData
        };

    }]);
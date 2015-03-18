angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope'];

    function nurseController($scope) {

        // Test Data
        $scope.planned = [
            { beginTime: 1230,
              endTime: 1430 },
            { beginTime: 0930,
              endTime: 1100 }
        ];
    };
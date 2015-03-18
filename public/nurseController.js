angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope', '$http'];

    function nurseController($scope, $http) {

        
        // GET request to retrieve nurse and schedules
        var username = "starlord55";
        $http({
            url: "/api/nurses",
            method: "GET",
            params: { username: username }
        }).success(function(data, status, headers, config) {
            console.log(data);
            var userData = data;
            $scope.planned      = userData.schedules;
        });


        // PUT to update nurse object with new schedules
        




        // Test Data
        // $scope.planned = [
        //     { beginTime: 1230,
        //       endTime: 1430 },
        //     { beginTime: 0930,
        //       endTime: 1100 }
        // ];

        // Time of day
        $scope.timeOfDay = ["AM", "PM"];

        // Hours Options
        $scope.hours = [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 },
            { label: '11', value: 11},
            { label: '12', value: 12 },
        ];

        $scope.minutes = [
            { label: '00', value: 0 },
            { label: '15', value: 15 },
            { label: '30', value: 30 },
            { label: '45', value: 45 },
        ];
    };
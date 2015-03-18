angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope', '$http', 'timeOptions'];

    function nurseController($scope, $http, timeOptions) {
        var timeOptions     = new timeOptions();
        $scope.timeOfDay    = timeOptions.timeOfDay;
        $scope.hours        = timeOptions.hours;
        $scope.minutes      = timeOptions.minutes;

        // Set default values on dropdown options
        $scope.startTimeOfDay   = $scope.timeOfDay[0];
        $scope.startHour        = $scope.hours[8];
        $scope.startMinute      = $scope.minutes[0];
        
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


        $scope.addToSchedule = function() {

            var beginTime   = timeOptions.convertTimeToMilitary($scope.startTimeOfDay, $scope.startHour.value, $scope.startMinute.value);
            var endTime     = timeOptions.convertTimeToMilitary($scope.endTimeOfDay, $scope.endHour.value, $scope.endMinute.value);
            console.log(beginTime);
            console.log(endTime);

            // Package data
            var addSchedule = {
                beginTime: beginTime,
                endTime: endTime
                // ,
                // date: 
            };

            console.log(addSchedule); 

            // PUT to update nurse object with new schedules
            $http({
                url: '/api/nurses',
                method: "PUT",
                data: { 
                    username: "starlord55",
                    schedule: addSchedule 
                }
            }).success(function(data, status, headers, config) {
                console.log('success', data);
                // add to list on front end
                // reseut values
            });
        };




        // Test Data
        // $scope.planned = [
        //     { beginTime: 1230,
        //       endTime: 1430 },
        //     { beginTime: 0930,
        //       endTime: 1100 }
        // ];


    };
angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope', '$http', 'timeOptions'];

    function nurseController($scope, $http, timeOptions) {
        // Time Related Constants and Functions
        var timeOptions     = new timeOptions();
        $scope.convertDate  = timeOptions.convertDate;
        $scope.timeOfDay    = timeOptions.timeOfDay;
        $scope.hours        = timeOptions.hours;
        $scope.minutes      = timeOptions.minutes;
        $scope.month        = timeOptions.month;
        $scope.day          = timeOptions.day;
        $scope.year         = timeOptions.year;

        // Set default values on dropdown options
        $scope.startTimeOfDay   = $scope.timeOfDay[0];
        $scope.startHour        = $scope.hours[8];
        $scope.startMinute      = $scope.minutes[0];
        $scope.startYear        = $scope.year[0];
        
        // GET request to retrieve nurse and schedules
        var username = "starlord55";
        $http({
            url: "/api/nurses",
            method: "GET",
            params: { username: username }
        }).success(function(data, status, headers, config) {

            var userData = data;
            $scope.planned      = userData.schedules;

        });

        $scope.addToSchedule = function() {

            var beginTime   = timeOptions.convertTimeToMilitary($scope.startTimeOfDay, $scope.startHour.value, $scope.startMinute.value);
            var endTime     = timeOptions.convertTimeToMilitary($scope.endTimeOfDay, $scope.endHour.value, $scope.endMinute.value);

            var date        = new Date($scope.startYear.value, $scope.startMonth.value, $scope.startDay.value)

            // Package data
            var addSchedule = {
                beginTime: beginTime,
                endTime: endTime,
                date: date
            };

            // PUT request to update nurse object with new schedules
            $http({
                url: '/api/nurses',
                method: "PUT",
                data: { 
                    username: "starlord55",
                    schedule: addSchedule 
                }
            }).success(function(data, status, headers, config) {
                console.log('success', data);

                addSchedule._id = data.id;
                $scope.planned.push(addSchedule);

                
            });
        }; // End of addToSchedule()

        $scope.deleteSchedule = function(id, index) {
            console.log(index,id);
            $http({
                url: '/api/nurses/schedule',
                method: "DELETE",
                params: {
                    username: "starlord55",
                    scheduleID: id
                }
            }).success(function(data, status, headers, config) {
                $scope.planned.splice(index, 1);
            });


        }; // End of deleteSchedule

    }; // End of nurseController
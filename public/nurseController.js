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
        var nullifyOptions  = nullifyOptions;
        setDefaultOptions();

        $scope.username     = null;
        $scope.showLogin    = true;
        $scope.errorMsg     = null;

        $scope.getUser     = function() {
            $http({
                url: "/api/nurses",
                method: "GET",
                params: { username: $scope.username }
            }).success(function(data, status, headers, config) {
                if(data !== null) {
                    $scope.name         = data.name
                    $scope.planned      = data.schedules;
                    $scope.showLogin    = false;
                }
                else {
                    $scope.username = null;
                }
            });
        }; // End of getUser


        $scope.addToSchedule = function() {
            try{
                if( !$scope.startTimeOfDay && !$scope.endTimeOfDay) {
                    throw "error"
                }

                var beginTime   = timeOptions.convertTimeToMilitary($scope.startTimeOfDay, $scope.startHour.value, $scope.startMinute.value);
                var endTime     = timeOptions.convertTimeToMilitary($scope.endTimeOfDay, $scope.endHour.value, $scope.endMinute.value);

                var date        = new Date($scope.startYear.value, $scope.startMonth.value, $scope.startDay.value);
                
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
                        username: $scope.username,
                        schedule: addSchedule 
                    }
                }).success(function(data, status, headers, config) {
                    addSchedule._id = data.id;
                    $scope.planned.push(addSchedule);
                    setDefaultOptions();
                    $scope.errorMsg = null;
                });
            }
            catch(err) {
                $scope.errorMsg = "Something is missing!";
            }

        }; // End of addToSchedule()

        $scope.deleteSchedule = function(id, index) {
            $http({
                url: '/api/nurses/schedule',
                method: "DELETE",
                params: {
                    username: $scope.username,
                    scheduleID: id
                }
            }).success(function(data, status, headers, config) {
                $scope.planned.splice(index, 1);
            });
        }; // End of deleteSchedule


        function setDefaultOptions() {
            $scope.startTimeOfDay   = $scope.timeOfDay[0];
            $scope.startHour        = $scope.hours[8];
            $scope.startMinute      = $scope.minutes[0];
            $scope.endTimeOfDay     = null;
            $scope.endHour          = null;
            $scope.endMinute        = null;
            $scope.startMonth       = null;
            $scope.startDay         = null;
            $scope.startYear        = $scope.year[0];
        }

    }; // End of nurseController
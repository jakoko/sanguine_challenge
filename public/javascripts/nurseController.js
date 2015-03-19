angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope', '$http', 'timeOptions'];

    function nurseController($scope, $http, timeOptions) {
        // Time Related Constants and Functions from timeOptions factory
        var timeOptions     = new timeOptions();
        $scope.convertDate  = timeOptions.convertDate;
        $scope.convertTimeToStandard  = timeOptions.convertTimeToStandard;
        $scope.timeOfDay    = timeOptions.timeOfDay;
        $scope.hours        = timeOptions.hours;
        $scope.minutes      = timeOptions.minutes;
        $scope.month        = timeOptions.month;
        $scope.day          = timeOptions.day;
        $scope.year         = timeOptions.year;
        var nullifyOptions  = nullifyOptions;

        // Initialize values on load
        setDefaultOptions();
        $scope.username     = null;
        $scope.showLogin    = true;
        $scope.errorMsg     = null;

        // Functions for API calls
        $scope.getUser          = getUser;
        $scope.addToSchedule    = addToSchedule;
        $scope.deleteSchedule   = deleteSchedule;

        /****************************
        * Functions Used
        ****************************/
        function getUser() {
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
            }).error(function(data, status, headers, config) {
                console.log("The GET request saw an error.")
            });
        }; // End of getUser

        function addToSchedule() {
            try{
                // Ensure time of day has been selected
                if($scope.startTimeOfDay === null || $scope.endTimeOfDay === null) {
                    throw "error"
                }

                var beginTime   = timeOptions
                                        .convertTimeToMilitary($scope.startTimeOfDay, $scope.startHour.value, $scope.startMinute.value);
                var endTime     = timeOptions
                                        .convertTimeToMilitary($scope.endTimeOfDay, $scope.endHour.value, $scope.endMinute.value);
                var date        = new Date($scope.startYear.value, $scope.startMonth.value, $scope.startDay.value);

                if(parseInt(beginTime) >= parseInt(endTime)) {
                    throw "1"
                }
                
                // Package data to create Schedule collection on server
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
                    // Use id from server to update view
                    addSchedule._id = data.id;
                    $scope.planned.push(addSchedule);

                    // Set values to default
                    setDefaultOptions();
                    $scope.errorMsg = null;
                }).error(function(data, status, headers, config) {
                    console.log("The PUT request saw an error.")
                });
            }
            catch(err) {
                if(err === "1")
                    $scope.errorMsg = "The start time is later than the end time!";
                else 
                    $scope.errorMsg = "Something is missing!";
            }
        }; // End of addToSchedule()

        function deleteSchedule(id, index) {
            $http({
                url: '/api/nurses',
                method: "DELETE",
                params: {
                    username: $scope.username,
                    scheduleID: id
                }
            }).success(function(data, status, headers, config) {
                $scope.planned.splice(index, 1);  // delete from view
            }).error(function(data, status, headers, config) {
                console.log("The DELETE request saw an error.")
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
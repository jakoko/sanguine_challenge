angular.module('nurseApp')
    .controller('nurseController', nurseController);

    nurseController.$inject = ['$scope', '$http'];

    function nurseController($scope, $http) {
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

        var convertTimeToMilitary = function(time, hour, minute) {
            var militaryTime = "";

            // Convert minute
            if(minute === 0) 
                militaryTime = militaryTime + "00";
            else
                militaryTime = militaryTime + minute.toString();

            // Covert hour
            if(time === "AM")
                militaryTime = hour.toString() + militaryTime;
            else if(time === "PM")
                militaryTime = (hour + 12).toString() + militaryTime

            return militaryTime;
        };




        $scope.addToSchedule = function() {

            var beginTime   = convertTimeToMilitary($scope.startTimeOfDay, $scope.startHour.value, $scope.startMinute.value);
            var endTime     = convertTimeToMilitary($scope.endTimeOfDay, $scope.endHour.value, $scope.endMinute.value);
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
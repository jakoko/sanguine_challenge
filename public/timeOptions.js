angular
    .module("nurseApp")
    .factory("timeOptions", timeOptionsFunc)

function timeOptionsFunc() {

    var timeOptions = function() {
        this.timeOfDay = ["AM", "PM"];

        // Hours Options
        this.hours = [
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

        this.minutes = [
            { label: '00', value: 0 },
            { label: '15', value: 15 },
            { label: '30', value: 30 },
            { label: '45', value: 45 },
        ];

        this.convertTimeToMilitary = function(time, hour, minute) {
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
    }

    return timeOptions;
};
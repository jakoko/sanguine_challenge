angular
    .module("nurseApp")
    .factory("timeOptions", timeOptionsFunc)

function timeOptionsFunc() {

    var timeOptions = function() {
        this.timeOfDay = ["AM", "PM"];

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
            { label: '12', value: 12 }
        ];

        this.minutes = [
            { label: '00', value: 0 },
            { label: '15', value: 15 },
            { label: '30', value: 30 },
            { label: '45', value: 45 }
        ];

        this.month = [
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
           { label: '12', value: 12 }
        ];

        this.day = [
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
            { label: '11', value: 11 },
            { label: '12', value: 12 },
            { label: '13', value: 13 },
            { label: '14', value: 14 },
            { label: '15', value: 15 },
            { label: '16', value: 16 },
            { label: '17', value: 17 },
            { label: '18', value: 18 },
            { label: '19', value: 19 },
            { label: '20', value: 20 },
            { label: '21', value: 21 },
            { label: '22', value: 22 },
            { label: '23', value: 23 },
            { label: '24', value: 24 },
            { label: '25', value: 25 },
            { label: '26', value: 26 },
            { label: '27', value: 27 },
            { label: '28', value: 28 },
            { label: '29', value: 29 },
            { label: '30', value: 30 },
            { label: '31', value: 31 }
        ];

        this.year = [
            { label: '2015', value: 2015 },
            { label: '2016', value: 2016 },
            { label: '2017', value: 2017 },
            { label: '2018', value: 2018 }
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

        this.convertTimeToStandard = function(militaryTime) {
            var convertedTime   = "";
            var stringLength    = militaryTime.length;
            var tempInt         = parseInt(militaryTime, 10);
            var temparr         = militaryTime.split("");

            if(tempInt < 1200) {
                temparr.splice(stringLength - 2, 0, ":");
                convertedTime = temparr.join('') + " AM";
            }
            else if(tempInt < 1300) {
                temparr.splice(stringLength - 2, 0, ":");
                convertedTime = temparr.join('') + " PM";
            }
            else {
                tempInt         = tempInt - 1200;
                convertedTime   = tempInt.toString();
                stringLength    = convertedTime.length;
                temparr         = convertedTime.split("");
                temparr.splice(stringLength - 2, 0, ":");
                convertedTime   = temparr.join('') + " PM";
            }
            return convertedTime;
        };

        this.convertDate = function(isoDate) {
            return new Date(isoDate).toLocaleDateString();
        };
    }

    return timeOptions;
};
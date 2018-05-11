
$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAWW6B8YEPyrIGKKIAN6IgPgxaYzvljJBA",
        authDomain: "train-scheduler-4a634.firebaseapp.com",
        databaseURL: "https://train-scheduler-4a634.firebaseio.com",
        projectId: "train-scheduler-4a634",
        storageBucket: "",
        messagingSenderId: "1067029497636"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#submitBtn").on("click", function (event) {

        event.preventDefault();

        var trainName = $("#inputName").val().trim();
        var trainDest = $("#inputDest").val().trim();
        var trainFirstTime = $("#inputFirstTime").val().trim();
        var trainFreq = $("#inputFreq").val().trim();

        console.log(trainName);


        var trainData = {
            name: trainName,
            dest: trainDest,
            firstTime: trainFirstTime,
            freq: trainFreq
        };

        database.ref().push(trainData);

    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().dest;
        var trainFirstTime = childSnapshot.val().firstTime;
        var trainFreq = childSnapshot.val().freq;

        var tableRow = $("<tr>");
        var tableNameTag = $("<td>");
        var tableDestTag = $("<td>");
        var tableFreqTag = $("<td>");
        var tableNextTag = $("<td>");
        var tableMinAway = $("<td>");

        //=====Calculation for minutes away. (START)======//
        //Calculating the initial train in minutes.
        var calcMinFirstTrain = function (timeFT) {
            var hrsToMin = parseInt(moment(timeFT, "HH:mm").format("HH") * 60);

            var minutes = parseInt(moment(timeFT, "HH:mm").format("mm"));
            var totalMin = hrsToMin + minutes;
            return totalMin
        }

        var firstArrMin = 0;

        if (trainFirstTime != "00:00") {
            firstArrMin = calcMinFirstTrain(trainFirstTime);
        } else {
            firstArrMin = 0;
        }

        var calcMinutes = function (timeFT) {
            var hrsToMin = parseInt(moment(timeFT).format("HH") * 60);

            var minutes = parseInt(moment(timeFT).format("mm"));
            var totalMin = hrsToMin + minutes;
            return totalMin
        }

        //(Current time as minutes) - (initial train) = number of minutes where with X amount of trains occurring. Initial minutes must be subtracted to start off at 0. Using modulus to find remaining minutes for "away". 
        var minAway = (trainFreq - ((calcMinutes(Date()) - firstArrMin) % trainFreq));



        //=====Calculation for minutes away. (END)=====//

        //Adding "remaining away minutes" to the current time to update for "next" train.
        var trainNext = moment(Date()).add(minAway, "minutes").format("hh:mm A");

        tableNameTag.text(trainName);
        tableDestTag.text(trainDest);
        tableFreqTag.text(trainFreq);
        tableNextTag.text(trainNext);
        tableMinAway.text(minAway);

        tableRow.append(tableNameTag)
        tableRow.append(tableDestTag)
        tableRow.append(tableFreqTag)
        tableRow.append(tableNextTag)
        tableRow.append(tableMinAway);
        $("#trainData").append(tableRow);

    });


});
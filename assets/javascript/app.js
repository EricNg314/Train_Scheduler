

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


$("#submitBtn").on("click", function(event){

    event.preventDefault();

    var trainName = $("#inputName").val();
    var trainDest = $("#inputDest").val();
    var trainFirstTime = $("#inputFirstTime").val();
    var trainFreq = $("#inputFreq").val();



});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var trainFreq = childSnapshot.val().trainFreq;

    var tableRow = $("<tr>");
    var tableNameTag = $("<td>");
    var tableDestTag = $("<td>");
    var tableFreqTag = $("<td>");
    var tableNextTag = $("<td>");
    var tableMinAway = $("<td>");




    $("#trainData").append(tableRow, tableNameTag, tableDestTag, tableFreqTag, tableNextTag, tableMinAway);



});
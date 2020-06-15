var firebaseConfig = {
    //  new fbase credentials generated again 6.14: 
    apiKey: "AIzaSyDE5LGrD3kmrPujELG6OoamqhBOhepeW2w",
    authDomain: "revisiting-train-asgt.firebaseapp.com",
    databaseURL: "https://revisiting-train-asgt.firebaseio.com",
    projectId: "revisiting-train-asgt",
    storageBucket: "revisiting-train-asgt.appspot.com",
    messagingSenderId: "1001366804507",
    appId: "1:1001366804507:web:defdecbe28056eeb5bc0be",
    measurementId: "G-9RZYXK4P68"
        // apiKey: "AIzaSyDvnD4hXZamWDdxop24f2om_S8H8pXc6PE",
        // authDomain: "train-asgt.firebaseapp.com",
        // databaseURL: "https://train-asgt.firebaseio.com",
        // projectId: "train-asgt",
        // storageBucket: "train-asgt.appspot.com",
        // messagingSenderId: "57015589792",
        // appId: "1:57015589792:web:a7ad2a0939ed148c0be2c5",
        // measurementId: "G-N0CM2LWCYH"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// Create a variable to reference the database
var database = firebase.database().ref();

var trainName;
var destination;
var firstTime;
var frequency = 0;

//create button to add train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //create vars to store user inputs  
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = moment($("#first-time-input").val().trim(), "__:__ military time").format("HH:mm"); //format('HHmm')
    frequency = $("#frequency-input").val().trim();

    //create object to hold added train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    //transfer new train info/object to database
    database.ref().push(newTrain);

    //log to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    //clear input fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});

//HERE where there's issue? Firebase not working?  all above seems to be functioning. //translate user inputs to new row after making this id'd as a firebase event that is a child added to the firebase snapshot
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //store in variables...
    var name = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;

    // train info
    console.log(name);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);


    //have to write code here (?) for calculating nextArrival and minutesAway based on the first train time & frequency of that train.

    //var minutesAway = moment().diff(moment(firstTime, "X"), "minutes");
    //console.log(minutesAway); //??need to look into moment doc'tn

    //need to take time now, and display the next arrival from that

    // var minutesAway = moment() - next

    // var nextArrival = 


    //create new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    //make new row append to table
    $("#train-table > tbody").append(newRow);

});
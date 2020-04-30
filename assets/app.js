var config = {
apiKey: "AIzaSyDrzIYMhO4lX2JXNDrni4O1i6D3jNypck4",
authDomain: "train-playing.firebaseapp.com",
databaseURL: "https://train-playing.firebaseio.com",
projectId: "train-playing",
storageBucket: "train-playing.appspot.com",
};

firebase.initializeApp(config);

// firebase.database().ref().on()

// // var config = {
// //     apiKey: "AIzaSyB4Ws5gPo9gNW9x90uXnX6XZ4uqE5QjkUY",
// //     authDomain: "countdownclicker.firebaseapp.com",
// //     databaseURL: "https://countdownclicker.firebaseio.com",
// //     storageBucket: "countdownclicker.appspot.com",
// //     messagingSenderId: "435604262542"
// //   };
  
//   firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
  
//create button to add train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

//create vars to store user inputs  
var name = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firstTime = moment($("#first-time-input").val().trim(), "__:__ military time").format("HH:mm"); //format('HHmm')
  var freq = $("#frequency-input").val().trim();

//create object to hold added train data
var newTrain = {
    trainName: name,
    destination: dest,
    firstTime: firstTime,
    frequency: freq
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

//translate user inputs to new row after making this id'd as a firebase event that is a child added to the firebase snapshot
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());


//store in variables...
  var name = childSnapshot.val().trainName;
  var dest = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var freq = childSnapshot.val().frequency;


  // train info
  console.log(name);
  console.log(dest);
  console.log(firstTime);
  console.log(freq);

//create new row
var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(dest),
    $("<td>").text(freq), 
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
);

//make new row append to table
$("#train-table > tbody").append(newRow);

});

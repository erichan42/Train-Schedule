var config = {
    apiKey: "AIzaSyAntxM5p3OOukDS1cVwWUqiQEISBL9gNFU",
    authDomain: "train-8a646.firebaseapp.com",
    databaseURL: "https://train-8a646.firebaseio.com",
    projectId: "train-8a646",
    storageBucket: "",
    messagingSenderId: "810675081150"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  var trainRate = $("#rate-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

  var tFrequency = trainRate;

  var firstTime = trainStartPretty;

  var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");

  var currentTime = moment();
  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
  var tRemainder = diffTime % tFrequency;
  
  var tMinutesTillTrain = tFrequency - tRemainder;
  
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainRate + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
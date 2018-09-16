$(document).ready(function(){
  //Firebase
  var config = {
    apiKey: "AIzaSyCRQoiJaUrwk5hP2i4AMjCHhaHnuaioYOs",
      authDomain: "trainscheduler-bc621.firebaseapp.com",
      databaseURL: "https://trainscheduler-bc621.firebaseio.com",
      storageBucket: "trainscheduler-bc621.appspot.com",
      messagingSenderId: "884939592119"
    };
  firebase.initializeApp(config);
  //Variables
  var database = firebase.database();
  //Convert Trains Time
  //var currentTime = moment();
  //console.log("Current Time: " + currentTime);
  //Functions
  
  //Capture Clicks of Buttons
  $("#submit").on("click", function() {
  
  //Values of Variables in HTML
    var name = $('#nameInput').val().trim();
      var dest = $('#destInput').val().trim();
      var time = $('#timeInput').val().trim();
      var freq = $('#freqInput').val().trim();
  
  //Push to Firebase
    database.ref().push({
      name: name,
      dest: dest,
        time: time,
        freq: freq,
        timeAdded: firebase.database.ServerValue.TIMESTAMP
    });
    //No Return
    $("input").val('');
      return false;
  });
  
  //On Click Child
  database.ref().on("child_added", function(childSnapshot){
    // console.log(childSnapshot.val());
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var time = childSnapshot.val().time;
    var freq = childSnapshot.val().freq;
  
    console.log("Name: " + name);
    console.log("Destination: " + dest);
    console.log("Time: " + time);
    console.log("Frequency: " + freq);
    //console.log(moment().format("HH:mm"));
  
  //Convert Train Time
    var freq = parseInt(freq);
    //Now Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment().format('HH:mm'));
    //Time pushed back one year
    // var dConverted = moment(time,'hh:mm').subtract(1, 'years');
    var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
    console.log("DATE CONVERTED: " + dConverted);
    var trainTime = moment(dConverted).format('HH:mm');
    console.log("TRAIN TIME : " + trainTime);
    
    //Diffence B/T The Times
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    console.log("DIFFERENCE IN TIME: " + tDifference);
    //Reminder
    var tRemainder = tDifference % freq;
    console.log("TIME REMAINING: " + tRemainder);
    //Minutes Until Next Train
    var minsAway = freq - tRemainder;
    console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
    //Next Train
    var nextTrain = moment().add(minsAway, 'minutes');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
    //console.log
  
   //Table Data
   //Append to DIisplay Train Table
  $('#currentTime').text(currentTime);
  $('#trainTable').append(
      "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
      "</td><td id='destDisplay'>" + childSnapshot.val().dest +
      "</td><td id='freqDisplay'>" + childSnapshot.val().freq +
      "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
      "</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
   },
  
  function(errorObject){
      console.log("Read failed: " + errorObject.code)
  });
  
  // database.ref().orderByChild("timeAdded").limitToLast(1).on("child_added", function(snapshot){
  //     // Change the HTML to reflect
  //     $("#nameDisplay").html(snapshot.val().name);
  //     $("#destDisplay").html(snapshot.val().dest);
  //     $("#timeDisplay").html(snapshot.val().time);
  //     $("#freqDisplay").html(snapshot.val().freq);
  // })
  
  }); //END DOCUMENT.READY
  
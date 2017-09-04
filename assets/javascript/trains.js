 var config = {
    apiKey: "AIzaSyASsgDZbALwqRRLZdkMOppx_D_NjTS15a8",
    authDomain: "weddemo-25d99.firebaseapp.com",
    databaseURL: "https://weddemo-25d99.firebaseio.com",
    projectId: "weddemo-25d99",
    storageBucket: "weddemo-25d99.appspot.com",
    messagingSenderId: "402451811080"
  };

firebase.initializeApp(config);

var database = firebase.database();

var name="";
var destination="";
var firstTime="";
var monthsWorked=0;
var frequency=0;
var nextArrival=0;
var minutesAway=0;

$("#submit").click(function(){

	event.preventDefault();

	name= $("#train-name").val().trim();
	destination= $("#destination").val().trim();
	firstTime= $("#first-train-time").val().trim();
	frequency= $("#frequency").val().trim();
	frequency= parseInt(frequency);

	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train-time").val("");
	$("#frequency").val("");

	var currentHour = moment().get('hour');
	var currentMinute = moment().get('minute');

	var currentTimeMinutes = currentHour * 60 + currentMinute;

	var firstTimeHour = moment(firstTime).get('hour');
	var firstTimeMinute = moment(firstTime).get('minute');

	var firstTimeMinutes = firstTimeHour * 60 + firstTimeMinute;



	console.log(name);
	console.log(destination);
	console.log("first time is: " + firstTime);
	console.log(frequency);
	console.log(moment().get('hour'));
	console.log(moment().get('minute'));

	database.ref().push({
		name: name,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
	});

});

database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTime);
	console.log(childSnapshot.val().frequency);

	

	$("#table-body").append(`<tr>`);
	$("#table-body").append(`<td class="table-name">${childSnapshot.val().name}</td>`);
	$("#table-body").append(`<td class="table-destination">${childSnapshot.val().destination}</td>`);
	$("#table-body").append(`<td class="table-frequency">${childSnapshot.val().frequency}</td>`);
	$("#table-body").append(`<td class="table-next-arrival">${nextArrival}</td>`);
	$("#table-body").append(`<td class="table-minutes-away">${minutesAway}</td>`);
	$("#table-body").append(`</tr>`);

});


'use strict';

$(function(){

  var fireRef = new Firebase('https://photosynth.firebaseio.com/');

  // uploads to firebase data when it changes
 // call this inside the callback of imgur api
  var colorThief = ["r", "g", "b"];
  var imageUrl = 'abc'

  fireRef.set({
    // array from color thief
    currentColors: colorThief,
    // url of the image returned from flickr
    currentImage: imageUrl
  });


// function receives values from firebase whenever they get cahnged on the server
  fireRef.on('value', function(snapshot){
    var fireObject = snapshot.val();

    if(fireObject){
      console.log(fireObject);

      // send the results to tone js stuff
    }
  });
});



$(document).ready(function(){

$('body').css("background-color:rgb(220, 200, 255)");

  var env = new Tone.AmplitudeEnvelope({
    "attack" : 0.01,
    "decay" : 0.02,
    "sustain" : 0.09,
    "release" : 1.2
  }).toMaster();

  var osc = new Tone.Oscillator(440, "sine")
    .connect(env)
    .start();

  //just so it's not soo loud.
  osc.volume.value = -6;




  $('#start').on('click', function(){
    var freq = $('#freq').val()
    env.triggerAttack();

  });

  $('#stop').on('click', function(){
    env.stop();
  });





});

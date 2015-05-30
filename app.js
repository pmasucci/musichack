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

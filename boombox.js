
$(document).ready(function(){

  var envs = {};
  var oscs = {};




  $('.dude').mouseenter(function(event) {
    playTone(event.target.id);
  });

  $('.dude').mouseleave(function(event) {
    stopTone(event.target.id);
  });



  function playTone(id){
     // var freq = $('#freq').val()
    console.log(id);
    if (envs[id]==undefined){
      envs[id] = generateEnv(id);
      oscs[id] = generateOsc(id);
    }

    envs[id].triggerAttack();
  }

  function stopTone(id){
    envs[id].triggerRelease();
  }

  function generateOsc(id){
    var osc = new Tone.Oscillator(440, "sine")
      .connect(envs[id])
      .start();

    //just so it's not soo loud.
    osc.volume.value = -6;
    return osc;

  }

  function generateEnv(id, adsr){

    var attack = 0.001;
    var decay = .2;
    var sustain = .8;
    var release = 5;

    var env = new Tone.AmplitudeEnvelope({
      "attack" : attack,
      "decay" : decay,
      "sustain" : sustain,
      "release" : release
    }).toMaster();
    return env;
  }


  $('#stop').on('click', function(){
    env.stop();
  });

});

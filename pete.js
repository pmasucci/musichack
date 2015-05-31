
function find_color(cssId, transformFunction){
  var rgbString = $('#' + cssId).css('background-color');

  rgbString = rgbString.toLowerCase().replace(' ', '');

  //rgbString = "rgb(123, 123, 123)";
  rgbString = rgbString.toLowerCase().replace(/\s/g, '');
  var re = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
  matches = rgbString.match(re);
  return transformFunction(matches)
}

console.log(find_color(null, hexString));

function hexString(matches){
  hexString = parseInt(matches[1]).toString(16) + parseInt(matches[2]).toString(16) + parseInt(matches[3]).toString(16);

  return parseInt(hexString, 16);
}

function rgbSplit(matches){
  hexString = parseInt(matches[1]).toString(16) + parseInt(matches[2]).toString(16) + parseInt(matches[3]).toString(16);

  return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]
}

console.log(find_color(null, rgbSplit));

// 1. Original number
// 2. R/G/B
// 3. Highest value RGB (0, 1, 2)

// Change function to receive function as argument to transform values more dynamically.

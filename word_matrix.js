
var rows = 16
var columns = 9
var matrix
function main() {

  var letters = randomLetters(rows * columns)
  letters[0] = " "
  console.log(letters)
  matrix = new Matrix().setMatrix(rows, columns, letters)
  var svg = d3.select("body").append("svg").attr("width", 30 * columns).attr("height", 30 * rows)

  drawMatrix(svg, matrix)
  drawWords(svg, matrix)

  moveLetters(10, {row: 1, column: 1})
  //d3.select("#letter_31").transition().delay(1000).duration(500).attr("x", 65)
}

function moveLetters(id, element) {
  var id = "#letter_" + id
  var destination = matrix.randomSwapDestination(element)

  var distance = 15
  var movement = {attr : "", amount : 65}
  switch (destination.direction) {
  case "r":
    movement.attr = "x"
    movement.amount = distance
    break
  case "l":
    movement.attr = "x"
    movement.amount = -distance
    break
  case "u":
    movement.attr = "y"
    movement.amount = -distance
    break
  case "d":
    movement.attr = "y"
    movement.amount = distance
    break
  }
  var location = parseInt(d3.select(id).attr(movement.attr)) + movement.amount
  console.log(id + " " + destination.direction + " " + movement.attr + " " + location)
  d3.select(id).transition().delay(0).duration(500).attr(movement.attr, location)
}

function drawWords(svg, matrix) {
  var results = []
  for (row of matrix.getRows()) {
    results.push(findWords(row))
  }
  for (result of results) {
    for (word of result) {
      for (id of word.ids){
        var cssId = "#letter_" + id
        makeRed(svg, cssId)
      }
    }
  }
}

function makeRed(svg, id) {
  svg.select(id)
    .style("fill", "red")
}

function drawMatrix(svg, matrix) {
  var xStart = 20
  var x = xStart
  var y = 20
  var xStep = 15
  var yStep = 17
  for (var m=0; m < matrix.matrix.length; m++){
    for (var n=0; n < matrix.matrix[0].length; n++) {
      var e = matrix.matrix[m][n]
      var id = "letter_" + e.id
      addLetter(svg, e.letter, id, x, y)
      x += xStep
    }
    y += yStep
    x = xStart
  }
}

function addLetter(svg, letter, id, x, y) {
  svg.append("text")
    .text(letter)
    .attr("x", x)
    .attr("y", y)
    .attr("class", "letter")
    .attr("text-anchor", "middle")
    .attr("id", id)
}

function findWords(elementList) {
  var minWordSize = 4
  var maxWordSize = 10
  var wordLocations = []

  var results = []

  var words = []

  for(i=0; i < elementList.length; i++) {
    for(j=i+minWordSize; j <= i+maxWordSize; j++) {
      if (j > elementList.length) {
        continue
      }
      var word = ""
      var ids = []
      for(k=i; k < j; k++) {
        e = elementList[k]
        word += e.letter.toLowerCase()
        ids.push(e.id)
      }
      if (findTrieWord(word, wordTrie)){
        results.push( {word: word, ids: ids} )
      }
    }
  }
  return results
}


function randomLetters(length)
{
    var letterArray = []
    for( var i=0; i < length; i++ )
        letterArray.push( randomLetterWeighted())
    return letterArray;
}

// letter frequencies from https://www.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
var letterFrequencies = {
"E" :	0.1202,
"T" :	0.0910,
"A" :	0.0812,
"O" :	0.0768,
"I" :	0.0731,
"N" :	0.0695,
"S" :	0.0628,
"R" :	0.0602,
"H" :	0.0592,
"D" :	0.0432,
"L" :	0.0398,
"U" :	0.0288,
"C" :	0.0271,
"M" :	0.0261,
"F" :	0.0230,
"Y" :	0.0211,
"W" :	0.0209,
"G" :	0.0203,
"P" :	0.0182,
"B" :	0.0149,
"V" :	0.0111,
"K" :	0.0069,
"X" :	0.0017,
"Q" :	0.0011,
"J" :	0.0010,
"Z" :	0.0007,
}

function createCumlativeFrequency(letterFrequencies) {
  var cumlativeFrequencies = {}
  var cumulation = 0.0
  for( var letter in letterFrequencies) {
    let prob = letterFrequencies[letter]
    cumulation += prob
    cumlativeFrequencies[letter] = cumulation
  }
  return cumlativeFrequencies
}

var cumulativeFrequencies = createCumlativeFrequency(letterFrequencies)

function randomLetterWeighted() {
  var n = Math.random()
  for(var letter in cumulativeFrequencies) {
    if (n < cumulativeFrequencies[letter]) {
      return letter
    }
  }
}

function findTrieWord( word, cur ) {
	if ( cur === 0 ) {
		return false;
	}

	cur = cur || dict;

	for ( var node in cur ) {
		if ( word.indexOf( node ) === 0 ) {
			var val = typeof cur[ node ] === "number" && cur[ node ] ?
				dict.$[ cur[ node ] ] :
				cur[ node ];

			if ( node.length === word.length ) {
				return val === 0 || val.$ === 0;

			} else {
				return findTrieWord( word.slice( node.length ), val );
			}
		}
	}

	return false;
};

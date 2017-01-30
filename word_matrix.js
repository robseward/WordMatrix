
var rows = 16
var columns = 9
var matrix = {}

function main() {
  var letters = letterGenerator.randomLetters(rows * columns)
  letters[0] = " "
  console.log(letters)
  matrix = new Matrix().setMatrix(rows, columns, letters)
  var svg = d3.select("body").append("svg").attr("width", 30 * columns).attr("height", 30 * rows)

  drawMatrix(svg, matrix)
  drawWords(svg, matrix)

  moveLetters(10, {row: 1, column: 1})
  d3.select("#letter_31").transition().delay(1000).duration(500).attr("x", 65)
}

// get random destination for blank
// get corrdinates for new destination
// get item to swap
// get destination coordinates for swapped item
// animate


function moveLetters(id, element) {
  var id = "#letter_" + id
  var destination = matrix.randomSwapDestination(element)
  console.log(destination)
  var delta = 15
  var movement = attributesForDirection(destination.direction, delta)
  var newValue = parseInt(d3.select(id).attr(movement.axis)) + movement.delta
  console.log(id + " " + destination.direction + " " + movement.attr + " " + newValue)
  d3.select(id).transition().delay(0).duration(500).attr(movement.axis, newValue)
}

function attributesForDirection(direction, delta) {
  var movement = {axis : "", delta : 0}
  switch (direction) {
  case "r":
    movement.axis = "x"
    movement.delta = delta
    break
  case "l":
    movement.axis = "x"
    movement.delta = -delta
    break
  case "u":
    movement.axis = "y"
    movement.delta = -delta
    break
  case "d":
    movement.axis = "y"
    movement.delta = delta
    break
  }

  return movement
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

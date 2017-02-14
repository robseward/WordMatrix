
var rows = 16
var columns = 9
var matrix = {}
var cssIdPrefix = "#letter_"
var svg
var aspectRatio = 9.0/16.0


function main() {
  var letters = letterGenerator.randomLetters(rows * columns)
  letters[0] = " "

  matrix = new Matrix().setMatrix(rows, columns, letters)
  var spacing = 100
  var docHeight = document.documentElement.clientHeight
  var width = docHeight * aspectRatio

  svg = d3.select("body").append("svg").attr("width", width).attr("height", docHeight)

  drawMatrix(svg, matrix)
  drawWords(svg, matrix)

  moveLetters(0, 0, -1, -1)
}

// get random destination for blank
// get corrdinates for new destination
// get item to swap
// get destination coordinates for swapped item
// animate


// Get random swap desitination (m, n)
// Get the collary
// Find their coordinates in the dom
// swap them in the matrix
// swap them on the screen


function moveLetters(row, column, excludeRow, excludeColumn) {
  // var duration = 50
  // var delay = 10
  var duration = 100
  var delay = 25
  var id1 = matrix.matrix[row][column].id
  var destination = matrix.randomSwapDestination(row, column, excludeRow, excludeColumn)
  var id2 = destination.element.id

  matrix.swap(row, column, destination.row, destination.column)

  var x1 = d3.select(cssIdPrefix+id1).attr("x")
  var y1 = d3.select(cssIdPrefix+id1).attr("y")
  var x2 = d3.select(cssIdPrefix+id2).attr("x")
  var y2 = d3.select(cssIdPrefix+id2).attr("y")

  d3.select(cssIdPrefix + id1)
    .transition()
    .delay(delay)
    .duration(duration)
    .attr("x", x2)
    .attr("y", y2)
  d3.select(cssIdPrefix + id2)
    .transition()
    .delay(delay)
    .duration(duration)
    .attr("x", x1)
    .attr("y", y1)
    .on("end", function (d){
      moveLetters(destination.row, destination.column, row, column)
      resetToBlack(svg)
      drawWords(svg, matrix)
    })
}

function drawWords(svg, matrix) {
  var results = []
  for (row of matrix.getRows()) {
    results.push(findWords(row))
  }
  for (column of matrix.getColumns()) {
    results.push(findWords(column))
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

function makeBlack(svg, id) {
  svg.select(id)
    .style("fill", "white")
}

function makeRed(svg, id) {
  svg.select(id)
    .style("fill", "red")
}

function resetToBlack(svg) {
  svg.selectAll("text").style("fill", "white")
}

function drawMatrix(svg, matrix) {
  var width = parseInt(svg.style("width"))
  var height = parseInt(svg.style("height"))
  var xStart = width * 0.053
  var x = xStart
  var y = height * 0.055
  var xStep = width * 0.11
  var yStep = height * 0.062
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

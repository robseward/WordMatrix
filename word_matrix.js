
var rows = 16
var columns = 9
var matrix = {}
var cssIdPrefix = "#letter_"
var svg
var aspectRatio = 9.0/16.0

function main() {
  var numLetters = rows * columns
  var letters = []

  params = new URLSearchParams(window.location.search.slice(1))
  var wordsParam = params.get("words")
  if (wordsParam) {
    var words = wordsParam.split(',')
    letters = letterGenerator.randomLettersFromWordList(words, numLetters)
  }
  else {
    letters = letterGenerator.randomLetters(rows * columns)
  }

  letters[0] = " "

  matrix = new Matrix().setMatrix(rows, columns, letters)
  var spacing = 100
  var docHeight = document.documentElement.clientHeight
  var width = docHeight * aspectRatio

  svg = d3.select("body").append("svg").attr("width", width).attr("height", docHeight)

  drawMatrix(svg, matrix)
  //drawWords(svg, matrix)
  findWordsAndStoreThem(svg, matrix)

  moveLetters(0, 0, -1, -1)
}

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
      setAllToBaseColor(svg)
      //drawWords(svg, matrix)
      findWordsAndStoreThem(svg, matrix)
      updateColors(svg)
    })
}

/*
go through rows/columns and find words
hash = word, (r, c) coord of starting letter, vertical or horizontal-found
get hashes of all onscreen words
diff new hashes with old
remove old ones not in new
Add new ones not in old, assign color
draw
*/

var map = new Map()
function findWordsAndStoreThem(svg, matrix) {

  // gather words and put them into map
  var results = []
  results = matrix.getRows().map(findWords)
  results = results
    .concat(
      matrix
        .getColumns()
        .map(findWords))

  results = results.filter(function(x) { return x.length > 0} )
  results = results.map( function(x) { return x[0]; } )

  //delete words from map that aren't in result
  var resultHashes = results.map(getHashCode);
  var forDeletion = Array.from(map.keys()).filter(function(x) { return !resultHashes.includes(x) })
  forDeletion.forEach( function(hash) {
    map.delete(hash)
  })

  //if result is not in map, assign color and insert in map
  results.forEach( function(result) {
    var hash = getHashCode(result)
    if (!map.has(hash)) {
      result.color = nextColorClass()
      map.set(hash, result)
    }
  })
}

function updateColors(svg) {
  for (result of map.values()) {
    // console.log(result)
    var cssIds = result.ids.map( function(id) { return "#letter_" + id })
    cssIds.forEach( function(id) {
      //console.log(id + " " + result.color)
      setColor(svg, id, result.color)
    })
  }
}

function setColor(svg, id, colorClass) {
  removeColorClasses(svg.select(id))
  svg.select(id)
    .classed("base-color", false)
    .classed(colorClass, true)
}

var numColors = 5
function randomColorClass() {
  var colorNum = (Math.floor((Math.random() * 100)) % numColors) + 1;
  return "color-" + colorNum
}

var colorIndex = 1
function nextColorClass() {
  colorIndex = ((colorIndex + 1) % numColors)
  return "color-" + (colorIndex + 1)
}

function removeColorClasses(letterElement) {
  for (var i=1; i <= numColors; i++) {
    var className = "color-" + i
    letterElement.classed(className , false)
  }
}

function setAllToBaseColor(svg) {
  removeColorClasses(svg.selectAll("text"))
  svg.selectAll("text")
    .classed("base-color", true)
    .classed("vertical-found", false)
    .classed("horizontal-found", false)
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
    .attr("class", "letter base-color")
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
    for(j=i+maxWordSize; j >= i+minWordSize; j--) {
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
        results.push( new WordResult(word, ids) )
        i = j
        break
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

function WordResult(word, ids) {
  this.word = word
  this.ids = ids
  this.color = ""
}

function getHashCode(obj) {
    var hashCode = '';
    if (typeof obj !== 'object')
        return hashCode + obj;
    for (var prop in obj) // No hasOwnProperty needed
        hashCode += prop + getHashCode(obj[prop]); // Add key + value to the result string
    return hashCode;
}

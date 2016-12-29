
function main() {
  //setup matrix
  //setup svg
  //draw letters into svg
  //find words



  var letters = randomLetters(100)
  var matrix = new Matrix().setMatrix(10, 10, letters)
  //var letters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //var matrix = new Matrix().setMatrix(10, 10, letters)

  // var lettersDiv = d3.select("#letters")
  // lettersDiv.selectAll("foo")
  //           .data(letters)
  //           .enter()
  //           .append("div")
  //           .attr('class', 'letter')
  //           .text(function(d) { return d})
  // var words = findWords(letters)
  // d3.select("#words").append("p").text(words)

  var svg = d3.select("body").append("svg").attr("width", 300).attr("height", 300)

  var xStart = 20
  var x=xStart
  var y=20
  var xStep = 15
  var yStep = 17
  for (var n=0; n < matrix.matrix.length; n++){
    for (var m=0; m < matrix.matrix[0].length; m++) {
      var letter = matrix.matrix[m][n]
      addLetter(svg, letter, x, y)
      x += xStep
    }
    y += yStep
    x = xStart
  }
}

function addLetter(svg, letter, x, y) {
  svg.append("text")
    .text(letter)
    .attr("x", x)
    .attr("y", y)
    .attr("class", "letter")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
}

function findWords(letterList) {
  var minWordSize = 4
  var maxWordSize = 10
  var wordLocations = []
  var words = []
  for(i=0; i < letterList.length; i++) {
    for(j=i+minWordSize; j <= i+maxWordSize; j++) {
      if (j > letterList.length) {
        continue
      }
      var word = ""
      for(k=i; k < j; k++) {
        word += letterList[k].toLowerCase()
      }
      if (findTrieWord(word, wordTrie)){
        words.push(word)
      }
    }
  }
  console.log(words)
  return words
}


function randomLetters(length)
{
    var text = "";
    var letterArray = []
    for( var i=0; i < length; i++ )
        letterArray += randomLetterWeighted()
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

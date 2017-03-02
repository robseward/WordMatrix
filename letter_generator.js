var letterGenerator = (function() {
  var exports = {}
  exports.randomLetters = function(length)
  {
      var cumulativeFrequencies = exports.createCumulativeFrequency(standardLetterFrequencies)

      var letterArray = []
      for( var i=0; i < length; i++ )
          letterArray.push( exports.randomLetterWeighted(cumulativeFrequencies))
      return letterArray;
  }

  // letter frequencies from https://www.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
  var standardLetterFrequencies = {
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

  exports.randomLettersFromWordList = function(words, length) {
      var frequencies = exports.frequenciesFromWordList(words)
      var cumulativeFrequencies = exports.createCumulativeFrequency(frequencies)

      var letterArray = []
      for( var i=0; i < length; i++ )
          letterArray.push( exports.randomLetterWeighted(cumulativeFrequencies))
      return letterArray;
  }

  exports.createCumulativeFrequency = function(letterFrequencies) {
    var cumulativeFrequencies = {}
    var cumulation = 0.0
    for( var letter in letterFrequencies) {
      let prob = letterFrequencies[letter]
      cumulation += prob
      cumulativeFrequencies[letter] = cumulation
    }
    return cumulativeFrequencies
  }


  exports.randomLetterWeighted = function(cumulativeFrequencies) {
    var n = Math.random()
    for(var letter in cumulativeFrequencies) {
      if (n < cumulativeFrequencies[letter]) {
        return letter
      }
    }
  }

  exports.frequenciesFromWordList = function (list) {
    var letterCounts = {}
    for (var i=0; i<list.length; i++) {
      var word = list[i]
      for (var j=0; j<word.length; j++) {
        letter = word[j]
        if (letterCounts[letter] === undefined) {
          letterCounts[letter] = 1
        } else {
          letterCounts[letter]++
        }
      }
    }
    console.log(exports.normalize(letterCounts))
    return exports.normalize(letterCounts)
  }

  exports.normalize = function(counts) {
    var normalized = {}
    var total = 0
    for (letter in counts) {
      total += counts[letter]
    }
    for (letter in counts) {
      normalized[letter] = counts[letter] / total
    }
    return normalized
  }

  return exports
}());

var elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var testWordFinding = (function() {
  var exports = {}

  elementStubFactory = function(letterList) {
    var elements = []
    for(var i=0; i < letterList.length; i++){
      var e = new Element(letterList[i], 0)
      elements.push(e)
    }
    return elements
  }

  function eq(a1, a2) {
    return a1.length==a2.length && a1.every(function(v,i) { return v === a2[i]})
  }

  function test(letters, expectedResults) {
    var letterElements = elementStubFactory(letters)
    var results = getWords(findWords(letterElements))
    if (!eq(results, expectedResults)) {
      colorTrace( "failed test: \nExpected: " + expectedResults + "\nReceived: " + results, "red")
    } else {
      console.log("PASS: " + letters)
    }
  }

  function getWords(results) {
    output = []
    for (var i=0; i < results.length; i++) {
      output.push(results[i].word)
    }
    return output
  }

  exports.runTests = function() {
    test("baseball", ["baseball"])
    test("slkdjfbecomeds", ["become"])
    test("sfsdogsdogslj", ["dogs"])
  }

  return exports
}());

function colorTrace(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

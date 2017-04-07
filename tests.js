var elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function elementStubFactory(letterList) {
  var elements = []
  for(var i=0; i < letterList.length; i++){
    var e = new Element(letterList[i], 0)
    elements.push(e)
  }
  return elements
}

function testWordFinding(){


  function testCompoundWords() {
    var baseball = elementStubFactory("BASEBALL")
    var crosswalk = elementStubFactory("CROSSWALK")
    var anybody = elementStubFactory("ANYBODY")

    var results = findWords(baseball)
    if (results != ["base"]) {
      throw "failed test: " + getWords(results)
    }
  }

  function getWords(results) {
    output = []
    for (var i=0; i < results.length; i++) {
      output.push(results[i].word)
    }
    return output
  }


  testCompoundWords()
}

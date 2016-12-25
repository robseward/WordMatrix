function Matrix(type) {
  this.type = type
  this.elements = []
  this.numRows = 0
  this.numColumns = 0

}

Matrix.prototype.setElements = function(elements) {
  this.elements = elements
  return this
}

Matrix.prototype.setRows = function(rows) {
  this.numRows = rows
  return this
}

Matrix.prototype.setColumns = function(columns) {
  this.numColumns = columns
  return this
}

Matrix.prototype.rows = function() {
  var rows = []
  var count = 0
  var rowLength = this.elements.length / this.numRows

  for(var i=0; i < this.numRows; i++) {
    var row =[]
    for(var j=0; j < rowLength; j++) {
      index = (i * rowLength) + j
      row.push(this.elements[index])
    }
    rows.push(row)
  }
  return rows
}

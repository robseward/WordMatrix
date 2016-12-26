function Matrix(type) {
  this.type = type
  this.matrix = []
  this.numRows = 0
  this.numColumns = 0

}

Matrix.prototype.setMatrix = function(rows, columns, data) {
  for(var i=0; i < rows; i++) {
    var row = []
    for(var j=0; j < columns; j++) {
      var index = i * columns + j
      if (index >= data.length) {
        console.warn("Array bounds exeeded")

      }
      row.push(data[index])
    }
    this.matrix.push(row)
  }
  return this
}

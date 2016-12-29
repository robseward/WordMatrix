function Matrix(type) {
  this.matrix = []
}

Matrix.prototype.setMatrix = function(rows, columns, data) {
  for(var i=0; i < rows; i++) {
    var row = []
    for(var j=0; j < columns; j++) {
      var index = i * columns + j
      if (index >= data.length) {
        console.warn("Array bounds exeeded")
      }
      var e = new Element(data[index], index)
      row.push(e)
    }
    this.matrix.push(row)
  }
  return this
}

Matrix.prototype.getRows = function() {
  return this.matrix
}

Matrix.prototype.getRow = function(rowIndex) {
  return this.matrix[rowIndex]
}

Matrix.prototype.getColumn = function(columnIndex) {
  var column = []
  for (var i=0; i < this.matrix.length; i++) {
    var row = this.matrix[i]
    column.push(row[columnIndex])
  }
  return column
}


//Diagonals algo from here: http://stackoverflow.com/questions/2862802/traverse-2d-array-matrix-diagonally
Matrix.prototype.getLeftDiagonals = function() {
  var n = this.matrix[0].length
  var m = this.matrix.length
  var out = new Array();

  for (var i = 1 - m; i < n; i++) {
      var group = new Array();
      for (var j = 0; j < m; j++) {
          if ((i + j) >= 0 && (i + j) < n) {
              group.push(this.matrix[j][i + j]);
          }
      }
      out.push(group);
  }
  return out
}

Matrix.prototype.getRightDiagonals = function() {
  var n = this.matrix[0].length
  var m = this.matrix.length
  var out = new Array();

  for (var i = 0; i < n + m; i++) {
      var group = new Array();
      for (var j = 0; j < m; j++) {
          if ((i - j) >= 0 && (i - j) < n) {
              group.push(this.matrix[j][i - j]);
          }
      }
      out.push(group);
  }
  return out
}

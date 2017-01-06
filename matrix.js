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

Matrix.prototype.swap = function(element1, element2) {
  var m1 = element1.row
  var n1 = element1.column
  var m2 = element2.row
  var n2 = element2.column

  var temp = this.matrix[m1][n1]
  this.matrix[m1][n1] = this.matrix[m2][n2]
  this.matrix[m2][n2] = temp
}

Matrix.prototype.randomSwapDestination = function (element) {
  var m = element.row
  var n = element.column
  var move = ""
  var direction = Math.round(Math.random() * 100) % 4
  switch (direction) {
    case 0:
      m += 1
      move = "r"
      break;
    case 1:
      m -= 1
      move = "l"
      break;
    case 2:
      n += 1
      move = "d"
      break;
    case 3:
      n -= 1
      move = "u"
      break;
    default:
      break;
  }
  if ((m >= this.matrix.length || m < 0) || (n >= this.matrix[0].length || n < 0)) {
    return this.randomSwapDestination(element)
  }
  return {row: m, column: n, direction : move}
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

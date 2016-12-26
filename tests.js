var elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


function testMatrixRows() {
  var expectedRows = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
  let matrix = new Matrix().setMatrix(5, 2, elements)
  console.log(matrix.matrix)
  return (matrix.matrix.equals(expectedRows))
}

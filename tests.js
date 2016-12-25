var elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


function testMatrixRows() {
  var expectedRows = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
  let matrix = new Matrix().setElements(elements).setRows(5)
  console.log(matrix.rows())
  return (matrix.rows().equals(expectedRows))
}

const contents = [
  { id: 1, name: 'Content 1' },
  { id: 2, name: 'Content 2' },
  { id: 3, name: 'Content 3' },
]

const data = [
  { id: 1, value: 'Data 1' },
  { id: 2, value: 'Data 2' },
  { id: 4, value: 'Data 4' },
]


const filteredData = data.filter( obj => {
  return !contents.some(contentsObj => contentsObj.id === obj.id)
})

console.log(filteredData)

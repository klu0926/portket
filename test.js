const projectTitles = require('./data/projectTitle.json')
console.log(projectTitles[1])

const title = projectTitles[Math.floor(Math.random() * projectTitles.length)]

console.log('title:', title)

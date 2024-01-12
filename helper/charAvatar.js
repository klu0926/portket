// https://ui-avatars.com/
// use ui-avatars.com to generate an avatar, if the user doesn't provide one
const hexGenerator = require('./hexGenerator')

/**
 * 
 * @return {array} [smallAvatar, bigAvatar]
 */
function charAvatarGenerator(userName = 'N') {
  const url = 'https://ui-avatars.com/api/?'
  const name = `name=${userName[0]}`
  const background = 'background='.concat(hexGenerator(3))
  const color = 'color=fff' // white
  const formate = 'formate=webp'
  const uppercase = 'uppercase=true'
  const bold = 'bold=true'
  const smallSize = 'size=128'
  const bigSize = 'size=400'

  let baseAvatar = `${url}${name}&${color}&${background}&${formate}&${uppercase}&${bold}`
  const smallAvatar = `${baseAvatar}&${smallSize}`
  const bigAvatar = `${baseAvatar}&${bigSize}`
  return [smallAvatar, bigAvatar]
}

module.exports = charAvatarGenerator

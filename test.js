function replaceWord(string, targetWord, replaceWord) {
  const args = [...arguments]
  args.forEach((s) => {
    if (typeof s !== 'string') return
  })
  return string.replace(targetWord, replaceWord)
}

console.log(replaceString('i am lulu', 'lulu', 'charlulu'))

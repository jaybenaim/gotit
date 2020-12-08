
const isValid = (string) => {
  const illegalPhrases = [
    'electric chair'
  ]

  const illegalWords = [
    'execution',
    'electric chair',
    'electrocution',
    'murder',
    'death',
  ]

  const words = string.split(' ')
  const isIllegal = []

  for (const word of words) {
    if (illegalWords.includes(word)) {
      isIllegal.push(true)
    }
  }

  for (const phrase of illegalPhrases) {
    if (phrase === string) {
      isIllegal.push(true)
    }
  }

  return !isIllegal.includes(true)
}

module.exports = { isValid }
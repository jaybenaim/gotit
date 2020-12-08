
const isValid = (string) => {
  const illegalPhrases = [
    'electric chair',
    'the flesh of wild animals that is used for food',
    'a secret scheme to do something (especially something underhand or illegal)'
  ]

  const illegalWords = [
    'execution',
    'electric chair',
    'electrocution',
    'murder',
    'death',
    'lame'
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
export const verifyAttributes = (data: unknown, typedAttributes?: string[][], untypedAttributes?: string[]): boolean => {
  if (!typedAttributes && !untypedAttributes) {
    return !!data
  }
  if (typedAttributes) {
    for (const attr of typedAttributes) {
      // eslint-disable-next-line valid-typeof
      if (!Object.prototype.hasOwnProperty.call(data, attr[0]) || typeof data[attr[0]] !== attr[1]) {
        return false
      }
    }
  }
  if (untypedAttributes) {
    for (const attr of untypedAttributes) {
      if (!Object.prototype.hasOwnProperty.call(data, attr)) {
        return false
      }
    }
  }
  return true
}

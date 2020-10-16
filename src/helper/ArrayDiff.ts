export const arrayDiff = <T>(a: T[], b: T[], criteria?: string[]): { added: T[], equal: T[], deleted: T[] } => {
  if (a.length === 0) {
    if (b.length === 0) {
      return { added: [], equal: [], deleted: [] }
    }
    return { added: b, equal: [], deleted: [] }
  }
  if (b.length === 0) {
    return { added: [], equal: [], deleted: a }
  }
  const added: T[] = []
  const equal: T[] = []
  const deleted: T[] = []
  for (let iA = 0; iA < a.length; ++iA) {
    let found = false
    for (let iB = 0; iB < b.length; ++iB) {
      if (!criteria && a[iA] === b[iB]) {
        found = true
        b.splice(iB, 1)
        break
      }
      if (criteria) {
        let aEqualsB = true
        for (const criterium of criteria) {
          if (!(Object.prototype.hasOwnProperty.call(a, criterium) &&
            Object.prototype.hasOwnProperty.call(b, criterium) &&
            a[iA][criterium] === b[iB][criterium])) {
            aEqualsB = false
            break
          }
        }
        if (aEqualsB) {
          found = true
          b.splice(iB, 1)
          break
        }
      }
    }
    if (found) {
      equal.push(a[iA])
    } else {
      deleted.push(a[iA])
    }
  }
  added.concat(b)
  return { added, equal, deleted }
}

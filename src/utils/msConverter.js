export const msConverter = (ms) => {
  let time = ms / 1000
  const hours = Math.floor(time / 3600)
  const remainder = Math.floor(time % 3600)
  const minutes = Math.floor(remainder / 60)
  const seconds = Math.floor(remainder % 60)
  return { hours, minutes, seconds }
}

export const lessThan10 = (number) => {
  if (number < 10) {
    return `0${number}`
  } else {
    return number
  }
}

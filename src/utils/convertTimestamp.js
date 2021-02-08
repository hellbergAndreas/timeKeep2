const convertTimeStamp = (timeInterval) => {
  let interval = {}
  Object.keys(timeInterval).forEach((key) => {
    interval = {
      ...interval,
      [key]: {},
    }
    interval[key].year = timeInterval[key].getFullYear()
    interval[key].month = timeInterval[key].getMonth() + 1
    interval[key].day = timeInterval[key].getDate()
  })
  return interval
}
const getDay = (day) => {
  switch (day) {
    case 0:
      day = "Sunday"
      break
    case 1:
      day = "Monday"
      break
    case 2:
      day = "Tuesday"
      break
    case 3:
      day = "Wednesday"
      break
    case 4:
      day = "Thursday"
      break
    case 5:
      day = "Friday"
      break
    case 6:
      day = "Saturday"
  }
  return day
}
export const lowerThan10 = (number) => {
  if (number < 10) {
    return "0" + number
  } else {
    return number
  }
}
export default convertTimeStamp

export const calculateTotalTime = (sessions) => {
  let total = 0
  if (sessions) {
    sessions.forEach((session) => {
      total += Date.parse(session.stop) - Date.parse(session.start)
      //   console.log(new Date(session.start))
    })
  }
  return total
}

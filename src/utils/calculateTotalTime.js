export const calculateTotalTime = (sessions) => {
  let total = 0
  if (sessions) {
    sessions.forEach((session) => {
      console.log(Date.parse(session.stop) - Date.parse(session.start))
    })
  }
  return total
}

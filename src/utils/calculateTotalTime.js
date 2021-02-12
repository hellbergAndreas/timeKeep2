export const calculateTotalTime = (sessions, category, activity) => {
  let total = 0
  if (sessions) {
    sessions.forEach((session) => {
      total += Date.parse(session.stop) - Date.parse(session.start)
    })
  }
  return total
}

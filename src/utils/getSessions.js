export const getSessions = (name, filter, userSessions) => {
  let filteredSessions = []
  if (userSessions) {
    filteredSessions = userSessions.filter((session) => {
      return session[filter] === name
    })
  }

  return filteredSessions
}

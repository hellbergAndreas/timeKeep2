export const getSessions = (name, filter, userSessionsArray) => {
  let filteredSessions = []

  filteredSessions = userSessionsArray.filter((session) => {
    return session[filter] === name
  })

  console.log(name, filter, userSessionsArray)
  return filteredSessions
}

export const getSessions = (name, filter, userSessionsArray) => {
  let filteredSessions = [];
  if (userSessionsArray) {
    filteredSessions = userSessionsArray.filter((session) => {
      return session[filter] === name;
    });
  }
  console.log(userSessionsArray);

  return filteredSessions;
};

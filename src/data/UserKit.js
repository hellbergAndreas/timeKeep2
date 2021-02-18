// const ROOT_URL = "https://us-central1-timekeep2.cloudfunctions.net/api/"
const ROOT_URL = "http://localhost:5000/timekeep2/us-central1/api/"

const API_URL = `${ROOT_URL}api/v1/`

export default class {
  async addCategory(category) {
    const url = `${ROOT_URL}categories`
    const payload = category
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async addActivity(activity) {
    const url = `${ROOT_URL}activities`
    const payload = activity

    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getCategories(user) {
    const url = `${ROOT_URL}getCategories`
    const payload = { userId: user }
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getActivities(userId, parent) {
    const payload = {
      userId: userId,
      parent: parent,
    }

    const url = `${ROOT_URL}getActivities`
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getSessions(userId) {
    const payload = { userId }
    const url = `${ROOT_URL}getSessions`

    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async addSession(session, user) {
    const url = `${ROOT_URL}sessions`

    const payload = {
      ...session,
      userId: user,
    }

    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async updateSession(session) {
    const url = `${ROOT_URL}updateSession`

    const payload = session

    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }

  async addUser(user) {
    const url = `${ROOT_URL}users`
    const payload = user

    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async addScream(payload) {
    const url = `${ROOT_URL}createScream`

    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async uploadImage(image) {
    const url = `${ROOT_URL}image`
    return fetch(url, {
      method: "POST",
      // mode: "no-cors", // no-cors, *cors, same-origin

      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.getSessionToken()}`,
      },
      // headers: this.getPrivateHeaders(),
      body: image,
    })
  }
  async setSessionImage(payload) {
    const url = `${ROOT_URL}setImage`
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    }
  }
  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getSessionToken()}`,
    }
  }
  getSessionToken() {
    return sessionStorage.getItem("sessionToken")
  }
}

// const ROOT_URL = "https://us-central1-timekeep2.cloudfunctions.net/api/"
const ROOT_URL = "http://localhost:5000/timekeep2/us-central1/api/"

const API_URL = `${ROOT_URL}api/v1/`

export default class {
  async addCategory(category) {
    console.log(category)
    const url = `${ROOT_URL}categorys`
    const payload = category
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async addActivitie(activity) {
    console.log(activity)
    const url = `${ROOT_URL}activities`
    const payload = activity
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getCategory(user) {
    const url = `${ROOT_URL}getCategorys/`
    return fetch(url, {
      headers: { ...this.getPublicHeaders(), user },
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

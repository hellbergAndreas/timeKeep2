const ROOT_URL = "https://frebi.willandskill.eu/"
const API_URL = `${ROOT_URL}api/v1/`

export default class {
  async helloWorld() {
    const url = "https://us-central1-timekeep2.cloudfunctions.net/helloWorld"
    return fetch(url, {
      method: "GET",
      headers: this.getPublicHeaders(),
    })
  }
  async addUser(user) {
    const url = `https://us-central1-timekeep2.cloudfunctions.net/user`
    const payload = user
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
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
}

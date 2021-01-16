const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")

const app = express()
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

app.use(cors({ origin: true }))

app.post("/createScream", (req, res) => {
  const newScream = {
    body: req.body.body,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  }
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post("/users", (req, res) => {
  const newUser = {
    user: req.body.userId,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  }
  db.collection("users")
    .add(newUser)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .get()
    .then((data) => {
      let screams = []
      data.forEach((doc) => {
        screams.push(doc.data())
      })
      return res.json(screams)
    })
    .catch((err) => console.error(err))
})

// https://baseurl.com/api

exports.api = functions.https.onRequest(app)

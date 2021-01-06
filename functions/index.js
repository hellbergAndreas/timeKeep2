const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")

const admin = require("firebase-admin")
admin.initializeApp()
const app = express()
app.use(cors({ origin: true }))

app.get("/", (req, res) => {})
app.post("/", async (req, res) => {
  const user = req.body
  await admin.firestore().collection("users").add(user)
  res.status(201).send()
})

exports.user = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true })
  response.send("Hello from Firebase!")
})

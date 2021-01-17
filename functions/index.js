const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")

const app = express()
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

app.use(cors({ origin: true }))

const FBAuth = (req, res, next) => {
  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1]
  } else {
    console.error("No token found")
    return res.status(403).json({ error: "Unauthorized" })
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken

      return db
        .collection("users")
        .where("user", "==", req.user.uid)
        .limit(1)
        .get()
    })
    .then(() => {
      return next()
    })
    .catch((err) => {
      console.error("Error while verifying token", err)
      return res.status(403).json(err)
    })
  // .then(data => {
  //   req.user.handle  = docs[0].data().handle
  //   return next()
  // })
}

app.post("/categorys", FBAuth, (req, res) => {
  let user = req.body.email
  const newCategory = {
    name: req.body.category,
    descritpion: req.body.description,
  }
  db.collection("users")
    .doc(user)
    .collection("categorys")
    .doc(newCategory.name)
    .set(newCategory)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post("/activities", (req, res) => {
  let user = req.body.email
  const newActivity = {
    parent: req.body.parent,
    name: req.body.activity,
    descritpion: req.body.description,
  }
  db.collection("users")
    .doc(user)

    .collection("activities")
    .add(newActivity)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.get(`/getCategorys`, (req, res) => {
  db.collection(`/users/${req.headers.user}/categorys`)
    .get()
    .then((data) => {
      let categorys = []
      data.forEach((doc) => {
        categorys.push(doc.data())
      })
      return res.json(categorys)
    })
    .catch((err) => console.error(err))
})
app.post(`/getActivities`, (req, res) => {
  db.collection(`/users/${req.body.user}/activities`)
    .get()
    .then((data) => {
      let activities = []
      data.forEach((doc) => {
        doc.data().parent === req.body.category && activities.push(doc.data())
      })
      return res.json(activities)
    })
    .catch((err) => console.error(err))
})
app.post("/users", (req, res) => {
  const newUser = {
    email: req.body.email,
    user: req.body.user,
    handle: req.body.email,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  }
  db.collection(`users`)
    .doc(newUser.email)
    .set(newUser)
    .then((ref) => {
      let id = ref.id
      return id
    })
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => console.error(err))
})
// app.post("/createScream", FBAuth, (req, res) => {
//   const newScream = {
//     body: req.body.body,
//     createdAt: admin.firestore.Timestamp.fromDate(new Date()),
//   }
//   db.collection("screams")
//     .add(newScream)
//     .then((doc) => {
//       return res.json({ message: `document ${doc.id} created successfully` })
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "something went wrong" })
//       console.log(err)
//     })
// })

// https://baseurl.com/api

exports.api = functions.https.onRequest(app)

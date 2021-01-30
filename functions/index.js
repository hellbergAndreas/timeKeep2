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

app.post("/categories", FBAuth, (req, res) => {
  let user = req.body
  const newCategory = {
    name: user.category,
    descritpion: user.description,
    userId: user.userId,
  }
  db.collection("categories")
    .add(newCategory)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post("/activities", (req, res) => {
  let user = req.body
  const newActivity = {
    parent: user.parent,
    name: user.activity,
    descritpion: user.description,
    userId: user.userId,
  }
  db.collection("activities")
    .add(newActivity)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post(`/getCategories`, (req, res) => {
  return db
    .collection(`categories`)
    .where("userId", "==", req.body.userId)
    .get()
    .then((data) => {
      let categories = []
      data.forEach((doc) => {
        categories.push(doc.data())
      })
      return res.json(categories)
    })
    .catch((err) => console.error(err))
})
app.post(`/getActivities`, (req, res) => {
  return db
    .collection(`activities`)
    .where("userId", "==", req.body.userId)

    .get()
    .then((data) => {
      let activities = []
      data.forEach((doc) => {
        activities.push(doc.data())
      })
      return res.json(activities)
    })
    .catch((err) => console.error(err))
})
app.post(`/sessions`, (req, res) => {
  db.collection(`sessions`)
    .add(req.body)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post(`/getSessions`, (req, res) => {
  return db
    .collection(`sessions`)
    .where("userId", "==", req.body.userId)
    .get()
    .then((data) => {
      let sessions = []
      data.forEach((doc) => {
        let session = {
          ...doc.data(),
        }
        sessions.push(session)
      })
      return res.json(sessions)
    })
    .catch((err) => console.error(err))
})
app.post("/users", (req, res) => {
  const newUser = {
    email: req.body.email,
    userId: req.body.user,
    handle: req.body.email,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  }
  db.collection(`users`)
    .add(newUser)
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

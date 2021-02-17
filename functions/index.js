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
app.post(`/getCategories`, FBAuth, (req, res) => {
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
      return res.json({
        message: `document ${doc.id} created successfully`,
        id: doc.id,
      })
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" })
      console.log(err)
    })
})
app.post(`/updateSession`, (req, res) => {
  db.doc(`/sessions/${req.body.id}`)
    .update(req.body)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} updated successfully` })
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
      let sessions = {}
      data.forEach((doc) => {
        let session = {
          ...doc.data(),
          id: doc.id,
        }
        sessions = {
          ...sessions,
          [doc.id]: session,
        }
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

const uploadImage = (req, res) => {
  const BusBoy = require("busboy")
  const path = require("path")
  const os = require("os")
  const fs = require("fs")
  const busboy = new BusBoy({ headers: req.headers })

  let imageFileName
  let imageToBeUploaded = {}
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const imageExtension = filename.split(".")[filename.split(".").length - 1]
    imageFileName = ` ${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`
    const filepath = path.join(os.tmpdir(), imageFileName)
    imageToBeUploaded = { filepath, mimetype }
    file.pipe(fs.createWriteStream(filepath))
  })
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${app.storageBucket}/o/${imageFileName}?alt=media`
        // return db.doc(`sessions/${req.session.id}`).update({ imageUrl })
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully" })
      })
      .catch((err) => {
        console.log(error(err))
        return res.status(500).json({ error: err.code })
      })
  })
  busboy.end(req.rawBody)
}

app.post("/image", uploadImage)

exports.api = functions.https.onRequest(app)

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

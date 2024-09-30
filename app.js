//basic import
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')


//security middleware
const rateLimit = require('express-rate-limit')
const helmet= require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

//database Library Import
const mongoose = require('mongoose')

// all lib import
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(mongoSanitize())
app.use(bodyParser.json())

const limiter = rateLimit({windowMs:15*60*1000, max: 3000})
app.use(limiter)

//Routing Implement
const appRoute = require('./src/Routes/api')
app.use('/api', appRoute)


app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Not Found" });
  });

  let mongooseURI = "mongodb+srv://mobinulislam:8NWFTTL3vZqC2W0L@cluster0.mskd8ua.mongodb.net/fullStackTaskManager";

  mongoose.connect(mongooseURI, {
      autoIndex: true,
  }).then(() => {
      console.log("Mongoose is Connected");
  }).catch(e => {
      console.log(e);
  });

  // frontend connect
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
  
  

module.exports = app
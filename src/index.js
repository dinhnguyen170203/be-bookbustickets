const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require("./routes");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log('server is running', port)
})

app.use(cors()) 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app)

mongoose.connect(`mongodb+srv://lanngo:tU5hkXyJSYAEAHXQ@cluster0.r6ghe.mongodb.net/`)
    .then(() => {
        console.log('Connnect db success')
    })
    .catch((err) => {
        console.log("Error DB: ", err)
    })

const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route');
const mongoose  = require('mongoose');
const app = express();


app.use(bodyParser.json());



mongoose.connect("mongodb+srv://ShailabhSrivastava:LtR74yQBXKkSdvyd@cluster0.cxb6bki.mongodb.net/Shailabh-db", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);
app.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "invalid http request" });
  });



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
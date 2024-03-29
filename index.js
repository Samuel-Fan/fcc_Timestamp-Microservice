// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  // Time convert function
  const uploadTime = (date) => {
    let unix = Number(date);
    let utc = date.toUTCString();
    res.json({"unix": unix, "utc": utc})
  }
  console.log(req.params.date);
  // Test if input is a valid UTC or Unix key
  let dateUTC = new Date(req.params.date);
  let dateUnix = new Date();

  dateUnix.setTime(req.params.date);

  if (dateUTC.toString() !== "Invalid Date") {
    uploadTime(dateUTC);
  } else if (dateUnix.toString() !== "Invalid Date") {
    uploadTime(dateUnix);
  } else if (req.params.date === "" || req.params.date === undefined) {
    let date = new Date();
    uploadTime(date);
  } else {
    res.json({"error": "Invalid Date"});
  }

})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

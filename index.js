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

app.get('/api/:date?', function (req, res) {
  const dateParam = req.params.date;

  try {
    if (!dateParam) {
      // If no date parameter is provided, return the current time
      const currentDate = new Date();
      const unixTimestamp = currentDate.getTime();
      const utcString = currentDate.toUTCString();

      return res.json({ unix: unixTimestamp, utc: utcString });
    }

    let date;

    // Check if the dateParam is a valid number (timestamp)
    if (!isNaN(dateParam)) {
      // Parse the timestamp string as a number
      date = new Date(Number(dateParam));
      if (date.toString() === "Invalid Date") {
        return res.json({ error: 'Invalid Date' });
      }
    } else {
      // If it's not a valid number, attempt to create a Date object from the string
      date = new Date(dateParam);
      if (date.toString() === "Invalid Date") {
        return res.json({ error: 'Invalid Date' });
      }
    }

    const unixTimestamp = date.getTime();
    const utcString = date.toUTCString();

    // Return the Unix timestamp and UTC string for the date
    return res.json({ unix: unixTimestamp, utc: utcString });
  } catch (error) {
    // Handle any unexpected errors
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});






//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
     console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
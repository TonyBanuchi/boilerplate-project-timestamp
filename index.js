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

app.get("/api/:dateString?", (req, res, next) => {
  const inString = req.params.dateString;
  let dateValue;
  try{
    if(inString === undefined){
      dateValue = new Date();
    } else {
      const numCheck = Number(inString);
      if(!isNaN(numCheck)){
        dateValue = new Date(numCheck);
      } else {
        dateValue = new Date(inString); 
      }
    }

    if(dateValue === 'Invalid Date'){throw new Error('Invalid Date');}else{
      res.json({
        unix: (Math.floor(dateValue.getTime())),
        utc: (dateValue.toUTCString())
      });
      return;
    }
  } catch(e){
    res.json({error: e})
    return;
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

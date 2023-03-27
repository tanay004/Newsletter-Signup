const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const path = require('path');
//const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email

  var data = {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/09efe0faaf";

  const options= {
    method: "POST",
    auth:"tanay1:e63bab6cf117e537cddaac72597fa745-us21"
  }

  const request= https.request(url, options, function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+ "/success.html");
    }
    else{
      console.log(response.statusCode);
      res.sendFile(__dirname+ "/failure.html");
    }
  })
  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000");
})




//api key: 4e8274d48dad87ed1b480fd5e48e3c11-us21
// audience id: 09efe0faaf

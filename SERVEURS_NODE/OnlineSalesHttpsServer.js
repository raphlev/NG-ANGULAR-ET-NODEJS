const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const assert = require("assert");

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
  ca: fs.readFileSync("./ca.crt"),
  requestCert: true,
  rejectUnauthorized: false,
};

https.createServer(options, app).listen(8443);

let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
//let url = "mongodb://localhost:27017";
//let url = "mongodb+srv://test:test@cluster0-hapla.gcp.mongodb.net/test?retryWrites=true&w=majority";
//let url = "mongodb://test:test@cluster0-shard-00-00-hapla.gcp.mongodb.net:27017";

let url =
  "mongodb+srv://learning:learning@nodedeploy-ehxpw.mongodb.net/OnlineSales?retryWrites=true&w=majority";

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    let db = client.db("OnlineSales");
    console.log("Connected...");
    assert.equal(null, err);

    app.get("/auth/login=:login/password=:password", function (req, res) {
      let login = req.params.login;
      let password = req.params.password;

      console.log("Serveur avec " + login + " " + password);
      res.setHeader("Content-type", "text/plain; charset=UTF-8");
      db.collection("Users")
        .find({
          email: login,
          password: password,
        })
        .toArray(function (err, doc) {
          if (doc !== undefined && doc.length == 1) {
            res.end("1");
            console.log("1");
          } else {
            res.end("0");
            console.log("0");
          }
        });
    });
  }
);
/**
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("OnlineSales");
    assert.equal(null, err);

    app.get("/auth/login=:login/password=:password", function(req, res){
  let login = req.params.login;
  let password = req.params.password;

  console.log("Serveur avec "+login+" "+password);
        res.setHeader("Content-type","text/plain; charset=UTF-8");  
        db.collection("Users").find({"email":login, "password":password}).toArray(function(err, doc) { if (doc !== undefined && doc.length == 1) { res.end("1"); console.log("1"); }else {res.end("0"); console.log("0"); }});
    });

});
**/

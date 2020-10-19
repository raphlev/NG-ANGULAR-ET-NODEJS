const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;


//let CONNECTION_URL;
//CONNECTION_URL = "mongodb+srv://test:test@cluster0-hapla.gcp.mongodb.net/test";
//let url = "mongodb+srv://test:test@cluster0-hapla.gcp.mongodb.net/test?retryWrites=true&w=majority";

let url =
  "mongodb+srv://learning:learning@nodedeploy-ehxpw.mongodb.net/OnlineSales?retryWrites=true&w=majority";


const DATABASE_NAME = "OnlineSales";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/user", (request, response) => {
    console.log("add user to Database");
    collection = database.collection("Users");
    collection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/user", (request, response) => {
    console.log("get user from Database");
    collection = database.collection("Users");
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/product", (request, response) => {
  console.log("get product from Database");
  collection = database.collection("Products");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/cart", (request, response) => {
  console.log("get cart from Database");
  collection = database.collection("Carts");
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

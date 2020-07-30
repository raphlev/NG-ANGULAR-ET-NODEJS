"use strict";

let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.listen(8889);

let data = [
      { "place" : "Montpellier",
        "lat": 43.6111,
        "lng": 3.87667,	
        "sales" : [{"name" : "product1",
		    "nb" : 50},
                   {"name" : "product2",
		    "nb" : 20},
                   {"name" : "product3",
	            "nb" : 35},
                   {"name" : "product4",
		    "nb" : 75},
                   {"name" : "product5",
		    "nb" : 12}		   
		  ]
      },
      {
	"place" : "Arles",
        "lat": 43.6768,
        "lng": 4.6303,	
        "sales" : [{"name" : "product1",
		    "nb" : 82},
                   {"name" : "product2",
		    "nb" : 18},
                   {"name" : "product3",
	            "nb" : 27},
                   {"name" : "product4",
		    "nb" : 65}
		  ]
      }
];

app.get("/places", function(req, res){
  let places = []
  for (let datum of data) {
      places.push(datum.place);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(places));
});

app.get("/place=:place", function(req, res){
  let place = req.params.place;
  let sales = [];
  for (let datum of data) {
      if (datum.place == place) {
	  sales = datum.nb;
          break;
      }
  }      
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(sales));
});

app.get("/placeInfos", function(req, res){
  let placeInfos = []
  for (let datum of data) {
      let nbProducts = 0;
      for (let sales of datum.sales) {
          nbProducts += sales.nb;
      }
      placeInfos.push([datum.place, datum.lat, datum.lng, nbProducts]);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
    console.log(placeInfos);
  res.end(JSON.stringify(placeInfos));
});


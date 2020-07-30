"use strict";

let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.listen(8889);

let data = [
      { "place" : "place1",
        "sales" : [{"name" : "product1",
		    "sales" : 50},
                   {"name" : "product2",
		    "sales" : 20},
                   {"name" : "product3",
	            "sales" : 35},
                   {"name" : "product4",
		    "sales" : 75},
                   {"name" : "product5",
		    "sales" : 12}		   
		  ]
      },
      {
	"place" : "place2",
        "sales" : [{"name" : "product1",
		    "sales" : 82},
                   {"name" : "product2",
		    "sales" : 18},
                   {"name" : "product3",
	            "sales" : 27},
                   {"name" : "product4",
		    "sales" : 65}
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
	  sales = datum.sales;
          break;
      }
  }  
    
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(sales));
})

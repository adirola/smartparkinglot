var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://aditya.rola:somepassword123@ds137370.mlab.com:37370/smartparkinglot');

var Parking     = require('../app/models/parking');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;


var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/parking')
.post(function(req, res) {
  var parking = new Parking(req.body);     
  parking.save(function(err) {
    if (err)
      res.send(err);
		res.json({ message: 'Data logged!' });
  });     
})
.get(function(req, res) {
  Parking.find(function(err, parking) {
  if (err)
    res.send(err);
  res.json(parking);
  });
});

router.route('/parking/:parking_id')
  .get(function(req, res) {
  Parking.findById(req.params.parking_id, function(err, parking) {
  if (err)
    res.send(err);
  res.json(parking);
  });
})
.put(function(req, res) {
	console.log(req.params.parking_id);
  Parking.findById(req.params.parking_id, function(err, parking) {
  	console.log(parking, 'parking data')
	  if (err) { // add empty check after installing lodash _.isEmpty(parking) 
	    res.send(err);
	  }
	  if (!parking || parking === null) {
	  	var customError = { 'msg': 'Parking not found' };
	  	res.send(customError);
	  }
	  parking.space = req.body.space;
	  parking.empty = req.body.empty; // update the bears info
	  parking.save(function(err) {
	    if (err) {
	      res.send(err);
	    } else {
				res.json({ message: 'Parking updated!' });
			}
	  });
  });
})
.delete(function(req, res) {
  Parking.remove({
      _id: req.params.parking_id
  }, function(err, bear) {
      if (err)
          res.send(err);
      res.json({ message: 'Successfully deleted' });
  });
});

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);
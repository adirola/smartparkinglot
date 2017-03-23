var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParkingSchema   = new Schema({
	id : { type:String }
    space: { type: Number, default: 0 },
    isEmpty: { type: Boolean, default: true },
    isReserved: { type: Boolean, default: false }
});

module.exports = mongoose.model('smartparkinglot', ParkingSchema);
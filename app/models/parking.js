var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParkingSchema   = new Schema({
    space: { type: Number, default: 0 },
    empty: { type: Boolean, default: true }
});

module.exports = mongoose.model('smartparkinglot', ParkingSchema);
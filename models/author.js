var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var thebirth = this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
  var thedeath = this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
  var thelifespan = new String(thebirth + " - " + thedeath);
  return  thelifespan;
});

// Virtual for reformatting birth date
AuthorSchema
.virtual('dob_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
});

// Virtual for reformatting  date of death
AuthorSchema
.virtual('dod_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

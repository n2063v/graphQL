let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

const QuestionSchema = new Schema({
    username: {type: String},
    text: {type: String}
});

QuestionSchema.plugin(require('../plugins/mongoose_autofields'));
QuestionSchema.plugin(require('../plugins/mongoose_errorhandler'));
module.exports = Mongoose.model('Questions', QuestionSchema);
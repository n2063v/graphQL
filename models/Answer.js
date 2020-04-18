let Mongoose = require('mongoose');
let Schema =Mongoose.Schema;

let AnswerSchema = new Schema({
    username: {type: String},
    text: {type: String},
    questionId: {type: Schema.Types.ObjectId},
});


AnswerSchema.plugin(require('../plugins/mongoose_autofields'));
AnswerSchema.plugin(require('../plugins/mongoose_errorhandler'));
module.exports = Mongoose.model('Answers', AnswerSchema);
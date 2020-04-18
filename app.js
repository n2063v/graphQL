let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    databaseConfig = require('./configurations/database'),
    graphQLHTTP = require('express-graphql'),
    Answer = require('./graphql/answer'),
    Question = require('./graphql/question'),
    path = require('path')
;

let app = express();

// mongoose set up
mongoose.Promise = require('bluebird');
mongoose.connect(databaseConfig.development, (err) => {
    if(err) throw err;
    console.log('Successfully connect database');
});

require("fs").readdirSync(path.join(__dirname, "models")).forEach(function(file) {
    require("./models/" + file);
});

app.use('/graphql/question', graphQLHTTP (req => ({
    schema: Question, pretty: true, graphiql: true
})));

app.use('/graphql/answer', graphQLHTTP (req => ({
    schema: Answer, pretty: true, graphiql: true
})));

// Internal testing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use('/api', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;

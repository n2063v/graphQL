const errorHandler = (schema) => {
    let checkError = (error, doc, next) =>  {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('Duplication error'));
        } else if (error.name = 'ValidationError'){
            next(new Error(error.message.split(": ")[2]));
        } else {
            next();
        }
    };

    schema.post('save', checkError);
    schema.post('update', checkError);
    schema.post('findOneAndUpdate', checkError);
    schema.post('insertMany', checkError);
};

module.exports = errorHandler;
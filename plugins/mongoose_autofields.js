const autoFields = (schema, options) => {

    schema.add({
        createdDate: {type: Date, default: Date.now()},
        updatedDate: {type: Date, default: Date.now()}
    });

    schema.pre('save', (next) => {
        if (!this.createdDate)
            this.createdDate = Date.now();
        this.updatedDate = Date.now();
        next();
    });

    schema.pre('update', (next) => {
        this.update({}, {$set: {updatedDate: Date.now()}});
        next();
    });

    if (options && options.index) {
        schema.path('createdDate').index(options.index);
        schema.path('updatedDate').index(options.index);
    }
};

module.exports = autoFields;
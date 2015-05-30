app.Collection = function() {
    app.Collection.superConstructor.call(this);
    this.models = [];
};

app.inherit(app.Collection, app.EventEmitter);

app.Collection.prototype.addModel = function(model) {
    this.model.push(model);
};

app.Collection.prototype.addModels = function(models) {
    for(var i = 0; i < models.length; i++) {
        this.models.push(models[i]);
    }
};

app.Collection.prototype.getModelById = function(id) {
    var model;
    for(var i = 0; i < this.models.length; i++) {
        if(this.models[i].getAttribute("id") == id) {
            model = this.models[i];
            break;
        }
    }
    return model;
};
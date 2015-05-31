app.Collection = function() {
    app.Collection.superConstructor.call(this);
    this.models = [];
};

app.inherit(app.Collection, app.EventEmitter);

app.Collection.prototype.addModel = function(model) {
    this.models.push(model);
};

app.Collection.prototype.addModels = function(models) {
    for(var i = 0; i < models.length; i++) {
        this.models.push(models[i]);
    }
};

app.Collection.prototype.getIndexById = function (id) {
    var index;
    for(var i = 0; i < this.models.length; i++) {
        if(this.models[i].getAttribute("id") == id) {
            index = i;
            break;
        }
    }
    return index;
};

app.Collection.prototype.getModelById = function(id) {
    var i = this.getIndexById(id);
    return this.models[i];
};

app.Collection.prototype.removeModelById = function (id) {
    var i = this.getIndexById(id);
    var model = this.models[i];
    this.models.splice(i, 1);
    return model;
};
app.Collection = function() {
    app.Collection.superConstructor.call(this);
    this.models = [];
};

app.inherit(app.Collection, app.EventEmitter);

app.Collection.prototype.addModel = function(model) {
    this.models.push(model);
};

app.Collection.prototype.getModelIndexById = function (id) {
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
    var i = this.getModelIndexById(id);
    return this.models[i];
};

app.Collection.prototype.removeModelById = function (id) {
    var i = this.getModelIndexById(id);
    var model = this.models[i];
    this.models.splice(i, 1);
    return model;
};

app.Collection.prototype.saveToSessionStorrage = function() {
    if (window.sessionStorage) {
        window.sessionStorage.setItem('favouritesFeed', this.models);
/*    if (window.sessionStorage && JSON) { window.sessionStorage.setItem('favouritesFeed', JSON.stringify(this.models)); }*/
        // JSON Polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Polyfill
    } else {
        // TODO: can try cookies
        this.fire('noSessionStorage');
    }
};

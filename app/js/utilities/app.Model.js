app.Model = function(attributes) {
    app.Model.superConstructor.call(this, attributes);
    this.createAttributesObject(attributes);
};
app.inherit(app.Model, app.EventEmitter);

app.Model.prototype.createAttributesObject = function(attributes) {
    var massagedAttributes = {};
    for(var attribute in attributes) {
        if(attributes.hasOwnProperty(attribute)) {
            massagedAttributes[attribute] = attributes[attribute]
        }
    }
    this.attributes = massagedAttributes;
};

app.Model.prototype.getAttribute = function(name) {
    return this.attributes[name];
};

app.Model.prototype.setAttribute = function(name, value) {
    this.attributes[name] = value;
    this.changed = name;
    this.fire('changed', this);
};

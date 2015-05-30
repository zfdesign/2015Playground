app.Model = function(attributes) {
    app.Model.superConstructor.call(this, attributes);
    this.createAttributesObject(attributes);
};

app.inherit(app.Model, app.EventEmitter);

app.Model.prototype.createAttributesObject = function(attributes) {
    var massagedAttributes = {};
    for(var attribute in attributes) {
        if(attributes.hasOwnProperty(attribute)) {
            massagedAttributes[attribute] = {
                previousValue: attributes[attribute],
                currentValue: attributes[attribute]
            };
        }
    }
    this.attributes = massagedAttributes;
};

app.Model.prototype.getAttribute = function(name) {
    return this.attributes[name].currentValue;
};

/* 
 todo call this function without firing event as if user
 uses the tbd setAttributes method which uses this method
 then the event will fire several times which is not what
 want.
 */
app.Model.prototype.setAttribute = function(name, value) {
    this.attributes[name].previousValue = this.attributes[name].currentValue;
    this.attributes[name].currentValue = value;
    var eventDetails = { changed: {} };

    var attributeChanges = {
        previousValue: this.attributes[name].previousValue,
        newValue: this.attributes[name].currentValue
    };

    eventDetails.changed[name] = attributeChanges;
    this.fire("changed", eventDetails);
};

app.Model.prototype.setAttributes = function(attributes) {
    // loop through all attributes
    // modify the existing attribute if it exists
    // if not add the attribute
};

app.Model.prototype.save = function() {
    // loop through all attributes and make previousValue same as currentValue
    var attributes = this.attributes;
    for(var attribute in attributes) {
        if(attributes.hasOwnProperty(attribute)) {
            attributes[attribute].previousValue = attributes[attribute].currentValue;
        }
    }
};

app.Model.prototype.isModified = function() {
    var modified = false;
    var attributes = this.attributes;
    for(var attribute in attributes) {
        if(attributes.hasOwnProperty(attribute)) {
            if(attributes[attribute].previousValue != attributes[attribute].currentValue) {
                modified = true;
                break;
            }
        }
    }
    return modified;
};

app.Model.prototype.reset = function() {
    // undos changes that havent been saved
};
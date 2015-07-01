app.inherit = function(Sub, Super) {
    Sub.prototype = app.cloneObject(Super.prototype);
    Sub.superConstructor = Super;
    Sub.prototype.constructor = Sub;
};
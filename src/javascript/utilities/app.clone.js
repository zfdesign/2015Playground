if(Object.create) {
    app.cloneObject = function(o) {
        return Object.create(o);
    };
} else {
    app.cloneObject = (function() {
        var Fn = function() {};

        return function(o) {
            Fn.prototype = o;
            return new Fn();
        };
    })();
}
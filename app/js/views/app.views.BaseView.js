app.views.BaseView = function() {
    app.views.BaseView.superConstructor.call(this);
};
app.inherit(app.views.BaseView, app.EventEmitter);
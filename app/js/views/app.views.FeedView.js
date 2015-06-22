app.views.FeedView = function(container) {
    app.views.FeedView.superConstructor.call(this);
    this.container = container;
    this.container.on('click', 'li img', $.proxy(this, 'onImageSelected'));
};
app.inherit(app.views.FeedView, app.EventEmitter);

app.views.FeedView.prototype.setContainerClass = function () {
    var userSelected = this.container.find('.selected').length > 0;
    this.container.toggleClass('userSelected', userSelected);
};
app.views.FeedView.prototype.onImageSelected = function (e) {
    var img = $(e.currentTarget);
    img.toggleClass('selected');
    var eData = {
        "modelId" : img.attr('id'),
        "selected" : img.is('.selected')
    };
    this.fire('imgClassToggle', eData);
    this.setContainerClass();
};
app.views.FeedView.prototype.setImgSelectedClass = function (model) {
    var img = this.container.find('#' + model.attributes.id);
    if ( img.length > 0 && (img.is('.selected') !== (model.attributes.selected.length > 0)) ) {
        img.toggleClass('selected');
        var eData = {
            "modelId" : model.attributes.id,
            "selected" : img.is('.selected')
        };
        this.fire('imgClassToggle', eData);
        this.setContainerClass();
    }
};
app.views.FeedView.prototype.createListItem = function (img) {
    var selectedClass = (img.attributes.selected == 'selected') ? 'class="selected"' : '';
    var listItem = '<li><img id="' + img.attributes.id + '" src="' + img.attributes.media.m + '" alt="' + img.attributes.title + '"' + selectedClass + '/></li>';
    this.container.children('ul').append(listItem);
};
app.views.FeedView.prototype.displayImages = function (collection) {
    this.container.append('<ul />');
    for (var i = 0; i < collection.models.length; i++) {
        this.createListItem(collection.models[i]);
    }
    this.setContainerClass();
};

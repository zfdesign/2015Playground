app.controllers.FeedController = function () {
    this.container = $('#feed');
    this.view = new app.views.FeedView(this.container);
    this.view.on('imgClassToggle', $.proxy(this, 'onImgClassToggle'));
    this.collection = new app.Collection();
    this.getFlickrFeedData();
};

app.controllers.FeedController.prototype.onImgClassToggle = function (e) {
    var model = this.collection.getModelById(e.modelId);
    var selectedValue = e.selected ? 'selected' : '';
    model.setAttribute('selected', selectedValue);
};

app.controllers.FeedController.prototype.saveFeed = function () {
    if(window.JSON && window.sessionStorage) {
        var feedData = JSON.stringify(this.feed);
        window.sessionStorage.setItem('flickrFeed', feedData);
    } else {
        // TODO: UserStorage or Cookie
    }
};
app.controllers.FeedController.prototype.saveCollection = function () {
    if(window.JSON && window.sessionStorage) {
        var feedData = JSON.stringify(this.collection);
        window.sessionStorage.setItem('flickrCollection', feedData);
    } else {
        // TODO: UserStorage or Cookie
    }
};
app.controllers.FeedController.prototype.updateCollection = function () {
    var images = this.feed.items;
    for (var i = 0; i < images.length; i++) {
        var id = 'id' + i + '_' + Date.parse(images[i].date_taken);
        if(!this.collection.getModelById(id)) {
            var model = new app.Model(images[i]);
            model.setAttribute('selected', '');
            model.setAttribute('id', id);
            this.collection.addModel(model);
        }
    }
    this.saveCollection(this.collection);
    this.view.displayImages(this.collection);
};
app.controllers.FeedController.prototype.setLiveFeed = function (data) {
    this.feed = data;
    this.saveFeed(data);
    this.updateCollection();
};

app.controllers.FeedController.prototype.getFlickrFeedData = function () {
    // page re-load
    if (window.JSON && window.sessionStorage && sessionStorage.getItem('flickrFeed') && sessionStorage.getItem('flickrCollection')) {
        var feed = JSON.parse(sessionStorage.getItem('flickrFeed'));
        this.feed = feed;
        this.updateCollection();
    } else {
        var tags = 'london';
        var script = document.createElement('script');
        script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=app.getFlickrLiveFeed&tags=' + tags;
        document.head.appendChild(script);
    }
};
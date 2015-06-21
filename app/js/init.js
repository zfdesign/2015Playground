app.init  = function (data) {
    new app.controllers.FeedController(data);
};
(function () {
    var tags = 'london';
    var script = document.createElement('script');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=app.init&tags=' + tags;
    document.head.appendChild(script);
})();
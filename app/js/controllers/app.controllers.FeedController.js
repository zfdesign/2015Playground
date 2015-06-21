app.controllers.FeedController = function (feed) {
    this.container = $('#feed');
    this.data = feed;
    this.view = new app.views.FeedView(this.container);
};
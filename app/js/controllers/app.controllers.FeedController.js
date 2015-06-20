app.controllers.FeedController = function () {
    this.container = $('#feed');
    this.view = new app.views.FeedView(this.container);
};
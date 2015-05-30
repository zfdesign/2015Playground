app.controllers.BasketController = function() {
    this.container = $('#basket');
    this.view = new app.views.BasketView(this.container);
};
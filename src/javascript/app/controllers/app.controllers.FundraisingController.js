app.controllers.FundraisingController = function() {
    this.container = $('#fundraisingContainer');
    this.view = new app.views.FundraisingView(this.container);
    //this.view.on('newDonation', $.proxy(this, 'newDonation'));
};


app.controllers.FundraisingController.prototype.newDonation = function () {
    // todo:
};

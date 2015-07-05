app.controllers.FundraisingController = function() {
    this.view = new app.views.FundraisingView();
    this.view.on('newDonation', $.proxy(this, 'newDonation'));
    this.getCrowdFundingData();
};

app.controllers.FundraisingController.prototype.setFundraiser = function (data) {
    this.view.setFundraiser(data);
};

app.controllers.FundraisingController.prototype.getCrowdFundingData = function () {
    var that = this;
    $.ajax({
        method: "GET",
        url: "/api/crowdFundingPage/"
    }).done(function(data) {
        that.setFundraiser(data);
    }).fail(function(e) {
        // TODO: that.displayError(e);
        alert('Ups! Something went wrong! \nPlease reload this page.');
    });
};

app.controllers.FundraisingController.prototype.updateFundraising = function (response) {
    this.view.updateFundraising(response);
};

app.controllers.FundraisingController.prototype.tryAgain = function (response) {
    this.view.tryAgain(response);
};

app.controllers.FundraisingController.prototype.newDonation = function (donation) {
    var that = this;
    $.ajax({
        method: "POST",
        url: "/api/pledge/" + donation
    }).done(function(response) {
        that.updateFundraising(response);
    }).fail(function(e) {
        that.tryAgain(e);
        alert('Ups! \nSomething went wrong! Please try again.');
    });
};

app.views.CampaignView = function() {
    app.views.CampaignView.superConstructor.call(this);
    this.container = $('form#newCampaign');
    //this.validator = new app.validarors.FormValidator(this.container);
    this.container.on('submit', $.proxy(this, 'onNewCampaignFormSubmit'));
};

app.inherit(app.views.CampaignView, app.views.BaseView);

app.views.CampaignView.prototype.onNewCampaignFormSubmit = function (e) {
    e.preventDefault();
    console.log('Form submission');
};

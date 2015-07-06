app.views.FundraisingView = function(container) {
    app.views.FundraisingView.superConstructor.call(this);
    this.container = $('#fundraisingContainer');
    this.donationForm = this.container.find('#donation form');
    this.setDonationFormValidation(this.donationForm);
};

app.inherit(app.views.FundraisingView, app.views.BaseView);

app.views.FundraisingView.prototype.setDonationFormValidation = function (form) {
    form.on('submit', $.proxy(this, 'validateForm'));
    form.attr('novalidate', 'novalidate');
};

app.views.FundraisingView.prototype.validateForm = function (e) {
    e.preventDefault();
    var form = e.currentTarget;
    if(typeof form.checkValidity === 'function' && form.checkValidity()) {
        this.donationForm.find('input[type="submit"]').attr('disabled', 'disabled');
        var donation = this.donationForm.find('input[name="donation"]').val();
        this.fire('newDonation', donation);
        this.container.addClass('updating');
    } else {
        alert('Please enter a number greater than 1 before submitting!');
    }
};

app.views.FundraisingView.prototype.updateDom = function () {
    // Can do with some templating, model binding, etc..
    // $(document).title('justgiving ' + this.name);
    this.container.find('#story h1').text(this.story);
    this.container.find('#story .amount').text('£' + this.totalPledged);
    this.container.find('#story .target').text(this.target);
    this.container.find('#story .summary span').text(this.progressPercent + '%');
    this.container.find('#story .progress').css('width', (parseInt(this.progressPercent, 10) > 100) ?  '100%' : this.progressPercent + '%');
    this.container.find('#owner p').text(this.owner);
    this.container.removeClass('updating');
};

app.views.FundraisingView.prototype.calculateProgress = function () {
    this.progressPercent = (this.totalPledged * 100 / this.target).toFixed();
};
app.views.FundraisingView.prototype.setFundraiser = function (e) {
    this.name = e.name;
    this.owner = e.owner;
    this.story = e.story;
    this.target = e.target;
    this.totalPledged = e.totalPledged;
    this.calculateProgress();
    this.updateDom();
};

app.views.FundraisingView.prototype.updateFundraising = function (e) {
    // Display thank you message
    this.donationForm.hide();
    this.container.find('#donation .message').show();
    // Update DOM
    this.totalPledged = e.totalPledged;
    this.calculateProgress();
    this.updateDom();
};

app.views.FundraisingView.prototype.tryAgain = function (e) {
    this.donationForm.find('input[type="submit"]').removeAttr('disabled');
    this.donationForm.removeClass('updating');
};

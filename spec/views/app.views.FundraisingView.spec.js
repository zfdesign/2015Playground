describe('Fundraiser View', function () {

    var view;
    var mockContainer;
    var mockDonationForm;

    beforeEach(function() {

        spyOn(app.views.FundraisingView, 'superConstructor');

        mockContainer = jasmine.createSpyObj('container', ['find']);
        spyOn(window, '$').and.callFake(function (args) {
            if(args === '#fundraisingContainer') {
                return mockContainer;
            }
        });

        mockDonationForm = jasmine.createSpyObj('mockFundraiserForm', ['on', 'attr']);
        mockContainer.find.and.callFake(function (args) {
            if (args === '#donation form') {
                return mockDonationForm;
            }
        });

        view = new app.views.FundraisingView(mockContainer);
    });

    describe('Creating new Fundraiser Controller', function () {
        beforeEach(function () {
            view.setDonationFormValidation = jasmine.createSpy();
        });
        it('Calls its superConstructor', function () {
            expect(app.views.FundraisingView.superConstructor).toHaveBeenCalled();
            expect(app.views.FundraisingView.superConstructor.calls.mostRecent().object).toBe(view);
        });
        it('Sets container', function () {
            expect(view.container).toBe(mockContainer);
        });
        it('Sets Donation Form container', function () {
            expect(view.donationForm).toBe(mockDonationForm);
        });
/*
        it('Sets Donation Form validation', function () {
            expect(view.setDonationFormValidation).toHaveBeenCalledWith(mockDonationForm);
        });
*/
    });

});

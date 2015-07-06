describe('Fundraiser View', function () {

    var view;
    var mockContainer;
    var mockDonationForm;
    var mockCurrentTarget;
    var mockCheckValidity;
    var mockProxy;
    var mockSubmitEvent;
    var mockSubmitButton;
    var mockDonationInput;
    var mockDonationValue;
    var mockFundingResponse;
    var mockDonationMessage;

    beforeEach(function() {
        spyOn(app.views.FundraisingView, 'superConstructor');
        mockContainer = jasmine.createSpyObj('container', ['find', 'addClass', 'removeClass']);
        spyOn(window, '$').and.callFake(function (args) {
            if(args === '#fundraisingContainer') {
                return mockContainer;
            }
        });
        mockDonationMessage = jasmine.createSpyObj('mockDonationMessage', ['show']);
        mockDonationForm = jasmine.createSpyObj('mockDonationForm', ['on', 'attr', 'find', 'checkValidity', 'text', 'css', 'hide', 'removeClass']);
        mockContainer.find.and.callFake(function (args) {
            if (args === '#donation .message') {
                return mockDonationMessage;
            } else {
                return mockDonationForm;
            }
        });
        mockSubmitButton = jasmine.createSpyObj('mockSubmitButton', ['attr', 'removeAttr']);
        mockDonationInput = jasmine.createSpyObj('mockDonationValue', ['val']);
        mockDonationForm.find.and.callFake(function(args) {
            if(args === 'input[type="submit"]') {
                return mockSubmitButton;
            }
            if(args === 'input[name="donation"]') {
                return mockDonationInput;
            }
        });
        mockDonationValue = 1;
        mockDonationInput.val.and.returnValue(mockDonationValue);
        mockProxy = 1;
        spyOn($, 'proxy').and.returnValue(mockProxy);

        mockCheckValidity = function () {};

        mockCurrentTarget = jasmine.createSpyObj('mockCurrentTarget', ['checkValidity']);
        mockCurrentTarget.checkValidity.and.callFake(function () {
            return mockCheckValidity;
        });

        mockSubmitEvent = jasmine.createSpyObj('mockSubmitEvent', ['preventDefault', 'currentTarget']);
        mockSubmitEvent.currentTarget.and.callFake(function () {
            return mockCurrentTarget;
        });

        view = new app.views.FundraisingView(mockContainer);
    });
    describe('Given a new Fundraiser View', function () {
        it('Calls its superConstructor', function () {
            expect(app.views.FundraisingView.superConstructor).toHaveBeenCalled();
            expect(app.views.FundraisingView.superConstructor.calls.mostRecent().object).toBe(view);
        });
        it('With container', function () {
            expect(view.container).toBe(mockContainer);
        });
        it('With donation form container', function () {
            expect(view.donationForm).toBe(mockDonationForm);
        });
    });
    describe('When "setDonationFormValidation" method is called', function () {
        beforeEach(function() {
            view.setDonationFormValidation(mockDonationForm);
        });
        it('Then listens on "submit" form event', function () {
            expect(mockDonationForm.on).toHaveBeenCalledWith('submit', mockProxy);
        });
        it('Then sets "novalidate" form attribute', function () {
            expect(mockDonationForm.attr).toHaveBeenCalledWith('novalidate', 'novalidate');
        });
    });
    describe('When "validateForm" method is called and form mis not valid', function () {
        beforeEach(function () {
            spyOn(window, 'alert');
            mockDonationForm.checkValidity.and.callFake(function () {
                return false;
            });
            view.validateForm(mockSubmitEvent);
        });
        it('Then alerts the user', function() {
            expect(window.alert).toHaveBeenCalled();
        });
    });
    describe('When "updateDom" method is called', function () {
        beforeEach(function() {
            view.updateDom();
        });
        it('Then story title, amount, target summary and progress values are updated', function () {
            expect(view.container.find).toHaveBeenCalledWith('#story h1');
            expect(view.container.find).toHaveBeenCalledWith('#story .amount');
            expect(view.container.find).toHaveBeenCalledWith('#story .target');
            expect(view.container.find).toHaveBeenCalledWith('#story .summary span');
            expect(view.container.find).toHaveBeenCalledWith('#story .progress');
            expect(view.container.find).toHaveBeenCalledWith('#owner p');
            expect(view.container.removeClass).toHaveBeenCalledWith('updating');
        });
    });
    describe('When "calculateProgress" method is called', function () {
        beforeEach(function() {
            view.totalPledged = 1;
            view.target = 10;
            view.calculateProgress();
        });
        it('Then "progressPercent" is calculated', function () {
            expect(view.progressPercent).toBe('10');
        });
    });
    describe('When "setFundraiser" method is called', function () {
        beforeEach(function() {
            mockFundingResponse = {"name":"Playground","totalPledged":1,"target":2,"owner":"Blah","story":"We are raising ..."};
            spyOn(view, 'calculateProgress');
            spyOn(view, 'updateDom');
            view.setFundraiser(mockFundingResponse);
        });
        it('Then view properties are set', function () {
            expect(view.name).toBe(mockFundingResponse.name);
            expect(view.owner).toBe(mockFundingResponse.owner);
            expect(view.story).toBe(mockFundingResponse.story);
            expect(view.totalPledged).toBe(mockFundingResponse.totalPledged);
        });
        it('Then calls "calculateProgress"', function () {
            expect(view.calculateProgress).toHaveBeenCalled();
        });
        it('Then calls "updateDom"', function () {
            expect(view.updateDom).toHaveBeenCalled();
        });
    });
    describe('When "updateFundraising" method is called', function () {
        beforeEach(function() {
            spyOn(view, 'calculateProgress');
            spyOn(view, 'updateDom');
            view.updateFundraising(1);
        });
        it('Then hides the donation form', function () {
            expect(mockDonationForm.hide).toHaveBeenCalled();
        });
        it('Then shows the donation message', function () {
            expect(mockDonationMessage.show).toHaveBeenCalled();
        });
        it('Then calls "calculateProgress"', function () {
            expect(view.calculateProgress).toHaveBeenCalled();
        });
        it('Then calls "updateDom"', function () {
            expect(view.updateDom).toHaveBeenCalled();
        });
    });
    describe('When "tryAgain" method is called', function () {
        beforeEach(function() {
            view.tryAgain();
        });
        it('Then enables the donation form submit button', function () {
            expect(mockSubmitButton.removeAttr).toHaveBeenCalled();
            expect(mockDonationForm.removeClass).toHaveBeenCalled();
        });
    });
});

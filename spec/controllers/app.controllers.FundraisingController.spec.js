describe('Fundraiser Controller', function () {

    var controller;
    var mockCampaignView;
    var mockProxy;
    var mockAjax;
    var mockAjaxDone;
    var mockFundraiserData;

    beforeEach(function() {
        mockCampaignView = jasmine.createSpyObj('mockCampaignView', ['on', 'setFundraiser', 'updateFundraising', 'tryAgain']);
        spyOn(app.views, 'FundraisingView').and.callFake(function() {
            return mockCampaignView;
        });
        mockProxy = 1;
        spyOn($, 'proxy').and.returnValue(mockProxy);
        mockFundraiserData = 1;
        mockAjax = jasmine.createSpyObj('mockAjax', ['done']);
        spyOn($, 'ajax').and.callFake(function () {
            return mockAjax;
        });
        mockAjaxDone = jasmine.createSpyObj('mockAjaxDone', ['fail']);
        mockAjax.done.and.callFake(function () {
           return mockAjaxDone;
        });

        controller = new app.controllers.FundraisingController();
    });
    describe('When new Fundraiser Controller is created', function () {
        beforeEach(function () {
            spyOn(controller, 'getCrowdFundingData');
        });
        it('Then it creates a new Fundraiser View', function () {
            expect(controller.view).toBe(mockCampaignView);
        });
        it('Then listens for "newDonation" View event', function () {
            expect(controller.view.on).toHaveBeenCalledWith('newDonation', mockProxy);
        });
    });
    describe('When "setFundraiser" method is called', function () {
        beforeEach(function () {
            controller.setFundraiser(mockFundraiserData);
        });
        it('Then controller sets view fundraiser data', function () {
            expect(controller.view.setFundraiser).toHaveBeenCalledWith(mockFundraiserData);
        });
    });
    describe('When "getCrowdFundingData" method is called', function () {
        beforeEach(function () {
            controller.getCrowdFundingData();
        });
        it('Then controller sets view fundraiser data', function () {
            expect($.ajax).toHaveBeenCalled();
        });
    });
    describe('When "updateFundraising" method is called', function () {
        beforeEach(function () {
            controller.updateFundraising(mockFundraiserData);
        });
        it('Then controller updates view fundraiser data', function () {
            expect(controller.view.updateFundraising).toHaveBeenCalledWith(mockFundraiserData);
        });
    });
    describe('When "tryAgain" method is called', function () {
        beforeEach(function () {
            controller.tryAgain(mockFundraiserData);
        });
        it('Then controller updates view fundraiser data', function () {
            expect(controller.view.tryAgain).toHaveBeenCalledWith(mockFundraiserData);
        });
    });
    describe('When "newDonation" method is called', function () {
        beforeEach(function () {
            controller.newDonation(mockFundraiserData);
        });
        it('Then controller updates view fundraiser data', function () {
            expect($.ajax).toHaveBeenCalled();
        });
    });
});
